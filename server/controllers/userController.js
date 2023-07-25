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

  // hash the password using Bcrypt
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  try {
    // create values array for SQL queries
    const values = [name, email, hashedPassword];
    console.log(hashedPassword);
    // define query to see if user already exists in database
    const existsUserQuery = 'SELECT email FROM users WHERE email = ($1)';
    // execute existsUserQuery
    const userExists = await db.query(existsUserQuery, [email]);
    console.log('userExists:', userExists)

    // if rows property of userExists has length
    if (userExists.rows.length) {
      console.log('userExists data: ', userExists);
      // user already exists in db - return relevant feedback message
      return next('User already exists');
    }

    // if userExists is null (i.e. user does not exist in database)
    // define query to create new user in the database
    const createUserQuery = `INSERT INTO users (username, email, password) VALUES ($1, $2, $3)`;
    // execute createUserQuery
    const newUser = db.query(createUserQuery, values);

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
  try{
    const { email, password } = req.body;
    res.locals.status = true;

    const user = await UserData.findOne({ email });

    if (!user) {
      res.locals.status = 'Incorrect username or password';
      return next();
    }

    const correctPass = await UserData.comparePassword(password, user.password);
    
    if (!correctPass) {
      res.locals.status = 'Incorrect username or password';
      return next();
    }

    res.locals.user = user;

    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = userController;