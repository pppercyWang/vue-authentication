import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {
  createRouter
} from './router'
import {
  authentication
} from './permission'
import './plugins/element.js'
import store from './store'
import http from './utils/http.js';
import api from './services/api'
import _ from 'lodash'
Vue.prototype.$api = api;
Vue.prototype.$http = new http(router);
Vue.prototype._ = _
router.beforeEach((to, from, next) => {
  if (to.path === '/login' || to.path === '/agent/login' || to.path === '/admin/login') {
    sessionStorage.clear();
    router.matcher = createRouter().matcher // 初始化routes,移除所有dynamicRoutes
    next()
    return
  }
  authentication(to, from, next, store, router);
})
window.onbeforeunload = function () {
  if (sessionStorage.getItem('user')) {
    sessionStorage.setItem('isAuthentication', '0') // 在某个系统登录后，页面刷新，需重新生成路由
  }
}
// router.beforeEach一定要放在vue实例创建之前，刷新时的当前路径不会进beforeEach
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')