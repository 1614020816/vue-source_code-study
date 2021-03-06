import Vue from 'vue'
// import Vuex from 'vuex'
import Vuex from './LVuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    counter: 0
  },
  mutations: {
    add (state) {
      return state.counter++
    }
  },
  actions: {
    add({commit}) {
      setTimeout(() => {
        commit('add')
      },500)
    }
  },
  getters: {
    doubleCounter(state) {
      return state.counter*2
    }
  },
  modules: {
  }
})
