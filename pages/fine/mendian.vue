<template>
	<view>
		<view class="contain">
			<u-navbar title="精细化管理" leftText="返回" :fixed="true" @rightClick="rightClick" @leftClick="leftClick">
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
					<view class="shop-name">{{dfList[0] ? dfList[0].posname : ''}}</view>
					<view class="pinf">
						<text>{{dfList[0] ? dfList[0].socre : ''}}分</text>
						<u-rate active-color="#FF6600" size="10" gutter="1" count="5" :value="dfList[0] ? dfList[0]['socre'] / 20 : 1" ></u-rate>
						<text>不满意</text>
					</view>
					<view class="paiming">门店排名：NO.{{dfList[0] ?dfList[0].pm : ''}}</view>
					<view class="mds">低于{{dfList[0] ? dfList[0].pm - 1: ''}}个门店</view>
				</view>
				
				<!-- 对比维度 -->
				<view class="dbwd-title">
					<view class="left">对比维度</view>
					<view class="select" @click="lxpickerShow = !lxpickerShow">
						<text>{{this.columns[0][typeIndex].label}}</text>
						<image src="../../static/image/arrow-down.png"></image>
					</view>
				</view>
				<leidatu
				:show="true"
				:bz="ledaData_bz"
				:sz="ledaData_sz"
				:max="ledaData_max"
				:is_skip="false"
				></leidatu>
				
				<!-- 精细化方向看板 -->
				<view class="jxh-kb">
					<view class="title">
						<image src="../../static/image/circle.png"></image>
						<text>精细化方向看板</text>
					</view>
					<kanban :kanbans="kanbans" :show="true"></kanban>
				</view>
				
				<view @click="goback()" class="btn">查看所有门店</view>
			</view>
		</view>
		<!-- 选择器 -->
		<pickers :show="pickersShow" :columns="$store.state.other.sybsList"></pickers>
		<!-- 门店类型比较 -->
		<u-picker :show="lxpickerShow" ref="uPicker" @cancel="lxpickerShow = false" keyName="label" :columns="columns" @confirm="checkduibi"></u-picker>
	</view>
</template>

<script>
  import leidatu from "@/components/leida/index.vue"
  import kanban from "@/components/kanban/index.vue"
  import pickers from '@/components/picker/index.vue'
	export default {
		components:{
			leidatu,
			kanban,
			pickers
		},
		data() {
			return {
				pickersShow: false,
				lxpickerShow:false,
				typeIndex:0,
				KbList:[],
				//雷达上周
				ledaData_sz:[],
				//雷达本周
				ledaData_bz:[],
				//雷达最大值
				ledaData_max:0,
				//看板数据处理
				kanbans:[],
				dfList:[],
				columns:[
						[{
							label: '上周和前周比',
							id: 1
						}, {
							label: '与同营业额比',
							id: 2
						},
						{
							label: '与同外卖比例比',
							id: 3
						},{
							label: '与同类型商圈比',
							id: 3
						}]
					],
				poscode:''
			};
		},
		computed:{
			companys(){
				return this.$store.state.other.company
			}
		},
		watch:{
			companys(){
				this.getData(this.typeIndex)
			},
			typeIndex(newval){
				this.getData(newval)
			}
			
		},
		async onLoad(option) {
			this.poscode = option.poscode
			this.getData(this.typeIndex)
			uni.$on('closePickers', () => {
				this.pickersShow = false
			})
		},
		
		methods: {
			//切换对比
			checkduibi(e){
				this.typeIndex = e.indexs[0]
				this.lxpickerShow = false
			},
			getData(typeIndex){
				let api = ''
				// 本周与上周对比 todo
				if(typeIndex == 0){
					api = this.$api.getMdldData_post
				}
				//本周与同营业额得分
				if(typeIndex == 1 ){
					api = this.$api.getMdYyeData_post
				}
				//本周与同外卖占比得分
				if(typeIndex == 2 ){
					api = this.$api.getMdTwmData_post
				}
				//本周与同类商圈占比得分
				if(typeIndex == 3 ){
					api = this.$api.getMdTlsData_post
				}
				
				//获取到事业部信息后 开始获取 获取首页数据
				this.$helper.httpPost(api,{
					empcode:this.$store.state.other.company.empcode,
					mobile:this.$store.state.other.company.mobile,
					syb: this.$store.state.other.company.depart,
					nyz: this.getYearMonthWeek(),
					poscode:this.poscode
					
				}).then(res => {
					this.dfList  = res.data.dfList
					this.KbList = this.kanbans = res.data.ldList
					let _KbList = []
					let _ledaData_max = 0
					this.KbList.forEach((item,index) => {
						//获取最大值逻辑
						if(_ledaData_max < item.df || _ledaData_max < item.szdf){
							_ledaData_max = item.szdf > item.df ? item.szdf : item.df
						}
					})
					this.ledaData_max = _ledaData_max
					
					let kb = this.KbList
					this.ledaData_bz = [kb[3]['df'],kb[8]['df'],kb[6]['df'],kb[4]['df'],kb[0]['df'],kb[9]['df'],kb[5]['df'],kb[7]['df'],kb[2]['df'],kb[1]['df']]
					this.ledaData_sz = [kb[3]['szdf'],kb[8]['szdf'],kb[6]['szdf'],kb[4]['szdf'],kb[0]['szdf'],kb[9]['szdf'],kb[5]['szdf'],kb[7]['szdf'],kb[2]['szdf'],kb[1]['szdf']]
				   //使用方法
				    let kanban = this.kanbans 
					   
					kanban.sort( this.compare( "df"));
					 let xs =  [100000000,100000000,500000,500000,500000,2000,2000,2000,100,100,100,1,1,1]
					 kanban.forEach((item,index) => {
						 console.log(item.name)
						 kanban[index].value = (item.df > 0 ? item.df : 1) * xs[index] 
					 })
					 
					this.kanbans  = kanban
					
					
					let id =  setInterval(() => {
						clearInterval(id)
						uni.$emit('leidaemit')
					},200)	
				})
			},
			compare( propertyName) {
			     return  function( object1,  object2) {
			       var value1  = object1[propertyName];
			       var value2  = object2[propertyName];
			       if (value2  < value1) {
			         return  1;
			      }  else  if (value2  > value1) {
			         return  - 1;
			      }  else {
			         return  0;
			      }
			    }
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
				max-height: 250rpx;
				min-height: 250rpx;
				padding: 39rpx 0 31rpx 40rpx;
				background: url(../../static/image/gl_bg@2x.png) no-repeat;
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
					max-width: 350rpx;
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
					margin-top: 30rpx;
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
