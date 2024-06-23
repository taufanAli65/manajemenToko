module.exports = (sequelize, DataTypes) => {
    const Promosi = sequelize.define('Promosi', {
        promosiID : {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nama : {
            type: DataTypes.STRING,
            allowNull: false
        },
        deskripsi : {
            type: DataTypes.STRING,
            allowNull: false
        },
        periodeMulai: {
            type: DataTypes.DATE,
            allowNull: false
        },
        periodeSelesai : {
            type: DataTypes.DATE,
            allowNull: false
        },
        diskon : {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });
    return Promosi;
}; 