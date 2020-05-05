<template>
	<view class="">
		<!-- 布局三 -->
		<view class="schoolList-three">
			<view class="header">
				<view class="title">招生视频</view>
				<view class="all">显示全部</view>
			</view>
			<scroll-view scroll-x="true" class="scrollView">
				<view class="scrollView-item" v-for="(item,index) of list" :key='index' @click.stop="videoClick(item.id)">
					<view class="video_image">
						<image src="http://img4.imgtn.bdimg.com/it/u=3894159655,3953106493&fm=26&gp=0.jpg" mode=""></image>
					</view>
					<view class="content">
						<view class="title">这是视频标题</view>
						<view class="bottom">
							<view class="imageBox">
								<image src="http://img4.imgtn.bdimg.com/it/u=3894159655,3953106493&fm=26&gp=0.jpg" mode=""></image>
							</view>
							<view class="schoolName">
								{{item.name}}
							</view>
						</view>
					</view>
					<view class="iconfont cancel icon-cancel" @click.stop="delBtn(item.id)"></view>
				</view>
			</scroll-view>
		</view>
		<!-- 布局三 -->
	</view>
</template>

<script>
	export default{
		props:{
			list:{
				type:Array,
				default:()=>[]
			}
		},
		components:{
			
		},
		data(){
			return {
				
			}
		},
		methods:{
			videoClick(id){
				uni.navigateTo({
					url:'/sub_school/pages/detail/img-video'
				})
			},
			//删除某项
			delBtn(id){
				
			}
		}
	}
</script>

<style lang="scss">
	// 布局三
	.schoolList-three{
		background: #f5f5f5;
		margin: 20rpx 0;
		.header{
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 20rpx 30rpx;
			.title{
				
			}
			.all{
				color: blue;
				font-size: 28rpx;
			}
		}
		.scrollView{
			white-space: nowrap;
			.scrollView-item{
				position: relative;
				display: inline-block;
				background: #fff;
				margin-left:20rpx;
				width: 400rpx;
				&:last-child{
					margin-right: 20rpx;
				}
				.video_image{
					width: 400rpx;
					height: 300rpx;
				}
				.content{
					padding: 10rpx;
					.title{
						@include line-clamp-one;
						margin-bottom: 10rpx;
					}
					.bottom{
						display: flex;
						align-items: center;
						.imageBox{
							image{
								@include w-h-br(60rpx);
							}
							margin-right: 10rpx;
						}
						.schoolName{
							font-size: 26rpx;
							font-weight: bold;
							@include line-clamp-one;
						}
					}
				}
				.cancel{
					position: absolute;
					top: 6rpx;
					right: 6rpx;
					background: rgba(0,0,0,.5);
					color: #fff;
					font-size: 30rpx;
					padding: 6rpx;
					border-radius: 50%;
				}
			}
		}
	}
	// 布局三
</style>
