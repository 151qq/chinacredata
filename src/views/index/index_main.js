import Vue from 'vue'
import VueRouter from 'vue-router'
import VueHtml5Editor from 'vue-html5-editor'
import jsCookie from 'js-cookie'
import routes from './router'
import Element from 'element-ui'
import store from '../../vuex/store'
import util from '../../assets/common/util'
import components from '../../assets/common/components'
import $ from 'Jquery'
import 'element-ui/lib/theme-default/index.css'
import '../../assets/scss/common.scss'
import './scss/index.scss'

Vue.use(VueHtml5Editor, {
    showModuleName: true,
    language: "zh-cn",
    image: {
        sizeLimit: 512 * 1024,
        compress: true,
        width: 320,
        height: 300,
        quality: 80,
    },
    modules: [{
        name: "bold",
        icon: "fa fa-bold",
        i18n: "加粗",
        title: "加粗",
        show: true,
        handler: function (editor) {
            editor.execCommand("bold");
        }
    }],
    visibleModules: [
        "bold",
        "color",
        "font",
        "align",
        "list",
    ]
})

Vue.use(VueRouter)
Vue.use(Element)
Vue.use(components)

// 实例化VueRouter
const router = new VueRouter({
  mode: 'history',
  routes
})

// 验证登录
router.beforeEach((to, from, next) => {
    document.title = to.meta.title
    // 滚动置顶
    window.scrollTo && window.scrollTo(0, 0)

    // 登陆状态
    var e2Token = jsCookie.get('socialmarketing_cloud_user')
    if (!e2Token && to.name !== 'login') {
        window.location.href = '/login'
    }

    // 域名默认访问页面
    if (to.name == 'home') {
        next('/propertyAssets')
        return
    }
    // 平台初始化
    if (to.name == 'enterprise-detail' && to.query.platform == 'platform') {
        next()
        return
    }
    // 进入登陆页
    if (to.name == 'login') {
        next()
        return
    }
    // 进入错误页
    if (to.name == 'errorCheck') {
        next()
        return
    }

    // 获取用户信息
    if (!store.state.userInfo.userCnName) {
        util.request({
            method: 'get',
            interface: 'getUserInfo',
            data: {
                loginType: 'platform'
            }
        }).then(res => {
            if (res.result.success == '1') {
                if (res.result.result.enterpriseCode) {
                    var roleCodes = []
                    res.result.result.roleDefs.forEach((item) => {
                        roleCodes.push(item.roleCode)
                    })

                    var userRole = {
                      isRoot: roleCodes.indexOf('platform_root') > -1,
                      isAssets: roleCodes.indexOf('platform_assets') > -1,
                      isProperty: roleCodes.indexOf('platform_property') > -1,
                      isEnterprise: roleCodes.indexOf('platform_enterprise') > -1
                    }

                    res.result.result.roleCodes = roleCodes.concat([])
                    // 是否注册企业
                    store.commit('setUserInfo', res.result.result)
                    store.commit('setUserRole', userRole)

                    var role = to.meta.role
                    if ((role && userRole[role]) || !role || userRole['isRoot']) {
                        // 页面需要验证时验证成功 or 页面不需要验证时 or 超级管理员
                        next()
                    } else if (role && !userRole[role]) {
                        // 页面需要验证时验证失败
                        window.location.href = '/errorCheck'
                    }
                }
            } else {
              alert(res.result.message)
            }
        })
    } else {
        var role = to.meta.role
        if ((role && store.state.userRole[role]) || !role || store.state.userRole['isRoot']) {
            // 页面需要验证时验证成功 or 页面不需要验证时 or 超级管理员
            next()
        } else if (role && !store.state.userRole[role]) {
            // 页面需要验证时验证失败
            window.location.href = '/errorCheck'
        }
    }
})

new Vue({
    el: '#app',
    store,
    router
})
