const router = require('express').Router()
const gatePassControllers = require('../../../controllers/gatePassControllers')
const { authMiddleware } = require("../../../middlewares/authMiddleware")

router.post('/gate-pass-type-add', authMiddleware, gatePassControllers.gate_pass_type_add)
router.get('/get-all-gate-pass-type', authMiddleware, gatePassControllers.get_all_gate_pass_type)
router.get('/get-gate-pass-type-by-id/:gatePassId', authMiddleware, gatePassControllers.get_gate_pass_type_by_id)
router.post('/gate-pass-type-update', authMiddleware, gatePassControllers.gate_pass_type_update)
router.delete('/gate-pass-type-delete/:gatePassId', authMiddleware, gatePassControllers.gate_pass_type_delete)

router.get('/get-agents', authMiddleware, gatePassControllers.get_agents)
router.get('/get-customers', authMiddleware, gatePassControllers.get_customers)
router.get('/get-terms', authMiddleware, gatePassControllers.get_terms)
router.get('/get-gp-types', authMiddleware, gatePassControllers.get_gp_types)
router.get('/get-products', authMiddleware, gatePassControllers.get_products)
router.get('/gate-pass-products-get', authMiddleware, gatePassControllers.gate_pass_products_get)
router.get('/last-gate-pass-number-show', authMiddleware, gatePassControllers.last_gate_pass_number_show)
router.get('/get-product-info/:productId', authMiddleware, gatePassControllers.get_product_info)
router.get('/show-gate-pass-product-details/:gpNumber', authMiddleware, gatePassControllers.show_gate_pass_product_details)
router.delete('/g-pass-product-details-item-delete/:gpId/:productId', gatePassControllers.g_pass_product_details_item_delete)
router.post('/gate-pass-add', authMiddleware, gatePassControllers.gate_pass_add)
router.get('/gp-get-by-id/:gatePassId', authMiddleware, gatePassControllers.gp_get_by_id)
router.post('/gp-info-update', authMiddleware, gatePassControllers.gp_info_update)


module.exports = router