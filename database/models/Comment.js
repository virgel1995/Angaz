const { sequelize } = require("..");
const { Sequelize } = require("sequelize");

const Comment = sequelize.define("comment", {
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
    // association with user model
    // createdUser: {
    //     type: Sequelize.INTEGER,
    //     allowNull: true,
    //     references: {
    //         model: "users",
    //         key: "id"
    //     }
    // },
    // association with product model
    // productId: {
    //     type: Sequelize.INTEGER,
    //     allowNull: true,
    //     references: {
    //         model: "products",
    //         key: "id"
    //     }
    // },
    description: {
        type: Sequelize.STRING,
        allowNull: true
    }
})
module.exports = Comment