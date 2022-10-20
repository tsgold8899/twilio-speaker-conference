const passport = require('passport');

const db = require('../models');
const { USER_ROLES } = require('../config/constants');

// const handleRole = (req, res, next, roles) => async (err, user /* , info */) => {
//   if (!user && roles && !roles.length) {
//     return next();
//   }
//   if (!user) return res.status(404).send('Unauthorized');

//   if (roles && roles.length && !roles.includes(user.role)) {
//     return res.status(404).send('You are not authorized to perform this action.');
//   }
//   req.user = user;

//   return next();
// };

const authorize = (roles) => async (req, res, next) => {
  if(req.session.user) {
    const user = await db.User.findByPk(req.session.user);
    if (user) {
      if (!roles || roles.includes(user.role)) {
        req.user = user;
        return next();
      } else {
        return res.status(404).send('Unauthorized');
      }
    }
  }
  res.redirect('/login');
};

exports.isAuthenticated = authorize();
exports.isAdmin = authorize([USER_ROLES.ADMIN]);
exports.isSpeaker = authorize([USER_ROLES.SPEAKER]);
exports.isListener = authorize([USER_ROLES.LISTENER]);
