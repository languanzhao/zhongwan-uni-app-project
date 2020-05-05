<template>
	<view class="setting">
		<u-cell-group :border='false'>
			<u-cell-item title="绑定银行卡" value="已绑定" @click="linkTo(true)"></u-cell-item>
			<u-cell-item title="支付密码" value="已设置" @click="linkTo(false)"></u-cell-item>
		</u-cell-group>
		
		<password-input ref='payPassword' :show_key="show_key" @hideFun="hideFun" @getPassword="getPassword"></password-input>
	</view>
</template>

<script>
	import passwordInput from '@/components/passwordInput/index'
	export default{
		components:{
			passwordInput
		},
		data(){
			return {
				show_key:false,
				firstPassword:'',
				secondPassword:'',
				arr:[]
			}
		},
		computed: {
			
		},
		onLoad(){
			
		},
		methods:{
			linkTo(bool){
				if(bool){
					uni.navigateTo({url:'/sub_adviser/pages/setting/bindCard'})
				}else{
					this.show_key = true
				}
			},
			hideFun(){
				this.show_key = false
			},
			getPassword(password){
				this.arr.push(password)
				this.$refs.payPassword.hideFun()
				setTimeout(()=>{
					if(this.arr.length < 2){
						this.show_key = true
					}
				},1000)
				if(this.arr[0] === this.arr[1]){
					this.show_key = false
					console.log('两次输入相同',this.arr)
				}else{
					console.log('错误')
				}
			}
		}
	}
</script>
<style lang="scss">
	page{background: $page-background;}
</style>

