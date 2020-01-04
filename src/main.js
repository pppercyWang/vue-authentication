import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {staticRoutes} from './router'
import store from './store'
import './plugins/element.js'
import http from './utils/http.js';
import api from './services/api'
import _ from 'lodash'
import VueRouter from 'vue-router'
Vue.prototype.$api = api;
Vue.prototype.$http = new http(router);
Vue.prototype._ = _
Vue.config.productionTip = false


const createRouter = () => new VueRouter({
  routes: staticRoutes
})
router.beforeEach((to, from, next) => {
  if (to.path === '/404') {
    next()
    return;
  }
  checkGround(to, from, next);
})
window.onbeforeunload  = function () {
  if (sessionStorage.getItem('user')) {
    sessionStorage.setItem('isAuthentication', '0')
  }
}
function checkGround(to, from, next) {
  if (to.path === '/login' || to.path === '/admin/login') {
    sessionStorage.clear();
    //1. 重新获取动态路由，如果不reload只是跳转的话。再执行一次addRoutes，之前账户的有权限的路由，该用户依旧可以访问 2. 路由首位
    // window.href.onload();
    router.matcher = createRouter().matcher
    next()
    return
  }
  let token
  if (to.path.split("/")[1] === 'admin') {
    token = sessionStorage.getItem('adminToken');
    if (!token && to.path !== '/admin/login') {
      next({
        path: '/admin/login'
      })
    } else {
      const isAuth = sessionStorage.getItem('isAuthentication')
      if (!isAuth || isAuth === '0') {
        store.dispatch('generateRoutes', JSON.parse(sessionStorage.getItem('user')).role).then(res => {
          router.addRoutes(store.getters.validRoutes)
          sessionStorage.setItem('isAuthentication', '1')
        })
      }
      next();
    }
  } else {
    token = sessionStorage.getItem('token');
    if (!token && to.path !== '/login') {
      next({
        path: '/login'
      })
    } else {
      next()
    }
  }
}


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')