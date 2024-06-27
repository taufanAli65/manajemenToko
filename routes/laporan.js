const express = require('express');
const router = express.Router();
const {Laporan} = require('../models');
const {authenticate, authorize} = require('../middleware/auth')

// Endpoint untuk menambahkan Laporan Penjualan
router.post('/', authenticate, authorize(['admin']), async (req, res, next) => {
  try {
    const { totalPenjualan, produkTerlarisID, promosiID } = req.body;
    const laporan = await Laporan.create({ totalPenjualan, produkTerlarisID, promosiID });
    res.status(201).json(laporan);
  } catch (err) {
    next(err);
  }
});

// Endpoint untuk menampilkan semua Laporan Penjualan
router.get('/', authenticate, authorize(['admin']), async (req, res, next) => {
  try {
    const laporan = await Laporan.findAll();
    res.json(laporan);
  } catch (err) {
    next(err);
  }
});

// Endpoint untuk menampilkan Laporan Penjualan berdasarkan ID
router.get('/:id', authenticate, authorize(['admin']), async (req, res, next) => {
  try {
    const laporan = await Laporan.findByPk(req.params.id);
    if (laporan) {
      res.json(laporan);
    } else {
      res.status(404).json({ message: 'Laporan Penjualan not found' });
    }
  } catch (err) {
    next(err);
  }
});

// Endpoint untuk memperbarui Laporan Penjualan berdasarkan ID
router.put('/:id', authenticate, authorize(['admin']), async (req, res, next) => {
  try {
    const { totalPenjualan, produkTerlarisID, promosiID } = req.body;
    const laporan = await Laporan.findByPk(req.params.id);
    if (laporan) {
        laporan.totalPenjualan = totalPenjualan;
        laporan.produkTerlarisID = produkTerlarisID;
        laporan.promosiID = promosiID;
      await laporan.save();
      res.json(laporan);
    } else {
      res.status(404).json({ message: 'Laporan Penjualan not found' });
    }
  } catch (err) {
    next(err);
  }
});

// Endpoint untuk menghapus Laporan Penjualan berdasarkan ID
router.delete('/:id', authenticate, authorize(['admin']), async (req, res, next) => {
  try {
    const laporan = await Laporan.findByPk(req.params.id);
    if (laporan) {
      await laporan.destroy();
      res.json({ message: 'Laporan Penjualan deleted' });
    } else {
      res.status(404).json({ message: 'Laporan Penjualan not found' });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
