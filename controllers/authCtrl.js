const passport = require('passport');

exports.login = (req, res, next) => {
  res.render('login');
};

exports.postLogin = (req, res, next) => {
  passport.authenticate('local', {}, (err, user, info) => {
    if (err || !user) {
      return res.render('login', info);
    }
    res.redirect('/');
  })(req, res);
};

exports.logout = (req, res, next) => {
  if (req.session) {
    req.session.destroy(err => {
      res.redirect('/login');
    });
  } else {
    res.redirect('/login');
  }
};
