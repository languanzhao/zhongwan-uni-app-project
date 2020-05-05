<template>
	<view class="list">
		<!-- 布局一 -->
		<view class="schoolList-one">
			 <!-- @mousedown='touchstartPage' 移动端的@touchstart 相当于 PC端的@mousedown 若要兼容PC端 加上@mousedown即可-->
			<view class="toast-bg" v-if="bgShow" @touchstart.prevent="touchstartPage"></view>
			<view class="schoolList-item" v-for="(item,index) of arr" :key='index'>
				<view class="item-padding">
					<view class="top">
						<view class="imageBox u-skeleton-circle" @click="goDetail()">
							<image :src="item.avatar" mode=""></image>
						</view>
						<view class="schoolName u-skeleton-rect">{{item.name}}</view>
						<view class="icon-right">
							<view class="iconfont icon-more u-skeleton-rect" @click.stop="floatPartClick(index)"></view>
							<view class="floatPart" v-if="item.floatShow">
								<view class="floatPart-item" v-for="(item,index) of floatPartList" :key='index' @click.stop="operationClick(index)">
									<view :class="['iconfont',item.icon]"></view>
									<view class="title">{{item.title}}</view>
								</view>
							</view>
						</view>
					</view>
					<view class="frontImage u-skeleton-rect" @click="goDetail()">
						<!-- <image :src="item.src" mode=""></image> -->
						<easy-loadimage mode=""
										class="easy-loadimage"
						                :scroll-top="scrollTop"
						                :image-src="item.image" 
						                :open-transition="true"></easy-loadimage>
					</view>
					<view class="center">
						<view class="enrollmentBox" @click="goDetail()">
							<view class="enrollment">
								<view class="avatarImgBox">
									<image class="avatarImg u-skeleton-circle" src="http://img4.imgtn.bdimg.com/it/u=3894159655,3953106493&fm=26&gp=0.jpg" mode="" v-for="(item,index) of 4" :key='index' v-if="index < 3"></image>
								</view>
								<view class="num u-skeleton-rect">
									等{{item.recruit_count}}人已报名
								</view>
							</view>
							<view class="article-title u-skeleton-rect">{{item.title}}</view>
						</view>
						<view class="operation">
							<view class="item u-skeleton-rect" v-for="(item,index) of operationList" :key='index' @click="userOper(index)">
								<view :class="['iconfont',item.icon]"></view>
								<view class="word">{{item.title}}</view>
							</view>
						</view>
					</view>
					<view class="summary u-skeleton-rect" @click="goDetail()">{{item.summary}}</view>
				</view>
				<recommend-list :list='arr' v-if="index === 0"></recommend-list>
				<video-list :list='arr' v-if="index === 3"></video-list>
			</view>
		</view>
		<!-- 分享弹窗 -->
		<uni-popup ref='popup' type="bottom">
			<view class="popupContent">
				<view class="popupContent-title">分享到</view>
				<view class="shareList">
					<view class="item" v-for="(item,index) of shareList" :key='index' @click="shareBtn(index)">{{item.title}}</view>
				</view>
			</view>
		</uni-popup>
		<!-- 布局一 -->
	</view>
</template>

<script>
	import recommendList from '@/components/school-list/recommend'
	import videoList from '@/components/school-list/video'
	import easyLoadimage from '@/components/easy-loadimage/easy-loadimage.vue'
	import uniPopup from '@/components/uni-popup/uni-popup'
	export default{
		props:{
			list:{
				type:Array,
				default:()=>[]
			},
			scrollTop:{
				type:Number,
				default:0
			}
		},
		components:{
			recommendList,
			videoList,
			easyLoadimage,
			uniPopup
		},
		data(){
			return {
				arr:[],
				bgShow:false,
				shareList:[
					{
						title:'微信'
					},
					{
						title:'朋友圈'
					}
				],
				floatPartList:[
					{
						icon:'icon-share',
						title:'分享'
					},
					{
						icon:'icon-baoming',
						title:'报名'
					},
					{
						icon:'icon-dislike',
						title:'不喜欢'
					}
				],
				operationList:[
					{
						icon:'icon-aixin',
						title:'收藏'
					},
					{
						icon:'icon-kefu',
						title:'咨询'
					},
					{
						icon:'icon-share',
						title:'分享'
					}
				]
			}
		},
		methods:{
			//点击浮动模块显示，且bgShow也显示
			floatPartClick(index){
			   this.$set(this.arr[index],'floatShow',true)
			   this.bgShow = true
			   // this.arr.map((item,i)=>{
				  //  if(index !== i){
					 //   this.$set(item,'floatShow',false)
				  //  }
			   // })
			},
			//进入详情
			goDetail(){
				uni.navigateTo({
					url:'/sub_school/pages/detail/index'
				})
			},
			//浮动模块中的操作按钮
			operationClick(index){
				this.sharePopup()
				console.log(index,'操作按钮')
			},
			//1、浮动模块显示时，只有一触摸到除浮动模块外的部分，bgShow 设置为false，floatShow 都为false
			//2、切换tababr时隐藏浮动模块
			touchstartPage(){
				this.bgShow = false
				this.arr.map((item,i)=>{
					   this.$set(item,'floatShow',false)
				})
			},
			// 收藏 客服 分享 按钮点击
			userOper(index){
				switch(index){
					case 0:
						this.chatBtn()
					break;
					case 1:
						this.collectBtn()
					break;
					case 2:
						this.sharePopup()
					break;
				}
			},
			// 分享功能
			sharePopup(){
				this.$refs.popup.open()
			},
			//点击分享类型
			shareBtn(index){
				if(index === 0){
					// #ifdef APP-PLUS
					this.shareWx()
					// #endif
				}else if(index === 1){
					this.shareFriendsCircle()
				}
			},
			//分享到微信
			shareWx(){
				uni.share({
					provider: "weixin",
					scene: "WXSceneSession",
					type: 0,
					href: "http://192.168.2.84:8080/#/sub_school/pages/detail/index" + '?userId=1000000',
					title: "点击打开我分享的链接，带了参数userId",
					summary: "我正在使用HBuilderX开发uni-app，赶紧跟我一起来体验！",
					imageUrl: "https://uviewui.com/common/logo.png",
					success: function (res) {
						console.log("success:" + JSON.stringify(res));
					},
					fail: function (err) {
						console.log("fail:" + JSON.stringify(err));
					}
				});
			},
			//分享到朋友圈
			shareFriendsCircle(){
				uni.share({
				    provider: "weixin",
				    scene: "WXSenceTimeline",
				    type: 0,
				    href: "http://192.168.2.84:8080/#/sub_school/pages/detail/index" + '?userId=1000000',
				    title: "uni-app分享",
				    summary: "我正在使用HBuilderX开发uni-app，赶紧跟我一起来体验！",
				    imageUrl: "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png",
				    success: function (res) {
				        console.log("success:" + JSON.stringify(res));
				    },
				    fail: function (err) {
				        console.log("fail:" + JSON.stringify(err));
				    }
				});
			}
		},
		onShow(){
			// #ifdef H5
				var jweixin = require('jweixin-module') //npm安装的引用  
				jweixin.ready(function(){  
					jweixin.config({
					  debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
					  appId: 'gh_15f222624527', // 必填，公众号的唯一标识
					  timestamp: 100000 , // 必填，生成签名的时间戳
					  nonceStr: '1', // 必填，生成签名的随机串
					  signature: '1',// 必填，签名
					  jsApiList: ['updateAppMessageShareData','updateTimelineShareData'] // 必填，需要使用的JS接口列表
					});
					//自定义“分享给朋友”及“分享到QQ”按钮的分享内容（1.4.0）  
					jweixin.updateAppMessageShareData({ 
						title: 'h5分享', // 分享标题
						desc: '这是分享描述', // 分享描述
						link: "http://192.168.2.84:8080/#/sub_school/pages/detail/index" + '?userId=1000000',// 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
						imgUrl: 'https://uviewui.com/common/logo.png', // 分享图标
						success: function (e) {
						 console.log(e,'e')
						}
					})
					//自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容（1.4.0）
					jweixin.updateTimelineShareData({ 
						title: 'h5分享标题', // 分享标题
						link: "http://192.168.2.84:8080/#/sub_school/pages/detail/index" + '?userId=1000000', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
						imgUrl: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png', // 分享图标
						success: function () {
						 
						}
					})
				});
			// #endif  
		},
		watch:{
			list:{
				immediate: true,
				deep: true,
				handler(value) {   
				   this.arr = value
				}
			},
			//监听页面发生滚动就将浮动模块隐藏 同时兼容PC端上浏览时使用鼠标滚动而不是触摸
			scrollTop(newVal,oldVal){
				if(newVal !== oldVal){
					this.bgShow = false
					this.arr.map((item,i)=>{
						this.$set(item,'floatShow',false)
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.popupContent{
		background: #fff;
		padding: 20rpx;
		// #ifdef H5
		margin-bottom: 50px;//适配网页
		// #endif
		.popupContent-title{
			text-align: center;
			font-weight: bold;
			font-size: 36rpx;
			margin-bottom: 20rpx;
		}
		.shareList{
			display: flex;
			align-items: center;
			justify-content: space-around;
		}
	}
	.toast-bg{
		background: rgba(0,0,0,.5);
		// background: transparent;
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		z-index: 1;
		touch-action: none;
	}
	//布局一
	.schoolList-one{
		.schoolList-item{
			background: #fff;
			margin-bottom: 10rpx;
			.item-padding{
				padding: 30rpx;
			}
			.top{
				display: flex;
				align-items: center;
				.imageBox{
					image{
						@include w-h-br(80rpx);
					}
				}
				.schoolName{
					margin-left: 20rpx;
				}
				.icon-right{
					 margin-left: auto;
					 position: relative;
					.icon-more{
						padding: 20rpx 0 20rpx 20rpx;
					}
					.floatPart{
						position: absolute;
						top: 60rpx;
						right: 0;
						z-index: 2;
						width: 200rpx;
						padding: 10rpx;
						border-radius: 10rpx;
						box-shadow: 2rpx 2rpx 2rpx 6rpx #f5f5f5;
						background: #fff;
						.floatPart-item{
							display: flex;
							align-items: center;
							margin: 16rpx 0;
							.iconfont{
								font-size: 40rpx;
							}
							.title{
								margin-left: 20rpx;
								color: #999;
							}
						}
					}
				}
			}
			.frontImage{
				width: 100%;
				height: 300rpx;
				overflow: hidden;
				.easy-loadimage{
					height: 300rpx;
					background: #f5f5f5;
				}
			}
			.center{
				display: flex;
				justify-content: space-between;
				.article-title{
					font-weight: bold;
				}
				.enrollmentBox{
					margin: 20rpx 0;
					.enrollment{
						display: flex;
						align-items: center;
						margin-bottom: 10rpx;
						.avatarImgBox{
							margin:0 10rpx 0 30rpx;
							.avatarImg{
								@include w-h-br(60rpx);
								margin-left: -30rpx;
							}
						}
						.num{
							font-size: 28rpx;
						}
						.article-title{
							font-weight: bold;
						}
					}
					.article-title{
						font-weight: bold;
					}
				}
				.operation{
					display: flex;
					align-items: center;
					.item{
						padding: 10rpx 0;
						text-align: center;
						margin-left: 30rpx;
						.iconfont{
							font-size: 40rpx;
						}
					}
				}
			}
			.summary{
				color: #999;
				@include line-clamp-one;
			}
		}
	}
	//布局一
</style>
