const Validate = require("../../app/validation")
const PaymentController = require("../../controller/Payments")
const router = require("express").Router()

router.post("/insta", PaymentController.Insta.create)
router.put("/insta", PaymentController.Insta.update)
router.delete("/insta", PaymentController.Insta.delete)

router.post("/bank", Validate.PaymentBankRules, PaymentController.Bank.create)
router.put("/bank", PaymentController.Bank.update)


module.exports = router