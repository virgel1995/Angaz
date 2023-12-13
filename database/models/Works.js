const { sequelize } = require("..");
const { Sequelize } = require("sequelize");
const Works = sequelize.define("works", {
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
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
    },
    images: {
        type: Sequelize.JSON(Sequelize.STRING),  // Array of images links
        allowNull: true,
        defaultValue: []
    },
    skills: {
        type: Sequelize.JSON(Sequelize.STRING),  // Array of skills
        allowNull: true,
        defaultValue: []
    },
    video: {
        type: Sequelize.STRING
    },
    link: {
        type: Sequelize.STRING
    },
})

module.exports = Works