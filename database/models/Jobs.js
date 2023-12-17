const { sequelize } = require("..");
const { Sequelize } = require("sequelize");
const Jobs = sequelize.define("jobs", {
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
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    image: {
        type: Sequelize.STRING,
        allowNull: true
    },
    amount : {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    deliveryTime: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    skills: {
        type: Sequelize.JSON,
        allowNull: true,
    },
    requirements: {
        type: Sequelize.JSON,
        allowNull: true,
    },
})
module.exports = Jobs