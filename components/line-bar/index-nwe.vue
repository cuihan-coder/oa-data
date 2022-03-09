<!-- 雷达数据图 -->
<template>
	<view class="leidatu">
		<view class="canvas" :id="id"></view>
	</view>
</template>

<script>
	window.wx = undefined
	import * as echarts from 'echarts';
	export default {
		name: 'line-bar',
		props: {
			id: {
				type: String,
				default: ''
			},
			category: {
				type: Array,
				default: () => {
					return []
				}
			},
			//金额最大值
			moneyMax: {
				type: [Number, String],
				default: 0
			},
			//占比最大值
			zbMax: {
				type: [Number, String],
				default: 100
			},
			moneyArr: {
				type: Array,
				default: () => {
					return []
				}
			},
			zbArr: {
				type: Array,
				default: () => {
					return []
				}
			},
			//title
			rightTitle: {
				type: [Number, String],
				default: '占比(%)'
			},

		},
		mounted() {

			var chartDom = document.getElementById(this.id);
			var myChart = echarts.init(chartDom);
			var option;
			let that = this
			option = {
				grid: { // 控制图的大小，调整下面这些值就可以，
					x: 38,
					x2: 36,
					y2: 30 // y2可以控制 X轴跟Zoom控件之间的间隔，避免以为倾斜后造成 label重叠到zoom上
				},
				xAxis: [{
					type: 'category',
					data: this.category,
					nameLocation: 'start',
					axisPointer: {
						type: 'shadow'
					},
					axisLabel: {
						interval: 0,
						show: true,
						textStyle: {
							color: '#333', //更改坐标轴文字颜色
							fontSize: 8 //更改坐标轴文字大小
						}
					},
					axisTick: {
						show: false //坐标轴刻度线
					},
					
					axisLine: { //轴线
						show: false
					},

				}],
				yAxis: [

					{
						type: 'value',
						name: '金额（元）',
						min: 0,
						max: parseInt(this.moneyMax * 1.3) <= 0 ? 10 : parseInt(this.moneyMax * 1.3),
						interval: parseInt((parseInt(this.moneyMax * 1.3) <= 0 ? 10 : parseInt(this.moneyMax *
							1.3)) / 5),
						axisLabel: {
							formatter: function(value, index) {
								return parseInt(value/10000)  + '万';
							}
						},
					},
					{
						type: 'value',
						name: this.rightTitle,
						min: 0,
						max: that.rightTitle == '占比(%)' ? this.zbMax : parseInt(this.zbMax * 1.3),
						interval: that.rightTitle == '占比(%)' ? 20 : parseInt(parseInt(this.zbMax * 1.3) / 5),
						// axisTick: {
						// 	show: false
						// },
						axisLabel: {
							formatter: function(value, index) {
								if(that.rightTitle == '占比(%)'){
									return value
								}else{
									return parseFloat(value/10000).toFixed(1)  + '万';
								}
							}
						},
					}
				],

				series: [{
						name: '金额（万元）',
						type: 'bar',
						yAxisIndex: 0,
						barWidth: 40,
						tooltip: {
							valueFormatter: function(value) {
								return value;
							}
						},
						data: this.moneyArr,
						label: {
							show: true,
							position: 'top',
							formatter: '{c}'
						},
						itemStyle: {
							normal: {
								color: '#FF9626', //改变折线点的颜色
								lineStyle: {
									color: '#FF9626', //改变折线颜色
								}
							}
						}
					},
					{
						name: '占比(%)',
						type: 'line',
						tooltip: {
							valueFormatter: function(value) {
								if(that.rightTitle == '占比(%)'){
									return value + '%'
								}else{
									return value;
								}
							}
						},
						data: this.zbArr,
						label: {
							show: true,
							position: 'top',
							formatter: '{c}'
						},
						itemStyle: {
							normal: {
								color: '#0E9CFF'
							}
						}
					}
				]
			};
			console.log(option)
			option && myChart.setOption(option);

			//添加点击事件
			myChart.on('click', function(params) {
				console.log(params)
				if (params.name == "研发") { //判断点击文字
					alert("aaa")
				}
			})

		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.leidatu {
		background: #FFFFFF;
		border-radius: 20rpx;

		& .lables {
			display: flex;

			& .sz {
				display: flex;
				align-items: center;

				& text:nth-child(1) {
					width: 10rpx;
					height: 10rpx;
					background: #FF632C;
					border-radius: 50%;
				}

				& text:nth-child(2) {
					padding-left: 8rpx;
					font-size: 25rpx;
					font-weight: bold;
					color: #FF632C;
				}
			}

			& .bz {
				padding-left: 30rpx;
				display: flex;
				align-items: center;

				& text:nth-child(1) {
					width: 10rpx;
					height: 10rpx;
					background: #3271FF;
					border-radius: 50%;
				}

				& text:nth-child(2) {
					padding-left: 8rpx;
					font-size: 25rpx;
					font-weight: bold;
					color: #3271FF;
				}
			}
		}
	}

	.canvas {
		display: flex;
		justify-content: center;
		width: 100%;
		min-height: 650rpx;
	}
</style>
