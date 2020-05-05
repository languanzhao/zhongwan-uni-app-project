import store from '@/vuex/store'

//跳到登录页
export function goLogin(){
	uni.navigateTo({
		url:'/pages/login/index'
	})
}
//检查是否登录
export function checkLogin(){
	return new Promise((resolve,reject) => {
		if(store.state.userInfo && store.state.userInfo.id){
			resolve()
		}else{
			reject()
		}
	})
}
//复制功能
export function copyValue(value){
	if(value){
		uni.setClipboardData({
		    data: value,
		    success: function (res) {
		        uni.showToast({
					icon:'none',
		        	title:'复制成功'
		        })
		    }
		})
	}
}
//手机号、身份证号验证
export function regExp(type,val) {
	switch(type){
		case 'mobile':
			return RegExp(/^1(3|4|5|7|8)\d{9}$/).test(val)
			break;
		case 'IDnumber':
			return RegExp(/(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/).test(val)
			break;
		case 'password':
			return RegExp(/^(?![0-9]+$)(?![a-zA-Z]+$)(?!([^(0-9a-zA-Z)]|[\(\)])+$)([^(0-9a-zA-Z)]|[\(\)]|[a-zA-Z]|[0-9]){6,}$/).test(val)
			break;
	}
}

//获取窗口尺寸（宽、高）可再添加更多
export function getWindowResize(element) {
	try {
		let res = uni.getSystemInfoSync()
		if (element === 'height') {
			return res.windowHeight
		} else if (element === 'width') {
			return res.windowWidth
		} else {
			return
		}
	} catch (e) {
		// error
	}
}
// 验证是否获取了相关权限，若没有则提示开始权限（默认是地图权限）
export function checkAuthSetting(scopeName = "scope.userLocation") {
  return new Promise((resolve, reject) => {
    // 查看权限列表
    uni.getSetting({
      success: res => {
        let authSetting = res.authSetting
		console.log(res,'res')
        let bool = Object.keys(authSetting).some(item => item === scopeName)
        //判断用户是否有授权过
        if (bool) {
          //判断用户授权时 是同意还是拒绝  用户已经同意过，则直接进入
          if (res.authSetting[scopeName]) {
            // 权限设置为 true
            resolve()
          } else {
            //用户拒绝过后 再次 提示 需要授权
            uni.showModal({
              title: '提示',
              content: '此操作需要您的授权，请前往设置',
              success: res => {
                //确认
                if (res.confirm) {
                  uni.openSetting({
                    success: res => {
                      if (res.authSetting[scopeName]) {
                        resolve()
                      } else {
                        reject()
                      }
                    }
                  })
                  //取消
                } else if (res.cancel) {
                  reject()
                }
              }
            })
          }
        } else {
          //用户未授权过 提示用户去授权
          uni.authorize({
            scope: scopeName,
            success: res => {
              // 成功
              resolve()
            }
          })
        }
      },
      fail: () => {}
    })
  })
}
