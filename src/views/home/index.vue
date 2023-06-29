<template>
	<div class="home-container">
		<!-- 搜索栏 -->
		<van-nav-bar class="page-nav-bar">
			<template #title>
				<van-button type="info" size="small" round icon="search" class="search-btn" to="/search">搜索</van-button>
			</template>
		</van-nav-bar>
		<!-- /搜索栏 -->

		<!-- 频道导航栏 -->
		<van-tabs class="tabs" v-model="active" animated swipeable>
			<!-- 频道 -->
			<van-tab v-for="channel in channels" :title="channel.name" :key="channel.id">
				<!-- 频道内容 -->
				<ArticleList :channel="channel"></ArticleList>
				<!-- /频道内容 -->
			</van-tab>
			<div slot="nav-right" class="placeholder"></div>
			<div class="more" slot="nav-right" @click="editShow"><i class="iconfont icon-gengduo"></i></div>
			<!-- /频道 -->
		</van-tabs>
		<!-- /频道导航栏 -->

		<!-- 编辑频道弹出层 -->
		<van-popup v-model="show" closeable close-icon-position="top-left" position="bottom" :style="{ height: '100%' }" round>
			<EditChannels :channels="channels" :activeIndex="active" @change-active="changeActive"></EditChannels>
		</van-popup>
		<!-- /编辑频道弹出层 -->
	</div>
</template>

<script>
import { getUserChannelsAPI } from '@/api'
import { mapState } from 'vuex'
import { setItem, getItem } from '@/utils/storage'
import articleList from './components/article-list.vue'
import editChannels from './components/editChannels.vue'
export default {
	components: {
		[articleList.name]: articleList,
		EditChannels: editChannels,
	},
	data() {
		return {
			active: 0, //当前被选中的频道序号
			channels: [], //频道列表
			show: false, //编辑频道的弹出层
		}
	},
	computed: {
		...mapState(['user']),
	},
	created() {
		this.loadChannels()
	},
	methods: {
		// 加载频道信息的方法
		async loadChannels() {
			// 如果登录
			if (this.user) {
				try {
					let {
						data: {
							data: { channels },
						},
					} = await getUserChannelsAPI()
					this.channels = channels
				} catch (error) {
					this.$toast('获取频道失败')
				}
			} else {
				// 如果未登录
				let userChannels = getItem('CHANNELS')
				// 如果本来存在频道记录
				if (userChannels) {
					this.channels = userChannels
				} else {
					// 如果本地不存在频道记录
					let {
						data: {
							data: { channels },
						},
					} = await getUserChannelsAPI()
					this.channels = channels
					setItem('CHANNELS', channels)
				}
			}
		},
		// 编辑频道的汉堡按钮点击事件
		editShow() {
			this.show = true
		},
		// 通过编辑弹出层修改当前active
		changeActive(index, isEditContinuteShow = false) {
			this.active = index
			this.show = isEditContinuteShow
		},
	},
}
</script>

<style scoped lang="less">
.home-container {
	// padding-top: 174px;
	padding-bottom: 100px;

	::v-deep .van-nav-bar {
		.van-nav-bar__title {
			max-width: unset;
		}
	}
	.search-btn {
		width: 555px;
		height: 64px;
		line-height: 64px;
		background-color: #5babfb;
		border: none;
		font-size: 28px;
		.van-icon {
			font-size: 32px;
		}
	}
	::v-deep .tabs {
		// position: fixed;
		// top: 92px;
		// left: 0;
		// right: 0;
		.placeholder {
			width: 66px;
			height: 82px;
			flex-shrink: 0;
		}
		.more {
			width: 66px;
			height: 82px;
			position: fixed;
			right: 0;
			background-color: #fff;
			display: flex;
			justify-content: center;
			align-items: center;
			opacity: 0.9;
			i.icon-gengduo {
				font-style: 33px;
			}
			&::before {
				display: block;
				position: absolute;
				left: 0;
				content: ' ';
				width: 1px;
				height: 100%;
				background-image: url('~@/assets/gradient-gray-line.png');
				background-size: contain;
			}
		}
		.van-tabs__wrap {
			height: 82px;
			.van-tabs__nav {
				padding: 0;
			}
		}
		.van-tabs__content {
		}
		.van-tab {
			min-width: 200px;
			border-right: 1px solid #edeff3;
			font-size: 30px;
			color: #777;
		}
		.van-tab--active {
			color: #333;
		}

		.van-tabs__line {
			width: 31px;
			height: 6px;
			background-color: #3296fa;
			bottom: 8px;
		}
	}
}
</style>
