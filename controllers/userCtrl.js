const pick = require('lodash/pick');
const twilio = require('twilio');
const { USER_ROLES } = require('../config/constants');

const db = require('../models');
exports.list = async (req, res, next) => {
  const users = await db.User.findAll({
    order: [['username', 'asc']],
  });
  res.locals.req = req;
  res.render('user-list', {
    users
  });
};

exports.new = async (req, res, next) => {
  try {
    const user = {};
    res.locals.req = req;
    res.render('user-edit', {
      user
    });
  } catch (err) {
    next(err);
  }
};

exports.get = async (req, res, next) => {
  try {
    const { id } = req.params;
    res.locals.req = req;
    const user = await db.User.findByPk(id);
    res.render('user-edit', {
      user
    });
  } catch (err) {
    next(err);
  }
};

const pickUserFields = (payload) => {
  const userFields = pick(payload, [
    'username',
    'password',
    'role',
    'archived',
  ]);
  if (!userFields.password) {
    delete userFields.password;
  }
  userFields.archived = !!userFields.archived;
  return userFields;
};

exports.create = async (req, res, next) => {
  try {
    const user = await db.User.create(pickUserFields(req.body));
    res.redirect('/usr');
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await db.User.findByPk(id);
    await user.update(pickUserFields(req.body));
    res.redirect('/usr');
  } catch (err) {
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await db.User.findByPk(id);
    await user.destroy();
    res.redirect('/usr');
  } catch (err) {
    next(err);
  }
};
