const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const configs = require('../config/sequelize');

const env = process.env.NODE_ENV || 'development';
const config = configs[env];

const basename = 'index.js';

const options = {
  ...config,
};
if (env !== 'development') {
  options.logging = false;
}

Sequelize.postgres.DECIMAL.parse = (value) => parseFloat(value);

const sequelize = new Sequelize(config.database,
  config.username,
  config.password,
  options);

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

fs
  .readdirSync(path.join(__dirname, '../models/'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    let model = require(path.join(__dirname, '../models/', file));
    model = model(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  const model = db[modelName];
  if (model.associate) {
    model.associate(db);
  }
});

module.exports = db;
