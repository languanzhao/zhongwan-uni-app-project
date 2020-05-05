
<script>
	import Vue from 'vue'
	import { mapState,mapMutations } from 'vuex'
	export default {
		globalData: {
		    
		},
		mounted() {
			
		},
		methods:{
			...mapMutations(['setUserInfo','saveToken']),
			//检查是否PC端
			checkIsPc(){
				let regExp = /iOS|Android/i
				uni.getSystemInfo({
					success(e){
						/* 窗口宽度大于420px且不在PC页面且不在移动设备时跳转至 PC.html 页面 */
						if(e.windowWidth > 420 && !window.top.isPC && !regExp.test(e.system)){
							window.location.pathname = '/static/PC.html';
						}
					}
				})
			},
			//获取顶部状态栏高度
			getStatusBarheight(){
				uni.getSystemInfo({
				        success:function(e){
				            Vue.prototype.$statusBar = e.statusBarHeight
				            // #ifndef MP
				            if(e.platform == 'android') {
				                Vue.prototype.$customBar = e.statusBarHeight + 50
				            }else {
				                Vue.prototype.$customBar = e.statusBarHeight + 45
				            }
				            // #endif
				            
				            // #ifdef MP-WEIXIN
				            let custom = wx.getMenuButtonBoundingClientRect()
							console.log(custom,'wx')
							Vue.prototype.$wxRightMargin = e.screenWidth - custom.left;
				            Vue.prototype.$customBar = custom.bottom + custom.top - e.statusBarHeight
				            // #endif
				            
				            // #ifdef MP-ALIPAY
				            Vue.prototype.$customBar = e.statusBarHeight + e.titleBarHeight
				            // #endif
				        }
				    })
			},
			getUserInfo(){
				let id = uni.getStorageSync('userInfo').id 
				// 判断有没有id，有则说明登录过了，重新把缓存存进vuex
				if (id) {
					//用户信息
					uni.getStorage({
						key: 'userInfo',
						success: (res) => {
							this.setUserInfo(res.data)
						}
					})
					//token
					let objToken = uni.getStorageSync('objToken')
					console.log(objToken,'aaa')
					this.saveToken(objToken)
				}
			},
		},
		onLaunch: function() {
			// #ifdef H5
			    this.checkIsPc()
			// #endif
			this.getStatusBarheight()
			this.getUserInfo()
		},
		onShow: function() {
			
		},
		onHide: function() {
			
		}
	}
</script>

<style>
	@import './static/iconfont/iconfont.css';
	page{
		font-size: 30rpx;
		font-family: '微软雅黑';
	}
	/* #ifdef H5 */
		::-webkit-scrollbar {
			display: none;
		}
	/* #endif */
</style>
