const path = require('path') 
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 映射 tsconfig 路径
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const isDev = process.env.NODE_ENV
// 抽离公共部分
const commonCssLoader = [
  isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
  'css-loader',
  'postcss-loader'
];

const commonRules = [{
    test: /\.css$/,
    use: [...commonCssLoader]
  },
  {
    test: /\.less$/,
    use: [...commonCssLoader, 'less-loader']
  }
]

const config = {
  entry: {
    index: path.join(__dirname, '../src/index.tsx')
  },
  output: {
    filename: 'js/[contenthash:8].js',
    path: path.join(__dirname, '../dist'),
    assetModuleFilename: 'img/[name].[hash:8].[ext]'
  },
  module: {
    rules: [
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
      }
    ]
  }, 
  resolve: {
    alias:{
      '@': path.join(__dirname, '../src')
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
      title: '管理后台',
      filename: 'index.html',
      template: path.join(__dirname, 'template.html')
    })
  ]
}

module.exports = config