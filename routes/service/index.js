const ServiceController = require('../../controller/service')
const Validate = require("../../app/validation")

const router = require('express').Router()
// no auth required
router.get('/', ServiceController.findAll)
// auth required

router.post('/', Validate.CreateServiceRules, ServiceController.create)
router.put('/', ServiceController.update)
router.delete('/', ServiceController.delete)

router.post('/add-remove-like', Validate.ServiceLikeOrDisLikeOrFavoriteRules, ServiceController.addOrRemoveLike)
router.post('/add-remove-dislike', Validate.ServiceLikeOrDisLikeOrFavoriteRules, ServiceController.addOrRemoveDisLike)
router.post('/add-remove-favorite', Validate.ServiceLikeOrDisLikeOrFavoriteRules, ServiceController.addOrRemoveFavorite)


module.exports = router