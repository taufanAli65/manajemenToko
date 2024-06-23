module.exports = (sequelize, DataTypes) => {
    const PromosiProduk = sequelize.define('PromosiProduk', {
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