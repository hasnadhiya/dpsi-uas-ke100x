const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('dpsi-uas-ke100x', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

console.log(sequelize)

 // Uji koneksi
 sequelize.authenticate()
 .then(() => {
 console.log('Connection has been established successfully.');
 })
 .catch(err => {
 console.error('Unable to connect to the database:', err);
 });

module.exports = sequelize;