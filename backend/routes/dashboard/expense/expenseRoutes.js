const router = require('express').Router()
const expenseControllers = require('../../../controllers/expenseControllers')
const { authMiddleware } = require("../../../middlewares/authMiddleware")
///expense Category route
router.post('/expense-category-add', authMiddleware, expenseControllers.expense_category_add)
router.get('/get-expense-category', authMiddleware, expenseControllers.get_expense_category)
router.get('/category-get-by-id/:catId', expenseControllers.category_get_by_id)
router.post('/expense-category-update', expenseControllers.expense_category_update)
router.delete('/expense-category-delete/:cat_id', expenseControllers.expense_category_delete)

//expense route

router.get('/get-customer', authMiddleware, expenseControllers.get_customer)
router.get('/get-payment-mode', authMiddleware, expenseControllers.get_payment_mode)
router.post('/expense-add', authMiddleware, expenseControllers.expense_add)
router.get('/get-expense', authMiddleware, expenseControllers.get_expense)
router.get('/expense-get-by-id/:expId', expenseControllers.expense_get_by_id)
router.post('/expense-update', expenseControllers.expense_update)
router.delete('/expense-delete/:exp_id', expenseControllers.expense_delete)

module.exports = router