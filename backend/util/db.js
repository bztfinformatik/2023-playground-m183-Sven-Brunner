const { Sequelize } = require("sequelize");

const db = new Sequelize(
  process.env.NODE_DBSCHEMA,
  process.env.NODE_DBUSER,
  process.env.NODE_DBPWD,
  {
    dialect: process.env.NODE_DBDIALECT,
    port: parseInt(process.env.NODE_DBPORT),
    host: process.env.NODE_DBHOST,
  }
);

module.exports = db;