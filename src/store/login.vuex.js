export default {
  namespaced: true,
  state: {
    token: '',
  },
  mutations: {
    loginSuccessHandle(state, payload) {
      let {token} = payload;

      localStorage.token = token;
      state.token = token
    },
    logoutHandle(state) {
      state.token = ''
      localStorage.token = ''
    },
  },
  actions: {
  }
}