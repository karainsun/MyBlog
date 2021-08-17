const router = require('koa-router')()
const { articleCreate, articleList, articleDelete, articleDetail, articleUpdate } = require('../../controllers/article')
 
// 创建文章
router.post('/article/create', articleCreate) 
// 文章列表
router.get('/article/list', articleList) 
// 批量删除文章
router.post('/article/delete', articleDelete) 
// 文章详情
router.get('/article/detail', articleDetail) 
// 文章更新
router.put('/article/update', articleUpdate) 

module.exports = router
