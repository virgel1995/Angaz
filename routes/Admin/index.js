const router = require("express").Router()
const AdminAuthRoutes = require('./auth')
const CategoreisRoutes = require('./categoreis')
const SubCategoreisRoutes = require('./subCategoreis')
const AdminUsersRoutes = require('./users')
router.use('/auth', AdminAuthRoutes)
router.use('/categoreis', CategoreisRoutes)
router.use('/sub-categoreis', SubCategoreisRoutes)
router.use('/users', AdminUsersRoutes)

module.exports = router