import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginPage from '@/views/login/index.vue'
import LayoutPage from '@/views/layout/index.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/login',
		name: 'login',
		component: LoginPage,
	},
	{
		path: '/',
		name: 'layout',
		redirect: '/home', //首页为默认子路由
		component: LayoutPage,
		children: [
			{
				path: '/home',
				name: 'home',
				component: () => import('@/views/home'),
			},
			{
				path: '/question',
				name: 'question',
				component: () => import('@/views/question'),
			},
			{
				path: '/videos',
				name: 'videos',
				component: () => import('@/views/videos'),
			},
			{
				path: '/my',
				name: 'my',
				component: () => import('@/views/my'),
			},
		],
	},
	{
		path: '/search',
		name: 'search',
		component: () => import('@/views/search'),
	},
	{
		path:'/article/:articleId',
		name:'article',
		component:()=>import('@/views/acticles'),
		props:true
	}
]

const router = new VueRouter({
	base: process.env.BASE_URL,
	routes,
})

export default router
