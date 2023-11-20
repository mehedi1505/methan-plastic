const router = require('express').Router()
const recTypeControllers = require('../../controllers/recTypeControllers')
const { authMiddleware } = require("../../middlewares/authMiddleware")

router.post('/rec-type-add', authMiddleware, recTypeControllers.add_rec_type)
router.get('/rec-type-get', recTypeControllers.rec_type_get)
router.get('/rec-type-get-by-id/:recTypeId', recTypeControllers.rec_type_get_by_id)
router.post('/rec-type-update', recTypeControllers.rec_type_update)


module.exports = router