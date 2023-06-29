<template>
	<div class="chat">
		<van-nav-bar class="page-nav-bar" title="小智同学">
			<template #left>
				<van-icon name="arrow-left" size="18" @click="$router.back()" />
			</template>
		</van-nav-bar>
		<van-cell-group>
			<van-cell  v-for="(data,index) in messages" :value="data.msg" :key="index"/>
		</van-cell-group>
		<div class="bottom">
			<van-field v-model="value" placeholder="请输入消息" :border="false" />
			<van-button size="mini" round @click="sendMessage">发送</van-button>
		</div>
	</div>
</template>

<script>
import { io } from 'socket.io-client'
import { getItem,setItem } from '@/utils/storage'
export default {
	data() {
		return {
			value: '',
			messages: getItem('msg')||[],
			socket: null,
		}
	},
	watch:{
		messages(){
			setItem('msg',this.messages)
		}
	},
	created() {
		this.socket = io('https://toutiao.itheima.net', {
			query: {
				token: getItem('TOUTIAO_TOKEN').token,
			},
			transports: ['websocket'],
		})
		this.socket.on('connect', () => {
			this.$toast.success('连接成功')
		})

		this.socket.on('disconnect', () => {
			this.$toast.success('断开连接')
		})

		this.socket.on('message', (data) => {
			this.messages.push(data)
		})
	},
	methods: {
		sendMessage() {
			const data = {
				msg: this.value,
				timestamp: Date.now(),
			}
			this.messages.push(data)
			this.value = ''
			this.socket.emit('message',data)
		},
	},
}
</script>

<style lang="less" scoped>
.chat {
	.van-nav-bar {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
	}

	.van-cell-group {
		position: fixed;
		left: 0;
		right: 0;
		top: 92px;
		bottom: 88px;
		overflow-y: auto;
	}
	::v-deep .bottom {
		background-color: #f4f5f6;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		display: flex;
		align-items: center;
		.van-field {
			width: 85vw;
			padding-right: 15px;
			background-color: transparent;
			.van-field__control {
				height: 50px;
				border-radius: 20px;
				background-color: #fff;
			}
		}
		.van-button {
			flex: 1;
			background-color: transparent;
			border: 0;
			.van-button__text {
			}
		}
	}
}
</style>
