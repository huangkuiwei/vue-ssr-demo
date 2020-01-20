import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

// 创建 createStore 工厂函数
const createStore = () => {
  return new Vuex.Store({
    state: {
      musicList: []
    },
    mutations: {
      // 设置音乐排行版
      setMusicList (state, payload) {
        state.musicList = payload
      }
    },
    actions: {
      // 获取音乐排行版
      getMusicList ({ commit }, payload) {
        return Axios.get('https://api.apiopen.top/musicRankingsDetails', {
          params: {
            type: 1
          }
        }).then(data => {
          commit('setMusicList', data.data.result)
        })
      }
    },
    modules: {}
  })
}

export default createStore
