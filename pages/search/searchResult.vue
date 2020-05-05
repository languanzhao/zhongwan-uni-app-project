<template>
	<view class="searchResult">
		<view class="fixed-place">
			<view class="fixed">
				<!-- 搜索 -->
				<view class="header">
					<view class="loaction">广州</view>
					<view class="search" @click="searchLink">
						<text class="iconfont icon-search"></text>
						<text class="input">搜索</text>
					</view>
				</view>
				<!-- 分类 -->
				<view class="classify">
					<view class="left">
						<text class="text">综合</text>
						<text class="text">附近</text>
					</view>
					<view class="right">
						<text class="text">广州</text>
						<text class="text">筛选</text>
					</view>
				</view>
			</view>
		</view>
		<school-list :list='list'></school-list>
	</view>
</template>

<script>
	import schoolList from '@/components/school-list'
	export default{
		components:{
			schoolList
		},
		data(){
			return {
				inputVal:'',
				list:[
					{
						name:'广东省江门市中医科学院一号',
						type:'公办',
						level:'本科',
						address:'广州市/天河区/棠下'
					},
					{
						name:'广东省江门市中医科学院二号',
						type:'公办',
						level:'本科',
						address:'广州市/天河区/棠下'
					},
					{
						name:'广东省江门市中医科学院',
						type:'公办',
						level:'本科',
						address:'广州市/天河区/棠下'
					},
					{
						name:'广东省江门市中医科学院',
						type:'公办',
						level:'本科',
						address:'广州市/天河区/棠下'
					},
					{
						name:'广东省江门市中医科学院',
						type:'公办',
						level:'本科',
						address:'广州市/天河区/棠下'
					},
					{
						name:'广东省江门市中医科学院',
						type:'公办',
						level:'本科',
						address:'广州市/天河区/棠下'
					},
					{
						name:'广东省江门市中医科学院',
						type:'公办',
						level:'本科',
						address:'广州市/天河区/棠下'
					},
					{
						name:'广东省江门市中医科学院',
						type:'公办',
						level:'本科',
						address:'广州市/天河区/棠下'
					},
					{
						name:'广东省江门市中医科学院',
						type:'公办',
						level:'本科',
						address:'广州市/天河区/棠下'
					},
					{
						name:'广东省江门市中医科学院',
						type:'公办',
						level:'本科',
						address:'广州市/天河区/棠下'
					},
					{
						name:'广东省江门市中医科学院',
						type:'公办',
						level:'本科',
						address:'广州市/天河区/棠下'
					},
					{
						name:'广东省江门市中医科学院',
						type:'公办',
						level:'本科',
						address:'广州市/天河区/棠下'
					}
				]
			}
		},
		onLoad(options){
			if(options && options.inputVal){
				this.inputVal = options.inputVal
			}
		},
		methods:{
			searchLink(){
				
			}
		}
	}
</script>
<style lang="scss">
	page{background: $page-background;}
</style>
<style lang="scss" scoped>
	.searchResult{
		.fixed-place{
			height: 160rpx;
			.fixed{
				position: fixed;
				top: 44px;
				left: 0;
				width: 100%;
				z-index: 1;
				background: #fff;
			}
		}
		
		//头部
		.header{
			display: flex;
			align-items: center;
			padding:10rpx 20rpx;
			background: #f5f5f5;
			height: 60rpx;
			.loaction{
				margin-right: 20rpx;
			}
			.search{
				flex: 1;
				border-radius: 10rpx;
				overflow: hidden;
				background: #fff;
				padding: 5rpx 0;
				text-align: center;
				.icon-search{
					color: #ccc;
				}
				.input{
					color: #ccc;
				}
			}
		}
		//头部
		//分类
		.classify{
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-bottom: 1rpx solid #ccc;
			padding: 10rpx 0;
			background: #fff;
			height: 60rpx;
			margin: 0 20rpx;
			.left{
				.text{
					margin-right: 20rpx;
				}
			}
			.right{
				.text{
					background: #ccc;
					margin-left: 20rpx;
					font-size: 28rpx;
					padding: 6rpx 10rpx;
				}
			}
		}
		//分类
	}
</style>
