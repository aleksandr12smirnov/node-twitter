const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.index = async (req, res) => {
  // req.flash('success', 'Test Flash');
  // req.flash('error', 'Test Flash');
  // req.flash('info', 'Test Flash');
  if (req.user) {
    const populatedUser = await User.findById(req.user._id).populate('tweets');
    res.render('index', { title: 'index', tweets: populatedUser.tweets });
  } else {
    res.render('landing', { title: 'Welcome!' });
  }
};
