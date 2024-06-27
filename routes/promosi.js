const express = require('express');
const router = express.Router();
const {Promosi} = require('../models');
const {authenticate, authorize} = require('../middleware/auth');

// Endpoint untuk menambahkan promosi
router.post('/', authenticate, authorize(['admin']), async (req, res, next) => {
  try {
    const { nama, deskripsi, periodeMulai, periodeSelesai, diskon } = req.body;
    const promosi = await Promosi.create({ nama, deskripsi, periodeMulai, periodeSelesai, diskon });
    res.status(201).json(promosi);
  } catch (err) {
    next(err);
  }
});

// Endpoint untuk menampilkan semua promosi
router.get('/', authenticate, async (req, res, next) => {
  try {
    const promosi = await Promosi.findAll();
    res.json(promosi);
  } catch (err) {
    next(err);
  }
});

// Endpoint untuk menampilkan promosi berdasarkan ID
router.get('/:id', authenticate, async (req, res, next) => {
  try {
    const promosi = await Promosi.findByPk(req.params.id);
    if (promosi) {
      res.json(promosi);
    } else {
      res.status(404).json({ message: 'promosi not found' });
    }
  } catch (err) {
    next(err);
  }
});

// Endpoint untuk memperbarui promosi berdasarkan ID
router.put('/:id', authenticate, authorize(['admin']), async (req, res, next) => {
  try {
    const { nama, deskripsi, periodeMulai, periodeSelesai, diskon } = req.body;
    const promosi = await Promosi.findByPk(req.params.id);
    if (promosi) {
        promosi.nama = nama;
        promosi.deskripsi = deskripsi;
        promosi.periodeMulai = periodeMulai;
        promosi.periodeSelesai = periodeSelesai;
        promosi.diskon = diskon;
      await promosi.save();
      res.json(promosi);
    } else {
      res.status(404).json({ message: 'promosi not found' });
    }
  } catch (err) {
    next(err);
  }
});

// Endpoint untuk menghapus promosi berdasarkan ID
router.delete('/:id', authenticate, authorize(['admin']), async (req, res, next) => {
  try {
    const promosi = await Promosi.findByPk(req.params.id);
    if (promosi) {
      await promosi.destroy();
      res.json({ message: 'promosi deleted' });
    } else {
      res.status(404).json({ message: 'promosi not found' });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
