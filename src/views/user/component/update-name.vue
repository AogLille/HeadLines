<template>
	<div class="update-name">
		<van-nav-bar title="修改昵称" left-text="取消" right-text="确认" @click-left="$emit('close')" @click-right="onConfirm" />
		<div class="edit-area">
			<van-field v-model.trim="message" rows="2" autosize type="textarea" maxlength="20" placeholder="请输入昵称" show-word-limit />
		</div>
	</div>
</template>

<script>
import { editUserAPI } from '@/api'
export default {
	name: 'UpdateName',
	props: {
		nickname: {
			type: String,
			required: true,
		},
	},
	data() {
		return {
			message: this.nickname,
		}
	},
	methods: {
		async onConfirm() {
			this.$toast.loading({
				message: '修改中',
				forbidClick: true,
			})
			try {
				await editUserAPI({
					name: this.message,
				})
				this.$emit('update:nickname', this.message)
				this.$emit('close')
				this.$toast.success({
					message: '修改成功',
				})
			} catch (error) {
				this.$toast(error)
			}
		},
	},
}
</script>

<style lang="less" scoped>
.update-name {
	.edit-area {
		padding: 15px;
	}
}
</style>
