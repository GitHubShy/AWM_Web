/**
 * This is vuex used for saving customer info
 *
 * @author Yao Shi
 * @version 1.0
 * @date 2020/09/30 12:50 pm
 */
import { getCustomer } from "@n/Customer"
let uus = process.browser ? localStorage.uus || '' : '';

export default {
  namespaced: true,
  state: {
    token: '',
    type: '',
    user: uus,
  },
  mutations: {
    loginSuccessHandle(state, payload) {
      let {token} = payload;

      localStorage.token = token;
      state.token = token
    },
    logoutHandle(state) {
      state.user = '';
      localStorage.uus = '';

      state.token = '';
      localStorage.token = '';
    },
    typeSave(state, payload) {
      state.type = '';
      localStorage.type = '';
    },
    userSave(state, payload) {
      let user = payload.user || '';
      state.user = user;
      let { ...all } = user;
      let obj = {};
      ['account_name', 'company_name', 'email', 'first_name', 'id', 'password', 'phone', 'portrait_url', 'surname'].forEach(key => {
        obj[key] = all[key] == null ? '' : all[key]
      })
      console.log(obj,'==================');
      let str = JSON.stringify(obj);
      if (localStorage.uus !== str) {
        localStorage.uus = str
      }
    },
  },
  actions: {
    async getUserInfo({ commit, state, dispatch}) {
      console.log(state.token)
      if (!state.token) {
        return
      }
      let res = await getCustomer(state.user.id);

      let { code, data } = res.data;
      data = res.data || {};

      if (code === '200') {
        commit('userSave', {
          user: data
        })
      }
      return res
    },
  }
}