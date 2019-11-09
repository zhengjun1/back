import Vue from 'vue'
import Router from 'vue-router'
import index from '@/view/pages/index/index'
import login from '@/view/pages/login/login'
import res from '@/view/pages/res/res'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
    },
	{
		path: '/login',
		name: 'login',
		component: login,
	},
	{
		path: '/res',
		name: 'res',
		component: res,
	},
  ]
})
