const express = require('express');
const router = express.Router();
const {Pelanggan, PemilikToko} = require('../models');
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

router.post('/registerAdmin', async(req, res, next) => {
  try {
    const { username, password, email } = req.body;
    const newAdmin = await PemilikToko.create({username, password, email});
    res.status(201).json({ message: 'Admin Added Successfully'});
  } catch(err) {
    next(err);
  }
})

// Rute login
router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const pelanggan = await Pelanggan.findOne({ where: { username } });
    const pemilikToko = await PemilikToko.findOne({ where: { username } });

    // Pengecekan apakah username ditemukan di antara pelanggan atau pemilikToko
    if (!pelanggan && !pemilikToko) {
      return res.status(401).json({ message: 'Username Salah' });
    }

    // Memeriksa kecocokan password jika username ditemukan
    let isMatch = false;
    if (pelanggan && pelanggan.password) {
      isMatch = await bcrypt.compare(password, pelanggan.password);
    } else if (pemilikToko && pemilikToko.password) {
      isMatch = await bcrypt.compare(password, pemilikToko.password);
    }

    // Memberikan respons sesuai dengan kecocokan password
    if (!isMatch) {
      return res.status(401).json({ message: 'Password Salah' });
    }

    // Membuat token JWT jika username dan password cocok
    const token = jwt.sign(
      { id: pelanggan ? pelanggan.id : pemilikToko.id },
      'your_jwt_secret',
      { expiresIn: '1h' }
    );
    res.json({ token });
  } catch (err) {
    next(err);
  }
});

module.exports = router;