<!-- 倒计时 -->
<template>
	<u-count-down  :time="times * 1000" :format="format" @change="onChange">
		<view class="times">
			<text  :style="style">{{before}}</text>
			<text  :style="style">{{ timeData.hours >10 ? timeData.hours:'0'+timeData.hours}}:</text>
			<text  :style="style">{{ timeData.minutes >10 ? timeData.minutes:'0'+timeData.minutes }}:</text>
			<text  :style="style">{{ timeData.seconds >10 ? timeData.seconds:'0'+timeData.seconds }}</text>
			<text  :style="style">{{after}}</text>
		</view>
	</u-count-down>
</template>

<script>
	export default {
		name: 'countdown',
		props: {
			times: {
				type: [String, Number],
				default: 0
			},
			before: {
				type: [String, Number],
				default: ''
			},
			after: {
				type: [String, Number],
				default: ''
			},
			format: {
				type: String,
				default: 'HH:mm:ss'
			},
			style: {
				type: Object,
				default: () => {
					return {}
				}
			}


		},
		data() {
			return {
				timeData: {},
			}
		},
		methods: {
			onChange(e) {
				console.log(e)
				this.timeData = e
			}
		}
	}
</script>

<style lang="scss">
	.times{
		display: flex;
		align-items: center;
	}
</style>
