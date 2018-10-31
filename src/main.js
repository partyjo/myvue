// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'lib-flexible'
import 'normalize.css'
import './styles/global.css'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import config from './libs/config'
import layer from 'vue-layer'

Vue.prototype.GLOBAL = config
Vue.prototype.$layer = layer(Vue, {
  msgtime: 3
})

const instance = axios.create({
  baseURL: '/api/',
  timeout: 1000,
  headers: {
    'X-Custom-Header': 'foobar'
  }
})

instance.interceptors.request.use(config => {
  return config
}, err => {
  this.$layer.msg('请求超时!')
  return Promise.reject(err)
})

instance.interceptors.response.use(res => {
  if (res.success) {
    return Promise.resolve(res)
  } else {
    this.$layer.msg(res.msg | '接口异常')
  }
}, err => {
  this.$layer.msg('服务器出错')
  return Promise.reject(err)
})

Vue.use(VueAxios, instance)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
