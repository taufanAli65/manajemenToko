const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        username : {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password : {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.ENUM("admin", "user")
        },
        photo : {
            type: DataTypes.STRING
        }
    }, {
        hooks: {
          beforeCreate: async (user) => {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
          }
        }
      });
    return User;
}; 