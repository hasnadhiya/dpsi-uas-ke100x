const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('dpsi-uas-ke100x', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;
