const { Sequelize } = require('sequelize');
const {mysql2} = require('mysql2');

const sequelize = new Sequelize(
  "sql12722347",
  "sql12722347",
  "tkynhsA4LV",
  {
    dialect: 'mysql',
    dialectModule: mysql2,
    host: "sql12.freesqldatabase.com",
  }
)

module.exports = sequelize;
