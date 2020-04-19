import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios';
import { BootstrapVue, IconsPlugin }  from 'bootstrap-vue'
import store from './store/store'
Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

axios.defaults.baseURL = 'https://corona.lmao.ninja/v2/'

Vue.filter('number',(value)=>{
  return value.toLocaleString();
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
