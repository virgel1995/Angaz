const router = require("express").Router();
const { AdminsSiteSettingsController } = require("../../controller/admin");
const { CheckAuthrization } = require("../../middleware");

// router.use(CheckAuthrization.checkAuthrizationAdmin);

router.post('/', AdminsSiteSettingsController.create);
router.put('/', AdminsSiteSettingsController.update);
router.delete('/', AdminsSiteSettingsController.delete);
router.get('/', AdminsSiteSettingsController.findAll);

module.exports = router