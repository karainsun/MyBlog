const fs = require('fs')
const koaBody = require('koa-body');  

module.exports = (app) => {
  fs.readdirSync(__dirname).forEach(file => {
    if (file === 'index.js' || file === 'user.js') return
    const route = require(`./${file}`)
    // 文件上传的路由与其他路由会殷顺序的问题发生错误，所以做个了判断加载文件上传路由和其他路由
    if(file === 'upload.js') {
      app.use(koaBody({
        multipart: true,
        formidable: {  
          keepExtensions: true,
          maxFileSize: 200 * 1024 * 1024 // 设置上传文件大小最大限制，默认2M
        }
      })); 
      app.use(route.routes()).use(route.allowedMethods())
    } else { 
      app.use(route.routes()).use(route.allowedMethods()) 
    }
  })
}