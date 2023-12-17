const { Sequelize } = require("sequelize");
const { sequelize } = require("..");

const SiteSettings = sequelize.define("site_settings", {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    value: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    indexes: [
        {
            unique: true,
            fields: ["name"]
        }
    ],
    timestamps: false
});

module.exports = SiteSettings