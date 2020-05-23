<template>
	<view class="circle_button">
		<i class="iconfont" :class="iconClass"></i>
	</view>
</template>

<script>
	export default {
		props: {
			iconClass: {
				type: String,
				default: '.icon-play'
			}
		}
	}
</script>

<style lang="scss">
	.circle_button {
		border-radius: 50%;
		width: 130rpx;
		height: 130rpx;
		background-color: rgba(212,197,197,0.45);
		display: flex;
		align-items: center;
		justify-content: center;
		.iconfont {
			font-size: 80rpx;
		}
	}
</style>
