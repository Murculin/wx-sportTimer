<template>
	<view @click="handleClick" :class="{'disable': disable}" class="circle_button">
		<i class="iconfont" :class="iconClass"></i>
	</view>
</template>

<script>
	export default {
		props: {
			iconClass: {
				type: String,
				default: 'icon-play'
			},
			disable: {
				type: Boolean,
				default: false
			}
		},
		methods: {
			handleClick() {
				if(this.disable) {
					return
				}
				// 震动功能
				uni.vibrateShort({
					success: function () {
							console.log('success');
					}
				})
				this.$emit('click')
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
		opacity: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.3s;
		&.disable {
			opacity: 0.15;
			transform: rotate(-90deg);
		}
		.iconfont {
			font-size: 80rpx;
		}
	}
</style>
