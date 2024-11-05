import { createApp } from 'vue'
import { createPinia } from 'pinia'
// import '@/assets/main.css'
import '@/styles/global.less'
import ArcoVueIcon from '@arco-design/web-vue/es/icon'
import '@arco-design/web-vue/es/message/style/css'

import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(createPinia())
app.use(ArcoVueIcon)
app.use(router)

app.mount('#app')
