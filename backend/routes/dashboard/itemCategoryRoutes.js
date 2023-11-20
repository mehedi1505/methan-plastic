const router = require('express').Router()
const itemCategoryControllers = require('../../controllers/itemCategoryControllers')
const { authMiddleware } = require("../../middlewares/authMiddleware")

router.post('/item-category-add', authMiddleware, itemCategoryControllers.add_item_category)
router.get('/item-category-get', itemCategoryControllers.item_category_get)
router.get('/item-category-get-by-id/:itemCatId', itemCategoryControllers.item_category_get_by_id)
router.post('/item-category-update', itemCategoryControllers.item_category_update)
router.delete('/item-category-delete/:category_id', itemCategoryControllers.item_category_delete)


module.exports = router