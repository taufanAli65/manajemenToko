module.exports = (sequelize, DataTypes) => {
    const EvektivitasPromosi = sequelize.define('EfektivitasPromosi', {
        efektivitasID : {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        promosiID : {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        penjualanSelamaPromosi : {
            type: DataTypes.DECIMAL,
            allowNull: false
        }
    });
    return EvektivitasPromosi;
};