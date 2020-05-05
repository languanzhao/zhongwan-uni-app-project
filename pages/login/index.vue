<template>
	<view class="login">
		<view class="name">考拉上学</view>
		<view class="summary">掌览天下名校</view>
		<view class="changeLoginWay" @click="changeLoginWay">{{loginWayBool ? '密码登录': '短信登录'}}</view>
		<!-- 验证码登录 -->
		<view class="codeLogin" v-if="loginWayBool">
			<input class="mobile" type="text" v-model="mobile" placeholder="手机号登录" />
			<view class="getCode">
				<input class="inputCode" type="text" v-model="code" placeholder="验证码" />
				<view :class="['codeBox']" @click="getCodeBtn">
					<count-down ref='countDown'></count-down>
				</view>
			</view>
			<view class="loginBtn" @click="codeLogin">登录</view>
		</view>
		<!-- 密码登录 -->
		<view class="passwordLogin" v-else>
			<input class="mobile" type="text" v-model="phone" placeholder="手机号登录" />
			<input class="mobile" type="password" v-model="password" placeholder="密码登录" />
			<view class="operBtn">
				<view class="item reg" @click="registerBtn">注册</view>
				<view class="item login" @click="passwordLogin">登录</view>
			</view>
		</view>
		<!-- 微信登录 -->
		<view class="wayForWX">
			<image class="image" src="../../static/login/wx.png" mode=""></image>
			<view class="word">其他登录方式</view>
		</view>
		  <!-- #ifdef MP-WEIXIN -->
		  <button open-type="getUserInfo" @getuserinfo="wxLogin" withCredentials="true">微信登录</button>
		  <!-- #endif -->
		  <!-- #ifdef APP-PLUS -->
		  <button open-type="getUserInfo" @click="appwxLogin" withCredentials="true">微信登录</button>
		  <!-- #endif -->
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	import {
		regExp
	} from '@/common/utils.js'
	import countDown from '@/components/countdown/index'
	export default {
		components: {
			countDown
		},
		data() {
			return {
				stateBool:false,
				loginWayBool:false,
				mobile: '',
				code: '',
				verification_key:'',
				phone:'',
				password:'',
			}
		},
		computed: {
			...mapState(['userInfo'])
		},
		onLoad() {

		},
		methods: {
			//切换登录方式
			changeLoginWay(){
				this.loginWayBool = !this.loginWayBool
				this.mobile = ''
				this.code = ''
				this.phone = ''
				this.password = ''
			},
			//去注册
			registerBtn(){
				uni.navigateTo({
					url:'/pages/login/register'
				})
			},
			//点击获取验证码
			getCodeBtn(){
				if(!this.$refs.countDown.stateBool()){
					if (regExp('mobile', this.mobile)) {
						this.$refs.countDown.sendCode()
						this.$http({
							api: '/koala/v1/verificationCodes',
							method: 'POST',
							params: {
								phone: this.mobile,
								verification_type:'login'
							}
						}).then(res => {
							this.verification_key = res.data.key
						}).catch(err => {
					
						})
					} else {
						uni.showToast({
							icon: 'none',
							title: '请输入正确的手机号'
						})
					}
				}
			},
			//验证码登录
			codeLogin() {
				this.judgeFun().then(() => {
						let params = {
							phone: this.mobile,
							login_type:'sms',
							verification_key:this.verification_key,
							verification_code:this.code,
						}
						this.$http({
							api: 'koala/v1/authorizations',
							method: 'POST',
							params:params
						}).then(res => {
							// 保存token
							this.$store.commit('saveToken',{
								token_type:res.data.token_type,
								access_token:res.data.access_token
							})
							// 获取用户信息并保存用户信息到vuex
							this.$http({
								api: 'koala/v1/user',
								method: 'GET',
							}).then(res => {
								this.$store.commit('setUserInfo',res.data)
							}).catch(err => {
										
							})
							// 用户角色
							this.$http({
								api: 'koala/v1/user/roles',
								method: 'GET',
							}).then(res => {
								this.$store.commit('setRoles',res.data)
							}).catch(err => {
										
							})
							// 权限列表
							this.$http({
								api: 'koala/v1/user/permissions',
								method: 'GET',
							}).then(res => {
								this.$store.commit('setPermissions',res.data)
							}).catch(err => {
										
							})
							uni.showToast({
								title:'登录成功',
								success:() => {
									setTimeout(() => {
										uni.navigateTo({
											url:'/pages/login/enterPage'
										})
									},1000)
								}
							})
							
						}).catch(err => {
									
						})
				}).catch(err => {})
			},
			//验证码/密码登录判断
			judgeFun() {
				return new Promise((resolve, reject) => {
					let tip = ''
					if(this.loginWayBool){
						if (!regExp('mobile', this.mobile)) {
							tip = '请输入正确的手机号'
							reject()
						} else if (!this.code) {
							tip = '请输入验证码'
							reject()
						} else {
							resolve()
						}
					}else{
						if (!regExp('mobile', this.phone)) {
							tip = '请输入正确的手机号'
							reject()
						} else if (!this.password) {
							tip = '请输入密码'
							reject()
						} else {
							resolve()
						}
					}
					if (tip) {
						uni.showToast({
							icon: 'none',
							title: tip
						})
					}
				})
			},
			//密码登录
			passwordLogin(){
				this.judgeFun().then(() => {
					let params = {
							username: this.phone,
							login_type:'username',
							password:this.password,
					}
					 this.$http({
					 	api: 'koala/v1/authorizations',
					 	method: 'POST',
					 	params:params
					 }).then(res => {
					 	//保存token
					 	this.$store.commit('saveToken',{
					 		token_type:res.data.token_type,
					 		access_token:res.data.access_token
					 	})
					 	//获取用户信息并保存用户信息到vuex
					 	this.$http({
					 		api: 'koala/v1/user',
					 		method: 'GET',
					 	}).then(res => {
					 		this.$store.commit('setUserInfo',res.data)
					 	}).catch(err => {
					 				
					 	})
					 	//用户角色
					 	this.$http({
					 		api: 'koala/v1/user/roles',
					 		method: 'GET',
					 	}).then(res => {
					 		this.$store.commit('setRoles',res.data)
					 	}).catch(err => {
					 				
					 	})
					 	//权限列表
					 	this.$http({
					 		api: 'koala/v1/user/permissions',
					 		method: 'GET',
					 	}).then(res => {
					 		this.$store.commit('setPermissions',res.data)
					 	}).catch(err => {
					 				
					 	})
					 	uni.showToast({
					 		title:'登录成功',
					 		success:() => {
					 			setTimeout(() => {
					 				uni.navigateTo({
					 					url:'/pages/login/enterPage'
					 				})
					 			},1000)
					 		}
					 	})
					 	
					 }).catch(err => {
					 			
					 })
				}).catch(err => {})
			},
			//密码登录验证
			
			// 微信登录
			wxLogin(){
				this.appwxLogin()
			},
			//app微信授权登录
			appwxLogin() {
				uni.getProvider({
					service: 'oauth',
					success: res => {
						if (~res.provider.indexOf('weixin')) {
							uni.login({
								provider: 'weixin',
								success: loginRes => {
									console.log('-------获取openid(unionid)-----');
									console.log(JSON.stringify(loginRes));
									let params = {
										access_token:loginRes.authResult.access_token,
										openid:loginRes.authResult.openid
									}
									this.$http({
										api: 'socials/weixin/authorizations',
										method: 'POST',
										params:params
									}).then(wxRes => {
										console.log(wxRes,'wxRes')
									}).catch(err => {
												
									})
									// 获取用户信息
									// uni.getUserInfo({
									// 	provider: 'weixin',
									// 	success: infoRes => {
									// 		console.log(infoRes, 'i')
									// 		this.$store.commit('setUserInfo', infoRes.userInfo)
									// 		uni.navigateBack()
									// 	}
									// });
								}
							});
						}
					}
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	@font-face {
	  font-family: 'BigruiqiaoGB1.0';
	  src: url("https://languanzhao.github.io/ttf/锐字锐线俏皮简1.0.ttf") format("truetype")
	}
	.login {
		.name{
			font-family: 'BigruiqiaoGB1.0';
			font-size: 50rpx;
			text-align: center;
			margin: 80rpx 0 60rpx;
		}
		.summary{
			margin-bottom: 30rpx;
			text-align: center;
		}
		.mobile {
			width: 520rpx;
			padding: 22rpx 20rpx;
			border: 1rpx solid #f2f2f2;
			background: #fafafa;
			color: #838383;
			border-radius: 10rpx;
			margin: 0 auto 20rpx;
		}
		.getCode{
			display: flex;
			border: 1rpx solid #f2f2f2;
			background: #fafafa;
			margin: 20rpx auto;
			width: 560rpx;
			border-radius: 10rpx;
			.inputCode{
				width: 360rpx;
				padding: 22rpx 20rpx;
			}
			.codeBox{
				display: flex;
				align-items: center;
			}
		}
		.operBtn{
			display: flex;
			align-items: center;
			justify-content: space-between;
			width: 560rpx;
			margin: 30rpx auto;
			.item{
				width: 48%;
				padding: 20rpx 0;
				text-align: center;
				background: #999;
				border-radius: 10rpx;
			}
			.login{
				background: #006EFF;
				color: #fff;
			}
		}
		.loginBtn{
			width: 560rpx;
			background: #9bcbf7;
			color: #fff;
			text-align: center;
			border-radius: 10rpx;
			margin: 60rpx auto;
			padding: 22rpx 0;
		}
		.wayForWX{
			display: flex;
			justify-content: center;
			align-items: center;
			.image{
				width: 50rpx;
				height: 50rpx;
			}
			.word{
				color: #3588d5;
				margin-left: 30rpx;
			}
		}
		.wxLogin {
			width: 200rpx;
			margin: 30rpx auto;
			background: green;
			color: #fff;
			text-align: center;
		}
	}
</style>
