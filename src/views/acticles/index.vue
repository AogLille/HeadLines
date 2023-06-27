<template>
	<div class="acticles">
		<!-- 导航栏 -->
		<van-nav-bar class="page-nav-bar" title="文章详情" fixed>
			<template #left>
				<van-icon name="arrow-left" size="18" @click="$router.back()" />
			</template>
		</van-nav-bar>

		<!-- 内容区域 -->
		<div class="container">
			<div class="title">{{ article.title }}</div>
			<van-cell center class="user_info">
				<van-image slot="icon" :src="article.aut_photo" width="70" height="70" fit="cover" round class="avator"></van-image>
				<div slot="title">{{ article.aut_name }}</div>
				<div slot="label">{{ article.pubdate | formatTime }}</div>
				<van-button block :type="!article.is_followed ? 'info' : ''" native-type="submit" round :icon="!article.is_followed ? 'plus' : ''" class="btn_guanzhu" @click="guanzhu" :loading="isFollowindLoading">{{ article.is_followed ? '已关注' : '关注' }}</van-button>
			</van-cell>
			<div class="content markdown-body" v-html="article.content" ref="content"></div>
			<van-divider dashed>正文结束</van-divider>

			<!-- 评论列表 -->
			<van-cell>全部评论</van-cell>
			<comment-list :artId="articleId" :list="commentList" @reply-comment="onReplyComment"></comment-list>
		</div>

		<!-- 底部区域 -->
		<div class="contact">
			<van-button type="default" round class="write" @click="write_comment">写评论</van-button>
			<!-- 点赞按钮 -->
			<van-icon :name="article.attitude === -1 ? 'good-job-o' : 'good-job'" class="goodjob" :color="article.attitude === -1 ? '#777' : 'red'" @click="dianzan" />
			<!-- 评论按钮 -->
			<van-icon name="comment-o" class="comment" color="#777" :badge="article.comm_count" />
			<!-- 收藏按钮 -->
			<van-icon :name="!article.is_collected ? 'star-o' : 'star'" class="star" :color="!article.is_collected ? '#777' : 'red'" @click="star" />
			<!-- 分享按钮 -->
			<van-icon name="share-o" class="share" color="#777" />
		</div>

		<!-- 写评论弹窗 -->
		<van-popup v-model="isWriteCommentShow" position="bottom">
			<write-comment :target="article.art_id" @post-comment="updateComment"></write-comment>
		</van-popup>

		<!-- 回复评论弹窗 -->
		<van-popup v-model="isReplyCommentShow" position="bottom">
			<reply-comment v-if="isReplyCommentShow" :artId="article.art_id" :comment="replyComment" @close="isReplyCommentShow = false"></reply-comment>
		</van-popup>
	</div>
</template>

<script>
import CommentList from '@/views/acticles/component/comment-list'
import writeComment from './component/write-comment.vue'
import replyComment from './component/reply-comment.vue'
import { getArticleAPI, followingAPI, cancelFollowingAPI, dianzanAPI, cancelDianzanAPI, starAPI, cancelStaAPI } from '@/api'
import { ImagePreview } from 'vant'
import '@/utils/dayjs'
export default {
	name: 'articles',
	components: {
		[CommentList.name]: CommentList,
		[writeComment.name]: writeComment,
		[replyComment.name]: replyComment,
	},
	data() {
		return {
			article: {}, //当前文章的信息
			imgsSrc: [],
			isFollowindLoading: false, //关注的加载变量
			isWriteCommentShow: false, //编写评论的弹框
			isReplyCommentShow: false, //回复评论的弹窗
			commentList: [], //评论列表
			replyComment: {},
		}
	},
	props: {
		articleId: {
			type: String,
			required: true,
		},
	},
	created() {
		this.getArticle()
	},
	methods: {
		/**
		 * 获取文章详情
		 */
		async getArticle() {
			// 1、渲染数据
			const {
				data: { data },
			} = await getArticleAPI(this.articleId)
			this.article = data

			// 2、实现图片预览效果
			let content = this.$refs.content
			await this.$nextTick()
			let imgs = content.querySelectorAll('img')
			imgs.forEach((img, index) => {
				this.imgsSrc.push(img.src)
				img.addEventListener('click', () => {
					ImagePreview({
						images: this.imgsSrc,
						startPosition: index,
					})
				})
			})
		},
		/**
		 * 关注按钮处理
		 */
		async guanzhu() {
			this.isFollowindLoading = true
			// 如果关注，取消关注
			if (this.article.is_followed) {
				await cancelFollowingAPI(this.article.aut_id)
			} else {
				// 如果未关注，则关注
				await followingAPI(this.article.aut_id)
			}
			this.article.is_followed = !this.article.is_followed
			this.isFollowindLoading = false
			this.$toast.success({
				message: `${this.article.is_followed ? '成功关注' : '取消关注'}`,
			})
		},
		/**
		 * 点赞按钮处理
		 */
		async dianzan() {
			if (this.article.attitude === -1) {
				await dianzanAPI(this.article.art_id)
				this.article.attitude = 1
			} else {
				await cancelDianzanAPI(this.article.art_id)
				this.article.attitude = -1
			}
			if (this.article.attitude === -1) {
				this.$toast.success({
					message: '取消点赞',
				})
			} else {
				this.$toast.success({
					message: '点赞成功',
				})
			}
		},
		/**
		 * 收藏按钮处理
		 */
		async star() {
			// 首先判断该文章是否以及收藏
			if (this.article.is_collected) {
				await cancelStaAPI(this.article.art_id)
			} else {
				await starAPI(this.article.art_id)
			}
			this.article.is_collected = !this.article.is_collected
			if (this.article.is_collected) {
				this.$toast.success('收藏成功')
			} else {
				this.$toast.success('取消收藏')
			}
		},
		/**
		 * 评论按钮处理
		 */
		write_comment() {
			this.isWriteCommentShow = true
		},
		/**
		 * 发布评论的处理事件
		 * @param {Object} comment
		 */
		updateComment(comment) {
			// 将发布的评论添加到评论列表最前面
			this.commentList.unshift(comment)
			// 评论数加一
			this.article.comm_count++
			// 关闭评论弹窗
			this.isWriteCommentShow = false
		},
		onReplyComment(comment) {
			this.isReplyCommentShow = true
			this.replyComment = comment
		},
	},
}
</script>

<style scoped lang="less">
.acticles {
	.container {
		position: fixed;
		top: 92px;
		bottom: 87px;
		left: 0;
		right: 0;
		overflow-y: auto;
		background-color: #fff;
		.title {
			padding: 58px 53px 57px 29px;
			font-size: 40px;
			color: #3a3a3a;
		}
		.user_info {
			padding: 0 39px 70px 29px;
			overflow-y: auto;
			.avator {
				margin-right: 10px;
			}
			.van-cell__value {
				flex: unset;
				.btn_guanzhu {
					width: 170px;
					height: 58px;
					border: none;
				}
			}
			.van-cell__label {
				margin-top: 0;
			}
		}
		.content {
			padding: 0 43px 45px;
		}
	}

	.contact {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		height: 87px;
		background-color: #fff;
		display: flex;
		align-items: center;
		justify-content: space-evenly;
		.write {
			width: 280px;
			height: 43px;
			.van-button__content {
				font-size: 30px;
				color: #a7a7a7;
				justify-content: unset;
			}
		}
		.van-icon {
			font-size: 40px;
		}
	}
}
</style>
