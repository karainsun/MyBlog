const router = require('koa-router')()
const { userList, userDelete, userRoleStatus, userDetail, userUpdate } = require('../controllers/user')
// 路有前缀
router.prefix('/user') 
// 用户列表
router.get('/list', userList)
// 用户删除
router.post('/delete', userDelete)
// 用户权限和状态
router.put('/status', userRoleStatus)
// 用户信息
router.get('/detail', userDetail)
// 用户信息更新
router.put('/update', userUpdate) 

module.exports = router
