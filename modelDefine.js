
const User = require('./models/user');
const Pesanan = require('./models/Pesanan');
const Product = require('./models/Product');
const Pembayaran = require('./models/Pembayaran');


User.hasMany(Pesanan, { foreignKey: 'idUser' });
Pesanan.belongsTo(User, { foreignKey: 'idUser' });


Product.hasMany(Pesanan, { foreignKey: 'idProduk' });
Pesanan.belongsTo(Product, { foreignKey: 'idProduk' });


Pesanan.hasMany(Pembayaran, { foreignKey: 'idPesanan' });
Pembayaran.belongsTo(Pesanan, { foreignKey: 'idPesanan' });

module.exports = { User, Pesanan, Product, Pembayaran };
