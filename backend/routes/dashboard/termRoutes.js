const router = require('express').Router()
const termControllers = require('../../controllers/termControllers')
const { authMiddleware } = require("../../middlewares/authMiddleware")

router.post('/term-add', authMiddleware, termControllers.add_term)
router.get('/term-get', authMiddleware, termControllers.term_get)
router.get('/term-get-by-id/:termId', authMiddleware, termControllers.term_get_by_id)
router.post('/term-update', authMiddleware, termControllers.term_update)
router.delete('/term-delete/:term_id', authMiddleware, termControllers.term_delete)


module.exports = router