<template>
	<view class="team">
		<roleAdviser></roleAdviser>
		<u-sticky>
			<!-- 只能有一个根元素 -->
			<view class="team_tab">
				<view 
					:class="['tab_item',current === index ? 'active' : '']"
					v-for="(item,index) of tabList" 
					:key="index"
					@click="tabChange(index)"
					>{{item.title}}</view>
			</view>
		</u-sticky>
		<view class="content" v-if="current === 0">
			<view class="item" v-for="(item,index) of contentList" :key='index'>
				<image class="image" :src="item.image" mode=""></image>
				<view class="center">
					<view class="name">{{item.name}}</view>
					<view class="date">注册时间：{{1587719808976 | timeFormat}}</view>
				</view>
				<view class="num">2个邀请</view>
			</view>
		</view>
		<view class="content" v-if="current === 1">
			<view class="item" v-for="(item,index) of invitedList" :key='index'>
				<image class="image" :src="item.image" mode=""></image>
				<view class="center">
					<view class="name">{{item.name}}</view>
					<view class="date">注册时间：2020-06-16</view>
				</view>
				<view class="num">2个邀请</view>
			</view>
		</view>
		<view class="content" v-if="current === 2">
			<view class="item" v-for="(item,index) of contentList" :key='index'>
				<image class="image" :src="item.image" mode=""></image>
				<view class="center">
					<view class="name">{{item.name}}</view>
					<view class="date">注册时间：2020-06-16</view>
				</view>
				<view class="num">2个邀请</view>
			</view>
		</view>
	</view>
</template>

<script>
	import roleAdviser from '@/pages/user/components/role-adviser.vue'
	export default{
		components:{
			roleAdviser
		},
		data(){
			return {
				current:0,
				tabList:[
					{
						title:'直邀'
					},
					{
						title:'推荐'
					},
					{
						title:'锁粉'
					}
				],
				invitedList:[
					{
						image:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=279014724,3576045650&fm=26&gp=0.jpg',
						name:'昵称',
					},
					{
						image:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=279014724,3576045650&fm=26&gp=0.jpg',
						name:'昵称',
					},
					{
						image:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=279014724,3576045650&fm=26&gp=0.jpg',
						name:'昵称',
					},
					{
						image:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=279014724,3576045650&fm=26&gp=0.jpg',
						name:'昵称',
					},
					{
						image:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=279014724,3576045650&fm=26&gp=0.jpg',
						name:'昵称',
					},
					{
						image:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=279014724,3576045650&fm=26&gp=0.jpg',
						name:'昵称',
					},
					{
						image:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=279014724,3576045650&fm=26&gp=0.jpg',
						name:'昵称',
					},
					{
						image:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=279014724,3576045650&fm=26&gp=0.jpg',
						name:'昵称',
					},
					{
						image:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=279014724,3576045650&fm=26&gp=0.jpg',
						name:'昵称',
					},
					{
						image:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=279014724,3576045650&fm=26&gp=0.jpg',
						name:'昵称',
					},
					{
						image:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=279014724,3576045650&fm=26&gp=0.jpg',
						name:'昵称',
					},
					{
						image:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=279014724,3576045650&fm=26&gp=0.jpg',
						name:'昵称',
					}
				],
				contentList:[
					{
						image:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=279014724,3576045650&fm=26&gp=0.jpg',
						name:'昵称',
					},
					{
						image:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=279014724,3576045650&fm=26&gp=0.jpg',
						name:'昵称',
					},
					{
						image:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=279014724,3576045650&fm=26&gp=0.jpg',
						name:'昵称',
					},
					{
						image:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=279014724,3576045650&fm=26&gp=0.jpg',
						name:'昵称',
					},
					{
						image:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=279014724,3576045650&fm=26&gp=0.jpg',
						name:'昵称',
					},
					{
						image:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=279014724,3576045650&fm=26&gp=0.jpg',
						name:'昵称',
					},
					{
						image:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=279014724,3576045650&fm=26&gp=0.jpg',
						name:'昵称',
					},
					{
						image:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=279014724,3576045650&fm=26&gp=0.jpg',
						name:'昵称',
					},
					{
						image:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=279014724,3576045650&fm=26&gp=0.jpg',
						name:'昵称',
					},
					{
						image:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=279014724,3576045650&fm=26&gp=0.jpg',
						name:'昵称',
					},
					{
						image:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=279014724,3576045650&fm=26&gp=0.jpg',
						name:'昵称',
					},
					{
						image:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=279014724,3576045650&fm=26&gp=0.jpg',
						name:'昵称',
					}
				]
			}
		},
		computed: {
			
		},
		onLoad(){
			
		},
		methods:{
			tabChange(index){
				this.current = index
			}
		}
	}
</script>
<style lang="scss">
	page{background: $page-background;}
</style>
<style lang="scss" scoped>
	.team{
		.team_tab{
			display: flex;
			justify-content: space-around;
			align-items: center;
			background: #fff;
			.tab_item{
				text-align: center;
				padding: 20rpx 60rpx;
				border-bottom: 2rpx solid #fff;
			}
			.active{
				border-color: #0071FF;
			}
		}
		.content{
			.item{
				display: flex;
				align-items: center;
				padding: 20rpx;
				background: #fff;
				margin-bottom: 2rpx;
				.image{
					width: 100rpx;
					height: 100rpx;
				}
				.center{
					margin-left: 20rpx;
					.name{
						
					}
					.date{
						font-size: 26rpx;
						color: #999;
						margin-top: 10rpx;
					}
				}
				.num{
					margin-left: auto;
					border-left: 2rpx solid #ccc;
					padding: 10rpx 20rpx;
					color: #666;
				}
			}
		}
	}
</style>
