const { resolve } = require('path'); 
const { importByDir } = require('../utils/tools');

// 动态路由
module.exports = importByDir(resolve(__dirname, './../routes')); 