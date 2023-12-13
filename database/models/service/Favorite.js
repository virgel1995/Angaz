

const { Sequelize } = require("sequelize");
const { sequelize } = require("../..");

const ServiceFavorite = sequelize.define('service_favorite', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },

}, {
    timestamps: false
})

module.exports = ServiceFavorite