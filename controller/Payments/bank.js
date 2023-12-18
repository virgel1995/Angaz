const { User, Payments } = require("../../database")
const PayBank = require("../../database/models/PayMethods/bank")

class BankController {
    static async create(req, res) {
        const { userId, bankName, accountNumber, receiverName, IBAN } = req.body
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
        const haveBank = await PayBank.findOne({
            where: {
                userId: userExist.id
            }
        })
        if (haveBank) {
            return res.status(400).json({
                error: true,
                code: 400,
                message: "Bank Account Already Exist"
            })
        }
        await PayBank.create({
            bankName,
            accountNumber,
            receiverName,
            IBAN,
            username: userExist.username,
            PaymentId: userExist.payment.id,
            userId: userExist.id
        })

        Payments.update({
            hasBank: true
        }, {
            where: {
                id: userExist.payment.id
            }
        })
        return res.json({
            error: false,
            code: 200,
            message: "Bank Account Added Successfully"
        })
    }

    static async update(req, res) {
        const { id, bankName, accountNumber, receiverName, IBAN } = req.body
        const bank = await PayBank.findByPk(id)
        if (!bank) {
            return res.status(404).json({
                error: true,
                code: 404,
                message: "Bank Account Not Found"
            })
        }
        if (bankName && bankName !== "") {
            bank.bankName = bankName
        }
        if (accountNumber) {
            bank.accountNumber = accountNumber
        }
        console.log(receiverName.length);
        if (receiverName) {
            bank.receiverName = receiverName
        }
        if (IBAN) {
            bank.IBAN = IBAN
        }
        if (bank.accountNumber === accountNumber && bank.bankName === bankName && bank.receiverName === receiverName && bank.IBAN === IBAN) {
            return res.status(400).json({
                error: true,
                code: 400,
                message: "No Changes To Update Bank Account"
            })
        }
        await bank.update({
            bankName,
            accountNumber,
            receiverName,
            IBAN
        })
        return res.json({
            error: false,
            code: 200,
            message: "Bank Account Updated Successfully"
        })
    }
}

module.exports = BankController