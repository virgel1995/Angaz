const { Sequelize } = require("sequelize");
// const { faker } = require('@faker-js/faker');
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        dialect: process.env.DB_DIALECT,
        host: process.env.DB_HOST,
        logging: false, //logger.info
        logQueryParameters: false,
        pool: {
            max: 10, // Increase this number to allow more connections
            min: 0,
            acquire: 30000, // Timeout for acquiring a connection
            idle: 10000, // Timeout for idle connections
        },
    }
);
exports.sequelize = sequelize;
const Payments = require("./models/Payments");
//    ====================== Import ALL Models Here  =======================
const User = require("./models/User");
const Admin = require("./models/Admin");
const Transaction = require("./models/Transaction");
const Category = require("./models/Category");
const SubCategory = require("./models/subCategory");
const Comment = require("./models/Comment");
const Service = require("./models/Service");
const ExtraService = require("./models/ExtraService");
const DisputReport = require("./models/DisputReport");
const Booking = require("./models/booking");
const Project = require("./models/Project");
const ProductOffers = require("./models/ProductOffers");
const Jobs = require("./models/Jobs");
const Skills = require("./models/Skills");
const Features = require("./models/Features");
const SiteSettings = require("./models/SiteSettings");

// ++++++++++++++++ Payment Methods +++++++++++++++++++++++
const PayBank = require("./models/PayMethods/bank");
const PayCard = require("./models/PayMethods/card");
const PayInstaPay = require("./models/PayMethods/instaPay");
const PayEWallet = require("./models/PayMethods/eWallet");
const PayPayPal = require("./models/PayMethods/payPal");
// ++++++++++++++++ Service Helpers ++++++++++++++++++++++++
const ServiceFavorite = require('./models/service/Favorite')
const ServiceDisLikes = require('./models/service/disLikes')
const ServiceLikes = require('./models/service/Likes')
const ServiceFeatures = require('./models/service/Featuers')
// ++++++++++++++++ Project Helpers ++++++++++++++++++++++++
const ProjectAttachments = require('./models/Project/Attachments')
const ProjectSkill = require('./models/Project/ProjectSkill')
// +++++++++++++++++++++++++ User +++++++++++++++++
const UserSkill = require('./models/User/UserSkill')
// add bankId to PayBank
Payments.hasMany(PayBank, {
    foreignKey: "PaymentId",
    targetKey: "id",
    onDelete: "CASCADE",
});
PayBank.belongsTo(Payments, {
    foreignKey: "PaymentId",
    targetKey: "id",
    onDelete: "CASCADE",
});
// add cardId to PayCard
Payments.hasMany(PayCard, {
    foreignKey: "PaymentId",
    targetKey: "id",
    onDelete: "CASCADE",
});
PayCard.belongsTo(Payments, {
    foreignKey: "PaymentId",
    targetKey: "id",
    onDelete: "CASCADE",
});
// add instaPayId to PayInstaPay
Payments.hasMany(PayInstaPay, {
    foreignKey: "PaymentId",
    targetKey: "id",
    onDelete: "CASCADE",
});
PayInstaPay.belongsTo(Payments, {
    foreignKey: "PaymentId",
    targetKey: "id",
    onDelete: "CASCADE",
});
// add eWalletId to PayEWallet
Payments.hasMany(PayEWallet, {
    foreignKey: "PaymentId",
    targetKey: "id",
    onDelete: "CASCADE",
});
PayEWallet.belongsTo(Payments, {
    foreignKey: "PaymentId",
    targetKey: "id",
    onDelete: "CASCADE",
});
// add payPalId to PayPayPal
Payments.hasMany(PayPayPal, {
    foreignKey: "PaymentId",
    targetKey: "id",
    onDelete: "CASCADE",
});
PayPayPal.belongsTo(Payments, {
    foreignKey: "PaymentId",
    targetKey: "id",
    onDelete: "CASCADE",
});




// ++++++++++++++++ Payment Methods End +++++++++++++++++++++++
// ========================== Assocations Here ==========================
// add userId to Payments 
User.hasOne(Payments, {
    foreignKey: "userId",
    targetKey: "id",
    onDelete: "CASCADE",
});
Payments.belongsTo(User, {
    foreignKey: "userId",
    targetKey: "id",
    onDelete: "CASCADE",
});


// add userId to Transaction
User.hasMany(Transaction, {
    foreignKey: "userId",
    targetKey: "id",
    onDelete: "CASCADE",
});
Transaction.belongsTo(User, {
    foreignKey: "userId",
    targetKey: "id",
    onDelete: "CASCADE",
});
// add createdUser to Comment
User.hasMany(Comment, {
    foreignKey: "createdUser",
    targetKey: "id",
    onDelete: "CASCADE",
});
Comment.belongsTo(User, {
    foreignKey: "createdUser",
    targetKey: "id",
    onDelete: "CASCADE",
});

// add createdUser to Service
User.hasMany(Service, {
    foreignKey: "createdUser",
    targetKey: "id",
    onDelete: "CASCADE",
});
Service.belongsTo(User, {
    foreignKey: "createdUser",
    targetKey: "id",
    onDelete: "CASCADE",
});
// add categId to Service
Service.belongsTo(Category, {
    foreignKey: "categId",
    targetKey: "id",
    onDelete: "CASCADE",
});
// add subCategId to Service
Service.belongsTo(SubCategory, {
    foreignKey: "subCategId",
    targetKey: "id",
    onDelete: "CASCADE",
});
// add serviceId to ExtraServices
Service.hasMany(ExtraService, {
    foreignKey: "serviceId",
    targetKey: "id",
    onDelete: "CASCADE",
});
ExtraService.belongsTo(Service, {
    foreignKey: "serviceId",
    targetKey: "id",
    onDelete: "CASCADE",
});
// add createdUser to DisputReport
// User.hasMany(DisputReport, {
//     foreignKey: "createdUser",
//     targetKey: "id",
//     onDelete: "CASCADE",
// });
// DisputReport.belongsTo(User, {
//     foreignKey: "createdUser",
//     targetKey: "id",
//     onDelete: "CASCADE",
// });
// // add disputeReport to Booking
// DisputReport.hasMany(Booking, {
//     foreignKey: "disputeReportId",
//     targetKey: "id",
//     onDelete: "CASCADE",
// });
// Booking.belongsTo(DisputReport, {
//     foreignKey: "disputeReportId",
//     targetKey: "id",
//     onDelete: "CASCADE",
// });
// add createdUser to Booking
User.hasMany(Booking, {
    foreignKey: "createdUser",
    targetKey: "id",
    onDelete: "CASCADE",
});
Booking.belongsTo(User, {
    foreignKey: "createdUser",
    targetKey: "id",
    onDelete: "CASCADE",
});
// add createdUser to Projects 
User.hasMany(Project, {
    foreignKey: "createdUser",
    targetKey: "id",
    onDelete: "CASCADE",
});
Project.belongsTo(User, {
    foreignKey: "createdUser",
    targetKey: "id",
    onDelete: "CASCADE",
});
// add categId to Projects
Category.hasMany(Project, {
    foreignKey: "categId",
    targetKey: "id",
    onDelete: "CASCADE",
});
Project.belongsTo(Category, {
    foreignKey: "categId",
    targetKey: "id",
    onDelete: "CASCADE",
});
// add subCategId to Projects
SubCategory.hasMany(Project, {
    foreignKey: "subCategId",
    targetKey: "id",
    onDelete: "CASCADE",
});
Project.belongsTo(SubCategory, {
    foreignKey: "subCategId",
    targetKey: "id",
    onDelete: "CASCADE",
});

// add userId to ProductOffers
User.hasMany(ProductOffers, {
    foreignKey: "userId",
    targetKey: "id",
    onDelete: "CASCADE",
});
ProductOffers.belongsTo(User, {
    foreignKey: "userId",
    targetKey: "id",
    onDelete: "CASCADE",
});
// add projectId to Offers
Project.hasMany(ProductOffers, {
    as: 'offers',
    foreignKey: "projectId",
    targetKey: "id",
    onDelete: "CASCADE",
});
ProductOffers.belongsTo(Project, {
    foreignKey: "projectId",
    targetKey: "id",
    onDelete: "CASCADE",
});
// add categId to SubCategory
Category.hasMany(SubCategory, {
    foreignKey: "categId",
    targetKey: "id",
    onDelete: "CASCADE",
})
SubCategory.belongsTo(Category, {
    foreignKey: "categId",
    targetKey: "id",
    onDelete: "CASCADE",
});

// add projectId to ProjectAttachments
Project.hasMany(ProjectAttachments, {
    as: 'attachments',
    onDelete: "CASCADE",
});

ProjectAttachments.belongsTo(Project, {
    onDelete: "CASCADE",
});

// create likes table assocation between user and service
Service.hasMany(ServiceLikes, {
    as: 'likes',
    onDelete: 'CASCADE'
})
User.hasMany(ServiceLikes, {
    onDelete: 'CASCADE'
})
ServiceLikes.belongsTo(User)
ServiceLikes.belongsTo(Service)

// create dislikes table assocation between user and service
Service.hasMany(ServiceDisLikes, {
    as: 'dislikes',
    onDelete: 'CASCADE'
})
User.hasMany(ServiceDisLikes, {
    onDelete: 'CASCADE'
})
ServiceDisLikes.belongsTo(User)
ServiceDisLikes.belongsTo(Service)

// create favorite table assocation between user and service
Service.hasMany(ServiceFavorite, {
    as: 'favorites',
    onDelete: 'CASCADE'
})
User.hasMany(ServiceFavorite, {
    onDelete: 'CASCADE'
})
ServiceFavorite.belongsTo(User)
ServiceFavorite.belongsTo(Service)
// add createdUser to Jobs
User.hasMany(Jobs, {
    foreignKey: "createdUser",
    targetKey: "id",
    onDelete: "CASCADE",
});
Jobs.belongsTo(User, {
    foreignKey: "createdUser",
    targetKey: "id",
    onDelete: "CASCADE",
});
// add categId to Jobs
Category.hasMany(Jobs, {
    foreignKey: "categId",
    targetKey: "id",
    onDelete: "CASCADE",
});
Jobs.belongsTo(Category, {
    foreignKey: "categId",
    targetKey: "id",
    onDelete: "CASCADE",
});
// add subCategId to Jobs
SubCategory.hasMany(Jobs, {
    foreignKey: "subCategId",
    targetKey: "id",
    onDelete: "CASCADE",
});
Jobs.belongsTo(SubCategory, {
    foreignKey: "subCategId",
    targetKey: "id",
    onDelete: "CASCADE",
});

//  add extra_service to Boolings 
Booking.belongsTo(ExtraService, {
    foreignKey: "extraServiceId",
    targetKey: "id",
    onDelete: "CASCADE",
});
ExtraService.hasMany(Booking, {
    foreignKey: "extraServiceId",
    targetKey: "id",
    onDelete: "CASCADE",
});
Features.belongsToMany(Service, { through: ServiceFeatures });
Service.belongsToMany(Features, { through: ServiceFeatures });


//  add skills to user
User.belongsToMany(Skills, {
    through: UserSkill,
    as: 'skills',
});
Skills.belongsToMany(User, {
    through: UserSkill,
});

// add skills to Projects
Project.belongsToMany(Skills, {
    through: ProjectSkill,
    as: 'skills',
});
Skills.belongsToMany(Project, {
    through: ProjectSkill,
});

const seedSiteSettings = async () => {
    const ifExits = await SiteSettings.findOne({
        where: {
            name: 'location'
        }
    });
    if (!ifExits) {
        await SiteSettings.create({
            name: 'location',
            value: '2d92ba9f3eb044fb96905da4e6c9b55e'
        })
    }
}

//    ======================= Export All Models From THis File =======================
exports.Admin = Admin;
exports.User = User;
exports.Payments = Payments;
exports.Project = Project;
exports.Service = Service;
exports.Jobs = Jobs;
exports.Category = Category;
exports.SubCategory = SubCategory;
exports.SiteSettings = SiteSettings;
exports.Transaction = Transaction;


// Helpers
exports.Comment = Comment;
exports.ExtraService = ExtraService;
exports.Booking = Booking;
exports.DisputReport = DisputReport;
exports.Skills = Skills;
exports.Features = Features;

exports.ProductOffers = ProductOffers;
exports.ServiceFavorite = ServiceFavorite;
exports.ServiceDisLikes = ServiceDisLikes;
exports.ServiceLikes = ServiceLikes;
exports.ServiceFeatures = ServiceFeatures;
exports.UserSkill = UserSkill;
exports.ProjectSkill = ProjectSkill;
exports.ProjectAttachments = ProjectAttachments;
exports.PayInstaPay = PayInstaPay;
exports.PayBank = PayBank;
exports.PayPayPal = PayPayPal
exports.PayCard = PayCard
exports.PayEWallet = PayEWallet

exports.seedSiteSettings = seedSiteSettings















// const generateRandomUser = () => {

//     return {
//         email: faker.internet.email(),
//         mobile: faker.number.int(),
//         password: 123456,
//         ev: faker.datatype.boolean(),
//         profilePic: faker.image.avatar(),
//         role: 'user',
//         gender: 'male',
//         birthDate: faker.date.past(),
//         jobTitle: 'seller',
//         skills: ['1', '2', '3'], // Example of generating an array of skills
//         aboutMe: faker.lorem.sentence(),
//         emailNotification: faker.datatype.boolean(),
//         status: faker.datatype.boolean(),
//         lastSeen: faker.date.recent(),
//         avgResponse: faker.number.int() + ':' + faker.number.int() + ':' + faker.number.int(),
//         balance: faker.number.int(),
//         income: faker.number.int(),
//         TFA: faker.number.int(),
//         rank: faker.number.int(),
//         points: faker.number.int(),
//     };
// };
// const test = async () => {
//     const user = await User.findByPk(1, {
//         include: [
//             {
//                 model: Payments,
//                 include: [
//                     {
//                         all : true
//                     }
//                 ]
//             }
//         ]
//     });
//     console.log(user.toJSON());
// }
// test()
// const seedUsers = async (numUsers) => {
//   try {
//     const users = Array.from({ length: numUsers }, generateRandomUser);
//     await User.bulkCreate(users);
//     console.log(`${numUsers} users seeded successfully.`);
//   } catch (error) {
//     console.error('Error seeding users:', error);
//   }
// };

// // Usage: node seed-users.js 10 (to seed 10 users)
// const numUsersToSeed = process.argv[2] || 10;
// seedUsers(numUsersToSeed);
