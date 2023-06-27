import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage' //自己封装的本地存储模块
import SearchHistory from '@/store/modules/SearchHistory'

Vue.use(Vuex)

const TOKEN_KEY = 'TOUTIAO_TOKEN'

export default new Vuex.Store({
	state: {
		user: getItem(TOKEN_KEY) || null, //对象类型,用于存储当前用户信息,包含token等信息
	},
	getters: {
		histories: (state) => state.SearchHistory.history,
	},
	mutations: {
		setUser(state, payload) {
			state.user = payload
			setItem(TOKEN_KEY, payload)
		},
	},
	actions: {},
	modules: {
		SearchHistory,
	},
})
