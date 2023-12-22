const { User, Payments, PayEWallet } = require("../../database")

class EwalletController {
    static async create(req, res) {
        const { mobile, username, userId } = req.body
        const userExist = await User.findByPk(userId, {
            include: {
                model: Payments,
                attributes: ["id"]
            }
        })
        if (!userExist) {
            return res.status(404).json({
                error: true,
                code: 404,
                message: "User Not Found"
            })
        }
        const haveEwallet = await PayEWallet.findOne({
            where: {
                userId: userExist.id
            }
        })
        if (haveEwallet) {
            return res.status(400).json({
                error: true,
                code: 400,
                message: "E-Wallet Already Exist"
            })
        }
        await PayEWallet.create({
            mobile,
            username,
            userId: userExist.id,
            PaymentId: userExist.payment.id
        })
        const Payment = await Payments.findByPk(userExist.payment.id)
        await Payment.update({
            hasEWallet: true
        })
        return res.status(200).json({
            error: false,
            code: 200,
            message: "Data Created Successfully"
        })
    }
    static async update(req, res) {
        const { username, id } = req.body
        const record = await PayEWallet.findByPk(id)
        if (!record) {
            return res.status(404).json({
                error: true,
                code: 404,
                message: "No Data Found"
            })
        }
        if (username) {
            record.username = username
        }
        if (username == record.username) {
            return res.status(400).json({
                error: true,
                code: 400,
                message: "No Changes To Update Data"
            })
        }
        await record.update({
            username
        })
        return res.status(200).json({
            error: false,
            code: 200,
            message: "Data Updated Successfully"
        })
    }
    static async delete(req, res) {
        const { userId } = req.body
        const record = await PayEWallet.findOne({
            where: {
                userId
            }
        })
        if (!record) {
            return res.status(404).json({
                error: true,
                code: 404,
                message: "No Data Found"
            })
        }
        await record.destroy()
        const Payment = await Payments.findByPk(record.PaymentId)
        await Payment.update({
            hasEWallet: false
        })
        return res.status(200).json({
            error: false,
            code: 200,
            message: "Data Deleted Successfully"
        })
    }
}

module.exports = EwalletController