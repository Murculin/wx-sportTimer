<template>
	<view class="serial">
		<view class="top_btn" @click="toggleMode">
			间隔计时
		</view>
		<view class="record">
			最好成绩: 00:00
		</view>
		<view class="time">00:00</view>
		<view class="btn_wrap">
			<CircleButton
				class="btn_play"
				iconClass="icon-play"
			></CircleButton>
		</view>
	</view>
</template>

<script>
	import CircleButton from '../../components/CircleButton.vue'
	export default {
		data() {
			return {
				
			};
		},
		methods: {
			// 切换计时模式
			toggleMode() {
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
.serial {
	position: relative;
	width: 100vw;
	height: 100vh;
	background-image: linear-gradient(to top, rgb(103, 58, 183), rgb(81, 45, 168));
	display: flex;
	flex-direction: column;
	align-items: center;
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
		font-size: 60rpx;
		margin-top: 150rpx;
	}
	.time {
		font-family: BebasNeue-Regular;
		font-weight: lighter;
		text-align: center;
		line-height: 0.75;
		font-size: 200rpx;
		margin-top: 300rpx;
	}
}
</style>
