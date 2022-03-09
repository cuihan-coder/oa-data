<!-- 选择器 -->
<template>
	<u-picker :show="show" ref="uPicker" @cancel="close" keyName="label" :columns="columns" @confirm="confirm" ></u-picker>
</template>

<script>
	export default {
		name: 'self-pickers',
		props: {
			show: {
				type: Boolean,
				default: false
			},
			columns: {
				type: [Object, Array],
				default: () => {
					return [
						[{
							label: '杭州事业部',
							id: 1
						}, {
							label: '上海事业部',
							id: 2
						},
						{
							label: '湖州事业部',
							id: 3
						}]
					]
				}
			},

		},
		data() {
			return {
				
			}
		},
		computed:{
			_columns(){
				return this.$store.state.other.sybsList
			}
		},
		watch:{
			_columns(newVal){
				this.columns = newVal
				console.log(this.columns)
				if(this.$store.state.other.company.length == 0){
					this.$store.commit('other/SET_COMPANY',this.columns[0][0])
				}
			}
		},
		mounted() {
			// if(this.$store.state.other.company.label == undefined){
			// 	this.$store.commit('other/SET_COMPANY',this.columns[0][0])
			// }
		},
		methods: {
			close: () => {
				console.log('关闭进来了')
				uni.$emit('closePickers', {})
				
			},
			confirm(e) {
				console.log('确认进来了')
				uni.$emit('closePickers', {})
				this.$store.commit('other/SET_COMPANY',this.columns[0][e.indexs[0]])
			},
		}
	}
</script>

<style lang="scss">
	.process {
		& .item {
			display: flex;
			align-items: center;
			justify-content: flex-start;
			margin-bottom: 43rpx;

			& text:nth-child(1) {
				width: 40%;
				flex-shrink: 0;
				text-overflow: ellipsis;
				overflow: hidden;
				white-space: nowrap;

				font-size: 23rpx;
				font-weight: bold;
				color: #333333;
				text-align: right;
			}

			& .process-block {
				width: 92rpx;

				& .process-item {
					display: inline-block;
					max-width: 92rpx;
					height: 40rpx;
					margin-left: 22rpx;
				}
			}


			& text:nth-child(3) {
				min-width: 80rpx;
				max-width: 80rpx;
				margin-left: 33rpx;
				font-size: 23rpx;
				font-weight: bold;
				color: #333333;
			}

			& .jiantou {
				padding-left: 160rpx;
				font-size: 23rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #333333;

				& image {
					width: 11rpx;
					height: 16rpx;
				}
			}

			& .jine {
				padding-left: 40rpx;
				font-size: 23rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #333333;
			}
		}

	}
</style>
