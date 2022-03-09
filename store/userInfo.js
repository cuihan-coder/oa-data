const userInfo = {
	namespaced: true,
	state:()=>({
		info: ''
	}),
	mutations:{
		SET_USER_INFO(state,val){
			state.info = val
		}
	}
}
export default userInfo
