import Vue from 'vue'
import VueRouter from 'vue-router'
import createRoutes from './routes'

Vue.use(VueRouter)

// 创建 createRouter 工厂函数
const createRouter = () => {
  const routes = createRoutes()
  return new VueRouter({
    mode: 'history',
    routes
  })
}

export default createRouter
