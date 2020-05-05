<template>
	<view class="info-edit">
		<view class="part">
			<view class="item">
				<view class="title">
					真实姓名
				</view>
				<input type="text" v-model="info.name" class="input" placeholder="请输入"/>
			</view>
			<view class="item">
				<view class="title">
					手机号
				</view>
				<input type="text" v-model="info.phone" class="input" placeholder="请输入"/>
			</view>
			<view class="item">
				<view class="title">
					身份证号
				</view>
				<input type="text" v-model="info.idNumber" class="input" placeholder="请输入"/>
			</view>
			<view class="item lastNoBottom" @click="houseAddress">
				<view class="title">
					户籍地址
				</view>
				<view class="rightPart">
					<view class="address">{{info.houseAddress}}</view>
					<view class="iconfont icon-you"></view>
				</view>
			</view>
		</view>
		<view class="part" style="margin-top: 30rpx;">
			<view class="item">
				<view class="title">
					毕业学校
				</view>
				<input type="text" v-model="info.graduation" class="input" placeholder="请输入"/>
			</view>
			<view class="item" @click="typeClick">
				<view class="title">
					学生类别
				</view>
				<view class="rightPart">
					<view class="address">{{studentTypeList[info.studentType]}}</view>
					<view class="iconfont icon-you"></view>
				</view>
			</view>
			<view class="item">
				<view class="title">
					家长电话
				</view>
				<input type="number" v-model="info.parents_phone" class="input" placeholder="请输入"/>
			</view>
			<view class="item lastNoBottom" @click="addressClick">
				<view class="title">
					通讯地址
				</view>
				<view class="rightPart">
					<view class="address" v-if="info.address">{{info.address.addressName + info.address.detailAddress}}</view>
					<view class="iconfont icon-you"></view>
				</view>
			</view>
		</view>
		<view class="fixedBottom">
			<view class="reset">重置</view>
			<view class="confirm" @click="submit">确定</view>
		</view>
	</view>
</template>

<script>
	import { checkMobile,checkID } from '@/common/utils.js'
	import { mapState } from 'vuex'
	export default{
		components:{
			
		},
		data(){
			return {
				info:{

				},
				studentTypeList:['农村应届', '农村往届', '城镇应届','城镇往届'],
				back:false
			}
		},
		computed:{
			...mapState(['userInfo'])
		},
		onLoad(options){
			this.info = {
				...this.userInfo
			}
			let that = this
			//监听通讯地址
			uni.$on('address',data => {
				if(data){
					this.$set(this.info,'address',{})
					this.info.address.addressName = data.addressName
					this.info.address.detailAddress = data.detailAddress
				}
			})
			//监听户籍地址
			uni.$on('houseAddress',data => {
				if(data){
					this.$set(this.info,'houseAddress',data.addressName + data.streetName)
				}
			})
			//填写报考信息页跳转带参数 back = true
			if(options && options.back){
				this.back = true
			}
		},
		onUnload(){
			// 移除监听事件  
			uni.$off('address')
			uni.$off('houseAddress')
		},
		methods:{
			//学生类别
			typeClick(){
				uni.showActionSheet({
				    itemList: ['农村应届', '农村往届', '城镇应届','城镇往届'],
				    success: res => {
							this.$set(this.info,'studentType',res.tapIndex)
				    },
				    fail: err => {}
				});
			},
			//通讯地址
			addressClick(){
				uni.navigateTo({
					url:'/sub_user/pages/personalInfo/address'
				})
			},
			//户籍地址
			houseAddress(){
				uni.navigateTo({
					url:'/sub_user/pages/personalInfo/houseAddress'
				})
			},
			//确定
			submit(){
				this.judgeFun().then(()=>{
					let userInfo = {
						...this.userInfo,
						...this.info
					}
					this.$store.commit('setUserInfo',userInfo)
					if(this.back){
						uni.$emit('information',this.info)
						uni.navigateBack()
					}else{
						uni.showToast({
							title:'编辑成功',
							success:() => {
								setTimeout(()=>{
									uni.switchTab({
										url:'/pages/user/user'
									})
								},1000)
							}
						})
					}
					
				}).catch(err => {})
			},
			//信息验证
			judgeFun(){
				return new Promise((resolve,reject)=>{
					let tip = ''
					if(!this.info.realName){
						tip = '请输入姓名'
						reject()
					}else if(!checkMobile(this.info.mobile)){
						tip = '请输入正确的手机号'
						reject()
					}else if(!checkID(this.info.idNumber)){
						tip = '请输入正确的身份证号'
						reject()
					}else if(!this.info.houseAddress){
						tip = '请填写户籍地址'
						reject()
					}else if(!this.info.school){
						tip = '请填写学校名称'
						reject()
					}else if(!this.info.studentType){
						tip = '请选择学生类别'
						reject()
					}else if(!checkMobile(this.info.parentsMobile)){
						tip = '请输入正确的电话号码'
						reject()
					}else if(!this.info.address){
						tip = '请填写通讯地址'
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
			},
		}
	}
</script>
<style lang="scss">
	page{background: $page-background;}
</style>
<style lang="scss" scoped>
	.info-edit{
		.part{
			background: #fff;
			padding: 10rpx 20rpx;
		}
		.item{
			display: flex;
			background: #fff;
			align-items: center;
			justify-content: space-between;
			margin: 0 10rpx;
			border-bottom: 1rpx solid #ccc;
			padding: 20rpx 0;
			.title{
				
			}
			.input{
				flex: 1;
				text-align: right;
			}
			.rightPart{
				display: flex;
				align-items: center;
				.address{
					color: #666;
				}
			}
		}
		.lastNoBottom{
			border-bottom: none;
		}
		.fixedBottom{
			position: fixed;
			bottom: 30rpx;
			width: 100%;
			left: 0;
			display: flex;
			justify-content: space-between;
			height: 80rpx;
			line-height: 80rpx;
			padding: 0 30rpx;
			box-sizing: border-box;
			text-align: center;
			.reset{
				background: #999;
				width: 200rpx;
				margin-right: 20rpx;
				border-radius: 10rpx;
			}
			.confirm{
				flex: 1;
				background: blue;
				color: #fff;
				border-radius: 10rpx;
			}
		}
	}
</style>
