const express = require('express');
const router = express.Router();
const {EfektivitasPromosi} = require('../models');
const {authenticate, authorize} = require('../middleware/auth');

// Endpoint untuk menambahkan efektivitas promosi baru
router.post('/', authenticate, authorize(['admin']), async (req, res, next) => {
  try {
    const { promosiID, penjualanSelamaPromosi } = req.body;
    const newEfektivitasPromosi = await EfektivitasPromosi.create({ promosiID, penjualanSelamaPromosi });
    res.status(201).json(newEfektivitasPromosi);
  } catch (err) {
    next(err);
  }
});

// Endpoint untuk menampilkan semua efektivitas promosi
router.get('/', authenticate, authorize(['admin']), async (req, res, next) => {
  try {
    const efektivitasPromosi = await EfektivitasPromosi.findAll();
    res.json(efektivitasPromosi);
  } catch (err) {
    next(err);
  }
});

// Endpoint untuk menampilkan efektivitas promosi berdasarkan ID
router.get('/:id', authenticate, authorize(['admin']), async (req, res, next) => {
  try {
    const efektivitasPromosi = await EfektivitasPromosi.findByPk(req.params.id);
    if (efektivitasPromosi) {
      res.json(efektivitasPromosi);
    } else {
      res.status(404).json({ message: 'Efektivitas Promosi not found' });
    }
  } catch (err) {
    next(err);
  }
});

// Endpoint untuk memperbarui efektivitas promosi berdasarkan ID
router.put('/:id', authenticate, authorize(['admin']), async (req, res, next) => {
  try {
    const { promosiID, penjualanSelamaPromosi } = req.body;
    const efektivitasPromosi = await EfektivitasPromosi.findByPk(req.params.id);
    if (efektivitasPromosi) {
      efektivitasPromosi.promosiID = promosiID;
      efektivitasPromosi.penjualanSelamaPromosi = penjualanSelamaPromosi;
      await efektivitasPromosi.save();
      res.json(efektivitasPromosi);
    } else {
      res.status(404).json({ message: 'Efektivitas Promosi not found' });
    }
  } catch (err) {
    next(err);
  }
});

// Endpoint untuk menghapus efektivitas promosi berdasarkan ID
router.delete('/:id', authenticate, authorize(['admin']), async (req, res, next) => {
  try {
    const efektivitasPromosi = await EfektivitasPromosi.findByPk(req.params.id);
    if (efektivitasPromosi) {
      await efektivitasPromosi.destroy();
      res.json({ message: 'Efektivitas Promosi deleted' });
    } else {
      res.status(404).json({ message: 'Efektivitas Promosi not found' });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
