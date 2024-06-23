module.exports = (sequelize, DataTypes) => {
    const EmailKampanye = sequelize.define('EmailKampanye', {
        emailID : {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        subjek: {
            type: DataTypes.STRING,
            allowNull: false
        },
        konten: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lampiran: {
            type: DataTypes.STRING,
            allowNull: true
        },
        tanggalKirim: {
            type: DataTypes.DATE,
            allowNull: false
        },
        pelangganID: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });
    return EmailKampanye;
};