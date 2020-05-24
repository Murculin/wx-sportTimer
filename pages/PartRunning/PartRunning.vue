<template>
	<view class="page part_running">
		<view v-if="!finish" class="content">
			<!-- 进度条 -->
			<view 
				class="progress"
				:style="{background:`linear-gradient(to bottom, rgba(0, 0, 0, 0) ${percent}%, rgba(255, 255, 255, 0.1) ${percent}%)`}"
			>	
			</view>
			<!-- 标题部分 -->
			<view class="text">
				<view v-if="status==='prepare'" class="preTitle">准备</view>
				<view v-if="status==='work'" class="workTitle">运动{{currentCount}}\{{timeInfo.count}}</view>
				<view v-if="status==='rest'" class="restTitle">休息{{currentCount}}\{{timeInfo.count}}</view>
			</view>
			<!-- 时间部分 -->
			<view :class="[`${status}-active`]" class="time">
				<view class="preTime">
					{{preTimeSec}}
				</view>
				<view class="workTime">
					{{workTimeSec | formatTime}}
				</view>
				<view class="restTime">
					{{restTimeSec | formatTime}}
				</view>
			</view>
			<!-- 底部 -->
			<view class="bottom_box">
				<text class="total_time">{{totalTimeSec | formatTime}}</text>
				<view class="icon_wrap">
					<CircleButton
						class="btn_stop"
						iconClass="icon-stop"
						:class="{'show': pauseTime}"
						@click="handleClickStop"
					></CircleButton>
					<CircleButton
						@click="togglePlay"
						class="btn_pause"
						:iconClass="toggleIcon"
						:class="{'pause': pauseTime}"
					></CircleButton>
				</view>
			</view>
		</view>
		<!-- 结束时显示 -->
		<view v-show="finish" class="finish">
			<text :class="{show: finish}" class="finish_title">完成</text>
			<navigator :class="{show: finish}" class="finish_btn" url="../index/index">
				<i class="iconfont icon-stop"></i>
			</navigator>
		</view>
	</view>
</template>

<script>
	import CircleButton from '../../components/CircleButton.vue'
	import {delay, setAudio, throttle} from '../../utils/utils.js'
	const STATUS = {
	  prepare: 'prepare',
	  work: 'work',
	  rest: 'rest'
	}
	export default {
		data() {
			return {
				STATUS,
				status: STATUS.prepare, // 状态
				timeInfo: {}, // 每阶段信息
				percent: 0, // 当前阶段进行到%
				startTime: 0, // 计时开始的时间 ms
				// 各阶段剩余时间
				currentCount: 0,
				workTimeSec: 0,
				restTimeSec: 0,
				preTimeSec: 4,
				// 剩余总时间
				totalTimeSec: 0,
				// 暂停时间
				pauseTime: null,
				// 是否完成计时
				finish: false
			}
		},
		computed: {
			toggleIcon() {
				return this.pauseTime ? 'icon-play' : 'icon-pause'
			}
		},
		watch: {
			preTimeSec(newVal) {
				if([3, 2, 1].includes(newVal)) {
					setAudio('ding.mp3')
				} else if(newVal === 0) {
					setAudio('dong.mp3')
				}
			},
			restTimeSec(newVal) {
				if([3, 2, 1].includes(newVal)) {
					setAudio('ding.mp3')
				} else if(newVal === 0) {
					setAudio('dong.mp3')
				}
			},
			workTimeSec(newVal) {
				if(newVal === 0) {
					setAudio('rest.mp3')
				}
			}
		},
		onShow() {
			this.timeInfo = uni.getStorageSync('timeInfo')
			this.workTimeSec = this.timeInfo.workTime
			this.restTimeSec = this.timeInfo.restTime
			this.timeInfo.totalTime = this.timeInfo.workTime * this.timeInfo.count + this.timeInfo.restTime * (this.timeInfo.count - 1)
			this.timeInfo.countTime = this.timeInfo.workTime + this.timeInfo.restTime
		},
		mounted() {
			this.startTime = Date.now()
			this.startCount()
		},
		methods: {
			async startCount() {
				if(this.pauseTime || this.finish) return
				await delay(15)
				this.updateCount()
				this.startCount()
			},
			updateCount() {
				const {workTime, restTime, count, totalTime, countTime} = this.timeInfo
				// 计算经过的时间 s
				const now = Date.now()
				const disMs = now - this.startTime
				const disSec = Math.floor(disMs/1000)
				// 根据开始的时间判断状态
				const PRETIME = 3
				if(disSec < PRETIME) {
					// 准备阶段
					// 准备阶段剩余的时间 s
					const remainPreSec = PRETIME - disSec
					this.preTimeSec = remainPreSec
					// 剩余时间占总时间的百分比
					this.percent = (disMs / (PRETIME * 1000)) * 100
					this.status = STATUS.prepare
				} else {
					// 运行阶段
					// 总剩余时间
					this.totalTimeSec = totalTime - disSec + PRETIME
					this.preTimeSec = 0
					// 运行阶段经历的时间 s
					const startSec = disSec - PRETIME
					const startMs = disMs - PRETIME * 1000
					this.currentCount = Math.floor(startSec / countTime) + 1
					// 当前count经过时间
					const countSec = startSec % countTime
					const countMs = startMs % (countTime * 1000)
					if(countSec < workTime) {
						// 运动阶段
						this.restTimeSec = 0
						const workTimeMs = workTime * 1000 - countMs
						this.workTimeSec = Math.floor(workTimeMs / 1000) + 1
						this.percent = (workTimeMs / (workTime * 1000)) * 100
						this.status = STATUS.work
					} else if(this.currentCount >= count) {
							// 结束
							this.workTimeSec = -1
							this.percent = 0
							this.finish = true
							setAudio('success.mp3')
							return	
					} else {
						console.log('rest')
						this.status = STATUS.rest
						this.workTimeSec = 0
						const restTimeMs = restTime * 1000 - (countMs - workTime * 1000)
						this.restTimeSec = Math.floor(restTimeMs / 1000) + 1
						this.percent = 100 - (restTimeMs / (restTime * 1000)) * 100
					}
				}
				
			},
			// 切换暂停开始
			togglePlay() {
				if(!this.pauseTime) {
					this.pauseTime = Date.now()
				} else {
					this.startTime += (Date.now() - this.pauseTime)
					this.pauseTime = null
					this.startCount()
				}
			},
			// 结束返回时间设置页
			handleClickStop() {
				uni.redirectTo({
					url: '../index/index'
				})
			}
		},
		components: {
			CircleButton
		}
	}
</script>

<style lang="scss">
.part_running {
	position: relative;
	width: 100vw;
	height: 100vh;
	.content {
		position: absolute;
		width: 100vw;
		height: 100vh;
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
		.text {
			color: rgba(255,255,255,0.7);
			text-align: center;
			font-size: 30px;
			font-family: BebasNeue-Regular;
			font-weight: lighter;
			margin-top: 280rpx;
		}
		.time {
			transition: all 0.5s;
			font-family: BebasNeue-Regular;
			font-weight: lighter;
			.workTime,
			.restTime,
			.preTime {
				transform: scale(0.3);
				transition: all 0.5s;
				opacity: 0;
				z-index: 1;
				text-align: center;
				line-height: 0.75;
				font-size: 200rpx;
			}
			&.prepare-active {
				transform: translateY(33%);
				.preTime {
					transform: scale(1);
					opacity: 1;
				}
			}
			&.work-active {
				transform: translateY(0%);
				.workTime {
					transform: scale(1);
					opacity: 1;
				}
			}
			&.rest-active {
				transform: translateY(-33%);
				.restTime {
					transform: scale(1);
					opacity: 1;
				}
			}
		}
		.bottom_box {
			display: flex;
			position: absolute;
			bottom: 0;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			z-index: 1;
			padding-bottom: 20px;
			width: 100%;
			.total_time {
				padding: 20px;
				font-size: 40rpx;
				font-family: BebasNeue-Regular;
				font-weight: 100;
			}
			.icon_wrap {
				display: flex;
				.btn_stop {
					transition: all 0.3s;
					visibility: hidden;
					opacity: 0;
					transform: translateX(50%);
					&.show {
						visibility: initial;
						opacity: 1;
						transform: translateX(-50%) rotate(-90deg);
					}
				}
				.btn_pause {
					transition: all 0.3s;
					transform: translateX(-50%);
					&.pause {
						transform: translateX(50%) rotate(120deg);
					}
				}
			}
		}
	}
	.finish {
		position: absolute;
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		.finish_title {
			font-size: 70rpx;
			margin-bottom: 50rpx;
			transition: all 0.5s;
			transform: translateY(-400rpx);
			opacity: 0;
			&.show {
				transform: translateY(0);
				opacity: 1;
			}
		}
		.finish_btn {
			border-radius: 50%;
			width: 200rpx;
			height: 200rpx;
			background-color: rgba(212,197,197,0.45);
			display: flex;
			align-items: center;
			justify-content: center;
			transition: all 0.5s;
			transform: translateY(400rpx);
			opacity: 0;
			&.show {
				transform: translateY(0);
				opacity: 1;
			}
			.iconfont {
				font-size: 140rpx;
			}
		}
	}
}
</style>
