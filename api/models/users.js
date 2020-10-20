const bcrypt = require('bcrypt');

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        name: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        store_id: {
            type: Sequelize.INTEGER
        },
        status: {
            type: Sequelize.TINYINT,
            defaultValue: 1
        },
        createdAt: {
            type: Sequelize.DATE,
            defaultValue: sequelize.literal('NOW()')
        },
        updatedAt: {
            type: Sequelize.DATE,
            defaultValue: sequelize.literal('NOW()')
        }
    });
    function generateHash(user) {
        if (user === null) {
            throw new Error('No found employee');
        }
        else if (!user.changed('password')) return user.password;
        else {
            let salt = bcrypt.genSaltSync();
            return user.password = bcrypt.hashSync(user.password, salt);
        }
    }
    User.beforeCreate(generateHash);

    User.beforeUpdate(generateHash);

    return User;
};

