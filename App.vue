<script>
export default {
	onLaunch: function() {
		console.log('App Launch');
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style lang="scss">
/* 解决头条小程序组件内引入字体不生效的问题 */
/* #ifdef MP-TOUTIAO */
@font-face {
	font-family: uniicons;
	src: url('/static/uni.ttf');
}
/* #endif */
page {
  width: 100vw;
  height: 100vh;
  color: #fff;
  font-size: 28rpx;
}

.page {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 100%;
	background-image: linear-gradient(to top, rgb(203, 45, 62), rgb(239, 71, 58));
}
</style>
