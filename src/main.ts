import '@/utils/initEnterData'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import mitt from 'mitt'
import App from './App.vue'
import router from './router'
import Tooltip from './directives/tooltip'
import { i18n } from '@/locale'
import '@/utils/flexible'

import 'normalize.css/normalize.css'

import './assets/fonts/index.scss'

import './guard'

// 引入event-bus方法

import LazyImage from '@/components/lazyImage/index.vue'

// 引入全局样式
import '@/theme/index.scss'

import 'default-passive-events'

// 引入你需要的组件
import 'element-plus/dist/index.css'

const pinia = createPinia()

const app = createApp(App)
// 注册全局 event mitt方法
app.config.globalProperties.mittBus = mitt()

app.directive('tooltip', Tooltip)

app.component('LazyImage', LazyImage)

app.use(pinia).use(router).use(ElementPlus).use(i18n).mount('#app')
