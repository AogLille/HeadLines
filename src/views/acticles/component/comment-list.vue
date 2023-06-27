<template>
	<van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" class="comlist">
        <comment-item v-for="item in list" :comment="item" :key="item.com_id" @reply="$emit('reply-comment',$event)"></comment-item>
	</van-list>
</template>

<script>
import { getArticleCommentsAPI } from '@/api'
import CommentItem from '@/views/acticles/component/comment-item.vue'
export default {
	name: 'comment-list',
	props: {
		artId: {
			type: [String, Number, Object],
			required: true,
		},
		list:{
			type:Array,
			default:()=>[]
		},
		type:{
			type:String,
			default:'a'
		}
	},
    components:{
        [CommentItem.name]:CommentItem
    },
	data() {
		return {
			loading: false,
			finished: false,
			offset: null,
			limit: 10,
		}
	},
	methods: {
		async onLoad() {
			try {
				const {
					data: { data },
				} = await getArticleCommentsAPI({
					type: this.type,
					source: this.artId,
					offset: this.offset,
					limit: this.limit,
				})
				this.list.push(...data.results)
				this.loading = false
				if (data.results.length) {
					this.offset = data.last_id
				} else {
					this.finished = true
				}
			} catch (error) {
				this.$toast(error)
			}
		},
	},
}
</script>

<style scoped lang="less">
</style>
