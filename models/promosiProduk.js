module.exports = (sequelize, DataTypes) => {
    const PromosiProduk = sequelize.define('PromosiProduk', {
        promosiID : {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        produkID : {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });
    return PromosiProduk;
}; 