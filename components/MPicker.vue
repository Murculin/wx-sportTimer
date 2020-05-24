<template>
	<picker
		class="card"
		:range="rangeArr"
		:value="value"
		@change="handleChange"
		:mode="mode"
	>
		<view class="content_box" :class="{hover: isHover}" @touchstart="handleCardTouchStart">
			<view class="title">{{title}}</view>
			<view class="time">{{value}}</view>
		</view>
	</picker>
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
			rangeArr: {
				type: Array,
				default: () => []
			},
			mode: {
				type: String,
				default: 'selector'
			},
			value: {
				type: String,
				default: '00:00'
			}
		},
		data() {
			return {
				isHover: false
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
			},
			handleChange(e) {
				console.log(e)
				this.$emit('change', e.target.value)
			}
		}
	}
</script>

<style lang="scss">
	.card {
		display: flex;
		flex-direction: column;
		position: relative;
		width: 100%;
		height: 100%;
		.content_box {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
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
	}

</style>
