// require in userModelSQL
const db = require('../models/userModelSQL')
// require in bcrypt
const bcrypt = require('bcryptjs');

// define userController object
const userController = {};

// @description Register new user
// @route POST /api/users/register
// @access Public
userController.createUser = async (req, res, next) => {
  // deconstruct request body
  const { name, email, password } = req.body;

  // check for all user inputs; if all inputs not present
  if (!name || !email || !password) {
    // return 400 status and throw error
    res.status(400);
    throw new Error("Please add all fields");
  }

  // if all inputs present, hash the password using Bcrypt; use 10 salt rounds
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  try {
    // create values array for SQL queries
    const values = [name, email, hashedPassword];
    // define query existsUserQuery to see if user already exists in database
    const existsUserQuery = 'SELECT username, email, password FROM users WHERE email = ($1)';
    // execute existsUserQuery, assign to userExists constant
    const userExists = await db.query(existsUserQuery, [email]);

    // if rows property of userExists has length
    if (userExists.rows.length) {
      // user already exists in db - return relevant feedback message
      return next('User already exists');
    }

    // if userExists is null (i.e. user does not exist in database)
    // define query createUserQuery to create new user in the database
    const createUserQuery = `INSERT INTO users (username, email, password) VALUES ($1, $2, $3)`;
    // execute createUserQuery, assign to newUser constant
    const newUser = await db.query(createUserQuery, values);
    // assign res.locals.newUser to newUser
    res.locals.newUser = newUser;
    // return invocation of next
    return next();

  // catch - if error experienced during database queries
  } catch (err) {
    // log err
    console.log(err);
    // return invocation of next, passing in err
    return next(err);
  }
};

// @description Authenticate user data
// @route POST /api/users/login
// @access Public
userController.verifyUser = async (req, res, next) => {
  // deconstruct request body
  const { email, password } = req.body;

  // check for all user inputs; if all inputs not present
  if (!email || !password) {
    // return 400 status and throw error
    res.status(400);
    throw new Error("Please add all fields");
  }

  // set res.locals.status to true
  res.locals.status = true;

  try {
    // define query existsUserQuery to see if user exists in database
    const existsUserQuery = 'SELECT email, password FROM users WHERE email = ($1)';
    // execute existsUserQuery, assign to user constant
    const user = await db.query(existsUserQuery, [email]);

    // if rows property of user has length of 0
    if (!user.rows.length) {
      // user does not exist in database - set res.locals.status to appropriate error message
      res.locals.status = 'Incorrect Username or Password';
      // return invocation of next
      return next();
    }

    // define a constant match, assign to evaluated result of invoking bcypt compare between entered password and database password
    const match = await bcrypt.compare(password, user.rows[0].password);
    
    // if match is false
    if (!match) {
      // passwords do not match - set res.locals.status to appropriate error message
      res.locals.status = 'Incorrect Username or Password';
      // return invocation of next
      return next();
    }

    // if match is true - passwords match; set res.locals.user to user
    res.locals.user = user;
    // return invocation of next
    return next();

  // catch - if error experienced during database queries
  } catch (err) {
    // log err
    console.log(err);
    // return invocation of next, passing in err
    return next(err);
  }
};

// export userController
module.exports = userController;