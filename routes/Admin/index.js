const router = require("express").Router()
const AdminAuthRoutes = require('./auth')
const CategoreisRoutes = require('./categoreis')
const SubCategoreisRoutes = require('./subCategoreis')
const AdminUsersRoutes = require('./users')
const SiteSettings = require('./siteSettings')
router.use('/site', SiteSettings)
router.use('/auth', AdminAuthRoutes)
router.use('/categoreis', CategoreisRoutes)
router.use('/sub-categoreis', SubCategoreisRoutes)
router.use('/users', AdminUsersRoutes)

module.exports = router