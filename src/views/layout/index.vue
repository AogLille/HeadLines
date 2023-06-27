<template>
	<div class="layout-container">
		<!-- 子路由出口 -->
		<router-view />
		<!-- 底部导航栏 -->
		<van-tabbar route>
			<van-tabbar-item to="/home" exact>
				<span>首页</span>
				<i slot="icon" class="iconfont icon-shouye"></i>
			</van-tabbar-item>
			<van-tabbar-item to="/question"><span>问答</span> <i slot="icon" class="iconfont icon-wenda"></i></van-tabbar-item>
			<van-tabbar-item to="/videos"><span>视频</span><i slot="icon" class="iconfont icon-zuopin"></i> </van-tabbar-item>
			<van-tabbar-item to="/my"
				><span>{{ user ? '我的' : '未登录' }}</span> <i slot="icon" class="iconfont icon-wode"></i
			></van-tabbar-item>
		</van-tabbar>
	</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
	data() {
		return {}
	},
	computed: {
		...mapState(['user']),
	},
}
</script>

<style lang="less" scoped>
.layout-container {
	.iconfont {
		font-size: 40px;
	}
}
</style>
