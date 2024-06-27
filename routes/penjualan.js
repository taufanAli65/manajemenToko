const express = require('express');
const router = express.Router();
const {Penjualan} = require('../models');
const {authenticate, authorize} = require('../middleware/auth')

// Endpoint untuk menambahkan Penjualan
router.post('/', authenticate, authorize(['admin']), async (req, res, next) => {
  try {
    const { produkID, userID, jumlah, totalHarga } = req.body;
    const penjualan = await Penjualan.create({ produkID, userID, jumlah, totalHarga });
    res.status(201).json(penjualan);
  } catch (err) {
    next(err);
  }
});

// Endpoint untuk menampilkan semua Penjualan
router.get('/', authenticate, authorize(['admin']), async (req, res, next) => {
  try {
    const penjualan = await Penjualan.findAll();
    res.json(penjualan);
  } catch (err) {
    next(err);
  }
});

// Endpoint untuk menampilkan Penjualan berdasarkan ID
router.get('/:id', authenticate, async (req, res, next) => {
  try {
    const penjualan = await Penjualan.findByPk(req.params.id);
    if (penjualan) {
      res.json(penjualan);
    } else {
      res.status(404).json({ message: 'Penjualan not found' });
    }
  } catch (err) {
    next(err);
  }
});

// Endpoint untuk memperbarui Penjualan berdasarkan ID
router.put('/:id', authenticate, authorize(['admin']), async (req, res, next) => {
  try {
    const { produkID, userID, jumlah, totalHarga } = req.body;
    const penjualan = await Penjualan.findByPk(req.params.id);
    if (penjualan) {
        penjualan.produkID = produkID;
        penjualan.userID = userID;
        penjualan.jumlah = jumlah;
        penjualan.totalHarga = totalHarga;
      await penjualan.save();
      res.json(penjualan);
    } else {
      res.status(404).json({ message: 'Laporan Penjualan not found' });
    }
  } catch (err) {
    next(err);
  }
});

// Endpoint untuk menghapus Penjualan berdasarkan ID
router.delete('/:id', authenticate, authorize(['admin']), async (req, res, next) => {
  try {
    const penjualan = await Penjualan.findByPk(req.params.id);
    if (penjualan) {
      await penjualan.destroy();
      res.json({ message: 'Penjualan deleted' });
    } else {
      res.status(404).json({ message: 'Penjualan not found' });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
