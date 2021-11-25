import { createSSRApp } from "vue";
import { createRouter } from "@/router/index";
import { createStore, key } from "@/store/index";
import { RouteRecordNormalized } from "vue-router";
import App from "./App.vue";
import '@/assets/css/global.less'
import '@/utils/ribbonDynamic'
import '@/assets/font/font-icon/iconfont.css'
// 引入 VueMarkdownEditor
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';
import LoginModal from '@/components/LoginModal.vue'
import { allSettledTest } from '@/utils'

allSettledTest()

export function createApp() {
  const app = createSSRApp(App);
  const router = createRouter();
  const { store } = createStore();

  router.beforeResolve(async (to, from) => {
    let toMatchedComponents = getMatchedComponents(to.matched);
    let fromMatchedComponents = getMatchedComponents(from.matched);
    // 优化过滤
    let isSameCompoent = false;
    let components = toMatchedComponents.filter((compnent, index) => {
      return (
        isSameCompoent ||
        (isSameCompoent = fromMatchedComponents[index] !== compnent)
      );
    });

    // 需要执行async的组件
    components.length &&
      (await Promise.allSettled(
        components.map((component) => {
          // @ts-ignore
          if (component.asyncData) {
            // @ts-ignore
            return component.asyncData({ store, route: to });
          }
        })
      ));
  });

  VMdPreview.use(githubTheme);
  app.component('login-modal',LoginModal)
  app.use(VMdPreview)
  app.use(store, key);
  // app.use(store);
  app.use(router);
  return { app, router, store };
}

function getMatchedComponents(list: RouteRecordNormalized[]) {
  return list.map(({ components }) => {
    return components.default;
  });
}
