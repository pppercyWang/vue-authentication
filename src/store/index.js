import Vue from 'vue'
import Vuex from 'vuex'
import {
  getValidRoutes
} from '@/permission'
import _ from 'lodash'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    backgroundMenuData: []
  },
  getters: {
    backgroundMenuData: state => state.backgroundMenuData // 后台菜单数据
  },
  mutations: {
    SET_BACKGROUD_MENU_DATA(state, data) {
      state.backgroundMenuData = data
    },
  },
  actions: {
    generateRoutes({
      commit
    }, role) {
      return new Promise(resolve => {
        let validRoutes 
        switch (JSON.parse(sessionStorage.getItem('user')).ground) {
          case 'back':
            validRoutes = getValidRoutes('admin',role,commit)
            resolve(validRoutes);
            break
        }
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