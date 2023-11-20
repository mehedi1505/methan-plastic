const router = require('express').Router()
const bankControllers = require('../../../controllers/bankControllers')
const { authMiddleware } = require("../../../middlewares/authMiddleware")

router.post('/bank-add', authMiddleware, bankControllers.bank_add)
router.get('/get-bank', bankControllers.bank_get)
router.get('/get-bank-by-id/:bankId', bankControllers.get_bank_by_id)
router.post('/bank-update', bankControllers.bank_update)
router.delete('/bank-delete/:bank_id', bankControllers.bank_delete)


module.exports = router