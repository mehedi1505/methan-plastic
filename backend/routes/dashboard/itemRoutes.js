const router = require('express').Router()
const itemControllers = require('../../controllers/itemControllers')
const { authMiddleware } = require("../../middlewares/authMiddleware")

router.post('/item-add', authMiddleware, itemControllers.item_add)
router.get('/items-get',authMiddleware, itemControllers.items_get)
router.get('/item-get-by-id/:itemId', itemControllers.item_get_by_id)
router.post('/item-update',authMiddleware, itemControllers.item_update)
// router.delete('/item-delete/:item_id', itemControllers.item_delete)


module.exports = router