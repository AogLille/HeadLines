// 封装本地存储模块

// 存储数据
export const setItem = (key, value) => {
	return localStorage.setItem(key, JSON.stringify(value))
}
// 获取数据
export const getItem = (key) => {
	return JSON.parse(localStorage.getItem(key))
}

// 删除数据
export const delItem = (key) => {
	return localStorage.removeItem(key)
}
