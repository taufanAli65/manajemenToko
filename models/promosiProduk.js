module.exports = (sequelize, DataTypes) => {
    const PromosiProduk = sequelize.define('PromosiProduk', {
        promosiProdukID : {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        promosiID : {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        produkID : {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });
    return PromosiProduk;
}; 