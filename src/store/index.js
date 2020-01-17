import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 创建 createStore 工厂函数
const createStore = () => {
  return new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {}
  })
}

export default createStore
