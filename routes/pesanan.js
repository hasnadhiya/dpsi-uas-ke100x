var express = require('express');
var router = express.Router();
var authorizeRole = require('../middleware/authorizeRole');
var Pesanan = require('../models/Pesanan');

// Endpoint untuk mendapatkan semua pesanan
router.get('/', async function(req, res, next) {
  try {
    const pesanan = await Pesanan.findAll();
    res.json(pesanan);
  } catch (error) {
    next(error);
  }
});

// Endpoint untuk mendapatkan pesanan berdasarkan ID
router.get('/:id', async function(req, res, next) {
  try {
    const pesanan = await Pesanan.findByPk(req.params.id);
    if (pesanan) {
      res.json(pesanan);
    } else {
      res.status(404).json({ message: 'Pesanan tidak ditemukan' });
    }
  } catch (error) {
    next(error);
  }
});

//Endpoint pesanan order
router.post('/', authorizeRole('owner'|| "karyawan"), async function(req, res, next) {
  const { tanggalPesan, idUser, idProduk, detailProduk } = req.body;
  try {
    const newPesanan = await Pesanan.create({ tanggalPesan, idUser, idProduk, detailProduk });
    res.status(201).json(newPesanan);
  } catch (error) {
    next(error);
  }
});

// Endpoint untuk memperbarui pesanan berdasarkan ID
router.put('/:id', authorizeRole('owner'|| "karyawan"), async function(req, res, next) {
  const { tanggalPesan, idUser, idProduk, detailProduk } = req.body;
  try {
    const pesanan = await Pesanan.findByPk(req.params.id);
    if (pesanan) {
      pesanan.tanggalPesan = tanggalPesan || pesanan.tanggalPesan;
      pesanan.idUser = idUser || pesanan.idUser;
      pesanan.idProduk = idProduk || pesanan.idProduk;
      pesanan.detailProduk = detailProduk || pesanan.detailProduk;
      await pesanan.save();
      res.json(pesanan);
    } else {
      res.status(404).json({ message: 'Pesanan tidak ditemukan' });
    }
  } catch (error) {
    next(error);
  }
});

// Endpoint untuk menghapus pesanan berdasarkan ID
router.delete('/:id', authorizeRole('owner'|| "karyawan"), async function(req, res, next) {
  try {
    const pesanan = await Pesanan.findByPk(req.params.id);
    if (pesanan) {
      await pesanan.destroy();
      res.json({ message: 'Pesanan berhasil dihapus' });
    } else {
      res.status(404).json({ message: 'Pesanan tidak ditemukan' });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
