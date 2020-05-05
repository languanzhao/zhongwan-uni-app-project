<template>
	<view class="accountList">
		<view class="account-item" v-for="(item,index) of accountList" :key='index' @click="accountDetail(item.id)">
			<view class="item-left">
				<view class="imageBox">
					<image src='http://img4.imgtn.bdimg.com/it/u=3894159655,3953106493&fm=26&gp=0.jpg' mode=""></image>
				</view>
				<view class="content">
					<view class="schoolName">{{item.name}}</view>
					<view class="date">{{item.date}}</view>
				</view>
			</view>
			<view class="num">{{item.num}}</view>
		</view>
	</view>
</template>

<script>
	export default{
		components:{
			
		},
		data(){
			return {
				accountList:[
					{
						image:'http://img4.imgtn.bdimg.com/it/u=3894159655,3953106493&fm=26&gp=0.jpg',
						name:"广东省江门市中医药学校",
						date:'2020/05/30',
						num:'-1000'
					},
					{
						image:'http://img4.imgtn.bdimg.com/it/u=3894159655,3953106493&fm=26&gp=0.jpg',
						name:"广东省江门市中医药学校",
						date:'2020/05/30',
						num:'-1000'
					},
					{
						image:'http://img4.imgtn.bdimg.com/it/u=3894159655,3953106493&fm=26&gp=0.jpg',
						name:"广东省江门市中医药学校",
						date:'2020/05/30',
						num:'-1000'
					}
				]
			}
		},
		methods:{
			accountDetail(id){
				uni.navigateTo({
					url:"/sub_user/pages/wallet/accountDetail"
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
	.accountList{
		.account-item{
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 20rpx 30rpx;
			margin-bottom: 2rpx;
			background: #fff;
			.item-left{
				display: flex;
				align-items: center;
				.imageBox{
					@include w-h-br(100rpx);
					margin-right: 20rpx;
				}
				.content{
					.date{
						color: #999;
						font-size: 28rpx;
						margin-top: 10rpx;
					}
				}
			}
			.num{
				font-weight: bold;
			}
		}
	}
</style>
