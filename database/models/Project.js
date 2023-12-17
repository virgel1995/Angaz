const { sequelize } = require('..');
const { Sequelize } = require("sequelize");
const User = require('./User')
const Category = require('./Category')
const SubCategory = require('./subCategory')
const ProductOffers = require('./ProductOffers')
const ProjectAttachments = require('./Project/Attachments')
const Skills = require('./Skills')

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
    defaultScope: {},
    scopes: {
        approved: getCommonIncludeConfig(true),
        pending: getCommonIncludeConfig(false),
        ASSOC: getCommonIncludeConfig()
    }

})

function getCommonIncludeConfig(type) {
    let assoc = {
        attributes: {
            exclude: ['categId', 'subCategId', 'createdUser', 'updatedAt', 'status']
        },
        include: [
            {
                model: ProjectAttachments,
                as: 'attachments',
                attributes: ['id', 'url']
            },
            {
                model: Skills,
                as: 'skills',
                attributes: ['id', 'name'],
                through: {
                    attributes: []
                }
            },
            {
                model: Category,
                attributes: ['title', 'id']
            },
            {
                model: SubCategory
            },
            {
                model: ProductOffers,
                as: 'offers',
                attributes: ['id', 'price']
            },
            {
                model: User,
                attributes: ['id', 'profilePic', 'firstname', 'lastname', 'username', 'email'],
            },
        ]
    }
    // eslint-disable-next-line no-undefined
    if (type !== undefined) {
        assoc.where = {
            status: type
        }
    }
    return assoc
}
module.exports = Project