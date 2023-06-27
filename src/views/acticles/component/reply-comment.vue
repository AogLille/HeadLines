<template>
	<div class="replyPop">
		<!-- 回复评论弹窗 -->
		<!-- tab栏 -->
		<van-nav-bar :title="comment.reply_count > 0 ? `${comment.reply_count}条回复` : '暂无回复'">
            <van-icon slot="left" name="cross" @click="$emit('close')"></van-icon>
        </van-nav-bar>
		<!-- 源评论 -->
		<comment-item :comment="comment"></comment-item>
		<van-cell>全部回复</van-cell>
		<!-- 回复列表 -->
		<comment-list :list="replyList" type="c" :artId="comment.com_id"></comment-list>
		<!-- 发布回复 -->
		<div class="bottom"><van-button round class="reply-btn" @click="isWriteCommentShow = true">回复</van-button></div>

		<!-- 回复输入框 -->
		<van-popup v-model="isWriteCommentShow" position="bottom">
			<write-comment :target="comment.com_id" :artId="artId" @post-comment="updateComment"></write-comment>
		</van-popup>
	</div>
</template>

<script>
import commentItem from './comment-item.vue'
import commentList from './comment-list.vue'
import writeComment from './write-comment.vue'
export default {
	name: 'reply-comment',
	components: {
		[commentItem.name]: commentItem,
		[commentList.name]: commentList,
		[writeComment.name]: writeComment,
	},
	props: {
		comment: {
			//当前所回复的评论对象
			type: Object,
			required: true,
		},
        artId:{
            type:String,
            required:true
        }
	},
	data() {
		return {
			replyList: [],
            isWriteCommentShow:false    //写评论的弹窗
		}
	},
    methods:{
        updateComment(comment){
            // 将
            this.replyList.unshift(comment)
            this.isWriteCommentShow = false
        }
    }
}
</script>

<style lang="less" scoped>
.replyPop {
	padding-bottom: 60px;
	.bottom {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		::v-deep .reply-btn {
			width: 600px;
			height: 60px;
		}
	}
}
</style>
