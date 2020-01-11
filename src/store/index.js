import Vue from 'vue'
import Vuex from 'vuex'
import {
  generateRoutes
} from '@/permission'
import _ from 'lodash'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    backgroundMenuData: [],
    midgroundMenuData: []
  },
  getters: {
    backgroundMenuData: state => state.backgroundMenuData, // 后台菜单数据
    midgroundMenuData: state => state.midgroundMenuData
  },
  mutations: {
    SET_BACKGROUD_MENU_DATA(state, data) {
      state.backgroundMenuData = data
    },
    SET_MIDGROUD_MENU_DATA(state, data) {
      state.midgroundMenuData = data
    },
  },
  actions: {
    getValidRoutes({
      commit
    }, role) {
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
  },
  modules: {}
})