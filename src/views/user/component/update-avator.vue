<template>
	<div class="update-avator">
		<van-nav-bar class="navBar" left-text="取消" right-text="确认" @click-left="$emit('close')" @click-right="onConfirm" />
		<div class="area"><img :src="file[0].content" ref="img" /></div>
	</div>
</template>

<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import { updateAvatorAPI } from '@/api'
export default {
	name: 'UpdateAvator',
	props: {
		file: {
			type: Array,
			required: true,
		},
	},
	data() {
		return {
			cropper: null,
		}
	},
	methods: {
		onConfirm() {
			this.cropper.getCroppedCanvas().toBlob((blob) => {
				this.updateAvator(blob)
			})
		},
		async updateAvator(blob) {
			const formData = new FormData()
			formData.append('photo', blob)
			const {
				data: { data },
			} = await updateAvatorAPI(formData)
			this.$emit('close')
            console.log(data.photo)
			this.$emit('update-avator', data.photo)
		},
	},
	mounted() {
		const image = this.$refs.img
		this.cropper = new Cropper(image, {
			viewMode: 1,
			dragMode: 'move',
			aspectRatio: 1,
			cropBoxMovable: false,
			cropBoxResizable: false,
			background: false,
		})
	},
}
</script>

<style lang="less" scoped>
.update-avator {
	::v-deep .navBar {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: unset;
		.van-nav-bar__text {
			color: #fff;
		}
	}
	.area {
		position: absolute;
        top: 50%;
        transform: translateY(-50%);
		width: 100%;
		text-align: center;
        img{
            width: 100%;
        }
	}
}
</style>
