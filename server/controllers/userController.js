// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
// const asyncHandler = require("express-async-handler");

// require in user model
// // for mongoDB:
// const UserData = require('../models/userModel')
// for SQL:
const db = require('../models/userModelSQL')

// @description Register new user
// @route POST /api/users/register
// @access Public
const userController = {};
userController.createUser =  async (req, res, next) => {
  console.log('entered createUser');
  try {
    // deconstruct request body
    const { name, email, password } = req.body;
  
    // check for all user inputs
    if (!name || !email || !password) {
      res.status(400);
      throw new Error("Please add all fields");
    }
  
    // check if user exists
    // for mongoDB:
    // const userExists = await UserData.findOne({ email });

    // const selectHomeworlds = 'SELECT people.*, planets.name AS homeworld FROM "public"."people" INNER JOIN "public"."planets" ON planets._id = people.homeworld_id';
    // const selectFilms = 'SELECT people._id, films.title FROM "public"."people" INNER JOIN "public"."people_in_films" ON people_in_films.person_id = people._id INNER JOIN "public"."films" ON films._id = people_in_films.film_id WHERE people._id = $1';

    // for SQL:
    // const existsQuery = `SELECT email FROM users WHERE email = ${email}`

    // const userExists = await db.query(existsQuery);

    // console.log('userExists', userExists);
  
    // if (userExists) {
    //   return next('User already exists')
    // }

    const values = [name, email, password];
    const createUserQuery = `INSERT INTO users (username, email, password) VALUES ($1, $2, $3)`;
    const newUser = db.query(createUserQuery, values);
  
    // // for MongoDB:
    // const newUser = await UserData.create({ username, password, email })

    res.locals.newUser = newUser;
  
    return next();
  } catch (err) {
    console.log(err)
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

  // check for email and password

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
