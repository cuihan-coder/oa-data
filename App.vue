<script>
export default {
	onLaunch: function(e) {
		//获取appconnfig
		this.$helper.httpGet(this.$api.config_get)
		.then((data) =>{
			this.$helper._setCache('appConfig',data.data)
		})
		
		this.$helper._getCache('loginToken').then(token => {
			if(token == ''){
				uni.reLaunch({
					url:'pages/login/index'
				})
				return
			}
		})
		
	},
	onShow: function(e) {
		console.log('App onShow');
	},
	onHide: function() {
		this.$store.replaceState;
		console.log('App Hide');
	}
};
</script>

<style lang="scss">
@import "uview-ui/index.scss";

</style>
