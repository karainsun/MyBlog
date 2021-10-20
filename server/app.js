const Koa = require('koa')
const app = new Koa()
// const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const cors = require('koa2-cors') 
const path = require('path')  
const { verify } = require('./utils/routeVerify')
const whiteList = require('./middleware/whiteList')

const loadRouter = require('./routes')
const db = require('./models')

// error handler
onerror(app)

// 中间件：middlewares
// 允许跨域
app.use(cors({
  origin: function(ctx) { 
    const whiteList = ['http://www.kayrain.cn']   //可跨域白名单
    let currentUrl = ctx.request.origin     
    let changeUrl = currentUrl.substring(0,currentUrl.length - 5)   
    if(whiteList.includes(changeUrl)){
        return changeUrl    
    }
    return 'http://localhost:3000' // 开发环境用的，默认允许本地端口跨域
  },
  credentials: true
}))
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(path.join(__dirname, 'public')))

// app.use(views(__dirname + '/views', {
//   extension: 'pug'
// })) 

// 登录和注册的路由不做任何限制
const user = require('./routes/user')
app.use(user.routes()).use(user.allowedMethods())
// 白名单
whiteList(app)

// token二次验证加权限校验
app.use(async (ctx, next) => {  
  const result = await verify(ctx, next)  
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

// 路由
loadRouter(app) 

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

const ServePort = '3000'
app.listen(ServePort, () => {
  db.sequelize
    .sync({ force: false }) // If force is true, each DAO will do DROP TABLE IF EXISTS ..., before it tries to create its own table
    .then(async () => { 
      console.log('sequelize connect success')
      console.log(`sever listen on http://localhost:${ServePort}`)
    })
    .catch(err => {
      console.log(err)
    })
})