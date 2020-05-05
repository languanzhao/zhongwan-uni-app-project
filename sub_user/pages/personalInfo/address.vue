<template>
	<view class="address-edit">
		<view class="part">
			<view class="item" @click="addressChange">
				<view class="title">
					通讯地址
				</view>
				<view class="right">
					<view class="address">{{addressName}}</view>
					<view class="iconfont icon-you"></view>
				</view>
			</view>
			<view class="special">
				<view class="title">门牌号</view>
				<textarea type="text" @focus="hideBtn" @click="hideBtn" @blur="showBtn" v-model="info.koala_extra.contact_address" class="textarea" placeholder="详细地址,例1层101室"/>
			</view>
			<view class="item">
				<view class="title">
					联系人
				</view>
				<input type="text" @focus="hideBtn" @click="hideBtn" @blur="showBtn"  v-model="info.koala_extra.name" class="input" placeholder="请输入姓名"/>
			</view>
			<view class="item lastNoBottom">
				<view class="title">
					手机号
				</view>
				<input type="number" v-model="info.koala_extra.contact_phone" @focus="hideBtn" @click="hideBtn" @blur="showBtn" class="input" placeholder="请输入手机号码"/>
			</view>
		</view>
		<view class="fixed_bottom_btn_place" v-if="fixedBtn">
			<view class="fixed_bottom_btn" @click="submit">
				<view class="word">
					确定
				</view>
			</view>
		</view>
		<!-- 地址选择器 -->
		<simple-address 
			ref="simpleAddress" 
			:pickerValueDefault="cityPickerValueDefault" 
			@onConfirm="addressConfirm" 
			themeColor="#007AFF"
		></simple-address>
	</view>
</template>

<script>
	import simpleAddress from '@/components/simple-address/simple-address.nvue';
	import { regExp,getWindowResize } from '@/common/utils.js';
	import { mapState } from 'vuex';
	export default{
		components:{
			simpleAddress
		},
		data(){
			return {
				cityPickerValueDefault: [0, 0, 1],
				info:{
					koala_extra:{
						contact_province:'',
						contact_city:'',
						contact_district:''
					}
				},
				addressName:'',
				fixedBtn:true,
				windowHeight:'',
			}
		},
		computed:{
			...mapState(['userInfo'])
		},
		onLoad() {
			let info = JSON.parse(JSON.stringify(this.userInfo))
			this.info = info
			this.addressName = info.koala_extra.contact_province + '-' +  info.koala_extra.contact_city + '-' + info.koala_extra.contact_district
			//监听窗口高度变化（为了兼容h5端底部按钮被键盘顶起的问题）
			this.windowResize()
		},
		methods:{
			//点击弹窗选择地址
			addressChange(){
				this.$refs.simpleAddress.open();
			},
		    //确认选择地址
			addressConfirm(e){
				// this.cityPickerValueDefault = e.value 保留当前选择
				this.addressName = e.label
				this.info.koala_extra.contact_province = e.labelArr[0]
				this.info.koala_extra.contact_city = e.labelArr[1]
				this.info.koala_extra.contact_district = e.labelArr[2]
			},
			//确定
			submit(){
				this.judgeFun().then(()=>{
					let params = {
						'koala_extra[contact_province]':this.info.koala_extra.contact_province,
						'koala_extra[contact_city]':this.info.koala_extra.contact_city,
						'koala_extra[contact_district]':this.info.koala_extra.contact_district,
						'koala_extra[contact_address]':this.info.koala_extra.contact_address,
						'koala_extra[name]':this.info.koala_extra.name,
						'koala_extra[contact_phone]':this.info.koala_extra.contact_phone,
						_method:'PATCH'
					}
					// https://ask.dcloud.net.cn/question/89586
					// uni.$emit('address',params)
					console.log(params,'params')
					this.$http({
						api: 'koala/v1/user',
						method: 'POST',
						params:params
					}).then(res => {
						console.log(res,'res')
						this.$store.commit('setUserInfo',res.data)
					}).catch(err => {
								
					})
					uni.navigateBack()
				}).catch((err)=>{})
			},
			//验证
			judgeFun(){
				return new Promise((resolve,reject)=>{
					let tip = ''
					if(!this.info.koala_extra.contact_province){
						tip = '请选择通讯地址'
						reject()
					}else if(!this.info.koala_extra.contact_address){
						tip = '请输入详细地址'
						reject()
					}else if(!this.info.koala_extra.name){
						tip = '请输入姓名'
						reject()
					}else if(!regExp('mobile',this.info.koala_extra.contact_phone)){
						tip = '请输入正确的手机号'
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
			//监听窗口高度变化
			windowResize(){
				this.windowHeight = getWindowResize('height')
			    uni.onWindowResize((res) => {
			        if(res.size.windowHeight < this.windowHeight){
			            this.fixedBtn = false
			        }else{
			            this.fixedBtn = true
			        }
			    })
			},
			//显示按钮
			showBtn(){
				this.fixedBtn = true
			},
			//隐藏按钮
			hideBtn(){
				this.fixedBtn = false
			}
		}
	}
</script>
<style lang="scss">
	page{background: $page-background;}
</style>
<style lang="scss" scoped>
	.address-edit{
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
			.right{
				display: flex;
				align-items: center;
			}
		}
		.special{
			margin: 20rpx 10rpx;
			border-bottom: 1rpx solid #ccc;
			.textarea{
				width: 100%;
				height: 160rpx;
				margin-top: 20rpx;
			}
		}
		.lastNoBottom{
			border-bottom: none;
		}
		.fixedBottom{
			position: absolute;
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
