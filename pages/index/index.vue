<template>
	<view class="index page">
		<view class="top_btn" @click="toggleMode">
			连续计时
		</view>
		<view class="content">
			<MPicker
				class="index_card"
				title="次数"
				:rangeArr="countRange"
				@change="countChange"
				:value="countRange[count-1]"
			></MPicker>
			<MPicker
				class="index_card"
				title="运动"
				:rangeArr="timeRange"
				mode="multiSelector"
				@change="workTimeChange"
				:value="workTime | formatTime"
			></MPicker>
			<MPicker
				class="index_card"
				title="休息"
				:rangeArr="timeRange"
				mode="multiSelector"
				@change="restTimeChange"
				:value="restTime | formatTime"
			></MPicker>
		</view>
		<view class="bottomBox">
			<text class="total_time">共{{totalTime | formatTime}}</text>
			<CircleButton :disable="disable" @click="handleClickStart"></CircleButton>
		</view>
	</view>
</template>

<script>
	import CircleButton from '../../components/CircleButton.vue'
	import MPicker from '../../components/MPicker.vue'
	export default {
		data() {
			const genList = count =>
				[...Array(count)].map((item, index) => index.toString().padStart(2, 0))
			const timeRange = genList(60)
			const countRange = genList(100).slice(1)
			console.log('data')
			return {
				countRange, // 控制次数 01-100
				timeRange: [timeRange, timeRange], // 控制时间 两个00-60的二维数组
				count: 3,
				workTime: 30,
				restTime: 10
			}
		},
		computed:{
			totalTime() {
				const totalTime = this.workTime * this.count + this.restTime * (this.count - 1)
				return totalTime
			},
			disable() {
				return this.workTime && this.restTime ? false : true
			}
		},
		onShow() {
			const timeInfo = uni.getStorageSync('timeInfo')
			if(timeInfo) {
				this.count = timeInfo.count
				this.workTime = timeInfo.workTime
				this.workTime = timeInfo.workTime
			}
		},
		methods: {
			// 点击开始跳转到计时页面
			handleClickStart() {
				this.saveTimeInfo()
				uni.redirectTo({
				  url: '../PartRunning/PartRunning'
				})
			},
			// 切换计时模式
			toggleMode() {
				uni.redirectTo({
				  url: '../SerialRunning/SerialRunning'
				})
			},
			// 次数改变
			countChange(val) { 
				this.count = parseInt(val) + 1
				this.saveTimeInfo()
			},
			// 运动时间改变
			workTimeChange(val) {
				const min = parseInt(val[0])
				const sec = parseInt(val[1])
				this.workTime = min * 60 + sec
				this.saveTimeInfo()
			},
			// 休息时间改变
			restTimeChange(val) {
				const min = parseInt(val[0])
				const sec = parseInt(val[1])
				this.restTime = min * 60 + sec
				this.saveTimeInfo()
			},
			saveTimeInfo() {
				const that = this
				uni.setStorageSync('timeInfo', {
					restTime: that.restTime,
					workTime: that.workTime,
					count: that.count,
					totalTime: that.totalTime
				})
			}
		},
		components:{
			CircleButton,
			MPicker
		}
	}
</script>

<style lang="scss">
	.index {
		position: relative;
		display: flex;
		height: 100%;
		width: 100%;
		.top_btn {
			position: absolute;
			width: 200rpx;
			height: 70rpx;
			border-radius: 70rpx;
			top: 5vh;
			left: 40rpx;
			background-color: rgba(0,0,0,0.15);
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.content {
			flex: 1;
			padding: 10vh 40rpx 0;
			display: flex;
			flex-direction: column;
			align-items: center;
			.index_card {
				flex: 1;
				width: 100%;
				margin: 24rpx 40rpx;
			}
		}
		.title {
		  font-size: 32rpx;
		  color: #eee;
		  font-weight: lighter;
		}
		.time {
			font-size: 80rpx;
			font-family: BebasNeue-Regular;
			font-weight: lighter;
			margin-top: 15rpx;
		}
		.bottomBox {
			padding-bottom: 40rpx;
			margin-top: 20rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			.total_time {
				margin-bottom: 20rpx;
				font-size: 32rpx;
			}
		}
	}
</style>
