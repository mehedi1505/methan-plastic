const router = require('express').Router()
const invoiceControllers = require("../../../controllers/invoiceControllers")
const { authMiddleware } = require("../../../middlewares/authMiddleware")

router.get('/get-customers', authMiddleware, invoiceControllers.get_customers)
router.post('/get-products', authMiddleware, invoiceControllers.get_products)
router.get('/get-terms', authMiddleware, invoiceControllers.get_terms)
router.get('/get-product-info/:orderNumber/:productId', authMiddleware, invoiceControllers.get_product_info)
router.post('/invoice-create', authMiddleware, invoiceControllers.invoice_create)
router.get('/show-product-details/:invoiceNumber', authMiddleware, invoiceControllers.show_product_details)
router.delete('/product-details-item-delete/:invoiceId/:productId', invoiceControllers.product_details_item_delete)
router.get('/last-invoice-number-show', authMiddleware, invoiceControllers.last_invoice_number_show)

router.get('/invoice-products-get',authMiddleware, invoiceControllers.invoice_product_get)
router.get('/invoice-get-by-id/:invoiceId', invoiceControllers.invoice_get_by_id)
router.get('/invoice-view-by-id/:invoiceId', invoiceControllers.invoice_view_by_id)
router.get('/order-status/:orderNumber', invoiceControllers.order_status)
router.post('/invoice-info-update',authMiddleware, invoiceControllers.invoice_info_update)
router.delete('/invoice-delete/:invoiceId', invoiceControllers.invoice_delete)



module.exports = router