import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import http from './utils/http.js';
import api from './services/api'
Vue.prototype.$api = api;
Vue.prototype.$http = new http(router);
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
