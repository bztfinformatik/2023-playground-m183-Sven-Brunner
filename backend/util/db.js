const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('M183_CHAT', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
});

sequelize.sync();