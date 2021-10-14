const router = require('koa-router')()
const { messagetList, replyMessage, messageDelete, newestMessage } = require('../controllers/message')

// 留言列表
router.get('/message/list', messagetList)
// 最新几条留言
router.get('/newest/message', newestMessage)
// 回复留言
router.post('/reply/message', replyMessage)
// 批量删除留言
router.post('/message/delete', messageDelete)

module.exports = router