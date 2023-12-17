const Validate = require("../../app/validation")
const BankAccountController = require("../../controller/bankAccount")
const router = require("express").Router()

router.post("/createInstaPay", BankAccountController.createInstaPay)

module.exports = router