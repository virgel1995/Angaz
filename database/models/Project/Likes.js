

const { Sequelize } = require("sequelize");
const { sequelize } = require("../..");

const ProjectLikes = sequelize.define('project_likes', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },

}, {
    timestamps: false
})

module.exports = ProjectLikes