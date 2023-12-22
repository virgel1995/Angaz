const { User, Payments, PayCard } = require("../../database")

class CardController {
    static async create(req, res) {
        const { userId, cardNumber, cardHolderName } = req.body
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
        const haveCard = await PayCard.findOne({
            where: {
                userId: userExist.id
            }
        })
        if (haveCard) {
            return res.status(400).json({
                error: true,
                code: 400,
                message: "Card Already Exist"
            })
        }
        await PayCard.create({
            userId: userExist.id,
            PaymentId: userExist.payment.id,
            cardNumber,
            cardHolderName
        })
        await Payments.update({
            hasCard: true
        }, {
            where: {
                id: userExist.payment.id
            }
        })
        return res.json({
            error: false,
            code: 200,
            message: "Card Added Successfully"
        })
    }

    static async update(req, res) {
        const { id, cardHolderName } = req.body
        const card = await PayCard.findByPk(id)
        if (!card) {
            return res.status(404).json({
                error: true,
                code: 404,
                message: "Card Not Found"
            })
        }
        if (cardHolderName) {
            card.cardHolderName = cardHolderName
        }
        if (cardHolderName === card.cardHolderName) {
            return res.status(400).json({
                error: true,
                code: 400,
                message: "No Changes To Update Card"
            })
        }
        card.update({
            cardHolderName
        })
        return res.json({
            error: false,
            code: 200,
            message: "Card Updated Successfully"
        })
    }

    static async delete(req, res) {
        const { userId } = req.body
        const card = await PayCard.findOne({
            where: {
                userId
            }
        })
        if (!card) {
            return res.status(404).json({
                error: true,
                code: 404,
                message: "Card Not Found"
            })
        }
        await card.destroy()
        const Payment = await Payments.findByPk(card.PaymentId)
        await Payment.update({
            hasCard: false
        })
        return res.json({
            error: false,
            code: 200,
            message: "Card Deleted Successfully"
        })
    }
}

module.exports = CardController