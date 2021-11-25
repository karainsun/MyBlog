# 前言

> 先简单介绍下旧版博客er吧，初版站点使用了前端渐进式框架Vue，后台UI为ElementUI，以vue-cli为基础搭建，后台服务使用Node框架Express以及非关新型数据库MongoDB，初版已经相当不错了，但就是有点儿拿不出手。作为WEB前端的拥趸之一，怎么不去拥抱的全面些呢，我要做全栈（破锣嗓子）！于是新版站点把压箱底儿的手艺全拿出来了，什么Vue3、Vite2、React Hooks、Ant Design、Webpack5、Webpack5、koa2、MySql、Sequelize、Typescript等等，东北大乱炖了属于是。


项目[前台](https://www.kayrain.cn) 
[后台](https://www.kayrain.cn/admin)
## 一、项目结构及简述

### 1、admin：博客后台管理

    用户注册时会根据邀请码的有无进行简单的二级权限控制，没有邀请码的用户只提供查询的权限，而填写了邀请码的用户会提供所有该有的权限之后的功能就不多赘述了，不过就是一系列针对博客模块的CRUD操作了。

### 2、front：博客前台

     前台主要有主页（文章列表）、归档（根据年月分组）、分类、标签、收藏（干货网站）、关于、留言这几个模块组成。

### 3、server：服务端

    前后台API使用白名单做了一个区分，名单里的API是不需要验证权限就可以访问的。


## 二、框架、工具库以及插件介绍

### 1、Admin 

    [Webpack5](https://webpack.docschina.org/)：一个模块打包器。它的主要目标是将 JavaScript 文件打包在一起,打包后的文件用于在浏览器中使用,但它也能够胜任转换(transform)、打包(bundle)或包裹(package)任何..   总之就是很棒了。

    [React](https://react.docschina.org/)：Admin前端框架选用React，并且全面拥抱Hooks。

    [Ant Design](https://ant.design/index-cn)：UI框架采用Ant Design（链接），个人认为Ant的UI界面风格总体来说比圆润一些，组件api也很丰富。


    [Typescript](https://www.tslang.cn/)：使用Typescript静态类型检查，不得不说，ts确实很强大，开发类型化，有效避免了很多因语言本身的灵活所导致的 Bug 的出现。


    [Tailwindcss](https://www.tailwindcss.cn/)：这个很早之前就想用它了，它不仅是一个 utility class 的集合。它实际上定义了一个通过以 token list 语法（HTML class）承载的 DSL，用来书写等价于 CSS/Sass/Less 的样式声明等等，不过有些个性化的样式还是要手写的。


    [Redux](https://redux.js.org/)：React的数据管理库，其实小项目用Redux有点儿重，之后不妨试试Mobx，更轻量一些。


    [Wangeditor-for-react](https://www.wangeditor.com/doc/pages/09-%E7%94%A8%E4%BA%8EVue%E5%92%8CReact/)：Wangeditor针对React的编辑器，轻量级 web 富文本编辑器，配置方便，使用简单。

### 2、Front

    [Vite2](https://vitejs.cn/)：使用Vite来构建博客前台，一来尝尝鲜，二来嘛尝尝鲜，不得不说，下手之后构建速度挠儿一下就上来了。


    [Vue3](https://v3.vuejs.org/)：性能的提升，Composition API，更好的Typescript支持，Teleport(瞬移组件)、Suspense(解决异步加载组件问题)和全局 API 的修改和优化，Vue3兼容大部分Vue2的特性。


    [Less](http://lesscss.cn/)：CSS预编译，Admin项目中也用了。为什么用Less呢，“因为 Less 和 CSS 非常像，因此很容易学习。而且 Less 仅对 CSS 语言增加了少许方便的扩展，这就是 Less 如此易学的原因之一”

——官网如是说。

    [Mitt](https://www.npmjs.com/package/mitt)：一个事件总线三方库，相当于2.x中的EventBus，非常管用。


    [Wangeditor](https://www.wangeditor.com/)：还是那个编辑器。


    UI：UI没用框架。


### 3、Server

    [Node.js](https://nodejs.org/zh-cn/)： 是一个基于 Chrome V8 引擎的 JavaScript 运行时。


    [Koa2](https://koa.bootcss.com/)：基于Node.js平台的web开发框架，为什么使用koa呢，大概因为我喜欢吃洋葱。。。


    [Mysql](https://www.mysql.com/)：MySQL 是最流行的关系型数据库管理系统，MongoDB也还行其实，主要是想试试关系型的。


    [Sequelize](https://www.sequelize.com.cn/)：Sequelize 是一个基于 promise 的 Node.js ORM，ORM即对象关系映射（Object-Relationl Mapping）前支持 Postgres, MySQL, MariaDB, SQLite 以及 Microsoft SQL Server. 它具有强大的事务支持, 关联关系, 预读和延迟加载,读取复制等功能。


    [Lodash](https://www.lodashjs.com/)：一个一致性、模块化、高性能的 JavaScript 实用工具库。


    [Qniu](https://www.qiniu.com/)：七牛云储存kodo，图片、视频等资源如果存在自己服务器 访问会很吃带宽，云储存也有很多选择的，类似的比如阿里的OSS。


    [Nodemailer](https://nodemailer.com/about/)：是一个简单易用的Node.js邮件发送组件。


    [Bcryptjs](https://www.npmjs.com/package/bcryptjs)：bcryptjs是nodejs中比较好的一款加盐(salt)加密的包。


    [Jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)：JWT，即JSON Web Token，当用户使用它的认证信息登陆系统之后，会返回给用户一个JWT，用户只需要本地保存即可。


## 三、部署上线

    云主机选择的是Ubuntu的，解析完了域名之后，使用VScode的远程资源管理工具配置好Nginx。由于项目是分三个子项目开发的，前后台要分别打包，然后统一上传。还有使用了 PM2，PM2（Process Manager 2 ）是具有内置负载均衡器的Node.js应用程序的生产运行时和进程管理器。它允许您永久保持应用程序活跃，无需停机即可重新加载它们，并促进常见的Devops任务。


## 四、小结

    做个站的缘由就是对自己的技术自测复盘一下，这也是写博客的初衷，总之无论项目大小，需求繁简，都需要不断地总结复盘，巩固，历久弥新。
    
