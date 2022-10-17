const passport = require('passport');

const { USER_ROLES } = require('../config/constants');

const handleRole = (req, res, next, roles) => async (err, user /* , info */) => {
  if (!user && roles && !roles.length) {
    return next();
  }
  if (!user) return response.serverUnauthorized(res, 'Unauthorized');

  if (roles && roles.length && !roles.includes(user.role)) {
    return response.permissionDenied(res, 'You are not authorized to perform this action.');
  }
  req.user = user;

  return next();
};

const authorize = (roles) => (req, res, next) =>
  passport.authenticate('session', {}, handleRole(req, res, next, roles))(req, res, next);

exports.isAuthenticated = authorize();
exports.isAdmin = authorize([USER_ROLES.ADMIN]);
exports.isSpeaker = authorize([USER_ROLES.SPEAKER]);
exports.isListener = authorize([USER_ROLES.LISTENER]);
