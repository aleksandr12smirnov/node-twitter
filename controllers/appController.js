exports.index = (req, res) => {
    // req.flash('success', 'Test Flash');
    // req.flash('error', 'Test Flash');
    // req.flash('info', 'Test Flash');
    res.render('index', { title: 'index' });
};
