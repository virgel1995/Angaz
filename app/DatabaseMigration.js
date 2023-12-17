
const mysql = require('mysql2');
const { User, Category, SubCategory, Service, ExtraService, Booking, Features, ServiceFeatures } = require('../database');


class DatabaseMigrationFromOld {
    constructor() {
        this.connection = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.OLD_DB_NAME,
        });
    }
    initConnection = () => {
        this.connection.connect();
    }
    CreateRecords = async (Modal, data) => {
        const newRecords = await Modal.bulkCreate(data)
        return newRecords
    }

    handleOldUsers = async () => {
        const sql = `SELECT * FROM users`;
        const [rows] = await this.connection.promise().query(sql);
        const newUsers = []
        await Promise.all(rows.map((row) => {
            newUsers.push({
                id: row.id,
                username: row.username,
                email: row.email,
                mobile: row.mobile,
                password: row.password,
                ev: row.ev,
                lastname: row.lastname,
                firstname: row.firstname,
                country_code: row.country_code,
                balance: row.balance,
                income: row.income,
                aboutMe: row.about_me,
                profilePic: row.image,
                bg_image: row.bg_image,
                status: row.status,
                TFA: row.tv,
                address: row.address,
                created_at: row.created_at,
                updated_at: row.updated_at

            })
        }))
        await this.CreateRecords(User, newUsers);
    } //
    handleOldCategories = async () => {
        const sql = `SELECT * FROM categories`;
        const [rows] = await this.connection.promise().query(sql);
        const newCategories = []
        await Promise.all(rows.map((row) => {
            newCategories.push({
                id: row.id,
                title: row.name,
                status: row.status,
                created_at: row.created_at,
                updated_at: row.updated_at
            })
        }))
        await this.CreateRecords(Category, newCategories);
    } //
    handleOldSubCategories = async () => {
        const sql = `SELECT * FROM sub_categories`;
        const [rows] = await this.connection.promise().query(sql);
        const newSubCategories = []
        await Promise.all(rows.map((row) => {
            newSubCategories.push({
                id: row.id,
                categId: row.category_id,
                title: row.name,
                image: row.image,
                created_at: row.created_at,
                updated_at: row.updated_at
            })
        }))
        await this.CreateRecords(SubCategory, newSubCategories);
    } //
    handleOldServices = async () => {
        const sql = `SELECT * FROM services`;
        const [rows] = await this.connection.promise().query(sql);
        const newServices = []
        await Promise.all(rows.map((row) => {
            newServices.push({
                id: row.id,
                featured: row.featured,
                createdUser: row.user_id,
                categId: row.category_id,
                subCategId: row.sub_category_id,
                title: row.title,
                rating: row.rating,
                status: row.status,
                tag: row.tag,
                description: row.description,
                image: row.image,
                deliveryTime: row.delivery_time,
                price: row.price,
                created_at: row.created_at,
                updated_at: row.updated_at
            })
        }))
        await this.CreateRecords(Service, newServices);
    } //
    handleOldExstraService = async () => {
        const sql = `SELECT * FROM extra_services`;
        const [rows] = await this.connection.promise().query(sql);
        const newExtraServices = []
        await Promise.all(rows.map((row) => {
            newExtraServices.push({
                id: row.id,
                serviceId: row.service_id,
                title: row.title,
                price: row.price,
                created_at: row.created_at,
                updated_at: row.updated_at
            })
        }))
        await this.CreateRecords(ExtraService, newExtraServices);
    } //
    handleOldBocking = async () => {
        const sql = `SELECT * FROM bookings`;
        const [rows] = await this.connection.promise().query(sql);
        const newBookings = []
        await Promise.all(rows.map((row) => {
            newBookings.push({
                id: row.id,
                serviceId: row.service_id,
                createdUser: row.user_id,
                qty: row.qty,
                amount: row.amount,
                discount: row.discount,
                status: row.status,
                workingStatus: row.working_status,
                disputeReportId: row.dispute_report,
                extraServiceId: row.extra_service,
                created_at: row.created_at,
                updated_at: row.updated_at
            })
        }))
        await this.CreateRecords(Booking, newBookings);
    } //
    handleOldFeatures = async () => {
        const sql = `SELECT * FROM features`;
        const [rows] = await this.connection.promise().query(sql);
        const newFeatures = []
        await Promise.all(rows.map((row) => {
            newFeatures.push({
                id: row.id,
                title: row.name,
                created_at: row.created_at,
                updated_at: row.updated_at
            })
        }))
        await this.CreateRecords(Features, newFeatures);
    } //
    handleOldServiceFeatures = async () => {
        const sql = `SELECT * FROM features_services`;
        const [rows] = await this.connection.promise().query(sql);
        const newServiceFeatures = []
        await Promise.all(rows.map((row) => {
            newServiceFeatures.push({
                id: row.id,
                serviceId: row.service_id,
                featureId: row.features_id,
            })
        }))
        await this.CreateRecords(ServiceFeatures, newServiceFeatures);
    } // 



    migrate = async () => {
        await this.handleOldUsers();
        await this.handleOldCategories();
        await this.handleOldSubCategories();
        await this.handleOldServices();
        await this.handleOldExstraService();
        await this.handleOldBocking();
        await this.handleOldFeatures();
        await this.handleOldServiceFeatures();
    }

}



module.exports = DatabaseMigrationFromOld