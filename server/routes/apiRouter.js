const express = require('express');

const router = express.Router();
const sessionController = require('../controllers/sessionController');

router.get('/check-session', sessionController.isLoggedIn, (req, res) => {
  res.status(200).json(res.locals.isLoggedIn);
});

router.post('/logout', (req, res) => {
  console.log('---->router logout - req.cookie: ', req.cookies)
  res.clearCookie('token', { httpOnly: true });
  res.clearCookie('githubToken');
  res.status(200).json({ loggedOut: true });
})


router.get('/oauth', sessionController.githubAuth, (req, res) => {
  console.log('----> oauth router res.locals: ', res.locals.status)
  res.redirect(res.locals.redirect);
})


router.get('/oauth/user', sessionController.getGithubToken, (req, res) => {
  console.log('-----> oauth/user router running ')
  res.status(200).redirect('http://localhost:8080/');
})

router.post('/oauth/userdata', sessionController.getGithubUserData, sessionController.startSession, (req, res) => {
  // router.get('/oauth/userdata', sessionController.getGithubUserData, sessionController.startSession, (req, res) => {
  console.log('-----> oauth/userdata router running ')
  // res.status(200).json({ status: res.locals.status, user: res.locals.userEmail });
  res.status(200).send({ status: res.locals.status, userEmail: res.locals.userEmail });
})

module.exports = router;
