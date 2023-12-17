const Validate = require("../../app/validation")
const PaymentController = require("../../controller/Payments")
const router = require("express").Router()

router.post("/insta", PaymentController.Insta.create)
router.put("/insta", PaymentController.Insta.update)


module.exports = router