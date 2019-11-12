import Vue from 'vue'
import Router from 'vue-router'
import index from '@/view/pages/index/index'
import logins from '@/view/pages/login/logins'
import indexs from '@/view/pages/indexs/indexs'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/indexs',
      name: 'indexs',
      component: indexs,
    },
    {
      path: '/',
      name: 'logins',
      component: logins,
    },
    {
      path: '/index',
      name: 'index',
      component: index,
    }
  ]
})
