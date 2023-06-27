<template>
	<div class="search-suggest">
		<van-cell icon="search" v-for="(item, index) in suggestions" :key="index" @click="$emit('search', item)">
			<div slot="title" v-html="setTextActive(item, words)"></div>
		</van-cell>
	</div>
</template>

<script>
import { getSuggestionAPI } from '@/api'
import { debounce } from 'lodash'

export default {
	data() {
		return {
			suggestions: [],
		}
	},
	name: 'search-suggest',
	props: {
		words: {
			type: String,
			required: true,
		},
	},
	watch: {
		/**
		 * 监听搜索框内容的改变
		 */
		words: {
			// 处理变化的同时进行防抖优化
			handler(newVal) {
				this.getSuggestions(newVal)
			},
			immediate: true,
		},
	},
	methods: {
		/**
		 * 根据搜索框内容获取联想建议,并且实现防抖
		 * @param {String} newVal
		 */
		getSuggestions: debounce(async function (newVal) {
			try {
				const { data } = await getSuggestionAPI(newVal)
				this.suggestions = data.data.options
			} catch (error) {
				this.$toast('获取建议列表失败')
			}
		}, 500),

		/**
		 * 给搜索建议添加高亮效果
		 * @param {*} text 每一条搜索建议
		 * @param {*} word 需要高亮的词语
		 */
		setTextActive(text, word) {
			if (text) {	
				let reg = new RegExp(word, 'gi')
				return text.replace(reg, `<span class="active">${word}</span>`)
			}
		},
	},
}
</script>

<style scoped lang="less">
.search-suggest {
	::v-deep .van-cell__title {
		.active {
			color: #3296fa;
		}
	}
}
</style>
