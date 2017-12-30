const mongoose = require('mongoose');
const User = mongoose.model('User');
const Tweet = mongoose.model('Tweet');

exports.index = (req, res, next) => {
  // req.flash('success', 'Test Flash');
  // req.flash('error', 'Test Flash');
  // req.flash('info', 'Test Flash');
  if (req.user) {
    return next();
  }
  res.render('landing', { title: 'Welcome!' });
};

exports.homePage = async (req, res) => {
  const populatedUser = await User.findById(req.user._id).deepPopulate([
    'following.tweets.author',
    'tweets.author'
  ]);

  let tweets = populatedUser.following.reduce((a, b) => {
    a = a.concat(b.tweets);
    return a;
  }, []);

  tweets = tweets.concat(populatedUser.tweets);

  // sort tweets by date
  tweets.sort(function(a, b) {
    let keyA = new Date(a.created);
    let keyB = new Date(b.created);
    // Compare the 2 dates
    if (keyA < keyB) return 1;
    if (keyA > keyB) return -1;
    return 0;
  });

  res.render('index', { title: 'index', tweets });
};

exports.testRoute = async (req, res) => {
  Tweet.findOne().populate('replies');
};
