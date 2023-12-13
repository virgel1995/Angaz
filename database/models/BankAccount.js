const { sequelize } = require("..");
const { Sequelize } = require("sequelize");

const BankAccount = sequelize.define("bankAccount", {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
    },
    hasPayPal: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    hasEWallet: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    hasBank: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    hasCard: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    hasInstaPay: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
})


module.exports = BankAccount