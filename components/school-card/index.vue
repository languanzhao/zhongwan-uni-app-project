<template>
	<view class="schoolCard">
		<view class="schoolInfo">
			<view class="top-name">
				<image src="http://img4.imgtn.bdimg.com/it/u=3894159655,3953106493&fm=26&gp=0.jpg" mode=""></image>
				<view class="name">佛山市南海区卫生职业技术学校</view>
				<view class="label" @click="labelClick">助学计划</view>
			</view>
			<view class="bottom-info">
				<view class="item">
					<view class="iconfont icon-edu"></view>
					<view class="title">中专 公办</view>
				</view>
				<view class="item">
					<view class="title">星级评分：</view>
					<view class="iconfont icon-xingChecked"></view>
				</view>
				<view class="item">
					<view class="iconfont icon-address"></view>
					<view class="title">广东 佛山 南海区</view>
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
		methods:{
			
		}
	}
</script>

<style lang="scss">
	.schoolCard{
		.schoolInfo{
			background: #fff;
			padding: 20rpx;
			border-radius: 10rpx;
			.top-name{
				display: flex;
				align-items: center;
				image{
					@include w-h-br(80rpx);
				}
				.name{
					font-weight: bold;
					margin: 0 10rpx;
				}
				.label{
					font-size: 24rpx;
					color: #00aaff;
					border: 1rpx solid #00aaff;
					padding: 2rpx;
					border-radius: 10rpx;
					text-align: center;
					white-space: nowrap;
				}
			}
			.bottom-info{
				display: flex;
				flex-wrap: wrap;
				margin-top: 10rpx;
				.item{
					width: 50%;
					display: flex;
					align-items: center;
					color: #666;
					.title{
						font-size: 28rpx;
					}
					.iconfont{
						margin-right: 10rpx;
					}
					.icon-edu{
						font-size: 45rpx;
					}
					.icon-address{
						font-size: 40rpx;
					}
				}
			}
		}
	}
</style>
