import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const userStore = new Vuex.Store({
  state: {
    userInfo: {},
    selectCity: {
      cityName:'',
      cityCode:''
    },
    userRole: {},
    cityList: [],
    selectExchange: {
      exchangeName: '',
      exchangeCode: ''
    }
  },
  getters: {
    getUserInfo (state) {
      return state.userInfo
    },
    getSelectCity (state) {
      return state.selectCity
    },
    getCityList (state) {
      return state.cityList
    },
    getSelectExchange (state) {
      return state.selectExchange
    },
    getUserRole (state) {
      return state.userRole
    }
  },
  mutations: {
    setUserInfo (state, userInfo) {
      state.userInfo = userInfo
    },
    setSelectCity (state, selectCity) {
      state.selectCity = selectCity
    },
    setCityList (state, cityList) {
      return state.cityList = cityList
    },
    setSelectExchange (state, selectExchange) {
      return state.selectExchange = selectExchange
    },
    setUserRole (state, userRole) {
      return state.userRole = userRole
    }
  },
  actions: {
    setUserInfo ({ commit }, userInfo) {
      commit('setUserInfo', userInfo)
    },
    setSelectCity ({ commit }, selectCity) {
      commit('setSelectCity', selectCity)
    },
    setCityList ({ commit }, cityList) {
      commit('setCityList', cityList)
    },
    setSelectExchange ({ commit }, selectExchange) {
      commit('setSelectExchange', selectExchange)
    },
    setUserRole ({ commit }, userRole) {
      commit('setUserRole', userRole)
    }
  }
})

export default userStore
