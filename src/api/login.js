import request from '@/utils/request'

// 验证码请求
export const getSms = (phone) => {
	return request({
		method: 'GET',
		url: `/v1_0/sms/codes/${phone}`,
	})
}

// 登录请求
export const login = (data) => {
	return request({
		method: 'POST',
		url: '/v1_0/authorizations',
		data,
	})
}
