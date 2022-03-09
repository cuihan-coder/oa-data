<!-- 左右数据组件 -->
<template>
	<view class="flex-data">
		<view class="item right-line">
			<view>{{itemName[0]}}</view>
			<view :style="leftStyle"> {{itemValue[0]}} </view>
		</view>
		<view class="item">
			<view>{{itemName[1]}}</view>
			<view :style="rightStyle">{{itemValue[1]}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:'kanban',
		props:{
			show:{
				type:Boolean,
				default:false
			},
			itemName:{
				type:Array,
				default:() => {
					return []
				}
			},
			itemValue:{
				type:Array,
				default:() => {
					return []
				}
			},
			
			leftStyle:{
				type:Object,
				default:()=>{
					return {
						fontSize:'25rpx',
						color: '#666666'
					}
				}
			},
			rightStyle:{
				type:Object,
				default:()=>{
					return {
						fontSize:'25rpx',
						color: '#666666'
					}
				}
			}
			
		},
		mounted() {
			

		},
		methods:{
			
		}
	}
</script>

<style lang="scss">
	.flex-data{
		display: flex;
		align-items: center;
		justify-content: center;
		height: 180rpx;
		background: #FFFFFF;
		border-radius: 20rpx;
		
		& .item{
			width: 50%;
			text-align: center;
			& view:nth-child(1){
				font-size: 23rpx;
				font-weight: bold;
				color: #666666;
			}
			& view:nth-child(2){
				padding-top: 20rpx;
				font-weight: bold;
				
			}
		}
		
		& .right-line{
			border-right: solid 1rpx #EFEFEF;
		}
	}
	
</style>
