<template>
	<div class="search-history">
		<!-- 如果有记录，搜索历史会显示 -->
		<van-cell-group v-if="histories.length !== 0">
			<van-cell title="搜索历史">
				<span class="text" v-if="isEdit" @click="isEdit = false">完成</span>
				<span class="text" v-if="isEdit" @click="clearHistories()">清空</span>
				<van-icon name="delete-o" @click="isEdit = true" v-if="!isEdit" />
			</van-cell>
			<van-cell :title="item" v-for="(item, index) in histories" :key="index"  @click="$emit('search', item)">
				<van-icon name="close" v-if="isEdit" @click="remove(index)"></van-icon>
			</van-cell>
		</van-cell-group>
		<!-- 如果没有有记录，会显示暂时没有搜索记录 -->
		<div class="no-more" v-if="histories.length === 0">暂时没有搜索记录哦~</div>
	</div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
	name: 'search-history',
	data() {
		return {
			isEdit: false,
		}
	},
	computed: {
		...mapGetters(['histories']),
	},
	methods: {
		...mapMutations(['SearchHistory/clearHistory', 'SearchHistory/removeHistory']),
		// 清空搜索历史
		clearHistories() {
			this.$dialog
				.confirm({
					title: '注意',
					message: '确认清空搜索记录吗?',
					confirmButtonColor: '#3296fa',
				})
				.then(() => {
					// on confirm
					this['SearchHistory/clearHistory']()
					this.isEdit = false
				})
				.catch(() => {
					// on cancel
				})
		},
		// 删除指定的搜索记录
		remove(index) {
			this['SearchHistory/removeHistory'](index)
		},
	},
}
</script>

<style scoped lang="less">
.search-history {
	::v-deep .van-cell-group {
		.text {
			margin-right: 10px;
		}
	}

	.no-more {
		color: rgb(145, 148, 148);
		font-size: 35px;
		margin-top: 6px;
		margin-left: 6px;
	}
}
</style>
