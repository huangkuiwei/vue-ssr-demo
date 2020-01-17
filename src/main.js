import Vue from 'vue'
import router from './router'
import store from './store'
import App from './App'

// 创建 createApp 工厂函数
const createApp = context => {
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
