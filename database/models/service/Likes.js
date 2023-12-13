

const { Sequelize } = require("sequelize");
const { sequelize } = require("../..");

const ServiceLikes = sequelize.define('service_likes', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
}, {
    timestamps: false
})

module.exports = ServiceLikes