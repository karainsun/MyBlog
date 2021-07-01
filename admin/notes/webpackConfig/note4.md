## Tailwindcss PostCSS 配置

### 一、安装 Tailwindcss

> “由于 PostCSS 8 才使用了几个月，因此生态系统中的许多其他工具尚未更新，这意味着在安装 Tailwind，并尝试编译 CSS 时，您可能会在终端中看到这样的错误：<b>Error: PostCSS plugin tailwindcss requires PostCSS 8.</b>为了弥合这个问题，直到每个人都进行了更新，我们还在 npm 的 compat 频道下发布了 PostCSS 7 兼容性版本。” --引用自官网
> 依次安装 Tailwindcss postCSS autoprefixer

- npm install tailwindcss@npm:@tailwindcss/postcss7-compat @tailwindcss/postcss7-compat postcss@^7 autoprefixer@^9

自定义 Tailwind 安装：
使用 Tailwind CLI 工具生成一份配置文件，这个命令行工具已包含在了 tailwindcss 这个 npm 包里了

- npx tailwindcss init

执行成功后会生成 tailwind.config.js，初始化配置

```
const colors = require('tailwindcss/colors')

module.exports = {
  // 确保配置清除 (purge) 选项以删除任何未使用类，这样生成的文件尺寸最小
  purge: [
    ...process.env.NODE_ENV === 'production'
    // 只在production环境使用，节省dev环境时间
    ?
    ['./src/**/*.html', './src/**/*.tsx', './src/**/*.js'] :
    []
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      gray: colors.coolGray,
      blue: colors.sky,
      red: colors.rose,
      pink: colors.fuchsia,
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
```

postcss.config.js 引入

```
module.exports = {
  plugins: [
    require('autoprefixer'),
    require('tailwindcss')
  ]
};
```

index.css 入口样式引入

```
@tailwind base;
@tailwind components;
@tailwind utilities;
```
