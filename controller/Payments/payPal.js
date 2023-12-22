const { User, Payments, PayPayPal } = require("../../database")

class PayPalController {
    static async create(req, res) {
        const { userId, username, email } = req.body
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
        const havePayPal = await PayPayPal.findOne({
            where: {
                userId: userExist.id
            }
        })
        if (havePayPal) {
            return res.status(400).json({
                error: true,
                code: 400,
                message: "PayPal Already Exist"
            })
        }
        await PayPayPal.create({
            username,
            email,
            userId: userExist.id,
            PaymentId: userExist.payment.id
        })
        await Payments.update({
            hasPayPal: true
        }, {
            where: {
                id: userExist.payment.id
            }
        })
        return res.status(200).json({
            error: false,
            code: 200,
            message: "PayPal Added Successfully"
        })
    }
    static async delete(req, res) {
        const { userId } = req.body
        const record = await PayPayPal.findOne({
            where: {
                userId
            }
        })
        if (!record) {
            return res.status(404).json({
                error: true,
                code: 404,
                message: "No Data Founded"
            })
        }
        await record.destroy()
        const Payment = await Payments.findByPk(record.PaymentId)
        await Payment.update({
            hasPayPal: false
        })
        return res.status(200).json({
            error: false,
            code: 200,
            message: "Data Deleted Successfully"
        })
    }

    static async update(req, res) {
        const { id, username } = req.body
        const record = await PayPayPal.findByPk(id)
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
        await record.save()
        return res.status(200).json({
            error: false,
            code: 200,
            message: "Data Updated Successfully"
        })
    }
}

module.exports = PayPalController