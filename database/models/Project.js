const { sequelize } = require('..');
const { Sequelize } = require("sequelize");
const User = require('./User')
const Category = require('./Category')
const SubCategory = require('./subCategory')
const ProductOffers = require('./ProductOffers')
const ProjectLikes = require('./Project/Likes')
const ProjectAttachments = require('./Project/Attachments')

const Project = sequelize.define("project", {
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
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        defaultValue: "No Description Yet"
    },
    skills: {
        type: Sequelize.STRING,
        allowNull: true
    },
    expectedBudget: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    estimatedDeliveryTime: {
        type: Sequelize.STRING,
        allowNull: true
    },
    status: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    },

}, {
    scopes: {
        approved: {
            where: {
                status: true
            },
        },
        pending: {
            where: {
                status: false
            },
            include: [
                {
                    all: true
                }
            ]
        },
        ASSOC: {
            include: [
                {
                    model: User,
                    attributes: {
                        exclude: ['password']
                    },
                },
                {
                    model: Category,
                },
                {
                    model: SubCategory
                },
                {
                    model: ProductOffers,
                    as: 'offers'
                },
                {
                    model: ProjectLikes,
                    as: 'likes'
                },
                {
                    model: ProjectAttachments,
                    as: 'attachments'
                },

            ]
        }
    }

})
module.exports = Project