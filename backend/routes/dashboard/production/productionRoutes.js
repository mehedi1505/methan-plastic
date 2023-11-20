const router = require('express').Router()
const productionControllers = require('../../../controllers/productionControllers')
const { authMiddleware } = require("../../../middlewares/authMiddleware")

router.get('/get-products', authMiddleware, productionControllers.get_products)
router.get('/last-batch-number', authMiddleware, productionControllers.last_batch_number)
router.get('/get-bom-items/:productId', authMiddleware, productionControllers.get_bom_items)
router.get('/show-product-price-by-id/:productId', authMiddleware, productionControllers.show_product_price_by_id)
router.get('/get-bom-by-id/:productId', authMiddleware, productionControllers.get_bom_by_id)
router.get('/show-product-name-by-id/:productId', authMiddleware, productionControllers.show_product_name_by_id)
// router.get('/bom-details-get/:productId', authMiddleware, bomControllers.bom_details_get)
router.post('/production-add', authMiddleware, productionControllers.production_add)
router.get('/get-all-production',authMiddleware, productionControllers.get_all_production)
router.get('/get-production-by-id/:productionId', productionControllers.get_production_by_id)
router.post('/production-update',authMiddleware, productionControllers.production_update)
router.delete('/production-delete/:productionId', productionControllers.production_delete)
// router.delete('/bom-details-item-delete/:productId/:itemId', bomControllers.bom_details_item_delete)


module.exports = router