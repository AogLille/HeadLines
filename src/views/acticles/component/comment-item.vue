<template>
	<van-cell :title="comment.content" class="com">
		<van-image class="advator" fit="cover" slot="icon" :src="comment.aut_photo" />
		<div slot="title">
			<div class="title">
				<div class="name">{{ comment.aut_name }}</div>
				<van-button
					class="like-btn"
					:class="{
						liked: comment.is_liking,
					}"
					:icon="comment.is_liking ? 'good-job' : 'good-job-o'"
					:loading="commentLoading"
					@click="onCommentLike"
					>{{ comment.like_count }}</van-button
				>
			</div>
			<div class="content">{{ comment.content }}</div>
			<div class="bottom">
				<span class="date">{{ comment.pubdate }}</span
				><van-button round size="mini" class="btn" @click="$emit('reply',comment)">{{ comment.reply_count }} 回复</van-button>
			</div>
		</div>
	</van-cell>
</template>

<script>
import { dianzanCommnetsAPI, cancelDianzanCommnetsAPI } from '@/api'
export default {
	name: 'comment-item',
	props: {
		comment: {	//当前评论有关数据
			type: Object,
			required: true,
		},
	},
	data() {
		return {
			commentLoading: false,
		}
	},
	methods: {
		async onCommentLike() {
			this.commentLoading = true
			try {
				if (this.comment.is_liking) {
					await cancelDianzanCommnetsAPI(this.comment.com_id)
					this.comment.like_count--
					this.$toast.success('取消点赞')
				} else {
					await dianzanCommnetsAPI(this.comment.com_id)
					this.comment.like_count++
					this.$toast.success('点赞成功')
				}
				this.comment.is_liking = !this.comment.is_liking
			} catch (error) {
				this.$toast(error)
			}
			this.commentLoading = false
		},
	},
}
</script>

<style scoped lang="less">
.com {
	.advator {
		width: 72px;
		height: 72px;
		margin-right: 25px;
	}
	.title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		.name {
			color: #406599;
			font-size: 26px;
		}
		.like-btn {
			height: 30px;
			padding: 0;
			border: none;
			font-size: 19px;
			line-height: 30px;
			margin-right: 7px;
			.van-icon {
				font-size: 30px;
			}
			&.liked {
				color: #e5645f;
			}
		}
	}
	.content {
		.comment-content {
			font-size: 32px;
			color: #222222;
			word-break: break-all;
			text-align: justify;
		}
	}
	.bottom {
		display: flex;
		align-items: center;
		.date {
			font-size: 19px;
			color: #222;
			margin-right: 25px;
		}
		.btn {
			height: 48px;
			line-height: 48px;
			font-size: 21px;
			color: #222;
		}
	}
}
</style>
