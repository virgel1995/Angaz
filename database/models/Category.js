const { sequelize } = require("..");
const { Sequelize } = require("sequelize");

const Category = sequelize.define("category", {
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
    title: {
        type: Sequelize.STRING,
        allowNull: false,
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