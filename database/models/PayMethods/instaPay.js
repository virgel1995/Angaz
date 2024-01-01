const { Sequelize } = require("sequelize");
const { sequelize } = require("../..");

const PayInstaPay = sequelize.define('pay_instapay', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
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
    timestamps: false,
    indexes: [
        {
            unique: true,
            fields: ["email"]
        }
    ]
})

module.exports = PayInstaPay