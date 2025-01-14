const express = require("express");
const router = express.Router()

// require in relevant controllers
const userController = require("../controllers/userController");
const sessionController = require("../controllers/sessionController");

// import authorization middleware
const { protect } = require("../middleware/authMiddleware");

router.post("/register", userController.createUser, sessionController.startSession, (req, res) => {  
  res.status(200).json({ status: res.locals.status, user: res.locals.newUser });
});

// login
router.post("/login", userController.verifyUser, sessionController.startSession, (req, res) => {
  res.status(200).json({ status: res.locals.status, user: res.locals.user });
});

module.exports = router;