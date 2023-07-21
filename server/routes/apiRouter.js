const express = require('express');

const router = express.Router();
const sessionController = require('../controllers/sessionController');

router.get('/check-session', sessionController.isLoggedIn, (req, res) => {
  res.status(200).json(res.locals.isLoggedIn);
});

router.post('/logout', (req, res) => {
  res.clearCookie('token', { httpOnly: true });
  res.status(200).json({ loggedOut: true });
})

// github oauth route
router.post('/oauth', sessionController.githubAuth, sessionController.startSession, (req, res) => {
  res.status(200).json(res.locals.token);  
})

module.exports = router;
