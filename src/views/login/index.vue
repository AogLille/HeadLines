<template>
	<div class="login-container">
		<!-- 导航栏 -->
		<van-nav-bar class="page-nav-bar" title="登录">
			<template #left>
				<van-icon name="arrow-left" size="18" @click="$router.back()"/>
			</template>
		</van-nav-bar>

		<!-- 登录表单 -->
		<van-form @submit="onSubmit" ref="form">
			<!-- 手机号输入框 -->
			<van-field v-model="mobile" name="mobile" placeholder="请输入手机号" :rules="loginRules.mobile" type="number" maxlength="11">
				<!-- 通过插槽实现左侧图标 -->
				<template #left-icon><i class="iconfont icon-shouji tubiao"></i></template>
			</van-field>

			<!-- 验证码输入框 -->
			<van-field v-model="code" name="code" placeholder="请输入验证码" class="input-sms" :rules="loginRules.code" type="number" maxlength="6">
				<!-- 通过插槽实现左侧图标 -->
				<template #left-icon><i class="iconfont icon-yanzhengma tubiao"></i></template>
				<!-- 通过插槽实现发送验证码的按钮 -->
				<template #button>
					<van-count-down :time="time" format="ss s后重新点击" v-if="isTimeShow" @finish="finish" />
					<van-button class="btn-send-sms" size="small" type="default" round @click="sendSms" native-type="button" ref="btnSendSms" v-else>发送验证码</van-button>
				</template>
			</van-field>

			<!-- 登录按钮 -->
			<div class="btnLogin">
				<van-button block type="info" native-type="submit">登录</van-button>
			</div>
		</van-form>
	</div>
</template>

<script>
import { getSmsAPI, loginAPI } from '@/api'
export default {
	name: 'LoginPage',
	data() {
		return {
			mobile: '', //手机号
			code: '', //验证码
			time: 60 * 1000, //发送验证码倒计时的时间
			isTimeShow: false, //倒计时是否显示
			// 下面是表单的所有验证规则
			loginRules: {
				// 手机号有关的验证规则
				mobile: [
					{ required: true, message: '手机号码不能为空' },
					{ pattern: /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1589]))\d{8}$/, message: '手机号格式错误' },
				],
				// 验证码有关的验证规则
				code: [
					{ required: true, message: '验证码不能为空' },
					{ pattern: /\d{6}/, message: '验证码格式错误' },
				],
			},
		}
	},
	methods: {
		// 发送验证码
		async sendSms() {
			// 校验手机号码
			try {
				await this.$refs.form.validate('mobile')
				console.log('发送验证码-手机号验证通过')
			} catch (error) {
				console.log('发送验证码-手机号验证失败')
				return
			}
			// 验证通过显示倒计时
			this.isTimeShow = true
			// 请求发送验证码
			try {
				await getSmsAPI(this.mobile)
				console.log('验证码发送成功')
			} catch (error) {
				console.log('验证码发送失败')
			}
		},
		// 倒计时结束时的回调函数
		finish() {
			this.isTimeShow = false
		},
		// 登录
		async onSubmit(values) {
			// 获取表单数据（Vant内置方法）
			let user = values
			// 加载弹框
			this.$toast.loading({
				message: '加载中...',
				forbidClick: true,
				loadingType: 'spinner',
				duration: 0,
			})
			// 表单验证成功的话--->>>请求登录
			try {
				let {
					data: { data },
				} = await loginAPI(user)
				console.log('登录成功', data)
				this.$store.commit('setUser', data) //将用户信息存入,vuex(token和retoken)-----注意要同时存入本地存储,实现数据持久化
				this.$toast.success('登录成功')
				this.$router.push('/home')
			} catch (err) {
				if (err.response.status === 400) {
					console.log(err)
					this.$toast.fail('手机号或验证码错误')
				} else {
					this.$toast.fail('登录失败,请稍后重试')
				}
			}
			// 登录成功后，处理后续操作
		},
	},
}
</script>

<style lang="less" scoped>
.login-container {
	.btnLogin {
		margin: 53px 33px;
	}
	.tubiao {
		font-size: 37px;
	}
	.btn-send-sms {
		width: 152px;
		height: 46px;
		line-height: 46px;
		border: 0;
		font-size: 22px;
		color: #666;
		background-color: #ededed;
	}
	/deep/ .input-sms .van-field__control {
		border-right: 2px solid #eee;
	}
}
</style>
