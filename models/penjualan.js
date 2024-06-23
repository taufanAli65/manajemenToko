module.exports = (sequelize, DataTypes) => {
    const Penjualan = sequelize.define('Penjualan', {
        penjualanID : {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        produkID : {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        pelangganID : {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        jumlah: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        totalHarga: {
            type: DataTypes.DECIMAL,
            allowNull: false
        }
    });
    return Penjualan;
}; 