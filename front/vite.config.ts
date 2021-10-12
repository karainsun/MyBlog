import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// 如果编辑器提示 path 模块找不到，则可以安装一下 @types/node -> npm i @types/node -D
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue()
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src') // 设置 `@` 指向 `src` 目录
    },
    // 忽略后缀名的配置选项, 添加 .vue 选项时要记得原本默认忽略的选项也要手动写入
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
  },
  css: {
    // css预处理器
    preprocessorOptions: {
      less: {
        additionalData: '@import "./src/assets/css/variable.less";',
      },
    },
  },
  base: './', // 设置打包路径
  server: {
    port: 3005, // 设置服务启动端口号
    open: true, // 设置服务启动时是否自动打开浏览器
    cors: true, // 允许跨域

    // 设置代理，根据我们项目实际情况配置
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace('/api/', '/')
      }
    }
  }
})
