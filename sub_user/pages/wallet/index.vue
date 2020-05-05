<template>
	<view class="wallet">
		<view class="content">
			<view class="sum">
				<view class="word">当前余额</view>
				<view class="summary" @click="summaryClick(true)">
					<text class="moneyWord">余额说明</text>
					<text class="iconfont icon-summary"></text>
				</view>
			</view>
			<view class="number" @click="accountLink">
				<view class="sign">￥</view>
				<view class="money">0</view>
			</view>
			<view class="bonus">
				<view class="item dashed">
					<view class="word">助学计划（元）</view>
					<view class="num">500.00</view>
					<view class="date">遇到账日期：11/1</view>
				</view>
				<view class="item">
					<view class="word">差旅补助（元）</view>
					<view class="num">500.00</view>
				</view>
			</view>
			<view class="total" @click="summaryClick(false)">
				累计在途<text>500</text>元<text class="iconfont icon-summary"></text>
			</view>
		</view>
		<view class="fixed_bottom_btn_place">
			<view class="fixed_bottom_btn">
				<view class="word">
					提现
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
			summaryClick(bool){
				let content,title
				if(bool){
					title = '余额说明'
					content = "1、余额支持提现，提现金额将于3个工作日到账至个人账户内；\n2、其中助学奖金及伯乐奖金需要用户正式入学后方可进行提现操作（助学奖金及伯乐奖金一般在当年11月1日到账）到账后即可提现。\n3、每人可领取的助学奖金1次，伯乐奖金，根据成功报名邀约人数/院校等具体情况发放，次数不限。"
				}else{
					title = '在途余额说明'
					content = "1、成功邀约、报名院校，平台将视具体情况发放一定金额的助学补贴，正式入学后方可领取。\n 2、若同学没有入学，则无法获得补贴。"
				}
				uni.showModal({
				    title,
				    content,
					showCancel:false,
				    success: function (res) {}
				});
			},
			// 进入账单
			accountLink(){
				uni.navigateTo({
					url:"/sub_user/pages/wallet/account"
				})
			}
		}
	}
</script>
<style lang="scss">
	page{background: $page-background;}
</style>
<style lang="scss" scoped>
	.content{
		background: #fff;
		margin: 30rpx;
		border-radius: 10rpx;
		padding: 30rpx;
		.sum{
			display: flex;
			justify-content: space-between;
			align-items: center;
			.moneyWord{
				color: #999;
				margin-right: 10rpx;
			}
			.icon-summary{
				color: #ff0000;
			}
		}
		.number{
			padding: 20rpx 0;
			margin: 20rpx 0;
			border-bottom: 1rpx solid #ccc;
			display: flex;
			align-items: flex-end;
			.sign{
				font-size: 26rpx;
				color: blue;
			}
			.money{
				font-size: 60rpx;
				color: blue;
				line-height: 60rpx;
			}
		}
		.bonus{
			display: flex;
			.item{
				width: 50%;
				.word{
					color: #999;
					font-size: 28rpx;
				}
				.num{
					margin: 10rpx 0;
				}
				.date{
					color: #999;
					font-size: 26rpx;
				}
			}
			.dashed{
				border-right: 1rpx dashed #ccc;
				margin-right: 10%;
				width: 65%;
			}
		}
		.total{
			background: #f5f5f5;
			padding: 10rpx 20rpx;
			margin-top: 30rpx;
			.icon-summary{
				margin-left: 10rpx;
				color: #ff0000;
			}
		}
	}
</style>
