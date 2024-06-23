const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
    const Pelanggan = sequelize.define('Pelanggan', {
        pelangganID : {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username : {
            type: DataTypes.STRING,
            allowNull: false
        },
        password : {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        hooks: {
          beforeCreate: async (user) => {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
          }
        }
      });
    return Pelanggan;
}; 