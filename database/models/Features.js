const { sequelize } = require("..");
const { Sequelize } = require("sequelize");
const Features = sequelize.define("features", {
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

})
module.exports = Features