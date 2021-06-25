## 1、创建文件夹并初始化

- npm init -y

## 2、安装初始化 webpack

- yarn add webpack webpack-cli --dev

## 3、新建 src/main.tsx

## 4、新建 webpack.config.js

### 配置 entry

```
entry: {
  index: './src/main.tsx'
}
```

### 配置 output

```
const path = require('path')
output: {
  path: path.resolve(__dirname, 'dist')
}
```

### 配置 module.rules

- 安装 babel-loader @babel/core @babel/preset-env @babel/preset-react @babel/preset-typescript

```
module: {
    rules: [{
      test: /\.(js|jsx|ts|tsx)$/,
      exclude: /node-modules/,
      loader: 'babel-loader',
      options: {
        cacheDirectory: true,
        cacheCompression: false
      }
    }]
  }
```

## 5、配置.babelrc

```
"presets": [
    "@babel/preset-env",
    "@babel/preset-react",
    "@babel/preset-typescript"
]
```

## 6、设置 mode

- 如果你正在开发就配成 development，如果你需要发布正式环境就配成 production

## 7、ts 配置和初始化

### 安装 ts

- yarn add typescript --dev

### 创建 tsconfig.json

[详细配置](https://www.jianshu.com/p/0383bbd61a6b)

```
{
  "compilerOptions": {
    "declaration": true,
    "baseUrl": ".",
    "module": "esnext",
    "target": "es5",
    "lib": ["es6", "dom"],
    "sourceMap": true,
    "jsx": "react",
    "moduleResolution": "node",
    "rootDir": ".",
    "forceConsistentCasingInFileNames": false,
    "noImplicitReturns": true,
    "noImplicitThis": true,
    "noImplicitAny": true,
    "importHelpers": true,
    "strictNullChecks": true,
    "allowSyntheticDefaultImports": true,
    "noUnusedLocals": true
  },
  "include": [
    "src"
  ],
  "exclude": [
    "node_modules",
    "build",
    "dist",
    "scripts",
    "acceptance-tests",
    "webpack",
    "jest",
    "src/setupTests.ts",
    "*.js"
  ]
}
```

### 创建 tslint.json

```
{
  "extends": ["tslint:recommended", "tslint-react"],
  "rules": {
    "no-console": [false, "log", "error"],
    "jsx-no-multiline-js": false,
    "whitespace": false,
    "no-empty-interface": false,
    "space-before-function-paren": false,
    "no-namespace": false,
    "label-position": false,
    "quotemark": [true, "single", "jsx-double"],
    "member-access": false,
    "semicolon": [true, "always", "ignore-bound-class-methods"],
    "no-unused-expression": [true, "allow-fast-null-checks"],
    "member-ordering": false,
    "trailing-comma": false,
    "arrow-parens": false,
    "jsx-self-close": false,
    "max-line-length": false,
    "interface-name": false,
    "no-empty": false,
    "comment-format": false,
    "ordered-imports": false,
    "object-literal-sort-keys": false,
    "eofline": false,
    "jsx-no-lambda": false,
    "no-trailing-whitespace": false,
    "jsx-alignment": false,
    "jsx-wrap-multilines": false,
    "no-shadowed-variable": [
      false,
      {
        "class": true,
        "enum": true,
        "function": false,
        "interface": false,
        "namespace": true,
        "typeAlias": false,
        "typeParameter": false
      }
    ]
  },
  "linterOptions": {
    "exclude": [
      "config/**/*.js",
      "node_modules/**/*.ts",
      "coverage/lcov-report/*.js"
    ]
  }
}
```

### gitigonre 里添加 dist 目录

- /dist/\*

### 试运行 npx webpack

- 控制台无报错，则打包成功
  ![alt 属性文本](src\assets\images\20210603202607.png)

## 8、安装 webpack-dev-server 自动打包

- 通过上面的配置我们可以把我们的 index.tsx 打包成 index.js，但是我们每当有内容修改都得重新打包，所以我们需要 webpack-dev-serve 来自动打包

```
yarn add webpack-dev-server
npx webpack-dev-server
```

### 添加 package.json 配置

```
"scripts": {
  "start": "webpack serve",
  "build": "webpack"
},
```

## 9、安装 html-webpack-plugin 插件，使我们可以访问页面

### 1、创建 build/template.html 页面

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Template</title>
</head>
<body>
  <div id="root"></div>
</body>
</html>
```

### 2、安装 html-webpack-plugin

- yarn add html-webpack-plugin -D

### 3、在 webpack.config.js 中配置

```
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html'
        })
    ]
}
```

### 4、运行 yarn build 打包测试

- yarn build

## 10、创建一个简单的 button.tsx 组件

### 在 src/components 目录下新建 button.tsx

```
import React from "react" // 安装react后引入

function Button() {
    return (
        <div>
            按钮
        </div>
    )
}
export default Button
```

- 上面的代码我们看上去并没使用 React，那是因为我们写的其实是 React 的语法糖就等价于

```
function Button() {
    return (
       React.createElement('div', null, 'hi')
    )
}
```

### 安装 react 和 react-dom

- yarn add react react-dom

### main.tsx 中引入

```
import React from 'react';
import ReactDom from 'react-dom';
```

### 安装 react 和 react-dom 的声明文件

- yarn add @types/react @types/react-dom --dev

### main.tsx 引入 Button

```
import Button from './button'
ReactDom.render(<Button />, document.querySelector('#root'));
```

### 在 webapck 配置文件中添加下面的代码

```
resolve: {
  extensions: ['.ts', '.tsx', '.js', '.jsx']
}
```

### 减小我们打包后 index.js 的大小

- 正常情况下我们打包会把我们依赖的库 react 和 react-dom 都打包进去，所以就会让我们的 js 很大，如果我们不想把它们打包进去，只需要在 webpack 里配置一个 externals（外部的包）

```
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
}
```

- mode 中 devlopment 和 production 的区别
  如果是 development 它的代码不会压缩，production 就会压缩你所有的代码

## 11、区分我们的 production 和 devlepment 模式

> 在 webpack.config 的基础上新建一个 webpack.config.dev 和 webpack.config.prod，其中
> webpack.config 里的代码是生产和开发都需要用到的共同的代码, 开发环境不需要代码压缩，所以> 不需要把 react 他们拆出来，生产环境也就是我们打包的时候是不需要生成一个 html 文件的，所以生> 产的不需要加 HtmlWebpackPlugin，最后我们只需要在共有的代码基础上添加新的代码就行，也就> 是在一个新的对象上添加共有代码和自己的代码。

#### 拆分 webpack.config.js

1.webpack.config.js

```
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: path.join(__dirname, '../src/main.tsx')
  },
  output: {
    filename: 'js/[name].js',
    path: path.join(__dirname, '../dist')
  },
  module: {
    rules: [{
      test: /\.(js|jsx|ts|tsx)$/,
      exclude: /node-modules/,
      loader: 'babel-loader',
      options: {
        cacheDirectory: true,
        cacheCompression: false
      }
    }]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'template.html')
    })
  ]
}
```

2.webpack.config.dev.js

```
const path = require('path')
const base = require('./webpack.config')

module.exports = Object.assign({}, base, {
  mode: 'development'
})
```

3.webpack.config.prod.js

```
const path = require('path')
const base = require('./webpack.config')
module.exports = Object.assign({}, base, {
  mode: 'production',
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
  }
})
```

## 12、安装并配置 cross-env 保证我们的环境变量在各个平台上都可以成功的运行

- package.json 修改 scripts 启动项

```
"start": "cross-env NODE_ENV=development webpack serve --config build/webpack.config.dev.js",
"build": "cross-env NODE_ENV=production webpack --config build/webpack.config.prod.js"
```

## 13、配置我们的类型声明文件

- 将我们的.d.ts 的类型声明文件生成的出口改成 dist
- 修改 tsconfig.json

```
"compilerOptions": {
  "outDir": "dist"
}
```

- 这样我们打包后就会在 dist 目录下生成.d.ts 对应的文件
- 在 package.json 里添加我们类型声明文件使用的文件，以及修改我们的 main 文件为 dist 目录下的

```
"main": "dist/js/index.js",
"types": "dist/js/index",
```

## 14、配置 Jest 单元测试

1.安装相关依赖

> yarn add --dev jest babel-jest @babel/preset-env @babel/preset-react react-test-renderer

2. 创建.babelrc

```
{
  "presets": ["react-app"]
}
```

3. 在 package.json 里配置测试命令

```
"test": "cross-env NODE_ENV=test jest --config=jest.config.js --runInBand",
```

4. 创建 jest.config.js

```
module.exports = {
    verbose: true,
    clearMocks: false,
    collectCoverage: false,
    reporters: ["default"],
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
    moduleDirectories: ['node_modules'],
    globals: {
      'ts-jest': {
        tsConfig: 'tsconfig.test.json',
      },
    },
    moduleNameMapper: {
      "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/test/__mocks__/file-mock.js",
    },
    testMatch: ['<rootDir>/**/__tests__/**/*.unit.(js|jsx|ts|tsx)'],
    transform: {
      "^.+unit\\.(js|jsx)$": "babel-jest",
      '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    setupFilesAfterEnv: ["<rootDir>test/setupTests.js"]
  }
```

5. 安装 ts-jest

- yarn add ts-jest --dev

6. 创建 test/setupTests.js
7. 运行 yarn test

8. 开始写单元测试

```
testMatch: ['<rootDir>//tests//*.unit.(js|jsx|ts|tsx)']
```

jest.config.js 中的上面的 testMatch 就是测试的时候匹配的文件目录，所以我们需要在我们的 lib 目录下创建一个 tests 目录，下面的文件以.unit.(js|jsx|ts|tsx)来命名

创建 tests/hello.unit.tsx

```
function add(a: number, b:number): number {
    return a + b
}
describe('add(1,2)', () => {
  it('等于3', () => {
      expect(add(1,2)).toEqual(3)
  })
})
```

9. 创建 tsconfig.test.json

```
{
    "extends": "./tsconfig.json",
  //   "compilerOptions": {
  //     "module": "commonjs"
  //   }
}
```

- 单元测试就可以成功的运行了 10.一个简单 button 的单元测试

```
import React from 'react'
import renderer from 'react-test-renderer'
import Button from '../button'

describe('button', () => {
  it('是个div', () => {
    //渲染一个Button，因为Button是一个对象所以我们可以把它转成json
    const json = renderer.create(<Button/>).toJSON()
    //期待它去匹配Snapshot
    expect(json).toMatchSnapshot()
  })
})
```

运行 yarn test 报错，说我们的 renderer 是 undefined
原因：我们没有默认导出

解决方法：

> 1、import 后加\* as
> 2、修改 tsconfig 里的 allowSyntheticDefaultImports 为 esModuleInterop
