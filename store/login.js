const login = {
	namespaced: true,
	state:()=>({
		mobile:'',
		verify_code:'',
		invite_code:''
	}),
	mutations:{
		//设置登陆注册手机号码
		SET_MOBILE(state,val){
			state.mobile = val
		},
		SET_VERIFY_CODE(state,val){
			state.verify_code = val
		},
		SET_INVITE_CODE(state,val){
			state.invite_code = val
		}
	}
}
export default login
