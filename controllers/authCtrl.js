const passport = require('passport');

exports.login = (req, res, next) => {
  res.render('login');
};

exports.postLogin = (req, res, next) => {
  passport.authenticate('local', {}, (err, user, info) => {
    if (err || !user) {
      return res.render('login', info);
    }
    req.session.user = user.id;
    res.redirect('/');
  })(req, res);
};

exports.logout = (req, res, next) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/login');
  });
};
