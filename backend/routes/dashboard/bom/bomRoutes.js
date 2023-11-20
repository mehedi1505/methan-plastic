const router = require('express').Router()
const bomControllers = require('../../../controllers/bomControllers')
const { authMiddleware } = require("../../../middlewares/authMiddleware")

router.get('/get-product', authMiddleware, bomControllers.get_product)
router.get('/get-product-name-by-id/:productId', authMiddleware, bomControllers.get_product_name_by_id)
router.get('/get-items', authMiddleware, bomControllers.get_items)
router.get('/get-unit-item-name/:itemId', authMiddleware, bomControllers.get_unit_item_name)
router.get('/bom-details-get/:productId', authMiddleware, bomControllers.bom_details_get)
router.post('/bom-add', authMiddleware, bomControllers.bom_add)
router.get('/boms-get',authMiddleware, bomControllers.boms_get)
// router.get('/bom-get-by-id/:bomId', bomControllers.bom_get_by_id)
// router.post('/bom-update',authMiddleware, bomControllers.bom_update)
router.delete('/bom-delete/:productId', bomControllers.bom_delete)
router.delete('/bom-details-item-delete/:productId/:itemId', bomControllers.bom_details_item_delete)

router.post('/spl-product-add', authMiddleware, bomControllers.spl_product_add)

module.exports = router