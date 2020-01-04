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
    name: '管理员登录',
    component: () => import('@/views/AdminLogin.vue'),
  },
  {
    path: '/404',
    component: () => import('@/views/404.vue'),
  },
  {
    path: '/',
    name: 'layout',
    redirect: {
      path: '/login'
    },
    component: () => import('@/views/layout/Layout.vue'),
    children: [{
      path: 'home',
      name: '首页',
      component: () => import('@/views/foreground/Home.vue'),
    }]
  },
  {
    path: '/admin',
    name: 'adminLayout',
    redirect: {
      path: '/admin/login'
    },
    component: () => import('@/views/layout/AdminLayout.vue'),
  },
]


export default new VueRouter({
  routes: staticRoutes
})

export const dynamicRoutes = [{
    path: '/admin',
    name: 'adminLayout',
    component: () => import('@/views/layout/AdminLayout.vue'),
    children: [{
        path: 'user/index',
        name: '用户管理',
        meta: {
          role: ['admin', 'super_admin']
        },
        component: () => import('@/views/background/UserManagement.vue'),
      },
      {
        path: 'order/index',
        name: '订单管理',
        meta: {
          role: ['admin', 'super_admin']
        },
        component: () => import('@/views/background/OrderManagement.vue'),
      },
      {
        path: 'bill/index',
        name: '账单管理',
        meta: {
          role: ['super_admin']
        },
        component: () => import('@/views/background/BillManagement.vue'),
      }
    ]
  },
  {
    path: '/*',
    redirect: {
      path: '/404'
    },
  }
]

