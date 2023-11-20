const router = require('express').Router()
const reportControllers = require('../../../controllers/reportControllers')
const { authMiddleware } = require("../../../middlewares/authMiddleware")


router.get('/get-all-vendor', authMiddleware, reportControllers.get_all_vendor)
router.get('/customers-get', authMiddleware, reportControllers.customers_get)
router.post('/get-received-material-data',authMiddleware, reportControllers.get_received_material_data)
router.post('/get-challan-data',authMiddleware, reportControllers.get_challan_data)
router.get('/material-stock-data',authMiddleware, reportControllers.material_stock_data)
router.get('/product-stock-data',authMiddleware, reportControllers.product_stock_data)
router.get('/get-all-material-for-stock',authMiddleware, reportControllers.get_all_material_for_stock)
router.get('/get-all-product-for-stock',authMiddleware, reportControllers.get_all_product_for_stock)
router.get('/get-single-item-stock/:itemId',authMiddleware, reportControllers.get_single_item_stock)
router.get('/get-single-product-stock/:productId',authMiddleware, reportControllers.get_single_product_stock)
router.post('/get-production-report-data',authMiddleware, reportControllers.get_production_report_data)
router.post('/get-payment-report-data',authMiddleware, reportControllers.get_payment_report_data)
router.post('/get-collection-report-data',authMiddleware, reportControllers.get_collection_report_data)
router.post('/get-expenses-report-data',authMiddleware, reportControllers.get_expenses_report_data)
router.post('/get-gp-report-data',authMiddleware, reportControllers.get_gp_report_data)



module.exports = router