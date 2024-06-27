const express = require('express');
const router = express.Router();
const {User} = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Rute pendaftaran
router.post('/register', async (req, res, next) => {
  try {
    const { username, password, email, role } = req.body;
    const newUser = await User.create({ username, password, email, role });
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    next(err);
  }
});

// Rute login
router.post('/login', async (req, res, next) => {
  try {
    const { username, password, email, role } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid Username' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid Password' });
    }
    const token = jwt.sign(
      { id: user.id, role: user.role },
      'your_jwt_secret',
      { expiresIn: '1h' }
    );
    res.json({ token });
  } catch (err) {
    next(err);
  }
});

module.exports = router;