const router = require('express').Router()
const productControllers = require('../../../controllers/productControllers')
const { authMiddleware } = require("../../../middlewares/authMiddleware")

router.post('/product-add', authMiddleware, productControllers.product_add)
router.get('/products-get',authMiddleware, productControllers.products_get)
router.get('/get-product-by-id/:productId', productControllers.product_get_by_id)
router.post('/product-update',authMiddleware, productControllers.product_update)


module.exports = router