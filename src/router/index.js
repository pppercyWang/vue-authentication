import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
export const staticRoutes = [{
    path: '/login',
    name: '用户登录',
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/admin/login',
    name: '总后台登录',
    component: () => import('@/views/AdminLogin.vue'),
  },
  {
    path: '/404',
    component: () => import('@/views/404.vue'),
  },
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    component: () => import('@/views/foreground/Home.vue'),
  },
  {
    path: '/admin',
    redirect: '/admin/user/index',
  },
  {
    path: '/agent',
    redirect: '/agent/user/index',
  },
]
export const createRouter = () => new VueRouter({
  routes: staticRoutes
})

export default new VueRouter({
  routes: staticRoutes
})