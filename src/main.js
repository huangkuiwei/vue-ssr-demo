import Vue from 'vue'
import createRouter from './router'
import createStore from './store'
import { sync } from 'vuex-router-sync'
import App from './App'

// 创建 createApp 工厂函数
const createApp = context => {
  const router = createRouter()
  const store = createStore()
  sync(store, router)
  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })
  return {
    app,
    store,
    router
  }
}

export default createApp
