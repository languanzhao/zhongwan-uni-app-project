<template>
	<view class="apply">
		<!-- 用户信息 -->
		<view class="userInfo module" @click="editInfo">
			{{information.mobile ? '' : '添加个人报考信息'}}
			<view class="avatarImgBox" v-if="information.mobile">
				<image :src="userInfo.avatarImg" mode=""></image>
			</view>
			<view class="content" v-if="information.mobile">
				<view class="name">{{information.realName}}<text class="phone">{{information.mobile}}</text></view>
				<view class="school">毕业学校：{{information.school}}</view>
				<view class="address" v-if="information.address">联系地址:{{information.address.addressName + information.address.detailAddress}}</view>
			</view>
			<view class="iconfont icon-you"></view>
		</view>
		<!-- 学校信息 -->
		<view class="schoolInfo module">
			<view class="schoolInfo-top">
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
			<view class="schoolInfo-bottom">
				<view class="item">
					<view class="title">报读层次</view>
					<view class="right">
						未填选
						<text class="iconfont icon-you"></text>
					</view>
				</view>
				<view class="item">
					<view class="title">报读专业</view>
					<view class="right">
						未填选
						<text class="iconfont icon-you"></text>
					</view>
				</view>
			</view>
		</view>
		<!-- 费用信息 -->
		<view class="freeInfo module">
			<view class="item">
				<view class="title">学杂费</view>
				<view class="right">￥8000</view>
			</view>
			<view class="item" @click="planClick">
				<view class="title"><text class="iconfont icon-summary"></text>助学计划</view>
				<view class="iconfont icon-you"></view>
			</view>
		</view>
		<!-- 支付方式 -->
		<view class="payWay module">
			<view class="item" @click="transferAccounts">
				<view class="title">转账支付</view>
				<view class="iconfont icon-you"></view>
			</view>
			<view class="item" v-for="(item,index) of payWayList" :key='item.id' @click="payWayClick(item.id)">
				<view class="left">
					<view :class="['iconfont',item.icon]"></view>
					<view class="title">{{item.title}}</view>
				</view>
				<view class="checked" v-if="item.id === payWayId && item.id !== 3">√</view>
				<view class="tip" v-if="item.id === 3">最高立减50元</view>
			</view>
		</view>
		<view class="attention">
			凡是在线上报名且成功入学者，在满足条件享受国家助学金的基础上，还可以享受到平台助学补助。
		</view>
		<!-- 底部按钮 -->
		<view class="bottomBtnFixed">
			<view class="free" @click="summaryClick">
				<view class="iconfont icon-summary"></view>
				<view class="title">报读费用预缴：</view>
				<view class="num">￥8000</view>
			</view>
			<view class="submit">提交申请</view>
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	export default{
		components:{
			
		},
		data(){
			return {
				information:{},
				payWayId:null,
				payWayList:[
					{
						icon:'icon-weixin',
						title:'微信支付',
						id:1
					},
					{
						icon:'icon-zhifubao',
						title:'支付宝支付',
						id:2
					},
					{
						icon:'icon-downLoad',
						title:'下载招考宝APP支付',
						id:3
					}
				]
			}
		},
		computed:{
			...mapState(['userInfo'])
		},
		onLoad(){
			//编辑信息页传过来的参数
			uni.$on('information',data => {
				console.log(data,'aa')
				this.information = data
			})
		},
		onUnload(){
			//移除监听
			uni.$off('information')
		},
		methods:{
			//去编辑个人信息
			editInfo(){
				uni.navigateTo({
					url:`/sub_user/pages/personalInfo/info-edit?back=${true}`
				})
			},
			//选择支付方式 微信 支付宝
			payWayClick(index){
				this.payWayId = index
			},
			//说明点击
			summaryClick(){
				uni.showModal({
					title:'预报读费用说明',
					content:"1、缴纳预报读费用后学院会为您保留学位，入学时抵扣相应金额的报名费用。\n 2、如若报读申请未通过校方审核的，当前费用也将全数退还",
					showCancel:false,
					success: function (res) {}
				})
			},
			//标签点击
			labelClick(){
				uni.showToast({
				    title: '当前院校已加入平台助学计划',
					icon:'none',
					position:'top',
				    duration: 3000
				});
			},
			//助学计划
			planClick(){
				uni.navigateTo({
					url:'/sub_school/pages/apply/summary'
				})
			},
			//转账支付
			transferAccounts(){
				uni.navigateTo({
					url:'/sub_school/pages/apply/transferAccounts'
				})
			}
		}
	}
</script>
<style lang="scss">
	page{background: $page-background;}
</style>
<style lang="scss" scoped>
	.apply{
		padding: 20rpx 20rpx 100rpx;
		.module{
			padding: 20rpx;
			margin-bottom: 20rpx;
			border-radius: 10rpx;
			background: #fff;
		}
		// 用户信息
		.userInfo{
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 28rpx;
			.avatarImgBox{
				@include w-h-br(100rpx);
			}
			.content{
				.name{
					.phone{
						margin-left: 20rpx;
					}
				}
				.school{
					margin: 10rpx 0;
				}
			}
			.icon-you{
				font-weight: bold;
			}
		}
		// 学校信息
		.schoolInfo{
			.schoolInfo-top{
				.top-name{
					display: flex;
					align-items: center;
					image{
						@include w-h-br(80rpx);
					}
					.name{
						font-weight: bold;
						margin-left:10rpx;
					}
					.label{
						font-size: 26rpx;
						border: 1rpx solid;
						margin-left:10rpx;
					}
				}
				.bottom-info{
					display: flex;
					flex-wrap: wrap;
					margin: 20rpx 0;
					.item{
						width: 50%;
						display: flex;
						align-items: center;
						color: #666;
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
			.schoolInfo-bottom{
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
				}
			}
		}
		// 费用信息
		.freeInfo{
	        .item{
	        	display: flex;
	        	justify-content: space-between;
	        	padding: 20rpx 0;
	        	&:first-child{
	        		border-bottom: 1rpx solid #f5f5f5;
	        	}
				.right{
					color: red;
				}
				.icon-summary{
					margin-right: 10rpx;
				}
				.icon-you{
					color: #000;
					font-weight: bold;
					margin-left: 10rpx;
				}
	        }
		}
		// 支付方式
		.payWay{
			.item{
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 20rpx 0;
				&:first-child{
					border-bottom: 1rpx solid #f5f5f5;
				}
				.left{
					display: flex;
					align-items: center;
					.iconfont{
						font-size: 40rpx;
					}
					.icon-weixin{
						color: green;
					}
					.icon-zhifubao{
						color: blue;
						font-size: 24rpx;
					}
					.icon-downLoad{
						color: #666;
					}
					.title{
						margin-left: 20rpx;
					}
				}
				.icon-you{
					color: #000;
					font-weight: bold;
					margin-left: 10rpx;
				}
				.checked{
					color: green;
					font-weight: bold;
				}
				.tip{
					border: 1rpx solid;
					padding: 4rpx 10rpx;
					font-size: 26rpx;
				}
			}
		}
		// 提示
		.attention{
			padding: 20rpx 30rpx;
			font-size: 28rpx;
		}
		// 底部按钮
		.bottomBtnFixed{
			position: fixed;
			left: 0;
			bottom: 0;
			width: 100%;
			height: 100rpx;
			background: #fff;
			border-top: 1rpx solid #f5f5f5;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 30rpx;
			box-sizing: border-box;
			.free{
				display: flex;
				align-items: center;
				.title{
					margin: 0 10rpx;
					color: #666;
				}
				.num{
					font-weight: bold;
				}
			}
			.submit{
				color: #fff;
				background: blue;
				padding: 20rpx 60rpx;
				text-align: center;
				border-radius: 10rpx;
			}
		}
	}
</style>
