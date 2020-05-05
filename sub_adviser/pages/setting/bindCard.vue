<template>
	<view class="bindCard">
		<u-cell-group :border='false'>
			<u-cell-item title="绑定银行卡" :arrow="false">
				<input class='input' type="text" v-model="cardName" slot='right' placeholder="请输入持卡人姓名"/>
			</u-cell-item>
			<u-cell-item title="卡号" :arrow="false">
				<input class='input' @click="cardFocus" type="number" v-model="cardNumber" slot='right' placeholder="请输入卡号"/>
			</u-cell-item>
			<u-cell-item title="开户行" :arrow="false">
				<input class='input' type="text" v-model="cardplace" slot='right' placeholder="当前卡号开户行"/>
			</u-cell-item>
		</u-cell-group>
	</view>
</template>

<script>
	export default{
		components:{
			
		},
		data(){
			return {
				cardShow:false,
				cardNumber:'',
				cardName:'',
				cardplace:''
			}
		},
		computed: {
			
		},
		onLoad(){
			
		},
		methods:{
			
		}
	}
</script>
<style lang="scss">
	page{background: $page-background;}
</style>
<style lang="scss" scoped>
	.bindCard{
		.input{
			text-align: right;
		}
	}
</style>
