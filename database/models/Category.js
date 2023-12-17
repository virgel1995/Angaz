const { sequelize } = require("..");
const { Sequelize } = require("sequelize");

const Category = sequelize.define("category", {
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
        allowNull: false,
    },
    status: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    },
    desc: {
        type: Sequelize.STRING,
        allowNull: true
    }
}, {
    indexes: [
        {
            unique: true,
            fields: ["title"]
        }
    ]
})

module.exports = Category