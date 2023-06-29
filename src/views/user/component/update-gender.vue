<template>
	<div class="update-gend">
		<van-picker show-toolbar title="修改性别" :columns="columns" :default-index="defaultIndex" @cancel="onCancel" @confirm="onConfirm" />
	</div>
</template>

<script>
import { editUserAPI } from '@/api'
export default {
	name: 'UpdateGender',
	props: {
		gender: {
			type: Number,
			require: true,
		},
	},
	data() {
		return {
			columns: ['男', '女'],
			defaultIndex: this.gender,
		}
	},
	methods: {
		onCancel() {
			this.$emit('close')
		},
		async onConfirm(picker, index) {
			try {
				this.$toast.loading({
					message: '修改中',
					forbidclick: true,
				})
				await editUserAPI({
					gender: index,
				})
				this.$emit('update:gender', index)
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

<style lang="less" scoped></style>
