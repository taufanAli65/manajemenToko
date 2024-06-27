const express = require('express');
const router = express.Router();
const {PromosiProduk} = require('../models');
const {authenticate, authorize} = require('../middleware/auth');

// Endpoint untuk menambahkan promosi produk
router.post('/', authenticate, authorize(['admin']), async (req, res, next) => {
  try {
    const { promosiID, produkID } = req.body;
    const promosiProduk = await PromosiProduk.create({ promosiID, produkID });
    res.status(201).json(promosiProduk);
  } catch (err) {
    next(err);
  }
});

// Endpoint untuk menampilkan semua promosi produk
router.get('/', authenticate, async (req, res, next) => {
  try {
    const promosiProduk = await PromosiProduk.findAll();
    res.json(promosiProduk);
  } catch (err) {
    next(err);
  }
});

// Endpoint untuk menampilkan promosi produk berdasarkan ID
router.get('/:id', authenticate, async (req, res, next) => {
  try {
    const promosiProduk = await PromosiProduk.findByPk(req.params.id);
    if (promosiProduk) {
      res.json(promosiProduk);
    } else {
      res.status(404).json({ message: 'promosi produk not found' });
    }
  } catch (err) {
    next(err);
  }
});

// Endpoint untuk memperbarui promosi produk berdasarkan ID
router.put('/:id', authenticate, authorize(['admin']), async (req, res, next) => {
  try {
    const { promosiID, produkID } = req.body;
    const promosiProduk = await PromosiProduk.findByPk(req.params.id);
    if (promosiProduk) {
        promosiProduk.promosiID = promosiID;
        promosiProduk.produkID = produkID;
      await promosiProduk.save();
      res.json(promosiProduk);
    } else {
      res.status(404).json({ message: 'promosi produk not found' });
    }
  } catch (err) {
    next(err);
  }
});

// Endpoint untuk menghapus promosi produk berdasarkan ID
router.delete('/:id', authenticate, authorize(['admin']), async (req, res, next) => {
  try {
    const promosiProduk = await PromosiProduk.findByPk(req.params.id);
    if (promosiProduk) {
      await promosiProduk.destroy();
      res.json({ message: 'promosi produk deleted' });
    } else {
      res.status(404).json({ message: 'promosi produk not found' });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
