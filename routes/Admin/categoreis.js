const { AdminCategoreisController } = require("../../controller/admin")
const Validate = require("../../app/validation")
// const { CheckAuthrization } = require("../../middleware")

const router = require("express").Router()

// no auth required
router.get('/', AdminCategoreisController.findAll)
// auth required
// router.use(CheckAuthrization.checkAuthrizationAdmin) // uncomment after finish api
router.post('/', Validate.CreateCategorytRules, AdminCategoreisController.create)
router.put('/', AdminCategoreisController.update)
router.delete('/', AdminCategoreisController.delete)


module.exports = router