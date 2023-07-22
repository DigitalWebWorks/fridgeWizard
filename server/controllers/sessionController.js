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

    // STORE TOKEN IN NEW DATABASE
    const githubToken = response.data.access_token;
    // res.cookie('githubToken', githubToken, { httpOnly: true, secure: true });
    res.cookie('githubToken', githubToken);
    console.log('----> githubToken: ', githubToken)

    return next();
  }
  catch (err) {
    return next(err)
  }
}

sessionController.getGithubUserData = async (req, res, next) => {
  console.log('----> sessionController.getGithubUserData is running - req.cookies :', req.cookies)
  console.log('----> sessionController.getGithubUserData is running - req.body.githubToken :', req.body.githubToken)

  // FETCH TOKEN FROM DATABASE
  if (req.cookies) {
    try {
      const user = await axios.get('https://api.github.com/user', {
        headers: {
          Authorization: `Bearer ${req.body.githubToken}`,
          // Authorization: `Bearer ${req.cookies.githubToken}`,
        },
      });
      // console.log('----> user.data: ', user.data)
      res.locals.email = user.data.email;
      res.locals.status = true;
      console.log('----> res.locals.email: ', res.locals.email)
      console.log('----> res.locals.status: ', res.locals.status)

      return next();
    }
    catch (err) {
      console.log('----> sessionController.getGithubUserData ERROR')
      // return next(err)
    }
  } return next();
}

sessionController.startSession = async (req, res, next) => {
  // console.log('----> sessionController.startSession - res.locals.email: ', res.locals.email)
  console.log('----> sessionController.startSession - req.body: ', req.body)
  try {
    if (res.locals.status !== true) {
      console.log('----> sessionController.startSession - NOT STARTED ')
      return next();
    }


    // Can also do-
    // const email = res.locals.email || req.body.email;
    // let email;

    console.log('res.locals.email: ', res.locals.email);
    console.log('req.body.email: ', req.body.email);

    const email = res.locals.email || req.body.email;
    // if (res.locals.email) { email = res.locals.email; }
    // else { email = req.body.email; }
    console.log('email ', email);

    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    })

    res.cookie('test', '123');
    // res.cookie('token', token, { httpOnly: true, secure: true });
    res.cookie('token', token);


    console.log('----> JWT token: ', token)
    console.log('----> Test token: ', res.cookie)


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

sessionController.logout = async (req, res, next) => {
  console.log('---->sessionController.logout - req.cookie: ', req.cookies)
  try {
    res.clearCookie('token', { httpOnly: true, secure: true });
    res.clearCookie('githubToken', { httpOnly: true, secure: true });
    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = sessionController;