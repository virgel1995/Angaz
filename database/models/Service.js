const { sequelize} = require("..");
const { Sequelize } = require("sequelize");
const ServiceLikes = require('./service/Likes');
const ServiceDisLikes = require('./service/disLikes');
const ServiceFavorite = require('./service/Favorite');
const Category = require('./Category');
const SubCategory = require('./subCategory');
const Service = sequelize.define("service", {
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
    discountFor: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
            model: "users",
            key: "id"
        }
    },
    featured: {
        type: Sequelize.BOOLEAN,
        allowNull: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    image: {
        type: Sequelize.STRING,
        allowNull: true
    },
    video: {
        type: Sequelize.STRING,
        allowNull: true
    },
    instructions: {
        type: Sequelize.STRING,
        allowNull: true
    },
    tag: {
        type: Sequelize.JSON(Sequelize.STRING), //Array of tags
        allowNull: true,
        defaultValue: []
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    deliveryTime: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    discount: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    dateFrom: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Date.now
    },
    dateTo: {
        type: Sequelize.DATE,
        allowNull: true
    },
    //  association with extraService model
    // extraService: { 
    //     type: Sequelize.STRING
    // },

    status: {
        type: Sequelize.STRING,
        enum: ['pending', 'approved', 'cancel'],
        defaultValue: "pending"
    },
    statusComment: {
        type: Sequelize.STRING,
        allowNull: true
    },
    rating: {
        type: Sequelize.INTEGER,
        allowNull: true
    }
}, {
    scopes: {
        approved: {
            where: {
                status: "approved"
            },
            include: [
                {
                    all: true
                }
            ]
        },
        pending: {
            where: {
                status: "pending"
            },
            include: [
                {
                    all: true
                }
            ]
        },
        cancel: {
            where: {
                status: "cancel"
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
                    model: ServiceLikes,
                    as: "likes"
                },
                {
                    model: ServiceDisLikes,
                    as: "dislikes"
                },
                {
                    model: ServiceFavorite,
                    as: "favorites"
                },
                {
                    model: Category
                },
                {
                    model: SubCategory
                }
            ]
        }
    }
})

module.exports = Service