import loginModel from "./login.js"
const helper = {
	async _setCache(_key,_data){
		return uni.setStorageSync(_key, _data);
	},
	async _getCache(_key){
		return uni.getStorageSync(_key);
	},
	async httpGet(url,data = {},header = {}){
		let global;
		let token = await helper._getCache('loginToken')
		if(token){
			global = {token: token}
			header = Object.assign(header,global)
		}
		header = Object.assign(header,global)
		return new Promise((resolve,reject) =>{
			uni.request({
				url:url,
				header:header,
				method:'GET',
				data:data,
				success: async (res) => {
					if(res.data.code == 401){
						uni.reLaunch({
							url:'/pages/login/index.vue'
						})
						return
					}
					resolve(res.data)
				},
				fail: (res) => {
					// uni.showToast({
					// 	title: '系统请求错误',
					// 	icon: 'none',
					// 	duration:2000
					// })
				}
			})
		}) 
	},
	async httpPost(url,data = {},header = {}){
		let global;
		let token = await helper._getCache('loginToken')
		if(token){
			global = {token:token,}
			header = Object.assign(header,global)
		}
		header = Object.assign(header,{"Content-Type":"application/x-www-form-urlencoded"})
		
		return new Promise((resolve,reject) =>{
			uni.request({
				url:url,
				data:data,
				header:header,
				method:'POST',
				success: async (res) => {
					if(res.data.code == 401){
						uni.reLaunch({
							url:'/pages/login/index.vue'
						})
						return
					}
					resolve(res.data)
				},
				fail: (res) => {
					// uni.showToast({
					// 	title: '系统请求错误',
					// 	icon: 'none'
					// })
				}
			})
		}) 
	},
	objToQuery(obj){
		let query = ''
		for (let key in obj) {
			query += `&${key}=${obj[key]}`
		}
		query = query.replace(/(^&*)/g,"")
		return '?' + query
	},
	getPlatform(service = 'oauth'){
		return new Promise((resolve,reject) =>{
			uni.getProvider({
				service: service,
				success: function(res) {
					let platform = ~res.provider.indexOf('qq') ? 'qq' : 'weixin'
					resolve(platform)
				}
			});
		})
		
	},
	getSearchField( urlStr = '' ,  field = ''){
		 let url = urlStr.split("?")[1];
		 let paramMatch = url.split('&')
		 let params = {}
		 for (let s of paramMatch) {
			 let param = s.split('=')
			 params[param[0]] = param[1]	
		 	
		 }
		 if(field != ''){
			 return params[field] || false
		 }
		 return params
	}
	
}

export default helper;