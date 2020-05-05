<template>
	<view class="personalInfo">
		<view class="personalInfo-top">
			<view class="avatarImg" @click="avatarImgChange">
				<image :src="userInfo.avatar" mode=""></image>
			</view>
			<view class="name">
				{{userInfo.name}}
			</view>
			<view class="isBind">
				{{userInfo.bound_wechat ? '已绑定微信账户' : '去绑定微信账户'}}
			</view>
			<view class="infoList">
				<view class="item">
					<view class="item-left">真实姓名</view>
					<view class="item-right">{{userInfo.name || "尚未填写"}}</view>
				</view>
				<view class="item">
					<view class="item-left">手机号码</view>
					<view class="item-right">{{userInfo.phone || "尚未填写"}}</view>
				</view>
				<view class="item">
					<view class="item-left">所在地区</view>
					<view class="item-right" v-if="userInfo.address && userInfo.address.addressName">{{userInfo.address.addressName}}</view>
					<view class="item-right" v-else>尚未填写</view>
				</view>
				<view class="item">
					<view class="item-left">毕业学校</view>
					<view class="item-right">{{userInfo.school || "尚未填写"}}</view>
				</view>
			</view>
		</view>
		<view class="fixedBottom">
			<view class="content">
				<view class="notice">
					<view class="notice-title">注意：</view>
					<view>当前资料信息，需提供予校方审核您是否具备录取资质，请如实填写，平台将为您严格保密。</view>
				</view>
				<view class="button" @click="editInfo">编辑个人信息</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	export default{
		components:{
			
		},
		data(){
			return {

			}
		},
		computed:{
			...mapState(['userInfo'])
		},
		methods:{
			// 更换头像
			avatarImgChange(){
				uni.chooseImage({
				    count: 1, 
				    success: res => {
						this.userInfo.avatarImg = res.tempFiles[0].path
				        this.$store.commit('setUserInfo',this.userInfo)
				    }
				});
			},
			//去编辑
			editInfo(){
				uni.navigateTo({
					url:'/sub_user/pages/personalInfo/info-edit'
				})
			}
		}
	}
</script>
<style lang="scss">
	page{background: $page-background;}
</style>
<style lang="scss" scoped>
	.personalInfo{
		.personalInfo-top{
			padding: 100rpx 30rpx 40rpx;
			background: #fff;
			.avatarImg{
				width: 200rpx;
				height: 200rpx;
				margin: 0 auto;
			}
			.name{
				margin: 20rpx 0;
				text-align: center;
			}
			.isBind{
				margin: 20rpx 0 30rpx;
				text-align: center;
				color: blue;
			}
			.infoList{
				.item{
					@include flex-c;
					margin: 20rpx 0;
					.item-left{
						color: #999;
					}
					.item-right{
						flex: 1;
						text-align: center;
					}
				}
			}
		}
		.fixedBottom{
			position: fixed;
			width: 100%;
			bottom: 30rpx;
			left: 0;
			.content{
				margin: 0 30rpx;
				.notice{
					display: flex;
					font-size: 26rpx;
					.notice-title{
						white-space: nowrap;
					}
				}
				.button{
					background: blue;
					color: #fff;
					text-align: center;
					padding: 26rpx 0;
					border-radius: 10rpx;
					margin-top: 20rpx;
				}
			}
		}
	}
</style>
