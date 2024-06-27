const express = require('express');
const router = express.Router();
const {EmailKampanye} = require('../models');
const {authenticate, authorize} = require('../middleware/auth');
const upload = require('../middleware/upload');

// Endpoint untuk menambahkan Email Kampanye
router.post('/', authenticate, authorize(['admin']), async (req, res, next) => {
  try {
    const { subjek, konten, tanggalKirim, userID } = req.body;
    const emailKampanye = await EmailKampanye.create({ subjek, konten, lampiran, tanggalKirim, userID });
    res.status(201).json(emailKampanye);
  } catch (err) {
    next(err);
  }
});

// Endpoint untuk menambah foto produk
router.post('/lampiran', authenticate, authorize(['admin']), upload.single('lampiran'), async (req, res, next) => {
  try {
    const emailKampanye = await EmailKampanye.findByPk(req.user.id);
    if (!emailKampanye) {
      return res.status(404).json({ message: 'email Kampanye not found' });
    }
    emailKampanye.lampiran = req.file.path; // Simpan path gambar ke database
    await emailKampanye.save();
    res.json({ message: 'Lampiran email uploaded successfully', filePath: req.file.path });
  } catch (err) {
    next(err);
  }
});

// Endpoint untuk menghapus lampiran berdasarkan ID
router.delete('/lampiran/:id', authenticate, authorize(['admin']), async (req, res, next) => {
  try {
    const emailKampanye = await EmailKampanye.findByPk(req.params.id);
    if (emailKampanye) {
      const lampiranpath = emailKampanye.lampiran; // Misalnya ini menyimpan path file
      fs.unlink(path.join(__dirname, '../path/to/photos', lampiranpath), async (err) => {
        if (err) {
          return next(err);
        }
        await emailKampanye.update({ lampiran: null }); // Atau Anda bisa menghapus produk tersebut
        res.json({ message: 'Lampiran deleted' });
      });
    } else {
      res.status(404).json({ message: 'Email not found' });
    }
  } catch (err) {
    next(err);
  }
});

// Endpoint untuk menampilkan semua Email Kampanye
router.get('/', authenticate, authorize(['admin']), async (req, res, next) => {
  try {
    const emailKampanye = await EmailKampanye.findAll();
    res.json(emailKampanye);
  } catch (err) {
    next(err);
  }
});

// Endpoint untuk menampilkan Email Kampanye berdasarkan ID
router.get('/:id', authenticate, authorize(['admin']), async (req, res, next) => {
  try {
    const emailKampanye = await EmailKampanye.findByPk(req.params.id);
    if (emailKampanye) {
      res.json(emailKampanye);
    } else {
      res.status(404).json({ message: 'Email Kampanye not found' });
    }
  } catch (err) {
    next(err);
  }
});

// Endpoint untuk memperbarui Email Kampanye berdasarkan ID
router.put('/:id', authenticate, authorize(['admin']), async (req, res, next) => {
  try {
    const { subjek, konten, lampiran, tanggalKirim, userID } = req.body;
    const emailKampanye = await EmailKampanye.findByPk(req.params.id);
    if (emailKampanye) {
        emailKampanye.subjek = subjek;
        emailKampanye.konten = konten;
        emailKampanye.lampiran = lampiran;
        emailKampanye.tanggalKirim = tanggalKirim;
        emailKampanye.userID = userID;
      await emailKampanye.save();
      res.json(emailKampanye);
    } else {
      res.status(404).json({ message: 'Email Kampanye not found' });
    }
  } catch (err) {
    next(err);
  }
});

// Endpoint untuk menghapus Email Kampanye berdasarkan ID
router.delete('/:id', authenticate, authorize(['admin']), async (req, res, next) => {
  try {
    const emailKampanye = await EmailKampanye.findByPk(req.params.id);
    if (emailKampanye) {
      await emailKampanye.destroy();
      res.json({ message: 'Email Kampanye deleted' });
    } else {
      res.status(404).json({ message: 'Email Kampanye not found' });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
