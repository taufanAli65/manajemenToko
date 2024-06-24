const express = require('express');
const router = express.Router();
const {Pelanggan} = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Rute pendaftaran
router.post('/register', async (req, res, next) => {
  try {
    const { username, password, email} = req.body;
    const newPelanggan = await Pelanggan.create({ username, password, email});
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    next(err);
  }
});

// Rute login
router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const pelanggan = await Pelanggan.findOne({ where: { username } });
    if (!pelanggan) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, pelanggan.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign(
      { id: pelanggan.id},
      'your_jwt_secret',
      { expiresIn: '1h' }
    );
    res.json({ token });
  } catch (err) {
    next(err);
  }
});

module.exports = router;