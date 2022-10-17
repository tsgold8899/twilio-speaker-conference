const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const db = require('../models');

module.exports = (app) => {
  const { Op } = db.Sequelize;

  const localStrategy = new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true,
  }, async (req, username, password, done) => {
    db.User.findOne({
      where: {
        [Op.and]: db.sequelize.literal(`lower(username)='${username.toLowerCase()}'`),
        archived: { [Op.not]: true },
      },
    }).then((user) => {
      if (!user || !user.authenticate(password)) {
        return done(null, false, { message: 'Incorrect username or password.' });
      }
      return done(null, user, { message: 'Logged In Successfully' });
    }).catch((err) => done(err));
  });

  passport.use(localStrategy);
};
