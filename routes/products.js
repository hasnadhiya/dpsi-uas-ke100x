var express = require('express');
var router = express.Router();
var authorizeRole = require('../middleware/authorizeRole');
var Product = require('../models/Product');

// Endpoint untuk mendapatkan semua produk
router.get('/', async function(req, res, next) {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    next(error);
  }
});

// Endpoint untuk mendapatkan produk berdasarkan ID
router.get('/:id', async function(req, res, next) {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    next(error);
  }
});

// Endpoint untuk menambahkan produk baru (hanya untuk owner n karyawan)
router.post('/', authorizeRole('owner'|| "karyawan"), async function(req, res, next) {
  const { namaProduk, kategori, harga, stok, gambar } = req.body;
  try {
    const newProduct = await Product.create({ namaProduk, kategori, harga, stok, gambar });
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
});

// Endpoint untuk memperbarui produk berdasarkan ID (hanya untuk owner n karyawan)
router.put('/:id', authorizeRole('owner'|| "karyawan"), async function(req, res, next) {
  const { namaProduk, kategori, harga, stok, gambar } = req.body;
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      product.namaProduk = namaProduk || product.namaProduk;
      product.kategori = kategori || product.kategori;
      product.harga = harga || product.harga;
      product.stok = stok || product.stok;
      product.gambar = gambar || product.gambar;
      await product.save();
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
