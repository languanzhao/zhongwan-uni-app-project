<template>
	<view class="joinUs">
		<view class="joinUs-header">
			<view class="imageBox">
				<image src="http://img4.imgtn.bdimg.com/it/u=3894159655,3953106493&fm=26&gp=0.jpg" mode=""></image>
			</view>
			<view class="title">招考宝</view>
			<view class="edition">版本号：V1.0.0</view>
		</view>
		<view class="part">
			<view class="item lastNoBottom" @click="typeClick">
				<view class="title">
					版本更新
				</view>
				<view class="iconfont icon-you"></view>
			</view>
			<view class="item lastNoBottom" @click="roleChange">
				<view class="title">
					角色切换
				</view>
				<view class="iconfont icon-you"></view>
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
		methods:{
			roleChange(){
				
			}
		}
	}
</script>
<style lang="scss">
	page{background: $page-background;}
</style>
<style lang="scss" scoped>
	.joinUs{
		background: #fff;
		.joinUs-header{
			padding: 30rpx 0;
			text-align: center;
			.imageBox{
				@include w-h-br(120rpx);
				margin: 20rpx auto;
			}
			.title{
				font-weight: bold;
				margin-bottom: 10rpx;
			}
			.edition{
				font-size: 30rpx;
				color: #666;
			}
		}
		.part{
			background: #fff;
			padding: 10rpx 20rpx;
			.item{
				display: flex;
				background: #fff;
				align-items: center;
				justify-content: space-between;
				border-top: 1rpx solid #f5f5f5;
				padding: 20rpx 0;
			}
		}
	}
</style>
