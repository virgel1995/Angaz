const router = require("express").Router()
const { AdminSkillsController } = require("../../controller/admin")

router.get("/", AdminSkillsController.findAll)
router.post("/", AdminSkillsController.create)
router.put("/", AdminSkillsController.update)
router.delete("/", AdminSkillsController.delete)

module.exports = router