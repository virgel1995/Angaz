

const { Sequelize } = require("sequelize");
const { sequelize } = require("../..");

const ProjectAttachments = sequelize.define('project_attachments', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    url: {
        type: Sequelize.STRING,
        allowNull: false,
    }
}, {
    timestamps: false
})

module.exports = ProjectAttachments