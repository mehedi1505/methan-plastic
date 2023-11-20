const router = require('express').Router()
const paymentControllers = require('../../../controllers/paymentControllers')
const { authMiddleware } = require("../../../middlewares/authMiddleware")

// router.get('/get-all-payment-mode', authMiddleware, collectionControllers.get_all_payment_mode)
router.get('/get-all-vendors', authMiddleware, paymentControllers.get_all_vendors)
// router.get('/get-banks', authMiddleware, collectionControllers.get_banks)
// router.get('/get-agents', authMiddleware, collectionControllers.get_agents)
router.get('/get-all-payment', authMiddleware, paymentControllers.get_all_payment)
// router.get('/get-item-info/:itemId', authMiddleware, receiveControllers.get_item_info)
router.post('/payment-add', authMiddleware, paymentControllers.payment_add)
// router.get('/show-item-details/:receiveId', authMiddleware, receiveControllers.show_item_receive)
// router.delete('/receive-details-item-delete/:invoiceId/:itemId', receiveControllers.receive_details_item_delete)
// router.get('/last-invoice-number', authMiddleware, receiveControllers.last_invoice_number)

// router.get('/receive-items-get',authMiddleware, receiveControllers.receive_items_get)
router.get('/payment-get-by-id/:paymentId', paymentControllers.payment_get_by_id)
router.post('/payment-update',authMiddleware, paymentControllers.payment_update)
// router.delete('/receive-invoice-delete/:receiveId', receiveControllers.receive_invoice_delete)



module.exports = router