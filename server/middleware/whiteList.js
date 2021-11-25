const koajwt = require('koa-jwt')

module.exports = (app) => {
  // jwt鉴权（首次token验证）中间件，注意：放在路由前面
app.use(koajwt({
  secret: 'k_token'
}).unless({ // 配置白名单
  path: [
    /\/user\/register/, 
    /\/user\/login/, 
    /\/post\/list/, 
    /\/post\/archives/, 
    /\/post\/search/, 
    /\/user\/info/,
    /\/post\/tags/,
    /\/new\/posts/,
    /\/post\/category/,
    /\/post\/detail/,
    /\/tourist\/login/,
    /\/make\/comment/,
    /\/get\/comments/,
    /\/front\/collect/,
    /\/front\/collect_category/,
    /\/banner\/list/,
    /\/make\/message/,
    /\/get\/messages/,
  ]
})) 
}