

const router = require('express').Router()
// const Validate = require('../../app/validation')
// const { CheckAuthrization } = require('../../middleware')


const { AdminUsersController } = require('../../controller/admin')

// required admin auth 
// router.use(CheckAuthrization.checkAuthrizationAdmin) // uncomment after finish api
router.get('/', AdminUsersController.findAll)

module.exports = router