const { Sequelize } = require('sequelize');
// Konfigurasi koneksi Sequelize
const sequelize = new Sequelize('manajemenToko', 'root', '', {
 host: 'localhost',
 dialect: 'mysql'
});

//define models
const EfektivitasPromosi = require('./efektivitasPromosi')(sequelize, Sequelize.DataTypes);
const EmailKampanye = require('./emailKampanye')(sequelize, Sequelize.DataTypes);
const Laporan = require('./laporan')(sequelize, Sequelize.DataTypes);
const Pelanggan = require('./pelanggan')(sequelize, Sequelize.DataTypes);
const PemilikToko = require('./pemilikToko')(sequelize, Sequelize.DataTypes);
const Penjualan = require('./penjualan')(sequelize, Sequelize.DataTypes);
const Produk = require('./produk')(sequelize, Sequelize.DataTypes);
const Promosi = require('./promosi')(sequelize, Sequelize.DataTypes);
const PromosiProduk = require('./promosiProduk')(sequelize, Sequelize.DataTypes);


sequelize.sync()
.then(() => {
    console.log("Koneksi Berhasil");
})
.catch(err => {
    console.log("Koneksi Gagal");
});

module.exports = {sequelize, EfektivitasPromosi, EmailKampanye, Laporan, Pelanggan, PemilikToko, Penjualan, Produk, Promosi, PromosiProduk};