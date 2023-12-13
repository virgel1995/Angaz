const { UserSettingsController } = require("../../controller/user")
const Validate = require("../../app/validation")
const { CheckAuthrization } = require("../../middleware")

const router = require("express").Router()


router.get('/update-email', UserSettingsController.VerifyUpdateEmail) // verify update email {No Auth Required}
// Auth Required
router.use(CheckAuthrization.checkAuthrizationUser) // uncomment after finish api

router.post('/update', UserSettingsController.update)
router.post('/update-email', Validate.UserUpdateEmailRules, UserSettingsController.updateEmail)


module.exports = router