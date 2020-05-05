<template>
	<view class="leaveSchool">
		<view class="schoolCard">
			<school-card></school-card>
		</view>
		<view class="schoolInfo-bottom">
			<view class="item" @click="reasonClick">
				<view class="title">退款原因</view>
				<view class="right">
					请选择
					<text class="iconfont icon-you"></text>
				</view>
			</view>
			<view class="item">
				<view class="title">
					<text>退款金额</text>
					<text class="num">￥8000</text>
				</view>
			</view>
		</view>
		<view class="refund-summary">
			<view class="title">退款说明</view>
			<textarea class="textarea" value="" placeholder="请填写退款说明" />
		</view>
		<view class="attention">
			注意：如若当前退款申请日期，已超出院校的报名截止日期，申请退学的用户，须移步到该院校招生办进行办理。
		</view>
		<view class="fixed-bottom-btn-two">
			<view class="fixed-bottom-btn">
				<view class="left" @click="cancelbtn">取消</view>
				<view class="right" @click="confirmBtn">申请退学</view>
			</view>
		</view>
	</view>
</template>

<script>
	import schoolCard from '@/components/school-card/index'
	export default{
		components:{
			schoolCard
		},
		data(){
			return {
				
			}
		},
		methods:{
			//退款原因
			reasonClick(){
				uni.showActionSheet({
					itemList:['报错专业了','想去其他学校','不想上了'],
					success:res => {
						
					}
				})
			},
			confirmBtn(){
				uni.showModal({
					title:'注意',
					content:'办理退学后，锁定学位将重新开放报名，若该专业名额招收完毕，将无法再报名！是否确定办理退学',
					success:res =>{
						if (res.confirm) {
						            console.log('用户点击确定');
						        } else if (res.cancel) {
						            console.log('用户点击取消');
						        }
					}
				})
			},
			cancelbtn(){
				uni.navigateBack()
			}
		}
	}
</script>
<style lang="scss">
	page{background: $page-background;}
</style>
<style lang="scss" scoped>
	.leaveSchool{
		.schoolCard{
			margin: 20rpx;
		}
		.schoolInfo-bottom{
			padding: 20rpx 30rpx;
			background: #fff;
			.item{
				display: flex;
				justify-content: space-between;
				padding: 20rpx 0;
				&:first-child{
					border-bottom: 1rpx solid #f5f5f5;
				}
				.right{
					color: #666;
					.icon-you{
						color: #000;
						font-weight: bold;
						margin-left: 10rpx;
					}
				}
				.num{
					margin-left: 20rpx;
					color: red;
				}
			}
		}
		.refund-summary{
			padding: 30rpx;
			margin-top: 20rpx;
			background: #fff;
			.title{
				margin-bottom: 10rpx;
			}
			.textarea{
				width: 100%;
				background: #f5f5f5;
				padding: 20rpx;
				box-sizing: border-box;
			}
		}
		.attention{
			padding: 30rpx;
			font-size: 28rpx;
		}
	}
</style>
