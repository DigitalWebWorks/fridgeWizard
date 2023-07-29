const jwt = require('jsonwebtoken');
const axios = require('axios');

const sessionController = {};


sessionController.githubAuth = (req, res, next) => {
  const redirect = ("https://github.com/login/oauth/authorize?client_id=" + process.env.GITHUB_CLIENT_ID)
  res.locals.redirect = redirect;
  return next();
}


sessionController.getGithubToken = async (req, res, next) => {
  console.log('----> sessionController.getGithubToken running - req.query.code: ', req.query.code)

  try {
    const { code } = req.query;

    const response = await axios.post('https://github.com/login/oauth/access_token', {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code: code
    }, {
      headers: {
        Accept: 'application/json',
      },
    });


    const githubToken = response.data.access_token;

    console.log('----> githubToken: ', githubToken)

    const user = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${githubToken}`,
      },
    });

    // const userEmail = user.data.email || user.data.login

    const userName = user.data.email || user.data.login;

    const token = jwt.sign({ userName }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    })

    res.cookie('token', token, { httpOnly: true, secure: true });
    res.cookie('user', userName);

    // res.locals.email = user.data.email;
    // res.locals.status = true;
    // res.locals.user = userEmail;

    return next();
  }
  catch (err) {
    return next(err)
  }
}


sessionController.startSession = async (req, res, next) => {
  console.log('----> sessionController.startSession - req.body: ', req.body)
  try {
    if (res.locals.status !== true) {
      console.log('----> sessionController.startSession - NOT STARTED ')
      return next();
    }

    const email = req.body.email;

    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    })

    res.cookie('token', token, { httpOnly: true, secure: true });

    console.log('----> JWT token: ', token)

    return next();
  } catch (err) {
    return next(err);
  }
};

sessionController.isLoggedIn = async (req, res, next) => {
  console.log('----> sessionController.isLoggedIn - req.cookies: ', req.cookies)
  try {
    const { token } = req.cookies;

    if (!token) {
      res.locals.loggedIn = false;
      console.log('NO TOKEN')
      return next();
    }

    const loggedIn = jwt.verify(token, process.env.JWT_SECRET);

    res.locals.isLoggedIn = loggedIn;
    console.log('----> req.locals.loggedIn: ', res.locals.isLoggedIn)

    return next();
  } catch (err) {
    console.log(`Error: ${err}`);
    return next(err);
  }
};

// sessionController.logout = async (req, res, next) => {
//   console.log('---->sessionController.logout - req.cookie: ', req.cookies)
//   try {
//     res.clearCookie('token', { httpOnly: true, secure: true });
//     res.clearCookie('user', { httpOnly: true, secure: true });
//     res.clearCookie('email', { httpOnly: true, secure: true });
//     return next();
//   } catch (err) {
//     return next(err);
//   }
// };

module.exports = sessionController;