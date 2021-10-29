const router = require('koa-router')()
const { articleArchives } = require('../controllers/front')
const { articleCreate, articleList, articleDelete, articleDetail, articleUpdate } = require('../controllers/article')
 
// 最新几条文章/全部
router.get('/article/newest', articleArchives) 
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
