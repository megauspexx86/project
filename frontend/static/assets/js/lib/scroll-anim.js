!function(t,e){"function"==typeof define&&define.amd?define(e):"object"==typeof exports?module.exports=e(require,exports,module):t.ScrollReveal=e()}(this,function(t,e,n){return function(){var t,e,n;this.ScrollReveal=function(){function i(n){return window==this?new i(n):(e=this,e.tools=new t,e.tools.extend(e.defaults,n||{}),e.tools.isMobile()&&!e.defaults.mobile?!1:e.tools.isSupported("transform")&&e.tools.isSupported("transition")?(e.store={elements:{},containers:[]},e.history=[],e.counter=0,e.running=!1,e.initialized=!1,e):console.warn("ScrollReveal is not supported in this browser."))}return i.prototype.defaults={origin:"bottom",distance:"20px",duration:500,delay:0,rotate:{x:0,y:0,z:0},opacity:0,scale:.9,easing:"cubic-bezier( 0.6, 0.2, 0.1, 1 )",container:null,mobile:!0,reset:!1,useDelay:"always",viewFactor:.2,viewOffset:{top:0,right:0,bottom:0,left:0},afterReveal:function(t){},afterReset:function(t){}},i.prototype.reveal=function(t,n,i){var o,r,s,a;if(r=n&&n.container?n.container:e.defaults.container?e.defaults.container:window.document.documentElement,o=Array.prototype.slice.call(r.querySelectorAll(t)),!o.length)return console.warn("reveal('"+t+"') failed: no elements found."),e;for(var l=0;l<o.length;l++)s={},a=o[l].getAttribute("data-sr-id"),a?s=e.store.elements[a]:(s={id:++e.counter,domEl:o[l],seen:!1,revealed:!1},s.domEl.setAttribute("data-sr-id",s.id)),e.configure(s,n||{}),e.style(s),e.updateStore(s),s.revealed||s.domEl.setAttribute("style",s.styles.inline+s.styles.transform.initial);return i||(e.record(t,n),e.initTimeout&&window.clearTimeout(e.initTimeout),e.initTimeout=window.setTimeout(e.init,0)),e},i.prototype.configure=function(t,n){t.config?t.config=e.tools.extendClone(t.config,n):t.config=e.tools.extendClone(e.defaults,n),"top"===t.config.origin||"bottom"===t.config.origin?t.config.axis="Y":t.config.axis="X",("top"===t.config.origin||"left"===t.config.origin)&&(t.config.distance="-"+t.config.distance)},i.prototype.style=function(t){function e(e){parseInt(n.distance)&&(e.initial+=" translate"+n.axis+"("+n.distance+")",e.target+=" translate"+n.axis+"(0)"),n.scale&&(e.initial+=" scale("+n.scale+")",e.target+=" scale(1)"),n.rotate.x&&(e.initial+=" rotateX("+n.rotate.x+"deg)",e.target+=" rotateX(0)"),n.rotate.y&&(e.initial+=" rotateY("+n.rotate.y+"deg)",e.target+=" rotateY(0)"),n.rotate.z&&(e.initial+=" rotateZ("+n.rotate.z+"deg)",e.target+=" rotateZ(0)"),e.initial+="; opacity: "+n.opacity+";",e.target+="; opacity: "+t.styles.computed.opacity+";"}var n=t.config,i=window.getComputedStyle(t.domEl);t.styles||(t.styles={transition:{},transform:{},computed:{}},t.styles.inline=t.domEl.getAttribute("style")||"",t.styles.inline+="; visibility: visible; ",t.styles.computed.opacity=i.opacity,i.transition&&"all 0s ease 0s"!=i.transition?t.styles.computed.transition=i.transition+", ":t.styles.computed.transition=""),t.styles.transition.instant="-webkit-transition: "+t.styles.computed.transition+"-webkit-transform "+n.duration/1e3+"s "+n.easing+" 0s, opacity "+n.duration/1e3+"s "+n.easing+" 0s; transition: "+t.styles.computed.transition+"transform "+n.duration/1e3+"s "+n.easing+" 0s, opacity "+n.duration/1e3+"s "+n.easing+" 0s; ",t.styles.transition.delayed="-webkit-transition: "+t.styles.computed.transition+"-webkit-transform "+n.duration/1e3+"s "+n.easing+" "+n.delay/1e3+"s, opacity "+n.duration/1e3+"s "+n.easing+" "+n.delay/1e3+"s; transition: "+t.styles.computed.transition+"transform "+n.duration/1e3+"s "+n.easing+" "+n.delay/1e3+"s, opacity "+n.duration/1e3+"s "+n.easing+" "+n.delay/1e3+"s; ",t.styles.transform.initial=" -webkit-transform:",t.styles.transform.target=" -webkit-transform:",e(t.styles.transform),t.styles.transform.initial+="transform:",t.styles.transform.target+="transform:",e(t.styles.transform)},i.prototype.updateStore=function(t){var n=t.config.container;n&&-1==e.store.containers.indexOf(n)&&e.store.containers.push(t.config.container),e.store.elements[t.id]=t},i.prototype.record=function(t,n){var i={selector:t,config:n};e.history.push(i)},i.prototype.init=function(){e.animate();for(var t=0;t<e.store.containers.length;t++)e.store.containers[t].addEventListener("scroll",e.handler),e.store.containers[t].addEventListener("resize",e.handler);return e.initialized||(window.addEventListener("scroll",e.handler),window.addEventListener("resize",e.handler),e.initialized=!0),e},i.prototype.handler=function(){e.running||n(function(){e.running=!0,e.animate()})},i.prototype.animate=function(){function t(t,e){var n=0,i=0,o="after";switch(t){case"reveal":i=e.config.duration+e.config.delay,o+="Reveal";break;case"reset":i=e.config.duration,o+="Reset"}return e.timer&&(n=Math.abs(e.timer.started-new Date),window.clearTimeout(e.timer.clock)),e.timer={started:new Date},e.timer.clock=window.setTimeout(function(){e.config[o](e.domEl),e.timer=null},i-n),"reveal"===t?e.revealed=!0:e.revealed=!1}var n,i;e.tools.forOwn(e.store.elements,function(o){n=e.store.elements[o],i=e.isElemVisible(n),i&&!n.revealed?("always"===n.config.useDelay||"onload"===n.config.useDelay&&!e.initialized||"once"===n.config.useDelay&&!n.seen?n.domEl.setAttribute("style",n.styles.inline+n.styles.transform.target+n.styles.transition.delayed):n.domEl.setAttribute("style",n.styles.inline+n.styles.transform.target+n.styles.transition.instant),n.seen=!0,t("reveal",n)):!i&&n.config.reset&&n.revealed&&(n.domEl.setAttribute("style",n.styles.inline+n.styles.transform.initial+n.styles.transition.instant),t("reset",n))}),e.running=!1},i.prototype.getContainer=function(t){t||(t=window.document.documentElement);var e=t.clientWidth,n=t.clientHeight;return{width:e,height:n}},i.prototype.getScrolled=function(t){if(t){var n=e.getOffset(t);return{x:t.scrollLeft+n.left,y:t.scrollTop+n.top}}return{x:window.pageXOffset,y:window.pageYOffset}},i.prototype.getOffset=function(t){var e=0,n=0,i=t.offsetHeight,o=t.offsetWidth;do isNaN(t.offsetTop)||(e+=t.offsetTop),isNaN(t.offsetLeft)||(n+=t.offsetLeft);while(t=t.offsetParent);return{top:e,left:n,height:i,width:o}},i.prototype.isElemVisible=function(t){function n(){var e=f+l*a,n=d+c*a,i=u-l*a,o=y-c*a,p=s.y+t.config.viewOffset.top,g=s.x+t.config.viewOffset.left,m=s.y-t.config.viewOffset.bottom+r.height,w=s.x-t.config.viewOffset.right+r.width;return m>e&&i>p&&n>g&&w>o}function i(){return"fixed"===window.getComputedStyle(t.domEl).position}var o=e.getOffset(t.domEl),r=e.getContainer(t.config.container),s=e.getScrolled(t.config.container),a=t.config.viewFactor,l=o.height,c=o.width,f=o.top,d=o.left,u=f+l,y=d+c;return n()||i()},i.prototype.sync=function(){if(e.history.length){for(var t=0;t<e.history.length;t++){var n=e.history[t];e.reveal(n.selector,n.config,!0)}e.init()}else console.warn("sync() failed: no reveals found.");return e},i}();var t=function(){function t(){}return t.prototype.isObject=function(t){return null!==t&&"object"==typeof t&&t.constructor==Object},t.prototype.forOwn=function(t,e){if(!this.isObject(t))throw new TypeError("Expected 'object', but received '"+typeof t+"'.");for(var n in t)t.hasOwnProperty(n)&&e(n)},t.prototype.extend=function(t,e){return this.forOwn(e,function(n){this.isObject(e[n])?(t[n]&&this.isObject(t[n])||(t[n]={}),this.extend(t[n],e[n])):t[n]=e[n]}.bind(this)),t},t.prototype.extendClone=function(t,e){return this.extend(this.extend({},t),e)},t.prototype.isMobile=function(){return/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)},t.prototype.isSupported=function(t){for(var e=document.createElement("sensor"),n="Webkit,Moz,O,".split(","),i=(t+n.join(t+",")).split(","),o=0;o<i.length;o++)if(""===!e.style[i[o]])return!1;return!0},t}(),n=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame}.call(this),this.ScrollReveal});
