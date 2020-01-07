const test = [
    // {
    //     path: '/admin/user',
    //     component: () => import('@/views/layout/AdminLayout.vue'),
    //     name: '用户管理',
    //     redirect: '/admin/user/index',
    //     children: [{
    //             path: 'index',
    //             component: () => import('@/views/background/user/Index.vue'),
    //             name: '用户列表',
    //             meta: {
    //                 roles: ['super_admin', 'admin']
    //             },
    //         },
    //         {
    //             path: 'detail',
    //             component: () => import('@/views/layout/AdminLayout.vue'),
    //             name: '用户详情',
    //             children:[
    //                 {
    //                     path: 'good',
    //                     component: () => import('@/views/background/user/detail/Goods.vue'),
    //                     name: '商品详情',
    //                     meta: {
    //                         roles: ['super_admin', 'admin']
    //                     },
    //                 },
    //                 {
    //                     path: 'history',
    //                     component: () => import('@/views/background/user/detail/Goods.vue'),
    //                     name: '订单历史',
    //                     meta: {
    //                         roles: ['super_admin', 'admin']
    //                     },
    //                 },
    //               ]
    //         },
    //     ]
    // },
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

]


function test2(route, role) {
    if (!route.children) {
        return []
    }else{
        route.children =  test2(route.children.filter(each => each.meta.roles.includes(role) === true))
    }
    console.log(route.children)
}

function routesRecursion(routes, role) {
    routes.forEach(route => {
        route.children = test2(route, role)
    });
    return routes
}
routesRecursion(test, 'super_admin')