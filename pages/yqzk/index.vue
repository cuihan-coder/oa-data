<template>
	<view>
		<view class="contain">
			<u-navbar title="逾期账款" leftText="返回" :fixed="true" @rightClick="rightClick" @leftClick="leftClick">
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
					<!-- <flexData 
					:itemName="['3个月以上逾期账款总额','周环比增长']"
					:itemValue="['5,564.00元','-55.6%']"
					:leftStyle="{fontSize:'32rpx',color:'#1D97FF'}"
					:rightStyle="{fontSize:'32rpx',color:'#FF4317'}"
					></flexData> -->
					<view>3个月以上逾期账款总额</view>
					<view class="ss">{{sybyqzkList[0] ? sybyqzkList[0].amount : 0}}</view>
				</view>
				<view class="jxh-kb">
					<view class="title">
						<image src="../../static/image/circle.png"></image>
						<text>3个月以上逾期账款明细</text>
					</view>
					
					<view class="table-header">
						<view>序号</view>
						<view>客户编号</view>
						<view>客户名称</view>
						<view>逾期金额</view>
					</view>
					
					<view class="table-body" v-for="(item,index) in mdyqzkList">
						<view>{{index + 1}}</view>
						<view>{{item.ccode}}</view>
						<view>{{item.cname}}</view>
						<view>{{item.amount}}元</view>
					</view>
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
				sybyqzkList:[],
				mdyqzkList:[]
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
				//获取到事业部信息后 开始获取 获取首页数据
				this.$helper.httpPost(this.$api.getYqzkData_post,{
					empcode:this.$store.state.other.company.empcode,
					mobile:this.$store.state.other.company.mobile,
					syb: this.$store.state.other.company.depart,
					nyz: this.getYearMonthWeek()
				}).then(res => {
					this.sybyqzkList = res.data.sybyqzkList
					this.mdyqzkList = res.data.mdyqzkList
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
			padding-bottom: 100rpx;
			width: calc(100% - 60rpx);
			margin: 130rpx auto 0;
			& .flex-data{
				display: flex;
				align-items: center;
				justify-content: center;
				flex-direction: column;
				height: 180rpx;
				background: #FFFFFF;
				border-radius: 20rpx;
				text-align: center;
				& view:nth-child(1){
					padding-bottom: 20rpx;
					font-size: 23rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #666666;
				}
				& .ss{
					font-size: 33rpx;
					font-weight: bold;
					color: #1D97FF;
				}
			}
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
			
			& .table-header{
				display: flex;
				align-items: center;
				justify-content: flex-start;
				line-height: 64rpx;
				background: #DAF0FE;
				& view{
					font-size: 23rpx;
					font-weight: bold;
					color: #069CF5;
					text-align: center;
				}
				& view:nth-child(1){
					width: 14%;
				}
				& view:nth-child(2){
					width: 20%;
				}
				& view:nth-child(3){
					width: 40%;
				}
				& view:nth-child(4){
					width: 26%;
				}
			}
			
			& .table-body{
				display: flex;
				align-items: center;
				background-color: #FBFBFB;
				padding: 25rpx 0;
				margin-bottom: 2rpx;
				& view{
					font-size: 19rpx;
					font-weight: bold;
					color: #069CF5;
					text-align: center;
				}
				
				& view:nth-child(1){
					width: 14%;
					flex-shrink: 0;
				}
				& view:nth-child(2){
					width: 20%;
					flex-shrink: 0;
					word-wrap: break-word;
					word-break: normal;
				}
				& view:nth-child(3){
					width: 40%;
					flex-shrink: 0;
				}
				& view:nth-child(4){
					width: 26%;
					flex-shrink: 0;
					color: #FF4317 !important;
				}
			}
		}
		
		
	}
</style>
