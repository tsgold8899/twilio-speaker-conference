const dotenv = require('dotenv');

dotenv.config();

const db = require('../models');
const { USER_ROLES } = require('../config/constants');

const seedUsers = async () => {
  try {
    await db.User.findOrCreate({
      where: { username: 'admin' },
      defaults: {
        username: 'admin',
        password: 'password',
        archived: false,
        role: USER_ROLES.ADMIN,
      },
    });
    await db.User.findOrCreate({
      where: { username: 'listener' },
      defaults: {
        username: 'listener',
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
    await db.User.findOrCreate({
      where: { username: 'speaker1' },
      defaults: {
        username: 'speaker1',
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
