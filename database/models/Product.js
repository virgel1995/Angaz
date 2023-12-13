const { sequelize } = require("..");
const { Sequelize } = require("sequelize");

// const productSchema = new mongoose.Schema({
//     oldId: Number,
//     productType: {
//         type: String,
//         required: true,
//         lowercase: true,
//         trim: true,
//         enum: ["service", "project"]
//     },
//     productTypeId: {
//         type: mongoose.Types.ObjectId,
//         ref: "productType",
//         required: true
//     }
// }, { timestamps: true })
const Product = sequelize.define("product", {
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
    oldId: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    productType: {
        type: Sequelize.STRING,
        enum: ["service", "project"],
        allowNull: false
    }
}, {
    scopes: {
        service: {
            where: {
                productType: 'service'
            }
        },
        project: {
            where: {
                productType: 'project'
            }
        }
    }
})
module.exports = Product