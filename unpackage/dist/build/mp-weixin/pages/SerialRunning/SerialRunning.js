(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/SerialRunning/SerialRunning"],{"0de2":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var r=u(e("4795")),i=e("e83a");function u(t){return t&&t.__esModule?t:{default:t}}function o(t,n,e,r,i,u,o){try{var a=t[u](o),c=a.value}catch(f){return void e(f)}a.done?n(c):Promise.resolve(c).then(r,i)}function a(t){return function(){var n=this,e=arguments;return new Promise((function(r,i){var u=t.apply(n,e);function a(t){o(u,r,i,a,c,"next",t)}function c(t){o(u,r,i,a,c,"throw",t)}a(void 0)}))}}var c=function(){e.e("components/CircleButton").then(function(){return resolve(e("7c65"))}.bind(null,e)).catch(e.oe)},f=2e4,s={data:function(){return{play:!1,finish:!1,timeSec:0,startTime:0,percent:0}},computed:{toggleIcon:function(){return this.play?"icon-stop":"icon-play"}},mounted:function(){(0,i.keepScreen)(!0)},beforeDestroy:function(){(0,i.keepScreen)(!1)},methods:{toggleMode:function(){this.playing||t.redirectTo({url:"../index/index"})},togglePlay:function(){this.play?(this.finish=!0,this.play=!1,(0,i.keepScreen)(!1)):(this.play=!0,this.finish=!1,this.startTime=Date.now(),(0,i.keepScreen)(!0),this.startCount())},startCount:function(){var t=this;return a(r.default.mark((function n(){return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(!t.finish&&t.play){n.next=2;break}return n.abrupt("return");case 2:return n.next=4,(0,i.delay)(50);case 4:t.updateCount(),t.startCount();case 6:case"end":return n.stop()}}),n)})))()},updateCount:function(){var t=Date.now()-this.startTime,n=Math.floor(t/1e3);this.timeSec=n;var e=t%f;this.percent=e<f/2?e/(f/2)*100:100-(e-f/2)/(f/2)*100}},components:{CircleButton:c}};n.default=s}).call(this,e("543d")["default"])},"209e":function(t,n,e){"use strict";var r,i=function(){var t=this,n=t.$createElement,e=(t._self._c,t._f("formatTime")(t.timeSec));t.$mp.data=Object.assign({},{$root:{f0:e}})},u=[];e.d(n,"b",(function(){return i})),e.d(n,"c",(function(){return u})),e.d(n,"a",(function(){return r}))},"2ed4":function(t,n,e){"use strict";e.r(n);var r=e("209e"),i=e("fbbf");for(var u in i)"default"!==u&&function(t){e.d(n,t,(function(){return i[t]}))}(u);e("40ff");var o,a=e("f0c5"),c=Object(a["a"])(i["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],o);n["default"]=c.exports},"40ff":function(t,n,e){"use strict";var r=e("f844"),i=e.n(r);i.a},f844:function(t,n,e){},fa15:function(t,n,e){"use strict";(function(t){e("9b22");r(e("66fd"));var n=r(e("2ed4"));function r(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("543d")["createPage"])},fbbf:function(t,n,e){"use strict";e.r(n);var r=e("0de2"),i=e.n(r);for(var u in r)"default"!==u&&function(t){e.d(n,t,(function(){return r[t]}))}(u);n["default"]=i.a}},[["fa15","common/runtime","common/vendor"]]]);