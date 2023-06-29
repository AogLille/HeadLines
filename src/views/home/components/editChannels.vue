<template>
	<div class="edit-channels">
		<!-- 我的频道 -->
		<van-cell>
			<div slot="title" class="cell-title">我的频道</div>
			<div slot="default">
				<van-button type="danger" size="small" plain round class="cell-btn" @click="isEdit = !isEdit">{{ isEdit ? '完成' : '编辑' }}</van-button>
			</div>
		</van-cell>
		<van-grid :gutter="10" direction="horizontal">
			<van-grid-item v-for="(channel, index) in channels" :key="channel.id" @click="changeChannel(channel, index)">
				<span slot="text" class="text" :class="{ active: activeIndex === index }">{{ channel.name }}</span>
				<van-icon slot="icon" name="clear" v-show="isEdit && !fixedChannelsId.includes(channel.id)"></van-icon>
			</van-grid-item>
		</van-grid>
		<!-- /我的频道 -->

		<!-- 推荐频道 -->
		<van-cell>
			<div slot="title" class="cell-title">频道推荐</div>
		</van-cell>
		<van-grid :gutter="10" direction="horizontal">
			<van-grid-item v-for="channel in reChannels" :key="channel.id" :text="channel.name" icon="plus" @click="addChannel(channel)" />
		</van-grid>
		<!-- /推荐频道 -->
	</div>
</template>

<script>
import { getAllChannelsAPI, addUserChannelAPI, deleteUserChannelAPI } from '@/api'
import { setItem } from '@/utils/storage'
export default {
	data() {
		return {
			allChannels: [],
			isEdit: false,
			fixedChannelsId: [0],
		}
	},
	props: {
		channels: {
			type: Array,
			required: true,
		},
		activeIndex: {
			type: Number,
			required: true,
		},
	},
	methods: {
		// 获取全部的频道
		async getAllChannels() {
			try {
				let {
					data: {
						data: { channels },
					},
				} = await getAllChannelsAPI()
				this.allChannels = channels
			} catch (error) {
				this.$toast('获取频道失败')
			}
		},

		// 添加频道
		async addChannel(channel) {
			this.channels.push(channel)
			// 数据持久化处理
			//如果是登录状态
			if (this.$store.user) {
				try {
					await addUserChannelAPI([
						{
							id: channel.id, // 频道的id
							seq: this.channels.length, // 频道的序号
						},
					])
				} catch (error) {
					console.log(error)
				}
			}
			// 如果不是登录状态
			else {
				setItem('CHANNELS', this.channels)
			}
		},

		// 点击-我的频道中的频道
		async changeChannel(channel, index) {
			if (this.isEdit) {
				// 处于编辑状态
				// 从我的频道中删除该列表
				this.channels.splice(index, 1)
				// 如果点击的索引是当前激活索引之前，则当前激活索引减一
				if (index <= this.activeIndex) {
					console.log(this.activeIndex)
					this.$emit('change-active', this.activeIndex - 1, true)
				}
				// 数据持久化处理
				// 如果是登录状态
				if (this.$store.user) {
					try {
						await deleteUserChannelAPI(channel.id)
					} catch (error) {
						console.log(error)
					}
				}
				// 如果不是登录状态
				else {
					setItem('CHANNELS', this.channels)
				}
			} else {
				// 处于非编辑状态
				this.$emit('change-active', index, false)
			}
		},
	},

	computed: {
		// 推荐频道----所有频道-用户频道
		reChannels() {
			return this.allChannels.filter((a_channel) => {
				if (!this.channels.find((b_channel) => b_channel.name === a_channel.name)) {
					return a_channel
				}
			})
		},
	},

	created() {
		this.getAllChannels()
	},
}
</script>

<style scoped lang="less">
.edit-channels {
	padding-top: 82px;

	::v-deep .van-cell {
		&:not(:first-child) {
			margin-top: 20px;
		}
	}
	.cell-title {
		font-size: 32px;
		color: #333;
	}

	::v-deep .cell-btn {
		width: 104px;
		height: 48px;
		font-size: 26px;
		color: #f85959;
		border: 1px solid #f85959;
	}

	::v-deep .van-grid-item__content {
		background-color: #f4f5f6;
		width: 160px;
		height: 86px;
		white-space: nowrap;
		.van-grid-item__icon-wrapper {
			position: absolute;
			top: -10px;
			right: -10px;
			z-index: 2;
		}
		.van-icon-clear {
			font-size: 30px;
			color: #cacaca;
		}
		.van-icon-plus {
			font-size: 24px;
		}
		.van-grid-item__text,
		.text {
			font-size: 28px;
			color: #222;
			margin-left: 6px;
		}
		.active {
			color: red;
		}
	}
}
</style>
