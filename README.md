### 背景
>我司有很多需要进行权限管理的产品。其中有一个产品，需要给多个客户部署前中后台。在开发第一个版本时，代码全部分离。前端三套，后端三套。加上kafka，redis，算法，数据库等服务器，每有一个新的客户就需要部署一次，需要花费很长的时间且代码难以维护。
>
>后决定重构代码，产品分为前，中，后三个平台。前后端分别一套代码，支持权限管理，可拓展。前端使用路由前缀判断平台，登录时会返回不同的token和用户信息。不同的token只能访问对应平台的接口，根据用户角色生成可访问的菜单，进入不同的系统

### 前言
>权限模块对于一个项目来说是比较麻烦的部分，通常一个项目的权限管理，需要做的是下面三种级别的鉴权。
>1. 平台级别
>2. 页面级别（菜单）
>3. 控件级别（如按钮，表格展示字段等）
>
>本篇文章站在前端的角度，实现前两种级别的权限管理（控件级别可以通过条件渲染实现）。用vue从零搭建一个前中后台权限管理模板。供大家参考。
>
>演示地址：**http://auth.percywang.top**
>
>项目地址：**https://github.com/pppercyWang/vue-authentication**
>
>其实大部分项目都会分离前后台，因为整合在一套代码，确实对打包优化，代码分割需要做的更多。且项目架构上会复杂一些，安全性方面需要考虑的更全面。这里也提供了一个纯后台的权限管理模板。
>
>项目地址：**https://github.com/pppercyWang/vue-authentication2**


### 项目结构
>技术栈：vue vue-router vuex element
```javascript
assets  静态资源
plugins
	element-style.scss  element样式
    element.js   按需引入
router
	index.js 静态路由及createRouter方法
service
    api.js  前中后台接口管理
store  vuex
utils
	http.js axios封装
views
	foreground  前台页面
    midground   中台页面
	background  后台页面
    layout    前中后台布局文件
    404.vue   404页面
    Login.vue   前台登录
    AgentLogin.vue   中台登录
    AdminLogin.vue   后台登录
permission.js   动态路由 前中后台鉴权 菜单数据生成
main.js  应用入口
```


### 一. 路由初始化——staticRoutes
> 三个平台登录是三个不一样的页面。/开头的是前台的路由，/agent是中台，/admin是后台。这里的重定向也可以跳转到具体的页面，但这里因为权限角色不同的原因，不能写死，就直接重定向到登录页。

注意：404页需要放在路由的最后面，所以放在动态路由部分

**router/index.js**
```
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
```

### 二. 动态路由——dynamicRoutes
>本例只有中台和后台进行鉴权，一级栏目需要icon字段，用于菜单项图标。children为一级栏目的子栏目，meta中的roles数组代表可访问该route的角色。

**permission.js**
```
const dynamicRoutes = {
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
                        roles: ['super_agent', 'second_agent'] // 超级代理和二级都可访问
                    },
                },
                {
                    path: 'scheme',
                    component: () => import('@/views/midground/member/Scheme.vue'),
                    name: '优惠方案',
                    meta: {
                        roles: ['super_agent']  // 只有超级代理可访问
                    },
                },
            ]
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
    ],
    '404': {
        path: "*",
        component: () => import('@/views/404.vue'),
    }
}
```

### 三. 登录页
>通常在登录成功之后，后端会返回token跟用户信息，我们需要对token跟用户信息进行持久化，方便使用，这里我直接存在了sessionStorage。再根据用户角色的不同进入不同的路由

**views/adminLogin.vue**
```
try {
    const res = await this.$http.post(`${this.$api.ADMIN.login}`, this.form.loginModel)
    sessionStorage.setItem("adminToken", res.Data.Token);
    const user = res.Data.User
    sessionStorage.setItem(
        "user",
        JSON.stringify({
            username: user.username,
            role: user.role,
            ground: user.ground // 前中后台的标识  如 fore mid back
        })
    );
    switch (user.role) {
        case "ip_admin": // ip管理员
            this.$router.push("/admin/ip/index");
            break;
        case "admin": // 普通管理员
            this.$router.push("/admin/user/index");
            break;
        case "super_admin": // 超级管理员
            this.$router.push("/admin/user/index");
            break;
    }
} catch (e) {
    this.$message.error(e.Message)
}
```

### 四. 路由守卫——router.beforeEach()
>只要是进入登录页，我们需要做两个事。
>1. 清除存储在sessionStorage的token信息和用户信息
>2. 使用permission.js提供的createRouter()创建一个新的router实例，替换matcher。
>
>我们这里是使用addRoutes在静态路由的基础上添加新路由，但是文档中没有提供删除路由的api。可以试想一下，如果登录后台再登录中台，则会出现中台可以访问后台路由的情况。[为什么替换matcher可以删除addRoutes添加的路由？](https://juejin.im/post/5d14c33c5188255cfe0de779)
>
>注：router.beforeEach一定要放在vue实例创建之前，不然当页面刷新时的路由不会进beforeEach钩子

**main.js**
```
router.beforeEach((to, from, next) => {
  if (to.path === '/login' || to.path === '/agent/login' || to.path === '/admin/login') {
    sessionStorage.clear();
    router.matcher = createRouter().matcher // 初始化routes,移除所有dynamicRoutes
    next()
    return
  }
  authentication(to, from, next, store, router); //路由鉴权
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
```

### 五. 前中后台鉴权——authentication()
>这里的switch函数根据to.path.split("/")[1]判定平台。在登录时成功后我们sessionStorage.setItem()保存token。
为什么要使用token agentToken adminToken三个不同的key来储存呢？而不是只将token作为key呢。这样在axios.interceptors.request.use拦截器中设置token头也不需要通过switch去获取不同的token了。

因为假设我们当前的页面路由是agent/member/index，我们手动修改为admin/xxx/xxx。我们希望它跳转到admin的登录页，而不是404页面。
>isAuthentication标识是否完成鉴权，没有鉴权则调用generateRoutes获取有效路由,再通过addRoutes添加新路由

**permission.js**
```
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
```
通过user.ground判定平台

**store/index.js**
```
   getValidRoutes({commit}, role) {
      return new Promise(resolve => {
        let validRoutes
        switch (JSON.parse(sessionStorage.getItem('user')).ground) {
          case 'fore':
            validRoutes = generateRoutes('user', role, commit)
            resolve(validRoutes);
            break
          case 'mid':
            validRoutes = generateRoutes('agent', role, commit)
            resolve(validRoutes);
            break
          case 'back':
            validRoutes = generateRoutes('admin', role, commit)
            resolve(validRoutes);
            break
        }
      })
    },
```

### 六. 角色筛选——ValidRoutes()
>这里干了两件最重要的事
>1. 生成el-menu的菜单数据
>2. 生成当前角色有效的路由

**permission.js**
```
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
```

### 七.页面刷新后数据丢失
>在登录后isAuthentication为1，刷新时不会重新生成路由，导致数据丢失，在main.js监听window.onbeforeunload即可

**main.js**
```
window.onbeforeunload = function () {
  if (sessionStorage.getItem('user')) {
    sessionStorage.setItem('isAuthentication', '0') // 在某个系统登录后，页面刷新，需重新生成路由
  }
}
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
```

### 拓展
>这时候差不多就大功告成了，只需将数据渲染到el-menu即可。

1.后台控制权限

>当前的路由鉴权基本上由前端控制，后端只需返回平台标识和角色。但实际开发时，肯定都是通过后台控制，菜单角色等信息需要建表入库。来修改栏目名称，一级栏目icon，菜单权限等
>我们可以在getValidRoutes时获取一张权限表，将这些数据插入到dynamicRoutes中。后端返回的数据大致如下：
```
[{
        id: 1,
        name: '用户管理',
        icon: 'el-icon-user-solid',
        children: [{
                id: 3,
                name: '用户列表',
                meta: {
                    roles: [1, 2]
                },
            },
            {
                id: 4,
                path: 'detail',
                name: '用户详情',
                meta: {
                    roles: [1]
                },
            },
        ]
    },
    {
        id: 2,
        name: 'IP管理',
        icon: 'el-icon-s-promotion',
        children: [{
            id: 5,
            name: 'IP列表',
            meta: {
                roles: [1, 2, 3]
            },
        }, ]
    },
]
```

2.安全性方面
>前端：
>1. 跨平台进入路由，直接跳到该平台登录页。
>2. 当前平台访问没有权限的页面报404错误。
 
>后端：
>1. 一定要保证相应平台的token只能调对应接口，否则报错。
>2. 如果能做到角色接口鉴权就更好了，从接口层面拒绝请求

3.axios封装
>在请求拦截器中根据用户信息拿不同的token，设置头部信息
在响应拦截器中，如果token过期，再根据用户信息跳转到不同的登录页


4.api管理
>如果后端也是一套代码。那api也可以这样进行管理，但如果没有一个统一的前缀。可以在axios设置一个统一的前缀例如proxy，这样就解决了跨域的问题。
```
const USER = 'api'
const AGENT = 'agent'
const ADMIN = 'admin'
export default {
  USER: {
    login: `${USER}/User/login`,
  },
  AGENT: {
    login: `${AGENT}/User/login`,
    uploadFile: `${AGENT}/Utils/uploadFile`,
  },
  ADMIN: {
    login: `${ADMIN}/User/login`,
  },
}
```
```
devServer: {
    proxy: {
      '/proxy': {
        target: 'http://localhost:8848',
        changeOrigin: true,
        pathRewrite: {
          '^proxy': ''  //将url中的proxy子串去掉
        }
      }
    }
  },
```
