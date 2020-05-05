<template>
	<view class="register">
		<view class="mobile item">
			<view class="title">手机号 +86</view>
			<input class="input" type="number" v-model="mobile" placeholder="请输入手机号"/>
		</view>
		<view class="getCode item">
			<view class="title">验证码</view>
			<view class="input">
				<input class="inputCode" type="text" v-model="verification_code" placeholder="请输入验证码"/>
				<view :class="['codeBtn',state ? 'getting' : '']" @click="getCode">{{state ? '稍等' + seconds + 's' : '获取验证码'}}</view>
			</view>
		</view>
		<view class="password item">
			<view class="title">设置密码</view>
			<input class="input" type="password" v-model="password" placeholder="6位以上,字母、数字或符号组合"/>
		</view>
		<view class="password item">
			<view class="title">确认密码</view>
			<input class="input" type="password" v-model="pwd" placeholder="请再次填写密码"/>
		</view>
		<view class="btn" @click="registerBtn">注册</view>
		<view class="" @click="enterPage">
			入场页
		</view>
	</view>
</template>

<script>
	import {
		regExp
	} from '@/common/utils.js'
	export default{
		components:{
			
		},
		data(){
			return {
				state:false,
				mobile:'',
				verification_code:'1234',
				password:'',
				pwd:'',
				timer: null,
				seconds: 60,
				verification_key:'',
			}
		},
		computed: {
			
		},
		onLoad(){
			
		},
		methods:{
			enterPage(){
				uni.navigateTo({
					url:'/pages/login/enterPage'
				})
			},
			//验证码倒计时
			countDown() {
				this.state = true
				this.timer = setInterval(() => {
					this.seconds--
					if (this.seconds <= 0) {
						clearInterval(this.timer)
						this.state = false
						this.seconds = 60
						return
					}
				}, 1000)
			},
			//获取验证码
			getCode() {
				if (!this.state) {
					if (regExp('mobile', this.mobile)) {
						this.countDown()
						this.$http({
							api: 'koala/v1/verificationCodes',
							method: 'POST',
							params: {
								phone: this.mobile,
								verification_type:'register'
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
			//注册按钮
			registerBtn(){
				this.judgeFun().then(() => {
					let params = {
							phone: this.mobile,
							login_type:'sms',
							verification_key:this.verification_key,
							password:this.password,
							verification_code:this.verification_code,
					}
					this.$http({
						api: 'koala/v1/authorizations',
						method: 'POST',
						params:params
					}).then(res => {
						//保存token
						this.$store.commit('saveToken',res.data)
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
							title:'注册成功',
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
				}).catch(()=>{})
			},
			judgeFun(){
				return new Promise((resolve,reject) => {
					let tip = ''
					if(!regExp('mobile', this.mobile)){
						tip = '请正确填写您的手机号码'
						reject()
					}else if(!this.verification_code){
						tip = '请正确填写您的验证码'
						reject()
					}else if(!regExp('password',this.password)){
						tip = '请输入6位以上,字母、数字或符号组合的密码'
						reject()
					}else if(this.password !== this.pwd){
						tip = '填写密码不一致'
						reject()
					}else{
						resolve()
					}
					if(tip){
						uni.showToast({
							icon:'none',
							title:tip
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.register{
		padding: 30rpx;
		.item{
			display: flex;
			align-items: center;
			border-bottom: 1rpx solid #f5f5f5;
			padding: 30rpx 0;
			margin-bottom: 10rpx;
			.title{
				width: 200rpx;
				display: block;
			}
			.input{
				flex: 1;
			}
		}
		.getCode{
			.input{
				display: flex;
				align-items: center;
				.inputCode{
					
				}
				.codeBtn{
					border: 1rpx solid #006EFF;
					padding: 10rpx 20rpx;
					color: #006EFF;
					border-radius: 10rpx;
					font-size: 28rpx;
					white-space: nowrap;
				}
				.getting{
					border-color: #999;
					color: #999;
				}
			}
		}
		.btn{
			width: 100%;
			padding: 20rpx 0;
			text-align: center;
			color: #fff;
			background: #1877f2;
			margin-top: 60rpx;
			border-radius: 10rpx;
		}
	}
</style>
