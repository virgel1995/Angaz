const { Sequelize } = require("sequelize");
const { sequelize } = require("../..");

const PayBank = sequelize.define('pay_bank', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    bankName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    accountNumber: {
        type: Sequelize.STRING,
        allowNull: false
    },
    receiverName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    IBAN: {
        type: Sequelize.STRING,
        allowNull: false
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false
})

module.exports = PayBank