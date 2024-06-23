module.exports = (sequelize, DataTypes) => {
    const Laporan = sequelize.define('Laporan', {
        laporanID : {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        totalPenjualan : {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        produkTerlarisID : {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        promosiID: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });
    return Laporan;
}; 