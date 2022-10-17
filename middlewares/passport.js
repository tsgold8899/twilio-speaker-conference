const passport = require('passport');
const LocalStrategy = require('passport-local');

const db = require('../models');

module.exports = (app) => {
  app.use(passport.initialize());
  passport.use(new LocalStrategy((username, password, cb) => {
    const { Op } = db.Sequelize;
    db.User.findOne({
      where: {
        [Op.and]: db.sequelize.literal(`lower(username)='${username.toLowerCase()}'`),
        archived: { [Op.not]: true },
      },
    }).then((user) => {
      if (!user || !user.authenticate(password)) {
        return cb(null, false, { message: 'Incorrect username or password.' });
      }
      return cb(null, user);
    }).catch((err) => cb(err));
  }));

  passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, {
        id: user.id,
        username: user.username,
      });
    });
  });

  passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, user);
    });
  });
};
