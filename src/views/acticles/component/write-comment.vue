<template>
	<div class="write-comment">
		<van-field v-model.trim="message" rows="2" autosize type="textarea" maxlength="50" placeholder="请输入留言" show-word-limit />
		<van-button size="mini" :disabled="!message" @click="postComment">发布</van-button>
	</div>
</template>

<script>
import { postCommentAPI } from '@/api'
export default {
	name: 'write-comment',
	props: {
		target: {
			type: String,
			required: true,
		},
		artId: {
			type: String,
			default: null,
		},
	},
	data() {
		return {
			message: '',
		}
	},
	methods: {
		async postComment() {
			const {
				data: { data },
			} = await postCommentAPI({
				target: this.target,
				content: this.message,
				art_id: this.artId,
			})
			this.$emit('post-comment', data.new_obj)
			this.message = ''
		},
	},
}
</script>

<style scoped lang="less">
.write-comment {
	padding: 14px;
	display: flex;
	align-items: center;
	.van-button {
		width: 100px;
	}
}
</style>
