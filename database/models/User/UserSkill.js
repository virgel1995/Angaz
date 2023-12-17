

const { Sequelize } = require("sequelize");
const { sequelize } = require("../..");

const UserSkill = sequelize.define('user_skill', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },

}, {
    timestamps: false
})

module.exports = UserSkill