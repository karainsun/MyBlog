const { join } = require('path');
const { merge } = require('webpack-merge'); 
const base = require('./webpack.config');

process.env.NODE_ENV = 'development';

const config = merge(base, { 
  mode: process.env.NODE_ENV,
  devServer: {
    // 将 dist 目录下的文件，作为可访问文件
    contentBase: join(__dirname, '/src/'),
    // 开启Gzip压缩
    // compress: true,
    host: 'localhost',
    port: 3003,
    hot: true,
    noInfo: true,
    overlay: {
      errors: true
    },
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        pathRewrite: { '^/api': '' }
      }
    }
  }
});

module.exports = config;
