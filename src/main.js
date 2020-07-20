import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css
import { SunClient } from '@/client/sun_client'

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
// import '@/permission' // permission control

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */
import { mockXHR } from '../mock'
if (process.env.NODE_ENV === 'production') {
  mockXHR()
}

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)

Vue.config.productionTip = false

const wsUrl = 'ws://localhost:8888/websocket/?request=e2lkOjE7cmlkOjI2O3Rva2VuOiI0MzYwNjgxMWM3MzA1Y2NjNmFiYjJiZTExNjU3OWJmZCJ9'
const sunClient = new SunClient(wsUrl, 10 * 1000)

async function dispatchClient() {
  await store.dispatch('client/setSunClient', sunClient)
}

async function connectAsync() {
  const connectState = await sunClient.connect(() => {
    console.log('connect server success!!!')
  })
  await store.dispatch('client/setSunClient', sunClient)
  new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
    sunClient
  })
  return connectState
}

connectAsync().then(data => {
  console.log('async connect done. state:' + data)
}).catch(error => {
  console.log('async connect error:' + error)
})
