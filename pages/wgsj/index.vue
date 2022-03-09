<template>
	<view>
		<view class="contain">
			<u-navbar title="违规事件" leftText="返回" :fixed="true" @rightClick="rightClick" @leftClick="leftClick">
			</u-navbar>
			<view class="cont-block">
				<view class="select-block"  @click="pickersShow = !pickersShow">
					<view class="select">
						<text>{{$store.state.other.company.label}}</text>
						<image src="../../static/image/xj_xl@2x.png"></image>
					</view>
				</view>
				
				<view class="guanli-block">
					<view class="syb-name">{{$store.state.other.company.label}}</view>
				</view>
				
				<!-- 员工餐占比 -->
				<view v-for="(item,index) in wgycList" class="jxh-kb">
					<text class="title">{{item.mdmc}}</text>
					<view class="cont">{{item.ycyy}}</view>
				</view>
			</view>
		</view>
		<!-- 选择器 -->
		<pickers :show="pickersShow" :columns="$store.state.other.sybsList"></pickers>
	</view>
</template>

<script>
  import flexData from "@/components/flex-data/index.vue"
  import myprocess from "@/components/process/index.vue"
  import pickers from '@/components/picker/index.vue'
	export default {
		components:{
			flexData,
			myprocess,
			pickers
		},
		data() {
			return {
				pickersShow: false,
				wgycList:[]
			};
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
		async onLoad() {
			this.getData()
			uni.$on('closePickers', () => {
				this.pickersShow = false
			})
		},
		onUnload() {
			
		},
		methods: {
			getData(){
				//获取到事业部信息后 开始获取 获取首页数据
				this.$helper.httpPost(this.$api.getWgyjData_post,{
					empcode:this.$store.state.other.company.empcode,
					mobile:this.$store.state.other.company.mobile,
					syb: this.$store.state.other.company.depart,
					nyz: this.getYearMonthWeek()
				}).then(res => {
					this.wgycList = res.data.wgycList
				})
			},
		}
	}
</script>

<style lang="scss">
	page{
		background-color: $color-F4;
	}
	.contain{
		.cont-block{
			width: calc(100% - 60rpx);
			margin: 130rpx auto 0;
			& .select-block{
				display: flex;
				justify-content: flex-end;
				& .select{
					display: flex;
					align-items: center;
					justify-content: center;
					
					width: 210rpx;
					height: 50rpx;
					background: url(../../static/image/home_qh_bg@2x.png) no-repeat;
					background-size:100% 100%;
					& > text{
						padding-left: 10rpx;
						font-size: 12rpx;
						font-weight: bold;
						color: #222222;
					}
					& image{
						width: 16rpx;
						height: 16rpx;
						margin-left: 8rpx;
					}
				}
			}
			
			& .guanli-block{
				min-height: 200rpx;
				background: url(../../static/image/gl_bg_2@2x.png) no-repeat;
				background-size: 100% 100%;
				display: flex;
				align-items: center;
				& .syb-name{
					padding-left: 42rpx;
					font-size: 33rpx;
					font-weight: bold;
					color: #FFFC02;
					
				}
				
			}
			
			& .dbwd-title{
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin:40rpx 0 20rpx;
				& .left{
					font-size: 33rpx;
					font-weight: bold;
					color: #333333;
				}
				& .select{
					display: flex;
					align-items: center;
					& > text{
						font-size: 25rpx;
						font-weight: bold;
						color: #069CF5;
					}
					
				}
			}
		
			& .jxh-kb{
				margin-top: 20rpx;
				background: #FFFFFF;
				border-radius: 20rpx;
				padding: 35rpx 30rpx;
				& .title{
					padding: 11rpx 20rpx;
					background: #FFECEC;
					border-radius: 4px;
					font-size: 23rpx;
					font-weight: bold;
					color: #FF4040;
				}
				
				& .cont{
					padding-top: 30rpx;
					font-size: 27rpx;
					font-weight: bold;
					color: #333333;
				}
				
			}
		}
	}
</style>
