<template>
	<view class="joinUs">
		<view class="joinUs-header">
			<view class="imageBox">
				<image src="http://img4.imgtn.bdimg.com/it/u=3894159655,3953106493&fm=26&gp=0.jpg" mode=""></image>
			</view>
			<view class="title">
				招商合作
			</view>
		</view>
		<view class="part">
			<view class="item" @click="inputName">
				<view class="title">
					您的姓名
				</view>
				<input type="text" :focus="nameFocus" @focus="nameFocusFun" @blur='nameBlur' v-model="name" class="input" placeholder="请输入您的姓名"/>
			</view>
			<view class="item">
				<view class="title">
					联系电话
				</view>
				<input type="text" v-model="name" class="input" placeholder="请输入您的联系电话"/>
			</view>
			<view class="item lastNoBottom" @click="typeClick">
				<view class="title">
					合作类型
				</view>
				<view class="iconfont icon-you"></view>
			</view>
			<view class="joinUs-summary">
				<view class="title">合作意向</view>
				<textarea class="textarea" value="" placeholder="请描述您的合作意向..." />
			</view>
		</view>
		<view class="summitBtn">提交</view>
		<view class="concatUs">
			<view class="title">———联系我们———</view>
			<view class="phone">联系电话：159465154654</view>
		</view>
	</view>
</template>

<script>
	export default{
		components:{
			
		},
		data(){
			return {
				
			}
		},
		methods:{
			typeClick(){
				uni.showActionSheet({
					itemList:['院校入驻','院校推广','招生推广'],
					success:res => {
						console.log(res.tapIndex)
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	page{
		background: #f5f5f5;
	}
	.joinUs{
		.joinUs-header{
			padding: 30rpx 0;
			text-align: center;
			.imageBox{
				@include w-h-br(120rpx);
				margin: 20rpx auto;
			}
			.title{
				font-weight: bold;
			}
		}
		.part{
			background: #fff;
			padding: 10rpx 20rpx;
			.item{
				display: flex;
				background: #fff;
				align-items: center;
				justify-content: space-between;
				border-bottom: 1rpx solid #ccc;
				padding: 20rpx 0;
				.title{
					
				}
				.input{
					flex: 1;
					text-align: right;
				}
			}
			.joinUs-summary{
				margin-top: 20rpx;
				background: #fff;
				.title{
					margin-bottom: 10rpx;
				}
				.textarea{
					width: 100%;
					background: #f5f5f5;
					padding: 20rpx;
					box-sizing: border-box;
				}
			}
		}
		.summitBtn{
			margin: 20rpx auto;
			background: #006EFF;
			color: #fff;
			text-align: center;
			width: 300rpx;
			border-radius: 40rpx;
			padding: 20rpx 0;
		}
		.concatUs{
			text-align: center;
			font-size: 26rpx;
		}
	}
</style>
