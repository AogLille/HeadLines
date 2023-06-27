// 初始化axios请求的基础配置
import axios from 'axios'
import store from '@/store'
// 网络请求基地址
axios.defaults.baseURL = 'http://toutiao.itheima.net'

// 请求拦截器
axios.interceptors.request.use(
	function (config) {
		//请求发起会调用
		//config：本次请求的配置对象
		const user = store.state.user
		if (user && user.token) {
			config.headers.Authorization= `Bearer ${user.token}`
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

// ...

export default axios
