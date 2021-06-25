### 安装 clean-webpack-plugin

- yarn add clean-webpack-plugin -D

### 安装 webpack-merge

- yarn add webpack-merge -D

### 安装 optimize-css-assets-webpack-plugin

- yarn add optimize-css-assets-webpack-plugin -D

### 安装 less less-loader css-loader style-loader

- yarn add less less-loader css-loader style-loader -D

### 安装 postcss postcss-loader postcss-preset-env

- yarn add postcss postcss-loader postcss-preset-env -D

### 安装 autoprefixer

- yarn add autoprefixer -D
  配置 postcss.config.js

```
const autoprefixer = require('autoprefixer')

module.exports = {
  plugins: [
    // 处理需要浏览器支持的带前缀的css属性例如： -o-,-moz-
    autoprefixer()
  ]
}
```

### 安装 @babel/plugin-proposal-private-methods

- yarn add @babel/plugin-proposal-private-methods -D

### 安装 @pmmmwh/react-refresh-webpack-plugin react-refresh

- yarn add @pmmmwh/react-refresh-webpack-plugin react-refresh -D
  配置热更新 HMR

```
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
plugins: [
  new ReactRefreshPlugin()
]
```

### 修改 tsconfig.json

```

{
  "compilerOptions": {

    "baseUrl": "./src",
    "paths": {
      "@compoents": ["./components/*"],
      "@/*": ["./*"],
    }
  }
}
```
