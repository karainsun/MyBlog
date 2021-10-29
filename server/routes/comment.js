const router = require('koa-router')()
const { commentList, replyComment, commentDelete, newestComment } = require('../controllers/comment')

// 最新几条评论 / 全部
router.get('/newest/comment', newestComment)
// 评论列表
router.get('/comment/list', commentList)
// 回复评论
router.post('/reply/comment', replyComment)
// 批量删除评论
router.post('/comment/delete', commentDelete)

module.exports = router