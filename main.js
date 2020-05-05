import Vue from 'vue'
import App from './App'

//引入vuex 把vuex定义成全局组件
import store from './vuex/store'
Vue.prototype.$store = store

//数据请求
import { request } from './common/request.js'
Vue.prototype.baseUrl = 'http://shop.test.gzzhongw.net/'
Vue.prototype.$http = request
// this.$http({api:'user/edituserinfo',method:'POST',params: {
// 					mobile:Number(this.info.mobile)
// 				}}).then(res => {
					
// 				}).catch(err=>{})
//  全局组件之间通信
Vue.prototype.$eventHub= Vue.prototype.$eventHub ||  new Vue()        // 巴士

//兼容H5api方法 setClipboardData getClipboardData saveImageToPhotosAlbum saveVideoToPhotosAlbum
import './common/ican-H5Api.js' 

//uView UI组件库
import uView from "@/uview";
Vue.use(uView); 

//全局过滤器
import * as publicFilters from '@/common/publicFilters'    
Object.keys(publicFilters).forEach(key => {        
  Vue.filter(key, publicFilters[key])
})

Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App,
	store
})
app.$mount()
