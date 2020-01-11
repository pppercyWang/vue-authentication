import _ from 'lodash'
export const dynamicRoutes = {
    // 前台路由
    'user': [{
        path: '/',
        component: () => import('@/views/layout/Layout.vue'),
        name: '首页',
        redirect: '/home',
        children: [{
            path: 'home',
            component: () => import('@/views/foreground/Home.vue'),
        }]
    }, ],
    // 中台路由
    'agent': [{
            path: '/agent/member',
            component: () => import('@/views/layout/AgentLayout.vue'),
            name: '会员管理',
            redirect: '/agent/member/index',
            icon: 'el-icon-star-on',
            children: [{
                    path: 'index',
                    component: () => import('@/views/midground/member/Index.vue'),
                    name: '会员列表',
                    meta: {
                        roles: ['super_agent', 'second_agent']
                    },
                },
                {
                    path: 'scheme',
                    component: () => import('@/views/midground/member/Scheme.vue'),
                    name: '优惠方案',
                    meta: {
                        roles: ['super_agent']
                    },
                },
            ]
        },
        {
            path: '/agent/order',
            component: () => import('@/views/layout/AgentLayout.vue'),
            name: '订单管理',
            icon: 'el-icon-s-claim',
            redirect: '/agent/order/index',
            children: [{
                path: 'index',
                component: () => import('@/views/midground/order/Index.vue'),
                name: '订单列表',
                meta: {
                    roles: ['super_agent', 'second_agent']
                },
            }, ]
        },
        {
            path: '/agent/charge',
            component: () => import('@/views/layout/AgentLayout.vue'),
            name: '充值管理',
            icon: 'el-icon-s-finance',

            redirect: '/agent/charge/index',
            children: [{
                path: 'index',
                component: () => import('@/views/midground/charge/Index.vue'),
                name: '充值中心',
                meta: {
                    roles: ['super_agent', 'second_agent']
                },
            }, ]
        },
        {
            path: '/agent/points',
            component: () => import('@/views/layout/AgentLayout.vue'),
            name: '积分管理',
            icon: 'el-icon-s-marketing',

            redirect: '/agent/points/index',
            children: [{
                path: 'index',
                component: () => import('@/views/midground/points/Index.vue'),
                name: '积分等级',
                meta: {
                    roles: ['super_agent']
                },
            }, ]
        },
    ],
    // 后台路由
    'admin': [{
            path: '/admin/user',
            component: () => import('@/views/layout/AdminLayout.vue'),
            name: '用户管理',
            redirect: '/admin/user/index',
            icon: 'el-icon-user-solid',
            children: [{
                    path: 'index',
                    component: () => import('@/views/background/user/Index.vue'),
                    name: '用户列表',
                    meta: {
                        roles: ['super_admin', 'admin']
                    },
                },
                {
                    path: 'detail',
                    component: () => import('@/views/background/user/UserDetail.vue'),
                    name: '用户详情',
                    meta: {
                        roles: ['super_admin']
                    },
                },
            ]
        },
        {
            path: '/admin/ip',
            component: () => import('@/views/layout/AdminLayout.vue'),
            name: 'IP管理',
            redirect: '/admin/ip/index',
            icon: 'el-icon-s-promotion',
            children: [{
                path: 'index',
                component: () => import('@/views/background/ip/Index.vue'),
                name: 'IP列表',
                meta: {
                    roles: ['super_admin', 'admin', 'ip_admin']
                },
            }, ]
        },
        {
            path: '/admin/bill',
            component: () => import('@/views/layout/AdminLayout.vue'),
            name: '财务管理',
            redirect: '/admin/bill/index',
            icon: 'el-icon-s-order',
            children: [{
                path: 'index',
                component: () => import('@/views/background/bill/Index.vue'),
                name: '账单列表',
                meta: {
                    roles: ['admin', 'super_admin']
                },
            }, ]
        },
        {
            path: '/admin/auth',
            component: () => import('@/views/layout/AdminLayout.vue'),
            name: '权限管理',
            redirect: '/admin/auth/index',
            icon: 'el-icon-s-platform',
            children: [{
                    path: 'index',
                    component: () => import('@/views/background/auth/Index.vue'),
                    name: '角色列表',
                    meta: {
                        roles: ['super_admin']
                    },
                },
                {
                    path: 'menu',
                    component: () => import('@/views/background/auth/Menu.vue'),
                    name: '菜单管理',
                    meta: {
                        roles: ['super_admin']
                    },
                },
            ]
        },
    ],
    '404': {
        path: "*",
        component: () => import('@/views/404.vue'),
    }
}
export function generateRoutes(target, role, commit) {
    let targetRoutes = _.cloneDeep(dynamicRoutes[target]);
    targetRoutes.forEach(route => {
        if (route.children && route.children.length !== 0) {
            route.children = route.children.filter(each => {
                if (!each.meta || !each.meta.roles) {
                    return true
                }
                return each.meta.roles.includes(role) === true
            })
        }
    });
    switch (target) {
        case 'admin':
            commit('SET_BACKGROUD_MENU_DATA', targetRoutes.filter(route => route.children && route.children.length !== 0)) // 菜单数据是不需要404的
            break
        case 'agent':
            commit('SET_MIDGROUD_MENU_DATA', targetRoutes.filter(route => route.children && route.children.length !== 0))
            break
    }
    return new Array(...targetRoutes, dynamicRoutes['404'])
}


export function authentication(to, from, next, store, router) {
    let token;
    switch (to.path.split("/")[1]) {
        case 'agent':
            token = sessionStorage.getItem('agentToken');
            if (!token && to.path !== '/agent/login') {
                next({
                    path: '/agent/login'
                })
                return
            }
            break;
        case 'admin':
            token = sessionStorage.getItem('adminToken');
            if (!token && to.path !== '/admin/login') {
                next({
                    path: '/admin/login'
                })
                return
            }
            break;
        default:
            token = sessionStorage.getItem('token');
            if (!token && to.path !== '/login') {
                next({
                    path: '/login'
                })
                return
            }
            break;
    }
    const isAuth = sessionStorage.getItem('isAuthentication')
    if (!isAuth || isAuth === '0') {
        store.dispatch('getValidRoutes', JSON.parse(sessionStorage.getItem('user')).role).then(validRoutes => {
            router.addRoutes(validRoutes)
            sessionStorage.setItem('isAuthentication', '1')
        })
    }
    next();
}