<template>
	<view class="list-cell">
		<view class="item" v-for="(item,index) of list" :key='index' @click.prevent="link(item.path)">
			<view class="item-left">
				<text :class="['iconfont',item.icon]" :style="{'color':item.color}" v-if="item.icon"></text>
				<text class="title">{{item.title}}</text>
			</view>
			<view class="item-right">
				<text v-if="item.tip" class="tip">{{item.tip}}</text>
				<text class="iconfont icon-you"></text>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex';
	export default {
		props:{
			list:{
				type:Array,
				default: () => [] // es6的箭头函数
			}
		},
		data(){
			return{
				
			}
		},
		computed:{
			...mapState(['hasLogin'])
		},
		methods:{
			link(url){
				let link = ''
				// if(this.hasLogin){
					link = url
				// }else{
				// 	link = '/pages/login/login'
				// }
				if(link){
					uni.navigateTo({
						url:link,
						fail: function () {
						   uni.switchTab({
						      url: link
						   })
						}
						})
				}
			}
		}
	}
</script>

<style lang="scss">
	.list-cell{
		background: #fff;
		border-radius: 10upx;
		.item{
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 15px;
			border-bottom: 1upx solid #f5f5f5;
			.item-left{
				display: flex;
				align-items: center;
				.iconfont{
					margin-right: 20upx;
					font-size: 40upx;
				}
				.title{
					font-size: 28upx;
					color: #303133;
				}
			}
			.item-right{
				display: flex;
				align-items: center;
				.iconfont{
					
				}
				.tip{
					font-size: 26upx;
					color: #909399;
					margin-right: 20upx;
				}
			}
		}
	}
</style>
