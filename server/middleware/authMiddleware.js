// const jwt = require("jsonwebtoken");
// const asyncHandler = require("express-async-handler");
// // require in model user model

// const protect = asyncHandler(async (req, res, next) => {
//   let token;

//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer")
//   ) {
//     try {
//       // get token from headers
//       // using split because in headers it's Bearer token
//       token = req.headers.authorization.split(" ")[1];

//       // Verify token
//       // If successful and token is valid, returns an object
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);

//       // decoded represents the decoded payload of JWT,
//       // which contains info about the user

//       // Get user from the token
//       // token has user id as a payload
//       // .select wont include password
//       // The retrieved user object is then attached to the req.user property, making it accessible in subsequent route handlers.
//       req.user = await User.findById(decoded.id).select("-password");

//       next();
//     } catch (err) {
//       console.log(err);
//       // 401 status code not authorized
//       res.status(401);
//       throw new Error("Not authorized");
//     }
//   }

//   // if no token at all
//   if (!token) {
//     res.status(401);
//     throw new Error("Not authorized, no token");
//   }
// });

// module.exports = { protect };
