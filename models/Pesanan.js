const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Pesanan = sequelize.define('Pesanan', {
  idPesanan: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  tanggalPesan: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  idUser: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users', // Nama tabel sesuai dengan definisi model User
      key: 'id',
    },
  },
  idProduk: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Products', // Nama tabel sesuai dengan definisi model Product
      key: 'idProduk',
    },
  },
  detailProduk: {
    type: DataTypes.JSON,
  },
}, {
  timestamps: true,
});

module.exports = Pesanan;