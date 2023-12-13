const { Sequelize } = require("sequelize");
const { sequelize } = require("../..");

const PayCard = sequelize.define('pay_card', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    cardNumber: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cardHolderName: {
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

module.exports = PayCard