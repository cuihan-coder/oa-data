<!-- 雷达数据图 -->
<template>
	<view class="leidatu" v-if="show">
		<view class="lables">
			<view class="sz">
				<text></text>
				<text>上周</text>
			</view>
			<view class="bz">
				<text></text>
				<text>本周</text>
			</view>
		</view>
		<view id="main"></view>
		<view class="self-lable">
			<navigator hover-class="none" :url=" is_skip == true ? '../../pages/fine/ysdcl' : '#' " class="item ysys">
				<view>营收预算达成率</view>
				<view><text :class="bz[0] >= sz[0] ? 'up':'down' ">{{bz[0]}}</text><text>/{{sz[0]}}</text></view>
			</navigator>
			<navigator hover-class="none" :url=" is_skip == true ? '../../pages/fine/fc' : '#' " class="item fc">
				<view>分差</view>
				<view><text :class="bz[1] >= sz[1] ? 'up':'down' ">{{bz[1]}}</text><text>/{{sz[1]}}</text></view>
			</navigator>	
			<navigator hover-class="none"  :url=" is_skip == true ? '../../pages/fine/spcb' : '#' "  class="item despcb">
				<view>定额食品成本</view>
				<view><text :class="bz[2] >= sz[2] ? 'up':'down' ">{{bz[2]}}</text><text>/{{sz[2]}}</text></view>
			</navigator>	
			<navigator hover-class="none"  :url=" is_skip == true ? '../../pages/fine/zzts' : '#' " class="item chzzts">
				<view>库存周转天数</view>
				<view><text :class="bz[3] >= sz[3] ? 'up':'down' ">{{bz[3]}}</text><text>/{{sz[3]}}</text></view>
			</navigator>	
			<navigator hover-class="none"  :url=" is_skip == true ? '../../pages/fine/bzcb' : '#' "   class="item bzcb">
				<view>包装成本</view>
				<view><text :class="bz[4] >= sz[4] ? 'up':'down' ">{{bz[4]}}</text><text>/{{sz[4]}}</text></view>
			</navigator>	
			<navigator hover-class="none"  :url=" is_skip == true ? '../../pages/fine/bc' : '#' "  class="item bc">
				<view>报损</view>
				<view><text :class="bz[5] >= sz[5] ? 'up':'down' ">{{bz[5]}}</text><text>/{{sz[5]}}</text></view>
			</navigator>	
			<navigator hover-class="none" :url=" is_skip == true ? '../../pages/fine/ygc' : '#' " class="item ygs">
				<view>员工餐</view>
				<view><text :class="bz[6] >= sz[6] ? 'up':'down' ">{{bz[6]}}</text><text>/{{sz[6]}}</text></view>
			</navigator>	
			<navigator hover-class="none"  :url=" is_skip == true ? '../../pages/fine/dwgs' : '#' " class="item dwgsxs">
				<view>单位工时销售</view>
				<view><text :class="bz[7] >= sz[7] ? 'up':'down' ">{{bz[7]}}</text><text>/{{sz[7]}}</text></view>
			</navigator>
			<navigator hover-class="none"  :url=" is_skip == true ? '../../pages/fine/rscb' : '#' " class="item rscb">
				<view>人事成本</view>
				<view><text :class="bz[8] >= sz[8] ? 'up':'down' ">{{bz[8]}}</text><text>/{{sz[8]}}</text></view>
			</navigator>
			<navigator hover-class="none" :url=" is_skip == true ? '../../pages/fine/lrysdc' : '#' "   class="item lrysdcl">
				<view>利润预算达成率</view>
				<view><text :class="bz[9] >= sz[9] ? 'up':'down' ">{{bz[9]}}</text><text>/{{sz[9]}}</text></view>
			</navigator>
		</view>
	</view>
</template>

<script>
	window.wx = undefined
	import * as echarts from 'echarts';
	export default {
		name:'leidatu',
		props:{
			show:{
				type:Boolean,
				default:false
			},
			bz:{
				type:Array,
				default:() => {
					return []
				}
			},
			sz:{
				type:Array,
				default:() => {
					return []
				}
			},
			max:{
				type:[String,Number],
				default:0
			},
			is_skip:{
				type:Boolean,
				default:true
			}
		},
		mounted() {
			uni.$on('leidaemit',() => {
				var chartDom = document.getElementById('main');
				var myChart = echarts.init(chartDom);
				var option;
				
				option = {
				  color: ['#FF632C', '#3271FF'],
				   grid: { // 控制图的大小，调整下面这些值就可以，
					  x: 30,
					  x2: 80,
					  y2: 100// y2可以控制 X轴跟Zoom控件之间的间隔，避免以为倾斜后造成 label重叠到zoom上
				  },
				  
				  radar: {
				    shape: 'circle',
					silent:false,
					triggerEvent:true,
					radius:'50%',
					axisName:{
						show:false
					},
				    indicator: [
				      { name: '营收预算达成率', max: this.max },
				      { name: '分差', max: this.max },
				      { name: '定额食品成本', max: this.max },
				      { name: '存货周转天数', max: this.max },
				      { name: '包装成本', max: this.max },
				      { name: '报损', max: this.max },
					  { name: '员工餐', max: this.max },
					  { name: '单位工时销售', max: this.max },
					  { name: '人事成本', max: this.max },
					  { name: '利润预算达成率', max: this.max }
				    ]
				  },
				  series: [
				    {
				      type: 'radar',
				      data: [
				        {
				          value: this.sz,
				          //name: '上周',
						   areaStyle: {
							  color: new echarts.graphic.RadialGradient(0.1, 0.6, 1, [
								{
								  color: 'rgba(255, 145, 124, 0.1)',
								  offset: 0
								},
								{
								  color: 'rgba(255, 145, 124, 0.9)',
								  offset: 1
								}
							  ])
							}
				        },
				        {
				          value: this.bz,
				          //name: '本周',
				        }
				      ]
				    }
				  ],
				};
				
				option && myChart.setOption(option);
				
				
				 // myChart.on('touch', function (params) {
				 // 	console.log(params)
				 // 	if(params.name=="研发"){ //判断点击文字
				 // 		alert("aaa")
				 // 	}
				 //  })
			})
		
		},
		methods:{
			
		}
	}
</script>

<style lang="scss">
	.leidatu{
		position: relative;
		padding: 30rpx;
		background: #FFFFFF;
		border-radius: 20rpx;
		
		& .lables{
			display: flex;
			& .sz{
				display: flex;
				align-items: center;
				& text:nth-child(1){
					width: 10rpx;
					height: 10rpx;
					background: #FF632C;
					border-radius: 50%;
				}
				& text:nth-child(2){
					padding-left: 8rpx;
					font-size: 25rpx;
					font-weight: bold;
					color: #FF632C;
				}
			}
			& .bz{
				padding-left: 30rpx;
				display: flex;
				align-items: center;
				& text:nth-child(1){
					width: 10rpx;
					height: 10rpx;
					background: #3271FF;
					border-radius: 50%;
				}
				& text:nth-child(2){
					padding-left: 8rpx;
					font-size: 25rpx;
					font-weight: bold;
					color: #3271FF;
				}
			}
		}
	}
	
	#main{
		display: flex;
		justify-content: center;
		width: 100%;
		min-height: 650rpx;
	}
	
	.self-lable{
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1000;
		//background-color: #007AFF;
		//opacity: 0.1;
		width: 100%;
		height: 100%;
		& .item{
			position: absolute;
			max-width: 170rpx;
			& view:nth-child(1){
				font-size: 21rpx;
				font-weight: bold;
				color: #333333;
				text-align: center;
			}
			& view:nth-child(2){
				text-align: center;
				& text{
					font-size: 21rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #999999;
					
				}
				& .up{
					color: #1FCD27;
				}
				& .down{
					color: #FF4040;
				}
			}
		}
		& .ysys{
			left: 38%;
			top: 16%;
		}
		& .fc{
			left: 20%;
			top: 24%;
		}
		& .despcb{
			left: 8%;
			top: 38%;
		}
		& .chzzts{
			left: 5%;
			top: 56%;
		}
		& .bzcb{
			left:20%;
			top: 70%;
		}
		& .bc{
			left:45%;
			top: 76%;
		}
		& .ygs{
			left:65%;
			top: 70%;
		}
		& .dwgsxs{
			left:74%;
			top: 56%;
		}
		& .rscb{
			left:78%;
			top: 40%;
		}
		& .lrysdcl{
			left:64%;
			top: 22%;
		}
	}
	
</style>
