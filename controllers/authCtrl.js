const passport = require('passport');

exports.login = (req, res, next) => {
  res.render('login');
};

exports.postLogin = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login'
});
