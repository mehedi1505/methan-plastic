const router = require('express').Router()
const billControllers = require('../../../controllers/billControllers')
const { authMiddleware } = require("../../../middlewares/authMiddleware")

router.post('/bill-add', authMiddleware, billControllers.bill_add)
// router.get('/get-all-gate-pass-type', authMiddleware, gatePassControllers.get_all_gate_pass_type)
// router.get('/get-gate-pass-type-by-id/:gatePassId', authMiddleware, gatePassControllers.get_gate_pass_type_by_id)
// router.post('/gate-pass-type-update', authMiddleware, gatePassControllers.gate_pass_type_update)
// router.delete('/gate-pass-type-delete/:gatePassId', authMiddleware, gatePassControllers.gate_pass_type_delete)

// router.get('/get-agents', authMiddleware, gatePassControllers.get_agents)
// router.get('/get-customers', authMiddleware, gatePassControllers.get_customers)
// router.get('/get-terms', authMiddleware, gatePassControllers.get_terms)
// router.get('/get-gp-types', authMiddleware, gatePassControllers.get_gp_types)
router.get('/get-customer', authMiddleware, billControllers.get_customers)
router.get('/get-invoice', authMiddleware, billControllers.get_invoice)
router.get('/all-bill-get', authMiddleware, billControllers.all_bill_get)
router.get('/last-bill-number-show', authMiddleware, billControllers.last_bill_number_show)
router.get('/bill-add-info/:billNumber', authMiddleware, billControllers.bill_add_info)
router.delete('/product-delete/:billNumber/:productId', authMiddleware, billControllers.product_delete)
router.get('/bill-view-by-id/:billId', authMiddleware, billControllers.bill_view_by_id)
router.get('/get-bill-by-id/:billId', authMiddleware, billControllers.get_bill_by_id)
router.get('/customer-due/:cusId', authMiddleware, billControllers.customer_due)
// router.get('/show-gate-pass-product-details/:gpNumber', authMiddleware, gatePassControllers.show_gate_pass_product_details)
// router.delete('/g-pass-product-details-item-delete/:gpId/:productId', gatePassControllers.g_pass_product_details_item_delete)
// router.post('/gate-pass-add', authMiddleware, gatePassControllers.gate_pass_add)

router.post('/bill-info-update', authMiddleware, billControllers.bill_info_update)


module.exports = router