const express = require("express");
const router = express.Router()

const userController = require("../controllers/userController");
const sessionController = require("../controllers/sessionController");

// import authorization middleware
const { protect } = require("../middleware/authMiddleware");

router.post("/register", userController.createUser, sessionController.startSession, (req, res) => {
  res.status(200).json(res.locals.newUser);      
});

router.post("/login", userController.verifyUser, sessionController.startSession, (req, res) => {
  res.status(200).json(res.locals.status);
});

router.get("/home", userController.goHome, (req, res) => {
  // add logic here
}); // add authorization middleware before getHome route


module.exports = router;