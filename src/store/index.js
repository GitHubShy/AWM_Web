import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //Whether login by a staff
    isStaff: true,
    token:''
  },
  mutations: {
    isStaff(state,value) {
      state.isStaff = value
    },
    setToken(state,tokenValue) {
      state.token = tokenValue
    }
  },
  actions: {
  },
  modules: {
  },
  getters:{
    islogin(state) {
      return state.token != ''
    }
  }
})
