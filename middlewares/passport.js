const passport = require('passport');
const LocalStrategy = require('passport-local');

const db = require('../models');

module.exports = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());
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
};
