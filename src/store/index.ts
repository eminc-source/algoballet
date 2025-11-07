import Vue from 'vue'
import Vuex from 'vuex'
import walletModule from './modules/wallet'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    wallet: walletModule
  }
})
