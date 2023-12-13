const Validate = require("../../app/validation")
const ProjectController = require("../../controller/project")

const router = require("express").Router()

router.get("/", ProjectController.findAll)

//  
router.post("/", Validate.CreateProjectRules, ProjectController.create)
router.put("/", ProjectController.update)
router.delete("/", ProjectController.delete)


router.get("/:id", ProjectController.getById)

module.exports = router