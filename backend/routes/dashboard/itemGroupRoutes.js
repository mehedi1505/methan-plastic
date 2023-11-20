const router = require('express').Router()
const itemGroupControllers = require('../../controllers/itemGroupControllers')
const { authMiddleware } = require("../../middlewares/authMiddleware")

router.post('/item-group-add', authMiddleware, itemGroupControllers.add_item_group)
router.get('/item-group-get', authMiddleware, itemGroupControllers.item_group_get)
router.get('/item-group-get-by-id/:groupId', authMiddleware, itemGroupControllers.item_group_get_by_id)
router.post('/item-group-update', authMiddleware, itemGroupControllers.item_group_update)
router.delete('/item-group-delete/:group_id', authMiddleware, itemGroupControllers.item_group_delete)


module.exports = router