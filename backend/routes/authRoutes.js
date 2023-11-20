const router = require('express').Router()
const authControllers = require('../controllers/authControllers')
const { authMiddleware } = require("../middlewares/authMiddleware")

router.post('/admin-login', authControllers.admin_login)
router.get('/admin-logout', authControllers.admin_logout)
// router.get('/get-user', authMiddleware, authControllers.get_user)
// router.post('/sub-admin-register', authControllers.sub_admin_register)
// router.post('/sub-admin-login', authControllers.sub_admin_login)
router.get('/get-user-info',authMiddleware, authControllers.get_user)
// router.post('/profile-image-upload', authMiddleware, authControllers.profile_image_upload)
// router.post('/profile-info-add', authMiddleware, authControllers.profile_info_add)

module.exports = router