const { sequelize } = require("..");
const { Sequelize } = require("sequelize");
const ExtraService = sequelize.define("extraService", {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    uuid : {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
    },
    oldId: {
        type: Sequelize.INTEGER,
        allowNull: true
    },

    price: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    title: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
    }
})
module.exports = ExtraService