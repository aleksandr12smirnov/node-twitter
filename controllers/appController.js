exports.index = (req, res) => {
  // req.flash('success', 'Test Flash');
  // req.flash('error', 'Test Flash');
  // req.flash('info', 'Test Flash');
  if (req.user) {
    res.render('index', { title: 'index' });
  } else {
    res.render('landing', { title: 'Welcome!' });
  }
};
