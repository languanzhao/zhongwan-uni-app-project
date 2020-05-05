// 日期格式化
export function timeFormat(date, fmt){
	if (!fmt) {
	  fmt = 'yyyy-MM-dd hh:mm:ss'
	}
	let realDate = new Date(date)
	let o = {
	  "M+": realDate.getMonth() + 1,               // 月份
	  "d+": realDate.getDate(),                    // 日
	  "h+": realDate.getHours(),                   // 小时
	  "m+": realDate.getMinutes(),                 // 分
	  "s+": realDate.getSeconds(),                 // 秒
	  "q+": Math.floor((realDate.getMonth() + 3) / 3), // 季度
	  "S": realDate.getMilliseconds()             // 毫秒
	};
	if (/(y+)/.test(fmt))
	  fmt = fmt.replace(RegExp.$1, (realDate.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (let k in o)
	  if (new RegExp("(" + k + ")").test(fmt))
	    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}