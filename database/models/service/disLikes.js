

const { Sequelize } = require("sequelize");
const { sequelize } = require("../..");

const ServiceDisLikes = sequelize.define('service_dislikes', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
}, {
    timestamps: false
})

module.exports = ServiceDisLikes