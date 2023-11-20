const router = require('express').Router()
const collectionControllers = require('../../../controllers/collectionControllers')
const { authMiddleware } = require("../../../middlewares/authMiddleware")

router.get('/get-all-payment-mode', authMiddleware, collectionControllers.get_all_payment_mode)
router.get('/get-all-customers', authMiddleware, collectionControllers.get_all_customers)
router.get('/get-banks', authMiddleware, collectionControllers.get_banks)
router.get('/get-agents', authMiddleware, collectionControllers.get_agents)
router.get('/get-all-collection', authMiddleware, collectionControllers.get_all_collection)
// router.get('/get-item-info/:itemId', authMiddleware, receiveControllers.get_item_info)
router.post('/collection-add', authMiddleware, collectionControllers.collection_add)
// router.get('/show-item-details/:receiveId', authMiddleware, receiveControllers.show_item_receive)
// router.delete('/receive-details-item-delete/:invoiceId/:itemId', receiveControllers.receive_details_item_delete)
// router.get('/last-invoice-number', authMiddleware, receiveControllers.last_invoice_number)

// router.get('/receive-items-get',authMiddleware, receiveControllers.receive_items_get)
router.get('/collection-get-by-id/:collectionId', collectionControllers.collection_get_by_id)
router.post('/collection-update',authMiddleware, collectionControllers.collection_update)
// router.delete('/receive-invoice-delete/:receiveId', receiveControllers.receive_invoice_delete)



module.exports = router