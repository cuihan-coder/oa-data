<template>
	<view>
		<view class="contain">
			<u-navbar title="经营发展管理" leftText="返回" :fixed="true" @rightClick="rightClick" @leftClick="leftClick">
			</u-navbar>
			<view class="cont-block">
				<view class="select-block">
					<view class="select" @click="pickersShow = !pickersShow">
						<text>{{$store.state.other.company.label}}</text>
						<image src="../../static/image/xj_xl@2x.png"></image>
					</view>
				</view>
				
				<view class="guanli-block">
					<view class="syb-name">{{$store.state.other.company.label}}</view>
				</view>
				
				<!-- 自平台 -->
				<view class="jxh-kb">
					<view class="title">
						<navigator hover-class="none" url="/pages/business/zpt_index" class="left">
							<image src="../../static/image/circle.png"></image>
							<text>自平台</text>
							<image  class="arrow-right" src="../../static/image/arrow-right.jpg"></image>
						</navigator>
						<view class="right">
							<view class="item">
								<view style="background-color:#FF632C;"></view>
								<text style="color:#FF632C;">金额(元)</text>
							</view>
							<view class="item">
								<view style="background-color:#3271FF;"></view>
								<text style="color:#3271FF;">占比(%)</text>
							</view>
						</view>
					</view>
					<!-- 折线统计图 -->
					<lineBar id="main" 
					:show="true"
					:category="date"
					:moneyMax="JyfzZptMax"
					:moneyArr="JyfzZptArr"
					:zbArr="JyfzZptArr_zb"
					></lineBar>
				</view>
				<!-- 大客户 -->
				<view class="jxh-kb">
					<view class="title">
						<navigator hover-class="none" url="/pages/business/dkh_index"  class="left">
							<image src="../../static/image/circle.png"></image>
							<text>大客户</text>
							<image class="arrow-right" src="../../static/image/arrow-right.jpg"></image>
						</navigator>
						<view class="right">
							<view class="item">
								<view style="background-color:#FF632C;"></view>
								<text style="color:#FF632C;">金额(元)</text>
							</view>
							<view class="item">
								<view style="background-color:#3271FF;"></view>
								<text style="color:#3271FF;">TC(笔)</text>
							</view>
						</view>
					</view>
					<!-- 折线统计图 -->
					<lineBar 
					id="main1"
					:show="true"
					:category="date"
					:moneyMax="JyfzDkhMax"
					:moneyArr="JyfzDkhArr"
					:zbArr="JyfzDkhArr_zb"
					:zbMax="JyfzDkhMax_zb"
					rightTitle="TC"
					></lineBar>
				</view>
				<!-- 新店预算达成率 -->
				<view class="jxh-kb">
					<view class="title">
						<navigator hover-class="none" url="./xddcl" class="left">
							<image src="../../static/image/circle.png"></image>
							<text>新店预算达成率</text>
							<image class="arrow-right" src="../../static/image/arrow-right.jpg"></image>
						</navigator>
						<view class="right">
							<view class="item">
								<view style="background-color:#FF632C;"></view>
								<text style="color:#FF632C;">金额(元)</text>
							</view>
							<view class="item">
								<view style="background-color:#3271FF;"></view>
								<text style="color:#3271FF;">占比(%)</text>
							</view>
						</view>
					</view>
					<!-- 折线统计图 -->
					<lineBar
					id="main2"
					:show="true"
					:category="date"
					:moneyMax="JyfzDdcMax"
					:moneyArr="JyfzDdcArr"
					:zbArr="JyfzDdcArr_zb"
					></lineBar>
				</view>
				<!-- 柔服 -->
				<view class="jxh-kb">
					<view class="title">
						<navigator hover-class="none" url="./rf" class="left">
							<image src="../../static/image/circle.png"></image>
							<text>柔服</text>
							<image class="arrow-right" src="../../static/image/arrow-right.jpg"></image>
						</navigator>
						<view class="right">
							<view class="item">
								<view style="background-color:#FF632C;"></view>
								<text style="color:#FF632C;">金额(元)</text>
							</view>
							<view class="item">
								<view style="background-color:#3271FF;"></view>
								<text style="color:#3271FF;">占比(%)</text>
							</view>
						</view>
					</view>
					<!-- 折线统计图 -->
					<lineBar
					id="main3"
					:show="true"
					:category="date"
					:moneyMax="JyfzRfMax"
					:moneyArr="JyfzRfArr"
					:zbArr="JyfzRfArr_zb"
					></lineBar>
				</view>
				<view class="jxh-mx">
					<view class="title">
						<image src="../../static/image/circle.png"></image>
						<text>新店费用（近三月）</text>
						<image  class="arrow-right" src="../../static/image/arrow-right.jpg"></image>
					</view>
					<view class="feiyong">
						<navigator hover-class="none" url="kbf" class="item">
							<view><image src="../../static/image/xd_img1@2x.png"></image></view>
							<view>开办费(店均/元)</view>
							<view>{{JyfzKbfList[0] ? JyfzKbfList[0].kbfpj : 0}}</view>
						</navigator>
						<navigator hover-class="none" url="tzcb" class="item">
							<view><image src="../../static/image/xd_img2@2x.png"></image></view>
							<view>投资成本(店均/元)</view>
							<view>{{JyfzKbfList[1] ? JyfzKbfList[1].sjjsjepj : 0}}</view>
						</navigator>
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
  import lineBar from "@/components/line-bar/index.vue"
import pickers from '@/components/picker/index.vue'
	export default {
		components:{
			flexData,
			myprocess,
			lineBar,
			pickers
		},
		data() {
			return {
				pickersShow: false,
				//新店费用
				JyfzKbfList:[],
				
				//自平台
				JyfzZptList:[],
				JyfzZptMax:0,
				JyfzZptArr:[],
				JyfzZptArr_zb:[],
				
				//新店预数达成率
				JyfzDdcList:[],
				JyfzDdcMax:0,
				JyfzDdcArr:[],
				JyfzDdcArr_zb:[],
				
				//大客户
				JyfzDkhList:[],
				JyfzDkhMax:0,
				JyfzDkhMax_zb:0,
				JyfzDkhArr:[],
				JyfzDkhArr_zb:[],
				
				
				//柔服
				JyfzRfList:[],
				JyfzRfMax:0,
				JyfzRfArr:[],
				JyfzRfArr_zb:[],
				
				//日期
				date:[]
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
			async getData(){
				
				//获取到事业部信息后 开始获取 获取首页数据
				let res = await this.$helper.httpPost(this.$api.getJyfzData_post,{
					empcode:this.$store.state.other.company.empcode,
					mobile:this.$store.state.other.company.mobile,
					syb: this.$store.state.other.company.depart,
					nyz: this.getYearMonthWeek()
				})
				
				this.JyfzDdcList = res.data.JyfzDdcList
				this.JyfzDkhList = res.data.JyfzDkhList
				this.JyfzKbfList = res.data.JyfzKbfList
				this.JyfzRfList =  res.data.JyfzRfList
				this.JyfzZptList = res.data.JyfzZptList
				
				this.JyfzZptList.forEach((item,index) => {
					
					//日期处理
					this.date[index] = item.nyz
					//获取金额最大值
					if(this.JyfzZptMax <= item.zptys){
						this.JyfzZptMax = item.zptys
					}
					//封装数据列表
					this.JyfzZptArr[index] = item.zptys
					this.JyfzZptArr_zb[index] = item.zptzb * 100
				})
				
				this.JyfzDdcList.forEach((item,index) => {
					//获取金额最大值
					if(this.JyfzDdcMax <= item.amount){
						this.JyfzDdcMax = item.amount
					}
					//封装数据列表
					this.JyfzDdcArr[index] = item.amount
					this.JyfzDdcArr_zb[index] = item.ysdcl  * 100
					
				})
				
				//todo 数据有问题
				this.JyfzDkhList.forEach((item,index) => {
					
					//获取金额最大值
					if(this.JyfzDkhMax <= item.dkhys){
						this.JyfzDkhMax = item.dkhys
						console.log('-------',this.JyfzDkhMax)
					}
					//获取tc最大值
					if(this.JyfzDkhMax_zb <= item.dkhtc){
						this.JyfzDkhMax_zb = item.dkhtc
						console.log('++++++++')
						console.log('-------',this.JyfzDkhMax_zb)
					}
					//封装数据列表
					this.JyfzDkhArr[index] = item.dkhys
					this.JyfzDkhArr_zb[index] = item.dkhtc
				})
				
				
				this.JyfzRfList.forEach((item,index) => {
					//获取金额最大值
					if(this.JyfzRfMax <= item.rfje){
						this.JyfzRfMax = item.rfje
					}
					//封装数据列表
					this.JyfzRfArr[index] = item.rfje
					this.JyfzRfArr_zb[index] = item.rfzb * 100
					
				})
				
				let id =  setInterval(() => {
					clearInterval(id)
					uni.$emit('eeeee')
				},500)
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
		padding-bottom: 50rpx;
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
				padding: 35rpx 0rpx;
				& .title{
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin-bottom: 30rpx;
					& .left{
						display: flex;
						align-items: center;
						justify-content: flex-start;
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
						& .arrow-right{
							margin-left: 8rpx;
							width: 11rpx;
							height: 16rpx;
						}
					}
					
					& .right{
						display: flex;
						align-items: center;
						& .item{
							display: flex;
							justify-content: flex-start;
							align-items: center;
							margin-left: 20rpx;
							& view:nth-child(1){
								display: block;
								width: 10rpx;
								height: 10rpx;
								border-radius: 50%;
							}
							& text:nth-child(2){
								padding-left: 5rpx;
								font-size: 23rpx;
								font-family: PingFang SC;
								font-weight: bold;
							}
						}
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
						padding-right: 20rpx;
						font-size: 30rpx;
						color: #069CF5;
						font-weight: bold;
					}
					
				}
				
			}
			
			.jxh-mx{
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
					& .arrow-right{
						width: 11rpx;
						height: 16rpx;
					}
				}
				
				& .feiyong{
					display: flex;
					align-items: center;
					justify-content: space-between;
					& .item{
						width:50% ;
						text-align: center;
						& view{
							text-align: center;
						}
						& view:nth-child(1){
							& image{
								width: 84rpx;
								height: 84rpx;
							}
						}
						& view:nth-child(2){
							margin-top: 10rpx;
							font-size: 23rpx;
							font-weight: bold;
							color: #666666;
						}
						& view:nth-child(3){
							margin-top: 10rpx;
							font-size: 33rpx;
							font-weight: bold;
							color: #FF4317;
						}
					}
				}
			}
		}
	}
</style>
