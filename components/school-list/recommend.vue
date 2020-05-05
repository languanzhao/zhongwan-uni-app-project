<template>
	<view class="recommend">
		<!-- 布局二 -->
		<view class="schoolList-two">
			<view class="header">
				<view class="title u-skeleton-rect">为你推荐</view>
				<view class="all u-skeleton-rect">显示全部</view>
			</view>
			<scroll-view scroll-x="true" class="scrollView">
				<view class="scrollView-item" v-for="(item,index) of list" :key='index' @click.stop="goDetail(item.id)">
					<view class="imageBox u-skeleton-circle">
						<image :src="item.src" mode=""></image>
					</view>
					<view class="schoolName u-skeleton-rect">{{item.name}}</view>
					<view class="label u-skeleton-rect">热门院校</view>
					<view class="detail u-skeleton-rect">查看详情</view>
					<view class="iconfont cancel icon-cancel u-skeleton-rect" @click.stop="delBtn(item.id)"></view>
				</view>
			</scroll-view>
		</view>
		<!-- 布局二 -->
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
			//进入详情
			goDetail(id){
				uni.navigateTo({
					url:'/sub_school/pages/detail/index'
				})
			},
			//删除某项
			delBtn(id){
				
			}
		}
	}
</script>

<style lang="scss">
	// 布局二
	.schoolList-two{
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
			padding: 10rpx 0;
			.scrollView-item{
				position: relative;
				display: inline-block;
				background: #fff;
				padding: 10rpx 10rpx;
				margin: 10rpx 0 10rpx 20rpx;
				width: 200rpx;
				text-align: center;
				box-shadow: 0 0 4rpx #ccc;
				&:last-child{
					margin-right: 20rpx;
				}
				.imageBox{
					@include w-h-br(120rpx);
					margin: 0 auto;
				}
				.schoolName{
					font-size: 26rpx;
					font-weight: bold;
					white-space:normal;
					@include line-clamp-more;
					margin: 10rpx 0;
				}
				.label{
					color: #999;
					font-size: 26rpx;
					margin-bottom: 10rpx;
				}
				.detail{
					padding: 4rpx 0;
					color: #fff;
					background: blue;
					font-size: 28rpx;
					border-radius: 10rpx;
				}
				.cancel{
					position: absolute;
					top: 0;
					right: 0;
					padding: 10rpx;
				}
			}
		}
	}
	// 布局二
</style>
