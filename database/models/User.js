const CryptoJS = require("crypto-js");
const { sequelize } = require("..");
const { Sequelize } = require("sequelize");
const Payments = require("./Payments");

const User = sequelize.define("user", {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
    },
    firstname: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    lastname: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    country_code: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    mobile: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        required: true
    },
    ev: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    profilePic: {
        type: Sequelize.STRING,
        allowNull: true
    },
    bg_image: {
        type: Sequelize.STRING,
        allowNull: true
    },
    address: {
        type: Sequelize.JSON,
        allowNull: true
    },
    role: {
        type: Sequelize.STRING,
        enum: ["client", "freelancer"],
        defaultValue: 'client',
    },
    gender: {
        type: Sequelize.STRING,
        enum: ["male", "female"],
        allowNull: true,
    },
    birthDate: {
        type: Sequelize.DATE,
        allowNull: true
    },
    jobTitle: {
        type: Sequelize.STRING,
        allowNull: true
    },
    aboutMe: {
        type: Sequelize.STRING,
        defaultValue: "I'm New User"
    },
    emailNotification: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    status: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    lastSeen: {
        type: Sequelize.DATE,
        allowNull: true
    },
    avgResponse: {
        type: Sequelize.STRING,
        defaultValue: "00:00:00"
    },
    balance: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    income: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    TFA: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    rank: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    points: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    new_email: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    update_email_code: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    verify_code: {
        type: Sequelize.TEXT,
        allowNull: true,
    },
    verify_date: {
        type: Sequelize.DATE,
        allowNull: true,
    }
}, {
    timestamps: true,
    defaultScope: {
        attributes: {
            exclude: []
        }
    },
    indexes: [
        {
            unique: true,
            fields: ['email'],
        },
    ],
    scopes: {
        withoutPassword: {
            attributes: {
                exclude: ['password']
            }
        },
        ASSOC: {
            attributes: {
                include: ['password']
            },
            include: [
                {
                    all: true
                }
            ]
        },
        active: {
            where: {
                status: true
            },
        },
        inactive: {
            where: {
                status: false
            }
        },
        payments: {
            include: [
                {
                    model: Payments,
                    include: [
                        {
                            all: true
                        }
                    ]
                }
            ]
        }

    }
});

User.beforeCreate(async (user) => {
    const ciphertext = CryptoJS.AES.encrypt(user.password, process.env.BCRYPT_SEKRET_KET).toString();
    user.password = ciphertext;
});

User.beforeUpdate(async (user) => {
    if (user.changed('password')) {
        const ciphertext = CryptoJS.AES.encrypt(user.password, process.env.BCRYPT_SEKRET_KET).toString();
        user.password = ciphertext;
    }
});

// compare Password
User.prototype.comparePassword = async function (password) {
    const bytes = CryptoJS.AES.decrypt(this.password, process.env.BCRYPT_SEKRET_KET);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText == password;
};
module.exports = User




