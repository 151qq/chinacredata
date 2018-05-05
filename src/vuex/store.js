import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const userStore = new Vuex.Store({
  state: {
    userInfo: {
      userCode: '15164369647',
      userWechatUserid: 'YangNing',
      userImage: 'http://p.qlogo.cn/bizmail/vrch5KVpXx5Y1ZEV06hTsd8des35JhGGKo96NS0921LLicaFRRBCpUw/0',
      userLoginName: '杨宁',
      userInfo: {
        userMobile: '15164369647'
      },
      securityUserRole: [
        {
          roleCode: 'product_admin',
          roleDesc: '产品发布'
        },
        {
          roleCode: 'enterprise_member_admin',
          roleDesc: '会员管理'
        }
      ]
    },
    selectCity: {
      cityName:'',
      cityCode:''
    },
    cityList: []
    
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
    }
  },
  mutations: {
    setUserInfo (state, userInfo) {
      state.userInfo = userInfo
    },
    setSelectCity (state, selectCity) {
      state.selectCity = selectCity
    },
    setCityList (state,cityList) {
      return state.cityList = cityList
    }
  },
  actions: {
    setUserInfo ({ commit }, userInfo) {
      commit('setUserInfo', userInfo)
    },
    setSelectCity ({ commit }, selectCity) {
      commit('setSelectCity', selectCity)
    },
    setCityList ({ commit },cityList) {
      commit('setCityList', cityList)
    }
  }
})

export default userStore
