const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Pembayaran = sequelize.define('Pembayaran', {
  idPembayaran: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  idPesanan: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Pesanans', // Nama tabel sesuai dengan definisi model Pesanan
      key: 'idPesanan',
    },
  },
}, {
  timestamps: true,
});

module.exports = Pembayaran;