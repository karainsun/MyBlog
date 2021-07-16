const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 映射 tsconfig 路径
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const isDev = process.env.NODE_ENV; 
// 抽离公共部分
const commonCssLoader = [isDev ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'];

const commonRules = [
  {
    test: /\.css$/,
    use: [...commonCssLoader]
  },
  {
    test: /\.less$/,
    use: [...commonCssLoader, 'less-loader']
  }
];

const config = {
  entry: {
    index: path.join(__dirname, '../src/index.tsx')
  },
  output: {
    filename: 'js/[contenthash:8].js',
    path: path.join(__dirname, '../dist'),
    assetModuleFilename: 'images/[name].[hash:6].[ext]'
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js|ts|tsx)$/,
        exclude: [/node_modules/],
        use: ['eslint-loader'],
        enforce: 'pre'
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node-modules/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          cacheCompression: false
        }
      },
      ...commonRules,
      {
        test: /\.(png|jpg|jpeg|gif|webp)$/,
        type: 'asset'
      },
      {
        test: /\.(ttf|woff|eot|svg|woff2)$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name].[hash:6].[ext]',
        },
      }
    ]
  },
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom'
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: path.join(__dirname, '../tsconfig.json')
      })
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Kay`s admin',
      filename: 'index.html',
      template: path.join(__dirname, 'template.html')
    })
  ]
};

module.exports = config;
