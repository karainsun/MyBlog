const router = require('koa-router')()
const {
  collectCategoryCreate,
  collectCategoryList,
  collectCategoryUpdate,
  collectCategoryDelete,
  collectCategoryAll,
  collectCreate,
  collectList,
  collectDelete,
  collectUpdate
} = require('../controllers/collect')

// 创建收藏分类
router.post('/collect_category/create', collectCategoryCreate)
// 收藏分类列表
router.get('/collect_category/list', collectCategoryList)
// 全部收藏分类
router.get('/collect_category/all', collectCategoryAll)
// 更新分类
router.put('/collect_category/update', collectCategoryUpdate)
// 删除分类
router.post('/collect_category/delete', collectCategoryDelete)
// 创建收藏
router.post('/collect/create', collectCreate)
// 收藏列表
router.get('/collect/list', collectList)
// 删除收藏
router.post('/collect/delete', collectDelete)
// 更新收藏
router.put('/collect/update', collectUpdate)

module.exports = router