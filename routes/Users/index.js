const router = require("express").Router()
const UserAuthRoutes = require('./auth')
const UserSettings = require('./settings')
router.use('/auth', UserAuthRoutes)
router.use('/settings', UserSettings)



module.exports = router