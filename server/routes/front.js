const router = require('koa-router')()
const {
  articleList,
  articleArchives,
  userInfo, 
  postDetail,
  touristLogin,
  makeComment,
  getComment,
  collectList,
  collectCategoryAll,
  bannerList,
  makeMessage,
  getMessage
} = require('../controllers/front')
const { categoryAll } = require('../controllers/category')
const { tagAll } = require('../controllers/tag')
// 文章列表
router.get('/post/list', articleList)
// 文章归档
router.get('/post/archives', articleArchives)
// 个人信息
router.get('/user/info', userInfo)
// 全部标签
router.get('/post/tags', tagAll)
// 最新五条/全部文章
router.get('/new/posts', articleArchives)
// 全部分类
router.get('/post/category', categoryAll)
// 文章详情
router.get('/post/detail', postDetail)
// 游客登录
router.post('/tourist/login', touristLogin)
// 发表评论
router.post('/make/comment', makeComment)
// 查询评论
router.get('/get/comments', getComment)
// 收藏列表
router.get('/front/collect', collectList)
// 全部收藏分类
router.get('/front/collect_category', collectCategoryAll)
// 全部 Banner
router.get('/banner/list', bannerList)
// 发表留言
router.post('/make/message', makeMessage)
// 留言列表
router.get('/get/messages', getMessage)

module.exports = router