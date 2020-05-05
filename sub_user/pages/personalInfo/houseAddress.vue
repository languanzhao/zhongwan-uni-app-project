<template>
	<view class="address-edit">
		<view class="item" @click="addressChange">
			<view class="title">
				户籍地址
			</view>
			<view class="right">
				<view class="address">{{address.addressName}}</view>
				<view class="iconfont icon-you"></view>
			</view>
		</view>
		<view class="item">
			<view class="title">
				派出所/街道办
			</view>
			<input type="text" v-model="streetName" class="input" placeholder="户籍办理地点"/>
		</view>
		<view class="fixedBottom">
			<view class="reset">重置</view>
			<view class="confirm" @click="submit">确定</view>
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
	export default{
		components:{
			simpleAddress
		},
		data(){
			return {
				cityPickerValueDefault: [0, 0, 1],
				address:{
					addressCode:null,
					addressName:null,
				},
				streetName:''
			}
		},
		onLoad() {
			
		},
		methods:{
			//点击弹窗选择地址
			addressChange(){
				this.$refs.simpleAddress.open();
			},
			//确认选择地址
			addressConfirm(e){
				// this.cityPickerValueDefault = e.value 保留当前选择
				this.address = {
					addressCode:e.areaCode,
					addressName:e.label
				}
			},
			// 确定
			submit(){
				this.judgeFun().then(res => {
					let params = {
						addressName:this.address.addressName,
						streetName:this.streetName
					}
					console.log(params,"parmas")
					uni.$emit('houseAddress',params)
					uni.navigateBack()
				}).catch(err => {})
			},
			judgeFun(){
				return new Promise((resolve,reject)=>{
					let tip = ''
					if(!this.address.addressName){
						tip = '请选择地址'
						reject()
					}else if(!this.streetName){
						tip = '请输入户籍办理地点'
						reject()
					}else {
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
<style lang="scss">
	page{background: $page-background;}
</style>
<style lang="scss" scoped>
	.address-edit{
		.item{
			display: flex;
			background: #fff;
			align-items: center;
			justify-content: space-between;
			padding: 20rpx;
			margin-bottom: 10rpx;
			.input{
				flex: 1;
				text-align: right;
			}
			.right{
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
