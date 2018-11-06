import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Clear from '@/components/Clear'
import Help from '@/components/Help'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/clear',
      name: 'Clear',
      component: Clear
    },
    {
      path: '/help',
      name: 'Help',
      component: Help
    }
  ]
})
