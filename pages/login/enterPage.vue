<template>
	<view class="enterPage">
		<view class="headerTitle">院校推荐定制</view>
		<view class="chooseTitle">选择性别</view>
		<radio-group class="radioGroup" @change="radioChange">
			<label class="item" v-for="(item, index) in items" :key="item.value">
					<radio :value="item.value" :checked="index === active" />
				<view>{{item.name}}</view>
			</label>
		</radio-group>
		<view class="chooseTitle">选择学历</view>
		<swiper 
			class="swiper" 
			:vertical='true' 
			:acceleration='true' 
			@change='swiperChange' 
			:current="current"
			previous-margin='60px'
			next-margin='60px'
			>
			<swiper-item :class="['swiperItem',current === index ? 'current' : '']" v-for="(item,index) of eduList" :key='index'>
				<view class="title">{{item.title}}</view>
			</swiper-item>
		</swiper>
		<view class="fixed_bottom_btn_place">
			<view class="fixed_bottom_btn">
				<view class="word" @click="goIndex">
					确定
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		components:{
			
		},
		data(){
			return {
				active:null,
				current:2,
				items: [{
						value: 'USA',
						name: '男同学'
					},
					{
						value: 'CHN',
						name: '女同学',
						checked: 'true'
					},
				],
				eduList:[
					{
						title:'初中'
					},
					{
						title:'高中'
					},
					{
						title:'中专'
					},
					{
						title:'大专'
					}
				]
			}
		},
		computed: {
			
		},
		onLoad(){
			
		},
		methods:{
			radioChange(e){
				console.log(e,'e')
			},
			swiperChange(e){
				this.current = e.detail.current
				console.log(this.current,'current')
			},
			goIndex(){
				uni.reLaunch({
					url:'/pages/index/index'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.enterPage{
		.headerTitle{
			font-size: 34rpx;
			font-weight: bold;
			text-align: center;
			margin-top: 30rpx;
		}
		.chooseTitle{
			text-align: center;
			margin: 60rpx 0;
		}
		.radioGroup{
			display: flex;
			align-items: center;
			justify-content: space-around;
			.item{
				text-align: center;
			}
		}
		.swiper{
			height: 300rpx;
			.swiperItem{
				display: flex;
				align-items: center;
				justify-content: center;
				height: 100rpx!important;
				.title{
					
				}
			}
			.current{
				border-top: 1rpx solid;
				border-bottom: 1rpx solid;
				font-weight: bold;
			}
		}
	}
</style>
