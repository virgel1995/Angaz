const CryptoJS = require("crypto-js");
const { sequelize } = require("..");
const { Sequelize } = require("sequelize");

const Admin = sequelize.define('admin', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: {
            name: 'user_email',
            msg: 'Email address must be unique.',
        },
    },
    profilePic: {
        type: Sequelize.STRING,
        defaultValue: '/images/user.svg',
    },
    new_email: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    update_email_token: {
        type: Sequelize.TEXT,
        allowNull: true,
    },
    update_email_code: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    level: {
        type: Sequelize.STRING,
        allowNull: false,
        enum: ['super', 'high', 'mid', 'low'],
        defaultValue: 'low',
    },
    otp : {
        type: Sequelize.STRING,
        allowNull: true,
    }
}, {
    defaultScope: {
        attributes: {
            exclude: ['new_email', 'update_email_token', 'update_email_code', 'updatedAt']
        }
    },
})

Admin.beforeCreate(async (user) => {
    const ciphertext = CryptoJS.AES.encrypt(user.password, process.env.BCRYPT_SEKRET_KET).toString();
    user.password = ciphertext;
});

Admin.beforeUpdate(async (user) => {
    if (user.changed('password')) {
        const ciphertext = CryptoJS.AES.encrypt(user.password, process.env.BCRYPT_SEKRET_KET).toString();
        user.password = ciphertext;
    }
});

// compare Password
Admin.prototype.comparePassword = async function (password) {
    // const bytes = CryptoJS.AES.decrypt(this.password, process.env.BCRYPT_SEKRET_KET);
    // const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return this.otp == password;
};
module.exports = Admin