<template>
	<view class="personalInfo">
		<u-cell-group :border='false'>
			<u-cell-item title="头像" :arrow="false" @click="avatarImgChange">
				<image class="avatarImg" :src="avatarImg" slot="right" mode=""></image>
			</u-cell-item>
			<u-cell-item title="用户昵称" :arrow="false" style="border-bottom: 20rpx solid #f5f5f5;">
				<input class='input' type="text" v-model="nickName" slot='right' placeholder="请输入昵称"/>
			</u-cell-item>
			<u-cell-item title="手机号" :arrow="false" value="15913552130"></u-cell-item>
			<u-cell-item title="注册时间" :arrow="false" value="2020-01-20"></u-cell-item>
			<u-cell-item title="邀请人" :arrow="false" value="米亚"></u-cell-item>
			<u-cell-item title="身份认证"  value="已认证" @click="IDAuth"></u-cell-item>
		</u-cell-group>
		<view class="fixed_bottom_btn_place">
			<view class="fixed_bottom_btn">
				<view class="word" @click="confirm">
					保存
				</view>
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
				nickName:'',
				avatarImg:''
			}
		},
		computed: {
			...mapState(['userInfo'])
		},
		onLoad(){
			this.nickName = this.userInfo.nickName
			this.avatarImg = this.userInfo.avatarImg
		},
		methods:{
			// 更换头像
			avatarImgChange(){
				uni.chooseImage({
				    count: 1, 
				    success: res => {
						this.avatarImg = res.tempFilePaths[0]
				    }
				});
			},
			//保存
			confirm(){
				if(this.avatarImg){
					if(this.nickName){
						this.userInfo.avatarImg = this.avatarImg
						this.userInfo.nickName = this.nickName
						this.$store.commit('setUserInfo',this.userInfo)
						uni.showToast({
							title:'保存成功',
							success:() => {
								setTimeout(() => {
									uni.navigateBack()
								},1000)
							}
						})
					}else{
						uni.showToast({
							icon:'none',
							title:'请输入昵称'
						})
					}
				}else{
					uni.showToast({
						icon:'none',
						title:'请上传头像'
					})
				}
			},
			IDAuth(){
				uni.navigateTo({
					url:'/sub_adviser/pages/personalInfo/IDAuth'
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
		.avatarImg{
			@include w-h-br(120rpx);
		}
		.input{
			text-align: right;
		}
	}
</style>
