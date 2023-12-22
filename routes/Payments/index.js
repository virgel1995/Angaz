const Validate = require("../../app/validation")
const PaymentController = require("../../controller/Payments")
const router = require("express").Router()

router.post("/insta", PaymentController.Insta.create)
router.put("/insta", PaymentController.Insta.update)
router.delete("/insta", PaymentController.Insta.delete)

router.post("/bank", Validate.PaymentBankRules, PaymentController.Bank.create)
router.put("/bank", PaymentController.Bank.update)
router.delete("/bank", PaymentController.Bank.delete)

router.post("/card", Validate.PaymentCardRules, PaymentController.Card.create)
router.put("/card", PaymentController.Card.update)
router.delete("/card", PaymentController.Card.delete)

router.post("/eWallet", Validate.PaymentEwalletRules, PaymentController.Ewallet.create)
router.put("/eWallet", PaymentController.Ewallet.update)
router.delete("/eWallet", PaymentController.Ewallet.delete)

router.post("/paypal", Validate.PaymentPaypalRules, PaymentController.PayPal.create)
router.put("/paypal", PaymentController.PayPal.update)
router.delete("/paypal", PaymentController.PayPal.delete)

module.exports = router