const mongoose = require('mongoose');
const User = mongoose.model('User');
const promisify = require('es6-promisify');

exports.loginForm = (req, res) => {
  res.render('login', { title: 'Login' });
};

exports.registerForm = (req, res) => {
  res.render('register', { title: 'Register' });
};

exports.validateRegister = (req, res, next) => {
  req.sanitizeBody('name');
  req.sanitizeBody('username');
  req.checkBody('username', 'You must supply a username!').notEmpty();
  req.checkBody('name', 'You must supply a name!').notEmpty();
  req.checkBody('email', 'That Email is not valid!').isEmail();
  req.sanitizeBody('email').normalizeEmail({
    remove_dots: false,
    remove_extension: false,
    gmail_remove_subaddress: false
  });
  req.checkBody('password', 'You must enter a password!').notEmpty();
  req
    .checkBody('password-confirm', 'You must confirm your password!')
    .notEmpty();
  req
    .checkBody('password-confirm', 'Oops! Your passwords do not match')
    .equals(req.body.password);

  const errors = req.validationErrors();

  if (errors) {
    req.flash('error', errors.map(err => err.msg));
    res.render('register', {
      title: 'Register',
      body: req.body,
      flashes: req.flash()
    });
    return;
  }

  next();
};

exports.register = async (req, res, next) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    name: req.body.name,
    handle: req.body.handle
  });
  const register = promisify(User.register, User);
  await register(user, req.body.password);
  next();
};

exports.showUserTweets = async (req, res, next) => {
  const username = req.params.handle.toLowerCase();
  const profile = await User.findOne({ username }).populate('tweets');
  if (!profile) {
    return next();
  }
  const title = `${profile.name} (@${profile.handle})`;
  res.render('user/tweets', { profile, title });
};
