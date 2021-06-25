const autoprefixer = require('autoprefixer')

module.exports = {
  plugins: [
    // 处理需要浏览器支持的带前缀的css属性例如： -o-,-moz-
    autoprefixer()
  ]
}
