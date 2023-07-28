// require in userModel
const db = require('../models/userModel')
// require in bcrypt
const bcrypt = require('bcryptjs');

// define userController object
const userController = {};

<<<<<<< HEAD
userController.createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // check for all user inputs
    if (!name || !email || !password) {
      res.status(400);
      throw new Error("Please add all fields");
    }

    // check if user exists
    const userExists = await UserData.findOne({ email });
    console.log(userExists);

    if (userExists) {
      return next('User already exists')
    }

    const newUser = await UserData.create({ username: name, password, email })

    res.locals.status = true;
    res.locals.newUser = newUser;

=======
// @description Register a new user
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
>>>>>>> dev
    return next();

  // catch - if error experienced during database queries
  } catch (err) {
    // log err
    console.log(err);
    // return invocation of next, passing in err
    return next(err);
  }
<<<<<<< HEAD

=======
>>>>>>> dev
};

// @description Authenticate user data
// @route POST /api/users/login
// @access Public
userController.verifyUser = async (req, res, next) => {
<<<<<<< HEAD
  try {
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
=======
  // deconstruct request body
  const { email, password } = req.body;

  // check for all user inputs; if all inputs not present
  if (!email || !password) {
    // return 400 status and throw error
    res.status(400);
    throw new Error("Please add all fields");
>>>>>>> dev
  }

  // set res.locals.status to true
  res.locals.status = true;

<<<<<<< HEAD
  //   // find user by email in db
  //   const user = await User.findOne({ email });

  // //   // check if user exists and password is correct
  //   if (user && (await bcrypt.compare(password, user.password))) {
  //     res.json({
  //       _id: user.id,
  //       name: user.name,
  //       email: user.email,
  //       token: generateToken(user._id),
  //     });
  //     return next()
  //   } else {
  //     res.status(400);
  //     throw new Error("Invalid Credentials");
  //   }
};


// @description send to home page
// @route GET /api/users/home
// @access Private
userController.goHome = async (req, res) => {
  //   res.redirect('/home')
};

// Generate token
// const generateToken = (id) => {
//   // will sign a new token with the id passed in with the secret used and will expire in 30 days
//   return jwt.sign({ id }, process.env.JWT_SECRET, {
//     expiresIn: "30d",
//   });
// };

module.exports = userController;
=======
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
>>>>>>> dev
