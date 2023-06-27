import Vue from 'vue'
import dayjs from 'dayjs'
// 加载中文语言包
import 'dayjs/locale/zh-cn'
// 加载相对时间插件
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)
// 默认为英文，配置成中文
dayjs.locale('zh-cn')
Vue.filter('formatTime', (value) => {
	return dayjs().to(dayjs(value))
})
