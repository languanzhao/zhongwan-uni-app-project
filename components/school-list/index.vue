<template>
	<view class="school-list">
		<view class="item" v-for="(item,index) of list" :key='index' @click="linkOrCheck(item.id)">
			<view :class="['checkbox','iconfont',active(item.id) ? 'active icon-checked' : 'icon-noChecked']" v-if="showCheck"></view>
			<view class="item-left">
				<image src="http://img4.imgtn.bdimg.com/it/u=3894159655,3953106493&fm=26&gp=0.jpg" mode=""></image>
			</view>
			<view class="item-right">
				<view class="schoolName">{{item.name}}</view>
				<view class="label">
					<text class="text">{{item.type}}</text>
					<text class="text">{{item.level}}</text>
				</view>
				<view class="address">
					{{item.address}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			list:{
				type:Array,
				default:()=>[]
			},
			showCheck:{
				type:Boolean,
				default:false
			}
		},
		components:{
			
		},
		data(){
			return {
				selectedList:[]
			}
		},
		methods:{
			//类名判断是否高亮
			active(id){
				 return this.selectedList.some(item=> item === id)
			},
			//跳转 或 选择状态
			linkOrCheck(id){
				if(this.showCheck){
					this.checkboxChange(id)
				}else{
					uni.navigateTo({
						url:'/sub_school/pages/detail/index'
					})
				}
			},
			// 选择状态
			checkboxChange(id){
				let bool = this.selectedList.some(item => {
				  return id === item;
				});
							
				if (bool) {
				  let index = this.selectedList.findIndex(item => item === id);
				  if (index !== -1) this.selectedList.splice(index, 1);
				} else {
				  this.selectedList.push(id);
				}
				this.$emit('selectedList',this.selectedList)
			},
			//防止在选择状态下，有已选中的选项 情况点击取消，使其全部默认未选中状态
			selectedListNull(){
				this.selectedList = []
			}
		}
	}
</script>

<style lang="scss">
	.school-list{
		.item{
			padding: 30rpx;
			margin-bottom: 20rpx;
			background: #fff;
			display: flex;
			align-items: stretch;
			.checkbox{
				margin: auto 0;
				margin-right: 20rpx;
				font-size: 50rpx;
			}
			.icon-checked{
				color: #00aaff;
			}
			.item-left{
				width: 140rpx;
				height: 140rpx;
				margin-right: 30rpx;
			}
			.item-right{
				flex: 1;
				@include flex-b-c();
				.schoolName{
					font-weight: bold;
				}
				.label{
					.text{
						font-size: 26rpx;
						color: #999;
					}
				}
				.address{
					font-size: 26rpx;
					color: #999;
				}
			}
		}
	}
</style>
