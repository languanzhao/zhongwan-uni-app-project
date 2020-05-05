<template>
	<view class="role-adviser">
		<view class="header" @click="adviserInfoLink">
			<view class="header-top">
				<view class="avatarImg">
					<image class="image" src="http://img4.imgtn.bdimg.com/it/u=3894159655,3953106493&fm=26&gp=0.jpg" mode=""></image>
				</view>
				<view class="content">
					<view class="name">清华张老师</view>
					<view class="invitedCode">
						邀请码：<text>dsfssal</text><text @click.stop="copyBtn">复制</text>
					</view>
					<view class="inviter">邀请人：米亚</view>
				</view>
				<view class="iconfont icon-setting" @click.stop="settingClick"></view>
			</view>
			<view class="header-bottom">
				<view class="team">团员：40</view>
				<view class="num">
					<view class="title">成长值：0/20</view>
					<view class="process">进度条</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { copyValue } from '@/common/utils.js'
	export default{
		components:{
			
		},
		data(){
			return {
				invitedCode:'666'
			}
		},
		computed: {
			
		},
		onLoad(){
			
		},
		methods:{
			//设置跳转
			settingClick(){
				uni.navigateTo({
					url:'/sub_adviser/pages/setting/index'
				})
			},
			//个人信息跳转
			adviserInfoLink(){
				uni.navigateTo({
					url:'/sub_adviser/pages/personalInfo/index'
				})
			},
			copyBtn(){
				copyValue(this.invitedCode)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.role-adviser{
	   .header{
		   background: #fff;
		   padding: 30rpx;
		   .header-top{
			   display: flex;
			   .avatarImg{
				   @include w-h-br(120rpx);
				   margin-right: 20rpx;
			   }
			   .icon-setting{
				   margin-left: auto;
				   font-size: 40rpx;
			   }
		   }
		   .header-bottom{
			   display: flex;
			   align-items: center;
			   .num{
				   display: flex;
				   align-items: center;
				   margin-left: 20rpx;
			   }
		   }
	   }
	}
</style>
