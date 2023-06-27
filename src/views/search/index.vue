<template>
	<div class="search">
		<form action="/" class="searchArea">
			<van-search v-model="searchText" show-action placeholder="请输入搜索关键词" @search="onSearch" @cancel="onCancel" @focus="isResultsShow = false" class="search-btn" />
		</form>
		<div class="text">
			<!-- 搜索结果 -->
			<search-result v-if="isResultsShow" :searchText="searchText"></search-result>
			<!-- 搜索建议 -->
			<search-suggest v-else-if="searchText" :words="searchText" @search="onSearch"></search-suggest>
			<!-- 搜索历史 -->
			<search-history v-else @search="onSearch"></search-history>
		</div>
	</div>
</template>

<script>
import SearchSuggest from './components/SearchSuggest.vue'
import SearchResult from './components/SearchResult.vue'
import SearchHistory from './components/SearchHistory.vue'
import { mapMutations } from 'vuex'

export default {
	components: {
		SearchSuggest,
		SearchResult,
		SearchHistory,
	},
	data() {
		return {
			searchText: '',
			isResultsShow: false,
		}
	},
	methods: {
		...mapMutations(['SearchHistory/addHistory']),
		onSearch(val) {
			this.searchText = val
			console.log('搜索词：', val)
			this.isResultsShow = true
			this['SearchHistory/addHistory'](val)
		},
		onCancel() {
			this.$router.back()
		},
	},
}
</script>

<style scoped lang="less">
.search {
	padding-top: 108px;
	.searchArea {
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		.search-btn {
			background-color: #3296fa;
			.van-search__action {
				color: #fff;
			}
		}
	}
	.text {
		height: 91.9vh;
		overflow-y: auto;
	}
}
</style>
