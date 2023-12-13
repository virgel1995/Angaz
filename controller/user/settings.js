const Helper = require("../../app/Helper")
const MailManger = require("../../app/MailManger")
const MailTemplets = require("../../app/MailTemplets")
const TokenManager = require("../../app/jwt")
const config = require("../../config")
const { User } = require("../../database")



class UserSettingsController {
    static async update(req, res) {
        const {
            userId,
            username,
            firstName,
            lastName,
            password,
            mobile,
            emailNotification,
            aboutMe,
            birthDate,
            profilePic,
            skills
        } = req.body
        if (!userId) {
            return res.status(400).json({
                message: "User Id Is Required (userId)",
                error: true,
                code: 400
            })
        }
        const user = await User.findOne({
            where: {
                id: userId
            },
        })
        if (!user) {
            return res.status(404).json({
                message: "User Not Found",
                error: true,
                code: 404
            })
        }
        if (username) {
            const checkUserName = await User.findOne({
                where: {
                    username
                }
            })
            if (checkUserName && checkUserName.id !== user.id) {
                return res.status(400).json({
                    message: "Username Already Exists",
                    error: true,
                    code: 400
                })
            }
            user.username = username
        }
        if (firstName) {
            user.firstName = firstName
        }
        if (lastName) {
            user.lastName = lastName
        }
        if (password) {
            user.password = password
        }
        if (mobile) {
            user.mobile = mobile
        }
        if (emailNotification) {
            user.emailNotification = emailNotification
        }
        if (aboutMe) {
            user.aboutMe = aboutMe
        }
        if (birthDate) {
            user.birthDate = birthDate
        }
        if (profilePic) {
            user.profilePic = profilePic
        }
        if (skills) {
            user.skills = skills
        }
        await user.save()
        return res.status(200).json({
            message: "User Updated",
            error: false,
            code: 200,
            data: {
                id: user.id,
                uuid: user.uuid,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                mobile: user.mobile,
                email: user.email,
                role: user.role,
                emailNotification: user.emailNotification,
                aboutMe: user.aboutMe,
                birthDate: user.birthDate,
                profilePic: user.profilePic,
                skills: user.skills,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            },
            user
        })
    }
    static async updateEmail(req, res) {
        const {
            userId,
            new_email,
            redirect
        } = req.body
        const user = await User.findOne({
            where: {
                id: userId
            }
        })
        if (!user) {
            return res.status(404).json({
                message: "User Not Found",
                error: true,
                code: 404
            })
        }
        const checkUserName = await User.findOne({
            where: {
                email: new_email
            }
        })
        if (checkUserName) {
            return res.status(400).json({
                message: "Email Already Exists",
                error: true,
                code: 400
            })
        }
        const code = Helper.generateRandomCode()
        user.update({
            update_email_code: code,
            new_email: new_email,
        })
        const varifyEmailToken = TokenManager.generateToken({
            id: user.id,
            email: user.email,
            code: user.update_email_code,
            new_email: user.new_email,
            redirectUrl: redirect.endsWith('/') ? redirect : `${redirect}/`
        });
        MailManger.send(
            user.email,
            'Update Email Address',
            'Update Email Address',
            MailTemplets.UPDATE_EMAIL.replaceAll('{subject}', 'Update Email Address')
                .replaceAll(
                    '{url}',
                    `${config.App_Url}/user/settings/update-email?verify=${varifyEmailToken}`

                )
                .replaceAll('{code}', code)
                .replaceAll('{from}', user.email)
                .replaceAll('{to}', new_email)
        );
        return res.send({
            message: 'Please Check Your Email',
            error: false,
            code: 200,
            data: {
                userId: user.id,
                email: user.email,
                code: code,
            }
        });

    }
    static async VerifyUpdateEmail(req, res) {
        const { verify } = req.query;
        if (!verify) {
            return res.redirect(`${config.Client_Url[0]}?status=error&message=Validation_Code_Is_Missing`);
        }
        const decode = TokenManager.compareCodeToken(verify);
        if (decode.error) {
            return res.redirect(`${config.Client_Url[0]}?status=error&message=Invalid_Validation_Code`);
        }
        const { id, code, new_email, redirectUrl } = decode;
        const user = await User.findByPk(id);
        if (!user) {
            return res.redirect(`${redirectUrl}?status=error&message=User_not_found`);
        }
        if (!user.update_email_code) {
            return res.redirect(`${redirectUrl}?status=error&message=Email_Not_Verified`);
        }
        if (user.update_email_code !== code) {
            return res.redirect(`${redirectUrl}?status=error&message=Invalid_Validation_Code`);
        }
        await user.update({
            email: new_email,
            new_email: null,
            update_email_code: null,
        });
        res.redirect(`${redirectUrl}?status=success&id=${user.id}&email=${user.email}&message=Email_Verified_Successfully`);
    }
}

module.exports = UserSettingsController