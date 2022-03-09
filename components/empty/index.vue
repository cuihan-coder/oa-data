<!-- 领券选择商品界面 -->
<template>
	<view class="empty" v-if="show">
		<image src="../../static/image/qs_wnr@2x.png"></image>
		<view class="title">暂无内容</view>
	</view>
</template>

<script>
	export default {
		name:'empty',
		props:{
			show:{
				type:Boolean,
				default:false
			}
		},
		methods:{
			close:() => {
				console.log(1111)
				uni.$emit('textModalClose',{})
			}
		}
	}
</script>

<style lang="scss">
	 .empty{
		text-align: center;
		margin-top: 200rpx;
		& image{
			width: 300rpx;
			height: 246rpx;
		}
		& .title{
			font-size: 26rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #999999;
		}
	}
</style>
