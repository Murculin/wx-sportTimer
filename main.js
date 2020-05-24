import Vue from 'vue'
import App from './App'
import store from './store'
import './styles/iconfont.css'

Vue.config.productionTip = false

App.mpType = 'app'

Vue.filter('formatTime', (data) => {
	if(typeof data !== 'number') {
		return data
	}
	let min = Math.floor(data/60)
	let sec = data%60
	min = min.toString().padStart(2, 0)
	sec = sec.toString().padStart(2, 0)
	return `${min}:${sec}`
})
const app = new Vue({
	...App,
	store
})
app.$mount()
