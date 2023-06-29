// 用户资料页
import request from '@/utils/request'

// 获取用户资料
export const getUser = () => {
	return request({
		method: 'GET',
		url: '/v1_0/user/profile',
	})
}

// 编辑用户资料
export const editUser = (data) => {
	return request({
		method: 'PATCH',
		url: '/v1_0/user/profile',
		data,
	})
}

// 更新用户头像
export const updateAvator = data => {
	return request({
		method:'PATCH',
		url:'/v1_0/user/photo',
		data
	})
}