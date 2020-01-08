import _ from 'lodash'
export const dynamicRoutes = {
    'agent': [{
            path: '/agent/user',
            component: () => import('@/views/layout/AgentLayout.vue'),
            name: '用户管理',
            redirect: '/agent/user/index',
            children: [{
                    path: 'index',
                    component: () => import('@/views/midground/user/Index.vue'),
                    name: '用户列表',
                    meta: {
                        roles: ['super_agent', 'agent']
                    },
                },
                {
                    path: 'detail',
                    component: () => import('@/views/midground/user/UserDetail.vue'),
                    name: '用户详情',
                    meta: {
                        roles: ['super_agent']
                    },
                },
            ]
        },
        {
            path: '/agent/log',
            component: () => import('@/views/layout/AgentLayout.vue'),
            name: '日志管理',
            redirect: '/agent/log/index',
            children: [{
                path: 'index',
                component: () => import('@/views/midground/log/Index.vue'),
                name: '日志列表',
                meta: {
                    roles: ['super_agent', 'agent']
                },
            }, ]
        },
        {
            path: '/agent/bill',
            component: () => import('@/views/layout/AgentLayout.vue'),
            name: '账单管理',
            redirect: '/agent/bill/index',
            children: [{
                path: 'index',
                component: () => import('@/views/midground/bill/Index.vue'),
                name: '账单列表',
                meta: {
                    roles: ['super_agent']
                },
            }, ]
        },
    ],
    'admin': [{
            path: '/admin/user',
            component: () => import('@/views/layout/AdminLayout.vue'),
            name: '用户管理',
            redirect: '/admin/user/index',
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
            path: '/admin/log',
            component: () => import('@/views/layout/AdminLayout.vue'),
            name: '日志管理',
            redirect: '/admin/log/index',
            children: [{
                path: 'index',
                component: () => import('@/views/background/log/Index.vue'),
                name: '日志列表',
                meta: {
                    roles: ['super_admin', 'admin']
                },
            }, ]
        },
        {
            path: '/admin/bill',
            component: () => import('@/views/layout/AdminLayout.vue'),
            name: '账单管理',
            redirect: '/admin/bill/index',
            children: [{
                path: 'index',
                component: () => import('@/views/background/bill/Index.vue'),
                name: '账单列表',
                meta: {
                    roles: ['super_admin']
                },
            }, ]
        },
    ],
    '404': {
        path: '/*',
        redirect: {
            path: '/404'
        },
    },
}

export function getValidRoutes(target, role, commit) {
    dynamicRoutes[target].forEach(route => {
        if (route.children) {
            route.children = route.children.filter(each => each.meta.roles.includes(role) === true)
        }
    });
    commit('SET_BACKGROUD_MENU_DATA', dynamicRoutes[target])
    return new Array(...dynamicRoutes[target], dynamicRoutes['404'])
}

export function authentication(to, from, next, store, router) {
    let token;
    console.log(to.path.split("/")[1])
    switch (to.path.split("/")[1]) {
        case 'admin':
            token = sessionStorage.getItem('adminToken');
            if (!token && to.path !== '/admin/login') {
                next({
                    path: '/admin/login'
                })
            } else {
                const isAuth = sessionStorage.getItem('isAuthentication')
                if (!isAuth || isAuth === '0') {
                    store.dispatch('generateRoutes', JSON.parse(sessionStorage.getItem('user')).role).then(validRoutes => {
                        router.addRoutes(validRoutes)
                        sessionStorage.setItem('isAuthentication', '1')
                    })
                }
                next();
            }
            break;
        case 'agent':
            token = sessionStorage.getItem('agentToken');
            if (!token && to.path !== '/agent/login') {
                next({
                    path: '/agent/login'
                })
            } else {
                const isAuth = sessionStorage.getItem('isAuthentication')
                if (!isAuth || isAuth === '0') {
                    store.dispatch('generateRoutes', JSON.parse(sessionStorage.getItem('user')).role).then(validRoutes => {
                        router.addRoutes(validRoutes)
                        sessionStorage.setItem('isAuthentication', '1')
                    })
                }
                next();
            }
            break;
        default:
            token = sessionStorage.getItem('token');
            if (!token && to.path !== '/login') {
                next({
                    path: '/login'
                })
            } else {
                next()
            }
            break;
    }
}