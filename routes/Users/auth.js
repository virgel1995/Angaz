const router = require("express").Router()
const Validate = require("../../app/validation")
const { UserAuthController } = require("../../controller/user")



router.post("/sign-up", Validate.UserRegisterRules, UserAuthController.Register)
router.post("/signin", Validate.UserLoginRules, UserAuthController.Login)
router.get("/verifay-signup", UserAuthController.verifyRegistration)

router.get("/getPayments/:id", UserAuthController.getPayments)

module.exports = router