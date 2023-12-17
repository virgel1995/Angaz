const { Op } = require('sequelize');
const TokenManager = require('../../app/jwt');
const { User } = require('../../database');
const MailManger = require('../../app/MailManger');
const MailTemplets = require('../../app/MailTemplets');
const config = require('../../config');
const Helper = require('../../app/Helper');
const BankAccount = require('../../database/models/BankAccount');

class UserAuthController {
    static async Register(req, res) {
        let {
            username,
            firstname,
            lastname,
            email,
            password,
            mobile,
            role,
            redirect
        } =
            req.body;
        username = username.toLowerCase().replaceAll(' ', '');
        const isExiets = await User.findOne({
            where: {
                [Op.or]: [{ username }, { email }],
            },
        });
        if (isExiets) {
            return res.status(400).json({
                error: true,
                code: 400,
                message: 'User Already Exist',
            });
        }
        const code = Helper.generateRandomCode()
        const newUser = await User.create({
            username,
            firstname,
            lastname,
            email,
            password,
            mobile,
            role,
            country_code: `+${mobile.slice(0, 2)}`,
            verify_code: code
        });

        const varifyEmailToken = TokenManager.generateToken({
            id: newUser.id,
            email: newUser.email,
            code: newUser.verify_code,
            redirectUrl: redirect.endsWith('/') ? redirect : `${redirect}/`
        });

        MailManger.send(
            newUser.email,
            'Confirm Account',
            'Confirm Account',
            MailTemplets.SIGNUP.replaceAll('{subject}', 'Confirm Account')
                .replaceAll('{currentDate}', new Date())
                .replaceAll('{username}', newUser.username)
                .replaceAll('{email}', newUser.email)
                .replaceAll(
                    '{url}',
                    `${config.App_Url}/user/auth/verifay-signup?verify=${varifyEmailToken}`
                )
                .replaceAll('{code}', code)
        );
        return res.status(201).json({
            error: false,
            code: 201,
            message: 'User Added Successfully',
            data: {
                id: newUser.id,
                uuid: newUser.uuid,
                username: newUser.username,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                mobile: newUser.mobile,
                email: newUser.email,
                role: newUser.role,
                createdAt: newUser.createdAt,
            },
        });
    }
    static async Login(req, res) {
        const { method, password } = req.body;
        const user = await User.findOne({
            where: {
                [Op.or]: [{ username: method }, { email: method }],
            },
        });
        if (!user) {
            return res.status(404).json({
                error: true,
                code: 404,
                message: 'No Credentials Found',
            });
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).send({
                message: 'Invalid Password',
                error: true,
                code: 400,
            });
        }
        const access_token = TokenManager.generateToken(
            {
                id: user.id,
                uuid: user.uuid,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                mobile: user.mobile,
                role: user.role,
                createdAt: user.createdAt,
            },
            '30d'
        );
        const refresh_token = TokenManager.generateToken(
            {
                id: user.id,
            },
            '30d'
        );

        return res.json({
            error: false,
            code: 200,
            message: `Welcome ${user.username}`,
            data: {
                id: user.id,
                uuid: user.uuid,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                mobile: user.mobile,
                role: user.role,
                profilePic: user.profilePic,
                createdAt: user.createdAt,
                emailNotification: user.emailNotification,
                aboutMe: user.aboutMe,
                birthDate: user.birthDate,
                skills: user.skills,
                access_token: {
                    data: access_token,
                    validFor: '1 day',
                },
                refresh_token: {
                    data: refresh_token,
                    validFor: '30 days',
                },
            },
        });
    }
    static async verifyRegistration(req, res) {
        const { verify } = req.query;
        if (!verify) {
            return res.redirect(`${config.Client_Url[0]}?status=error&message=Validation_Code_Is_Missing`);
        }
        const decode = TokenManager.compareCodeToken(verify);
        if (decode.error) {
            return res.redirect(`${config.Client_Url[0]}?status=error&message=Invalid_Validation_Code`);
        }
        const { id, code, redirectUrl } = decode;
        const user = await User.findByPk(id);
        if (!user) {
            return res.redirect(`${redirectUrl}?status=error&message=User_not_found`);
        }
        if (!user.verify_code) {
            return res.redirect(`${redirectUrl}?status=error&message=User_Already_Verified`);
        }
        if (user.verify_code !== code) {
            return res.redirect(`${redirectUrl}?status=error&message=Invalid_Validation_Code`);
        }
        await user.update({
            status: true,
            verify_date: new Date(),
            verify_code: null,
        });
        res.redirect(`${redirectUrl}?status=success&id=${user.id}&username=${user.username}&role=${user.role}&message=User_Verified_Successfully`);
    }
}
module.exports = UserAuthController;
