<template>
	<view
		class="card"
		:class="{hover: isHover}"
		:style="{'height': `${height}rpx`}"
		@touchstart="handleCardTouchStart"
	>
		<slot></slot>
	</view>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				default: '标题'
			},
			time: {
				type: String,
				default: '00:00'
			},
			height: {
				type: Number,
				default: 240
			}
		},
		data() {
			return {
				isHover: false,
				value: 0,
				rangeArr: [0, 1, 2, 3]
			}
		},
		methods: {
			// 控制卡片点击特效
			handleCardTouchStart() {
				if(this.isHover) {
					return
				}
				this.isHover = true
				setTimeout(() => {
					this.isHover = false
				}, 1000)
			}
		}
	}
</script>

<style lang="scss">
	.card {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		border-radius: 15rpx;
		background-color: rgba(212,197,197,0.15);
		color: #fff;
		font-weight: bolder;
		&.hover {
			transform: scale(1.05);
			background: rgba(212,197,197,0.3);
		}
	}
</style>
