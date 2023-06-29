<template>
	<div>
		<keep-alive :include="cachePages">
			<router-view></router-view>
		</keep-alive>
	</div>
</template>

<script>
import { mapState } from 'vuex';
export default {
	name: 'App',
	computed:{
		...mapState(['cachePages'])
	}
}
</script>

<style scoped lang="less"></style>
