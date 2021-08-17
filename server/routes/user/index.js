const router = require('koa-router')()
const { userRegister, userLogin} = require('../../controllers/user')
// 路有前缀
router.prefix('/user')
// 用户注册
router.post('/register', userRegister)
// 用户登录
router.post('/login', userLogin) 

module.exports = router
