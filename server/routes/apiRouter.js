const express = require('express');

const router = express.Router();
const sessionController = require('../controllers/sessionController');

router.get('/check-session', sessionController.isLoggedIn, (req, res) => {
  console.log('/CHECK-SESSION ==== res.locals.isLoggedIn: ', res.locals.isLoggedIn)
  res.status(200).json(res.locals.isLoggedIn);
});

router.post('/logout', (req, res) => {
  console.log('---->router logout - req.cookie: ', req.cookies)
  res.clearCookie('token', { httpOnly: true });
  res.clearCookie('email');
  res.status(200).json({ loggedOut: true });
})


router.get('/oauth', sessionController.githubAuth, (req, res) => {
  console.log('OAUTH/ ')
  res.redirect(res.locals.redirect);
})


router.get('/oauth/user', sessionController.getGithubToken, (req, res) => {
  console.log('/OAUTH/USER ')
  res.status(200).redirect('http://localhost:8080/dashboard');

})


module.exports = router;
