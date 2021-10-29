const router = require('koa-router')() 
const { bannerCreate, bannerAll, bannerDelete, bannerUpdate } = require('../controllers/banner')

// 获取全部Banner
router.get('/banner/all', bannerAll) 
// 创建Banner
router.post('/banner/create', bannerCreate)
// 批量删除 Banner
router.post('/banner/delete', bannerDelete)
// 更新 Banner
router.put('/banner/update', bannerUpdate)

module.exports = router