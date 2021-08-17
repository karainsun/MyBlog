const { resolve } = require('path');
const sequelize = require('../utils/sequelize');
const { importByDir } = require('../utils/tools');
// 动态引入模型文件，统一建表
;(async () =>{
  importByDir(resolve(__dirname, `./../models`));
  await sequelize.sync();
})();