<template>
	<div class="edit-info">
		<!-- nav栏 -->
		<van-nav-bar class="page-nav-bar" title="编辑资料">
			<template #left>
				<van-icon name="arrow-left" size="18" @click="$router.back()" />
			</template>
		</van-nav-bar>
		<!-- 用户资料 -->
		<van-cell-group>
			<van-uploader v-model="file" :preview-image="false" :after-read="afterRead">
				<van-cell title="头像" is-link>
					<van-image class="avator" fit="cover" :src="user.photo" round />
				</van-cell>
			</van-uploader>

			<van-cell title="昵称" is-link :value="user.name" @click="isEditNameShow = true"></van-cell>
			<van-cell title="性别" is-link :value="user.gender === 0 ? '男' : '女'" @click="isEditGenderShow = true"></van-cell>
			<van-cell title="生日" is-link :value="user.birthday" @click="isEditBirthShow = true"></van-cell>
		</van-cell-group>

		<!-- 弹窗区域 -->

		<!-- 更换头像弹窗 -->
		<van-popup class="pop_avator" v-model="isEditAvatorShow" position="bottom" :style="{ height: '100%' }">
			<update-avator v-if="isEditAvatorShow" :file="file" @update-avator="user.photo = $event" @close="cancelUploadAvator"></update-avator>
		</van-popup>

		<!-- 修改昵称 -->
		<van-popup v-model="isEditNameShow" position="bottom" :style="{ height: '100%' }">
			<update-name v-if="isEditNameShow" :nickname.sync="user.name" @close="isEditNameShow = false"></update-name>
		</van-popup>

		<!-- 修改性别 -->
		<van-popup v-model="isEditGenderShow" position="bottom">
			<update-gender v-if="isEditGenderShow" :gender.sync="user.gender" @close="isEditGenderShow = false"></update-gender>
		</van-popup>

		<!-- 修改生日 -->
		<van-popup v-model="isEditBirthShow" position="bottom">
			<update-birth v-if="isEditBirthShow" :birthday.sync="user.birthday" @close="isEditBirthShow = false"></update-birth>
		</van-popup>
	</div>
</template>

<script>
import { getUserAPI } from '@/api'
import updateName from './component/update-name.vue'
import updateGender from './component/update-gender.vue'
import updateBirth from './component/update-birth.vue'
import updateAvator from './component/update-avator.vue'
export default {
	components: {
		updateName,
		updateGender,
		updateBirth,
		updateAvator,
	},
	data() {
		return {
			user: {}, //用户资料,
			file: [], //上传的头像文件
			isEditAvatorShow: false, //编辑头像弹窗
			isEditNameShow: false, //编辑昵称弹窗
			isEditGenderShow: false, //编辑性别弹窗
			isEditBirthShow: false, //编辑生日弹窗
		}
	},
	created() {
		this.getUserInfo()
	},
	methods: {
		async getUserInfo() {
			const {
				data: { data },
			} = await getUserAPI()
			this.user = data
		},
		afterRead() {
			this.isEditAvatorShow = true
		},
		cancelUploadAvator() {
			this.isEditAvatorShow = false
			this.file = []
		},
	},
}
</script>

<style lang="less" scoped>
.edit-info {
	.avator {
		width: 60px;
		height: 60px;
	}
	.van-popup {
		background-color: #f5f7f9;
	}
	.pop_avator {
		background-color: black;
	}
	.van-uploader {
		width: 100vw;
		::v-deep .van-uploader__wrapper {
			display: block;
		}
	}
}
</style>
