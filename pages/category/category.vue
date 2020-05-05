<template>
	<view class="category">
		<view class="topPart">
			<!-- 搜索 -->
			<view class="header">
				<view class="search" @click="searchLink">
					<text class="iconfont icon-search"></text>
					<text class="input">搜索</text>
				</view>
			</view>
			<!-- tab页签 -->
			<view class="tab">
				<view :class="['item',current === item.id ? 'current' : '']" v-for="(item,index) of tabList" :key="index" @click="tabClick(item.id)">
					{{item.title}}
				</view>
			</view>
		</view>
		<view class="viewPort">
			<scroll-view class="scroll-left" scroll-y="true" :style="{'height':scrollViewHeight + 'px'}">
				<view v-for="(item,index) of leftList" :key='index' :class="['item',leftActive(item.id) ? 'leftActive' :'']" @click="leftListClick(item.id)">{{item.title}}{{item.id}}</view>
			</scroll-view>
			<scroll-view class="scroll-right" scroll-y="true" :style="{'height':scrollViewHeight + 'px'}">
				<view class="item">全部</view>
				<view class="item" v-for="(item,index) of rightList" :key='index' >
					<view class="itemTitle">计算机</view>
					<view class="child" v-for="(iitem,iindex) of item.childList" :key='iindex'>
						{{iitem.title}}
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="fixed-bottom-btn-two">
			<view class="fixed-bottom-btn">
				<view class="left">重置</view>
				<view class="right">确定</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		components:{
			
		},
		data(){
			return {
				current:1,
				tabList:[
					{
						id:1,
						title:'专业'
					},
					{
						id:2,
						title:'学校'
					}
				],
				leftSelectedList:[],
				leftList:[
					{
						id:1,
						title:'计算机'
					},
					{
						id:2,
						title:'经济学'
					},
					{
						id:3,
						title:'营销学'
					},
					{
						id:4,
						title:'美学'
					},
					{
						id:5,
						title:'电子商务'
					},
					{
						id:6,
						title:'计算机'
					},
					{
						id:7,
						title:'经济学'
					},
					{
						id:8,
						title:'营销学'
					},
					{
						id:9,
						title:'美学'
					},
					{
						id:10,
						title:'电子商务'
					},
					{
						id:11,
						title:'计算机'
					},
					{
						id:12,
						title:'经济学'
					},
					{
						id:13,
						title:'营销学'
					},
					{
						id:14,
						title:'美学'
					},
					{
						id:15,
						title:'电子商务'
					}
				],
				rightList:[
					{
						title:'计算机',
						childList:[
							{
								id:1,
								title:'计算机一'
							},
							{
								id:1,
								title:'计算机二'
							},
							{
								id:1,
								title:'计算机三'
							},
							{
								id:1,
								title:'计算机四'
							}
						]
					},
					{
						title:'经济学',
						childList:[
							{
								id:1,
								title:'经济学一'
							},
							{
								id:1,
								title:'经济学二'
							},
							{
								id:1,
								title:'经济学三'
							},
							{
								id:1,
								title:'计算机四'
							}
						]
					},
					{
						title:'计算机',
						childList:[
							{
								id:1,
								title:'计算机一'
							},
							{
								id:1,
								title:'计算机二'
							},
							{
								id:1,
								title:'计算机三'
							},
							{
								id:1,
								title:'计算机四'
							}
						]
					},
					{
						title:'经济学',
						childList:[
							{
								id:1,
								title:'经济学一'
							},
							{
								id:1,
								title:'经济学二'
							},
							{
								id:1,
								title:'经济学三'
							},
							{
								id:1,
								title:'计算机四'
							}
						]
					}
				],
				phoneHeight:0,
				topViewHeight:0,
				scrollViewHeight:0,
			}
		},
		methods:{
			tabClick(id){
				this.current = id
			},
			leftActive(id){
				return this.leftSelectedList.some(item => item === id)
			},
			leftListClick(id){
				let bool = this.leftSelectedList.some(item => item === id)
				if(bool){
					let index = this.leftSelectedList.findIndex(iitem => iitem === id)
					if (index !== -1) this.leftSelectedList.splice(index,1)
				}else{
					this.leftSelectedList.push(id)
				}
			}
		},
		onReady(){
			uni.getSystemInfo({
				success:res=>{
					//手机屏幕高度
					this.phoneHeight = res.windowHeight
					//顶部高度
					let topView = uni.createSelectorQuery().select(".topPart")
					topView.boundingClientRect(data => {
						this.topViewHeight = data.height
						//剩余空间即scroll-view的高度
						this.scrollViewHeight = this.phoneHeight - this.topViewHeight
					}).exec()
				}
			})
		}
	}
</script>
<style lang="scss">
	page{
		background: #fff;
		overflow-y:hidden;
	}
</style>
<style lang="scss" scoped>
	.category{
		.header{
			padding: 20rpx;
			box-shadow: 0 10rpx  10rpx #f4f4f4;
			.search{
				flex: 1;
				border-radius: 40rpx;
				overflow: hidden;
				background: #f4f4f4;
				padding: 20rpx;
				color: #757474;
				.icon-search{
					margin-right: 15rpx;
				}
			}
		}
		.tab{
			display: flex;
			margin:22rpx 20rpx;
			justify-content: space-between;
			align-items: center;
			.item{
				width: 48%;
				text-align: center;
				padding: 30rpx 0;
				background: #f4f4f4;
				color: #a2a2a2;
			}
			.current{
				color: #040404;
				font-size: 34rpx;
			}
		}
		.viewPort{
			display: flex;
			justify-content: space-between;
			border-top: 2rpx solid #f4f4f4;
			margin: 0 20rpx;
			.scroll-left{
				width: 28%;
				background: #f2f2f2;
				box-shadow:6rpx 0 8rpx #f4f4f4;
				.item{
					text-align: center;
					padding: 20rpx 0;
					color: #3c3b3b;
				}
				.leftActive{
					color: #040404;
					background: #fff;
					position: relative;
					font-size: 32rpx;
					&::before{
						content: '';
						position: absolute;
						left: 0;
						top: 50%;
						transform: translateY(-50%);
						width: 6rpx;
						height: 28rpx;
						background: #f0250f;
					}
				}
			}
			.scroll-right{
				width: 68%;
				background: #fff;
				box-shadow:-6rpx 0 8rpx #f4f4f4;
				.item{
					text-align: center;
					padding: 20rpx 0;
					.itemTitle{
						background: #d7d6d5;
						padding: 20rpx 0;
					}
					.child{
						padding: 20rpx 0;
					}
				}
			}
		}
		.fixed-bottom-btn{
			position: fixed;
			// #ifdef H5
			bottom: 50px;
			// #endif
			// #ifndef H5
			bottom: 0;
			// #endif
			left: 0;
			background: #fff;
			width: 100%;
			height: 100rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 30rpx;
			box-sizing: border-box;
			text-align: center;
			.left{
				width: 30%;
				background: #999;
				margin-right: 30rpx;
				border-radius: 10rpx;
				padding: 20rpx 0;
			}
			.right{
				width: 70%;
				background: #55aaff;
				color: #fff;
				border-radius: 10rpx;
				padding: 20rpx 0;
			}
		}
	}
</style>
