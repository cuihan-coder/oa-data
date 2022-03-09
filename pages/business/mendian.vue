<template>
	<view>
		<view class="contain">
			<u-navbar title="经营发展管理-门店" leftText="返回" :fixed="true" @rightClick="rightClick" @leftClick="leftClick">
			</u-navbar>
			<view class="cont-block">
				<view class="select-block" @click="pickersShow = !pickersShow">
					<view class="select">
						<text>{{$store.state.other.company.label}}</text>
						<image src="../../static/image/xj_xl@2x.png"></image>
					</view>
				</view>
				
				<view class="guanli-block">
					<view class="syb-name">{{$store.state.other.company.label}}</view>
					<view class="shop-name">472杭州红普路广场店</view>
				</view>
				
				<!-- 指标 -->
				<view class="dbwd-title">
					<view class="left">指标</view>
					<view class="select" @click="lxpickerShow = !lxpickerShow">
						<text>{{this.columns[0][typeIndex].label}}</text>
						<image src="../../static/image/arrow-down.png"></image>
					</view>
				</view>
				
				<!-- 大客户数据 -->
				<view v-if="typeIndex == 0">
					<view class="flex-data">
						<flexData 
						:itemName="['大客户营业额','占比']"
						:itemValue="['5,564.00元','55.6%↑']"
						:leftStyle="{fontSize:'32rpx',color:'#1D97FF'}"
						:rightStyle="{fontSize:'32rpx',color:'#1FCD27'}"
						></flexData>
					</view>
					<view class="jxh-kb">
						<view class="title">
							<view class="left">
								<image src="../../static/image/circle.png"></image>
								<text>TC:门店订单数</text>
								<!-- <image  class="arrow-right" src="../../static/image/arrow-right.jpg"></image> -->
							</view>
							<view class="right">
								<view class="item">
									<view style="background-color:#FF632C;"></view>
									<text style="color:#FF632C;">金额</text>
								</view>
								<view class="item">
									<view style="background-color:#3271FF;"></view>
									<text style="color:#3271FF;">占比</text>
								</view>
							</view>
						</view>
						<!-- 折线统计图 -->
						<lineBar id="dkh_1"></lineBar>
					</view>
					<view class="jxh-kb">
						<view class="title">
							<view class="left">
								<image src="../../static/image/circle.png"></image>
								<text>AC:门店营业额</text>
							</view>
							<view class="right">
								<view class="item">
									<view style="background-color:#FF632C;"></view>
									<text style="color:#FF632C;">金额</text>
								</view>
								<view class="item">
									<view style="background-color:#3271FF;"></view>
									<text style="color:#3271FF;">占比</text>
								</view>
							</view>
						</view>
						<!-- 折线统计图 -->
						<lineBar id="dkh_2"></lineBar>
					</view>
				</view>
				<!-- 新店达成率 -->
				<view v-if="typeIndex == 1">
					<view class="flex-data">
						<flexData 
						:itemName="['新店预算达成率占比','新店营业额']"
						:itemValue="['60.6%','5,564.00元']"
						:leftStyle="{fontSize:'32rpx',color:'#1D97FF'}"
						:rightStyle="{fontSize:'32rpx',color:'#FF4317'}"
						></flexData>
					</view>
					<view class="jxh-kb">
						<view class="title">
							<view class="left">
								<image src="../../static/image/circle.png"></image>
								<text>新店预算达成金额及占比</text>
							</view>
							<view class="right">
								<view class="item">
									<view style="background-color:#FF632C;"></view>
									<text style="color:#FF632C;">金额</text>
								</view>
								<view class="item">
									<view style="background-color:#3271FF;"></view>
									<text style="color:#3271FF;">占比</text>
								</view>
							</view>
						</view>
						<!-- 折线统计图 -->
						<lineBar id="main_xddc"></lineBar>
					</view>
				</view>
				
				<!-- 自平台 -->
				<view v-if="typeIndex == 2">
					<view class="flex-data">
						<flexData
						:itemName="['自平台营业额','占比']"
						:itemValue="['5,564.00元','55.6%↑']"
						:leftStyle="{fontSize:'32rpx',color:'#1D97FF'}"
						:rightStyle="{fontSize:'32rpx',color:'#1FCD27'}"
						></flexData>
					</view>
					<view class="jxh-kb">
						<view class="title">
							<view class="left">
								<image src="../../static/image/circle.png"></image>
								<text>自取占比</text>
							</view>
							<view class="right">
								<view class="item">
									<view style="background-color:#FF632C;"></view>
									<text style="color:#FF632C;">金额</text>
								</view>
								<view class="item">
									<view style="background-color:#3271FF;"></view>
									<text style="color:#3271FF;">占比</text>
								</view>
							</view>
						</view>
						<!-- 折线统计图 -->
						<lineBar id="zpt_zq"></lineBar>
					</view>
					<view class="jxh-kb">
						<view class="title">
							<view class="left">
								<image src="../../static/image/circle.png"></image>
								<text>外卖占比</text>
							</view>
							<view class="right">
								<view class="item">
									<view style="background-color:#FF632C;"></view>
									<text style="color:#FF632C;">金额</text>
								</view>
								<view class="item">
									<view style="background-color:#3271FF;"></view>
									<text style="color:#3271FF;">占比</text>
								</view>
							</view>
						</view>
						<!-- 折线统计图 -->
						<lineBar id="zpt_wm"></lineBar>
					</view>
				</view>
				<!-- 柔服 -->
				<view v-if="typeIndex == 3">
					<view class="flex-data">
						<flexData
						:itemName="['柔服占比','柔服金额']"
						:itemValue="['60.6%','5,564.00元']"
						:leftStyle="{fontSize:'32rpx',color:'#1D97FF'}"
						:rightStyle="{fontSize:'32rpx',color:'#FF4317'}"
						></flexData>
					</view>
					<view class="jxh-kb">
						<view class="title">
							<view class="left">
								<image src="../../static/image/circle.png"></image>
								<text>柔服金额及占比</text>
							</view>
							<view class="right">
								<view class="item">
									<view style="background-color:#FF632C;"></view>
									<text style="color:#FF632C;">金额</text>
								</view>
								<view class="item">
									<view style="background-color:#3271FF;"></view>
									<text style="color:#3271FF;">占比</text>
								</view>
							</view>
						</view>
						<!-- 折线统计图 -->
						<lineBar id="rf_main"></lineBar>
					</view>
				</view>
				<view @click="goback()" class="btn">查看所有门店</view>
			</view>
		</view>
		<!-- 选择器 -->
		<pickers :show="pickersShow" :columns="$store.state.other.sybsList"></pickers>
		<!-- 门店类型比较 -->
		<u-picker :show="lxpickerShow" ref="uPicker" @cancel="lxpickerShow = false" keyName="label" :columns="columns" @confirm="confirm" @change="changeHandler"></u-picker>
		
	</view>
</template>

<script>
  import leidatu from "@/components/leida/index.vue"
  import kanban from "@/components/kanban/index.vue"
  import pickers from '@/components/picker/index.vue'
  import lineBar from "@/components/line-bar/index.vue"
  import flexData from "@/components/flex-data/index.vue"
	export default {
		components:{
			leidatu,
			kanban,
			pickers,
			lineBar,
			flexData
		},
		data() {
			return {
				pickersShow: false,
				lxpickerShow:false,
				typeIndex:0,
				columns:[
						[{
							label: '大客户',
							id: 1
						}, {
							label: '新店预算达成率',
							id: 2
						},
						{
							label: '自平台',
							id: 3
						},{
							label: '柔服',
							id: 4
						}]
					]
			};
		},
		onUnload() {
			
		},
		async onLoad(option) {
			let indexs = {'dkh':0,'xddc':1,'zpt':2,'rf':3}
			this.typeIndex = indexs[option.type]
			
			uni.$on('closePickers', () => {
				this.pickersShow = false
			})
		},
		
		methods: {
			goback(){
				uni.navigateBack({
					delta:1
				})
			},
			confirm(e){
				this.typeIndex = e.indexs[0]
				this.lxpickerShow = false
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
				display: flex;
				flex-direction: column;
				justify-content: flex-start;
				align-content: center;
				padding: 70rpx 0 70rpx 40rpx;
				background: url(../../static/image/gl_bg_2@2x.png) no-repeat;
				background-size: 100% 100%;
				& .syb-name{
					font-size: 25rpx;
					font-weight: bold;
					color: #FFFC02;
				}
				
				& .shop-name{
					margin-top: 10rpx;
					font-size: 33rpx;
					font-weight: bold;
					color: #FFFFFF;
				}
				& .pinf{
					display: flex;
					align-items: center;
					justify-content: center;
					margin-top: 12rpx;
					max-width: 300rpx;
					padding: 8rpx 20rpx;
					background: #FFFFFF;
					border-radius: 32rpx;
					& > text:nth-child(1){
						padding-right: 24rpx;
						font-size: 26rpx;
						font-weight: bold;
						color: #FF6600;
					}
					& > text:nth-child(3){
						padding-left: 4rpx;
						font-size: 23rpx;
						font-weight: bold;
						color: #FF6600;
					}
				}
				
				& .paiming{
					margin-top: 18rpx;
					font-size: 27rpx;
					font-weight: bold;
					color: #FFFFFF;
				}
				
				& .mds{
					margin-top: 10rpx;
					font-size: 27rpx;
					font-weight: bold;
					color: #FFFFFF;
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
					& image{
						margin-left: 6rpx;
						width: 16rpx;
						height: 16rpx;
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
			
			& .btn{
				margin:  30rpx auto;
				width: 90%;
				line-height: 88rpx;
				background: #069CF5;
				border-radius: 20rpx;
				font-size: 29rpx;
				font-weight: bold;
				color: #FFFFFF;
				text-align: center;
			}
		}
	}
</style>
