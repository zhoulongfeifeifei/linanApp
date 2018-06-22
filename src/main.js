// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
// import axios from 'axios'
import { Toast, MessageBox, Indicator, Cell, Button, Loadmore, Header, Field, Switch } from 'mint-ui'
import './assets/style/my-mint.scss'
import sdkFunc from './utils/sdkfunc'
Vue.config.productionTip = false

Vue.prototype.$indicator = Indicator
Vue.prototype.$toast = Toast

Vue.use(sdkFunc)
Vue.use({Toast, MessageBox})
Vue.component(Cell.name, Cell)
Vue.component(Loadmore.name, Loadmore)
Vue.component(Button.name, Button)
Vue.component(Header.name, Header)
Vue.component(Field.name, Field)
Vue.component(Switch.name, Switch)
let userAgent = navigator.userAgent
window.isAndroid = userAgent.indexOf('Android') > -1 || userAgent.indexOf('Adr') > -1 // android终端
window.isiOS = !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
