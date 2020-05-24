<template>
	<view class="serial">
		<!-- 进度条 -->
		<view 
			class="progress"
			:style="{background:`linear-gradient(to bottom, rgba(0, 0, 0, 0) ${percent}%, rgba(255, 255, 255, 0.1) ${percent}%)`}"
		>	
		</view>
		<view
			v-if="!play"
			class="top_btn"
			@click="toggleMode"
		>
			<text>间隔计时</text>
		</view>
		<view class="record">
			<text class="finish_title" :class="{hide:!finish}">本次的成绩为</text>
		</view>
		<view class="time">{{timeSec | formatTime}}</view>
		<view class="btn_wrap">
			<CircleButton
				class="btn_play"
				:iconClass="toggleIcon"
				@click="togglePlay"
			></CircleButton>
		</view>
	</view>
</template>

<script>
	import {delay} from '../../utils/utils.js'
	import CircleButton from '../../components/CircleButton.vue'
	// 进度条一个周期的时间
	const COUNT_TIME = 20000
	export default {
		data() {
			return {
				play: false,
				finish: false,
				best: 0,
				timer: null,
				timeSec: 0,
				startTime: 0,
				percent: 0
			};
		},
		computed: {
			toggleIcon() {
				return this.play ? 'icon-stop' : 'icon-play'
			}
		},
		onShow() {
			const best = uni.getStorageSync('best')
			if(best) {
				this.best = best
			}
		},
		methods: {
			// 切换计时模式
			toggleMode() {
				if(this.playing) {
					return
				}
				uni.redirectTo({
				  url: '../index/index'
				})
			},
			// 开始/停止按钮
			togglePlay() {
				if(this.play) {
					this.finish = true
					this.play = false
				} else {
					this.play = true
					this.finish = false
					this.startTime = Date.now()
					this.startCount()
				}
			},
			// 开始计时
			async startCount() {
				if(this.finish || !this.play) return
				await delay(15)
				this.updateCount()
				this.startCount()
			},
			updateCount() {
				const disMs = Date.now() - this.startTime
				const disSec = Math.floor(disMs / 1000)
				this.timeSec = disSec
				const countMs = disMs % COUNT_TIME
				if(countMs < COUNT_TIME/2) {
					this.percent = (countMs / (COUNT_TIME/2)) * 100
				} else {
					this.percent = 100 - ((countMs - (COUNT_TIME/2)) / (COUNT_TIME/2)) * 100
				}
			}
		},
		components: {
			CircleButton
		}
	}
</script>

<style lang="scss">
.serial {
	position: relative;
	width: 100vw;
	height: 100vh;
	background-image: linear-gradient(to top, rgb(103, 58, 183), rgb(81, 45, 168));
	display: flex;
	flex-direction: column;
	align-items: center;
	.progress {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		transition-timing-function: linear;
	}
	.top_btn {
		position: absolute;
		width: 200rpx;
		height: 70rpx;
		border-radius: 70rpx;
		top: 50rpx;
		left: 40rpx;
		background-color: rgba(0,0,0,0.15);
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.record {
		position: absolute;
		top: 180rpx;
		font-size: 60rpx;
		width: 100vw;
		display: flex;
		flex-direction: column;
		align-items: center;
		.finish_title {
			transition: all 0.4s;
			opacity: 1;
			&.hide {
				opacity: 0;
			}
		}
	}
	.time {
		font-family: BebasNeue-Regular;
		font-weight: lighter;
		text-align: center;
		line-height: 0.75;
		font-size: 200rpx;
		margin-top: 550rpx;
	}
	.btn_wrap {
		position: absolute;
		bottom: 200rpx;
	}
}
</style>
