<!-- 雷达数据图 -->
<template>
	<view class="kanban" v-if="show" id="kanban">
		<!-- <text class="one-0">定额食品成本</text>
		<text class="one-1">存货周转天数</text>
		<text class="one-2">员工餐</text>
		<text class="one-3">利润预算达成率</text>
		<text class="one-4">报损</text>
		<text class="one-5">人事成本</text>
		<text class="one-6">营收预算达成率</text>
		<text class="one-7">分差</text>
		<text class="one-8">SMH</text>
		<text class="one-9">预期账款</text>
		<text class="one-10">违规事件</text>
		<text class="one-11">自平台</text>
		<text class="one-12">大客户</text> -->

	</view>
</template>

<script>
	import * as echarts from 'echarts';
	import 'echarts-wordcloud';
	export default {
		name: 'kanban',
		props: {
			show: {
				type: Boolean,
				default: false
			},
			kanbans: {
				type: Array,
				default: () => {
					return []
				}
			}
		},
		watch: {
			_kanbans: {
				handler: function(newVal) {
					var chart = echarts.init(document.getElementById('kanban'));
					console.log(this.value)
					var option = {
						tooltip: {
							show: false
						},
						series: [{
							type: 'wordCloud',
							gridSize: 3,
							sizeRange: [12, 34],
							rotationRange: [0, 100],
							shape: 'pentagon',
							left: 'center',
							top: 'center',
							right: null,
							bottom: null,
							width: '100%',
							height: '100%',
							drawOutOfBound: false,
							textStyle: {
								color: function() {
									return 'rgb(' + [
										Math.round(Math.random() * 160),
										Math.round(Math.random() * 160),
										Math.round(Math.random() * 160)
									].join(',') + ')';
								},

							},
							emphasis: {
								textStyle: {
									shadowBlur: 10,
									shadowColor: '#fff'
								}
							},
							data: newVal
						}]
					};

					chart.setOption(option);
				}

			}
		},
		computed: {
			_kanbans() {
				return this.kanbans
			}
		},
		mounted() {

		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.kanban {
		padding: 0rpx;
		background: #FFFFFF;
		border: 3rpx solid #f8f8f8;
		border-radius: 10rpx;
		height: 400rpx;
		position: relative;

		& .one-0 {
			position: absolute;
			left: 188rpx;
			min-height: 200rpx;
			font-size: 29rpx;
			font-weight: bold;
			color: #4CFF6E;
			writing-mode: vertical-lr;
			text-align: center;

		}

		& .one-1 {
			position: absolute;
			left: 258rpx;
			min-height: 200rpx;
			font-size: 26rpx;
			font-weight: bold;
			color: #78A2FF;
			writing-mode: vertical-lr;
			text-align: center;
		}

		& .one-2 {
			position: absolute;
			left: 308rpx;
			top: 100rpx;
			min-height: 200rpx;
			font-size: 29rpx;
			font-weight: bold;
			color: #20F1E0;
			//writing-mode: vertical-lr
		}

		& .one-3 {
			position: absolute;
			left: 348rpx;
			font-size: 29rpx;
			font-weight: bold;
			color: #FFE032;
		}

		& .one-4 {
			position: absolute;
			left: 308rpx;
			top: 190rpx;
			font-size: 49rpx;
			font-weight: bold;

			color: #FF5D31;
		}

		& .one-5 {
			position: absolute;
			left: 180rpx;
			top: 250rpx;
			font-size: 40rpx;
			font-weight: bold;
			color: #EAA0FF;
			//writing-mode: vertical-lr
		}

		& .one-6 {
			position: absolute;
			left: 190rpx;
			top: 320rpx;
			font-size: 29rpx;
			font-weight: bold;
			color: #3FC2FF;
		}

		& .one-7 {
			position: absolute;
			right: 70rpx;
			top: 300rpx;
			font-size: 29rpx;
			font-weight: bold;
			color: #FF4747;
			writing-mode: vertical-lr
		}

		& .one-8 {
			position: absolute;
			right: 100rpx;
			top: 200rpx;
			font-size: 29rpx;
			font-weight: bold;
			color: #f98fbb;
			writing-mode: vertical-lr
		}

		& .one-9 {
			position: absolute;
			right: 120rpx;
			top: 150rpx;
			font-size: 29rpx;
			font-weight: bold;
			color: #56f2d9;
		}

		& .one-10 {
			position: absolute;
			left: 50rpx;
			top: 40rpx;
			font-size: 29rpx;
			font-weight: bold;
			color: #aff246;
		}

		& .one-11 {
			position: absolute;
			left: 70rpx;
			top: 120rpx;
			font-size: 29rpx;
			font-weight: bold;
			color: #00f800;
		}

		& .one-12 {
			position: absolute;
			left: 60rpx;
			top: 180rpx;
			font-size: 29rpx;
			font-weight: bold;
			color: #c19cf1;
		}

	}
</style>
