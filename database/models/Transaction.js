const { sequelize } = require("..");
const { Sequelize } = require("sequelize");



const Transaction = sequelize.define("transaction", {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    uuid : {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
    },
    currencyType: {
        type: Sequelize.STRING,
        enum: ["LE", "DR"],
        defaultValue: "LE"
    },
    amount: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
});

module.exports = Transaction