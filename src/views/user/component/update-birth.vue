<template>
	<div class="update-birth">
		<van-datetime-picker v-model="currentDate" type="date" title="选择年月日" :min-date="minDate" :max-date="maxDate" @cancel="onCancel" @confirm="onConfirm" />
	</div>
</template>

<script>
import '@/utils/dayjs'
import { editUserAPI } from '@/api'
import dayjs from 'dayjs'
export default {
	name: 'UpdateBirth',
	props: {
		birthday: {
			type: String,
			required: true,
		},
	},
	data() {
		return {
			minDate: new Date(1900, 0, 1),
			maxDate: new Date(2025, 10, 1),
			currentDate: new Date(this.birthday),
		}
	},
	methods: {
		onCancel() {
			this.$emit('close')
		},
		async onConfirm() {
			try {
				this.$toast.loading({
					message: '修改中',
					forbidclick: true,
				})
				let date = dayjs(this.currentDate).format('YYYY-MM-DD')
				await editUserAPI({
					birthday: date,
				})
				this.$emit('update:birthday', date)
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
