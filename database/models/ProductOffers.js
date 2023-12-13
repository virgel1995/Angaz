const { Sequelize } = require("sequelize");
const { sequelize } = require("..");



const ProductOffers = sequelize.define('product_offers', {
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
    price: {
        type: Sequelize.INTEGER,
        allowNull: true
    }
})

module.exports = ProductOffers