<template>
	<view class="user">
		<view class="processMask" v-if="processMaskShow" @touchstart.prevent="processTouchstart"></view>
		<!-- 普通用户端 -->
		<view class="role-user">
			<view class="header">
				<view class="header_top">
					<image :src="userInfo.avatar" mode="" class="avatarImg"></image>
					<view class="name_part" @click="personalInfoLink">
						<view class="name">{{userInfo.name || '去填写信息'}}</view>
						<view class="edit">
							<text></text>
							<text>我的在线信息</text>
						</view>
					</view>
					<view class="money iconfont icon-balance" @click="walletLink"></view>
				</view>
				<view class="header_bottom">
					<view class="item" v-for="(item,index) of mesList" :key='index' @click="mesListItemClick(index)">
						<view class="num">{{item.num}}</view>
						<view class="title">{{item.title}}</view>
					</view>
				</view>
			</view>
			<view class="process">
				<view class="title">入学进度</view>
				<view :class="['content',showOper ? '' : 'marginLeft']">
					<view class="content_left">
						<image src="http://img4.imgtn.bdimg.com/it/u=3894159655,3953106493&fm=26&gp=0.jpg" mode=""></image>
						<view class="info">
							<view class="pro_top">成功报名缴费</view>
							<view class="schoolName">佛山市南海区卫生职业技术学校</view>
							<view class="pro_bottom">已将您的个人资料转交予校方领导</view>
						</view>
					</view>
					<view class="pot iconfont icon-more" v-if="showOper" @click="showOperClick"></view>
					<view class="operation" v-if="!showOper">
						<view class="item detail" @click="progressDetail">详情</view>
						<view class="item share">分享</view>
					</view>
				</view>
			</view>
			<view class="share_enter" @click="shareClick">
				<image src="http://img4.imgtn.bdimg.com/it/u=3894159655,3953106493&fm=26&gp=0.jpg" mode=""></image>
			</view>
			<list-cell :list='list'></list-cell>
		</view>
	     <!-- 顾问端 -->
		<view class="role-adviser">
			<role-adviser></role-adviser>
			<view class="wallet" @click="adviserWalletLink">
				<view class="wallet-left">
					<view class="num">预返金：￥998.00</view>
					<view class="summary">每年11月1号结算当年度收益 > </view>
				</view>
				<view class="wallet-right">
					进入钱包
				</view>
			</view>
			<view class="function">
				<view class="function-item" @click="adviserTeam">
					<view class="item-left">
						<view class="title">我的团队</view>
						<view class="summary">众人拾柴，火焰高</view>
					</view>
					<image class="image" src="http://img4.imgtn.bdimg.com/it/u=3894159655,3953106493&fm=26&gp=0.jpg" mode=""></image>
				</view>
				<view class="function-item">
					<view class="item-left">
						<view class="title">我的团队</view>
						<view class="summary">众人拾柴，火焰高</view>
					</view>
					<image class="image" src="http://img4.imgtn.bdimg.com/it/u=3894159655,3953106493&fm=26&gp=0.jpg" mode=""></image>
				</view>
			</view>
			<list-cell :list='adviserList'></list-cell>
		</view>
	</view>
</template>

<script>
	import listCell from '@/components/list-cell';
	import roleAdviser from './components/role-adviser'
	import { mapState } from 'vuex';
	import { checkLogin,goLogin } from '@/common/utils.js'
	export default {
		components: {
			listCell,
			roleAdviser
		},
		data() {
			return {
				processMaskShow:false,
				role:'adviser',
				showOper: true,
				mesList: [{
						num: 17,
						title: '咨询过',
						path: '/sub_user/pages/consulted/index'
					},
					{
						num: 17,
						title: '报名邀约',
						path: '/sub_user/pages/invited/index'
					},
					{
						num: 17,
						title: '已收藏',
						path: '/sub_user/pages/school-collected/index'
					}
				],
				list: [{
						icon: 'icon-yixiang',
						title: '报读意向',
						tip: '立即设置',
						path: '',
						color: 'rgb(84, 180, 239)'
					},
					{
						icon: 'icon-address',
						title: '通讯地址',
						tip: '立即设置',
						path: '/sub_user/pages/personalInfo/address',
						color: 'rgb(95, 205, 162)'
					},
					{
						icon: 'icon-kefu',
						title: '联系客服',
						path: '/pages/setting/setting',
						color: 'rgb(85, 170, 255)'
					},
					{
						icon: 'icon-wallet',
						title: '商务合作',
						path: '/sub_tim/pages/joinUs/index',
						color: 'rgb(85, 170, 255)'
					},
					{
						icon: 'icon-summary',
						title: '关于我们',
						path: '/sub_user/pages/about/index',
						color: 'rgb(224, 116, 114)'
					},
					{
						icon: 'icon-summary',
						title: '退出登录',
						path: '/pages/login/login',
						color: 'rgb(224, 116, 114)'
					},
				],
				adviserList:[
					{
						icon: 'icon-summary',
						title: '邀约进度',
						path: '/sub_user/pages/invited/index',
						color: 'rgb(224, 116, 114)'
					},
					{
						icon: 'icon-summary',
						title: '运营等级',
						path: '/pages/login/login',
						color: 'rgb(224, 116, 114)'
					},
					{
						icon: 'icon-kefu',
						title: '联系客服',
						path: '/pages/setting/setting',
						color: 'rgb(85, 170, 255)'
					},
					{
						icon: 'icon-summary',
						title: '关于我们',
						path: '/sub_user/pages/about/index',
						color: 'rgb(224, 116, 114)'
					},
				]
			}
		},
		computed: {
			...mapState(['userInfo','objToken'])
		},
		onLoad(){
			console.log(this.userInfo,'userInfo')
			console.log(this.objToken,'objToken')
		},
		mounted() {
		},
		// onHide：监听页面的隐藏
		// 当从当前A页跳转到其他页面，那么A页面处于隐藏状态。
		onHide() {
			this.showOper = true
		},
		methods: {
			// 个人信息跳转
			personalInfoLink() {
				checkLogin().then(() => {
					uni.navigateTo({
						url: '/sub_user/pages/personalInfo/index'
					})
				}).catch(() => {
					// goLogin()
					uni.navigateTo({
						url:'/pages/login/index'
					})
				})
			},
			//菜单跳转
			mesListItemClick(index) {
				uni.navigateTo({
					url: this.mesList[index].path
				})
			},
			//钱包跳转
			walletLink() {
				uni.navigateTo({
					url: '/sub_user/pages/wallet/index'
				})
			},
			//入学进度点击展开
			showOperClick() {
				this.showOper = false
				this.processMaskShow = true
			},
			//遮罩层触摸事件：遮罩层隐藏且入学进度模块收起
			processTouchstart(){
				this.processMaskShow = false
				this.showOper = true
			},
			//兼容PC端上浏览时使用鼠标滚动而不是触摸
			onPageScroll() {
				this.showOper = true
			},
			// 入学进度
			progressDetail() {
				uni.navigateTo({
					url: "/sub_user/pages/progress/index"
				})
			},
			//分享入口
			shareClick() {
				uni.navigateTo({
					url: '/sub_user/pages/poster/index'
				})
			},
			//顾问端
			//钱包跳转
			adviserWalletLink(){
				uni.navigateTo({
					url:'/sub_adviser/pages/wallet/index'
				})
			},
			//我的团队
			adviserTeam(){
				uni.navigateTo({
					url:'/sub_adviser/pages/team/index'
				})
			}
		}
	}
</script>
<style lang="scss">
	page{background: $page-background;}
</style>
<style lang="scss" scoped>
	.processMask{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: transparent;
		// background: rgba(0,0,0,.5);
		z-index: 2;
	}
    // 普通用户端
	.role-user {

		//头部
		.header {
			padding: 60rpx 30rpx;
			background: #12aca8;
			color: #fff;
			.header_top {
				@include flex-c();

				.avatarImg {
					@include w-h-br(120rpx);
				}

				.name_part {
					margin-left: 30rpx;

					.name {
						font-weight: bold;
					}

					.edit {
						font-size: 26rpx;
						margin-top: 10rpx;
					}
				}

				.money {
					margin-left: auto;
					font-size: 50rpx;
					color: #55aaff;
				}
			}

			.header_bottom {
				@include flex-c-a();
				margin-top: 30rpx;

				.item {
					text-align: center;

					.num {
						font-weight: bold;
						font-size: 35rpx;
					}

					.title {
						font-size: 22rpx;
						margin-top: 10rpx;
					}
				}
			}

		}

		//头部

		//入学进度
		.process {
			padding: 30rpx;

			.title {
				font-weight: bold;
				margin-bottom: 20rpx;
			}

			.content {
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 140rpx;
				background: #fff;
				padding: 10rpx;
				border-radius: 10rpx;
				overflow: hidden;
				.content_left {
					display: flex;
					align-items: center;

					image {
						width: 120rpx;
						height: 120rpx;
					}

					.info {
						margin-left: 20rpx;

						.pro_top {
							font-weight: bold;
						}

						.schoolName {
							font-size: 28rpx;
							@include line-clamp-one;
							max-width: 400rpx;
						}

						.pro_bottom {
							font-size: 28rpx;
							color: #999;
							white-space: nowrap;
							@include line-clamp-one;
							max-width: 400rpx;
						}
					}
				}

				.pot {
					margin: auto 10rpx;
				}

				.operation {
					display: flex;
					position: relative;
					z-index: 3;
					.item {
						width: 90rpx;
						height: 140rpx;
						text-align: center;
						line-height: 140rpx;
						border-radius: 10rpx;
						font-size: 28rpx;
					}

					.detail {
						background: #55aaff;
						margin-right: 10rpx;
						color: #fff;
					}

					.share {
						background: #ccc;
					}
				}
			}

			.marginLeft {
				margin-left: -80rpx;
				animation: scrollLeft 1s;

				@keyframes scrollLeft {
					0% {
						margin-left: 0;
					}

					100% {
						margin-left: -80rpx;
					}
				}
			}
		}

		//入学进度

		//分享入口图
		.share_enter {
			width: 100%;
			height: 200rpx;
		}

		//分享入口图	
	}
	// 普通用户端
	
	// 顾问端
	   .role-adviser{
	   		   .wallet{
	   			   display: flex;
	   			   align-items: center;
	   			   padding: 20rpx;
	   			   background: #fff;
	   			   margin: 20rpx;
	   			   border-radius: 10rpx;
	   			   .wallet-left{
	   				   
	   			   }
	   			   .wallet-right{
	   				   padding: 10rpx 20rpx;
	   				   border: 1rpx solid;
	   				   border-radius: 10rpx;
	   				   margin-left: auto;
	   			   }
	   		   }
	   		   .function{
	   			   display: flex;
	   			   justify-content: space-between;
	   			   margin: 20rpx;
	   			   border-radius: 10rpx;
	   			   .function-item{
	   				   display: flex;
	   				   align-items: center;
	   				   justify-content: space-between;
	   				   background: #fff;
	   				   width: 48%;
	   				   padding: 10rpx;
	   				   .item-left{
	   					   
	   				   }
	   				   .image{
	   					   width: 80rpx;
	   					   height: 80rpx;
	   				   }
	   			   }
	   		   }
	   }
	// 顾问端
</style>
