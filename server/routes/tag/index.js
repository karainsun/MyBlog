const router = require('koa-router')() 
const { tagAll, tagList, tagCreate, tagUpdate, tagDelete } = require('../../controllers/tag')

// 获取全部标签
router.get('/tag/all', tagAll)
// 获取标签列表
router.get('/tag/list', tagList)
// 创建标签
router.post('/tag/create', tagCreate)
// 批量删除标签
router.post('/tag/delete', tagDelete)
// 更新标签
router.put('/tag/update', tagUpdate)

module.exports = router