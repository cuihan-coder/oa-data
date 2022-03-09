<template>
	<view>
		<view class="contain">
			<u-navbar title="分差" leftText="返回" :fixed="true" @rightClick="rightClick" @leftClick="leftClick">
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
				
				<view class="flex-data">
					<flexData 
					:itemName="['分差占比','周环比增长']"
					:itemValue="[sybjxhzbfclist[0].fc +  '%',sybjxhzbfclist[0].fchb +'%']"
					:leftStyle="{fontSize:'32rpx',color:'#1D97FF'}"
					:rightStyle="{fontSize:'32rpx',color:'#FF4317'}"
					></flexData>
				</view>
				
				
				<view class="jxh-kb">
					<view class="title">
						<image src="../../static/image/circle.png"></image>
						<text>分差占比（后10）</text>
					</view>
					<myprocess 
					:list="processList"
					></myprocess>
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
				mdjxhzbfclist:[],
				sybjxhzbfclist:[],
				processList:[
					{
						name:'杭州人民路地铁站店',
						percentage:30,
						accounted:'3.4%',
						pageurl:'/pages/fine/mendian'
					}
				]
			};
		},computed: {
				companys() {
					return this.$store.state.other.company
				}
			},
			watch: {
				companys() {
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
			async onLoad() {
				this.getData()
				uni.$on('closePickers', () => {
					this.pickersShow = false
				})
			},
		
			methods: {
				getData() {
					this.$helper.httpPost(this.$api.getfcData_post, {
							empcode: this.$store.state.other.company.empcode,
							mobile: this.$store.state.other.company.mobile,
							syb: this.$store.state.other.company.depart,
							nyz: this.getYearMonthWeek()
						})
						.then((res) => {
							this.mdjxhzbfclist = res.data.mdjxhzbfclist
							this.sybjxhzbfclist = res.data.sybjxhzbfclist
							
							//天数最大值
							let _processList = []
							this.mdjxhzbfclist.forEach((item,index) => {
								_processList[index] = {
									name: item.posname,
									percentage: (item.fc / this.mdjxhzbfclist[0].fc).toFixed(2),
									accounted: item.fc + '%',
									pageurl: '/pages/fine/mendian?poscode=' + item.poscode
								}
							})
							
							this.processList = _processList
							
						})
				},
				toPage(url) {
					uni.navigateTo({
						url: url
					});
				}
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
						font-size: 24rpx;
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
					display: flex;
					align-items: center;
					margin-bottom: 30rpx;
					& image{
						width: 20rpx;
						height: 20rpx;
					}
					& text{
						padding-left: 5rpx;
						font-size: 30rpx;
						color: #069CF5;
						font-weight: bold;
					}
				}
			}
			
			& .flex-data{
				margin-top: 21rpx;
			}
			
			& .jxh-kb{
				margin-top: 20rpx;
				background: #FFFFFF;
				border-radius: 20rpx;
				padding: 35rpx 30rpx;
				& .title{
					display: flex;
					align-items: center;
					margin-bottom: 30rpx;
					& image{
						width: 20rpx;
						height: 20rpx;
					}
					& text{
						padding-left: 5rpx;
						font-size: 30rpx;
						color: #069CF5;
						font-weight: bold;
					}
				}
			}
		}
	}
</style>
