// 初始化axios请求的基础配置
import axios from 'axios'
import store from '@/store'
import { Toast } from 'vant'
import router from '@/router'
// 网络请求基地址

const request = axios.create({
	baseURL: 'https://toutiao.itheima.net',
})
const refreshToken = axios.create({
	baseURL: 'https://toutiao.itheima.net',
})

// 请求拦截器
request.interceptors.request.use(
	function (config) {
		//请求发起会调用
		//config：本次请求的配置对象
		const user = store.state.user
		if (user && user.token) {
			config.headers.Authorization = `Bearer ${user.token}`
		}
		// 务必返回config，否则请求出不去
		return config
	},
	function (err) {
		//请求出错（请求还没有发出去）会调用
		return Promise.reject(err)
	}
)
// 响应拦截器
request.interceptors.response.use(
	function (response) {
		// Any status code that lie within the range of 2xx cause this function to trigger
		// Do something with response data
		return response
	},
	async function (error) {
		const status = error.response.status
		if (status === 400) {
			Toast.fail('客户端错误')
		} else if (status === 401) {
			// Token过期处理
			const { user } = store.state
			if (!user || !user.token) {
				return toLogin()
			} else {
				try {
					const { data } = await refreshToken({
						method: 'PUT',
						url: '/v1_0/authorizations',
						headers: {
							Authorization: `Bearer ${user.refresh_token}`,
						},
					})
					user.token = data.data.token
					store.commit('setUser', user)
					return request(error.config)
				} catch (err) {
					Toast.fail('身份验证失败，请重新登录')
					store.commit('setUser', [])
					toLogin()
				}
			}
		} else if (status === 403) {
			Toast.fail('权限不足')
		} else if (status >= 500) {
			Toast.fail('服务端错误')
		}
		// Any status codes that falls outside the range of 2xx cause this function to trigger
		// Do something with response error
		return Promise.reject(error)
	}
)

function toLogin() {
	router.replace({
		name: 'login',
		query: {
			returnPage: router.currentRoute.fullPath,
		},
	})
}
// ...



export default request
