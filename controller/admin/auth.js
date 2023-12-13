const { Admin } = require('../../database');
const { Op } = require('sequelize');
const TokenManager = require('../../app/jwt');
const MailManger = require('../../app/MailManger');
const MailTemplets = require('../../app/MailTemplets');
const Helper = require('../../app/Helper');


class AdminAuthController {
    static async findAll(req, res) {
        const { sort, page, limit, orderBy } = req.query;
        const order = orderBy || 'DESC';
        const sortedBy = sort || 'id';
        const pageNum = page ? parseInt(page) : 1;
        const pageLimit = limit ? parseInt(limit) : 10;
        const offset = (pageNum - 1) * pageLimit;
        const admins = await Admin.findAll({
            where: {},
            attributes: {
                exclude: ['password', 'new_email', 'update_email_token', 'update_email_code', 'updatedAt']
            },
            order: [[order, sortedBy]],
            limit: pageLimit,
            offset,
        })
        const pagination = {
            page: pageNum,
            itemPerPage: pageLimit,
            totalItems: admins.length,
            count: admins?.length,
            nextPage: pageNum + 1,
            previousPage: pageNum - 1,
            hasNextPage: pageLimit * pageNum < admins.length,
            hasNextTwoPage: pageLimit * (pageNum + 2) < admins.length,
            hasNextThreePage: pageLimit * (pageNum + 3) < admins.length,
            hasPreviousPage: pageNum > 1,
            hasPagenation: admins.length > pageLimit,
        }
        return res.json({
            error: false,
            code: 200,
            message: "Admins Data",
            data: admins,
            pagination
        })
    }
    static async create(req, res) {
        let { username, password, level, email } = req.body
        username = username.toLowerCase()
        const adminExist = await Admin.findOne({
            where: {
                [Op.or]: [
                    { username },
                    { email }
                ]
            }
        })

        if (adminExist) {
            return res.status(400).json({
                error: true,
                code: 400,
                message: "Admin Already Exist",
            })
        }
        const newAdmin = await Admin.create({
            username,
            password,
            level,
            email
        })
        return res.json({
            error: false,
            code: 200,
            message: "Admin Added Successfully",
            data: newAdmin
        })
    }

    static async login(req, res) {
        let { method } = req.body
        const user = await Admin.findOne({
            where: {
                [Op.or]: [
                    { username: method },
                    { email: method }
                ]
            }
        })
        if (!user) {
            return res.status(404).json({
                error: true,
                code: 404,
                message: "Admin is not Exist"
            })
        }
        const code = Helper.generateRandomOTP(8)
        MailManger.send(
            user.email,
            'Login OTP',
            'OTP',
            MailTemplets.ACCEPT_LOGIN.replaceAll('{subject}', 'Login OTP')
                .replaceAll('{code}', code)
        );
        user.update({
            otp: code
        })
        return res.json({
            error: false,
            code: 200,
            message: `Please Check Your Email ${user.email}`,
        })
    }
    static async AcceptLogin(req, res) {
        let { method, password } = req.body
        const user = await Admin.findOne({
            where: {
                [Op.or]: [
                    { username: method },
                    { email: method }
                ]
            }
        })
        if (!user) {
            return res.status(404).json({
                error: true,
                code: 404,
                message: "Admin is not Exist"
            })
        }
        const isMatch = await user.comparePassword(password.trim());
        if (!isMatch) {
            return res.status(400).send({
                message: 'Invalid password',
                error: true,
                code: 400,
            });
        }
        const token = TokenManager.generateToken({
            "id": user.id,
            "uuid": user.uuid,
            "username": user.username,
            "email": user.email,
            "level": user.level,
            "createdAt": user.createdAt,
        }, '30d')
        user.update({
            otp: null
        })
        return res.json({
            error: false,
            code: 200,
            message: `Welcome ${user.username}`,
            data: {
                "id": user.id,
                "uuid": user.uuid,
                "username": user.username,
                "email": user.email,
                "profilePic": user.profilePic,
                "level": user.level,
                "createdAt": user.createdAt,
                "token": token
            }
        })
    }

}


module.exports = AdminAuthController
