import Vue from 'vue'
import store from '@/store'
import { Dialog } from 'vant'
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
		path: '/article/:articleId',
		name: 'article',
		component: () => import('@/views/acticles'),
		props: true,
	},
	{
		path: '/user/edit',
		name: 'editinfo',
		component: () => import('@/views/user'),
	},
	{
		path: '/user/chat',
		name: 'chat',
		component: () => import('@/views/chat'),
		meta: { requiresAuth: true },
	},
]

const router = new VueRouter({
	base: process.env.BASE_URL,
	routes,
})

// 对于需要登录才能使用的功能进行守卫
router.beforeEach((to, from, next) => {
	// 如果有登录限制，进行登录验证
	if (to.meta.requiresAuth) {
		// 如果已登录
		if (store.state.user) {
			return next()
		}
		// 如果未登录
		Dialog.confirm({
			title: '请登录后进行使用！',
		})
			.then(() => {
				// on confirm
				router.replace({
					name: 'login',
					query: {
						returnPage: router.currentRoute.fullPath,
					},
				})
			})
			.catch(() => {
				// on cancel
				next(false)
			})
	} else {
		// 如果没有登录限制，直接跳转
		return next()
	}
})

export default router
