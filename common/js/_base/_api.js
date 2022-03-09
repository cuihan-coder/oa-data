
let host = {
	pro: 'http://119.3.37.247:8099/',
	local: 'http://lnj-333.vaiwan.com'
}
let development = 'pro'

module.exports = {
	//钉钉登陆
	ding_login_post: `${host[development]}/ding/login`,
	//获取首页数据
	ding_home_post: `${host[development]}/ding/home`,
	//精细化管理首页
	getJxhData_post: `${host[development]}/jxh/getJxhData`,
	//经营发展首页
	getJyfzData_post: `${host[development]}/jyfz/getJyfzData`,
	//违规事件数据
	getWgyjData_post: `${host[development]}/wgyj/getWgyjData`,
	//逾期账款
	getYqzkData_post: `${host[development]}/yqzk/getYqzkData`,
	//资金缴存异常
	getcycData_post: `${host[development]}/smh/getcycData`,
	//营收预算达成率
	getYsdcData_post: `${host[development]}/yqzk/getYsdcData`,
	//利润达成
	getZblrdcData_post: `${host[development]}/yqzk/getZblrdcData`,
	//人事成本
	getRsfzbData_post: `${host[development]}/yqzk/getRsfzbData`,
	//单位工时
	getSmhData_post: `${host[development]}/smh/getSmhData`,
	//员工餐
	getYgcData_post: `${host[development]}/smh/getYgcData`,
	//报损
	getbsData_post: `${host[development]}/smh/getbsData`,
	//包装成本
	getbzData_post: `${host[development]}/smh/getbzData`,
	//周转天数
	getkczztsData_post: `${host[development]}/smh/getkczztsData`,
	//食品成本
	getspcbData_post: `${host[development]}/smh/getspcbData`,
	//分差
	getfcData_post: `${host[development]}/smh/getfcData`,
	//精细化管理门店 本周与上周对比
	getMdldData_post: `${host[development]}/mdld/getMdldData`,
	//精细化管理门店 本周与同营业额得分
	getMdYyeData_post:`${host[development]}/mdld/getMdYyeData`,
	//精细化管理门店 本周与同外卖占比得分
	getMdTwmData_post:`${host[development]}/mdld/getMdTwmData`,
	//精细化管理门店 本周与同类商圈占比得分
	getMdTlsData_post:`${host[development]}/mdld/getMdTlsData`,
	
}
