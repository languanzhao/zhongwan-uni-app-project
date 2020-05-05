<template>
	<view class="consulted">
		<view class="consultedList">
			<view class="item" v-for="(item,index) of 10" :key='index'>
				<image src="http://img4.imgtn.bdimg.com/it/u=3894159655,3953106493&fm=26&gp=0.jpg" mode=""></image>
			    <view class="content">
			    	<view class="info">
			    		<view class="name">
							<view class="nickName">徐来</view>
							<view class="schoolName">华中科技大学</view>
							<view class="schoolName">·</view>
							<view class="schoolName">招生老师</view>
			    		</view>
						<view class="summary">摘要信息</view>
			    	</view>
					<view class="date">
						2020/02/02
					</view>
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
			
		},
		onPullDownRefresh() {
			console.log('刷新了一次');
			setTimeout(function () {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		onReachBottom(){
			console.log('到底了')
		}
	}
</script>

<style lang="scss" scoped>
	.consultedList{
		.item{
			display: flex;
			padding: 20rpx 0 20rpx 20rpx;
			image{
				width: 100rpx;
				height: 100rpx;
			}
			.content{
				display: flex;
				align-items: center;
				flex: 1;
				justify-content: space-between;
				border-bottom: 1rpx solid #ccc;
				margin-left: 20rpx;
				padding:0 20rpx 20rpx 0;
				.info{
					.name{
						display: flex;
						align-items: center;
						.nickName{
							font-weight: bold;
						}
						.schoolName{
							color: #666;
							font-size: 28rpx;
							margin-left: 10rpx;
						}
					}
					.summary{
						padding: 10rpx 0;
						color: #666;
						font-size: 30rpx;
					}
				}
				.date{
					font-size: 26rpx;
					color: #666;
				}
			}
		}
	}
</style>
