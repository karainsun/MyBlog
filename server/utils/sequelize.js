const { Sequelize } = require('sequelize')
const config = require('../config/sequelizeConfig')

const sequelize = new Sequelize(config.databaseName, config.userName, config.password, {
  host: config.host,
  dialect: config.dialect,
  protocol: config.dialect,
  port: config.port,
  // 字段以下划线（_）来分割（默认是驼峰命名风格）
  underscored: true,
  timezone: config.timezone, //东八区
  dialectOptions: {
    ssl: config.ssl,
  },
  define: {
    charset: 'utf8',
    collate: 'utf8_general_ci' 
  }
});

// 测试连接
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

module.exports = sequelize;
