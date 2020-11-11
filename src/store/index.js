/**
 * This is vuex used for saving common states, such as login user info
 *
 * @author Yao Shi
 * @version 1.0
 * @date 2020/09/30 12:33 pm
 */
import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'

Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    //Whether login by a staff
    isStaff: true,
    //token
    token:'',
    //staff info
    staffInfo: {
      id: null,
      first_name: null,
      surname: null,
      title: null,
      email: null,
      phone: null,
      payment_rate: null,
      birth_year: null,
      tax_file_number: null,
      portrait_url: ''
    },
  },
  mutations: {
    isStaff(state,value) {
      state.isStaff = value
    },
    setToken(state,tokenValue) {
      state.token = tokenValue
    },
    setStaffInfo(state,staffInfo){
      state.token = staffInfo
    }
  },
  actions: {
  },
  getters:{
    islogin(state) {
      return state.token != ''
    }
  },
  modules,
})
