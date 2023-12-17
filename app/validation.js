const Joi = require("joi")
const config = require("../config")
const { isValidURL } = require("./Helper")
const Helper = require("./Helper")
const headers = ["body", "params", "query"]

const Validator = (Schema) => {
    return (req, res, next) => {
        headers.forEach((key) => {
            if (Schema[key]) {
                let validateShema = Schema[key].validate(req[key])
                if (validateShema.error) {
                    throw new Error(validateShema.error)
                } else {
                    next()
                }
            }
        })
    }
}
exports.Validator = Validator
exports.CreateAdminRules = Validator({
    body: Joi.object().required().keys({
        username: Joi.string().required(),
        password: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        level: Joi.string().required().custom((value) => {
            if (!config.ALLOWED_ADMIN_LEVELS.includes(value)) {
                throw new Error("level must be one of " + config.ALLOWED_ADMIN_LEVELS)
            }
            return value
        }),
        email: Joi.string().required().email()
    })
})

exports.AdminLoginRules = Validator({
    body: Joi.object().required().keys({
        method: Joi.string().required(),
    })
})
exports.AdminAcceptLoginRules = Validator({
    body: Joi.object().required().keys({
        method: Joi.string().required(),
        password: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    })
})
exports.UserRegisterRules = Validator({
    body: Joi.object().required().keys({
        username: Joi.string().required(),
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        mobile: Joi.string().required(),
        // gender: Joi.string().required().custom((value) => {
        //     if (!config.ALLOWED_GENDER.includes(value)) {
        //         throw new Error("gender must be one of " + config.ALLOWED_GENDER)
        //     }
        //     return value
        // }),
        role: Joi.string().required().custom((value) => {
            if (!config.ALLOWED_USER_ROLE.includes(value)) {
                throw new Error("role must be one of " + config.ALLOWED_USER_ROLE)
            }
            return value
        }),
        redirect: Joi.string().required().custom((value) => {
            if (!isValidURL(value)) {
                throw new Error("redirect must be valid url")
            }
            return value
        })
    })
})

exports.UserLoginRules = Validator({
    body: Joi.object().required().keys({
        method: Joi.string().required(),
        password: Joi.string().required()
    })
})


exports.UserUpdateEmailRules = Validator({
    body: Joi.object().required().keys({
        userId: Joi.string().required(),
        new_email: Joi.string().required().email(),
        redirect: Joi.string().required().custom((value) => {
            if (!isValidURL(value)) {
                throw new Error("redirect must be valid url")
            }
            return value
        })
    })
})

exports.CreateProjectRules = Validator({
    body: Joi.object().required().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        skills: Joi.string().required().custom((value) => {
            let processValue = value ? Array.from(value) : []
            if (processValue.length < 1) {
                throw new Error("You Must Add one Skill at least")
            }
            return value
        }),
        expectedBudget: Joi.string().required(),
        estimatedDeliveryTime: Joi.string().required().custom((value) => {
            if (!Helper.validateDate(value)) {
                throw new Error("not valid Date Format")
            }
            let currentDate = Helper.getCurrentDate()
            if (!Helper.compareTwoDates(value, currentDate)) {
                throw new Error("Estimated Delivery Date Must Be Greater Than Current Date")
            }
            return value
        }),
        createdUser: Joi.string().required(),
        categId: Joi.string().required(),
        attachments: Joi.any(),
        subCategId: Joi.any(),
    })
})

exports.ProjectUpdateRules = Validator({
    body: Joi.object().required().keys({
        id: Joi.string().required(),
        title: Joi.string(),
        description: Joi.string(),
        skills: Joi.string().custom((value) => {
            let processValue = value ? Array.from(value) : []
            if (processValue.length < 1) {
                throw new Error("You Must Add one Skill at least")
            }
            return value
        }),
        expectedBudget: Joi.string(),
        estimatedDeliveryTime: Joi.string().custom((value) => {
            if (!Helper.validateDate(value)) {
                throw new Error("not valid Date Format")
            }
            let currentDate = Helper.getCurrentDate()
            if (!Helper.compareTwoDates(value, currentDate)) {
                throw new Error("Estimated Delivery Date Must Be Greater Than Current Date")
            }
            return value
        }),
        categId: Joi.string(),
        subCategId: Joi.string(),
    })
})

exports.CreateCategorytRules = Validator({
    body: Joi.object().required().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
    })
})
exports.CreateSubCategorytRules = Validator({
    body: Joi.object().required().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        categId: Joi.string().required(),
    })
})
exports.ServiceLikeOrDisLikeOrFavoriteRules = Validator({
    body: Joi.object().required().keys({
        id: Joi.string().required(),
        userId: Joi.string().required(),
    })
})

exports.CreateServiceRules = Validator({
    body: Joi.object().required().keys({
        createdUser: Joi.string().required(),
        featured: Joi.boolean().required(),
        title: Joi.string().required(),
        description: Joi.string().required(),
        image: Joi.string().required(),
        tag: Joi.any().required(),
        price: Joi.number().required(),
        deliveryTime: Joi.number().required(),
        categId: Joi.string().required(),
        subCategId: Joi.any(),
        discount: Joi.any(),

    })
})
