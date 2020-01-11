import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const staticRoutes = [{
    path: '/login',
    name: '用户登录',
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/agent/login',
    name: '中台登录',
    component: () => import('@/views/AgentLogin.vue'),
  },
  {
    path: '/admin/login',
    name: '后台登录',
    component: () => import('@/views/AdminLogin.vue'),
  },
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/agent',
    redirect: '/agent/login',
  },
  {
    path: '/admin',
    redirect: '/admin/login',
  },
]
export const createRouter = () => new VueRouter({
  routes: staticRoutes
})

export default new VueRouter({
  routes: staticRoutes
})