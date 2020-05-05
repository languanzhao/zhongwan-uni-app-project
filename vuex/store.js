import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app.js'
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
		objToken:{},
		userInfo:{},
		roles:[],
		permissions:[]
	},
    mutations: {
		//设置token
		saveToken(state,params){
			state.objToken = params
			console.log(params,'paams')
			uni.setStorage({
				key:'objToken',
				data:params
			})
		},
		//设置用户信息
		setUserInfo(state,userInfo){
			state.userInfo = userInfo
			//缓存用户信息到本地
			uni.setStorage({
				key: 'userInfo',
				data: userInfo
			})
		},
		//用户角色
		setRoles(state,params){
			state.roles = params
		},
		//用户权限
		setPermissions(state,params){
			state.permissions = params
		}
	},
    actions: {},
	modules: {
		app
	}
})

export default store