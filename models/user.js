const bcrypt = require('bcrypt');

const { passwordValidator, generatePasswordDigest } = require('../utils/helpers');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    role: DataTypes.STRING,
    username: DataTypes.STRING,
    passwordDigest: {
      type: DataTypes.STRING(128),
      field: 'password'
    },
    password: {
      type: DataTypes.VIRTUAL,
      validate: {
        validateStrength: (val) => {
          if (val && !passwordValidator.isStrong(val)) {
            throw new Error('Password is too weak');
          }
        }
      }
    },
    archived: DataTypes.BOOLEAN,
  }, {
    freezeTableName: true,
    underscored: true,
    timestamps: true,
    hooks: {
      beforeSave: (user) => {
        if (user.username) {
          user.username = user.username.toLowerCase();
        }
        if (user.password) {
          user.passwordDigest = generatePasswordDigest(user.password);
        }
      }
    }
  });
  User.prototype.authenticate = function (value) {
    if (bcrypt.compareSync(value, this.passwordDigest)) {
      return this;
    }
    return false;
  };
  return User;
};
