const express = require('express');
const router = express.Router();
const {Produk} = require('../models');
const upload = require('../middleware/upload');
const {authenticate, authorize} = require('../middleware/auth')

// Endpoint untuk menambahkan Produk, hanya bisa admin. authorize(['admin'])
router.post('/', authenticate, authorize(['admin']), async (req, res, next) => {
  try {
    const { nama, harga, stok} = req.body;
    const produk = await Produk.create({ nama, harga, stok });
    res.status(201).json(produk);
  } catch (err) {
    next(err);
  }
});

// Endpoint untuk menambah foto produk
router.post('/uploadProdukPict', authenticate, authorize(['admin']), upload.single('photoProduct'), async (req, res, next) => {
  try {
    const produk = await Produk.findByPk(req.user.id);
    if (!produk) {
      return res.status(404).json({ message: 'Product not found' });
    }
    produk.photoProduct = req.file.path; // Simpan path gambar ke database
    await produk.save();
    res.json({ message: 'Product photo uploaded successfully', filePath: req.file.path });
  } catch (err) {
    next(err);
  }
});

// Endpoint untuk menghapus Photo Produk berdasarkan ID
router.delete('/uploadProduct/:id', authenticate, authorize(['admin']), async (req, res, next) => {
  try {
    const produk = await Produk.findByPk(req.params.id);
    if (produk) {
      const photoPath = produk.photoProduct; // Misalnya ini menyimpan path file
      fs.unlink(path.join(__dirname, '../path/to/photos', photoPath), async (err) => {
        if (err) {
          return next(err);
        }
        await produk.update({ photoProduct: null }); // Atau Anda bisa menghapus produk tersebut
        res.json({ message: 'Product Photo deleted' });
      });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (err) {
    next(err);
  }
});

// Endpoint untuk menampilkan semua Produk
router.get('/', authenticate, async (req, res, next) => {
  try {
    const produk = await Produk.findAll();
    res.json(produk);
  } catch (err) {
    next(err);
  }
});

// Endpoint untuk menampilkan Produk berdasarkan ID
router.get('/:id', authenticate, async (req, res, next) => {
  try {
    const produk = await Produk.findByPk(req.params.id);
    if (produk) {
      res.json(produk);
    } else {
      res.status(404).json({ message: 'Produk not found' });
    }
  } catch (err) {
    next(err);
  }
});

// Endpoint untuk memperbarui Produk berdasarkan ID
router.put('/:id', authenticate, authorize(['admin']), async (req, res, next) => {
  try {
    const { nama, harga, stok, photoProduct } = req.body;
    const produk = await Produk.findByPk(req.params.id);
    if (produk) {
        produk.nama = nama;
        produk.harga = harga;
        produk.stok = stok;
        produk.photoProduct = photoProduct;
      await produk.save();
      res.json(produk);
    } else {
      res.status(404).json({ message: 'Produk not found' });
    }
  } catch (err) {
    next(err);
  }
});

// Endpoint untuk menghapus Produk berdasarkan ID
router.delete('/:id', authenticate, authorize(['admin']), async (req, res, next) => {
  try {
    const produk = await Produk.findByPk(req.params.id);
    if (produk) {
      await produk.destroy();
      res.json({ message: 'Produk deleted' });
    } else {
      res.status(404).json({ message: 'Produk not found' });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
