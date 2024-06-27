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
const User = require('./user')(sequelize, Sequelize.DataTypes);
const Penjualan = require('./penjualan')(sequelize, Sequelize.DataTypes);
const Produk = require('./produk')(sequelize, Sequelize.DataTypes);
const Promosi = require('./promosi')(sequelize, Sequelize.DataTypes);
const PromosiProduk = require('./promosiProduk')(sequelize, Sequelize.DataTypes);

//database relation
User.hasMany(EmailKampanye, { foreignKey: "userID" });
EmailKampanye.belongsTo(User, { foreignKey: "userID" });

User.hasMany(Penjualan, { foreignKey : "userID" });
Penjualan.belongsTo(User, { foreignKey : "userID"});
Produk.hasMany(Penjualan, { foreignKey : "produkID" });
Penjualan.belongsTo(Produk, {foreignKey : "produkID"});

Produk.hasMany(PromosiProduk, {foreignKey : "produkID"});
PromosiProduk.belongsTo(Produk, { foreignKey : "produkID" });
Promosi.hasMany(PromosiProduk, { foreignKey : "promosiID" });
PromosiProduk.belongsTo(Promosi, { foreignKey : "promosiID" });

Produk.hasMany(Laporan, { foreignKey : "produkTerlarisID" });
Laporan.belongsTo(Produk, {foreignKey : "produkID" });
Promosi.hasMany(Laporan, { foreignKey : "promosiID" });
Laporan.belongsTo(Promosi, { foreignKey : "promosiID" });

Promosi.hasMany(EfektivitasPromosi, { foreignKey : "promosiID" });
EfektivitasPromosi.belongsTo(Promosi, { foreignKey : "promosiID" });

sequelize.sync()
.then(() => {
    console.log("Koneksi Berhasil");
})
.catch(err => {
    console.log("Koneksi Gagal");
});

module.exports = {sequelize, EfektivitasPromosi, EmailKampanye, Laporan, User, Penjualan, Produk, Promosi, PromosiProduk};