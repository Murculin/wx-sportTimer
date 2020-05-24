// 延迟执行
export const delay = (ms) => {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve()
		}, ms)
	})
}
// 创建并播放音频
export const setAudio = (name) => {
	const audio = uni.createInnerAudioContext()
	audio.src = '/static/audio/' + name
	audio.play()
	audio.onEnded(audio.destroy)
}
// 保持屏幕亮起
export function keepScreen(flag) {
	uni.setKeepScreenOn({
		keepScreenOn: flag
	})
}

// 节流
export function throttle(fn, wait){
	var pre = Date.now();
	return function(){
		var context = this;
		var args = arguments;
		var now = Date.now();
		if( now - pre >= wait){
			fn.apply(context,args);
			pre = Date.now();
		}
	}
}