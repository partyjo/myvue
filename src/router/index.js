import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Clear from '@/components/Clear'
import Help from '@/components/Help'
import Test from '@/components/Test'
import Result from '@/components/Result'

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
      path: '/help/:id',
      name: 'Help',
      component: Help
    },
    {
      path: '/result',
      name: 'Result',
      component: Result
    },
    {
      path: '/test',
      name: 'Test',
      component: Test
    }
  ]
})
