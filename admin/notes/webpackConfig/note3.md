# Eslint + Prettier 配置
配置参考：[Eslint + Prettier 配置](https://juejin.cn/post/6955664681306423327#heading-9)
### 一、安装 prettier

- npm install prettier -D
- 创建.prettierignore 文件：忽略不去检查的文件
- 创建.prettierrc.js 文件：定义规则

```
执行检查命令：
npx prettier --test .  // 全部文件
npx prettier --test components/  // 特定文件
执行修复命令：
npx prettier --write .  // 全部文件
npx prettier --write components/  // 特定文件

```

### 二、安装 eslint

- npm i eslint -D
- 创建 eslintrc.js 文件：eslint 配置文件
- 创建.eslintignore 文件：忽略文件
- package.json scripts 添加命令

```
"lint": "eslint '{components,example}/**/*.{ts,tsx,js,jsx}'",
"lint_fix": "eslint '{components,example}/**/*.{ts,tsx,js,jsx}' --fix"
```

- 安装 eslint-config-alloy npm i eslint-config-alloy -D
  它提供了 ts + react 的版本，并且不包含代码格式的部分，与 Prettier 完全兼容
- 安装 eslint-loader npm i eslint-loader -D

### 三、webpack 添加 eslint-loader

> 注意：要把它放在 rules 的第一项，或者添加 enforce: 'pre' 来保证首先应用 eslint-loader，因为是要对我们的源代码进行检查，检查要在 babel-loader 等其他编译之前

```
rules: [
  {
    test: /\.(jsx|js|ts|tsx)$/,
    include: [
        path.resolve(__dirname, '../components'),
        path.resolve(__dirname, '../example')
    ],
    exclude: [/node_modules/],
    use: ['eslint-loader'],
    enforce: 'pre'
  }
]
```

- 安装 prettier-eslint eslint-config-prettier

### 四、规范 git 提交

安装依赖

- npm install husky lint-staged -D

```
"husky": {
   "hooks": {
     "pre-commit": "lint-staged",
   }
 },
 "lint-staged": {
   "*.{ts,tsx,js,jsx}": [
     "eslint --config .eslintrc.js"
   ],
   "**/*": "prettier --write ."
 }
```
