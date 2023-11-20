const router = require('express').Router()
const vendorControllers = require('../../../controllers/vendorControllers')
const { authMiddleware } = require("../../../middlewares/authMiddleware")

router.post('/vendor-add', authMiddleware, vendorControllers.vendor_add)
router.get('/vendor-get',authMiddleware, vendorControllers.vendor_get)
router.get('/vendor-get-by-id/:vendorId', vendorControllers.vendor_get_by_id)
router.post('/vendor-update',authMiddleware, vendorControllers.vendor_update)
router.delete('/vendor-delete/:vendor_id', vendorControllers.vendor_delete)


module.exports = router