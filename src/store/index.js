import Vue from 'vue'
import Vuex from 'vuex'
import {
  dynamicRoutes
} from '@/router'
import _ from 'lodash'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    validRoutes: []
  },
  getters: {
    validRoutes: state => state.validRoutes,
    backgroundMenuData: state => state.validRoutes[0].children // 后台
  },
  mutations: {
    SET_VALID_ROUTES(state, routes) {
      state.validRoutes = routes
    },
    CLEAR_VALID_ROUTES(state) {
      state.validRoutes = []
    }
  },
  actions: {
    generateRoutes({
      commit
    }, role) {
      return new Promise(resolve => {
          let temp = _.cloneDeep(dynamicRoutes)
          temp.forEach(route => {
            if (route.children) {
              route.children = route.children.filter(each => {
                return each.meta.role.includes(role) === true
              })
            }
          });
          commit('SET_VALID_ROUTES', temp)
          sessionStorage.setItem('validRoutes', temp);
          resolve(temp);
      })
    },
    clearRoutes({
      commit
    }) {
      commit('CLEAR_VALID_ROUTES')
    }
  },
  modules: {}
})