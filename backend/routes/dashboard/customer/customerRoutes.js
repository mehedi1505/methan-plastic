const router = require('express').Router()
const customerControllers = require('../../../controllers/customerControllers')
const { authMiddleware } = require("../../../middlewares/authMiddleware")

router.post('/customer-add', authMiddleware, customerControllers.customer_add)
router.get('/customer-get',authMiddleware, customerControllers.customer_get)
router.get('/customer-get-by-id/:customerId', customerControllers.customer_get_by_id)
router.post('/customer-update',authMiddleware, customerControllers.customer_update)
router.delete('/customer-delete/:customer_id', customerControllers.customer_delete)


module.exports = router