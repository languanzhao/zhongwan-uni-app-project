<template>
	<view class="detail">
		<view class="u-skeleton">
			<view class="detail_header">
				<view class="schoolAvatar">
					<view class="avatarImgBox u-skeleton-circle">
						 <image src="http://img4.imgtn.bdimg.com/it/u=3894159655,3953106493&fm=26&gp=0.jpg" mode=""></image>
					</view>
					<view class="schoolInfo">
						<view class="item" v-for="(item,index) of schoolInfoList" :key='index'>
							<view class="num u-skeleton-rect">{{item.num}}</view>
							<view class="title u-skeleton-rect">{{item.title}}</view>
						</view>
					</view>
				</view>
				<view class="detail_title u-skeleton-rect">佛山市南海区卫生职业技术学校<text>助学计划</text></view>
				<view class="school_code u-skeleton-rect">招生代码：8808964</view>
				<view class="labelList">
					招生范围：
					<view class="labelList-item u-skeleton-fillet" v-for="(item,index) of labelList" :key="index">
						{{item.title}}
					</view>
				</view>
				<!-- 操作按钮 -->
				<view class="operation">
					<view class="operation-item">
						<text class="iconfont icon-collect"></text>
						<text class="title">收藏</text>
					</view>
					<view class="operation-item">
						<text class="iconfont icon-kefu"></text>
						<text class="title">联系咨询</text>
					</view>
					<view class="operation-item">
						<text class="iconfont icon-share"></text>
						<text class="title">报名邀约</text>
					</view>
					<view class="operation-item" @click="showSameSchoolBtn">
						<text class="iconfont icon-jiantoushang"></text>
					</view>
				</view>
			</view>
			<!-- 相关院校 -->
			<view :class="['sameSchool',showSameSchoolBool ? 'downAnimation' : 'upAnimation']">
				<recommend-list :list='list'></recommend-list>
			</view>
			<!-- tab页签 -->
			<u-sticky>
				<view class="detail_tab">
					<view class="tab-item u-skeleton-rect">
						<text class="iconfont icon-collect"></text>
						<text class="title">图片视频</text>
					</view>
					<view class="tab-item tab-item-center u-skeleton-rect">
						<text class="iconfont icon-collect"></text>
						<text class="title">学校概括</text>
					</view>
					<view class="tab-item u-skeleton-rect">
						<text class="iconfont icon-collect"></text>
						<text class="title">招收专业</text>
					</view>
				</view>
			</u-sticky>
			<!-- 学院介绍 -->
			<view class="detail_intro">
				<view class="title u-skeleton-rect">学院介绍</view>
				<view class="introList">
					<view class="intro-item u-skeleton-rect" v-for="(item,index) of 6" :key='index'>
						<text>创建时间：</text>
						<text>1985年</text>
					</view>
				</view>
			</view>
			<!-- 学院位置 -->
			<view class="detail_loaction" @click="locationClick">
				<view class="title"><view>学院位置</view><view class="iconfont icon-you"></view></view>
				<view class="address">
					<map style="width: 100%; height: 120px;" :latitude="latitude" :scale='14' :longitude="longitude" :markers="markers">
					</map>
				</view>
			</view>
			<view class="fixed_bottom_btn_place">
				<view class="fixed_bottom_btn" @click="applyBtn">
					<view class="word">
						立即报读
					</view>
				</view>
			</view>
		</view>
		<u-skeleton :loading="skeletonLoading" :animation="true" bgColor="#FFF"></u-skeleton>
	</view>
</template>

<script>
	import Map from '@/common/map/openMap.js'
	import { checkAuthSetting } from '@/common/utils.js'
	import recommendList from '@/components/school-list/recommend'
	export default{
		components:{
			recommendList
		},
		data(){
			return {
				skeletonLoading:true,
				latitude:23.136831,
				longitude:113.35451,
				showSameSchoolBool:false,
				schoolInfoList:[
					{
						title:'招生人数',
						num:233
					},
					{
						title:'已报读',
						num:35
					},
					{
						title:'已收藏',
						num:77
					}
				],
				labelList:[
					{
						title:'初/高中'
					},
					{
						title:'应届'
					},
					{
						title:'广东'
					}
				],
				markers:[
					{
						latitude:23.136831,
						longitude:113.35451,
						iconPath:'../../.././static/location.png',
						width:30,
						height:30
					}
				],
				list:[
					{
						name:'广东省江门市中医药学校中医药学校',
						title:'招生简章（文章标题）',
						summary:'摘要信息摘要信息摘要信息摘要信息摘要信息摘要信息摘要信息摘要信息摘要信息摘要信息摘要信息摘要信息摘要信息',
						src:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=279014724,3576045650&fm=26&gp=0.jpg'
					},
					{
						name:'广东省江门市中医药学校中医药学校',
						title:'招生简章（文章标题）',
						summary:'摘要信息摘要信息摘要信息摘要信息摘要信息摘要信息摘要信息摘要信息摘要信息摘要信息摘要信息摘要信息摘要信息',
						src:'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1895142906,2120153073&fm=26&gp=0.jpg'
					},
					{
						name:'广东省江门市中医药学校中医药学校',
						title:'招生简章（文章标题）',
						summary:'摘要信息摘要信息摘要信息摘要信息摘要信息摘要信息摘要信息摘要信息摘要信息摘要信息摘要信息摘要信息摘要信息',
						src:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3310152134,2081799402&fm=26&gp=0.jpg'
					},
					{
						name:'广东省江门市中医药学校中医药学校',
						title:'招生简章（文章标题）',
						summary:'摘要信息摘要信息摘要信息摘要信息摘要信息摘要信息摘要信息摘要信息摘要信息摘要信息摘要信息摘要信息摘要信息',
						src:'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3689087844,1414598313&fm=26&gp=0.jpg'
					},
					{
						name:'广东省江门市中医药学校中医药学校',
						title:'招生简章（文章标题）',
						summary:'摘要信息摘要信息摘要信息摘要信息摘要信息摘要信息摘要信息摘要信息摘要信息摘要信息摘要信息摘要信息摘要信息',
						src:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=143231371,1495280367&fm=26&gp=0.jpg'
					},
					{
						name:'广东省江门市中医药学校中医药学校',
						title:'招生简章（文章标题）',
						summary:'摘要信息摘要信息摘要信息摘要信息摘要信息摘要信息摘要信息摘要信息摘要信息摘要信息摘要信息摘要信息摘要信息',
						src:'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3835849857,4166569740&fm=26&gp=0.jpg'
					},
					{
						name:'广东省江门市中医药学校中医药学校',
						title:'招生简章（文章标题）',
						summary:'摘要信息摘要信息摘要信息摘要信息摘要信息摘要信息摘要信息摘要信息摘要信息摘要信息摘要信息摘要信息摘要信息',
						src:'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1722612247,2893669036&fm=26&gp=0.jpg'
					},
					{
						name:'广东省江门市中医药学校中医药学校',
						title:'招生简章（文章标题）',
						summary:'摘要信息摘要信息摘要信息摘要信息摘要信息摘要信息摘要信息摘要信息摘要信息摘要信息摘要信息摘要信息摘要信息',
						src:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=279014724,3576045650&fm=26&gp=0.jpg'
					},
					{
						name:'广东省江门市中医药学校中医药学校',
						title:'招生简章（文章标题）',
						summary:'摘要信息摘要信息摘要信息摘要信息摘要信息摘要信息摘要信息摘要信息摘要信息摘要信息摘要信息摘要信息摘要信息',
						src:'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1895142906,2120153073&fm=26&gp=0.jpg'
					},
				],
			}
		},
		onLoad(){
			setTimeout(() => {
				this.skeletonLoading = false
			},3000)
		},
		methods:{
			applyBtn(){
				uni.navigateTo({
					url:'/sub_school/pages/apply/index'
				})
			},
			//定位
			locationClick(){
				// #ifdef MP
				checkAuthSetting().then(()=>{
					uni.openLocation({ //​使用微信内置地图查看位置。
					        latitude: this.latitude, //要去的纬度-地址
					        longitude: this.longitude, //要去的经度-地址
							name:'暨南大学',
					        address: "暨南大学", //详细地址
					        scale: 14
					      })
				})
				// #endif
				
				// #ifndef MP
					Map.openMap(this.latitude,this.longitude, "暨南大学", 'gcj02')
				// #endif
			},
			//显示隐藏相似院校
			showSameSchoolBtn(){
				this.showSameSchoolBool = !this.showSameSchoolBool
			}
		}
	}
</script>
<style lang="scss">
	page{background: $page-background;}
</style>
<style lang="scss" scoped>
	.detail{
		.detail_header{
			padding: 30rpx 30rpx 0;
			margin-bottom: 20rpx;
			.schoolAvatar{
				display: flex;
				align-items: center;
				justify-content: space-between;
				.avatarImgBox{
					@include w-h-br(160rpx);
				}
				.schoolInfo{
					display: flex;
					.item{
						margin-left: 60rpx;
						text-align: center;
					}
				}
			}
			.detail_title{
				margin: 20rpx 0;
				font-weight: bold;
				text{
					padding: 4rpx 10rpx;
					border:1rpx solid;
					margin-left: 10rpx;
					font-size: 24rpx;
				}
			}
			.school_code{
				color: #999;
				font-size: 26rpx;
			}
			.labelList{
				display: flex;
				align-items: center;
				margin: 20rpx 0;
				.labelList-item{
					border-radius: 30rpx;
					border:1rpx solid;
					padding: 10rpx 20rpx;
					margin-right: 20rpx;
					font-size: 26rpx;
				}
			}
			.operation{
				display: flex;
				align-items: center;
				justify-content: space-around;
				.operation-item{
					border-radius: 10rpx;
					padding: 0 20rpx;
					border:1rpx solid #999;
					background: #fff;
					.iconfont{
						font-size: 40rpx;
					}
				}
			}
		}
		.sameSchool{
			background: #fff;
			overflow: hidden;
		}
		.upAnimation{
			height: 0;
			transition: height .5s;
		}
		.downAnimation{
			height: 450rpx;
			transition: height .5s;
		}
		.detail_tab{
		    display: flex;
			justify-content: space-between;
			padding: 10rpx 30rpx;
			background: $page-background;
			border-top: 1rpx solid #d8d8d8;
			.tab-item-center{
				margin: 0 10rpx;
			}
			.tab-item{
				padding: 20rpx 30rpx;
				.title{
					margin-left: 10rpx;
				}
			}
		}
		.detail_intro{
			padding: 0 30rpx;
			.title{
				font-weight: bold;
				margin: 20rpx 0;
			}
			.introList{
				display: flex;
				flex-wrap: wrap;
				.intro-item{
					width: 50%;
					margin-bottom: 20rpx;
					text:first-child{
						color: #999;
					}
				}
			}
		}
		.detail_loaction{
			padding: 0 30rpx;
			margin-bottom: 30rpx;
			.title{
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-weight: bold;
				margin: 20rpx 0;
			}
		}
	}
</style>
