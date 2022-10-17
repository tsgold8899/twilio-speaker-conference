const passport = require('passport');

exports.login = (req, res, next) => {
  res.render('login');
};

exports.postLogin = passport.authenticate('local', {
  failureRedirect: '/login',
  failureMessage: true,
  successRedirect: '/',
});
