<template>
	<!-- 文章组件 -->
	<van-cell class="article-item" :to="{
				name:'article',
				params:{
					articleId:article.art_id
				}
			}">
		<div slot="title" class="title van-multi-ellipsis--l2">{{ article.title }}</div>
		<!-- 当只有一张封面图片时 -->
		<div slot="default" v-if="article.cover.type === 1" class="default">
			<van-image class="right-cover" :src="article.cover.images[0]" fit="cover" />
		</div>
		<div slot="label" class="label">
			<!-- 当有三张图片封面时 -->
			<div v-if="article.cover.type === 3" class="cover-3">
				<van-image v-for="(img, index) in article.cover.images" :key="index" :src="img" class="img-item" />
			</div>
			<span class="label-item">{{ article.aut_name }}</span>
			<span class="label-item">{{ article.comm_count }}评论</span>
			<span class="label-item">{{ article.pubdate | formatTime }}</span>
		</div>
	</van-cell>
</template>

<script>
import '@/utils/dayjs'
export default {
	props: {
		article: {
			type: Object,
			required: true,
		},
	},
}
</script>

<style scoped lang="less">
.article-item {
	padding-left: 23px;
	padding-right: 23px;
	.m-l-r-4 {
		margin-left: 4px;
		margin-right: 4px;
	}
	.van-cell__value {
		flex: unset;
		width: 232px;
		height: 146px;
	}
	.van-image {
		width: 232px;
		height: 146px;
	}
	.right-cover {
		margin-left: 18px;
	}
	.title {
		font-size: 32px;
		color: #3a3a3a;
	}
	.label-item {
		margin-right: 26px;
		font-size: 23px;
		color: #b4b4b4;
	}
	.cover-3 {
		margin: 30px 0;
		.img-item {
			&:not(:last-child) {
				margin-right: 4px;
			}
		}
	}
}
</style>
