<!-- 进度条 -->
<template>
	<view class="process">
		<navigator hover-class="none" :url="item.pageurl ? item.pageurl : ''" v-for="(item,index) in list" :key="index" class="item">
				<text>{{item.name}}</text>
				<view class="process-block">
					<text  class="process-item" :style="{backgroundColor:colors[index],width:(92 * item.percentage)  +'rpx'}"></text>
				</view>
				
				<text>{{item.accounted}}</text>
				<text v-if="!item.money" class="jiantou">
					<image src="../../static/image/arrow-right.jpg"></image>
				</text>
				<text v-if="item.money" class="jine">{{item.money}}</text>
		</navigator>
	</view>
</template>

<script>
	export default {
		name:'my-process',
		props:{
			list:{
				type:[Array],
				default:()=>{
					return [
					]
				}
			},
			
		},
		data(){
			return {
				colors:[
					'#FF5252','#FF7878','#FF8A8A','#FF9363',
					'#FFAF8B','#FFAC69','#DBBBFF','#F3BAFF'
					,'#CFCAFD','#dad7ef'
				]
			}
		},
		methods:{
			close:() => {
				uni.$emit('textModalClose',{})
			}
		}
	}
</script>

<style lang="scss">
	 .process{
		& .item{
			display: flex;
			align-items: center;
			justify-content: flex-start;
			margin-bottom: 43rpx;
			& text:nth-child(1){
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
			& .process-block{
				width: 92rpx;
				& .process-item{
					display: inline-block;
					max-width: 92rpx;
					height: 40rpx;
					margin-left: 22rpx;
				}
			}
			
			
			& text:nth-child(3){
				min-width: 130rpx;
				max-width: 130rpx;
				margin-left: 33rpx;
				font-size: 23rpx;
				font-weight: bold;
				color: #333333;
			}
			
			& .jiantou{
				padding-left: 120rpx;
				font-size: 23rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #333333;
				& image{
					width: 11rpx;
					height: 16rpx;
				}
			}
			& .jine{
				padding-left: 40rpx;
				font-size: 23rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #333333;
			}
		}
		
	}
</style>
