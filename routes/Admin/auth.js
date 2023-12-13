const Validate = require("../../app/validation")
const { AdminAuthController } = require("../../controller/admin")

const router = require("express").Router()

router.get("/", AdminAuthController.findAll)

router.post("/",
    Validate.CreateAdminRules,
    AdminAuthController.create)
router.patch("/", Validate.AdminLoginRules, AdminAuthController.login)
router.patch("/accept", Validate.AdminAcceptLoginRules, AdminAuthController.AcceptLogin)

module.exports = router