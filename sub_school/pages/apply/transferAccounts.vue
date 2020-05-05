<template>
	<view class="transferAccounts">
		<view class="header">
			<image src="http://img4.imgtn.bdimg.com/it/u=3894159655,3953106493&fm=26&gp=0.jpg" mode=""></image>
			<view class="schoolName">广东省金门是中医大学</view>
		</view>
		<view class="content">
			<view class="item">
				<view class="left">院校账户</view>
				<view class="right">4154541654156416541652<text class="copy" @click="copyBtn(4154541654156416541652)">复制</text></view>
			</view>
			<view class="item">
				<view class="left">联系人</view>
				<view class="right">邱丽丽</view>
			</view>
			<view class="item">
				<view class="left">联系电话</view>
				<view class="right">15946351154</view>
			</view>
			<view class="item">
				<view class="left">微信号</view>
				<view class="right">554dfs</view>
			</view>
			<view class="item">
				<view class="left">支付方式</view>
				<view class="right">转账支付</view>
			</view>
		</view>
		<view class="uploadTitle">上传凭证</view>
		<upload-imgs v-model="imgList" :length="3"></upload-imgs>
		<view class="summary">上传凭证信息务必有清晰的流水号、XXX、XXX方便工作人员提.......</view>
		<view class="fixed_bottom_btn_place">
			<view class="fixed_bottom_btn">
				<view class="word">
					确定
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uploadImgs from '@/components/upload-imgs/index'
	import { copyValue } from '@/common/utils.js'
	export default{
		components:{
			uploadImgs
		},
		data(){
			return {
				imgList:''
			}
		},
		methods:{
			//复制
			copyBtn(val){
				copyValue(val)
			}
		}
	}
</script>
<style lang="scss">
	page{background: $page-background;}
</style>
<style lang="scss" scoped>
	.transferAccounts{
		padding: 40rpx;
		.header{
			text-align: center;
			image{
				@include w-h-br(120rpx);
				margin-bottom: 30rpx;
			}
		}
		.content{
			margin-top: 30rpx;
			padding: 20rpx 0;
			border-top: 1rpx solid #ccc;
			border-bottom: 1rpx solid #ccc;
            .item{
				display: flex;
				align-items: center;
				padding: 10rpx 0;
				.left{
					color: #999;
					width: 30%;
				}
				.right{
					width: 70%;
					.copy{
						margin-left: 10rpx;
						color: blue;
					}
				}
			}
		}
		.uploadTitle{
			font-weight: bold;
			margin: 20rpx 0;
		}
		.summary{
			margin: 20rpx 0;
		}
	}
</style>
