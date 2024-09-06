const { Sequelize } = require("sequelize");
require("dotenv").config();
// Database connection configuration

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.USER_NAME,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    dialect: process.env.DIALECT,
  }
);

module.exports = sequelize;
