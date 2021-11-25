import { createApp } from "./main";
// import { getAsyncData } from "../src/utils/publics";

const { app, router, store } = createApp();

router.isReady().then(() => {
  app.mount("#app");
});
// 开启路由后置钩子，进行页面数据请求
// router.afterEach(() => {
//   getAsyncData(router, store as any, false);
// });
