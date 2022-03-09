import Vue from 'vue'
import App from './App'
//引入vuex
import store from './store'
//把vuex定义成全局组件
Vue.prototype.$store = store
Vue.config.productionTip = false
window.wx = undefined
import uView from "uview-ui";
Vue.use(uView);
// 如此配置即可
uni.$u.config.unit = 'rpx'

//把login注册成全局组件
import login from 'common/js/login.js'
Vue.prototype.$login = login

//把helper注册到全局组件
import helper from 'common/js/helper.js'
Vue.prototype.$helper = helper

//把api全局注册
import _api from 'common/js/_base/_api.js'
Vue.prototype.$api = _api

import "@/common/js/_base/ican-clipBoard.js"

Vue.prototype.leftClick = () => {
	uni.navigateBack({
		delta: 1
	});
}

Vue.prototype.getYearMonthWeek = () => {
	//获取年
	let date = new Date()
	let year = date.getFullYear()
	let month = date.getMonth()+1 < 10 ? ('0' + (date.getMonth() +1)) : (date.getMonth() +1)
	let days = date.getDate()
	let djz = ''
	if([1,2,3,4,5,6,7,8,30,31].indexOf(days) != -1){
		djz = '第4周'
	}
	if([9,10,11,12,13,14,15].indexOf(days) != -1){
		djz = '第1周'
	}
	if([16,17,18,19,20,21,22].indexOf(days) != -1){
		djz = '第2周'
	}
	if([23,24,25,26,27,28,29].indexOf(days) != -1){
		djz = '第3周'
	}
	console.log(year + '年' + month + '月' + djz)
	return '2022年01月第2周'
	return year + '年' + month + '月' + djz
	
}
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
