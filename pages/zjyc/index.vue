<template>
	<view>
		<view class="contain">
			<u-navbar title="资金缴存异常" leftText="返回" :fixed="true" @rightClick="rightClick" @leftClick="leftClick">
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
					:itemName="['现金缴存异常平均天数','周环比增长']"
					:itemValue="[sybxjjcyclist[0] ?sybxjjcyclist[0].wjkts: '0' + '天',sybxjjcyclist[0] ? sybxjjcyclist[0].wjktshb : '0' + '天']"
					:leftStyle="{fontSize:'32rpx',color:'#1D97FF'}"
					:rightStyle="{fontSize:'32rpx',color:'#FF4317'}"
					></flexData>
				</view>
				<view class="jxh-kb">
					<view class="title">
						<image src="../../static/image/circle.png"></image>
						<text>现金缴存异常天数及金额（后10）</text>
					</view>
					<myprocess
					key="1"
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
				sybxjjcyclist:[],
				mdxjjcyclist:[],
				processList:[
				]
			};
		},
		onUnload() {
			
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
		
		methods: {
			getData(){
				this.$helper.httpPost(this.$api.getcycData_post,{
					empcode:this.$store.state.other.company.empcode,
					mobile:this.$store.state.other.company.mobile,
					syb: this.$store.state.other.company.depart,
					nyz: this.getYearMonthWeek()
				})
				.then((res)=>{
					this.sybxjjcyclist = res.data.sybxjjcyclist
					this.mdxjjcyclist = res.data.mdxjjcyclist
					//天数最大值
					let lenI = this.mdxjjcyclist.length
					let _processList = []
					for (var i = 0; i < lenI; i++) {
						let item = this.mdxjjcyclist[i]
						_processList[i] = {
							name:item.posname,
							percentage:(item.wjkts / this.mdxjjcyclist[0].wjkts).toFixed(2),
							accounted:item.wjkts + '天',
							money:item.wjkje + '元'
						}
						
					}
					this.processList = _processList
					
					console.log(this.processList)
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
		
			& .flex-data{
				margin-top: 21rpx;
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
	}
</style>
