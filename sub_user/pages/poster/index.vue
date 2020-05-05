<template>
	<view class="poster">
		<swiper class="swiper" previous-margin="60px" next-margin='60px' circular :current="current" @change="swiperChange">
			<swiper-item class="swiperItem" v-for="(item,index) of canvasImageList" :key='index'>
				<image :class="['canvasImage',current === index ? 'active' : '']" :src="item" mode=""></image>
			</swiper-item>
		</swiper>
		<view class="canvasBox">
			<canvas class="canvas" canvas-id="myCanvasOne"></canvas>
			<canvas class="canvas" canvas-id="myCanvasTwo"></canvas>
			<canvas class="canvas" canvas-id="myCanvasThree"></canvas>
		</view>
		<view class="shareContent" v-if="canvasImageList[0]">
			<view class="shareTitle">分享到</view>
			<view class="shareList">
				<view class="item" @click="shareClick(0)">
					<image class="image" src="../../../static/login/wx.png" mode=""></image>
					<view class="title">微信</view>
				</view>
				<view class="item" @click="shareClick(1)">
					<image class="image" src="../../../static/login/circle.png" mode=""></image>
					<view class="title">朋友圈</view>
				</view>
				<view class="item" @click="shareClick(2)">
					<text class="image iconfont icon-downLoad"></text>
					<view class="title">保存图片</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				current:0,
				canvasImageList:[],
				codeImg:''
			}
		},
		onReady() {
			uni.getImageInfo({
				src:'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3449774915,2628567042&fm=26&gp=0.jpg',
				success:res => {
					this.codeImg = res.path
					this.myCanvasOne('myCanvasOne','/static/poster/posterbg01.png')
					this.myCanvasOne('myCanvasTwo','/static/poster/posterbg02.png')
					this.myCanvasOne('myCanvasThree','/static/poster/posterbg03.png')
				}
			})
			
		},
		methods: {
			//切换图片
			swiperChange(e) {
				this.current = e.detail.current;
			},
			//分享点击操作
			shareClick(index){
				if(this.canvasImageList.length > 0){
					if(index === 0){
						this.shareWx()
					}else if(index === 1){
						this.shareCircle()
					}else if(index === 2){
						this.saveImage()
					}
				}
			},
			//分享到微信
			shareWx(){
				// #ifdef APP-PLUS
					uni.share({
						provider: "weixin",
						scene: "WXSceneSession",
						type: 2,
						imageUrl: this.canvasImageList[this.current],
						success: function (res) {
							console.log("success:" + JSON.stringify(res));
						},
						fail: function (err) {
							console.log("fail:" + JSON.stringify(err));
						}
					});
				// #endif
				
				// #ifdef MP-WEIXIN
					uni.showModal({
						title:'提示',
						content:'长按可以分享给好友或者保存图片到相册',
						showCancel:false,
						success:() => {
							uni.previewImage({
								current: this.canvasImageList[this.current], 
								urls: this.canvasImageList
							})
						}
					})
				// #endif
			},
			//分享到朋友圈
			shareCircle(){
				// #ifdef APP-PLUS
					uni.share({
						provider: "weixin",
						scene: "WXSenceTimeline",
						type: 2,
						imageUrl: this.canvasImageList[this.current],
						success: function (res) {
							console.log("success:" + JSON.stringify(res));
						},
						fail: function (err) {
							console.log("fail:" + JSON.stringify(err));
						}
					});
				// #endif
				
				// #ifdef MP
					this.saveImage()
				// #endif
			},
			//保存图片
			saveImage(){
				// #ifndef H5
					uni.saveImageToPhotosAlbum({
						filePath: this.canvasImageList[this.current],
						success: function () {
							uni.showModal({
								title:'提示',
								content:'成功保存图片到相册，赶紧分享给好友或者发朋友圈吧！',
								showCancel:false,
								success:() => {}
							})
						}
					});
				// #endif
				
				// #ifdef H5
					uni.showToast({
						icon:'none',
						title:'长按图片保存即可'
					})
				// #endif
			},
			myCanvasOne(canvasId,bg) {
				uni.showLoading({
					title: '生成中...'
				})
				var context = uni.createCanvasContext(canvasId,this)
				context.fillRect(0, 0, 300, 420)
				//顶部图片
				context.drawImage(bg, 0, 0, 305, 420)
				// 考拉上学
				context.setFontSize(16)
				context.setTextAlign('center')
				context.fillText('考拉上学', 150, 25)
				context.stroke()
				// 书中自有黄金屋
				context.setFontSize(26)
				context.setTextAlign('center')
				context.setFillStyle('#fff')
				context.fillText('书中自有黄金屋', 150, 70)
				context.stroke()
				// 求学有考拉上学，
				context.setFontSize(12)
				context.setTextAlign('center')
				context.fillText('求学有考拉上学，', 130, 100)
				context.stroke()
				// 我的前途不迷茫
				context.setFontSize(12)
				context.setTextAlign('center')
				context.fillText('我的前途不迷茫', 150, 120)
				context.stroke()
				
				// 邀请码
				context.setFontSize(14)
				context.setTextAlign('center')
				context.fillText('邀请码', 150, 380)
				context.stroke()
				
				// 邀请码（AVE788X）
				context.setFontSize(16)
				context.setTextAlign('center')
				context.fillText('AVE788X', 150, 405)
				context.stroke()
				// 小程序码
				context.drawImage(this.codeImg, 100, 240,100, 100)
				context.stroke()
				//绘制
				context.draw()
				//生成图片
				setTimeout(() => {
					uni.canvasToTempFilePath({
						canvasId: canvasId,
						success: res => {
							this.canvasImageList.push(res.tempFilePath)
							uni.hideLoading()
						}
					});
				}, 500)
			},
		}
	}
</script>

<style lang="scss" scoped>
	.poster {
		.swiper{
			width: 100%;
			height: 480px;
			background: #fafafa;
			.swiperItem{
				display: flex;
				justify-content: center;
				align-items: center;
				.canvasImage{
					width: 300px;
					height: 400px;
					margin: auto 30rpx;
				}
				.active {
					transform: scale(1.08);
					transition: all 0.2s ease-in 0.2s;
				}
			}
		}
		.canvasBox{
			position: fixed;
			left: 0;
			top: 9999rpx;
			width: 300px;
			height: 420px;
			.canvas{
				width: 100%;
				height: 100%;
			}
		}
		.shareContent{
			position: fixed;
			left: 0;
			bottom: 0;
			width: 100%;
			padding-bottom: 30rpx;
			.shareTitle{
				font-weight: bold;
				font-size: 32rpx;
				text-align: center;
				margin-bottom: 30rpx;
			}
			.shareList{
				display: flex;
				align-items: center;
				justify-content: space-around;
				.item{
					text-align: center;
					.image{
						width: 50rpx;
						height: 50rpx;
					}
					.icon-downLoad{
						color: #0071FF;
						font-size: 50rpx;
					}
				}
			}
			
		}
	}
</style>
