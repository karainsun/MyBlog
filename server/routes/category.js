const router = require('koa-router')() 
const { categoryAll, categoryList, categoryCreate, categoryDelete, categoryUpdate } = require('../controllers/category')

// 获取全部分类
router.get('/category/all', categoryAll)
// 获取分类列表
router.get('/category/list', categoryList)
// 创建分类
router.post('/category/create', categoryCreate)
// 批量删除分类
router.post('/category/delete', categoryDelete)
// 更新分类
router.put('/category/update', categoryUpdate)

module.exports = router