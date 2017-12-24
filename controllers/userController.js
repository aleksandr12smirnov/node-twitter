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
  // santatize inputs to prevent malicious code from running
  req.sanitizeBody('name');
  req.sanitizeBody('username');

  // make sure input is valid and not empty
  req.checkBody('username', 'You must supply a username!').notEmpty();
  req.checkBody('name', 'You must supply a name!').notEmpty();
  req.checkBody('email', 'That Email is not valid!').isEmail();

  // change all email formats to one so we can ensure to check against the same type
  req.sanitizeBody('email').normalizeEmail({
    remove_dots: false,
    remove_extension: false,
    gmail_remove_subaddress: false
  });

  // check passwords and compare the confirmation
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

  // if all is well goto next middleware (register)
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

const getProfileAndShowPage = (path, populateOptions) => {
  return async (req, res, next) => {
    const username = req.params.handle.toLowerCase();

    // find profile and make tweets available
    const profile = await User.findOne({ username }).populate(populateOptions);

    // if user cant be found go to next middleware
    if (!profile) {
      return next();
    }

    const title = `${profile.name} (@${profile.handle})`;
    res.render(`user/${path}`, { profile, title });
  };
};

exports.showUserTweets = getProfileAndShowPage('tweets', {
  path: 'tweets',
  populate: { path: 'author', model: 'User' }
});

exports.showUserFollowing = getProfileAndShowPage('following', {
  path: 'following'
});

exports.showUserFollowers = getProfileAndShowPage('followers', {
  path: 'followers'
});

exports.showUserLikes = getProfileAndShowPage('likes', {
  path: 'likes',
  populate: { path: 'author', model: 'User' }
});

exports.followUser = async (req, res) => {
  // turn Id Objects into strings for searching
  const following = req.user.following.map(obj => obj.toString());

  // if target is in users following list then remove from both otherwise add to both
  const operator = following.includes(req.params.id) ? '$pull' : '$addToSet';

  // find user and add target to following list
  await User.findByIdAndUpdate(
    req.user._id,
    { [operator]: { following: req.params.id } },
    { new: true }
  );

  // find target and add user to thier followers list
  const target = await User.findByIdAndUpdate(
    req.params.id,
    { [operator]: { followers: req.user._id } },
    { new: true }
  );
  res.json(target);
};
