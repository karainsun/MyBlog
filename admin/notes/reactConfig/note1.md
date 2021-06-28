### src 目录创建主要文件

- assets -- 静态资源目录
- components -- 通用组件
- i18n -- 国际化配置
- layouts -- layout 布局组件
- mock -- mock 数据
- pages -- 页面组件
- router -- 路由配置
- store -- 仓库存放 redux
- utils -- 工具函数及通用方法
- App.tsx -- 根组件
- index.css -- 全局样式
- index.tsx -- 项目入口

## 初始化 redux

1. 安装 redux

- npm install --save redux

2. 安装附加包 React 绑定库、开发者工具、中间件

- npm install --save react-redux
- npm install --save-dev redux-devtools
- npm install --save redux-thunk

3. store 文件夹创建 actions、actionType、reducer、state 文件夹
4. 入口文件配置

```
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import store from 'store'
import App from 'App'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
```

## 添加声明文件

- 防止出现 “类型 ‘XXX’ 上不存在属性 ‘ XXX ’ ”
- 新建 src/types/index.d.ts
- 需要配置下 tsconfig.json 中的 paths 和 baseUrl 字段，类似如下

```
  {
    "compilerOptions": {
        "module": "esnext",
        "baseUrl": "./src",
        "paths": {
            "@/*": ["./*"],
        }
    }
}
```
