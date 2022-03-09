<template>
	<view>
		<view class="contain">
			<!-- 消息入口 -->
			<!-- 轮播图 -->
			<swiper class="swiper" indicator-dots="true" autoplay="true" interval="3" duration="2000"
				indicator-color="#999999" indicator-active-color="#ffffff">
				<swiper-item>
					<navigator class="swiper-item" url="">
						<image src="../../static/image/home_banner@2x.png"></image>
					</navigator>
				</swiper-item>
			</swiper>
			<!-- 业绩轮播看板 -->
			<view class="lbkb">
				<view class="select-block">
					<view class="select" @click="pickersShow = !pickersShow">
						<text>{{$store.state.other.company.label}}</text>
						<image src="../../static/image/xj_xl@2x.png"></image>
					</view>
				</view>

				<view class="info-block">
					<view class="header">
						<view>
							<image src="../../static/image/home_yj@2x.png"></image>
							<image src="../../static/image/home_kb@2x.png"></image>
						</view>
						<view>
							<image src="../../static/image/hone_sj@2x.png"></image>
							<text>截止至 {{getYearMonthWeek()}}</text>
						</view>
					</view>
					 <swiper  class="gundong" :vertical="true" :indicator-dots="false" :autoplay="true" 
						duration="3000">
						<swiper-item class="gundong-item">
							<view class="neirong" v-if="KbList[0]">
								<text>{{KbList[0].name}}</text>
								<view>
									<text :class="KbList[0].cy >= 0 ? 'ss' :'xj'">{{KbList[0].df}}{{KbList[0].cy >= 0 ? '↑' :'↓'}}</text>
									<text :class="KbList[0].cy >= 0 ? 'ss' :'xj'">较上周{{KbList[0].cy >= 0 ? '上升' :'下降'}}{{KbList[0].cy}}</text>
								</view>
							</view>
							<view class="neirong" v-if="KbList[1]">
								<text>{{KbList[1].name}}</text>
								<view>
									<text :class="KbList[1].cy >= 0 ? 'ss' :'xj'">{{KbList[1].df}}{{KbList[1].cy >= 0 ? '↑' :'↓'}}</text>
									<text :class="KbList[1].cy >= 0 ? 'ss' :'xj'">较上周{{KbList[1].cy >= 0 ? '上升' :'下降'}}{{KbList[1].cy}}</text>
								</view>
							</view>
						</swiper-item>
						<swiper-item class="gundong-item">
							<view class="neirong"  v-if="KbList[2]">
								<text>{{KbList[2].name}}</text>
								<view>
									<text :class="KbList[2].cy >= 0 ? 'ss' :'xj'">{{KbList[2].df}}{{KbList[2].cy >= 0 ? '↑' :'↓'}}</text>
									<text :class="KbList[2].cy >= 0 ? 'ss' :'xj'">较上周{{KbList[2].cy >= 0 ? '上升' :'下降'}}{{KbList[2].cy}}</text>
								</view>
							</view>
							<view class="neirong" v-if="KbList[3]">
								<text>{{KbList[3].name}}</text>
								<view>
									<text :class="KbList[3].cy >= 0 ? 'ss' :'xj'">{{KbList[3].df}}{{KbList[3].cy >= 0 ? '↑' :'↓'}}</text>
									<text :class="KbList[3].cy >= 0 ? 'ss' :'xj'">较上周{{KbList[3].cy >= 0 ? '上升' :'下降'}}{{KbList[3].cy}}</text>
								</view>
							</view>
						</swiper-item>
						<swiper-item class="gundong-item">
							<view class="neirong"  v-if="KbList[4]">
								<text>{{KbList[4].name}}</text>
								<view>
									<text :class="KbList[4].cy >= 0 ? 'ss' :'xj'">{{KbList[4].df}}{{KbList[4].cy >= 0 ? '↑' :'↓'}}</text>
									<text :class="KbList[4].cy >= 0 ? 'ss' :'xj'">较上周{{KbList[4].cy >= 0 ? '上升' :'下降'}}{{KbList[4].cy}}</text>
								</view>
							</view>
							<view class="neirong" v-if="KbList[5]">
								<text>{{KbList[5].name}}</text>
								<view>
									<text :class="KbList[5].cy >= 0 ? 'ss' :'xj'">{{KbList[5].df}}{{KbList[5].cy >= 0 ? '↑' :'↓'}}</text>
									<text :class="KbList[5].cy >= 0 ? 'ss' :'xj'">较上周{{KbList[5].cy >= 0 ? '上升' :'下降'}}{{KbList[5].cy}}</text>
								</view>
							</view>
						</swiper-item>
						<swiper-item class="gundong-item">
							<view class="neirong" v-if="KbList[6]">
								<text>{{KbList[6].name}}</text>
								<view>
									<text :class="KbList[6].cy >= 0 ? 'ss' :'xj'">{{KbList[6].df}}{{KbList[6].cy >= 0 ? '↑' :'↓'}}</text>
									<text :class="KbList[6].cy >= 0 ? 'ss' :'xj'">较上周{{KbList[6].cy >= 0 ? '上升' :'下降'}}{{KbList[6].cy}}</text>
								</view>
							</view>
							<view class="neirong" v-if="KbList[7]">
								<text>{{KbList[7].name}}</text>
								<view>
									<text :class="KbList[7].cy >= 0 ? 'ss' :'xj'">{{KbList[7].df}}{{KbList[7].cy >= 0 ? '↑' :'↓'}}</text>
									<text :class="KbList[7].cy >= 0 ? 'ss' :'xj'">较上周{{KbList[7].cy >= 0 ? '上升' :'下降'}}{{KbList[7].cy}}</text>
								</view>
							</view>
						</swiper-item>
						<swiper-item class="gundong-item">
							<view class="neirong" v-if="KbList[8]">
								<text>{{KbList[8].name}}</text>
								<view>
									<text :class="KbList[8].cy >= 0 ? 'ss' :'xj'">{{KbList[8].df}}{{KbList[8].cy >= 0 ? '↑' :'↓'}}</text>
									<text :class="KbList[8].cy >= 0 ? 'ss' :'xj'">较上周{{KbList[8].cy >= 0 ? '上升' :'下降'}}{{KbList[8].cy}}</text>
								</view>
							</view>
						</swiper-item>
					</swiper> 
				</view>

				<!-- 管理指标 -->
				<view class="glzb">
					<image class="logo" src="../../static/image/home_kb@2x(1).png"></image>
					<view class="rukou-block">
						<navigator hover-class="none" url="../fine/index" class="rukou">
							<image src="../../static/image/home_gl_img1@2x.png"></image>
							<view class="type">精细化管理</view>
							<view class="desc" v-if="socreList[0]">
								<u-rate active-color="#FF6600" size="10" gutter="1" count="5" :value="socreList[0]['df']/20"></u-rate>
								<text>{{socreList[0]['df'] ? socreList[0]['df'] : 0}}分</text>
							</view>
						</navigator>
						<view class="shuxian"></view>
						<navigator hover-class="none" url="../business/index" class="rukou">
							<image src="../../static/image/home_gl_img2@2x.png"></image>
							<view class="type">经营发展管理</view>
							<view class="desc">
								<text>未来就在现在</text>
							</view>
						</navigator>
					</view>
				</view>

				<!-- 管理指标 -->
				<view class="glzb">
					<view class="header">
						<image class="logo" src="../../static/image/home_kb@2x(2).png"></image>
						<view class="time">
							<image src="../../static/image/hone_sj@2x.png"></image>
							<text>截止至 {{getYearMonthWeek()}}</text>
						</view>
					</view>
					<navigator hover-class="none" url="../wgsj/index" class="shijian-item">
						<text>违规事件</text>
						<view>本周违规事件{{qzkList[0] ? qzkList[0].df : 0}}起</view>
					</navigator>
					<navigator hover-class="none" url="../yqzk/index" class="shijian-item">
						<text>逾期账款</text>
						<view>逾期3个月以上，金额{{qzkList[1] ? qzkList[1].df : 0}}元，共{{qzkList[2] ? qzkList[2].df : 0}}笔</view>
					</navigator>
					<navigator hover-class="none" url="../zjyc/index" class="shijian-item">
						<text>资金缴存异常</text>
						<view>现金缴存异常平均天数：{{qzkList[3] ? qzkList[3].df : 0}}天</view>
					</navigator>
				</view>
			</view>
		</view>
		<!-- 选择器 -->
		<pickers :show="pickersShow" :columns="$store.state.other.sybsList"></pickers>
	</view>

</template>

<script>
	import pickers from '@/components/picker/index.vue'
	import * as dd from 'dingtalk-jsapi'; // 此方式为整体加载，也可按需进行加载

	export default {
		components: {
			pickers
		},
		data() {
			return {
				pickersShow: false,
				KbList:[],
				socreList:[],
				qzkList:[]
			};
		},
		
		onShow() {
			uni.$on('closePickers', () => {
				this.pickersShow = false
			})
		},
		computed:{
			companys(){
				return this.$store.state.other.company
			}
		},
		watch:{
			companys(){
				this.getData()
			}
		},
		async onLoad(option) {
			this.getYearMonthWeek()
			let corpId = option.corpId
			//this.ddInit(corpId)
			this.$helper.httpPost(this.$api.ding_login_post,{code:'',corpId:''})
			.then((res) => {
				let lenI = res.data.syb.length
				for (var i = 0; i < lenI; i++) {
					res.data.syb[i].id = i + 1
					res.data.syb[i].label = res.data.syb[i].depart
				}
				this.$store.commit('other/SET_SYBS_LIST',[res.data.syb])
			})
		},

		methods: {
			ddInit(corpId){
				let that = this
				dd.ready(function() {
				    // dd.ready参数为回调函数，在环境准备就绪时触发，jsapi的调用需要保证在该回调函数触发后调用，否则无效。
				    dd.runtime.permission.requestAuthCode({
				        corpId: corpId,
				        onSuccess: function(result) {
							uni.showModal({
								content:`
									code:${result.code};
									corpId:${corpId};
								`
							})
							that.$helper.httpPost(that.$api.ding_login_post,{code:result.code,corpId:corpId})
							.then((res) => {
								
							})
				        },
				        onFail : function(err) {}
				  
				    });
				});
				dd.error(function(error){
					   uni.showToast({
					   	title:'code:' + error.errorMessage,
						icon:'none'
					   })
				});
			},
			getData(){
				//获取到事业部信息后 开始获取 获取首页数据
				this.$helper.httpPost(this.$api.ding_home_post,{
					empcode:this.$store.state.other.company.empcode,
					mobile:this.$store.state.other.company.mobile,
					syb: this.$store.state.other.company.depart,
					nyz: this.getYearMonthWeek()
				})
				.then(res => {
					this.KbList = res.data.KbList
					this.qzkList = res.data.qzkList
					this.socreList = res.data.socreList 
				})
			}
		}	
	}
</script>

<style lang="scss">
	page {
		background-color: $color-F4;
	}

	.contain {
		& .msg-icon {
			position: fixed;
			right: 36rpx;
			top: 36rpx;
			width: 44rpx;
			height: 44rpx;
			z-index: 100;
		}

		padding-bottom: 150rpx;

		& .swiper {
			background-color: $color-F4;
			width: 100%;
			height: 500rpx;

			& .swiper-item {
				width: 100%;
				height: 100%;

				& image {
					width: 100%;
					height: 100%;
				}
			}
		}

		& .lbkb {
			width: calc(100% - 60rpx);
			margin: 0 auto;
			position: relative;
			top: -160rpx;

			& .select-block {
				display: flex;
				justify-content: flex-end;

				& .select {
					display: flex;
					align-items: center;
					justify-content: center;

					width: 210rpx;
					height: 50rpx;
					background: url(../../static/image/home_qh_bg@2x.png) no-repeat;
					background-size: 100% 100%;

					&>text {
						padding-left: 10rpx;
						font-size: 24rpx;
						font-weight: bold;
						color: #222222;
					}

					& image {
						width: 16rpx;
						height: 16rpx;
						margin-left: 8rpx;
					}
				}
			}


			& .info-block {
				background: #FFFFFF;
				border-radius: 20rpx 0px 20rpx 20rpx;
				padding: 30rpx 30rpx 60rpx;

				& .header {
					display: flex;
					align-items: center;
					justify-content: space-between;

					&>view:nth-child(1) {
						display: flex;
						align-items: center;

						& image:nth-child(1) {
							width: 32rpx;
							height: 32rpx;
						}

						& image:nth-child(2) {
							margin-left: 6rpx;
							width: 204rpx;
							height: 32rpx;
						}
					}

					&>view:nth-child(2) {
						display: flex;
						align-items: center;

						& image {
							width: 24rpx;
							height: 24rpx;
						}

						& text {
							padding-left: 4rpx;
							font-size: 24rpx;
							font-family: PingFang SC;
							font-weight: bold;
							color: #BBBBBB;
						}
					}
				}

				& .gundong {
					width: 100%;
					height: 140rpx !important;
					margin-top: 50rpx;

					& .gundong-item {
						width: 100%;
						height: 140rpx !important;
						display: flex;
						flex-wrap: wrap;
						justify-content: center;
						align-items: center;

						& .neirong {
							width: 100%;
							display: flex;
							justify-content: center;

							& text:nth-child(1) {
								display: block;
								width: 36%;
								font-size: 31rpx;
								font-weight: bold;
								color: #333333;
								text-align: right;
								flex-shrink: 0;
							}

							& view:nth-child(2) {
								width: 75%;
								display: flex;

								& .ss {
									color: #1FCD27;
								}

								& .xj {
									color: #FF4040;
								}

								& text:nth-child(1) {
									font-size: 31rpx;
									font-weight: bold;
								}

								& text:nth-child(2) {
									padding-left: 2rpx;
									font-size: 31rpx;
									font-weight: bold;
								}
							}

						}
					}
				}

			}

		}

		& .glzb {
			padding: 30rpx;
			background: #FFFFFF;
			border-radius: 20rpx;
			margin-top: 20rpx;

			& .header {
				display: flex;
				justify-content: space-between;
				align-items: center;

				&>.logo {
					width: 159rpx;
					height: 31rpx;
				}

				&>.time {
					display: flex;
					align-items: center;

					& image {
						width: 24rpx;
						height: 24rpx;
					}

					& text {
						padding-left: 4rpx;
						font-size: 23rpx;
						font-weight: bold;
						color: #BBBBBB;
					}
				}

				margin-bottom: 20rpx;
			}

			&>.logo {
				width: 159rpx;
				height: 31rpx;
				margin-bottom: 20rpx;
			}

			& .rukou-block {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 0 30rpx;

				& .rukou {
					&>image {
						width: 230rpx;
						height: 140rpx;
					}

					& .type {
						font-size: 27rpx;
						font-weight: bold;
						color: #333333;
						text-align: center;
					}

					& .desc {
						display: flex;
						justify-content: center;
						margin-top: 10rpx;

						&>text {
							font-size: 20rpx;
							color: #FF6600;
						}
					}
				}
			}
			
			& .shuxian{
				width: 1rpx;
				height: 160rpx;
				background: #EFEFEF;
			}

			& .shijian-item {
				margin-top: 30rpx;

				& text:nth-child(1) {
					padding: 11rpx 22rpx;
					line-height: 44rpx;
					background: #FFECEC;
					border-radius: 4rpx;
					font-size: 23rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #FF4040;
				}

				& view:nth-child(2) {
					margin-top: 20rpx;
					font-size: 27rpx;
					font-weight: bold;
					color: #333333;
				}

			}
		}
	}
</style>
