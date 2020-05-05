<template>
	<view class="index">
		<view class="u-skeleton">
			<!-- 搜索 -->
			<view class="header">
				<view class="loaction u-skeleton-rect">考拉上学</view>
				<view class="search u-skeleton-fillet" @click="searchLink">
					<text class="iconfont icon-search"></text>
					<text class="input">搜索</text>
				</view>
				<view class="iconfont icon-shaixuan u-skeleton-rect"></view>
			</view>
			<!-- 条件选择 -->
			<view class="condition">
				<view class="cond-left">
					<view class="item u-skeleton-rect">综合</view>
					<view class="item u-skeleton-rect">附近</view>
				</view>
				<view class="cond-right">
					<view class="item u-skeleton-rect" @click="chooseAddress">广州</view>
					<view class="item u-skeleton-rect">筛选</view>
				</view>
			</view>
			<!-- 搜索 -->
			<school-list ref='schoolList' :list='schoolList' :scrollTop="scrollTop"></school-list>
		</view>
		<u-skeleton :loading="skeletonLoading" :animation="true" bgColor="#FFF"></u-skeleton>
		<!-- 地址选择器 -->
		<simple-address 
			ref="simpleAddress" 
			:pickerValueDefault="cityPickerValueDefault" 
			@onConfirm="addressConfirm" 
			themeColor="#007AFF"
		></simple-address>
	</view>
</template>

<script>
	const App = getApp()
	import schoolList from '@/components/school-list/list'
	import simpleAddress from '@/components/simple-address/simple-address.nvue';
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		components:{
			schoolList,
			simpleAddress
		},
		data() {
			return {
				skeletonLoading:true,
				userId:0,
				scrollTop:0,
				schoolList:null,
				cityPickerValueDefault: [0, 0],
				current_page:1,
				last_page:0,
			}
		},
		onHide(){
			// 切换tababr时隐藏浮动模块
			// this.$refs.schoolList.touchstartPage()
		},
		onLoad(options) {
			setTimeout(() => {
				this.skeletonLoading = false
			},1000)
			this.getSchoolList()
		},
		computed: {
		
		},
		methods: {
			getSchoolList(){
				uni.showLoading({
					title:'加载中'
				})
				let list = this.schoolList || []
				this.$http({
					api: 'koala/v1/schools',
					method: 'GET',
					params:{
						page:this.current_page
					}
				}).then(res => {
				    this.schoolList = list.concat(res.data.data || [])
					this.current_page = res.data.meta.current_page
					this.last_page = res.data.meta.last_page
					uni.hideLoading()
				}).catch(err => {
							
				})
			},
		   //搜索跳转
           searchLink(){
			   uni.navigateTo({
			   	url:'/pages/search/index'
			   })
		   },
		   onPageScroll(e){
			   //监听页面发生滚动就将浮动模块隐藏 同时兼容PC端上浏览时使用鼠标滚动而不是触摸
			   this.scrollTop = e.scrollTop
		   },
		   //地址筛选
		   chooseAddress(){
			   this.$refs.simpleAddress.open();
		   },
		   //确认选择地址
		   addressConfirm(e){
				// this.cityPickerValueDefault = e.value 保留当前选择
				this.address = {
					addressCode:e.areaCode,
					addressName:e.label
				}
		   },
		   onPullDownRefresh() {
			   if(this.schoolList){
				   this.current_page = 1
				   this.last_page = 0
				   this.schoolList = null
				   this.getSchoolList()
			   }
				setTimeout(function () {
					uni.stopPullDownRefresh();
				}, 1000);
		   },
		   onReachBottom(){
				if(this.current_page < this.last_page){
					this.current_page = this.current_page + 1
					this.getSchoolList()
				}
		   }
		}
	}
</script>
<style lang="scss">
	page{background: $page-background;}
</style>
<style lang="scss" scoped>

.index{
	.header{
		display: flex;
		align-items: center;
		padding: 20rpx;
		.loaction{
			font-weight: bold;
		}
		.search{
			flex: 1;
			border-radius: 30rpx;
			overflow: hidden;
			background: #fff;
			padding: 10rpx 0;
			margin: 0 30rpx;
			text-align: center;
			.icon-search{
				color: #ccc;
				font-size: 36rpx;
				margin-right: 10rpx;
			}
			.input{
				color: #ccc;
			}
		}
		.icon-shaixuan{
			font-size: 40rpx;
		}
	}
	//条件选择
	.condition{
		display: flex;
		align-items: center;
		justify-content: space-between;
		background: #fff;
		margin-bottom: 10rpx;
		padding: 20rpx;
			.cond-left{
				display: flex;
				.item{
					margin-right: 20rpx;
				}
			}
			.cond-right{
				display: flex;
				.item{
					margin-left: 20rpx;
				}
			}
		}
}	
</style>
