import Vue from 'vue'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss' // global css
import App from './App'
import router from './router'
import store from './store'
import i18n from './lang' // Internationalization
import './icons' // icon
import * as filters from './filters' // global filters
import 'font-awesome/css/font-awesome.css' // font-awesome
import axios from 'axios'
import dashboard from '@/module-dashboard/' // 面板
import tools from './utils/common.js'
import echarts from 'echarts'
import qs from 'qs'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded'

axios.defaults.withCredentials = true

// 请求拦截器
axios.interceptors.request.use(
  function (config) {
    if (!config.url.includes('addPressScript')) {
      config.data = qs.stringify(config.data)
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

// 响应拦截器
axios.interceptors.response.use(
  function (response) {
    if (response.data.code === 40011) {
      router.push({
        path: '/login'
      })
    }
    return response
  },
  function (error) {
    return Promise.reject(error)
  }
)

Vue.prototype.$tools = tools
Vue.prototype.$axios = axios
Vue.prototype.$echarts = echarts
Vue.prototype.$qs = qs

Vue.use(tools)
Vue.use(dashboard, store)

// 饿了么
Vue.use(Element, {
  size: 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})

Vue.config.productionTip = false

/* eslint-disable */
new Vue({
  el: "#app",
  router,
  store,
  i18n,
  template: "<App/>",
  components: {
    App
  }
});
