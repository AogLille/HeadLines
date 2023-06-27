<template>
	<div class="search-result">
		<van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
			<van-cell v-for="item in list" :key="item.art_id" :title="item.title" :to="{
				name:'article',
				params:{
					articleId:item.art_id
				}
			}"/>
		</van-list>
	</div>
</template>

<script>
import { getResultsAPI } from '@/api'
export default {
	name: 'search-result',
	props: {
		searchText: {
			type: String,
			required: true,
		},
	},
	data() {
		return {
			list: [],
			loading: false,
			finished: false,
			page: 1,
			per_page: 10,
		}
	},
	methods: {
		async onLoad() {
			const { data } = await getResultsAPI({
				page: this.page,
				per_page: this.per_page,
				q: this.searchText,
			})
			this.list.push(...data.data.results)
			this.loading = false
			if (data.data.results.length) {
				this.page++
			} else {
				this.finished = true
			}
		},
	},
}
</script>

<style></style>
