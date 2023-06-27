import { getItem, setItem } from '@/utils/storage'
import { uniq } from 'lodash'
const TOKEN = 'SEARCH_HISTORY'
export default {
	namespaced: true,
	state: {
		history: getItem(TOKEN) || [],
	},
	mutations: {
		addHistory(state, rec) {
			state.history.unshift(rec)
			state.history = uniq(state.history)
			setItem(TOKEN, state.history)
		},
		removeHistory(state, index) {
			if (state.history.length) {
				state.history.splice(index, 1)
				setItem(TOKEN, state.history)
			}
		},
		clearHistory(state) {
			if (state.history.length) {
				state.history = []
				setItem(TOKEN, state.history)
			}
		},
	},
}
