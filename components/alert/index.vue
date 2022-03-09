<!-- 公告提示 -->
<template>
	<view class="empty" v-if="show">
		<u-alert 
		:title="title" 
		type = "success" 
		effect="light"
		:description = "description"
		closable="true"
		center="true"
		></u-alert>
	</view>
</template>

<script>
	export default {
		name:'alert',
		props:{
			show:{
				type:Boolean,
				default:false
			},
			title:{
				type:String,
				default:''
			},
			description:{
				type:String,
				default:''
			}
		},
		methods:{
			
		}
	}
</script>

<style lang="scss">
	.empty{
		z-index: 1000;
		width: 96%;
		position: fixed;
		left: 2%;
		top: 20rpx;
	}
</style>
