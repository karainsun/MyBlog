const { join } = require('path');
const { merge } = require('webpack-merge');
const base = require('./webpack.config');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

process.env.NODE_ENV = 'production';

module.exports = merge(base, {
  mode: process.env.NODE_ENV,
  externals: {
    // 'react': 'React',
    // 'react-dom': 'ReactDOM'
    // react: {
    //   commonjs: 'react',
    //   commonjs2: 'react',
    //   amd: 'react',
    //   root: 'React'
    // },
    // 'react-dom': {
    //   commonjs: 'react-dom',
    //   commonjs2: 'react-dom',
    //   amd: 'react-dom',
    //   root: 'ReactDOM'
    // }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/built.[contenthash:6].css'
    }),
    new CleanWebpackPlugin()
  ],
  optimization: {
    usedExports: true, // usedExports:true 开启优化(树摇但保留代码)
    minimize: false,
    minimizer: [
      new CssMinimizerPlugin()
    ]
  }
});
