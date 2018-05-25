import Vue from 'vue'
import VueRouter from 'vue-router'
import VueHtml5Editor from 'vue-html5-editor'
import jsCookie from 'js-cookie'
import routes from './router'
import Element from 'element-ui'
import store from '../../vuex/store'
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

Vue.directive('my-integer', {
  componentUpdated (el, binding, vnode) {
    if (!binding.expression) {
        throw 'no expression'
    }

    if (binding.value === binding.oldValue && binding.value !== '') {
        return
    }

    var elementInput = $(el).find('input')
    elementInput.val(binding.value)
    elementInput.on('keyup', function(){
        var value = $(this).val()
        if (/[^0-9]*/.test(value)) {
            value = value.replace(/[^0-9]*/g, '')
        }
        $(this).val(value)

        eval("vnode.context." + binding.expression + "= value")
    })
  }
})

Vue.directive('my-float', {
  componentUpdated (el, binding, vnode) {
    if (!binding.expression) {
        throw 'no expression'
    }

    if (binding.value === binding.oldValue && binding.value !== '') {
        return
    }

    console.log(vnode, binding.expression)

    var elementInput = $(el).find('input')
    elementInput.val(binding.value)
    elementInput.on('keyup', function(){
        var value = $(this).val()
        if (/[^0-9 | .]*/.test(value)) {
            value = value.replace(/[^0-9 | .]*/g, '')
        }

        var index = value.indexOf('.')

        if (index === 0) {
            value = ''
        }

        if (value.split('.').length > 2) {
            value = value.split('.')[0]
        }

        if (index > 0) {
            value = value.substring(0, index + 3)
        }
        $(this).val(value)
        eval("vnode.context." + binding.expression + "= value")
    })
  }
})


// 实例化VueRouter
const router = new VueRouter({
  mode: 'history',
  routes
})

// 验证登录
router.beforeEach((to, from, next) => {
    document.title = to.meta.title
    var e2Token = jsCookie.get('socialmarketing_cloud_user')
    if (!e2Token && to.name !== 'login') {
        window.location.href = '/login'
    }

    if (to.name == 'home') {
        next('/propertyAssets')
    }

    // 滚动置顶
    window.scrollTo && window.scrollTo(0, 0)
    next()
})

new Vue({
    el: '#app',
    store,
    router
})
