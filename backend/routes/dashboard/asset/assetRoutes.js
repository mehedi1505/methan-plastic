const router = require('express').Router()
const assetControllers = require('../../../controllers/assetControllers')
const { authMiddleware } = require("../../../middlewares/authMiddleware")
//asset type routes
router.post('/asset-type-add', authMiddleware, assetControllers.asset_type_add)
router.get('/asset-type-get', authMiddleware, assetControllers.asset_type_get)
router.get('/asset-type-get-by-id/:typeId', authMiddleware,assetControllers.asset_type_get_by_id)
router.post('/asset-type-update', authMiddleware, assetControllers.asset_type_update)

//asset register route
router.post('/asset-register-add', authMiddleware, assetControllers.asset_register_add)
router.get('/asset-register-get', authMiddleware, assetControllers.asset_register_get)
router.get('/register-get-by-id/:regId', authMiddleware,assetControllers.register_get_by_id)
router.post('/register-update', authMiddleware, assetControllers.register_update)

//asset revalue route
router.get('/get-type-origin/:assetId', authMiddleware, assetControllers.get_type_origin)
router.get('/asset-register-item-get', authMiddleware, assetControllers.asset_register_item_get)
router.post('/asset-revalue-add', authMiddleware, assetControllers.asset_revalue_add)
router.get('/asset-revalue-get', authMiddleware, assetControllers.asset_revalue_get)
router.get('/revalue-get-by-id/:revalueId', authMiddleware,assetControllers.revalue_get_by_id)
router.post('/revalue-update', authMiddleware, assetControllers.revalue_update)

//asset depreciation route
router.post('/asset-depreciation-add', authMiddleware, assetControllers.asset_depreciation_add)
router.get('/asset-depreciation-get', authMiddleware, assetControllers.asset_depreciation_get)
router.get('/depreciation-get-by-id/:depreciationId', authMiddleware,assetControllers.depreciation_get_by_id)
router.post('/depreciation-update', authMiddleware, assetControllers.depreciation_update)

//asset closure route
router.post('/asset-closure-add', authMiddleware, assetControllers.asset_closure_add)
router.get('/asset-closure-get', authMiddleware, assetControllers.asset_closure_get)
router.get('/closure-get-by-id/:closureId', authMiddleware,assetControllers.closure_get_by_id)
router.post('/closure-update', authMiddleware, assetControllers.closure_update)
module.exports = router