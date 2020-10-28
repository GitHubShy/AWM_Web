import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//vx-table
import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'

//Internationalization
import VueI18n from 'vue-i18n'
import zhCN from 'vxe-table/lib/locale/lang/zh-CN'
import enUS from 'vxe-table/lib/locale/lang/en-US'

//Global
import global_ from './Global'
Vue.prototype.GLOBAL = global_

Vue.use(VueI18n)

const messages = {
  zh_CN: {
    ...zhCN
  },
  en_US: {
    ...enUS
  }
}

const i18n = new VueI18n({
  locale: 'en_US',
  messages,
})

Vue.use(VXETable, {
  //Internationalization
  i18n: (key, args) => i18n.t(key, args)
})

import "@s/public.css";
import "@s/awm-font.css"

import ElementUI from 'element-ui';
Vue.use(ElementUI);
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
