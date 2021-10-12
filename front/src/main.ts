import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import '@/assets/css/global.less'
import '@/utils/ribbonDynamic'
import '@/assets/font/font-icon/iconfont.css'
// 引入 VueMarkdownEditor
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';
import LoginModal from '@/components/LoginModal.vue'

VMdPreview.use(githubTheme);

const app = createApp(App)

app.component('login-modal',LoginModal)
app.use(router)
app.use(store)
app.use(VMdPreview)

app.mount('#app')
