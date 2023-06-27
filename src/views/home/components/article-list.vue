<template>
	<!-- 文章列表组件 -->
	<div class="article-list">
		<van-pull-refresh v-model="refreshing" @refresh="onRefresh" :success-text="refreshText" success-duration="2000">
			<van-list v-model="loading" :error.sync="error" error-text="请求失败，点击重新加载" :finished="finished" finished-text="没有更多了" @load="onLoad"> <Article v-for="(article, index) in list" :key="index" :article="article" /> </van-list
		></van-pull-refresh>
	</div>
</template>

<script>
import { getArticleListAPI } from '@/api'
import essay from '@/components/essay.vue'
export default {
	name: 'ArticleList',
	components: {
		Article: essay,
	},
	props: {
		channel: {
			type: Object,
			required: true,
		},
	},
	data() {
		return {
			list: [],
			loading: false,
			finished: false,
			timestamp: null,
			error: false,
			refreshing: false,
			refreshText: '',
		}
	},
	methods: {
		async onLoad() {
			// 异步更新数据
			try {
				const { data } = await getArticleListAPI({
					channel_id: this.channel.id,
					timestamp: this.timestamp || Date.now(),
				})
				let { results } = data.data
				this.list.push(...results)
				// if (Math.random() > 0.5) {
				// 	JSON.parse('sdajhdaj')
				// }
				// 加载状态结束
				this.loading = false
				// 数据全部加载完成
				if (results.length) {
					this.timestamp = data.data.pre_timestamp
				} else {
					this.finished = true
				}
			} catch (error) {
				this.error = true
				this.loading = false
			}
		},
		async onRefresh() {
			// 重新加载数据
			try {
				const { data } = await getArticleListAPI({
					channel_id: this.channel.id,
					timestamp: Date.now(),
				})
				let { results } = data.data
				this.list.unshift(...results)

				this.refreshing = false
				this.refreshText = `刷新成功，添加了${results.length}条数据`
			} catch (error) {
				this.refreshing = false
				this.refreshText = `刷新失败`
			}
			// 将 loading 设置为 true，表示处于加载状态
		},
	},
}
</script>

<style scoped lang="less">
.article-list {
	height: 83vh;
	overflow-y: auto;
}
</style>
