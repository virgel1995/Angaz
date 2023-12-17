const { sequelize } = require("..");
const { Sequelize } = require("sequelize");
const Booking = sequelize.define("booking", {
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
    qty: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    amount: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    discount: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    status : {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    },
    workingStatus: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    },
    
})


module.exports = Booking