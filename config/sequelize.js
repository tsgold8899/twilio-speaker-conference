const dotenv = require('dotenv');

dotenv.config();

const database = {
  username: process.env.DB_UN,
  password: process.env.DB_PW,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  dialect: process.env.DB_TYPE,
  operatorsAliases: false,
  // logging: false,
  logging: console.log,
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
    acquire: 200000,
    evict: 10000,
    handleDisconnects: true,
    connectRetries: 5,
  },
};

module.exports = {
  development: database,
  staging: database,
  production: database,
};
