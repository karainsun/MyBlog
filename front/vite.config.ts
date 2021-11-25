import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// 如果编辑器提示 path 模块找不到，则可以安装一下 @types/node -> npm i @types/node -D
import { resolve } from 'path'
// import htmlPlugin from 'vite-plugin-html'

export default defineConfig({
  plugins: [
    vue(),
    // htmlPlugin({
    //   inject: {
    //     data: {
    //       title: 'KBlog',
    //       injectScript: '<script type="module" src="/src/entry-client.ts"></script>'
    //     }
    //   },
    //   minify: true
    // })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src') // 设置 `@` 指向 `src` 目录
    },
    // 忽略后缀名的配置选项, 添加 .vue 选项时要记得原本默认忽略的选项也要手动写入
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
  },
  css: {
    // css模块化
    modules: {
      // css模块化 文件以.module.[css|less|scss]结尾
      generateScopedName: '[name]__[local]___[hash:base64:5]',
      hashPrefix: 'prefix'
    },
    // css预处理器
    preprocessorOptions: {
      less: {
        additionalData: '@import "./src/assets/css/variable.less";',
        // 支持内联 JavaScript
        javascriptEnabled: true
      }
    }
  },
  base: '/', // 开发或生产环境服务的公共基础路径
  server: {
    // host: '0.0.0.0',
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
  },
  build: {
    // assetsDir: '',
    terserOptions: {
      compress: {
        // 生产环境移除 console
        drop_console: true
      }
    },
    // lib: {
    //   entry: path.resolve(__dirname, 'main.ts'),
    //   name: 'MyLib',
    //   fileName: (format) => `my-lib.${format}.js`
    // },
    // rollupOptions: {
    //   // 确保外部化处理那些你不想打包进库的依赖
    //   external: ['vue'],
    //   output: {
    //     // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
    //     globals: {
    //       vue: 'Vue'
    //     }
    //   }
    // }
  }
})
