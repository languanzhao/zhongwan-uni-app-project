<template>
	<view class="upload-imgs">
			<view class="item" v-for="(item,index) of imgList" :key='index'>
				<image class="image" :src="item" mode="" @click="previewImage(index)"></image>
				<view class="del" @click="delItem(index)" v-if="!disabled">×</view>
			</view>
			<view class="item upload-btn" @click="upload" v-if="!disabled && (length && imgList.length < length)">
				<view>+</view>
				<view>图片</view>
			</view>
	</view>
</template>

<script>
	export default {
		props:{
			value:{
				type:String,
				default:null
			},
			//限制上传图片数量
			length:{
				type:Number,
				default:20
			},
			disabled:{
				type:Boolean,
				default:false
			},
			count:{
				type:Number,
				default:9
			}
		},
		data(){
			return {
				imgList:[]
			}
		},
		methods:{
			//上传图片
			upload(){
				let resideLength = this.length - this.imgList.length
				let count = this.count
				if(resideLength - count < 0){
					count = resideLength
				}
				uni.chooseImage({
				    count: count, //默认9
				    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				    sourceType: ['album','camera'], //从相册选择或者拍摄
				    success: res => {
						let list = this.imgList.concat(res.tempFilePaths || [])
						this.imgList = list
						this.$emit('input',list.join(','))
				    }
				});
			},
			//删除某项
			delItem(index){
				this.imgList.splice(index,1)
				this.$emit('input',this.imgList.join(','))
			},
			//预览图片
			previewImage(index){
				uni.previewImage({
					current:index,
					urls:this.imgList,
					indicator:'default'
				})
			}
		},
		watch:{
			value:{
				handler(val){
					if(val){
						this.imgList = val.split(',').map((item,index)=>{
							return item
						})
					}
				},
				immediate:true,//使父组件传过来的默认值第一次监听到
			}
		}
	}
</script>

<style lang="scss">
	.upload-imgs{
		display: flex;
		flex-wrap: wrap;
		.item{
			width: 160upx;
			height: 160upx;
			margin: 20upx;
			position: relative;
			.image{
				width: 100%;
				height: 100%;
			}
			.del{
				position: absolute;
				top: -15upx;
				right: -15upx;
				font-size: 30upx;
				width: 30upx;
				height: 30upx;
				border-radius: 50%;
				text-align: center;
				line-height: 30upx;
				background: red;
				color: #fff;
			}
		}
		.upload-btn{
			display: flex;
			justify-content: center;
			flex-direction: column;
			border: 1upx solid #ccc;
			text-align: center;
			color: #ccc;
			font-size: 30upx;
		}
	}
</style>
