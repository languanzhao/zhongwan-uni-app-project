<template>
	<view class="invited">
		<view class="invitedList">
			<view class="invitedList-item" v-for="(item,index) of 10" :key='index'>
				<view class="list-item">
					<view class="item-header" @click="invitedProcess()">
						<view class="item-header-left">
							<image class="image" src="http://img4.imgtn.bdimg.com/it/u=3894159655,3953106493&fm=26&gp=0.jpg" mode=""></image>
							<view class="name">曲丽丽</view>
						</view>
						<view :class="['item-header-right','iconfont',current === index ? 'icon-jiantoushang' : 'icon-jiantouxia']" @click="showClick(index)"></view>
					</view>
					<view class="item-bottom" v-if="!bool || current !== index">
						<image src="http://img4.imgtn.bdimg.com/it/u=3894159655,3953106493&fm=26&gp=0.jpg" mode=""></image>
						<view class="info">
							<view class="pro_top">成功报名缴费</view>
							<view class="schoolName">佛山市南海区卫生职业技术学校</view>
							<view class="pro_bottom">已将您的个人资料转交予校方领导</view>
						</view>
					</view>
				</view>
				<!-- <process-detail v-if="current === index && bool"></process-detail> -->
			</view>
		</view>
	</view>
</template>

<script>
	// import processDetail from '@/sub_user/pages/progress/components/progress'
	export default{
		components:{
			// processDetail
		},
		data(){
			return {
				current:null,
				bool:false
			}
		},
		methods:{
			//折叠面板
			showClick(index){
				// 1)都未展开的
				// 2)都展开的
				// 3)有一个展开的了，但你点击的这个都没展开
				if(this.bool === false && this.current !== index){
					this.bool = true
					this.current = index
				}else if(this.bool === true && this.current === index){
					this.bool = false
					this.current = null
				}else if(this.bool === true && this.current !== index){
					this.bool = true
					this.current = index
				}
			},
			invitedProcess(){
				uni.navigateTo({
					url:'/sub_user/pages/progress/index'
				})
			}
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
<style lang="scss">
	page{background: $page-background;}
</style>
<style lang="scss" scoped>
	.invitedList{
		.invitedList-item{
			border-radius: 10rpx;
			
			.list-item{
				padding: 20rpx;
				margin: 20rpx;
				background: #fff;
			}
			//上部分
			.item-header{
				display: flex;
				align-items: center;
				justify-content: space-between;
				border-bottom: 1rpx solid #ccc;
				padding: 20rpx 0;
				.item-header-left{
					display: flex;
					align-items: center;
					.image{
						@include w-h-br(80rpx);
						margin-right: 20rpx;
					}
				}
				.item-header-right{
					
				}
			}
			//下部分
			.item-bottom{
				display: flex;
				align-items: center;
				margin-top: 20rpx;
				image{
					width: 120rpx;
					height: 120rpx;
				}
				.info{
					margin-left: 20rpx;
					.pro_top{
						font-weight: bold;
					}
					.schoolName{
						font-size: 28rpx;
						@include  line-clamp-one;
						// max-width: 400rpx;
						margin: 10rpx 0;
					}
					.pro_bottom{
						font-size: 28rpx;
						color: #999;
						white-space: nowrap;
						@include  line-clamp-one;
						max-width: 400rpx;
					}
				}
			}
		}
	}
</style>
