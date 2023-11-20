const router = require('express').Router()
const receiveControllers = require('../../../controllers/receiveControllers')
const { authMiddleware } = require("../../../middlewares/authMiddleware")

router.get('/get-receive-types', authMiddleware, receiveControllers.get_receive_types)
router.get('/get-vendors', authMiddleware, receiveControllers.get_vendors)
router.get('/get-items', authMiddleware, receiveControllers.get_items)
router.get('/get-item-info/:itemId', authMiddleware, receiveControllers.get_item_info)
router.post('/item-receive', authMiddleware, receiveControllers.item_receive)
router.get('/show-item-details/:receiveId', authMiddleware, receiveControllers.show_item_receive)
router.delete('/receive-details-item-delete/:invoiceId/:itemId', receiveControllers.receive_details_item_delete)
router.get('/last-invoice-number', authMiddleware, receiveControllers.last_invoice_number)

router.get('/receive-items-get',authMiddleware, receiveControllers.receive_items_get)
router.get('/receive-get-by-id/:receiveId', receiveControllers.receive_get_by_id)
router.post('/receive-info-update',authMiddleware, receiveControllers.receive_info_update)
router.delete('/receive-invoice-delete/:receiveId', receiveControllers.receive_invoice_delete)



module.exports = router