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