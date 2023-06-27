import request from '@/utils/request'

// 获取用户的基本信息
export const getUserInfo = () => {
	return request({
		method: 'GET',
		url: '/v1_0/user',
	})
}

// 获取用户频道
export const getUserChannels = () => {
	return request({
		method: 'GET',
		url: '/v1_0/user/channels',
	})
}

// 获取文章列表
export const getArticleList = (params) => {
	return request({
		method: 'GET',
		url: '/v1_0/articles',
		params,
	})
}

// 获取所有的频道列表
export const getAllChannels = () => {
	return request({
		method: 'GET',
		url: '/v1_0/channels',
	})
}

// 添加用户频道
export const addUserChannel = (channel) => {
	return request({
		method: 'PATCH',
		url: '/v1_0/user/channels',
		data: channel,
	})
}

// 删除用户频道
export const deleteUserChannel = (channelId) => {
	return request({
		method: 'DELETE',
		url: `/v1_0/user/channels/${channelId}`,
	})
}
