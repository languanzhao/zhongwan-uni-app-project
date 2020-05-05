// 对uni.request二次封装
import store from '@/vuex/store.js'
const baseUrl = 'http://shop.test.gzzhongw.net/'
export function request({api, method = "POST", params,header = {'Content-Type':'application/x-www-form-urlencoded'}}) {
		return new Promise((resolve, reject) => {
			let defaultParams = {}
			let objToken = store.state.objToken
			if(objToken && objToken.access_token){
				header.Authorization = objToken.token_type + ' ' + objToken.access_token
			}
			let data = Object.assign(defaultParams,params)
			let url = baseUrl + api
			uni.request({
				url,
				data,
				method,
				header,
				success: (res) => {
					if(res.statusCode === 200 || res.statusCode === 201) {
						resolve(res)
					} else {
						reject(res)
					}
				}
			})
		})
}

// 'Content-Type': 'application/json; charset=utf-8'
// "Content-Type": "application/x-www-form-urlencoded","accept": "application/json"