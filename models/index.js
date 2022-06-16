const { Sequelize } = require("sequelize");

const settings = {
  host: "localhost",
  dialect: "postgres",
};

const sequelize = new Sequelize("DATABASE", "USERNAME", "PASSWORD", settings);

module.exports = sequelize;
