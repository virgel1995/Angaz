const InstaController = require('./insta')
const BankController = require('./bank')
const CardController = require("./card")
const EwalletController = require('./eWallet')
const PayPalController = require('./payPal')

module.exports = {
    Insta: InstaController,
    Bank: BankController,
    Card: CardController,
    Ewallet: EwalletController,
    PayPal: PayPalController
}