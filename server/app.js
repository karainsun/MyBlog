const Koa = require('koa')
const app = new Koa()
// const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const cors = require('koa2-cors')
const koaBody = require('koa-body');  
const path = require('path')

const article = require('./routes/article')
const category = require('./routes/category')
const tag = require('./routes/tag')
const upload = require('./routes/upload')
const user = require('./routes/user')
const admin = require('./routes/admin')
const koajwt = require('koa-jwt')
const { verify } = require('./utils/routeVerify')

require('./models')

// error handler
onerror(app)

// 中间件：middlewares
// 允许跨域
app.use(cors())
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(path.join(__dirname, 'public')))

// app.use(views(__dirname + '/views', {
//   extension: 'pug'
// }))

// 日志：logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})
// 错误捕获中间件
app.use(async (ctx, next) => {
  return next().catch((err) => {
    if (err.status === 401) {
      ctx.status = 401;
      ctx.body = {
        code: 401,
        msg: err.message
      }
    } else {
      throw err;
    }
  })
});

// jwt鉴权（首次token验证）中间件，注意：放在路由前面
app.use(koajwt({
  secret: 'k_token'
}).unless({ // 配置白名单
  path: [/\/user\/register/, /\/user\/login/]
})) 

// 路由：routes
app.use(user.routes(), user.allowedMethods())
// token二次验证加权限校验
app.use(async (ctx, next) => { 
  const result = await verify(ctx) 
  if (typeof result === 'object') {
    ctx.state.userInfo = result
    await next()
  } else { 
    ctx.body = {
      code: 501,
      msg: result,
      status: 'field'
    }
  }
})

app.use(article.routes(), article.allowedMethods())
app.use(category.routes(), category.allowedMethods())
app.use(tag.routes(), tag.allowedMethods()) 
app.use(admin.routes(), admin.allowedMethods()) 
app.use(koaBody({
  multipart: true,
  formidable: {
    // 上传目录
    // uploadDir: path.join(__dirname, 'public/uploads'),
    // 保留文件扩展名
    keepExtensions: true,
    maxFileSize: 200 * 1024 * 1024 // 设置上传文件大小最大限制，默认2M
  }
}));
app.use(upload.routes(), upload.allowedMethods()) 

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app