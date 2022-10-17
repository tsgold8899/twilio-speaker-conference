const passport = require('passport');

const { USER_ROLES } = require('../config/constants');

const handleRole = (req, res, next, roles) => async (err, user /* , info */) => {
  if (!user && roles && !roles.length) {
    return next();
  }
  if (!user) return res.status(404).send('Unauthorized');

  if (roles && roles.length && !roles.includes(user.role)) {
    return res.status(404).send('You are not authorized to perform this action.');
  }
  req.user = user;

  return next();
};

const authorize = (roles) => (req, res, next) => {
  if(req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};

exports.isAuthenticated = authorize();
exports.isAdmin = authorize([USER_ROLES.ADMIN]);
exports.isSpeaker = authorize([USER_ROLES.SPEAKER]);
exports.isListener = authorize([USER_ROLES.LISTENER]);
