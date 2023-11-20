const router = require('express').Router()
const customerOrderControllers = require('../../../controllers/customerOrderControllers')
const { authMiddleware } = require("../../../middlewares/authMiddleware")

router.get('/last-order-number-show', authMiddleware, customerOrderControllers.last_order_number_show)
router.get('/get-order-customers', authMiddleware, customerOrderControllers.get_order_customers)
router.get('/get-order-products', authMiddleware, customerOrderControllers.get_order_products)
router.get('/get-order-product-info/:productId', authMiddleware, customerOrderControllers.get_order_product_info)
router.post('/order-create', authMiddleware, customerOrderControllers.order_create)
router.get('/show-order-details/:orderNumber', authMiddleware, customerOrderControllers.show_order_details)
router.delete('/order-details-item-delete/:orderId/:productId', customerOrderControllers.order_details_item_delete)
router.get('/order-products-get',authMiddleware, customerOrderControllers.order_product_get)
// router.get('/order-get', customerOrderControllers.order_get)
router.get('/order-get-by-id/:orderId', customerOrderControllers.order_get_by_id)
router.post('/order-info-update',authMiddleware, customerOrderControllers.order_info_update)
// router.post('/order-update', customerOrderControllers.order_update)
router.delete('/order-delete/:orderId', customerOrderControllers.order_delete)

router.get('/total-sales', customerOrderControllers.total_sales)
router.get('/today-sales', customerOrderControllers.today_sales)


module.exports = router