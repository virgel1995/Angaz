const { AdminSubCategoreisController } = require("../../controller/admin")
const Validate = require("../../app/validation")
// const { CheckAuthrization } = require("../../middleware")

const router = require("express").Router()

// no auth required
router.get('/', AdminSubCategoreisController.findAll)
// auth required
// router.use(CheckAuthrization.checkAuthrizationAdmin) // uncomment after finish api
router.post('/', Validate.CreateSubCategorytRules, AdminSubCategoreisController.create)
router.put('/', AdminSubCategoreisController.update)
router.delete('/', AdminSubCategoreisController.delete)


module.exports = router