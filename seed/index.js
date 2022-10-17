const dotenv = require('dotenv');

dotenv.config();

const db = require('../models');
const { USER_ROLES } = require('../config/constants');

const seedUsers = async () => {
  try {
    await db.User.findOrCreate({
      where: { username: 'tsgold8899' },
      defaults: {
        username: 'tsgold8899',
        password: 'password',
        archived: false,
        role: USER_ROLES.LISTENER,
      },
    });
    await db.User.findOrCreate({
      where: { username: 'speaker' },
      defaults: {
        username: 'speaker',
        password: 'password',
        archived: false,
        role: USER_ROLES.SPEAKER,
      },
    });
  } catch (err) {
    console.log(err.message);
  }
};

seedUsers();
