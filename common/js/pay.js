const payModel = {
	wxPay(info){
		return new Promise((resolve,reject) => {
			uni.requestPayment({
			    provider: 'wxpay',
			    timeStamp: info.timeStamp,
			    nonceStr: info.nonceStr,
			    package: info.package,
			    signType: info.signType,
			    paySign: info.paySign,
			    success: function (res) {
					console.log(res,'weixzhifu')
					resolve(true)
			    },
			    fail: function (err) {
					resolve(false)
			    }
			});
		})
	},
	qqWxPay(info){
		
	}

}

export default payModel;
