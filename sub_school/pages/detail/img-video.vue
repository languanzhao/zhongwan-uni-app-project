<template>
	<view class="list">
		<!-- 布局一 -->
		<view class="schoolList-one">
			<view class="schoolList-item" v-for="(item,index) of list" :key='index'>
				<view class="item-padding">
					<view class="top">
						<view class="imageBox">
							<image src="http://img4.imgtn.bdimg.com/it/u=3894159655,3953106493&fm=26&gp=0.jpg" mode=""></image>
						</view>
						<view class="schoolName">{{item.name}}</view>
						<view class="icon-right">
							<view class="iconfont icon-more"></view>
							<view class="floatPart" v-if="item.floatShow">
								<view class="floatPart-item" v-for="(item,index) of floatPartList" :key='index' @click.stop="operationClick(index)">
									<view :class="['iconfont',item.icon]"></view>
									<view class="title">{{item.title}}</view>
								</view>
							</view>
						</view>
					</view>
					<view class="frontImage">
							<video class="video" @play="playOrStop(item.id)" :id="String(item.id)" :src="item.src" controls></video>
					</view>
					<view class="center">
						<view class="enrollmentBox">
							<view class="article-title">{{item.title}}</view>
						</view>
					</view>
					<view class="summary">{{item.summary}}</view>
				</view>
			</view>
		</view>
		<!-- 布局一 -->
	</view>
</template>

<script>
	export default{
		
		components:{
			
		},
		data(){
			return {
				list:[
					{
						id:1,
						name:'广东省江门市中医药学校中医药学校',
						title:'招生简章（文章标题）',
						src:'https://mp4.vjshi.com/2018-12-28/1083f3db90334f86e3fc3586b4472914.mp4',
						summary:'学校一号说明'
					},
					{
						id:2,
						name:'广东省江门市中医药学校',
						title:'招生简章（文章标题）',
						src:'https://mp4.vjshi.com/2017-06-17/ed1d63669bea39f5ef078c4e194291d6.mp4',
						summary:'学校二号说明'
					},
					{
						id:3,
						name:'广东省江门市中医药学校',
						title:'招生简章（文章标题）',
						src:'',
						summary:'学校三号说明'
					},
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
				videoContext:{}
			}
		},
		onReady(){
			 this.videoContext = {};  
			            for (let i = 0; i < this.list.length; i++) {  
			                let id = this.list[i].id;  
			                this.videoContext[id] = uni.createVideoContext(String(id));  
			            }  
		},
		methods:{
			playOrStop(id){
				for (let i = 0; i < this.list.length; i++) {
					let _id = this.list[i].id
					if(id === _id){
						this.videoContext[id].play();
						// this.$nextTick(function() {
						// 	this.videoContext[id].requestFullScreen({direction:0});
						// });
					}else{
						this.videoContext[_id].pause();
					}
				}
				
			}
		},
		watch:{
			
		}
	}
</script>
<style lang="scss">
	page{background: $page-background;}
</style>
<style lang="scss" scoped>
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
						z-index: 1;
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
				// .swiper{
				// 	width: 100%;
				// 	height: 300rpx;
				// 	// .swiperItem,image{
				// 	// 	width: 100%;
				// 	// 	height: 300rpx;
				// 	// }
				// }
				.video{
					width: 100%;
					height: 300rpx;
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
					.article-title{
						font-weight: bold;
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
