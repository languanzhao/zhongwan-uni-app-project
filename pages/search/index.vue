<template>
	<view class="search">
		<!-- 顶部搜索栏 -->
		<view class="header">
			<view class="left">
				<view class="iconfont icon-search"></view>
				<input type="text" confirm-type="search" v-model="inputVal" placeholder="搜院校/专业/地区" />
				<view class="cancel" v-if="inputVal" @click="cancelClick">×</view>
			</view>
			<view class="button" @click="searchClick">搜索</view>
		</view>
		<view class="searchInfo">
			<!-- 历史搜索 -->
			<view class="item" v-if="historyList[0]">
				<view class="word">历史搜索</view>
				<view class="iconfont icon-search" @click="deleteHistoryList"></view>
			</view>
			<view class="list">
				<view class="list-item" v-for="(item,index) of historyList" :key='index'>
					{{item}}
				</view>
			</view>
			<!-- 热门搜索 -->
			<view class="item">
				<view class="word">热门院校</view>
			</view>
			<view class="list">
				<view class="list-item" v-for="(item,index) of hotList" :key='index'>
					{{item}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {

		},
		data() {
			return {
				inputVal: '',
				historyList: [],
				hotList: ['北京大学','清华大学','上海大学','复旦大学','香港大学','华中科技大学'],
			}
		},
		onLoad() {
			this.getSearchHistory()
		},
		methods: {
			//清除输入框
			cancelClick() {
				this.inputVal = ''
			},
			//搜索点击
			searchClick() {
				this.saveSearchHistory()
				uni.navigateTo({
					url:'/pages/search/searchResult'
				})
			
				if(this.inputVal){
					let value = this.inputVal.trim()
					uni.navigateTo({
						url:`/pages/search/searchResult?inputVal=${value}`
					})
					this.inputVal = ''
				}
			},
			//保存搜索历史记录
			saveSearchHistory() {
				let value = this.inputVal.trim()
				let list = this.historyList
				if (this.inputVal && value) {
					if (list.length > 0) {
						console.log(list, 'list')
						let index = list.findIndex((item) => item === value)
						if (index !== -1) list.splice(index, 1)
					}
					list.unshift(value)
					if (list.length > 10) list.splice(10)
					uni.setStorage({
						key: 'historyList',
						data: JSON.stringify(list)
					})
				}
			},
			//获取搜索历史记录
			getSearchHistory() {
				uni.getStorage({
					key: 'historyList',
					success: res => {
						this.historyList = JSON.parse(res.data)
					}
				})
			},
			//清空历史记录
			deleteHistoryList() {
				uni.removeStorage({
					key: 'historyList',
					success: res => {
						this.historyList = []
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.search {
		.header {
			background: #f5f5f5;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 10rpx 20rpx;

			.left {
				display: flex;
				align-items: center;
				border-radius: 10rpx;
				margin-right: 10rpx;
				padding: 0 10rpx;
				flex: 1;
				background: #fff;
				position: relative;

				input {
					padding: 10rpx;
					flex: 1;
				}
				.cancel {
					position: absolute;
					right: 10rpx;
					top: 50%;
					transform: translateY(-50%);
					font-size: 30rpx;
					background: rgba(0, 0, 0, .5);
					color: #fff;
					border-radius: 50%;
					width: 30rpx;
					height: 30rpx;
					line-height: 30rpx;
					text-align: center;
				}
			}
		}

		.searchInfo {
			padding: 0 30rpx;
			.item {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin: 20rpx 0;
			}

			.list {
				display: flex;
				align-items: center;
				flex-wrap: wrap;

				.list-item {
					margin-right: 10rpx;
					border: 1rpx solid;
					padding: 6rpx 10rpx;
					font-size: 28rpx;
					margin-bottom: 20rpx;
				}
			}
		}
	}
</style>
