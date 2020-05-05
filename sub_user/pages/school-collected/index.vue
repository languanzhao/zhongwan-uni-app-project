<template>
	<view class="collected">
		<view class="fixed-header-place">
			<view class="collected-header">
				<view class="checked" v-if="showCheck">已选中{{checkedList.length}}个</view>
				<view class="edit" @click="edit(true)" :style="{'marginRight':wxRightMargin + 'px'}">编辑</view>
			</view>
		</view>
		<school-list :list='list' :showCheck='showCheck' ref='schoolList' @selectedList='selectedList'></school-list>
		<view class="fixed-place" v-if="showCheck">
			<view class="bottomBtnFixed">
				<view class="fixed-item cancelBtn" @click="edit(false)">取消</view>
				<view class="fixed-item delBtn" @click="delBtn">删除</view>
			</view>
		</view>
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
				wxRightMargin:0,
				showCheck:false,
				checkedList:[],
				list:[
					{
						id:1,
						name:'广东省江门市中医科学院',
						type:'公办',
						level:'本科',
						address:'广州市/天河区/棠下'
					},
					{
						id:2,
						name:'广东省江门市中医科学院',
						type:'公办',
						level:'本科',
						address:'广州市/天河区/棠下'
					},
					{
						id:3,
						name:'广东省江门市中医科学院',
						type:'公办',
						level:'本科',
						address:'广州市/天河区/棠下'
					},
					{
						id:4,
						name:'广东省江门市中医科学院',
						type:'公办',
						level:'本科',
						address:'广州市/天河区/棠下'
					},
					{
						id:5,
						name:'广东省江门市中医科学院',
						type:'公办',
						level:'本科',
						address:'广州市/天河区/棠下'
					},
					{
						id:6,
						name:'广东省江门市中医科学院',
						type:'公办',
						level:'本科',
						address:'广州市/天河区/棠下'
					}
				]
			}
		},
		onLoad(){
			this.wxRightMargin = this.$wxRightMargin
		},
		methods:{
			//编辑 或 取消
			edit(bool){
				if(bool){
					this.showCheck = true
				}else{
					this.showCheck = false
					this.checkedList = []
					this.$refs.schoolList.selectedListNull()
				}
			},
			//选中
			selectedList(e){
				this.checkedList = e
			},
			//删除
			delBtn(){
				let newList = []
				this.list.forEach((item,index)=>{
					let bol = this.checkedList.some(iitem => iitem === item.id)
					if(!bol) newList.push(item)
				})
				this.list = newList
				this.edit(false)
			}
		},
		onPullDownRefresh() {
			console.log('刷新了一次');
			setTimeout(function () {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		onReachBottom(){
			console.log('到底了')
		}
	}
</script>
<style lang="scss">
	page{background: $page-background;}
</style>
<style lang="scss" scoped>
	.fixed-header-place{
		height: 90rpx;
		.collected-header{
			background: #f5f5f5;
			display: flex;
			justify-content: space-between;
			padding: 0 30rpx;
			align-items: center;
			box-sizing: border-box;
			position: fixed;
			width: 100%;
			height: 90rpx;
			left: 0;
			// #ifdef H5
			top: 44px;//适配网页
			// #endif
			// #ifndef H5
			top: 0;//适配其他平台
			// #endif
			z-index: 1;
			.edit{
				margin-left: auto;
			}
		}
	}
	.fixed-place{
		height: 200rpx;
		.bottomBtnFixed{
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			padding: 30rpx;
			background: #fff;
			display: flex;
			justify-content: space-between;
			box-sizing: border-box;
			.fixed-item{
				padding: 20rpx 0;
				text-align: center;
				border-radius: 10rpx;
			}
			.cancelBtn{
				background: #999;
				width: 30%;
				margin-right: 30rpx;
				
			}
			.delBtn{
				width: 70%;
				background: #00aaff;
				color: #fff;
			}
		}
	}
</style>
