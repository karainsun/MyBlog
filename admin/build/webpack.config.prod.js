const {
  join
} = require('path')
const {
  merge
} = require('webpack-merge');
const base = require('./webpack.config')
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

process.env.NODE_ENV = 'development'

module.exports = merge(base, {
  mode: process.env.NODE_ENV,
  externals: {
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react',
      root: 'React',
    },
    'react-dom': {
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'react-dom',
      root: 'ReactDOM'
    }
  }, 
  plugins: [
    new OptimizeCssPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/built.[contenthash:6].css'
    }),
    new CleanWebpackPlugin()
  ],
  optimization: {
    usedExports: true, // usedExports:true 开启优化(树摇但保留代码)
    minimize: true // minimize:true 开启压缩 (删除未使用代码)
  }
})