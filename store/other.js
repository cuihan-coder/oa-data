const other = {
	namespaced: true,
	state:()=>({
		company:[],
		sybsList:[]
	}),
	mutations:{
		//设置全局的公司信息
		SET_COMPANY(state,val){
			state.company = val
		},
		//设置全局公司列表
		SET_SYBS_LIST(state,val){
			state.sybsList = val
		},
	}
}
export default other
