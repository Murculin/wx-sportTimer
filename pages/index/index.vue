<template>
	<view class="index page">
		<view class="content">
			<Card class="index_card" title="次数" time="03"></Card>
			<Card class="index_card" title="运动"></Card>
			<Card class="index_card" title="休息"></Card>
			<text class="total_time">共01:20</text>
			<CircleButton></CircleButton>
		</view>
	</view>
</template>

<script>
	import Card from '../../components/Card/Card.vue'
	import CircleButton from '../../components/CircleButton.vue'
	export default {
		data() {
			return {
			}
		},
		methods: {

		},
		components:{
			Card,
			CircleButton
		}
	}
</script>

<style lang="scss">
	.index {
		.content {
			margin-top: 150rpx;
			padding: 0 40rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			.index_card {
				margin-bottom: 50rpx;
				width: 100%;
			}
			.total_time {
				margin-bottom: 50rpx;
				font-size: 32rpx;
			}
		}
	}
</style>
