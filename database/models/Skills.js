const { sequelize } = require("..");
const { Sequelize } = require("sequelize");

const Skills = sequelize.define("skill", {
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
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            isLowercase: true,
        }
    },
}, {
    indexes: [
        {
            unique: true,
            fields: ["name"]
        }
    ]
})

module.exports = Skills