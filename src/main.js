import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/styles/index.less' //加载全局公共样式
import 'amfe-flexible' //动态设置rem基准值
import Vant from 'vant'
import 'vant/lib/index.css'
import '@/styles/github-markdown.css'
import '@/utils/dayjs'
import { Uploader } from 'vant';

Vue.use(Uploader);
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount('#app')
