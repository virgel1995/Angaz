const Logger = require("../../app/logger")
const { User, Payments } = require("../../database")
const PayInstaPay = require("../../database/models/PayMethods/instaPay")

class InstaController {
    static async create(req, res) {
        const { userId, email } = req.body
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
        const haveInstaPay = await PayInstaPay.findOne({
            where: {
                userId: userExist.id
            }
        })
        if (haveInstaPay) {
            return res.status(400).json({
                error: true,
                code: 400,
                message: "InstaPay Already Exist"
            })
        }
        let PaymentId = userExist.payment?.id
        if (!userExist.payment) {
            Logger.error("Payment Id Not Found", {
                userId: userExist.id,
                username: userExist.username,
                email: userExist.email,
            })
            const newPayment = await Payments.create({
                userId: userExist.id
            })
            PaymentId = newPayment.id
        }
        await PayInstaPay.create({
            userId: userExist.id,
            email,
            username: userExist.username,
            PaymentId: PaymentId
        })
        Payments.update({
            hasInstaPay: true
        }, {
            where: {
                id: PaymentId
            }
        });
        return res.status(201).json({
            error: false,
            code: 201,
            message: "InstaPay Created Successfully",
        })
    }
    static async update(req, res) {
        const { id, email } = req.body
        const record = await PayInstaPay.findByPk(id)
        if (!record) {
            return res.status(404).json({
                error: true,
                code: 404,
                message: "No Data Founded"
            })
        }
        if (email === record.email) {
            return res.status(400).json({
                error: true,
                code: 400,
                message: "No Changes To Update Data"
            })
        }
        if (email) {
            record.email = email
            await record.save()
        }
        return res.status(200).json({
            error: false,
            code: 200,
            message: "Data Updated Successfully",
        })
    }
}

module.exports = InstaController