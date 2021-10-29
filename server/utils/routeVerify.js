const jwt = require('jsonwebtoken')
const apiList = require('./apiList')

// token 二次验证，其实是为了做权限控制
const verify = async (ctx, next) => {
  // 所请求 api 是否带参数，若带参数将？和参数去掉，得到请求地址
  let apiUrl = ctx.url.indexOf('?') > 0 ? ctx.url.split('?')[0] : ctx.url

  return new Promise((resolve, reject) => { 
    if (apiList[apiUrl].userType === 0) {
      resolve({});
    } else {
      const token = ctx.request.header.authorization
      // 注意：完整的token是 Bear 和空格之后的，所以需要根据空格截取
      jwt.verify(token.split(" ")[1], 'k_token', (err, decoded) => {
        if (err) {
          reject('token验证错误！')
        } else {
          if (!decoded.is_admin && decoded.is_admin !== apiList[apiUrl].is_admin) { // TODO:
            resolve('没有操作权限~')
          }
        }
        resolve(decoded);
      })
    }
  })
}

module.exports = {
  verify
}