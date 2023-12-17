const { User } = require("../../database")
const PayInstaPay = require("../../database/models/PayMethods/instaPay")

class BankAccountController {
    static async createInstaPay(req, res) {
        const { userId, email, username } = req.body
        const userExist = await User.findByPk(userId)
        if (!userExist) {
            return res.status(404).json({
                error: true,
                code: 404,
                message: "User Not Found"
            })
        }
        const instaPayCreate = await PayInstaPay.create({
            userId,
            email,
            username,
            AccountId: userExist.AccountId
        })
        return res.status(201).json({
            error: false,
            code: 201,
            message: "InstaPay Created Successfully",
            data: instaPayCreate
        })
    }
}

module.exports = BankAccountController