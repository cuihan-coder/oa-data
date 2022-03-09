import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import login from './login.js'
import userInfo from './userInfo.js'
import other from './other.js'

const store = new Vuex.Store({
	state: {
		VERSION_NO:100,
		VERSION:'1.0.0',
	},
	mutations: {
		
	},
	actions: {
		
	},
	modules: {
		login,
		userInfo,
		other
	}
})
export default store
