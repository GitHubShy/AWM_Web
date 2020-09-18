import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //Whether login by a staff
    isStaff: true
  },
  mutations: {
    isStaff(state,value) {
      state.isStaff = value
    }
  },
  actions: {
  },
  modules: {
  }
})
