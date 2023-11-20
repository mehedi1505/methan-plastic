const router = require('express').Router()
const paymentModeControllers = require('../../../controllers/paymentModeControllers')
const { authMiddleware } = require("../../../middlewares/authMiddleware")

router.post('/pay-mode-add', authMiddleware, paymentModeControllers.pay_mode_add)
router.get('/get-pay-mode', authMiddleware,paymentModeControllers.pay_mode_get)
router.get('/get-pay-mode-by-id/:pmodeId', authMiddleware, paymentModeControllers.get_pay_mode_by_id)
router.post('/pay-mode-update', authMiddleware, paymentModeControllers.pay_mode_update)
router.delete('/pay-mode-delete/:pmode_id', authMiddleware, paymentModeControllers.pay_mode_delete)


module.exports = router