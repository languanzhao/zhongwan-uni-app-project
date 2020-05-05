<template>
	<view class="wallet">
		<view class="amount">
			<view class="left">
				<view class="title">预返金额（元）</view>
				<view class="num">￥998.0</view>
				<view class="money">账户余额（元）:￥0.0</view>
				<view class="summary">每年11月1号结算当年度收益</view>
			</view>
			<view class="btn" @click="detailLink(1)">提现</view>
		</view>
		<view class="operation">
			<view class="item" @click="detailLink(2)">账单详情</view>
			<view class="item" @click="detailLink(3)">提现明细</view>
		</view>
		<uni-popup ref='popup'>
			<view class="popupContent">
				<view class="title">可提现</view>
				<view class="inputVal">
					输入金额
				    <input class="input" type="number" v-model="inputVal" />
					元
				</view>
				<view class="oper">
					<view class="item cancel" @click="cancelBtn">取消</view>
					<view class="item confirm">确定</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup'
	export default{
		components:{
			uniPopup
		},
		data(){
			return {
				popupShow:false
			}
		},
		computed: {
			
		},
		onLoad(){
			
		},
		methods:{
			detailLink(val){
				let url = ''
				switch(val){
					case 1:
						this.$refs.popup.open()
						break;
					case 2:
						url = '/sub_adviser/pages/wallet/accountDetail'
						break;
					case 3:
						url = '/sub_adviser/pages/wallet/withdrawDetail'
						break;
				}
				if(url){
					uni.navigateTo({url})
				}
			},
			cancelBtn(){
				this.$refs.popup.close()
			}
		}
	}
</script>
<style lang="scss">
	page{background: $page-background;}
</style>
<style lang="scss" scoped>
	.wallet{
		.amount{
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 20rpx;
			margin: 20rpx;
			border: 1rpx solid;
			border-radius: 20rpx;
			background: #fff;
			.left{
				.title{
					
				}
				.num{
					font-size: 40rpx;
					font-weight: bold;
					margin: 10rpx 0;
				}
				.money{
					
				}
				.summary{
					color: #666;
					font-size: 26rpx;
					margin-top: 10rpx;
				}
			}
			.btn{
				padding: 10rpx 30rpx;
				background: #0071FF;
				color: #fff;
				border-radius: 10rpx;
			}
		}
		.operation{
			display: flex;
			justify-content: space-between;
			margin: 0 20rpx;
			.item{
				width: 48%;
				border: 1rpx solid;
				background: #fff;
				padding: 20rpx 0;
				text-align: center;
				border-radius: 10rpx;
			}
		}
		.popupContent{
			background: #fff;
			padding: 30rpx;
			width: 500rpx;
			.title{
				font:{
					weight:bold;
					size:36rpx;
				}
				text-align: center;
				
			}
			.inputVal{
				display: flex;
				align-items: center;
				.input{
					margin: 40rpx 20rpx;
					width: 200rpx;
					border: 1rpx solid #ccc;
					padding: 10rpx;
				}
			}
			.oper{
				display: flex;
				justify-content: space-between;
				.item{
					width: 48%;
					text-align: center;
					padding: 20rpx 0;
					border-radius: 10rpx;
				}
				.cancel{
					background: #ccc;
				}
				.confirm{
					background: #0071FF;
					color: #fff;
				}
			}
		}
	}
</style>
