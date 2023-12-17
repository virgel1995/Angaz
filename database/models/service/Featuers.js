

const { Sequelize } = require("sequelize");
const { sequelize } = require("../..");

const ServiceFeatures = sequelize.define('service_features', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
}, {
    timestamps: false
})


module.exports = ServiceFeatures