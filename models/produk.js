module.exports = (sequelize, DataTypes) => {
    const Produk = sequelize.define('Produk', {
        produkID : {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nama : {
            type: DataTypes.STRING,
            allowNull: false
        },
        harga : {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        stok: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });
    return Produk;
}; 