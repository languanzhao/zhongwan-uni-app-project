<template>
	<view class="IDAuth">
		<view class="header">
			<view class="item">
				<view class="title">真实姓名</view>
				<view class="value">张某人</view>
			</view>
			<view class="item">
				<view class="title">真实姓名</view>
				<view class="value">440881199654523666</view>
			</view>
			<view class="imageBox">
				<view class="image"></view>
				<view class="image"></view>
			</view>
		</view>
		<view class="fixed_bottom_btn_place">
			<view class="fixed_bottom_btn">
				<view class="summary">
					仅用于身份验证进行身份核实，保障你的信息安全
				</view>
				<view class="word" @click="goBack">
					确定
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		components:{
			
		},
		data(){
			return {
				
			}
		},
		computed: {
			
		},
		onLoad(){
			
		},
		methods:{
			goBack(){
				uni.navigateBack()
			}
		}
	}
</script>
<style lang="scss">
	page{background: $page-background;}
</style>
<style lang="scss" scoped>
	.IDAuth{
		.header{
			background: #fff;
			.item{
				display: flex;
				align-items: center;
				border-bottom: 1rpx solid #ccc;
				padding: 30rpx 20rpx;
				.title{
					font-weight: bold;
					margin-right: 30rpx;
				}
				.value{
					
				}
			}
			.imageBox{
				display: flex;
				justify-content: space-around;
				padding: 30rpx 20rpx;
				.image{
					width: 200rpx;
					height: 150rpx;
					border: 1rpx solid #ccc;
				}
			}
		}
		.summary{
			margin-bottom: 10rpx;
			font-size: 28rpx;
			color: #666;
			text-align: center;
		}
	}
</style>
