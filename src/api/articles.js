import request from '@/utils/request'

// 获取文章详情
export const getArticle = (article_id) => {
    return request({
        method:'GET',
        url:`/v1_0/articles/${article_id}`
    })
}

// 关注用户
export const following = user_id => {
    return request({
        method:'POST',
        url:'/v1_0/user/followings',
        data:{
            target:user_id
        }
    })
}

// 取消关注用户
export const cancelFollowing = user_id => {
    return request({
        method:'DELETE',
        url:`/v1_0/user/followings/${user_id}`
    })
}

// 对文章进行点赞
export const dianzan = art_id => {
    return request ({
        method:'POST',
        url:'/v1_0/article/likings',
        data:{
            target:art_id
        }
    })
}

// 对文章取消点赞
export const cancelDianzan = art_id => {
    return request ({
        method:'DELETE',
        url:`/v1_0/article/likings/${art_id}`,
    })
}

// 对文章进行收藏
export const star = art_id => {
    return request ({
        method:'POST',
        url:'/v1_0/article/collections',
        data:{
            target:art_id
        }
    })
}

// 对文字取消收藏
export const cancelStar = art_id => {
    return request ({
        method:'DELETE',
        url:`/v1_0/article/collections/${art_id}`,
    })
}

// 获取评论
export const getArticleComments = params => {
    return request({
        method:'GET',
        url:'/v1_0/comments',
        params
    })
}

// 对评论进行点赞
export const dianzanCommnets = comment_id => {
    return request({
        method:'POST',
        url:'/v1_0/comment/likings',
        data:{
            target:comment_id
        }
    })
}


// 取消对评论进行点赞
export const cancelDianzanCommnets = comment_id => {
    return request({
        method:'DELETE',
        url:`/v1_0/comment/likings/${comment_id}`,
    })
}

// 发布评论
export const postComment = data => {
    return request({
        method:'POST',
        url:'/v1_0/comments',
        data
    })
}