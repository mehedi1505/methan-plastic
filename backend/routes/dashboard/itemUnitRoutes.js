const router = require('express').Router()
const unitControllers = require("../../controllers/unitControllers")
const { authMiddleware } = require("../../middlewares/authMiddleware")

router.post('/item-unit-add', authMiddleware, unitControllers.add_unit)
router.get('/item-unit-get', unitControllers.unit_get)
router.get('/item-unit-get-by-id/:unitId', unitControllers.unit_get_by_id)
router.post('/item-unit-update', unitControllers.unit_update)
router.delete('/item-unit-delete/:unit_id', unitControllers.unit_delete)


module.exports = router