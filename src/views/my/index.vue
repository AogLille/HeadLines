<template>
	<div class="my-container">
		<!-- header -->
		<!-- 未登录的头部 -->
		<div class="header not-login" v-if="!user">
			<div class="login-btn" @click="$router.push('/login')">
				<img src="~@/assets/mobile.png" alt="" />
				<span>登录 / 注册</span>
			</div>
		</div>
		<!-- 已登录的头部 -->
		<div class="header user-info" v-else>
			<div class="base-info">
				<div class="user">
					<van-image class="avater" :src="userInfo.photo" fit="cover" round />
					<span class="name">{{ userInfo.name }}</span>
				</div>
				<div class="edit-btn">
					<van-button type="default" size="mini" round>编辑资料</van-button>
				</div>
			</div>
			<div class="data-states">
				<div class="date-item">
					<span class="count">{{ userInfo.art_count }}</span>
					<span class="text">头条</span>
				</div>
				<div class="date-item">
					<span class="count">{{ userInfo.follow_count }}</span>
					<span class="text">关注</span>
				</div>
				<div class="date-item">
					<span class="count">{{ userInfo.fans_count }}</span>
					<span class="text">粉丝</span>
				</div>
				<div class="date-item">
					<span class="count">{{ userInfo.like_count }}</span>
					<span class="text">获赞</span>
				</div>
			</div>
		</div>
		<!-- 收藏 / 历史 -->
		<van-grid class="nav mb-9" :border="false" :column-num="2" clickable>
			<van-grid-item class="item" icon="photo-o" text="收藏">
				<template #icon>
					<i class="iconfont icon-shoucang"></i>
				</template>
			</van-grid-item>
			<van-grid-item class="item" icon="photo-o" text="历史">
				<template #icon>
					<i class="iconfont icon-lishi"></i>
				</template>
			</van-grid-item>
		</van-grid>
		<van-cell title="消息通知" is-link />
		<van-cell title="小智同学" is-link class="mb-9" />
		<van-cell v-if="user" title="退出登录" class="logout-btn" @click="logout" />
	</div>
</template>

<script>
import { mapState,mapMutations } from 'vuex'
import { getUserInfoAPI } from '@/api'

export default {
	data() {
		return {
			userInfo: {},
		}
	},
	methods: {
		...mapMutations(['setUser']),
		logout() {
			//退出登录
			this.$dialog
				.confirm({
					title: '确认退出吗？',
				})
				.then(() => {
					// on confirm
					this.$store.commit('setUser', null)
				})
				.catch(() => {
					// on cancel
				})
		},
		async getUserInfo() {
			try {
				let {
					data: { data },
				} = await getUserInfoAPI()
				this.userInfo = data
				console.log(data)
			} catch (err) {
				this.$toast('获取用户信息失败，请重新登录')
				this.setUser(null)
			}
		},
	},
	computed: {
		...mapState(['user']),
	},
	created() {
		if (this.user) {
			this.getUserInfo()
		}
	},
}
</script>

<style lang="less" scoped>
.my-container {
	.header {
		height: 401px;
		background: url('~@/assets/banner.png');
		background-size: cover;
	}
	.not-login {
		display: flex;
		justify-content: center;
		align-items: center;
		.login-btn {
			color: #fff;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			img {
				width: 132px;
				height: 132px;
				margin-bottom: 15px;
			}
			span {
				font-size: 28px;
			}
		}
	}

	.user-info {
		.base-info {
			height: 266px;
			padding: 116px 32px 18px 32px;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.user {
				display: flex;
				align-items: center;
				.avater {
					width: 132px;
					height: 132px;
					border: 3px solid #fff;
					margin-right: 22px;
				}
				.name {
					color: #fff;
					font-size: 30px;
				}
			}
		}
		.data-states {
			height: 135px;
			display: flex;
			justify-content: space-around;
			align-items: center;
			.date-item {
				color: #fff;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				.count {
					font-size: 36px;
					margin-bottom: 18px;
				}
				.text {
					font-size: 23px;
				}
			}
		}
	}

	.nav {
		.item {
			height: 141px;
		}
		i.iconfont {
			font-size: 45px;
		}
		.icon-shoucang {
			color: #eb5253;
		}
		.icon-lishi {
			color: #ff9d1d;
		}
		/deep/ span.van-grid-item__text {
			font-size: 28px !important;
		}
	}
	.mb-9 {
		margin-bottom: 9px;
	}
	.logout-btn {
		height: 104px;
		text-align: center;
		color: #d86262;
	}
}
</style>
