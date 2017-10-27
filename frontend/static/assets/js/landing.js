!function(t,e){"function"==typeof define&&define.amd?define("jquery-bridget/jquery-bridget",["jquery"],function(i){return e(t,i)}):"object"==typeof module&&module.exports?module.exports=e(t,require("jquery")):t.jQueryBridget=e(t,t.jQuery)}(window,function(t,e){"use strict";function i(i,o,a){function l(t,e,n){var s,o="$()."+i+'("'+e+'")';return t.each(function(t,l){var h=a.data(l,i);if(!h)return void r(i+" not initialized. Cannot call methods, i.e. "+o);var c=h[e];if(!c||"_"==e.charAt(0))return void r(o+" is not a valid method");var d=c.apply(h,n);s=void 0===s?d:s}),void 0!==s?s:t}function h(t,e){t.each(function(t,n){var s=a.data(n,i);s?(s.option(e),s._init()):(s=new o(n,e),a.data(n,i,s))})}a=a||e||t.jQuery,a&&(o.prototype.option||(o.prototype.option=function(t){a.isPlainObject(t)&&(this.options=a.extend(!0,this.options,t))}),a.fn[i]=function(t){if("string"==typeof t){var e=s.call(arguments,1);return l(this,t,e)}return h(this,t),this},n(a))}function n(t){!t||t&&t.bridget||(t.bridget=i)}var s=Array.prototype.slice,o=t.console,r="undefined"==typeof o?function(){}:function(t){o.error(t)};return n(e||t.jQuery),i}),function(t,e){"function"==typeof define&&define.amd?define("ev-emitter/ev-emitter",e):"object"==typeof module&&module.exports?module.exports=e():t.EvEmitter=e()}("undefined"!=typeof window?window:this,function(){function t(){}var e=t.prototype;return e.on=function(t,e){if(t&&e){var i=this._events=this._events||{},n=i[t]=i[t]||[];return n.indexOf(e)==-1&&n.push(e),this}},e.once=function(t,e){if(t&&e){this.on(t,e);var i=this._onceEvents=this._onceEvents||{},n=i[t]=i[t]||{};return n[e]=!0,this}},e.off=function(t,e){var i=this._events&&this._events[t];if(i&&i.length){var n=i.indexOf(e);return n!=-1&&i.splice(n,1),this}},e.emitEvent=function(t,e){var i=this._events&&this._events[t];if(i&&i.length){var n=0,s=i[n];e=e||[];for(var o=this._onceEvents&&this._onceEvents[t];s;){var r=o&&o[s];r&&(this.off(t,s),delete o[s]),s.apply(this,e),n+=r?0:1,s=i[n]}return this}},t}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("get-size/get-size",[],function(){return e()}):"object"==typeof module&&module.exports?module.exports=e():t.getSize=e()}(window,function(){"use strict";function t(t){var e=parseFloat(t),i=t.indexOf("%")==-1&&!isNaN(e);return i&&e}function e(){}function i(){for(var t={width:0,height:0,innerWidth:0,innerHeight:0,outerWidth:0,outerHeight:0},e=0;e<h;e++){var i=l[e];t[i]=0}return t}function n(t){var e=getComputedStyle(t);return e||a("Style returned "+e+". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"),e}function s(){if(!c){c=!0;var e=document.createElement("div");e.style.width="200px",e.style.padding="1px 2px 3px 4px",e.style.borderStyle="solid",e.style.borderWidth="1px 2px 3px 4px",e.style.boxSizing="border-box";var i=document.body||document.documentElement;i.appendChild(e);var s=n(e);o.isBoxSizeOuter=r=200==t(s.width),i.removeChild(e)}}function o(e){if(s(),"string"==typeof e&&(e=document.querySelector(e)),e&&"object"==typeof e&&e.nodeType){var o=n(e);if("none"==o.display)return i();var a={};a.width=e.offsetWidth,a.height=e.offsetHeight;for(var c=a.isBorderBox="border-box"==o.boxSizing,d=0;d<h;d++){var u=l[d],f=o[u],p=parseFloat(f);a[u]=isNaN(p)?0:p}var v=a.paddingLeft+a.paddingRight,g=a.paddingTop+a.paddingBottom,m=a.marginLeft+a.marginRight,y=a.marginTop+a.marginBottom,S=a.borderLeftWidth+a.borderRightWidth,E=a.borderTopWidth+a.borderBottomWidth,b=c&&r,x=t(o.width);x!==!1&&(a.width=x+(b?0:v+S));var C=t(o.height);return C!==!1&&(a.height=C+(b?0:g+E)),a.innerWidth=a.width-(v+S),a.innerHeight=a.height-(g+E),a.outerWidth=a.width+m,a.outerHeight=a.height+y,a}}var r,a="undefined"==typeof console?e:function(t){console.error(t)},l=["paddingLeft","paddingRight","paddingTop","paddingBottom","marginLeft","marginRight","marginTop","marginBottom","borderLeftWidth","borderRightWidth","borderTopWidth","borderBottomWidth"],h=l.length,c=!1;return o}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("desandro-matches-selector/matches-selector",e):"object"==typeof module&&module.exports?module.exports=e():t.matchesSelector=e()}(window,function(){"use strict";var t=function(){var t=Element.prototype;if(t.matches)return"matches";if(t.matchesSelector)return"matchesSelector";for(var e=["webkit","moz","ms","o"],i=0;i<e.length;i++){var n=e[i],s=n+"MatchesSelector";if(t[s])return s}}();return function(e,i){return e[t](i)}}),function(t,e){"function"==typeof define&&define.amd?define("fizzy-ui-utils/utils",["desandro-matches-selector/matches-selector"],function(i){return e(t,i)}):"object"==typeof module&&module.exports?module.exports=e(t,require("desandro-matches-selector")):t.fizzyUIUtils=e(t,t.matchesSelector)}(window,function(t,e){var i={};i.extend=function(t,e){for(var i in e)t[i]=e[i];return t},i.modulo=function(t,e){return(t%e+e)%e},i.makeArray=function(t){var e=[];if(Array.isArray(t))e=t;else if(t&&"number"==typeof t.length)for(var i=0;i<t.length;i++)e.push(t[i]);else e.push(t);return e},i.removeFrom=function(t,e){var i=t.indexOf(e);i!=-1&&t.splice(i,1)},i.getParent=function(t,i){for(;t!=document.body;)if(t=t.parentNode,e(t,i))return t},i.getQueryElement=function(t){return"string"==typeof t?document.querySelector(t):t},i.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},i.filterFindElements=function(t,n){t=i.makeArray(t);var s=[];return t.forEach(function(t){if(t instanceof HTMLElement){if(!n)return void s.push(t);e(t,n)&&s.push(t);for(var i=t.querySelectorAll(n),o=0;o<i.length;o++)s.push(i[o])}}),s},i.debounceMethod=function(t,e,i){var n=t.prototype[e],s=e+"Timeout";t.prototype[e]=function(){var t=this[s];t&&clearTimeout(t);var e=arguments,o=this;this[s]=setTimeout(function(){n.apply(o,e),delete o[s]},i||100)}},i.docReady=function(t){var e=document.readyState;"complete"==e||"interactive"==e?setTimeout(t):document.addEventListener("DOMContentLoaded",t)},i.toDashed=function(t){return t.replace(/(.)([A-Z])/g,function(t,e,i){return e+"-"+i}).toLowerCase()};var n=t.console;return i.htmlInit=function(e,s){i.docReady(function(){var o=i.toDashed(s),r="data-"+o,a=document.querySelectorAll("["+r+"]"),l=document.querySelectorAll(".js-"+o),h=i.makeArray(a).concat(i.makeArray(l)),c=r+"-options",d=t.jQuery;h.forEach(function(t){var i,o=t.getAttribute(r)||t.getAttribute(c);try{i=o&&JSON.parse(o)}catch(a){return void(n&&n.error("Error parsing "+r+" on "+t.className+": "+a))}var l=new e(t,i);d&&d.data(t,s,l)})})},i}),function(t,e){"function"==typeof define&&define.amd?define("flickity/js/cell",["get-size/get-size"],function(i){return e(t,i)}):"object"==typeof module&&module.exports?module.exports=e(t,require("get-size")):(t.Flickity=t.Flickity||{},t.Flickity.Cell=e(t,t.getSize))}(window,function(t,e){function i(t,e){this.element=t,this.parent=e,this.create()}var n=i.prototype;return n.create=function(){this.element.style.position="absolute",this.x=0,this.shift=0},n.destroy=function(){this.element.style.position="";var t=this.parent.originSide;this.element.style[t]=""},n.getSize=function(){this.size=e(this.element)},n.setPosition=function(t){this.x=t,this.updateTarget(),this.renderPosition(t)},n.updateTarget=n.setDefaultTarget=function(){var t="left"==this.parent.originSide?"marginLeft":"marginRight";this.target=this.x+this.size[t]+this.size.width*this.parent.cellAlign},n.renderPosition=function(t){var e=this.parent.originSide;this.element.style[e]=this.parent.getPositionValue(t)},n.wrapShift=function(t){this.shift=t,this.renderPosition(this.x+this.parent.slideableWidth*t)},n.remove=function(){this.element.parentNode.removeChild(this.element)},i}),function(t,e){"function"==typeof define&&define.amd?define("flickity/js/slide",e):"object"==typeof module&&module.exports?module.exports=e():(t.Flickity=t.Flickity||{},t.Flickity.Slide=e())}(window,function(){"use strict";function t(t){this.parent=t,this.isOriginLeft="left"==t.originSide,this.cells=[],this.outerWidth=0,this.height=0}var e=t.prototype;return e.addCell=function(t){if(this.cells.push(t),this.outerWidth+=t.size.outerWidth,this.height=Math.max(t.size.outerHeight,this.height),1==this.cells.length){this.x=t.x;var e=this.isOriginLeft?"marginLeft":"marginRight";this.firstMargin=t.size[e]}},e.updateTarget=function(){var t=this.isOriginLeft?"marginRight":"marginLeft",e=this.getLastCell(),i=e?e.size[t]:0,n=this.outerWidth-(this.firstMargin+i);this.target=this.x+this.firstMargin+n*this.parent.cellAlign},e.getLastCell=function(){return this.cells[this.cells.length-1]},e.select=function(){this.changeSelectedClass("add")},e.unselect=function(){this.changeSelectedClass("remove")},e.changeSelectedClass=function(t){this.cells.forEach(function(e){e.element.classList[t]("is-selected")})},e.getCellElements=function(){return this.cells.map(function(t){return t.element})},t}),function(t,e){"function"==typeof define&&define.amd?define("flickity/js/animate",["fizzy-ui-utils/utils"],function(i){return e(t,i)}):"object"==typeof module&&module.exports?module.exports=e(t,require("fizzy-ui-utils")):(t.Flickity=t.Flickity||{},t.Flickity.animatePrototype=e(t,t.fizzyUIUtils))}(window,function(t,e){var i=t.requestAnimationFrame||t.webkitRequestAnimationFrame,n=0;i||(i=function(t){var e=(new Date).getTime(),i=Math.max(0,16-(e-n)),s=setTimeout(t,i);return n=e+i,s});var s={};s.startAnimation=function(){this.isAnimating||(this.isAnimating=!0,this.restingFrames=0,this.animate())},s.animate=function(){this.applyDragForce(),this.applySelectedAttraction();var t=this.x;if(this.integratePhysics(),this.positionSlider(),this.settle(t),this.isAnimating){var e=this;i(function(){e.animate()})}};var o=function(){var t=document.documentElement.style;return"string"==typeof t.transform?"transform":"WebkitTransform"}();return s.positionSlider=function(){var t=this.x;this.options.wrapAround&&this.cells.length>1&&(t=e.modulo(t,this.slideableWidth),t-=this.slideableWidth,this.shiftWrapCells(t)),t+=this.cursorPosition,t=this.options.rightToLeft&&o?-t:t;var i=this.getPositionValue(t);this.slider.style[o]=this.isAnimating?"translate3d("+i+",0,0)":"translateX("+i+")";var n=this.slides[0];if(n){var s=-this.x-n.target,r=s/this.slidesWidth;this.dispatchEvent("scroll",null,[r,s])}},s.positionSliderAtSelected=function(){this.cells.length&&(this.x=-this.selectedSlide.target,this.positionSlider())},s.getPositionValue=function(t){return this.options.percentPosition?.01*Math.round(t/this.size.innerWidth*1e4)+"%":Math.round(t)+"px"},s.settle=function(t){this.isPointerDown||Math.round(100*this.x)!=Math.round(100*t)||this.restingFrames++,this.restingFrames>2&&(this.isAnimating=!1,delete this.isFreeScrolling,this.positionSlider(),this.dispatchEvent("settle"))},s.shiftWrapCells=function(t){var e=this.cursorPosition+t;this._shiftCells(this.beforeShiftCells,e,-1);var i=this.size.innerWidth-(t+this.slideableWidth+this.cursorPosition);this._shiftCells(this.afterShiftCells,i,1)},s._shiftCells=function(t,e,i){for(var n=0;n<t.length;n++){var s=t[n],o=e>0?i:0;s.wrapShift(o),e-=s.size.outerWidth}},s._unshiftCells=function(t){if(t&&t.length)for(var e=0;e<t.length;e++)t[e].wrapShift(0)},s.integratePhysics=function(){this.x+=this.velocity,this.velocity*=this.getFrictionFactor()},s.applyForce=function(t){this.velocity+=t},s.getFrictionFactor=function(){return 1-this.options[this.isFreeScrolling?"freeScrollFriction":"friction"]},s.getRestingPosition=function(){return this.x+this.velocity/(1-this.getFrictionFactor())},s.applyDragForce=function(){if(this.isPointerDown){var t=this.dragX-this.x,e=t-this.velocity;this.applyForce(e)}},s.applySelectedAttraction=function(){if(!this.isPointerDown&&!this.isFreeScrolling&&this.cells.length){var t=this.selectedSlide.target*-1-this.x,e=t*this.options.selectedAttraction;this.applyForce(e)}},s}),function(t,e){if("function"==typeof define&&define.amd)define("flickity/js/flickity",["ev-emitter/ev-emitter","get-size/get-size","fizzy-ui-utils/utils","./cell","./slide","./animate"],function(i,n,s,o,r,a){return e(t,i,n,s,o,r,a)});else if("object"==typeof module&&module.exports)module.exports=e(t,require("ev-emitter"),require("get-size"),require("fizzy-ui-utils"),require("./cell"),require("./slide"),require("./animate"));else{var i=t.Flickity;t.Flickity=e(t,t.EvEmitter,t.getSize,t.fizzyUIUtils,i.Cell,i.Slide,i.animatePrototype)}}(window,function(t,e,i,n,s,o,r){function a(t,e){for(t=n.makeArray(t);t.length;)e.appendChild(t.shift())}function l(t,e){var i=n.getQueryElement(t);if(!i)return void(d&&d.error("Bad element for Flickity: "+(i||t)));if(this.element=i,this.element.flickityGUID){var s=f[this.element.flickityGUID];return s.option(e),s}h&&(this.$element=h(this.element)),this.options=n.extend({},this.constructor.defaults),this.option(e),this._create()}var h=t.jQuery,c=t.getComputedStyle,d=t.console,u=0,f={};l.defaults={accessibility:!0,cellAlign:"center",freeScrollFriction:.075,friction:.28,namespaceJQueryEvents:!0,percentPosition:!0,resize:!0,selectedAttraction:.025,setGallerySize:!0},l.createMethods=[];var p=l.prototype;n.extend(p,e.prototype),p._create=function(){var e=this.guid=++u;this.element.flickityGUID=e,f[e]=this,this.selectedIndex=0,this.restingFrames=0,this.x=0,this.velocity=0,this.originSide=this.options.rightToLeft?"right":"left",this.viewport=document.createElement("div"),this.viewport.className="flickity-viewport",this._createSlider(),(this.options.resize||this.options.watchCSS)&&t.addEventListener("resize",this),l.createMethods.forEach(function(t){this[t]()},this),this.options.watchCSS?this.watchCSS():this.activate()},p.option=function(t){n.extend(this.options,t)},p.activate=function(){if(!this.isActive){this.isActive=!0,this.element.classList.add("flickity-enabled"),this.options.rightToLeft&&this.element.classList.add("flickity-rtl"),this.getSize();var t=this._filterFindCellElements(this.element.children);a(t,this.slider),this.viewport.appendChild(this.slider),this.element.appendChild(this.viewport),this.reloadCells(),this.options.accessibility&&(this.element.tabIndex=0,this.element.addEventListener("keydown",this)),this.emitEvent("activate");var e,i=this.options.initialIndex;e=this.isInitActivated?this.selectedIndex:void 0!==i&&this.cells[i]?i:0,this.select(e,!1,!0),this.isInitActivated=!0}},p._createSlider=function(){var t=document.createElement("div");t.className="flickity-slider",t.style[this.originSide]=0,this.slider=t},p._filterFindCellElements=function(t){return n.filterFindElements(t,this.options.cellSelector)},p.reloadCells=function(){this.cells=this._makeCells(this.slider.children),this.positionCells(),this._getWrapShiftCells(),this.setGallerySize()},p._makeCells=function(t){var e=this._filterFindCellElements(t),i=e.map(function(t){return new s(t,this)},this);return i},p.getLastCell=function(){return this.cells[this.cells.length-1]},p.getLastSlide=function(){return this.slides[this.slides.length-1]},p.positionCells=function(){this._sizeCells(this.cells),this._positionCells(0)},p._positionCells=function(t){t=t||0,this.maxCellHeight=t?this.maxCellHeight||0:0;var e=0;if(t>0){var i=this.cells[t-1];e=i.x+i.size.outerWidth}for(var n=this.cells.length,s=t;s<n;s++){var o=this.cells[s];o.setPosition(e),e+=o.size.outerWidth,this.maxCellHeight=Math.max(o.size.outerHeight,this.maxCellHeight)}this.slideableWidth=e,this.updateSlides(),this._containSlides(),this.slidesWidth=n?this.getLastSlide().target-this.slides[0].target:0},p._sizeCells=function(t){t.forEach(function(t){t.getSize()})},p.updateSlides=function(){if(this.slides=[],this.cells.length){var t=new o(this);this.slides.push(t);var e="left"==this.originSide,i=e?"marginRight":"marginLeft",n=this._getCanCellFit();this.cells.forEach(function(e,s){if(!t.cells.length)return void t.addCell(e);var r=t.outerWidth-t.firstMargin+(e.size.outerWidth-e.size[i]);n.call(this,s,r)?t.addCell(e):(t.updateTarget(),t=new o(this),this.slides.push(t),t.addCell(e))},this),t.updateTarget(),this.updateSelectedSlide()}},p._getCanCellFit=function(){var t=this.options.groupCells;if(!t)return function(){return!1};if("number"==typeof t){var e=parseInt(t,10);return function(t){return t%e!==0}}var i="string"==typeof t&&t.match(/^(\d+)%$/),n=i?parseInt(i[1],10)/100:1;return function(t,e){return e<=(this.size.innerWidth+1)*n}},p._init=p.reposition=function(){this.positionCells(),this.positionSliderAtSelected()},p.getSize=function(){this.size=i(this.element),this.setCellAlign(),this.cursorPosition=this.size.innerWidth*this.cellAlign};var v={center:{left:.5,right:.5},left:{left:0,right:1},right:{right:0,left:1}};return p.setCellAlign=function(){var t=v[this.options.cellAlign];this.cellAlign=t?t[this.originSide]:this.options.cellAlign},p.setGallerySize=function(){if(this.options.setGallerySize){var t=this.options.adaptiveHeight&&this.selectedSlide?this.selectedSlide.height:this.maxCellHeight;this.viewport.style.height=t+"px"}},p._getWrapShiftCells=function(){if(this.options.wrapAround){this._unshiftCells(this.beforeShiftCells),this._unshiftCells(this.afterShiftCells);var t=this.cursorPosition,e=this.cells.length-1;this.beforeShiftCells=this._getGapCells(t,e,-1),t=this.size.innerWidth-this.cursorPosition,this.afterShiftCells=this._getGapCells(t,0,1)}},p._getGapCells=function(t,e,i){for(var n=[];t>0;){var s=this.cells[e];if(!s)break;n.push(s),e+=i,t-=s.size.outerWidth}return n},p._containSlides=function(){if(this.options.contain&&!this.options.wrapAround&&this.cells.length){var t=this.options.rightToLeft,e=t?"marginRight":"marginLeft",i=t?"marginLeft":"marginRight",n=this.slideableWidth-this.getLastCell().size[i],s=n<this.size.innerWidth,o=this.cursorPosition+this.cells[0].size[e],r=n-this.size.innerWidth*(1-this.cellAlign);this.slides.forEach(function(t){s?t.target=n*this.cellAlign:(t.target=Math.max(t.target,o),t.target=Math.min(t.target,r))},this)}},p.dispatchEvent=function(t,e,i){var n=e?[e].concat(i):i;if(this.emitEvent(t,n),h&&this.$element){t+=this.options.namespaceJQueryEvents?".flickity":"";var s=t;if(e){var o=h.Event(e);o.type=t,s=o}this.$element.trigger(s,i)}},p.select=function(t,e,i){this.isActive&&(t=parseInt(t,10),this._wrapSelect(t),(this.options.wrapAround||e)&&(t=n.modulo(t,this.slides.length)),this.slides[t]&&(this.selectedIndex=t,this.updateSelectedSlide(),i?this.positionSliderAtSelected():this.startAnimation(),this.options.adaptiveHeight&&this.setGallerySize(),this.dispatchEvent("select"),this.dispatchEvent("cellSelect")))},p._wrapSelect=function(t){var e=this.slides.length,i=this.options.wrapAround&&e>1;if(!i)return t;var s=n.modulo(t,e),o=Math.abs(s-this.selectedIndex),r=Math.abs(s+e-this.selectedIndex),a=Math.abs(s-e-this.selectedIndex);!this.isDragSelect&&r<o?t+=e:!this.isDragSelect&&a<o&&(t-=e),t<0?this.x-=this.slideableWidth:t>=e&&(this.x+=this.slideableWidth)},p.previous=function(t,e){this.select(this.selectedIndex-1,t,e)},p.next=function(t,e){this.select(this.selectedIndex+1,t,e)},p.updateSelectedSlide=function(){var t=this.slides[this.selectedIndex];t&&(this.unselectSelectedSlide(),this.selectedSlide=t,t.select(),this.selectedCells=t.cells,this.selectedElements=t.getCellElements(),this.selectedCell=t.cells[0],this.selectedElement=this.selectedElements[0])},p.unselectSelectedSlide=function(){this.selectedSlide&&this.selectedSlide.unselect()},p.selectCell=function(t,e,i){var n;"number"==typeof t?n=this.cells[t]:("string"==typeof t&&(t=this.element.querySelector(t)),n=this.getCell(t));for(var s=0;n&&s<this.slides.length;s++){var o=this.slides[s],r=o.cells.indexOf(n);if(r!=-1)return void this.select(s,e,i)}},p.getCell=function(t){for(var e=0;e<this.cells.length;e++){var i=this.cells[e];if(i.element==t)return i}},p.getCells=function(t){t=n.makeArray(t);var e=[];return t.forEach(function(t){var i=this.getCell(t);i&&e.push(i)},this),e},p.getCellElements=function(){return this.cells.map(function(t){return t.element})},p.getParentCell=function(t){var e=this.getCell(t);return e?e:(t=n.getParent(t,".flickity-slider > *"),this.getCell(t))},p.getAdjacentCellElements=function(t,e){if(!t)return this.selectedSlide.getCellElements();e=void 0===e?this.selectedIndex:e;var i=this.slides.length;if(1+2*t>=i)return this.getCellElements();for(var s=[],o=e-t;o<=e+t;o++){var r=this.options.wrapAround?n.modulo(o,i):o,a=this.slides[r];a&&(s=s.concat(a.getCellElements()))}return s},p.uiChange=function(){this.emitEvent("uiChange")},p.childUIPointerDown=function(t){this.emitEvent("childUIPointerDown",[t])},p.onresize=function(){this.watchCSS(),this.resize()},n.debounceMethod(l,"onresize",150),p.resize=function(){if(this.isActive){this.getSize(),this.options.wrapAround&&(this.x=n.modulo(this.x,this.slideableWidth)),this.positionCells(),this._getWrapShiftCells(),this.setGallerySize(),this.emitEvent("resize");var t=this.selectedElements&&this.selectedElements[0];this.selectCell(t,!1,!0)}},p.watchCSS=function(){var t=this.options.watchCSS;if(t){var e=c(this.element,":after").content;e.indexOf("flickity")!=-1?this.activate():this.deactivate()}},p.onkeydown=function(t){if(this.options.accessibility&&(!document.activeElement||document.activeElement==this.element))if(37==t.keyCode){var e=this.options.rightToLeft?"next":"previous";this.uiChange(),this[e]()}else if(39==t.keyCode){var i=this.options.rightToLeft?"previous":"next";this.uiChange(),this[i]()}},p.deactivate=function(){this.isActive&&(this.element.classList.remove("flickity-enabled"),this.element.classList.remove("flickity-rtl"),this.cells.forEach(function(t){t.destroy()}),this.unselectSelectedSlide(),this.element.removeChild(this.viewport),a(this.slider.children,this.element),this.options.accessibility&&(this.element.removeAttribute("tabIndex"),this.element.removeEventListener("keydown",this)),this.isActive=!1,this.emitEvent("deactivate"))},p.destroy=function(){this.deactivate(),t.removeEventListener("resize",this),this.emitEvent("destroy"),h&&this.$element&&h.removeData(this.element,"flickity"),delete this.element.flickityGUID,delete f[this.guid]},n.extend(p,r),l.data=function(t){t=n.getQueryElement(t);var e=t&&t.flickityGUID;return e&&f[e]},n.htmlInit(l,"flickity"),h&&h.bridget&&h.bridget("flickity",l),l.Cell=s,l}),function(t,e){"function"==typeof define&&define.amd?define("unipointer/unipointer",["ev-emitter/ev-emitter"],function(i){return e(t,i)}):"object"==typeof module&&module.exports?module.exports=e(t,require("ev-emitter")):t.Unipointer=e(t,t.EvEmitter)}(window,function(t,e){function i(){}function n(){}var s=n.prototype=Object.create(e.prototype);s.bindStartEvent=function(t){this._bindStartEvent(t,!0)},s.unbindStartEvent=function(t){this._bindStartEvent(t,!1)},s._bindStartEvent=function(e,i){i=void 0===i||!!i;var n=i?"addEventListener":"removeEventListener";t.navigator.pointerEnabled?e[n]("pointerdown",this):t.navigator.msPointerEnabled?e[n]("MSPointerDown",this):(e[n]("mousedown",this),e[n]("touchstart",this))},s.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},s.getTouch=function(t){for(var e=0;e<t.length;e++){var i=t[e];if(i.identifier==this.pointerIdentifier)return i}},s.onmousedown=function(t){var e=t.button;e&&0!==e&&1!==e||this._pointerDown(t,t)},s.ontouchstart=function(t){this._pointerDown(t,t.changedTouches[0])},s.onMSPointerDown=s.onpointerdown=function(t){this._pointerDown(t,t)},s._pointerDown=function(t,e){this.isPointerDown||(this.isPointerDown=!0,this.pointerIdentifier=void 0!==e.pointerId?e.pointerId:e.identifier,this.pointerDown(t,e))},s.pointerDown=function(t,e){this._bindPostStartEvents(t),this.emitEvent("pointerDown",[t,e])};var o={mousedown:["mousemove","mouseup"],touchstart:["touchmove","touchend","touchcancel"],pointerdown:["pointermove","pointerup","pointercancel"],MSPointerDown:["MSPointerMove","MSPointerUp","MSPointerCancel"]};return s._bindPostStartEvents=function(e){if(e){var i=o[e.type];i.forEach(function(e){t.addEventListener(e,this)},this),this._boundPointerEvents=i}},s._unbindPostStartEvents=function(){this._boundPointerEvents&&(this._boundPointerEvents.forEach(function(e){t.removeEventListener(e,this)},this),delete this._boundPointerEvents)},s.onmousemove=function(t){this._pointerMove(t,t)},s.onMSPointerMove=s.onpointermove=function(t){t.pointerId==this.pointerIdentifier&&this._pointerMove(t,t)},s.ontouchmove=function(t){var e=this.getTouch(t.changedTouches);e&&this._pointerMove(t,e)},s._pointerMove=function(t,e){this.pointerMove(t,e)},s.pointerMove=function(t,e){this.emitEvent("pointerMove",[t,e])},s.onmouseup=function(t){this._pointerUp(t,t)},s.onMSPointerUp=s.onpointerup=function(t){t.pointerId==this.pointerIdentifier&&this._pointerUp(t,t)},s.ontouchend=function(t){var e=this.getTouch(t.changedTouches);e&&this._pointerUp(t,e)},s._pointerUp=function(t,e){this._pointerDone(),this.pointerUp(t,e)},s.pointerUp=function(t,e){this.emitEvent("pointerUp",[t,e])},s._pointerDone=function(){this.isPointerDown=!1,delete this.pointerIdentifier,this._unbindPostStartEvents(),this.pointerDone()},s.pointerDone=i,s.onMSPointerCancel=s.onpointercancel=function(t){t.pointerId==this.pointerIdentifier&&this._pointerCancel(t,t)},s.ontouchcancel=function(t){var e=this.getTouch(t.changedTouches);e&&this._pointerCancel(t,e)},s._pointerCancel=function(t,e){this._pointerDone(),this.pointerCancel(t,e)},s.pointerCancel=function(t,e){this.emitEvent("pointerCancel",[t,e])},n.getPointerPoint=function(t){return{x:t.pageX,y:t.pageY}},n}),function(t,e){"function"==typeof define&&define.amd?define("unidragger/unidragger",["unipointer/unipointer"],function(i){return e(t,i)}):"object"==typeof module&&module.exports?module.exports=e(t,require("unipointer")):t.Unidragger=e(t,t.Unipointer)}(window,function(t,e){function i(){}function n(){}var s=n.prototype=Object.create(e.prototype);s.bindHandles=function(){this._bindHandles(!0)},s.unbindHandles=function(){this._bindHandles(!1)};var o=t.navigator;return s._bindHandles=function(t){t=void 0===t||!!t;var e;e=o.pointerEnabled?function(e){e.style.touchAction=t?"none":""}:o.msPointerEnabled?function(e){e.style.msTouchAction=t?"none":""}:i;for(var n=t?"addEventListener":"removeEventListener",s=0;s<this.handles.length;s++){var r=this.handles[s];this._bindStartEvent(r,t),e(r),r[n]("click",this)}},s.pointerDown=function(t,e){if("INPUT"==t.target.nodeName&&"range"==t.target.type)return this.isPointerDown=!1,void delete this.pointerIdentifier;this._dragPointerDown(t,e);var i=document.activeElement;i&&i.blur&&i.blur(),this._bindPostStartEvents(t),this.emitEvent("pointerDown",[t,e])},s._dragPointerDown=function(t,i){this.pointerDownPoint=e.getPointerPoint(i);var n=this.canPreventDefaultOnPointerDown(t,i);n&&t.preventDefault()},s.canPreventDefaultOnPointerDown=function(t){return"SELECT"!=t.target.nodeName},s.pointerMove=function(t,e){var i=this._dragPointerMove(t,e);this.emitEvent("pointerMove",[t,e,i]),this._dragMove(t,e,i)},s._dragPointerMove=function(t,i){var n=e.getPointerPoint(i),s={x:n.x-this.pointerDownPoint.x,y:n.y-this.pointerDownPoint.y};return!this.isDragging&&this.hasDragStarted(s)&&this._dragStart(t,i),s},s.hasDragStarted=function(t){return Math.abs(t.x)>3||Math.abs(t.y)>3},s.pointerUp=function(t,e){this.emitEvent("pointerUp",[t,e]),this._dragPointerUp(t,e)},s._dragPointerUp=function(t,e){this.isDragging?this._dragEnd(t,e):this._staticClick(t,e)},s._dragStart=function(t,i){this.isDragging=!0,this.dragStartPoint=e.getPointerPoint(i),this.isPreventingClicks=!0,this.dragStart(t,i)},s.dragStart=function(t,e){this.emitEvent("dragStart",[t,e])},s._dragMove=function(t,e,i){this.isDragging&&this.dragMove(t,e,i)},s.dragMove=function(t,e,i){t.preventDefault(),this.emitEvent("dragMove",[t,e,i])},s._dragEnd=function(t,e){this.isDragging=!1,setTimeout(function(){delete this.isPreventingClicks}.bind(this)),this.dragEnd(t,e)},s.dragEnd=function(t,e){this.emitEvent("dragEnd",[t,e])},s.onclick=function(t){this.isPreventingClicks&&t.preventDefault()},s._staticClick=function(t,e){if(!this.isIgnoringMouseUp||"mouseup"!=t.type){var i=t.target.nodeName;"INPUT"!=i&&"TEXTAREA"!=i||t.target.focus(),this.staticClick(t,e),"mouseup"!=t.type&&(this.isIgnoringMouseUp=!0,setTimeout(function(){delete this.isIgnoringMouseUp}.bind(this),400))}},s.staticClick=function(t,e){this.emitEvent("staticClick",[t,e])},n.getPointerPoint=e.getPointerPoint,n}),function(t,e){"function"==typeof define&&define.amd?define("flickity/js/drag",["./flickity","unidragger/unidragger","fizzy-ui-utils/utils"],function(i,n,s){return e(t,i,n,s)}):"object"==typeof module&&module.exports?module.exports=e(t,require("./flickity"),require("unidragger"),require("fizzy-ui-utils")):t.Flickity=e(t,t.Flickity,t.Unidragger,t.fizzyUIUtils)}(window,function(t,e,i,n){function s(){return{x:t.pageXOffset,y:t.pageYOffset}}n.extend(e.defaults,{draggable:!0,dragThreshold:3}),e.createMethods.push("_createDrag");var o=e.prototype;n.extend(o,i.prototype);var r="createTouch"in document,a=!1;o._createDrag=function(){this.on("activate",this.bindDrag),this.on("uiChange",this._uiChangeDrag),this.on("childUIPointerDown",this._childUIPointerDownDrag),this.on("deactivate",this.unbindDrag),r&&!a&&(t.addEventListener("touchmove",function(){}),a=!0)},o.bindDrag=function(){this.options.draggable&&!this.isDragBound&&(this.element.classList.add("is-draggable"),this.handles=[this.viewport],this.bindHandles(),this.isDragBound=!0)},o.unbindDrag=function(){this.isDragBound&&(this.element.classList.remove("is-draggable"),this.unbindHandles(),delete this.isDragBound)},o._uiChangeDrag=function(){delete this.isFreeScrolling},o._childUIPointerDownDrag=function(t){t.preventDefault(),this.pointerDownFocus(t)};var l={TEXTAREA:!0,INPUT:!0,OPTION:!0},h={radio:!0,checkbox:!0,button:!0,submit:!0,image:!0,file:!0};o.pointerDown=function(e,i){var n=l[e.target.nodeName]&&!h[e.target.type];if(n)return this.isPointerDown=!1,void delete this.pointerIdentifier;this._dragPointerDown(e,i);var o=document.activeElement;o&&o.blur&&o!=this.element&&o!=document.body&&o.blur(),this.pointerDownFocus(e),this.dragX=this.x,this.viewport.classList.add("is-pointer-down"),this._bindPostStartEvents(e),this.pointerDownScroll=s(),t.addEventListener("scroll",this),this.dispatchEvent("pointerDown",e,[i])};var c={touchstart:!0,MSPointerDown:!0},d={INPUT:!0,SELECT:!0};return o.pointerDownFocus=function(e){if(this.options.accessibility&&!c[e.type]&&!d[e.target.nodeName]){var i=t.pageYOffset;this.element.focus(),t.pageYOffset!=i&&t.scrollTo(t.pageXOffset,i)}},o.canPreventDefaultOnPointerDown=function(t){var e="touchstart"==t.type,i=t.target.nodeName;return!e&&"SELECT"!=i},o.hasDragStarted=function(t){return Math.abs(t.x)>this.options.dragThreshold},o.pointerUp=function(t,e){delete this.isTouchScrolling,this.viewport.classList.remove("is-pointer-down"),this.dispatchEvent("pointerUp",t,[e]),this._dragPointerUp(t,e)},o.pointerDone=function(){t.removeEventListener("scroll",this),delete this.pointerDownScroll},o.dragStart=function(e,i){this.dragStartPosition=this.x,this.startAnimation(),t.removeEventListener("scroll",this),this.dispatchEvent("dragStart",e,[i])},o.pointerMove=function(t,e){var i=this._dragPointerMove(t,e);this.dispatchEvent("pointerMove",t,[e,i]),this._dragMove(t,e,i)},o.dragMove=function(t,e,i){t.preventDefault(),this.previousDragX=this.dragX;var n=this.options.rightToLeft?-1:1,s=this.dragStartPosition+i.x*n;if(!this.options.wrapAround&&this.slides.length){var o=Math.max(-this.slides[0].target,this.dragStartPosition);s=s>o?.5*(s+o):s;var r=Math.min(-this.getLastSlide().target,this.dragStartPosition);s=s<r?.5*(s+r):s}this.dragX=s,this.dragMoveTime=new Date,this.dispatchEvent("dragMove",t,[e,i])},o.dragEnd=function(t,e){this.options.freeScroll&&(this.isFreeScrolling=!0);var i=this.dragEndRestingSelect();if(this.options.freeScroll&&!this.options.wrapAround){var n=this.getRestingPosition();this.isFreeScrolling=-n>this.slides[0].target&&-n<this.getLastSlide().target}else this.options.freeScroll||i!=this.selectedIndex||(i+=this.dragEndBoostSelect());delete this.previousDragX,this.isDragSelect=this.options.wrapAround,this.select(i),delete this.isDragSelect,this.dispatchEvent("dragEnd",t,[e])},o.dragEndRestingSelect=function(){
var t=this.getRestingPosition(),e=Math.abs(this.getSlideDistance(-t,this.selectedIndex)),i=this._getClosestResting(t,e,1),n=this._getClosestResting(t,e,-1),s=i.distance<n.distance?i.index:n.index;return s},o._getClosestResting=function(t,e,i){for(var n=this.selectedIndex,s=1/0,o=this.options.contain&&!this.options.wrapAround?function(t,e){return t<=e}:function(t,e){return t<e};o(e,s)&&(n+=i,s=e,e=this.getSlideDistance(-t,n),null!==e);)e=Math.abs(e);return{distance:s,index:n-i}},o.getSlideDistance=function(t,e){var i=this.slides.length,s=this.options.wrapAround&&i>1,o=s?n.modulo(e,i):e,r=this.slides[o];if(!r)return null;var a=s?this.slideableWidth*Math.floor(e/i):0;return t-(r.target+a)},o.dragEndBoostSelect=function(){if(void 0===this.previousDragX||!this.dragMoveTime||new Date-this.dragMoveTime>100)return 0;var t=this.getSlideDistance(-this.dragX,this.selectedIndex),e=this.previousDragX-this.dragX;return t>0&&e>0?1:t<0&&e<0?-1:0},o.staticClick=function(t,e){var i=this.getParentCell(t.target),n=i&&i.element,s=i&&this.cells.indexOf(i);this.dispatchEvent("staticClick",t,[e,n,s])},o.onscroll=function(){var t=s(),e=this.pointerDownScroll.x-t.x,i=this.pointerDownScroll.y-t.y;(Math.abs(e)>3||Math.abs(i)>3)&&this._pointerDone()},e}),function(t,e){"function"==typeof define&&define.amd?define("tap-listener/tap-listener",["unipointer/unipointer"],function(i){return e(t,i)}):"object"==typeof module&&module.exports?module.exports=e(t,require("unipointer")):t.TapListener=e(t,t.Unipointer)}(window,function(t,e){function i(t){this.bindTap(t)}var n=i.prototype=Object.create(e.prototype);return n.bindTap=function(t){t&&(this.unbindTap(),this.tapElement=t,this._bindStartEvent(t,!0))},n.unbindTap=function(){this.tapElement&&(this._bindStartEvent(this.tapElement,!0),delete this.tapElement)},n.pointerUp=function(i,n){if(!this.isIgnoringMouseUp||"mouseup"!=i.type){var s=e.getPointerPoint(n),o=this.tapElement.getBoundingClientRect(),r=t.pageXOffset,a=t.pageYOffset,l=s.x>=o.left+r&&s.x<=o.right+r&&s.y>=o.top+a&&s.y<=o.bottom+a;if(l&&this.emitEvent("tap",[i,n]),"mouseup"!=i.type){this.isIgnoringMouseUp=!0;var h=this;setTimeout(function(){delete h.isIgnoringMouseUp},400)}}},n.destroy=function(){this.pointerDone(),this.unbindTap()},i}),function(t,e){"function"==typeof define&&define.amd?define("flickity/js/prev-next-button",["./flickity","tap-listener/tap-listener","fizzy-ui-utils/utils"],function(i,n,s){return e(t,i,n,s)}):"object"==typeof module&&module.exports?module.exports=e(t,require("./flickity"),require("tap-listener"),require("fizzy-ui-utils")):e(t,t.Flickity,t.TapListener,t.fizzyUIUtils)}(window,function(t,e,i,n){"use strict";function s(t,e){this.direction=t,this.parent=e,this._create()}function o(t){return"string"==typeof t?t:"M "+t.x0+",50 L "+t.x1+","+(t.y1+50)+" L "+t.x2+","+(t.y2+50)+" L "+t.x3+",50  L "+t.x2+","+(50-t.y2)+" L "+t.x1+","+(50-t.y1)+" Z"}var r="http://www.w3.org/2000/svg";s.prototype=new i,s.prototype._create=function(){this.isEnabled=!0,this.isPrevious=this.direction==-1;var t=this.parent.options.rightToLeft?1:-1;this.isLeft=this.direction==t;var e=this.element=document.createElement("button");e.className="flickity-prev-next-button",e.className+=this.isPrevious?" previous":" next",e.setAttribute("type","button"),this.disable(),e.setAttribute("aria-label",this.isPrevious?"previous":"next");var i=this.createSVG();e.appendChild(i),this.on("tap",this.onTap),this.parent.on("select",this.update.bind(this)),this.on("pointerDown",this.parent.childUIPointerDown.bind(this.parent))},s.prototype.activate=function(){this.bindTap(this.element),this.element.addEventListener("click",this),this.parent.element.appendChild(this.element)},s.prototype.deactivate=function(){this.parent.element.removeChild(this.element),i.prototype.destroy.call(this),this.element.removeEventListener("click",this)},s.prototype.createSVG=function(){var t=document.createElementNS(r,"svg");t.setAttribute("viewBox","0 0 100 100");var e=document.createElementNS(r,"path"),i=o(this.parent.options.arrowShape);return e.setAttribute("d",i),e.setAttribute("class","arrow"),this.isLeft||e.setAttribute("transform","translate(100, 100) rotate(180) "),t.appendChild(e),t},s.prototype.onTap=function(){if(this.isEnabled){this.parent.uiChange();var t=this.isPrevious?"previous":"next";this.parent[t]()}},s.prototype.handleEvent=n.handleEvent,s.prototype.onclick=function(){var t=document.activeElement;t&&t==this.element&&this.onTap()},s.prototype.enable=function(){this.isEnabled||(this.element.disabled=!1,this.isEnabled=!0)},s.prototype.disable=function(){this.isEnabled&&(this.element.disabled=!0,this.isEnabled=!1)},s.prototype.update=function(){var t=this.parent.slides;if(this.parent.options.wrapAround&&t.length>1)return void this.enable();var e=t.length?t.length-1:0,i=this.isPrevious?0:e,n=this.parent.selectedIndex==i?"disable":"enable";this[n]()},s.prototype.destroy=function(){this.deactivate()},n.extend(e.defaults,{prevNextButtons:!0,arrowShape:{x0:10,x1:60,y1:50,x2:70,y2:40,x3:30}}),e.createMethods.push("_createPrevNextButtons");var a=e.prototype;return a._createPrevNextButtons=function(){this.options.prevNextButtons&&(this.prevButton=new s((-1),this),this.nextButton=new s(1,this),this.on("activate",this.activatePrevNextButtons))},a.activatePrevNextButtons=function(){this.prevButton.activate(),this.nextButton.activate(),this.on("deactivate",this.deactivatePrevNextButtons)},a.deactivatePrevNextButtons=function(){this.prevButton.deactivate(),this.nextButton.deactivate(),this.off("deactivate",this.deactivatePrevNextButtons)},e.PrevNextButton=s,e}),function(t,e){"function"==typeof define&&define.amd?define("flickity/js/page-dots",["./flickity","tap-listener/tap-listener","fizzy-ui-utils/utils"],function(i,n,s){return e(t,i,n,s)}):"object"==typeof module&&module.exports?module.exports=e(t,require("./flickity"),require("tap-listener"),require("fizzy-ui-utils")):e(t,t.Flickity,t.TapListener,t.fizzyUIUtils)}(window,function(t,e,i,n){function s(t){this.parent=t,this._create()}s.prototype=new i,s.prototype._create=function(){this.holder=document.createElement("ol"),this.holder.className="flickity-page-dots",this.dots=[],this.on("tap",this.onTap),this.on("pointerDown",this.parent.childUIPointerDown.bind(this.parent))},s.prototype.activate=function(){this.setDots(),this.bindTap(this.holder),this.parent.element.appendChild(this.holder)},s.prototype.deactivate=function(){this.parent.element.removeChild(this.holder),i.prototype.destroy.call(this)},s.prototype.setDots=function(){var t=this.parent.slides.length-this.dots.length;t>0?this.addDots(t):t<0&&this.removeDots(-t)},s.prototype.addDots=function(t){for(var e=document.createDocumentFragment(),i=[];t;){var n=document.createElement("li");n.className="dot",e.appendChild(n),i.push(n),t--}this.holder.appendChild(e),this.dots=this.dots.concat(i)},s.prototype.removeDots=function(t){var e=this.dots.splice(this.dots.length-t,t);e.forEach(function(t){this.holder.removeChild(t)},this)},s.prototype.updateSelected=function(){this.selectedDot&&(this.selectedDot.className="dot"),this.dots.length&&(this.selectedDot=this.dots[this.parent.selectedIndex],this.selectedDot.className="dot is-selected")},s.prototype.onTap=function(t){var e=t.target;if("LI"==e.nodeName){this.parent.uiChange();var i=this.dots.indexOf(e);this.parent.select(i)}},s.prototype.destroy=function(){this.deactivate()},e.PageDots=s,n.extend(e.defaults,{pageDots:!0}),e.createMethods.push("_createPageDots");var o=e.prototype;return o._createPageDots=function(){this.options.pageDots&&(this.pageDots=new s(this),this.on("activate",this.activatePageDots),this.on("select",this.updateSelectedPageDots),this.on("cellChange",this.updatePageDots),this.on("resize",this.updatePageDots),this.on("deactivate",this.deactivatePageDots))},o.activatePageDots=function(){this.pageDots.activate()},o.updateSelectedPageDots=function(){this.pageDots.updateSelected()},o.updatePageDots=function(){this.pageDots.setDots()},o.deactivatePageDots=function(){this.pageDots.deactivate()},e.PageDots=s,e}),function(t,e){"function"==typeof define&&define.amd?define("flickity/js/player",["ev-emitter/ev-emitter","fizzy-ui-utils/utils","./flickity"],function(t,i,n){return e(t,i,n)}):"object"==typeof module&&module.exports?module.exports=e(require("ev-emitter"),require("fizzy-ui-utils"),require("./flickity")):e(t.EvEmitter,t.fizzyUIUtils,t.Flickity)}(window,function(t,e,i){function n(t){this.parent=t,this.state="stopped",o&&(this.onVisibilityChange=function(){this.visibilityChange()}.bind(this),this.onVisibilityPlay=function(){this.visibilityPlay()}.bind(this))}var s,o;"hidden"in document?(s="hidden",o="visibilitychange"):"webkitHidden"in document&&(s="webkitHidden",o="webkitvisibilitychange"),n.prototype=Object.create(t.prototype),n.prototype.play=function(){if("playing"!=this.state){var t=document[s];if(o&&t)return void document.addEventListener(o,this.onVisibilityPlay);this.state="playing",o&&document.addEventListener(o,this.onVisibilityChange),this.tick()}},n.prototype.tick=function(){if("playing"==this.state){var t=this.parent.options.autoPlay;t="number"==typeof t?t:3e3;var e=this;this.clear(),this.timeout=setTimeout(function(){e.parent.next(!0),e.tick()},t)}},n.prototype.stop=function(){this.state="stopped",this.clear(),o&&document.removeEventListener(o,this.onVisibilityChange)},n.prototype.clear=function(){clearTimeout(this.timeout)},n.prototype.pause=function(){"playing"==this.state&&(this.state="paused",this.clear())},n.prototype.unpause=function(){"paused"==this.state&&this.play()},n.prototype.visibilityChange=function(){var t=document[s];this[t?"pause":"unpause"]()},n.prototype.visibilityPlay=function(){this.play(),document.removeEventListener(o,this.onVisibilityPlay)},e.extend(i.defaults,{pauseAutoPlayOnHover:!0}),i.createMethods.push("_createPlayer");var r=i.prototype;return r._createPlayer=function(){this.player=new n(this),this.on("activate",this.activatePlayer),this.on("uiChange",this.stopPlayer),this.on("pointerDown",this.stopPlayer),this.on("deactivate",this.deactivatePlayer)},r.activatePlayer=function(){this.options.autoPlay&&(this.player.play(),this.element.addEventListener("mouseenter",this))},r.playPlayer=function(){this.player.play()},r.stopPlayer=function(){this.player.stop()},r.pausePlayer=function(){this.player.pause()},r.unpausePlayer=function(){this.player.unpause()},r.deactivatePlayer=function(){this.player.stop(),this.element.removeEventListener("mouseenter",this)},r.onmouseenter=function(){this.options.pauseAutoPlayOnHover&&(this.player.pause(),this.element.addEventListener("mouseleave",this))},r.onmouseleave=function(){this.player.unpause(),this.element.removeEventListener("mouseleave",this)},i.Player=n,i}),function(t,e){"function"==typeof define&&define.amd?define("flickity/js/add-remove-cell",["./flickity","fizzy-ui-utils/utils"],function(i,n){return e(t,i,n)}):"object"==typeof module&&module.exports?module.exports=e(t,require("./flickity"),require("fizzy-ui-utils")):e(t,t.Flickity,t.fizzyUIUtils)}(window,function(t,e,i){function n(t){var e=document.createDocumentFragment();return t.forEach(function(t){e.appendChild(t.element)}),e}var s=e.prototype;return s.insert=function(t,e){var i=this._makeCells(t);if(i&&i.length){var s=this.cells.length;e=void 0===e?s:e;var o=n(i),r=e==s;if(r)this.slider.appendChild(o);else{var a=this.cells[e].element;this.slider.insertBefore(o,a)}if(0===e)this.cells=i.concat(this.cells);else if(r)this.cells=this.cells.concat(i);else{var l=this.cells.splice(e,s-e);this.cells=this.cells.concat(i).concat(l)}this._sizeCells(i);var h=e>this.selectedIndex?0:i.length;this._cellAddedRemoved(e,h)}},s.append=function(t){this.insert(t,this.cells.length)},s.prepend=function(t){this.insert(t,0)},s.remove=function(t){var e,n,s=this.getCells(t),o=0,r=s.length;for(e=0;e<r;e++){n=s[e];var a=this.cells.indexOf(n)<this.selectedIndex;o-=a?1:0}for(e=0;e<r;e++)n=s[e],n.remove(),i.removeFrom(this.cells,n);s.length&&this._cellAddedRemoved(0,o)},s._cellAddedRemoved=function(t,e){e=e||0,this.selectedIndex+=e,this.selectedIndex=Math.max(0,Math.min(this.slides.length-1,this.selectedIndex)),this.cellChange(t,!0),this.emitEvent("cellAddedRemoved",[t,e])},s.cellSizeChange=function(t){var e=this.getCell(t);if(e){e.getSize();var i=this.cells.indexOf(e);this.cellChange(i)}},s.cellChange=function(t,e){var i=this.slideableWidth;if(this._positionCells(t),this._getWrapShiftCells(),this.setGallerySize(),this.emitEvent("cellChange",[t]),this.options.freeScroll){var n=i-this.slideableWidth;this.x+=n*this.cellAlign,this.positionSlider()}else e&&this.positionSliderAtSelected(),this.select(this.selectedIndex)},e}),function(t,e){"function"==typeof define&&define.amd?define("flickity/js/lazyload",["./flickity","fizzy-ui-utils/utils"],function(i,n){return e(t,i,n)}):"object"==typeof module&&module.exports?module.exports=e(t,require("./flickity"),require("fizzy-ui-utils")):e(t,t.Flickity,t.fizzyUIUtils)}(window,function(t,e,i){"use strict";function n(t){if("IMG"==t.nodeName&&t.getAttribute("data-flickity-lazyload"))return[t];var e=t.querySelectorAll("img[data-flickity-lazyload]");return i.makeArray(e)}function s(t,e){this.img=t,this.flickity=e,this.load()}e.createMethods.push("_createLazyload");var o=e.prototype;return o._createLazyload=function(){this.on("select",this.lazyLoad)},o.lazyLoad=function(){var t=this.options.lazyLoad;if(t){var e="number"==typeof t?t:0,i=this.getAdjacentCellElements(e),o=[];i.forEach(function(t){var e=n(t);o=o.concat(e)}),o.forEach(function(t){new s(t,this)},this)}},s.prototype.handleEvent=i.handleEvent,s.prototype.load=function(){this.img.addEventListener("load",this),this.img.addEventListener("error",this),this.img.src=this.img.getAttribute("data-flickity-lazyload"),this.img.removeAttribute("data-flickity-lazyload")},s.prototype.onload=function(t){this.complete(t,"flickity-lazyloaded")},s.prototype.onerror=function(t){this.complete(t,"flickity-lazyerror")},s.prototype.complete=function(t,e){this.img.removeEventListener("load",this),this.img.removeEventListener("error",this);var i=this.flickity.getParentCell(this.img),n=i&&i.element;this.flickity.cellSizeChange(n),this.img.classList.add(e),this.flickity.dispatchEvent("lazyLoad",t,n)},e.LazyLoader=s,e}),function(t,e){"function"==typeof define&&define.amd?define("flickity/js/index",["./flickity","./drag","./prev-next-button","./page-dots","./player","./add-remove-cell","./lazyload"],e):"object"==typeof module&&module.exports&&(module.exports=e(require("./flickity"),require("./drag"),require("./prev-next-button"),require("./page-dots"),require("./player"),require("./add-remove-cell"),require("./lazyload")))}(window,function(t){return t}),function(t,e){"function"==typeof define&&define.amd?define("flickity-as-nav-for/as-nav-for",["flickity/js/index","fizzy-ui-utils/utils"],e):"object"==typeof module&&module.exports?module.exports=e(require("flickity"),require("fizzy-ui-utils")):t.Flickity=e(t.Flickity,t.fizzyUIUtils)}(window,function(t,e){function i(t,e,i){return(e-t)*i+t}t.createMethods.push("_createAsNavFor");var n=t.prototype;return n._createAsNavFor=function(){this.on("activate",this.activateAsNavFor),this.on("deactivate",this.deactivateAsNavFor),this.on("destroy",this.destroyAsNavFor);var t=this.options.asNavFor;if(t){var e=this;setTimeout(function(){e.setNavCompanion(t)})}},n.setNavCompanion=function(i){i=e.getQueryElement(i);var n=t.data(i);if(n&&n!=this){this.navCompanion=n;var s=this;this.onNavCompanionSelect=function(){s.navCompanionSelect()},n.on("select",this.onNavCompanionSelect),this.on("staticClick",this.onNavStaticClick),this.navCompanionSelect(!0)}},n.navCompanionSelect=function(t){if(this.navCompanion){var e=this.navCompanion.selectedCells[0],n=this.navCompanion.cells.indexOf(e),s=n+this.navCompanion.selectedCells.length-1,o=Math.floor(i(n,s,this.navCompanion.cellAlign));if(this.selectCell(o,!1,t),this.removeNavSelectedElements(),!(o>=this.cells.length)){var r=this.cells.slice(n,s+1);this.navSelectedElements=r.map(function(t){return t.element}),this.changeNavSelectedClass("add")}}},n.changeNavSelectedClass=function(t){this.navSelectedElements.forEach(function(e){e.classList[t]("is-nav-selected")})},n.activateAsNavFor=function(){this.navCompanionSelect(!0)},n.removeNavSelectedElements=function(){this.navSelectedElements&&(this.changeNavSelectedClass("remove"),delete this.navSelectedElements)},n.onNavStaticClick=function(t,e,i,n){"number"==typeof n&&this.navCompanion.selectCell(n)},n.deactivateAsNavFor=function(){this.removeNavSelectedElements()},n.destroyAsNavFor=function(){this.navCompanion&&(this.navCompanion.off("select",this.onNavCompanionSelect),this.off("staticClick",this.onNavStaticClick),delete this.navCompanion)},t}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("imagesloaded/imagesloaded",["ev-emitter/ev-emitter"],function(i){return e(t,i)}):"object"==typeof module&&module.exports?module.exports=e(t,require("ev-emitter")):t.imagesLoaded=e(t,t.EvEmitter)}(window,function(t,e){function i(t,e){for(var i in e)t[i]=e[i];return t}function n(t){var e=[];if(Array.isArray(t))e=t;else if("number"==typeof t.length)for(var i=0;i<t.length;i++)e.push(t[i]);else e.push(t);return e}function s(t,e,o){return this instanceof s?("string"==typeof t&&(t=document.querySelectorAll(t)),this.elements=n(t),this.options=i({},this.options),"function"==typeof e?o=e:i(this.options,e),o&&this.on("always",o),this.getImages(),a&&(this.jqDeferred=new a.Deferred),void setTimeout(function(){this.check()}.bind(this))):new s(t,e,o)}function o(t){this.img=t}function r(t,e){this.url=t,this.element=e,this.img=new Image}var a=t.jQuery,l=t.console;s.prototype=Object.create(e.prototype),s.prototype.options={},s.prototype.getImages=function(){this.images=[],this.elements.forEach(this.addElementImages,this)},s.prototype.addElementImages=function(t){"IMG"==t.nodeName&&this.addImage(t),this.options.background===!0&&this.addElementBackgroundImages(t);var e=t.nodeType;if(e&&h[e]){for(var i=t.querySelectorAll("img"),n=0;n<i.length;n++){var s=i[n];this.addImage(s)}if("string"==typeof this.options.background){var o=t.querySelectorAll(this.options.background);for(n=0;n<o.length;n++){var r=o[n];this.addElementBackgroundImages(r)}}}};var h={1:!0,9:!0,11:!0};return s.prototype.addElementBackgroundImages=function(t){var e=getComputedStyle(t);if(e)for(var i=/url\((['"])?(.*?)\1\)/gi,n=i.exec(e.backgroundImage);null!==n;){var s=n&&n[2];s&&this.addBackground(s,t),n=i.exec(e.backgroundImage)}},s.prototype.addImage=function(t){var e=new o(t);this.images.push(e)},s.prototype.addBackground=function(t,e){var i=new r(t,e);this.images.push(i)},s.prototype.check=function(){function t(t,i,n){setTimeout(function(){e.progress(t,i,n)})}var e=this;return this.progressedCount=0,this.hasAnyBroken=!1,this.images.length?void this.images.forEach(function(e){e.once("progress",t),e.check()}):void this.complete()},s.prototype.progress=function(t,e,i){this.progressedCount++,this.hasAnyBroken=this.hasAnyBroken||!t.isLoaded,this.emitEvent("progress",[this,t,e]),this.jqDeferred&&this.jqDeferred.notify&&this.jqDeferred.notify(this,t),this.progressedCount==this.images.length&&this.complete(),this.options.debug&&l&&l.log("progress: "+i,t,e)},s.prototype.complete=function(){var t=this.hasAnyBroken?"fail":"done";if(this.isComplete=!0,this.emitEvent(t,[this]),this.emitEvent("always",[this]),this.jqDeferred){var e=this.hasAnyBroken?"reject":"resolve";this.jqDeferred[e](this)}},o.prototype=Object.create(e.prototype),o.prototype.check=function(){var t=this.getIsImageComplete();return t?void this.confirm(0!==this.img.naturalWidth,"naturalWidth"):(this.proxyImage=new Image,this.proxyImage.addEventListener("load",this),this.proxyImage.addEventListener("error",this),this.img.addEventListener("load",this),this.img.addEventListener("error",this),void(this.proxyImage.src=this.img.src))},o.prototype.getIsImageComplete=function(){return this.img.complete&&void 0!==this.img.naturalWidth},o.prototype.confirm=function(t,e){this.isLoaded=t,this.emitEvent("progress",[this,this.img,e])},o.prototype.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},o.prototype.onload=function(){this.confirm(!0,"onload"),this.unbindEvents()},o.prototype.onerror=function(){this.confirm(!1,"onerror"),this.unbindEvents()},o.prototype.unbindEvents=function(){this.proxyImage.removeEventListener("load",this),this.proxyImage.removeEventListener("error",this),this.img.removeEventListener("load",this),this.img.removeEventListener("error",this)},r.prototype=Object.create(o.prototype),r.prototype.check=function(){this.img.addEventListener("load",this),this.img.addEventListener("error",this),this.img.src=this.url;var t=this.getIsImageComplete();t&&(this.confirm(0!==this.img.naturalWidth,"naturalWidth"),this.unbindEvents())},r.prototype.unbindEvents=function(){this.img.removeEventListener("load",this),this.img.removeEventListener("error",this)},r.prototype.confirm=function(t,e){this.isLoaded=t,this.emitEvent("progress",[this,this.element,e])},s.makeJQueryPlugin=function(e){e=e||t.jQuery,e&&(a=e,a.fn.imagesLoaded=function(t,e){var i=new s(this,t,e);return i.jqDeferred.promise(a(this))})},s.makeJQueryPlugin(),s}),function(t,e){"function"==typeof define&&define.amd?define(["flickity/js/index","imagesloaded/imagesloaded"],function(i,n){return e(t,i,n)}):"object"==typeof module&&module.exports?module.exports=e(t,require("flickity"),require("imagesloaded")):t.Flickity=e(t,t.Flickity,t.imagesLoaded)}(window,function(t,e,i){"use strict";e.createMethods.push("_createImagesLoaded");var n=e.prototype;return n._createImagesLoaded=function(){this.on("activate",this.imagesLoaded)},n.imagesLoaded=function(){function t(t,i){var n=e.getParentCell(i.img);e.cellSizeChange(n&&n.element),e.options.freeScroll||e.positionSliderAtSelected()}if(this.options.imagesLoaded){var e=this;i(this.slider).on("progress",t)}},e});

/*! jQuery v2.2.4 | (c) jQuery Foundation | jquery.org/license */
!function(a,b){"object"==typeof module&&"object"==typeof module.exports?module.exports=a.document?b(a,!0):function(a){if(!a.document)throw new Error("jQuery requires a window with a document");return b(a)}:b(a)}("undefined"!=typeof window?window:this,function(a,b){var c=[],d=a.document,e=c.slice,f=c.concat,g=c.push,h=c.indexOf,i={},j=i.toString,k=i.hasOwnProperty,l={},m="2.2.4",n=function(a,b){return new n.fn.init(a,b)},o=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,p=/^-ms-/,q=/-([\da-z])/gi,r=function(a,b){return b.toUpperCase()};n.fn=n.prototype={jquery:m,constructor:n,selector:"",length:0,toArray:function(){return e.call(this)},get:function(a){return null!=a?0>a?this[a+this.length]:this[a]:e.call(this)},pushStack:function(a){var b=n.merge(this.constructor(),a);return b.prevObject=this,b.context=this.context,b},each:function(a){return n.each(this,a)},map:function(a){return this.pushStack(n.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return this.pushStack(e.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(a){var b=this.length,c=+a+(0>a?b:0);return this.pushStack(c>=0&&b>c?[this[c]]:[])},end:function(){return this.prevObject||this.constructor()},push:g,sort:c.sort,splice:c.splice},n.extend=n.fn.extend=function(){var a,b,c,d,e,f,g=arguments[0]||{},h=1,i=arguments.length,j=!1;for("boolean"==typeof g&&(j=g,g=arguments[h]||{},h++),"object"==typeof g||n.isFunction(g)||(g={}),h===i&&(g=this,h--);i>h;h++)if(null!=(a=arguments[h]))for(b in a)c=g[b],d=a[b],g!==d&&(j&&d&&(n.isPlainObject(d)||(e=n.isArray(d)))?(e?(e=!1,f=c&&n.isArray(c)?c:[]):f=c&&n.isPlainObject(c)?c:{},g[b]=n.extend(j,f,d)):void 0!==d&&(g[b]=d));return g},n.extend({expando:"jQuery"+(m+Math.random()).replace(/\D/g,""),isReady:!0,error:function(a){throw new Error(a)},noop:function(){},isFunction:function(a){return"function"===n.type(a)},isArray:Array.isArray,isWindow:function(a){return null!=a&&a===a.window},isNumeric:function(a){var b=a&&a.toString();return!n.isArray(a)&&b-parseFloat(b)+1>=0},isPlainObject:function(a){var b;if("object"!==n.type(a)||a.nodeType||n.isWindow(a))return!1;if(a.constructor&&!k.call(a,"constructor")&&!k.call(a.constructor.prototype||{},"isPrototypeOf"))return!1;for(b in a);return void 0===b||k.call(a,b)},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},type:function(a){return null==a?a+"":"object"==typeof a||"function"==typeof a?i[j.call(a)]||"object":typeof a},globalEval:function(a){var b,c=eval;a=n.trim(a),a&&(1===a.indexOf("use strict")?(b=d.createElement("script"),b.text=a,d.head.appendChild(b).parentNode.removeChild(b)):c(a))},camelCase:function(a){return a.replace(p,"ms-").replace(q,r)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()},each:function(a,b){var c,d=0;if(s(a)){for(c=a.length;c>d;d++)if(b.call(a[d],d,a[d])===!1)break}else for(d in a)if(b.call(a[d],d,a[d])===!1)break;return a},trim:function(a){return null==a?"":(a+"").replace(o,"")},makeArray:function(a,b){var c=b||[];return null!=a&&(s(Object(a))?n.merge(c,"string"==typeof a?[a]:a):g.call(c,a)),c},inArray:function(a,b,c){return null==b?-1:h.call(b,a,c)},merge:function(a,b){for(var c=+b.length,d=0,e=a.length;c>d;d++)a[e++]=b[d];return a.length=e,a},grep:function(a,b,c){for(var d,e=[],f=0,g=a.length,h=!c;g>f;f++)d=!b(a[f],f),d!==h&&e.push(a[f]);return e},map:function(a,b,c){var d,e,g=0,h=[];if(s(a))for(d=a.length;d>g;g++)e=b(a[g],g,c),null!=e&&h.push(e);else for(g in a)e=b(a[g],g,c),null!=e&&h.push(e);return f.apply([],h)},guid:1,proxy:function(a,b){var c,d,f;return"string"==typeof b&&(c=a[b],b=a,a=c),n.isFunction(a)?(d=e.call(arguments,2),f=function(){return a.apply(b||this,d.concat(e.call(arguments)))},f.guid=a.guid=a.guid||n.guid++,f):void 0},now:Date.now,support:l}),"function"==typeof Symbol&&(n.fn[Symbol.iterator]=c[Symbol.iterator]),n.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),function(a,b){i["[object "+b+"]"]=b.toLowerCase()});function s(a){var b=!!a&&"length"in a&&a.length,c=n.type(a);return"function"===c||n.isWindow(a)?!1:"array"===c||0===b||"number"==typeof b&&b>0&&b-1 in a}var t=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u="sizzle"+1*new Date,v=a.document,w=0,x=0,y=ga(),z=ga(),A=ga(),B=function(a,b){return a===b&&(l=!0),0},C=1<<31,D={}.hasOwnProperty,E=[],F=E.pop,G=E.push,H=E.push,I=E.slice,J=function(a,b){for(var c=0,d=a.length;d>c;c++)if(a[c]===b)return c;return-1},K="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",L="[\\x20\\t\\r\\n\\f]",M="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",N="\\["+L+"*("+M+")(?:"+L+"*([*^$|!~]?=)"+L+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+M+"))|)"+L+"*\\]",O=":("+M+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+N+")*)|.*)\\)|)",P=new RegExp(L+"+","g"),Q=new RegExp("^"+L+"+|((?:^|[^\\\\])(?:\\\\.)*)"+L+"+$","g"),R=new RegExp("^"+L+"*,"+L+"*"),S=new RegExp("^"+L+"*([>+~]|"+L+")"+L+"*"),T=new RegExp("="+L+"*([^\\]'\"]*?)"+L+"*\\]","g"),U=new RegExp(O),V=new RegExp("^"+M+"$"),W={ID:new RegExp("^#("+M+")"),CLASS:new RegExp("^\\.("+M+")"),TAG:new RegExp("^("+M+"|[*])"),ATTR:new RegExp("^"+N),PSEUDO:new RegExp("^"+O),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+L+"*(even|odd|(([+-]|)(\\d*)n|)"+L+"*(?:([+-]|)"+L+"*(\\d+)|))"+L+"*\\)|)","i"),bool:new RegExp("^(?:"+K+")$","i"),needsContext:new RegExp("^"+L+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+L+"*((?:-\\d)?\\d*)"+L+"*\\)|)(?=[^-]|$)","i")},X=/^(?:input|select|textarea|button)$/i,Y=/^h\d$/i,Z=/^[^{]+\{\s*\[native \w/,$=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,_=/[+~]/,aa=/'|\\/g,ba=new RegExp("\\\\([\\da-f]{1,6}"+L+"?|("+L+")|.)","ig"),ca=function(a,b,c){var d="0x"+b-65536;return d!==d||c?b:0>d?String.fromCharCode(d+65536):String.fromCharCode(d>>10|55296,1023&d|56320)},da=function(){m()};try{H.apply(E=I.call(v.childNodes),v.childNodes),E[v.childNodes.length].nodeType}catch(ea){H={apply:E.length?function(a,b){G.apply(a,I.call(b))}:function(a,b){var c=a.length,d=0;while(a[c++]=b[d++]);a.length=c-1}}}function fa(a,b,d,e){var f,h,j,k,l,o,r,s,w=b&&b.ownerDocument,x=b?b.nodeType:9;if(d=d||[],"string"!=typeof a||!a||1!==x&&9!==x&&11!==x)return d;if(!e&&((b?b.ownerDocument||b:v)!==n&&m(b),b=b||n,p)){if(11!==x&&(o=$.exec(a)))if(f=o[1]){if(9===x){if(!(j=b.getElementById(f)))return d;if(j.id===f)return d.push(j),d}else if(w&&(j=w.getElementById(f))&&t(b,j)&&j.id===f)return d.push(j),d}else{if(o[2])return H.apply(d,b.getElementsByTagName(a)),d;if((f=o[3])&&c.getElementsByClassName&&b.getElementsByClassName)return H.apply(d,b.getElementsByClassName(f)),d}if(c.qsa&&!A[a+" "]&&(!q||!q.test(a))){if(1!==x)w=b,s=a;else if("object"!==b.nodeName.toLowerCase()){(k=b.getAttribute("id"))?k=k.replace(aa,"\\$&"):b.setAttribute("id",k=u),r=g(a),h=r.length,l=V.test(k)?"#"+k:"[id='"+k+"']";while(h--)r[h]=l+" "+qa(r[h]);s=r.join(","),w=_.test(a)&&oa(b.parentNode)||b}if(s)try{return H.apply(d,w.querySelectorAll(s)),d}catch(y){}finally{k===u&&b.removeAttribute("id")}}}return i(a.replace(Q,"$1"),b,d,e)}function ga(){var a=[];function b(c,e){return a.push(c+" ")>d.cacheLength&&delete b[a.shift()],b[c+" "]=e}return b}function ha(a){return a[u]=!0,a}function ia(a){var b=n.createElement("div");try{return!!a(b)}catch(c){return!1}finally{b.parentNode&&b.parentNode.removeChild(b),b=null}}function ja(a,b){var c=a.split("|"),e=c.length;while(e--)d.attrHandle[c[e]]=b}function ka(a,b){var c=b&&a,d=c&&1===a.nodeType&&1===b.nodeType&&(~b.sourceIndex||C)-(~a.sourceIndex||C);if(d)return d;if(c)while(c=c.nextSibling)if(c===b)return-1;return a?1:-1}function la(a){return function(b){var c=b.nodeName.toLowerCase();return"input"===c&&b.type===a}}function ma(a){return function(b){var c=b.nodeName.toLowerCase();return("input"===c||"button"===c)&&b.type===a}}function na(a){return ha(function(b){return b=+b,ha(function(c,d){var e,f=a([],c.length,b),g=f.length;while(g--)c[e=f[g]]&&(c[e]=!(d[e]=c[e]))})})}function oa(a){return a&&"undefined"!=typeof a.getElementsByTagName&&a}c=fa.support={},f=fa.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return b?"HTML"!==b.nodeName:!1},m=fa.setDocument=function(a){var b,e,g=a?a.ownerDocument||a:v;return g!==n&&9===g.nodeType&&g.documentElement?(n=g,o=n.documentElement,p=!f(n),(e=n.defaultView)&&e.top!==e&&(e.addEventListener?e.addEventListener("unload",da,!1):e.attachEvent&&e.attachEvent("onunload",da)),c.attributes=ia(function(a){return a.className="i",!a.getAttribute("className")}),c.getElementsByTagName=ia(function(a){return a.appendChild(n.createComment("")),!a.getElementsByTagName("*").length}),c.getElementsByClassName=Z.test(n.getElementsByClassName),c.getById=ia(function(a){return o.appendChild(a).id=u,!n.getElementsByName||!n.getElementsByName(u).length}),c.getById?(d.find.ID=function(a,b){if("undefined"!=typeof b.getElementById&&p){var c=b.getElementById(a);return c?[c]:[]}},d.filter.ID=function(a){var b=a.replace(ba,ca);return function(a){return a.getAttribute("id")===b}}):(delete d.find.ID,d.filter.ID=function(a){var b=a.replace(ba,ca);return function(a){var c="undefined"!=typeof a.getAttributeNode&&a.getAttributeNode("id");return c&&c.value===b}}),d.find.TAG=c.getElementsByTagName?function(a,b){return"undefined"!=typeof b.getElementsByTagName?b.getElementsByTagName(a):c.qsa?b.querySelectorAll(a):void 0}:function(a,b){var c,d=[],e=0,f=b.getElementsByTagName(a);if("*"===a){while(c=f[e++])1===c.nodeType&&d.push(c);return d}return f},d.find.CLASS=c.getElementsByClassName&&function(a,b){return"undefined"!=typeof b.getElementsByClassName&&p?b.getElementsByClassName(a):void 0},r=[],q=[],(c.qsa=Z.test(n.querySelectorAll))&&(ia(function(a){o.appendChild(a).innerHTML="<a id='"+u+"'></a><select id='"+u+"-\r\\' msallowcapture=''><option selected=''></option></select>",a.querySelectorAll("[msallowcapture^='']").length&&q.push("[*^$]="+L+"*(?:''|\"\")"),a.querySelectorAll("[selected]").length||q.push("\\["+L+"*(?:value|"+K+")"),a.querySelectorAll("[id~="+u+"-]").length||q.push("~="),a.querySelectorAll(":checked").length||q.push(":checked"),a.querySelectorAll("a#"+u+"+*").length||q.push(".#.+[+~]")}),ia(function(a){var b=n.createElement("input");b.setAttribute("type","hidden"),a.appendChild(b).setAttribute("name","D"),a.querySelectorAll("[name=d]").length&&q.push("name"+L+"*[*^$|!~]?="),a.querySelectorAll(":enabled").length||q.push(":enabled",":disabled"),a.querySelectorAll("*,:x"),q.push(",.*:")})),(c.matchesSelector=Z.test(s=o.matches||o.webkitMatchesSelector||o.mozMatchesSelector||o.oMatchesSelector||o.msMatchesSelector))&&ia(function(a){c.disconnectedMatch=s.call(a,"div"),s.call(a,"[s!='']:x"),r.push("!=",O)}),q=q.length&&new RegExp(q.join("|")),r=r.length&&new RegExp(r.join("|")),b=Z.test(o.compareDocumentPosition),t=b||Z.test(o.contains)?function(a,b){var c=9===a.nodeType?a.documentElement:a,d=b&&b.parentNode;return a===d||!(!d||1!==d.nodeType||!(c.contains?c.contains(d):a.compareDocumentPosition&&16&a.compareDocumentPosition(d)))}:function(a,b){if(b)while(b=b.parentNode)if(b===a)return!0;return!1},B=b?function(a,b){if(a===b)return l=!0,0;var d=!a.compareDocumentPosition-!b.compareDocumentPosition;return d?d:(d=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):1,1&d||!c.sortDetached&&b.compareDocumentPosition(a)===d?a===n||a.ownerDocument===v&&t(v,a)?-1:b===n||b.ownerDocument===v&&t(v,b)?1:k?J(k,a)-J(k,b):0:4&d?-1:1)}:function(a,b){if(a===b)return l=!0,0;var c,d=0,e=a.parentNode,f=b.parentNode,g=[a],h=[b];if(!e||!f)return a===n?-1:b===n?1:e?-1:f?1:k?J(k,a)-J(k,b):0;if(e===f)return ka(a,b);c=a;while(c=c.parentNode)g.unshift(c);c=b;while(c=c.parentNode)h.unshift(c);while(g[d]===h[d])d++;return d?ka(g[d],h[d]):g[d]===v?-1:h[d]===v?1:0},n):n},fa.matches=function(a,b){return fa(a,null,null,b)},fa.matchesSelector=function(a,b){if((a.ownerDocument||a)!==n&&m(a),b=b.replace(T,"='$1']"),c.matchesSelector&&p&&!A[b+" "]&&(!r||!r.test(b))&&(!q||!q.test(b)))try{var d=s.call(a,b);if(d||c.disconnectedMatch||a.document&&11!==a.document.nodeType)return d}catch(e){}return fa(b,n,null,[a]).length>0},fa.contains=function(a,b){return(a.ownerDocument||a)!==n&&m(a),t(a,b)},fa.attr=function(a,b){(a.ownerDocument||a)!==n&&m(a);var e=d.attrHandle[b.toLowerCase()],f=e&&D.call(d.attrHandle,b.toLowerCase())?e(a,b,!p):void 0;return void 0!==f?f:c.attributes||!p?a.getAttribute(b):(f=a.getAttributeNode(b))&&f.specified?f.value:null},fa.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},fa.uniqueSort=function(a){var b,d=[],e=0,f=0;if(l=!c.detectDuplicates,k=!c.sortStable&&a.slice(0),a.sort(B),l){while(b=a[f++])b===a[f]&&(e=d.push(f));while(e--)a.splice(d[e],1)}return k=null,a},e=fa.getText=function(a){var b,c="",d=0,f=a.nodeType;if(f){if(1===f||9===f||11===f){if("string"==typeof a.textContent)return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=e(a)}else if(3===f||4===f)return a.nodeValue}else while(b=a[d++])c+=e(b);return c},d=fa.selectors={cacheLength:50,createPseudo:ha,match:W,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(ba,ca),a[3]=(a[3]||a[4]||a[5]||"").replace(ba,ca),"~="===a[2]&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),"nth"===a[1].slice(0,3)?(a[3]||fa.error(a[0]),a[4]=+(a[4]?a[5]+(a[6]||1):2*("even"===a[3]||"odd"===a[3])),a[5]=+(a[7]+a[8]||"odd"===a[3])):a[3]&&fa.error(a[0]),a},PSEUDO:function(a){var b,c=!a[6]&&a[2];return W.CHILD.test(a[0])?null:(a[3]?a[2]=a[4]||a[5]||"":c&&U.test(c)&&(b=g(c,!0))&&(b=c.indexOf(")",c.length-b)-c.length)&&(a[0]=a[0].slice(0,b),a[2]=c.slice(0,b)),a.slice(0,3))}},filter:{TAG:function(a){var b=a.replace(ba,ca).toLowerCase();return"*"===a?function(){return!0}:function(a){return a.nodeName&&a.nodeName.toLowerCase()===b}},CLASS:function(a){var b=y[a+" "];return b||(b=new RegExp("(^|"+L+")"+a+"("+L+"|$)"))&&y(a,function(a){return b.test("string"==typeof a.className&&a.className||"undefined"!=typeof a.getAttribute&&a.getAttribute("class")||"")})},ATTR:function(a,b,c){return function(d){var e=fa.attr(d,a);return null==e?"!="===b:b?(e+="","="===b?e===c:"!="===b?e!==c:"^="===b?c&&0===e.indexOf(c):"*="===b?c&&e.indexOf(c)>-1:"$="===b?c&&e.slice(-c.length)===c:"~="===b?(" "+e.replace(P," ")+" ").indexOf(c)>-1:"|="===b?e===c||e.slice(0,c.length+1)===c+"-":!1):!0}},CHILD:function(a,b,c,d,e){var f="nth"!==a.slice(0,3),g="last"!==a.slice(-4),h="of-type"===b;return 1===d&&0===e?function(a){return!!a.parentNode}:function(b,c,i){var j,k,l,m,n,o,p=f!==g?"nextSibling":"previousSibling",q=b.parentNode,r=h&&b.nodeName.toLowerCase(),s=!i&&!h,t=!1;if(q){if(f){while(p){m=b;while(m=m[p])if(h?m.nodeName.toLowerCase()===r:1===m.nodeType)return!1;o=p="only"===a&&!o&&"nextSibling"}return!0}if(o=[g?q.firstChild:q.lastChild],g&&s){m=q,l=m[u]||(m[u]={}),k=l[m.uniqueID]||(l[m.uniqueID]={}),j=k[a]||[],n=j[0]===w&&j[1],t=n&&j[2],m=n&&q.childNodes[n];while(m=++n&&m&&m[p]||(t=n=0)||o.pop())if(1===m.nodeType&&++t&&m===b){k[a]=[w,n,t];break}}else if(s&&(m=b,l=m[u]||(m[u]={}),k=l[m.uniqueID]||(l[m.uniqueID]={}),j=k[a]||[],n=j[0]===w&&j[1],t=n),t===!1)while(m=++n&&m&&m[p]||(t=n=0)||o.pop())if((h?m.nodeName.toLowerCase()===r:1===m.nodeType)&&++t&&(s&&(l=m[u]||(m[u]={}),k=l[m.uniqueID]||(l[m.uniqueID]={}),k[a]=[w,t]),m===b))break;return t-=e,t===d||t%d===0&&t/d>=0}}},PSEUDO:function(a,b){var c,e=d.pseudos[a]||d.setFilters[a.toLowerCase()]||fa.error("unsupported pseudo: "+a);return e[u]?e(b):e.length>1?(c=[a,a,"",b],d.setFilters.hasOwnProperty(a.toLowerCase())?ha(function(a,c){var d,f=e(a,b),g=f.length;while(g--)d=J(a,f[g]),a[d]=!(c[d]=f[g])}):function(a){return e(a,0,c)}):e}},pseudos:{not:ha(function(a){var b=[],c=[],d=h(a.replace(Q,"$1"));return d[u]?ha(function(a,b,c,e){var f,g=d(a,null,e,[]),h=a.length;while(h--)(f=g[h])&&(a[h]=!(b[h]=f))}):function(a,e,f){return b[0]=a,d(b,null,f,c),b[0]=null,!c.pop()}}),has:ha(function(a){return function(b){return fa(a,b).length>0}}),contains:ha(function(a){return a=a.replace(ba,ca),function(b){return(b.textContent||b.innerText||e(b)).indexOf(a)>-1}}),lang:ha(function(a){return V.test(a||"")||fa.error("unsupported lang: "+a),a=a.replace(ba,ca).toLowerCase(),function(b){var c;do if(c=p?b.lang:b.getAttribute("xml:lang")||b.getAttribute("lang"))return c=c.toLowerCase(),c===a||0===c.indexOf(a+"-");while((b=b.parentNode)&&1===b.nodeType);return!1}}),target:function(b){var c=a.location&&a.location.hash;return c&&c.slice(1)===b.id},root:function(a){return a===o},focus:function(a){return a===n.activeElement&&(!n.hasFocus||n.hasFocus())&&!!(a.type||a.href||~a.tabIndex)},enabled:function(a){return a.disabled===!1},disabled:function(a){return a.disabled===!0},checked:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&!!a.checked||"option"===b&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},empty:function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType<6)return!1;return!0},parent:function(a){return!d.pseudos.empty(a)},header:function(a){return Y.test(a.nodeName)},input:function(a){return X.test(a.nodeName)},button:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&"button"===a.type||"button"===b},text:function(a){var b;return"input"===a.nodeName.toLowerCase()&&"text"===a.type&&(null==(b=a.getAttribute("type"))||"text"===b.toLowerCase())},first:na(function(){return[0]}),last:na(function(a,b){return[b-1]}),eq:na(function(a,b,c){return[0>c?c+b:c]}),even:na(function(a,b){for(var c=0;b>c;c+=2)a.push(c);return a}),odd:na(function(a,b){for(var c=1;b>c;c+=2)a.push(c);return a}),lt:na(function(a,b,c){for(var d=0>c?c+b:c;--d>=0;)a.push(d);return a}),gt:na(function(a,b,c){for(var d=0>c?c+b:c;++d<b;)a.push(d);return a})}},d.pseudos.nth=d.pseudos.eq;for(b in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})d.pseudos[b]=la(b);for(b in{submit:!0,reset:!0})d.pseudos[b]=ma(b);function pa(){}pa.prototype=d.filters=d.pseudos,d.setFilters=new pa,g=fa.tokenize=function(a,b){var c,e,f,g,h,i,j,k=z[a+" "];if(k)return b?0:k.slice(0);h=a,i=[],j=d.preFilter;while(h){c&&!(e=R.exec(h))||(e&&(h=h.slice(e[0].length)||h),i.push(f=[])),c=!1,(e=S.exec(h))&&(c=e.shift(),f.push({value:c,type:e[0].replace(Q," ")}),h=h.slice(c.length));for(g in d.filter)!(e=W[g].exec(h))||j[g]&&!(e=j[g](e))||(c=e.shift(),f.push({value:c,type:g,matches:e}),h=h.slice(c.length));if(!c)break}return b?h.length:h?fa.error(a):z(a,i).slice(0)};function qa(a){for(var b=0,c=a.length,d="";c>b;b++)d+=a[b].value;return d}function ra(a,b,c){var d=b.dir,e=c&&"parentNode"===d,f=x++;return b.first?function(b,c,f){while(b=b[d])if(1===b.nodeType||e)return a(b,c,f)}:function(b,c,g){var h,i,j,k=[w,f];if(g){while(b=b[d])if((1===b.nodeType||e)&&a(b,c,g))return!0}else while(b=b[d])if(1===b.nodeType||e){if(j=b[u]||(b[u]={}),i=j[b.uniqueID]||(j[b.uniqueID]={}),(h=i[d])&&h[0]===w&&h[1]===f)return k[2]=h[2];if(i[d]=k,k[2]=a(b,c,g))return!0}}}function sa(a){return a.length>1?function(b,c,d){var e=a.length;while(e--)if(!a[e](b,c,d))return!1;return!0}:a[0]}function ta(a,b,c){for(var d=0,e=b.length;e>d;d++)fa(a,b[d],c);return c}function ua(a,b,c,d,e){for(var f,g=[],h=0,i=a.length,j=null!=b;i>h;h++)(f=a[h])&&(c&&!c(f,d,e)||(g.push(f),j&&b.push(h)));return g}function va(a,b,c,d,e,f){return d&&!d[u]&&(d=va(d)),e&&!e[u]&&(e=va(e,f)),ha(function(f,g,h,i){var j,k,l,m=[],n=[],o=g.length,p=f||ta(b||"*",h.nodeType?[h]:h,[]),q=!a||!f&&b?p:ua(p,m,a,h,i),r=c?e||(f?a:o||d)?[]:g:q;if(c&&c(q,r,h,i),d){j=ua(r,n),d(j,[],h,i),k=j.length;while(k--)(l=j[k])&&(r[n[k]]=!(q[n[k]]=l))}if(f){if(e||a){if(e){j=[],k=r.length;while(k--)(l=r[k])&&j.push(q[k]=l);e(null,r=[],j,i)}k=r.length;while(k--)(l=r[k])&&(j=e?J(f,l):m[k])>-1&&(f[j]=!(g[j]=l))}}else r=ua(r===g?r.splice(o,r.length):r),e?e(null,g,r,i):H.apply(g,r)})}function wa(a){for(var b,c,e,f=a.length,g=d.relative[a[0].type],h=g||d.relative[" "],i=g?1:0,k=ra(function(a){return a===b},h,!0),l=ra(function(a){return J(b,a)>-1},h,!0),m=[function(a,c,d){var e=!g&&(d||c!==j)||((b=c).nodeType?k(a,c,d):l(a,c,d));return b=null,e}];f>i;i++)if(c=d.relative[a[i].type])m=[ra(sa(m),c)];else{if(c=d.filter[a[i].type].apply(null,a[i].matches),c[u]){for(e=++i;f>e;e++)if(d.relative[a[e].type])break;return va(i>1&&sa(m),i>1&&qa(a.slice(0,i-1).concat({value:" "===a[i-2].type?"*":""})).replace(Q,"$1"),c,e>i&&wa(a.slice(i,e)),f>e&&wa(a=a.slice(e)),f>e&&qa(a))}m.push(c)}return sa(m)}function xa(a,b){var c=b.length>0,e=a.length>0,f=function(f,g,h,i,k){var l,o,q,r=0,s="0",t=f&&[],u=[],v=j,x=f||e&&d.find.TAG("*",k),y=w+=null==v?1:Math.random()||.1,z=x.length;for(k&&(j=g===n||g||k);s!==z&&null!=(l=x[s]);s++){if(e&&l){o=0,g||l.ownerDocument===n||(m(l),h=!p);while(q=a[o++])if(q(l,g||n,h)){i.push(l);break}k&&(w=y)}c&&((l=!q&&l)&&r--,f&&t.push(l))}if(r+=s,c&&s!==r){o=0;while(q=b[o++])q(t,u,g,h);if(f){if(r>0)while(s--)t[s]||u[s]||(u[s]=F.call(i));u=ua(u)}H.apply(i,u),k&&!f&&u.length>0&&r+b.length>1&&fa.uniqueSort(i)}return k&&(w=y,j=v),t};return c?ha(f):f}return h=fa.compile=function(a,b){var c,d=[],e=[],f=A[a+" "];if(!f){b||(b=g(a)),c=b.length;while(c--)f=wa(b[c]),f[u]?d.push(f):e.push(f);f=A(a,xa(e,d)),f.selector=a}return f},i=fa.select=function(a,b,e,f){var i,j,k,l,m,n="function"==typeof a&&a,o=!f&&g(a=n.selector||a);if(e=e||[],1===o.length){if(j=o[0]=o[0].slice(0),j.length>2&&"ID"===(k=j[0]).type&&c.getById&&9===b.nodeType&&p&&d.relative[j[1].type]){if(b=(d.find.ID(k.matches[0].replace(ba,ca),b)||[])[0],!b)return e;n&&(b=b.parentNode),a=a.slice(j.shift().value.length)}i=W.needsContext.test(a)?0:j.length;while(i--){if(k=j[i],d.relative[l=k.type])break;if((m=d.find[l])&&(f=m(k.matches[0].replace(ba,ca),_.test(j[0].type)&&oa(b.parentNode)||b))){if(j.splice(i,1),a=f.length&&qa(j),!a)return H.apply(e,f),e;break}}}return(n||h(a,o))(f,b,!p,e,!b||_.test(a)&&oa(b.parentNode)||b),e},c.sortStable=u.split("").sort(B).join("")===u,c.detectDuplicates=!!l,m(),c.sortDetached=ia(function(a){return 1&a.compareDocumentPosition(n.createElement("div"))}),ia(function(a){return a.innerHTML="<a href='#'></a>","#"===a.firstChild.getAttribute("href")})||ja("type|href|height|width",function(a,b,c){return c?void 0:a.getAttribute(b,"type"===b.toLowerCase()?1:2)}),c.attributes&&ia(function(a){return a.innerHTML="<input/>",a.firstChild.setAttribute("value",""),""===a.firstChild.getAttribute("value")})||ja("value",function(a,b,c){return c||"input"!==a.nodeName.toLowerCase()?void 0:a.defaultValue}),ia(function(a){return null==a.getAttribute("disabled")})||ja(K,function(a,b,c){var d;return c?void 0:a[b]===!0?b.toLowerCase():(d=a.getAttributeNode(b))&&d.specified?d.value:null}),fa}(a);n.find=t,n.expr=t.selectors,n.expr[":"]=n.expr.pseudos,n.uniqueSort=n.unique=t.uniqueSort,n.text=t.getText,n.isXMLDoc=t.isXML,n.contains=t.contains;var u=function(a,b,c){var d=[],e=void 0!==c;while((a=a[b])&&9!==a.nodeType)if(1===a.nodeType){if(e&&n(a).is(c))break;d.push(a)}return d},v=function(a,b){for(var c=[];a;a=a.nextSibling)1===a.nodeType&&a!==b&&c.push(a);return c},w=n.expr.match.needsContext,x=/^<([\w-]+)\s*\/?>(?:<\/\1>|)$/,y=/^.[^:#\[\.,]*$/;function z(a,b,c){if(n.isFunction(b))return n.grep(a,function(a,d){return!!b.call(a,d,a)!==c});if(b.nodeType)return n.grep(a,function(a){return a===b!==c});if("string"==typeof b){if(y.test(b))return n.filter(b,a,c);b=n.filter(b,a)}return n.grep(a,function(a){return h.call(b,a)>-1!==c})}n.filter=function(a,b,c){var d=b[0];return c&&(a=":not("+a+")"),1===b.length&&1===d.nodeType?n.find.matchesSelector(d,a)?[d]:[]:n.find.matches(a,n.grep(b,function(a){return 1===a.nodeType}))},n.fn.extend({find:function(a){var b,c=this.length,d=[],e=this;if("string"!=typeof a)return this.pushStack(n(a).filter(function(){for(b=0;c>b;b++)if(n.contains(e[b],this))return!0}));for(b=0;c>b;b++)n.find(a,e[b],d);return d=this.pushStack(c>1?n.unique(d):d),d.selector=this.selector?this.selector+" "+a:a,d},filter:function(a){return this.pushStack(z(this,a||[],!1))},not:function(a){return this.pushStack(z(this,a||[],!0))},is:function(a){return!!z(this,"string"==typeof a&&w.test(a)?n(a):a||[],!1).length}});var A,B=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,C=n.fn.init=function(a,b,c){var e,f;if(!a)return this;if(c=c||A,"string"==typeof a){if(e="<"===a[0]&&">"===a[a.length-1]&&a.length>=3?[null,a,null]:B.exec(a),!e||!e[1]&&b)return!b||b.jquery?(b||c).find(a):this.constructor(b).find(a);if(e[1]){if(b=b instanceof n?b[0]:b,n.merge(this,n.parseHTML(e[1],b&&b.nodeType?b.ownerDocument||b:d,!0)),x.test(e[1])&&n.isPlainObject(b))for(e in b)n.isFunction(this[e])?this[e](b[e]):this.attr(e,b[e]);return this}return f=d.getElementById(e[2]),f&&f.parentNode&&(this.length=1,this[0]=f),this.context=d,this.selector=a,this}return a.nodeType?(this.context=this[0]=a,this.length=1,this):n.isFunction(a)?void 0!==c.ready?c.ready(a):a(n):(void 0!==a.selector&&(this.selector=a.selector,this.context=a.context),n.makeArray(a,this))};C.prototype=n.fn,A=n(d);var D=/^(?:parents|prev(?:Until|All))/,E={children:!0,contents:!0,next:!0,prev:!0};n.fn.extend({has:function(a){var b=n(a,this),c=b.length;return this.filter(function(){for(var a=0;c>a;a++)if(n.contains(this,b[a]))return!0})},closest:function(a,b){for(var c,d=0,e=this.length,f=[],g=w.test(a)||"string"!=typeof a?n(a,b||this.context):0;e>d;d++)for(c=this[d];c&&c!==b;c=c.parentNode)if(c.nodeType<11&&(g?g.index(c)>-1:1===c.nodeType&&n.find.matchesSelector(c,a))){f.push(c);break}return this.pushStack(f.length>1?n.uniqueSort(f):f)},index:function(a){return a?"string"==typeof a?h.call(n(a),this[0]):h.call(this,a.jquery?a[0]:a):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(a,b){return this.pushStack(n.uniqueSort(n.merge(this.get(),n(a,b))))},addBack:function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))}});function F(a,b){while((a=a[b])&&1!==a.nodeType);return a}n.each({parent:function(a){var b=a.parentNode;return b&&11!==b.nodeType?b:null},parents:function(a){return u(a,"parentNode")},parentsUntil:function(a,b,c){return u(a,"parentNode",c)},next:function(a){return F(a,"nextSibling")},prev:function(a){return F(a,"previousSibling")},nextAll:function(a){return u(a,"nextSibling")},prevAll:function(a){return u(a,"previousSibling")},nextUntil:function(a,b,c){return u(a,"nextSibling",c)},prevUntil:function(a,b,c){return u(a,"previousSibling",c)},siblings:function(a){return v((a.parentNode||{}).firstChild,a)},children:function(a){return v(a.firstChild)},contents:function(a){return a.contentDocument||n.merge([],a.childNodes)}},function(a,b){n.fn[a]=function(c,d){var e=n.map(this,b,c);return"Until"!==a.slice(-5)&&(d=c),d&&"string"==typeof d&&(e=n.filter(d,e)),this.length>1&&(E[a]||n.uniqueSort(e),D.test(a)&&e.reverse()),this.pushStack(e)}});var G=/\S+/g;function H(a){var b={};return n.each(a.match(G)||[],function(a,c){b[c]=!0}),b}n.Callbacks=function(a){a="string"==typeof a?H(a):n.extend({},a);var b,c,d,e,f=[],g=[],h=-1,i=function(){for(e=a.once,d=b=!0;g.length;h=-1){c=g.shift();while(++h<f.length)f[h].apply(c[0],c[1])===!1&&a.stopOnFalse&&(h=f.length,c=!1)}a.memory||(c=!1),b=!1,e&&(f=c?[]:"")},j={add:function(){return f&&(c&&!b&&(h=f.length-1,g.push(c)),function d(b){n.each(b,function(b,c){n.isFunction(c)?a.unique&&j.has(c)||f.push(c):c&&c.length&&"string"!==n.type(c)&&d(c)})}(arguments),c&&!b&&i()),this},remove:function(){return n.each(arguments,function(a,b){var c;while((c=n.inArray(b,f,c))>-1)f.splice(c,1),h>=c&&h--}),this},has:function(a){return a?n.inArray(a,f)>-1:f.length>0},empty:function(){return f&&(f=[]),this},disable:function(){return e=g=[],f=c="",this},disabled:function(){return!f},lock:function(){return e=g=[],c||(f=c=""),this},locked:function(){return!!e},fireWith:function(a,c){return e||(c=c||[],c=[a,c.slice?c.slice():c],g.push(c),b||i()),this},fire:function(){return j.fireWith(this,arguments),this},fired:function(){return!!d}};return j},n.extend({Deferred:function(a){var b=[["resolve","done",n.Callbacks("once memory"),"resolved"],["reject","fail",n.Callbacks("once memory"),"rejected"],["notify","progress",n.Callbacks("memory")]],c="pending",d={state:function(){return c},always:function(){return e.done(arguments).fail(arguments),this},then:function(){var a=arguments;return n.Deferred(function(c){n.each(b,function(b,f){var g=n.isFunction(a[b])&&a[b];e[f[1]](function(){var a=g&&g.apply(this,arguments);a&&n.isFunction(a.promise)?a.promise().progress(c.notify).done(c.resolve).fail(c.reject):c[f[0]+"With"](this===d?c.promise():this,g?[a]:arguments)})}),a=null}).promise()},promise:function(a){return null!=a?n.extend(a,d):d}},e={};return d.pipe=d.then,n.each(b,function(a,f){var g=f[2],h=f[3];d[f[1]]=g.add,h&&g.add(function(){c=h},b[1^a][2].disable,b[2][2].lock),e[f[0]]=function(){return e[f[0]+"With"](this===e?d:this,arguments),this},e[f[0]+"With"]=g.fireWith}),d.promise(e),a&&a.call(e,e),e},when:function(a){var b=0,c=e.call(arguments),d=c.length,f=1!==d||a&&n.isFunction(a.promise)?d:0,g=1===f?a:n.Deferred(),h=function(a,b,c){return function(d){b[a]=this,c[a]=arguments.length>1?e.call(arguments):d,c===i?g.notifyWith(b,c):--f||g.resolveWith(b,c)}},i,j,k;if(d>1)for(i=new Array(d),j=new Array(d),k=new Array(d);d>b;b++)c[b]&&n.isFunction(c[b].promise)?c[b].promise().progress(h(b,j,i)).done(h(b,k,c)).fail(g.reject):--f;return f||g.resolveWith(k,c),g.promise()}});var I;n.fn.ready=function(a){return n.ready.promise().done(a),this},n.extend({isReady:!1,readyWait:1,holdReady:function(a){a?n.readyWait++:n.ready(!0)},ready:function(a){(a===!0?--n.readyWait:n.isReady)||(n.isReady=!0,a!==!0&&--n.readyWait>0||(I.resolveWith(d,[n]),n.fn.triggerHandler&&(n(d).triggerHandler("ready"),n(d).off("ready"))))}});function J(){d.removeEventListener("DOMContentLoaded",J),a.removeEventListener("load",J),n.ready()}n.ready.promise=function(b){return I||(I=n.Deferred(),"complete"===d.readyState||"loading"!==d.readyState&&!d.documentElement.doScroll?a.setTimeout(n.ready):(d.addEventListener("DOMContentLoaded",J),a.addEventListener("load",J))),I.promise(b)},n.ready.promise();var K=function(a,b,c,d,e,f,g){var h=0,i=a.length,j=null==c;if("object"===n.type(c)){e=!0;for(h in c)K(a,b,h,c[h],!0,f,g)}else if(void 0!==d&&(e=!0,n.isFunction(d)||(g=!0),j&&(g?(b.call(a,d),b=null):(j=b,b=function(a,b,c){return j.call(n(a),c)})),b))for(;i>h;h++)b(a[h],c,g?d:d.call(a[h],h,b(a[h],c)));return e?a:j?b.call(a):i?b(a[0],c):f},L=function(a){return 1===a.nodeType||9===a.nodeType||!+a.nodeType};function M(){this.expando=n.expando+M.uid++}M.uid=1,M.prototype={register:function(a,b){var c=b||{};return a.nodeType?a[this.expando]=c:Object.defineProperty(a,this.expando,{value:c,writable:!0,configurable:!0}),a[this.expando]},cache:function(a){if(!L(a))return{};var b=a[this.expando];return b||(b={},L(a)&&(a.nodeType?a[this.expando]=b:Object.defineProperty(a,this.expando,{value:b,configurable:!0}))),b},set:function(a,b,c){var d,e=this.cache(a);if("string"==typeof b)e[b]=c;else for(d in b)e[d]=b[d];return e},get:function(a,b){return void 0===b?this.cache(a):a[this.expando]&&a[this.expando][b]},access:function(a,b,c){var d;return void 0===b||b&&"string"==typeof b&&void 0===c?(d=this.get(a,b),void 0!==d?d:this.get(a,n.camelCase(b))):(this.set(a,b,c),void 0!==c?c:b)},remove:function(a,b){var c,d,e,f=a[this.expando];if(void 0!==f){if(void 0===b)this.register(a);else{n.isArray(b)?d=b.concat(b.map(n.camelCase)):(e=n.camelCase(b),b in f?d=[b,e]:(d=e,d=d in f?[d]:d.match(G)||[])),c=d.length;while(c--)delete f[d[c]]}(void 0===b||n.isEmptyObject(f))&&(a.nodeType?a[this.expando]=void 0:delete a[this.expando])}},hasData:function(a){var b=a[this.expando];return void 0!==b&&!n.isEmptyObject(b)}};var N=new M,O=new M,P=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,Q=/[A-Z]/g;function R(a,b,c){var d;if(void 0===c&&1===a.nodeType)if(d="data-"+b.replace(Q,"-$&").toLowerCase(),c=a.getAttribute(d),"string"==typeof c){try{c="true"===c?!0:"false"===c?!1:"null"===c?null:+c+""===c?+c:P.test(c)?n.parseJSON(c):c;
}catch(e){}O.set(a,b,c)}else c=void 0;return c}n.extend({hasData:function(a){return O.hasData(a)||N.hasData(a)},data:function(a,b,c){return O.access(a,b,c)},removeData:function(a,b){O.remove(a,b)},_data:function(a,b,c){return N.access(a,b,c)},_removeData:function(a,b){N.remove(a,b)}}),n.fn.extend({data:function(a,b){var c,d,e,f=this[0],g=f&&f.attributes;if(void 0===a){if(this.length&&(e=O.get(f),1===f.nodeType&&!N.get(f,"hasDataAttrs"))){c=g.length;while(c--)g[c]&&(d=g[c].name,0===d.indexOf("data-")&&(d=n.camelCase(d.slice(5)),R(f,d,e[d])));N.set(f,"hasDataAttrs",!0)}return e}return"object"==typeof a?this.each(function(){O.set(this,a)}):K(this,function(b){var c,d;if(f&&void 0===b){if(c=O.get(f,a)||O.get(f,a.replace(Q,"-$&").toLowerCase()),void 0!==c)return c;if(d=n.camelCase(a),c=O.get(f,d),void 0!==c)return c;if(c=R(f,d,void 0),void 0!==c)return c}else d=n.camelCase(a),this.each(function(){var c=O.get(this,d);O.set(this,d,b),a.indexOf("-")>-1&&void 0!==c&&O.set(this,a,b)})},null,b,arguments.length>1,null,!0)},removeData:function(a){return this.each(function(){O.remove(this,a)})}}),n.extend({queue:function(a,b,c){var d;return a?(b=(b||"fx")+"queue",d=N.get(a,b),c&&(!d||n.isArray(c)?d=N.access(a,b,n.makeArray(c)):d.push(c)),d||[]):void 0},dequeue:function(a,b){b=b||"fx";var c=n.queue(a,b),d=c.length,e=c.shift(),f=n._queueHooks(a,b),g=function(){n.dequeue(a,b)};"inprogress"===e&&(e=c.shift(),d--),e&&("fx"===b&&c.unshift("inprogress"),delete f.stop,e.call(a,g,f)),!d&&f&&f.empty.fire()},_queueHooks:function(a,b){var c=b+"queueHooks";return N.get(a,c)||N.access(a,c,{empty:n.Callbacks("once memory").add(function(){N.remove(a,[b+"queue",c])})})}}),n.fn.extend({queue:function(a,b){var c=2;return"string"!=typeof a&&(b=a,a="fx",c--),arguments.length<c?n.queue(this[0],a):void 0===b?this:this.each(function(){var c=n.queue(this,a,b);n._queueHooks(this,a),"fx"===a&&"inprogress"!==c[0]&&n.dequeue(this,a)})},dequeue:function(a){return this.each(function(){n.dequeue(this,a)})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,b){var c,d=1,e=n.Deferred(),f=this,g=this.length,h=function(){--d||e.resolveWith(f,[f])};"string"!=typeof a&&(b=a,a=void 0),a=a||"fx";while(g--)c=N.get(f[g],a+"queueHooks"),c&&c.empty&&(d++,c.empty.add(h));return h(),e.promise(b)}});var S=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,T=new RegExp("^(?:([+-])=|)("+S+")([a-z%]*)$","i"),U=["Top","Right","Bottom","Left"],V=function(a,b){return a=b||a,"none"===n.css(a,"display")||!n.contains(a.ownerDocument,a)};function W(a,b,c,d){var e,f=1,g=20,h=d?function(){return d.cur()}:function(){return n.css(a,b,"")},i=h(),j=c&&c[3]||(n.cssNumber[b]?"":"px"),k=(n.cssNumber[b]||"px"!==j&&+i)&&T.exec(n.css(a,b));if(k&&k[3]!==j){j=j||k[3],c=c||[],k=+i||1;do f=f||".5",k/=f,n.style(a,b,k+j);while(f!==(f=h()/i)&&1!==f&&--g)}return c&&(k=+k||+i||0,e=c[1]?k+(c[1]+1)*c[2]:+c[2],d&&(d.unit=j,d.start=k,d.end=e)),e}var X=/^(?:checkbox|radio)$/i,Y=/<([\w:-]+)/,Z=/^$|\/(?:java|ecma)script/i,$={option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};$.optgroup=$.option,$.tbody=$.tfoot=$.colgroup=$.caption=$.thead,$.th=$.td;function _(a,b){var c="undefined"!=typeof a.getElementsByTagName?a.getElementsByTagName(b||"*"):"undefined"!=typeof a.querySelectorAll?a.querySelectorAll(b||"*"):[];return void 0===b||b&&n.nodeName(a,b)?n.merge([a],c):c}function aa(a,b){for(var c=0,d=a.length;d>c;c++)N.set(a[c],"globalEval",!b||N.get(b[c],"globalEval"))}var ba=/<|&#?\w+;/;function ca(a,b,c,d,e){for(var f,g,h,i,j,k,l=b.createDocumentFragment(),m=[],o=0,p=a.length;p>o;o++)if(f=a[o],f||0===f)if("object"===n.type(f))n.merge(m,f.nodeType?[f]:f);else if(ba.test(f)){g=g||l.appendChild(b.createElement("div")),h=(Y.exec(f)||["",""])[1].toLowerCase(),i=$[h]||$._default,g.innerHTML=i[1]+n.htmlPrefilter(f)+i[2],k=i[0];while(k--)g=g.lastChild;n.merge(m,g.childNodes),g=l.firstChild,g.textContent=""}else m.push(b.createTextNode(f));l.textContent="",o=0;while(f=m[o++])if(d&&n.inArray(f,d)>-1)e&&e.push(f);else if(j=n.contains(f.ownerDocument,f),g=_(l.appendChild(f),"script"),j&&aa(g),c){k=0;while(f=g[k++])Z.test(f.type||"")&&c.push(f)}return l}!function(){var a=d.createDocumentFragment(),b=a.appendChild(d.createElement("div")),c=d.createElement("input");c.setAttribute("type","radio"),c.setAttribute("checked","checked"),c.setAttribute("name","t"),b.appendChild(c),l.checkClone=b.cloneNode(!0).cloneNode(!0).lastChild.checked,b.innerHTML="<textarea>x</textarea>",l.noCloneChecked=!!b.cloneNode(!0).lastChild.defaultValue}();var da=/^key/,ea=/^(?:mouse|pointer|contextmenu|drag|drop)|click/,fa=/^([^.]*)(?:\.(.+)|)/;function ga(){return!0}function ha(){return!1}function ia(){try{return d.activeElement}catch(a){}}function ja(a,b,c,d,e,f){var g,h;if("object"==typeof b){"string"!=typeof c&&(d=d||c,c=void 0);for(h in b)ja(a,h,c,d,b[h],f);return a}if(null==d&&null==e?(e=c,d=c=void 0):null==e&&("string"==typeof c?(e=d,d=void 0):(e=d,d=c,c=void 0)),e===!1)e=ha;else if(!e)return a;return 1===f&&(g=e,e=function(a){return n().off(a),g.apply(this,arguments)},e.guid=g.guid||(g.guid=n.guid++)),a.each(function(){n.event.add(this,b,e,d,c)})}n.event={global:{},add:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,o,p,q,r=N.get(a);if(r){c.handler&&(f=c,c=f.handler,e=f.selector),c.guid||(c.guid=n.guid++),(i=r.events)||(i=r.events={}),(g=r.handle)||(g=r.handle=function(b){return"undefined"!=typeof n&&n.event.triggered!==b.type?n.event.dispatch.apply(a,arguments):void 0}),b=(b||"").match(G)||[""],j=b.length;while(j--)h=fa.exec(b[j])||[],o=q=h[1],p=(h[2]||"").split(".").sort(),o&&(l=n.event.special[o]||{},o=(e?l.delegateType:l.bindType)||o,l=n.event.special[o]||{},k=n.extend({type:o,origType:q,data:d,handler:c,guid:c.guid,selector:e,needsContext:e&&n.expr.match.needsContext.test(e),namespace:p.join(".")},f),(m=i[o])||(m=i[o]=[],m.delegateCount=0,l.setup&&l.setup.call(a,d,p,g)!==!1||a.addEventListener&&a.addEventListener(o,g)),l.add&&(l.add.call(a,k),k.handler.guid||(k.handler.guid=c.guid)),e?m.splice(m.delegateCount++,0,k):m.push(k),n.event.global[o]=!0)}},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,o,p,q,r=N.hasData(a)&&N.get(a);if(r&&(i=r.events)){b=(b||"").match(G)||[""],j=b.length;while(j--)if(h=fa.exec(b[j])||[],o=q=h[1],p=(h[2]||"").split(".").sort(),o){l=n.event.special[o]||{},o=(d?l.delegateType:l.bindType)||o,m=i[o]||[],h=h[2]&&new RegExp("(^|\\.)"+p.join("\\.(?:.*\\.|)")+"(\\.|$)"),g=f=m.length;while(f--)k=m[f],!e&&q!==k.origType||c&&c.guid!==k.guid||h&&!h.test(k.namespace)||d&&d!==k.selector&&("**"!==d||!k.selector)||(m.splice(f,1),k.selector&&m.delegateCount--,l.remove&&l.remove.call(a,k));g&&!m.length&&(l.teardown&&l.teardown.call(a,p,r.handle)!==!1||n.removeEvent(a,o,r.handle),delete i[o])}else for(o in i)n.event.remove(a,o+b[j],c,d,!0);n.isEmptyObject(i)&&N.remove(a,"handle events")}},dispatch:function(a){a=n.event.fix(a);var b,c,d,f,g,h=[],i=e.call(arguments),j=(N.get(this,"events")||{})[a.type]||[],k=n.event.special[a.type]||{};if(i[0]=a,a.delegateTarget=this,!k.preDispatch||k.preDispatch.call(this,a)!==!1){h=n.event.handlers.call(this,a,j),b=0;while((f=h[b++])&&!a.isPropagationStopped()){a.currentTarget=f.elem,c=0;while((g=f.handlers[c++])&&!a.isImmediatePropagationStopped())a.rnamespace&&!a.rnamespace.test(g.namespace)||(a.handleObj=g,a.data=g.data,d=((n.event.special[g.origType]||{}).handle||g.handler).apply(f.elem,i),void 0!==d&&(a.result=d)===!1&&(a.preventDefault(),a.stopPropagation()))}return k.postDispatch&&k.postDispatch.call(this,a),a.result}},handlers:function(a,b){var c,d,e,f,g=[],h=b.delegateCount,i=a.target;if(h&&i.nodeType&&("click"!==a.type||isNaN(a.button)||a.button<1))for(;i!==this;i=i.parentNode||this)if(1===i.nodeType&&(i.disabled!==!0||"click"!==a.type)){for(d=[],c=0;h>c;c++)f=b[c],e=f.selector+" ",void 0===d[e]&&(d[e]=f.needsContext?n(e,this).index(i)>-1:n.find(e,this,null,[i]).length),d[e]&&d.push(f);d.length&&g.push({elem:i,handlers:d})}return h<b.length&&g.push({elem:this,handlers:b.slice(h)}),g},props:"altKey bubbles cancelable ctrlKey currentTarget detail eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){return null==a.which&&(a.which=null!=b.charCode?b.charCode:b.keyCode),a}},mouseHooks:{props:"button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,b){var c,e,f,g=b.button;return null==a.pageX&&null!=b.clientX&&(c=a.target.ownerDocument||d,e=c.documentElement,f=c.body,a.pageX=b.clientX+(e&&e.scrollLeft||f&&f.scrollLeft||0)-(e&&e.clientLeft||f&&f.clientLeft||0),a.pageY=b.clientY+(e&&e.scrollTop||f&&f.scrollTop||0)-(e&&e.clientTop||f&&f.clientTop||0)),a.which||void 0===g||(a.which=1&g?1:2&g?3:4&g?2:0),a}},fix:function(a){if(a[n.expando])return a;var b,c,e,f=a.type,g=a,h=this.fixHooks[f];h||(this.fixHooks[f]=h=ea.test(f)?this.mouseHooks:da.test(f)?this.keyHooks:{}),e=h.props?this.props.concat(h.props):this.props,a=new n.Event(g),b=e.length;while(b--)c=e[b],a[c]=g[c];return a.target||(a.target=d),3===a.target.nodeType&&(a.target=a.target.parentNode),h.filter?h.filter(a,g):a},special:{load:{noBubble:!0},focus:{trigger:function(){return this!==ia()&&this.focus?(this.focus(),!1):void 0},delegateType:"focusin"},blur:{trigger:function(){return this===ia()&&this.blur?(this.blur(),!1):void 0},delegateType:"focusout"},click:{trigger:function(){return"checkbox"===this.type&&this.click&&n.nodeName(this,"input")?(this.click(),!1):void 0},_default:function(a){return n.nodeName(a.target,"a")}},beforeunload:{postDispatch:function(a){void 0!==a.result&&a.originalEvent&&(a.originalEvent.returnValue=a.result)}}}},n.removeEvent=function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c)},n.Event=function(a,b){return this instanceof n.Event?(a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||void 0===a.defaultPrevented&&a.returnValue===!1?ga:ha):this.type=a,b&&n.extend(this,b),this.timeStamp=a&&a.timeStamp||n.now(),void(this[n.expando]=!0)):new n.Event(a,b)},n.Event.prototype={constructor:n.Event,isDefaultPrevented:ha,isPropagationStopped:ha,isImmediatePropagationStopped:ha,isSimulated:!1,preventDefault:function(){var a=this.originalEvent;this.isDefaultPrevented=ga,a&&!this.isSimulated&&a.preventDefault()},stopPropagation:function(){var a=this.originalEvent;this.isPropagationStopped=ga,a&&!this.isSimulated&&a.stopPropagation()},stopImmediatePropagation:function(){var a=this.originalEvent;this.isImmediatePropagationStopped=ga,a&&!this.isSimulated&&a.stopImmediatePropagation(),this.stopPropagation()}},n.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(a,b){n.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj;return e&&(e===d||n.contains(d,e))||(a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b),c}}}),n.fn.extend({on:function(a,b,c,d){return ja(this,a,b,c,d)},one:function(a,b,c,d){return ja(this,a,b,c,d,1)},off:function(a,b,c){var d,e;if(a&&a.preventDefault&&a.handleObj)return d=a.handleObj,n(a.delegateTarget).off(d.namespace?d.origType+"."+d.namespace:d.origType,d.selector,d.handler),this;if("object"==typeof a){for(e in a)this.off(e,b,a[e]);return this}return b!==!1&&"function"!=typeof b||(c=b,b=void 0),c===!1&&(c=ha),this.each(function(){n.event.remove(this,a,c,b)})}});var ka=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,la=/<script|<style|<link/i,ma=/checked\s*(?:[^=]|=\s*.checked.)/i,na=/^true\/(.*)/,oa=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;function pa(a,b){return n.nodeName(a,"table")&&n.nodeName(11!==b.nodeType?b:b.firstChild,"tr")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function qa(a){return a.type=(null!==a.getAttribute("type"))+"/"+a.type,a}function ra(a){var b=na.exec(a.type);return b?a.type=b[1]:a.removeAttribute("type"),a}function sa(a,b){var c,d,e,f,g,h,i,j;if(1===b.nodeType){if(N.hasData(a)&&(f=N.access(a),g=N.set(b,f),j=f.events)){delete g.handle,g.events={};for(e in j)for(c=0,d=j[e].length;d>c;c++)n.event.add(b,e,j[e][c])}O.hasData(a)&&(h=O.access(a),i=n.extend({},h),O.set(b,i))}}function ta(a,b){var c=b.nodeName.toLowerCase();"input"===c&&X.test(a.type)?b.checked=a.checked:"input"!==c&&"textarea"!==c||(b.defaultValue=a.defaultValue)}function ua(a,b,c,d){b=f.apply([],b);var e,g,h,i,j,k,m=0,o=a.length,p=o-1,q=b[0],r=n.isFunction(q);if(r||o>1&&"string"==typeof q&&!l.checkClone&&ma.test(q))return a.each(function(e){var f=a.eq(e);r&&(b[0]=q.call(this,e,f.html())),ua(f,b,c,d)});if(o&&(e=ca(b,a[0].ownerDocument,!1,a,d),g=e.firstChild,1===e.childNodes.length&&(e=g),g||d)){for(h=n.map(_(e,"script"),qa),i=h.length;o>m;m++)j=e,m!==p&&(j=n.clone(j,!0,!0),i&&n.merge(h,_(j,"script"))),c.call(a[m],j,m);if(i)for(k=h[h.length-1].ownerDocument,n.map(h,ra),m=0;i>m;m++)j=h[m],Z.test(j.type||"")&&!N.access(j,"globalEval")&&n.contains(k,j)&&(j.src?n._evalUrl&&n._evalUrl(j.src):n.globalEval(j.textContent.replace(oa,"")))}return a}function va(a,b,c){for(var d,e=b?n.filter(b,a):a,f=0;null!=(d=e[f]);f++)c||1!==d.nodeType||n.cleanData(_(d)),d.parentNode&&(c&&n.contains(d.ownerDocument,d)&&aa(_(d,"script")),d.parentNode.removeChild(d));return a}n.extend({htmlPrefilter:function(a){return a.replace(ka,"<$1></$2>")},clone:function(a,b,c){var d,e,f,g,h=a.cloneNode(!0),i=n.contains(a.ownerDocument,a);if(!(l.noCloneChecked||1!==a.nodeType&&11!==a.nodeType||n.isXMLDoc(a)))for(g=_(h),f=_(a),d=0,e=f.length;e>d;d++)ta(f[d],g[d]);if(b)if(c)for(f=f||_(a),g=g||_(h),d=0,e=f.length;e>d;d++)sa(f[d],g[d]);else sa(a,h);return g=_(h,"script"),g.length>0&&aa(g,!i&&_(a,"script")),h},cleanData:function(a){for(var b,c,d,e=n.event.special,f=0;void 0!==(c=a[f]);f++)if(L(c)){if(b=c[N.expando]){if(b.events)for(d in b.events)e[d]?n.event.remove(c,d):n.removeEvent(c,d,b.handle);c[N.expando]=void 0}c[O.expando]&&(c[O.expando]=void 0)}}}),n.fn.extend({domManip:ua,detach:function(a){return va(this,a,!0)},remove:function(a){return va(this,a)},text:function(a){return K(this,function(a){return void 0===a?n.text(this):this.empty().each(function(){1!==this.nodeType&&11!==this.nodeType&&9!==this.nodeType||(this.textContent=a)})},null,a,arguments.length)},append:function(){return ua(this,arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=pa(this,a);b.appendChild(a)}})},prepend:function(){return ua(this,arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=pa(this,a);b.insertBefore(a,b.firstChild)}})},before:function(){return ua(this,arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this)})},after:function(){return ua(this,arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this.nextSibling)})},empty:function(){for(var a,b=0;null!=(a=this[b]);b++)1===a.nodeType&&(n.cleanData(_(a,!1)),a.textContent="");return this},clone:function(a,b){return a=null==a?!1:a,b=null==b?a:b,this.map(function(){return n.clone(this,a,b)})},html:function(a){return K(this,function(a){var b=this[0]||{},c=0,d=this.length;if(void 0===a&&1===b.nodeType)return b.innerHTML;if("string"==typeof a&&!la.test(a)&&!$[(Y.exec(a)||["",""])[1].toLowerCase()]){a=n.htmlPrefilter(a);try{for(;d>c;c++)b=this[c]||{},1===b.nodeType&&(n.cleanData(_(b,!1)),b.innerHTML=a);b=0}catch(e){}}b&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(){var a=[];return ua(this,arguments,function(b){var c=this.parentNode;n.inArray(this,a)<0&&(n.cleanData(_(this)),c&&c.replaceChild(b,this))},a)}}),n.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){n.fn[a]=function(a){for(var c,d=[],e=n(a),f=e.length-1,h=0;f>=h;h++)c=h===f?this:this.clone(!0),n(e[h])[b](c),g.apply(d,c.get());return this.pushStack(d)}});var wa,xa={HTML:"block",BODY:"block"};function ya(a,b){var c=n(b.createElement(a)).appendTo(b.body),d=n.css(c[0],"display");return c.detach(),d}function za(a){var b=d,c=xa[a];return c||(c=ya(a,b),"none"!==c&&c||(wa=(wa||n("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement),b=wa[0].contentDocument,b.write(),b.close(),c=ya(a,b),wa.detach()),xa[a]=c),c}var Aa=/^margin/,Ba=new RegExp("^("+S+")(?!px)[a-z%]+$","i"),Ca=function(b){var c=b.ownerDocument.defaultView;return c&&c.opener||(c=a),c.getComputedStyle(b)},Da=function(a,b,c,d){var e,f,g={};for(f in b)g[f]=a.style[f],a.style[f]=b[f];e=c.apply(a,d||[]);for(f in b)a.style[f]=g[f];return e},Ea=d.documentElement;!function(){var b,c,e,f,g=d.createElement("div"),h=d.createElement("div");if(h.style){h.style.backgroundClip="content-box",h.cloneNode(!0).style.backgroundClip="",l.clearCloneStyle="content-box"===h.style.backgroundClip,g.style.cssText="border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute",g.appendChild(h);function i(){h.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%",h.innerHTML="",Ea.appendChild(g);var d=a.getComputedStyle(h);b="1%"!==d.top,f="2px"===d.marginLeft,c="4px"===d.width,h.style.marginRight="50%",e="4px"===d.marginRight,Ea.removeChild(g)}n.extend(l,{pixelPosition:function(){return i(),b},boxSizingReliable:function(){return null==c&&i(),c},pixelMarginRight:function(){return null==c&&i(),e},reliableMarginLeft:function(){return null==c&&i(),f},reliableMarginRight:function(){var b,c=h.appendChild(d.createElement("div"));return c.style.cssText=h.style.cssText="-webkit-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",c.style.marginRight=c.style.width="0",h.style.width="1px",Ea.appendChild(g),b=!parseFloat(a.getComputedStyle(c).marginRight),Ea.removeChild(g),h.removeChild(c),b}})}}();function Fa(a,b,c){var d,e,f,g,h=a.style;return c=c||Ca(a),g=c?c.getPropertyValue(b)||c[b]:void 0,""!==g&&void 0!==g||n.contains(a.ownerDocument,a)||(g=n.style(a,b)),c&&!l.pixelMarginRight()&&Ba.test(g)&&Aa.test(b)&&(d=h.width,e=h.minWidth,f=h.maxWidth,h.minWidth=h.maxWidth=h.width=g,g=c.width,h.width=d,h.minWidth=e,h.maxWidth=f),void 0!==g?g+"":g}function Ga(a,b){return{get:function(){return a()?void delete this.get:(this.get=b).apply(this,arguments)}}}var Ha=/^(none|table(?!-c[ea]).+)/,Ia={position:"absolute",visibility:"hidden",display:"block"},Ja={letterSpacing:"0",fontWeight:"400"},Ka=["Webkit","O","Moz","ms"],La=d.createElement("div").style;function Ma(a){if(a in La)return a;var b=a[0].toUpperCase()+a.slice(1),c=Ka.length;while(c--)if(a=Ka[c]+b,a in La)return a}function Na(a,b,c){var d=T.exec(b);return d?Math.max(0,d[2]-(c||0))+(d[3]||"px"):b}function Oa(a,b,c,d,e){for(var f=c===(d?"border":"content")?4:"width"===b?1:0,g=0;4>f;f+=2)"margin"===c&&(g+=n.css(a,c+U[f],!0,e)),d?("content"===c&&(g-=n.css(a,"padding"+U[f],!0,e)),"margin"!==c&&(g-=n.css(a,"border"+U[f]+"Width",!0,e))):(g+=n.css(a,"padding"+U[f],!0,e),"padding"!==c&&(g+=n.css(a,"border"+U[f]+"Width",!0,e)));return g}function Pa(a,b,c){var d=!0,e="width"===b?a.offsetWidth:a.offsetHeight,f=Ca(a),g="border-box"===n.css(a,"boxSizing",!1,f);if(0>=e||null==e){if(e=Fa(a,b,f),(0>e||null==e)&&(e=a.style[b]),Ba.test(e))return e;d=g&&(l.boxSizingReliable()||e===a.style[b]),e=parseFloat(e)||0}return e+Oa(a,b,c||(g?"border":"content"),d,f)+"px"}function Qa(a,b){for(var c,d,e,f=[],g=0,h=a.length;h>g;g++)d=a[g],d.style&&(f[g]=N.get(d,"olddisplay"),c=d.style.display,b?(f[g]||"none"!==c||(d.style.display=""),""===d.style.display&&V(d)&&(f[g]=N.access(d,"olddisplay",za(d.nodeName)))):(e=V(d),"none"===c&&e||N.set(d,"olddisplay",e?c:n.css(d,"display"))));for(g=0;h>g;g++)d=a[g],d.style&&(b&&"none"!==d.style.display&&""!==d.style.display||(d.style.display=b?f[g]||"":"none"));return a}n.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=Fa(a,"opacity");return""===c?"1":c}}}},cssNumber:{animationIterationCount:!0,columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":"cssFloat"},style:function(a,b,c,d){if(a&&3!==a.nodeType&&8!==a.nodeType&&a.style){var e,f,g,h=n.camelCase(b),i=a.style;return b=n.cssProps[h]||(n.cssProps[h]=Ma(h)||h),g=n.cssHooks[b]||n.cssHooks[h],void 0===c?g&&"get"in g&&void 0!==(e=g.get(a,!1,d))?e:i[b]:(f=typeof c,"string"===f&&(e=T.exec(c))&&e[1]&&(c=W(a,b,e),f="number"),null!=c&&c===c&&("number"===f&&(c+=e&&e[3]||(n.cssNumber[h]?"":"px")),l.clearCloneStyle||""!==c||0!==b.indexOf("background")||(i[b]="inherit"),g&&"set"in g&&void 0===(c=g.set(a,c,d))||(i[b]=c)),void 0)}},css:function(a,b,c,d){var e,f,g,h=n.camelCase(b);return b=n.cssProps[h]||(n.cssProps[h]=Ma(h)||h),g=n.cssHooks[b]||n.cssHooks[h],g&&"get"in g&&(e=g.get(a,!0,c)),void 0===e&&(e=Fa(a,b,d)),"normal"===e&&b in Ja&&(e=Ja[b]),""===c||c?(f=parseFloat(e),c===!0||isFinite(f)?f||0:e):e}}),n.each(["height","width"],function(a,b){n.cssHooks[b]={get:function(a,c,d){return c?Ha.test(n.css(a,"display"))&&0===a.offsetWidth?Da(a,Ia,function(){return Pa(a,b,d)}):Pa(a,b,d):void 0},set:function(a,c,d){var e,f=d&&Ca(a),g=d&&Oa(a,b,d,"border-box"===n.css(a,"boxSizing",!1,f),f);return g&&(e=T.exec(c))&&"px"!==(e[3]||"px")&&(a.style[b]=c,c=n.css(a,b)),Na(a,c,g)}}}),n.cssHooks.marginLeft=Ga(l.reliableMarginLeft,function(a,b){return b?(parseFloat(Fa(a,"marginLeft"))||a.getBoundingClientRect().left-Da(a,{marginLeft:0},function(){return a.getBoundingClientRect().left}))+"px":void 0}),n.cssHooks.marginRight=Ga(l.reliableMarginRight,function(a,b){return b?Da(a,{display:"inline-block"},Fa,[a,"marginRight"]):void 0}),n.each({margin:"",padding:"",border:"Width"},function(a,b){n.cssHooks[a+b]={expand:function(c){for(var d=0,e={},f="string"==typeof c?c.split(" "):[c];4>d;d++)e[a+U[d]+b]=f[d]||f[d-2]||f[0];return e}},Aa.test(a)||(n.cssHooks[a+b].set=Na)}),n.fn.extend({css:function(a,b){return K(this,function(a,b,c){var d,e,f={},g=0;if(n.isArray(b)){for(d=Ca(a),e=b.length;e>g;g++)f[b[g]]=n.css(a,b[g],!1,d);return f}return void 0!==c?n.style(a,b,c):n.css(a,b)},a,b,arguments.length>1)},show:function(){return Qa(this,!0)},hide:function(){return Qa(this)},toggle:function(a){return"boolean"==typeof a?a?this.show():this.hide():this.each(function(){V(this)?n(this).show():n(this).hide()})}});function Ra(a,b,c,d,e){return new Ra.prototype.init(a,b,c,d,e)}n.Tween=Ra,Ra.prototype={constructor:Ra,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||n.easing._default,this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(n.cssNumber[c]?"":"px")},cur:function(){var a=Ra.propHooks[this.prop];return a&&a.get?a.get(this):Ra.propHooks._default.get(this)},run:function(a){var b,c=Ra.propHooks[this.prop];return this.options.duration?this.pos=b=n.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration):this.pos=b=a,this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):Ra.propHooks._default.set(this),this}},Ra.prototype.init.prototype=Ra.prototype,Ra.propHooks={_default:{get:function(a){var b;return 1!==a.elem.nodeType||null!=a.elem[a.prop]&&null==a.elem.style[a.prop]?a.elem[a.prop]:(b=n.css(a.elem,a.prop,""),b&&"auto"!==b?b:0)},set:function(a){n.fx.step[a.prop]?n.fx.step[a.prop](a):1!==a.elem.nodeType||null==a.elem.style[n.cssProps[a.prop]]&&!n.cssHooks[a.prop]?a.elem[a.prop]=a.now:n.style(a.elem,a.prop,a.now+a.unit)}}},Ra.propHooks.scrollTop=Ra.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now)}},n.easing={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2},_default:"swing"},n.fx=Ra.prototype.init,n.fx.step={};var Sa,Ta,Ua=/^(?:toggle|show|hide)$/,Va=/queueHooks$/;function Wa(){return a.setTimeout(function(){Sa=void 0}),Sa=n.now()}function Xa(a,b){var c,d=0,e={height:a};for(b=b?1:0;4>d;d+=2-b)c=U[d],e["margin"+c]=e["padding"+c]=a;return b&&(e.opacity=e.width=a),e}function Ya(a,b,c){for(var d,e=(_a.tweeners[b]||[]).concat(_a.tweeners["*"]),f=0,g=e.length;g>f;f++)if(d=e[f].call(c,b,a))return d}function Za(a,b,c){var d,e,f,g,h,i,j,k,l=this,m={},o=a.style,p=a.nodeType&&V(a),q=N.get(a,"fxshow");c.queue||(h=n._queueHooks(a,"fx"),null==h.unqueued&&(h.unqueued=0,i=h.empty.fire,h.empty.fire=function(){h.unqueued||i()}),h.unqueued++,l.always(function(){l.always(function(){h.unqueued--,n.queue(a,"fx").length||h.empty.fire()})})),1===a.nodeType&&("height"in b||"width"in b)&&(c.overflow=[o.overflow,o.overflowX,o.overflowY],j=n.css(a,"display"),k="none"===j?N.get(a,"olddisplay")||za(a.nodeName):j,"inline"===k&&"none"===n.css(a,"float")&&(o.display="inline-block")),c.overflow&&(o.overflow="hidden",l.always(function(){o.overflow=c.overflow[0],o.overflowX=c.overflow[1],o.overflowY=c.overflow[2]}));for(d in b)if(e=b[d],Ua.exec(e)){if(delete b[d],f=f||"toggle"===e,e===(p?"hide":"show")){if("show"!==e||!q||void 0===q[d])continue;p=!0}m[d]=q&&q[d]||n.style(a,d)}else j=void 0;if(n.isEmptyObject(m))"inline"===("none"===j?za(a.nodeName):j)&&(o.display=j);else{q?"hidden"in q&&(p=q.hidden):q=N.access(a,"fxshow",{}),f&&(q.hidden=!p),p?n(a).show():l.done(function(){n(a).hide()}),l.done(function(){var b;N.remove(a,"fxshow");for(b in m)n.style(a,b,m[b])});for(d in m)g=Ya(p?q[d]:0,d,l),d in q||(q[d]=g.start,p&&(g.end=g.start,g.start="width"===d||"height"===d?1:0))}}function $a(a,b){var c,d,e,f,g;for(c in a)if(d=n.camelCase(c),e=b[d],f=a[c],n.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=n.cssHooks[d],g&&"expand"in g){f=g.expand(f),delete a[d];for(c in f)c in a||(a[c]=f[c],b[c]=e)}else b[d]=e}function _a(a,b,c){var d,e,f=0,g=_a.prefilters.length,h=n.Deferred().always(function(){delete i.elem}),i=function(){if(e)return!1;for(var b=Sa||Wa(),c=Math.max(0,j.startTime+j.duration-b),d=c/j.duration||0,f=1-d,g=0,i=j.tweens.length;i>g;g++)j.tweens[g].run(f);return h.notifyWith(a,[j,f,c]),1>f&&i?c:(h.resolveWith(a,[j]),!1)},j=h.promise({elem:a,props:n.extend({},b),opts:n.extend(!0,{specialEasing:{},easing:n.easing._default},c),originalProperties:b,originalOptions:c,startTime:Sa||Wa(),duration:c.duration,tweens:[],createTween:function(b,c){var d=n.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);return j.tweens.push(d),d},stop:function(b){var c=0,d=b?j.tweens.length:0;if(e)return this;for(e=!0;d>c;c++)j.tweens[c].run(1);return b?(h.notifyWith(a,[j,1,0]),h.resolveWith(a,[j,b])):h.rejectWith(a,[j,b]),this}}),k=j.props;for($a(k,j.opts.specialEasing);g>f;f++)if(d=_a.prefilters[f].call(j,a,k,j.opts))return n.isFunction(d.stop)&&(n._queueHooks(j.elem,j.opts.queue).stop=n.proxy(d.stop,d)),d;return n.map(k,Ya,j),n.isFunction(j.opts.start)&&j.opts.start.call(a,j),n.fx.timer(n.extend(i,{elem:a,anim:j,queue:j.opts.queue})),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always)}n.Animation=n.extend(_a,{tweeners:{"*":[function(a,b){var c=this.createTween(a,b);return W(c.elem,a,T.exec(b),c),c}]},tweener:function(a,b){n.isFunction(a)?(b=a,a=["*"]):a=a.match(G);for(var c,d=0,e=a.length;e>d;d++)c=a[d],_a.tweeners[c]=_a.tweeners[c]||[],_a.tweeners[c].unshift(b)},prefilters:[Za],prefilter:function(a,b){b?_a.prefilters.unshift(a):_a.prefilters.push(a)}}),n.speed=function(a,b,c){var d=a&&"object"==typeof a?n.extend({},a):{complete:c||!c&&b||n.isFunction(a)&&a,duration:a,easing:c&&b||b&&!n.isFunction(b)&&b};return d.duration=n.fx.off?0:"number"==typeof d.duration?d.duration:d.duration in n.fx.speeds?n.fx.speeds[d.duration]:n.fx.speeds._default,null!=d.queue&&d.queue!==!0||(d.queue="fx"),d.old=d.complete,d.complete=function(){n.isFunction(d.old)&&d.old.call(this),d.queue&&n.dequeue(this,d.queue)},d},n.fn.extend({fadeTo:function(a,b,c,d){return this.filter(V).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=n.isEmptyObject(a),f=n.speed(b,c,d),g=function(){var b=_a(this,n.extend({},a),f);(e||N.get(this,"finish"))&&b.stop(!0)};return g.finish=g,e||f.queue===!1?this.each(g):this.queue(f.queue,g)},stop:function(a,b,c){var d=function(a){var b=a.stop;delete a.stop,b(c)};return"string"!=typeof a&&(c=b,b=a,a=void 0),b&&a!==!1&&this.queue(a||"fx",[]),this.each(function(){var b=!0,e=null!=a&&a+"queueHooks",f=n.timers,g=N.get(this);if(e)g[e]&&g[e].stop&&d(g[e]);else for(e in g)g[e]&&g[e].stop&&Va.test(e)&&d(g[e]);for(e=f.length;e--;)f[e].elem!==this||null!=a&&f[e].queue!==a||(f[e].anim.stop(c),b=!1,f.splice(e,1));!b&&c||n.dequeue(this,a)})},finish:function(a){return a!==!1&&(a=a||"fx"),this.each(function(){var b,c=N.get(this),d=c[a+"queue"],e=c[a+"queueHooks"],f=n.timers,g=d?d.length:0;for(c.finish=!0,n.queue(this,a,[]),e&&e.stop&&e.stop.call(this,!0),b=f.length;b--;)f[b].elem===this&&f[b].queue===a&&(f[b].anim.stop(!0),f.splice(b,1));for(b=0;g>b;b++)d[b]&&d[b].finish&&d[b].finish.call(this);delete c.finish})}}),n.each(["toggle","show","hide"],function(a,b){var c=n.fn[b];n.fn[b]=function(a,d,e){return null==a||"boolean"==typeof a?c.apply(this,arguments):this.animate(Xa(b,!0),a,d,e)}}),n.each({slideDown:Xa("show"),slideUp:Xa("hide"),slideToggle:Xa("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){n.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),n.timers=[],n.fx.tick=function(){var a,b=0,c=n.timers;for(Sa=n.now();b<c.length;b++)a=c[b],a()||c[b]!==a||c.splice(b--,1);c.length||n.fx.stop(),Sa=void 0},n.fx.timer=function(a){n.timers.push(a),a()?n.fx.start():n.timers.pop()},n.fx.interval=13,n.fx.start=function(){Ta||(Ta=a.setInterval(n.fx.tick,n.fx.interval))},n.fx.stop=function(){a.clearInterval(Ta),Ta=null},n.fx.speeds={slow:600,fast:200,_default:400},n.fn.delay=function(b,c){return b=n.fx?n.fx.speeds[b]||b:b,c=c||"fx",this.queue(c,function(c,d){var e=a.setTimeout(c,b);d.stop=function(){a.clearTimeout(e)}})},function(){var a=d.createElement("input"),b=d.createElement("select"),c=b.appendChild(d.createElement("option"));a.type="checkbox",l.checkOn=""!==a.value,l.optSelected=c.selected,b.disabled=!0,l.optDisabled=!c.disabled,a=d.createElement("input"),a.value="t",a.type="radio",l.radioValue="t"===a.value}();var ab,bb=n.expr.attrHandle;n.fn.extend({attr:function(a,b){return K(this,n.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){n.removeAttr(this,a)})}}),n.extend({attr:function(a,b,c){var d,e,f=a.nodeType;if(3!==f&&8!==f&&2!==f)return"undefined"==typeof a.getAttribute?n.prop(a,b,c):(1===f&&n.isXMLDoc(a)||(b=b.toLowerCase(),e=n.attrHooks[b]||(n.expr.match.bool.test(b)?ab:void 0)),void 0!==c?null===c?void n.removeAttr(a,b):e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:(a.setAttribute(b,c+""),c):e&&"get"in e&&null!==(d=e.get(a,b))?d:(d=n.find.attr(a,b),null==d?void 0:d))},attrHooks:{type:{set:function(a,b){if(!l.radioValue&&"radio"===b&&n.nodeName(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}}},removeAttr:function(a,b){var c,d,e=0,f=b&&b.match(G);if(f&&1===a.nodeType)while(c=f[e++])d=n.propFix[c]||c,n.expr.match.bool.test(c)&&(a[d]=!1),a.removeAttribute(c)}}),ab={set:function(a,b,c){return b===!1?n.removeAttr(a,c):a.setAttribute(c,c),c}},n.each(n.expr.match.bool.source.match(/\w+/g),function(a,b){var c=bb[b]||n.find.attr;bb[b]=function(a,b,d){var e,f;return d||(f=bb[b],bb[b]=e,e=null!=c(a,b,d)?b.toLowerCase():null,bb[b]=f),e}});var cb=/^(?:input|select|textarea|button)$/i,db=/^(?:a|area)$/i;n.fn.extend({prop:function(a,b){return K(this,n.prop,a,b,arguments.length>1)},removeProp:function(a){return this.each(function(){delete this[n.propFix[a]||a]})}}),n.extend({prop:function(a,b,c){var d,e,f=a.nodeType;if(3!==f&&8!==f&&2!==f)return 1===f&&n.isXMLDoc(a)||(b=n.propFix[b]||b,e=n.propHooks[b]),
void 0!==c?e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:a[b]=c:e&&"get"in e&&null!==(d=e.get(a,b))?d:a[b]},propHooks:{tabIndex:{get:function(a){var b=n.find.attr(a,"tabindex");return b?parseInt(b,10):cb.test(a.nodeName)||db.test(a.nodeName)&&a.href?0:-1}}},propFix:{"for":"htmlFor","class":"className"}}),l.optSelected||(n.propHooks.selected={get:function(a){var b=a.parentNode;return b&&b.parentNode&&b.parentNode.selectedIndex,null},set:function(a){var b=a.parentNode;b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex)}}),n.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){n.propFix[this.toLowerCase()]=this});var eb=/[\t\r\n\f]/g;function fb(a){return a.getAttribute&&a.getAttribute("class")||""}n.fn.extend({addClass:function(a){var b,c,d,e,f,g,h,i=0;if(n.isFunction(a))return this.each(function(b){n(this).addClass(a.call(this,b,fb(this)))});if("string"==typeof a&&a){b=a.match(G)||[];while(c=this[i++])if(e=fb(c),d=1===c.nodeType&&(" "+e+" ").replace(eb," ")){g=0;while(f=b[g++])d.indexOf(" "+f+" ")<0&&(d+=f+" ");h=n.trim(d),e!==h&&c.setAttribute("class",h)}}return this},removeClass:function(a){var b,c,d,e,f,g,h,i=0;if(n.isFunction(a))return this.each(function(b){n(this).removeClass(a.call(this,b,fb(this)))});if(!arguments.length)return this.attr("class","");if("string"==typeof a&&a){b=a.match(G)||[];while(c=this[i++])if(e=fb(c),d=1===c.nodeType&&(" "+e+" ").replace(eb," ")){g=0;while(f=b[g++])while(d.indexOf(" "+f+" ")>-1)d=d.replace(" "+f+" "," ");h=n.trim(d),e!==h&&c.setAttribute("class",h)}}return this},toggleClass:function(a,b){var c=typeof a;return"boolean"==typeof b&&"string"===c?b?this.addClass(a):this.removeClass(a):n.isFunction(a)?this.each(function(c){n(this).toggleClass(a.call(this,c,fb(this),b),b)}):this.each(function(){var b,d,e,f;if("string"===c){d=0,e=n(this),f=a.match(G)||[];while(b=f[d++])e.hasClass(b)?e.removeClass(b):e.addClass(b)}else void 0!==a&&"boolean"!==c||(b=fb(this),b&&N.set(this,"__className__",b),this.setAttribute&&this.setAttribute("class",b||a===!1?"":N.get(this,"__className__")||""))})},hasClass:function(a){var b,c,d=0;b=" "+a+" ";while(c=this[d++])if(1===c.nodeType&&(" "+fb(c)+" ").replace(eb," ").indexOf(b)>-1)return!0;return!1}});var gb=/\r/g,hb=/[\x20\t\r\n\f]+/g;n.fn.extend({val:function(a){var b,c,d,e=this[0];{if(arguments.length)return d=n.isFunction(a),this.each(function(c){var e;1===this.nodeType&&(e=d?a.call(this,c,n(this).val()):a,null==e?e="":"number"==typeof e?e+="":n.isArray(e)&&(e=n.map(e,function(a){return null==a?"":a+""})),b=n.valHooks[this.type]||n.valHooks[this.nodeName.toLowerCase()],b&&"set"in b&&void 0!==b.set(this,e,"value")||(this.value=e))});if(e)return b=n.valHooks[e.type]||n.valHooks[e.nodeName.toLowerCase()],b&&"get"in b&&void 0!==(c=b.get(e,"value"))?c:(c=e.value,"string"==typeof c?c.replace(gb,""):null==c?"":c)}}}),n.extend({valHooks:{option:{get:function(a){var b=n.find.attr(a,"value");return null!=b?b:n.trim(n.text(a)).replace(hb," ")}},select:{get:function(a){for(var b,c,d=a.options,e=a.selectedIndex,f="select-one"===a.type||0>e,g=f?null:[],h=f?e+1:d.length,i=0>e?h:f?e:0;h>i;i++)if(c=d[i],(c.selected||i===e)&&(l.optDisabled?!c.disabled:null===c.getAttribute("disabled"))&&(!c.parentNode.disabled||!n.nodeName(c.parentNode,"optgroup"))){if(b=n(c).val(),f)return b;g.push(b)}return g},set:function(a,b){var c,d,e=a.options,f=n.makeArray(b),g=e.length;while(g--)d=e[g],(d.selected=n.inArray(n.valHooks.option.get(d),f)>-1)&&(c=!0);return c||(a.selectedIndex=-1),f}}}}),n.each(["radio","checkbox"],function(){n.valHooks[this]={set:function(a,b){return n.isArray(b)?a.checked=n.inArray(n(a).val(),b)>-1:void 0}},l.checkOn||(n.valHooks[this].get=function(a){return null===a.getAttribute("value")?"on":a.value})});var ib=/^(?:focusinfocus|focusoutblur)$/;n.extend(n.event,{trigger:function(b,c,e,f){var g,h,i,j,l,m,o,p=[e||d],q=k.call(b,"type")?b.type:b,r=k.call(b,"namespace")?b.namespace.split("."):[];if(h=i=e=e||d,3!==e.nodeType&&8!==e.nodeType&&!ib.test(q+n.event.triggered)&&(q.indexOf(".")>-1&&(r=q.split("."),q=r.shift(),r.sort()),l=q.indexOf(":")<0&&"on"+q,b=b[n.expando]?b:new n.Event(q,"object"==typeof b&&b),b.isTrigger=f?2:3,b.namespace=r.join("."),b.rnamespace=b.namespace?new RegExp("(^|\\.)"+r.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,b.result=void 0,b.target||(b.target=e),c=null==c?[b]:n.makeArray(c,[b]),o=n.event.special[q]||{},f||!o.trigger||o.trigger.apply(e,c)!==!1)){if(!f&&!o.noBubble&&!n.isWindow(e)){for(j=o.delegateType||q,ib.test(j+q)||(h=h.parentNode);h;h=h.parentNode)p.push(h),i=h;i===(e.ownerDocument||d)&&p.push(i.defaultView||i.parentWindow||a)}g=0;while((h=p[g++])&&!b.isPropagationStopped())b.type=g>1?j:o.bindType||q,m=(N.get(h,"events")||{})[b.type]&&N.get(h,"handle"),m&&m.apply(h,c),m=l&&h[l],m&&m.apply&&L(h)&&(b.result=m.apply(h,c),b.result===!1&&b.preventDefault());return b.type=q,f||b.isDefaultPrevented()||o._default&&o._default.apply(p.pop(),c)!==!1||!L(e)||l&&n.isFunction(e[q])&&!n.isWindow(e)&&(i=e[l],i&&(e[l]=null),n.event.triggered=q,e[q](),n.event.triggered=void 0,i&&(e[l]=i)),b.result}},simulate:function(a,b,c){var d=n.extend(new n.Event,c,{type:a,isSimulated:!0});n.event.trigger(d,null,b)}}),n.fn.extend({trigger:function(a,b){return this.each(function(){n.event.trigger(a,b,this)})},triggerHandler:function(a,b){var c=this[0];return c?n.event.trigger(a,b,c,!0):void 0}}),n.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){n.fn[b]=function(a,c){return arguments.length>0?this.on(b,null,a,c):this.trigger(b)}}),n.fn.extend({hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}}),l.focusin="onfocusin"in a,l.focusin||n.each({focus:"focusin",blur:"focusout"},function(a,b){var c=function(a){n.event.simulate(b,a.target,n.event.fix(a))};n.event.special[b]={setup:function(){var d=this.ownerDocument||this,e=N.access(d,b);e||d.addEventListener(a,c,!0),N.access(d,b,(e||0)+1)},teardown:function(){var d=this.ownerDocument||this,e=N.access(d,b)-1;e?N.access(d,b,e):(d.removeEventListener(a,c,!0),N.remove(d,b))}}});var jb=a.location,kb=n.now(),lb=/\?/;n.parseJSON=function(a){return JSON.parse(a+"")},n.parseXML=function(b){var c;if(!b||"string"!=typeof b)return null;try{c=(new a.DOMParser).parseFromString(b,"text/xml")}catch(d){c=void 0}return c&&!c.getElementsByTagName("parsererror").length||n.error("Invalid XML: "+b),c};var mb=/#.*$/,nb=/([?&])_=[^&]*/,ob=/^(.*?):[ \t]*([^\r\n]*)$/gm,pb=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,qb=/^(?:GET|HEAD)$/,rb=/^\/\//,sb={},tb={},ub="*/".concat("*"),vb=d.createElement("a");vb.href=jb.href;function wb(a){return function(b,c){"string"!=typeof b&&(c=b,b="*");var d,e=0,f=b.toLowerCase().match(G)||[];if(n.isFunction(c))while(d=f[e++])"+"===d[0]?(d=d.slice(1)||"*",(a[d]=a[d]||[]).unshift(c)):(a[d]=a[d]||[]).push(c)}}function xb(a,b,c,d){var e={},f=a===tb;function g(h){var i;return e[h]=!0,n.each(a[h]||[],function(a,h){var j=h(b,c,d);return"string"!=typeof j||f||e[j]?f?!(i=j):void 0:(b.dataTypes.unshift(j),g(j),!1)}),i}return g(b.dataTypes[0])||!e["*"]&&g("*")}function yb(a,b){var c,d,e=n.ajaxSettings.flatOptions||{};for(c in b)void 0!==b[c]&&((e[c]?a:d||(d={}))[c]=b[c]);return d&&n.extend(!0,a,d),a}function zb(a,b,c){var d,e,f,g,h=a.contents,i=a.dataTypes;while("*"===i[0])i.shift(),void 0===d&&(d=a.mimeType||b.getResponseHeader("Content-Type"));if(d)for(e in h)if(h[e]&&h[e].test(d)){i.unshift(e);break}if(i[0]in c)f=i[0];else{for(e in c){if(!i[0]||a.converters[e+" "+i[0]]){f=e;break}g||(g=e)}f=f||g}return f?(f!==i[0]&&i.unshift(f),c[f]):void 0}function Ab(a,b,c,d){var e,f,g,h,i,j={},k=a.dataTypes.slice();if(k[1])for(g in a.converters)j[g.toLowerCase()]=a.converters[g];f=k.shift();while(f)if(a.responseFields[f]&&(c[a.responseFields[f]]=b),!i&&d&&a.dataFilter&&(b=a.dataFilter(b,a.dataType)),i=f,f=k.shift())if("*"===f)f=i;else if("*"!==i&&i!==f){if(g=j[i+" "+f]||j["* "+f],!g)for(e in j)if(h=e.split(" "),h[1]===f&&(g=j[i+" "+h[0]]||j["* "+h[0]])){g===!0?g=j[e]:j[e]!==!0&&(f=h[0],k.unshift(h[1]));break}if(g!==!0)if(g&&a["throws"])b=g(b);else try{b=g(b)}catch(l){return{state:"parsererror",error:g?l:"No conversion from "+i+" to "+f}}}return{state:"success",data:b}}n.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:jb.href,type:"GET",isLocal:pb.test(jb.protocol),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":ub,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/\bxml\b/,html:/\bhtml/,json:/\bjson\b/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":n.parseJSON,"text xml":n.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(a,b){return b?yb(yb(a,n.ajaxSettings),b):yb(n.ajaxSettings,a)},ajaxPrefilter:wb(sb),ajaxTransport:wb(tb),ajax:function(b,c){"object"==typeof b&&(c=b,b=void 0),c=c||{};var e,f,g,h,i,j,k,l,m=n.ajaxSetup({},c),o=m.context||m,p=m.context&&(o.nodeType||o.jquery)?n(o):n.event,q=n.Deferred(),r=n.Callbacks("once memory"),s=m.statusCode||{},t={},u={},v=0,w="canceled",x={readyState:0,getResponseHeader:function(a){var b;if(2===v){if(!h){h={};while(b=ob.exec(g))h[b[1].toLowerCase()]=b[2]}b=h[a.toLowerCase()]}return null==b?null:b},getAllResponseHeaders:function(){return 2===v?g:null},setRequestHeader:function(a,b){var c=a.toLowerCase();return v||(a=u[c]=u[c]||a,t[a]=b),this},overrideMimeType:function(a){return v||(m.mimeType=a),this},statusCode:function(a){var b;if(a)if(2>v)for(b in a)s[b]=[s[b],a[b]];else x.always(a[x.status]);return this},abort:function(a){var b=a||w;return e&&e.abort(b),z(0,b),this}};if(q.promise(x).complete=r.add,x.success=x.done,x.error=x.fail,m.url=((b||m.url||jb.href)+"").replace(mb,"").replace(rb,jb.protocol+"//"),m.type=c.method||c.type||m.method||m.type,m.dataTypes=n.trim(m.dataType||"*").toLowerCase().match(G)||[""],null==m.crossDomain){j=d.createElement("a");try{j.href=m.url,j.href=j.href,m.crossDomain=vb.protocol+"//"+vb.host!=j.protocol+"//"+j.host}catch(y){m.crossDomain=!0}}if(m.data&&m.processData&&"string"!=typeof m.data&&(m.data=n.param(m.data,m.traditional)),xb(sb,m,c,x),2===v)return x;k=n.event&&m.global,k&&0===n.active++&&n.event.trigger("ajaxStart"),m.type=m.type.toUpperCase(),m.hasContent=!qb.test(m.type),f=m.url,m.hasContent||(m.data&&(f=m.url+=(lb.test(f)?"&":"?")+m.data,delete m.data),m.cache===!1&&(m.url=nb.test(f)?f.replace(nb,"$1_="+kb++):f+(lb.test(f)?"&":"?")+"_="+kb++)),m.ifModified&&(n.lastModified[f]&&x.setRequestHeader("If-Modified-Since",n.lastModified[f]),n.etag[f]&&x.setRequestHeader("If-None-Match",n.etag[f])),(m.data&&m.hasContent&&m.contentType!==!1||c.contentType)&&x.setRequestHeader("Content-Type",m.contentType),x.setRequestHeader("Accept",m.dataTypes[0]&&m.accepts[m.dataTypes[0]]?m.accepts[m.dataTypes[0]]+("*"!==m.dataTypes[0]?", "+ub+"; q=0.01":""):m.accepts["*"]);for(l in m.headers)x.setRequestHeader(l,m.headers[l]);if(m.beforeSend&&(m.beforeSend.call(o,x,m)===!1||2===v))return x.abort();w="abort";for(l in{success:1,error:1,complete:1})x[l](m[l]);if(e=xb(tb,m,c,x)){if(x.readyState=1,k&&p.trigger("ajaxSend",[x,m]),2===v)return x;m.async&&m.timeout>0&&(i=a.setTimeout(function(){x.abort("timeout")},m.timeout));try{v=1,e.send(t,z)}catch(y){if(!(2>v))throw y;z(-1,y)}}else z(-1,"No Transport");function z(b,c,d,h){var j,l,t,u,w,y=c;2!==v&&(v=2,i&&a.clearTimeout(i),e=void 0,g=h||"",x.readyState=b>0?4:0,j=b>=200&&300>b||304===b,d&&(u=zb(m,x,d)),u=Ab(m,u,x,j),j?(m.ifModified&&(w=x.getResponseHeader("Last-Modified"),w&&(n.lastModified[f]=w),w=x.getResponseHeader("etag"),w&&(n.etag[f]=w)),204===b||"HEAD"===m.type?y="nocontent":304===b?y="notmodified":(y=u.state,l=u.data,t=u.error,j=!t)):(t=y,!b&&y||(y="error",0>b&&(b=0))),x.status=b,x.statusText=(c||y)+"",j?q.resolveWith(o,[l,y,x]):q.rejectWith(o,[x,y,t]),x.statusCode(s),s=void 0,k&&p.trigger(j?"ajaxSuccess":"ajaxError",[x,m,j?l:t]),r.fireWith(o,[x,y]),k&&(p.trigger("ajaxComplete",[x,m]),--n.active||n.event.trigger("ajaxStop")))}return x},getJSON:function(a,b,c){return n.get(a,b,c,"json")},getScript:function(a,b){return n.get(a,void 0,b,"script")}}),n.each(["get","post"],function(a,b){n[b]=function(a,c,d,e){return n.isFunction(c)&&(e=e||d,d=c,c=void 0),n.ajax(n.extend({url:a,type:b,dataType:e,data:c,success:d},n.isPlainObject(a)&&a))}}),n._evalUrl=function(a){return n.ajax({url:a,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})},n.fn.extend({wrapAll:function(a){var b;return n.isFunction(a)?this.each(function(b){n(this).wrapAll(a.call(this,b))}):(this[0]&&(b=n(a,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstElementChild)a=a.firstElementChild;return a}).append(this)),this)},wrapInner:function(a){return n.isFunction(a)?this.each(function(b){n(this).wrapInner(a.call(this,b))}):this.each(function(){var b=n(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=n.isFunction(a);return this.each(function(c){n(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){n.nodeName(this,"body")||n(this).replaceWith(this.childNodes)}).end()}}),n.expr.filters.hidden=function(a){return!n.expr.filters.visible(a)},n.expr.filters.visible=function(a){return a.offsetWidth>0||a.offsetHeight>0||a.getClientRects().length>0};var Bb=/%20/g,Cb=/\[\]$/,Db=/\r?\n/g,Eb=/^(?:submit|button|image|reset|file)$/i,Fb=/^(?:input|select|textarea|keygen)/i;function Gb(a,b,c,d){var e;if(n.isArray(b))n.each(b,function(b,e){c||Cb.test(a)?d(a,e):Gb(a+"["+("object"==typeof e&&null!=e?b:"")+"]",e,c,d)});else if(c||"object"!==n.type(b))d(a,b);else for(e in b)Gb(a+"["+e+"]",b[e],c,d)}n.param=function(a,b){var c,d=[],e=function(a,b){b=n.isFunction(b)?b():null==b?"":b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};if(void 0===b&&(b=n.ajaxSettings&&n.ajaxSettings.traditional),n.isArray(a)||a.jquery&&!n.isPlainObject(a))n.each(a,function(){e(this.name,this.value)});else for(c in a)Gb(c,a[c],b,e);return d.join("&").replace(Bb,"+")},n.fn.extend({serialize:function(){return n.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var a=n.prop(this,"elements");return a?n.makeArray(a):this}).filter(function(){var a=this.type;return this.name&&!n(this).is(":disabled")&&Fb.test(this.nodeName)&&!Eb.test(a)&&(this.checked||!X.test(a))}).map(function(a,b){var c=n(this).val();return null==c?null:n.isArray(c)?n.map(c,function(a){return{name:b.name,value:a.replace(Db,"\r\n")}}):{name:b.name,value:c.replace(Db,"\r\n")}}).get()}}),n.ajaxSettings.xhr=function(){try{return new a.XMLHttpRequest}catch(b){}};var Hb={0:200,1223:204},Ib=n.ajaxSettings.xhr();l.cors=!!Ib&&"withCredentials"in Ib,l.ajax=Ib=!!Ib,n.ajaxTransport(function(b){var c,d;return l.cors||Ib&&!b.crossDomain?{send:function(e,f){var g,h=b.xhr();if(h.open(b.type,b.url,b.async,b.username,b.password),b.xhrFields)for(g in b.xhrFields)h[g]=b.xhrFields[g];b.mimeType&&h.overrideMimeType&&h.overrideMimeType(b.mimeType),b.crossDomain||e["X-Requested-With"]||(e["X-Requested-With"]="XMLHttpRequest");for(g in e)h.setRequestHeader(g,e[g]);c=function(a){return function(){c&&(c=d=h.onload=h.onerror=h.onabort=h.onreadystatechange=null,"abort"===a?h.abort():"error"===a?"number"!=typeof h.status?f(0,"error"):f(h.status,h.statusText):f(Hb[h.status]||h.status,h.statusText,"text"!==(h.responseType||"text")||"string"!=typeof h.responseText?{binary:h.response}:{text:h.responseText},h.getAllResponseHeaders()))}},h.onload=c(),d=h.onerror=c("error"),void 0!==h.onabort?h.onabort=d:h.onreadystatechange=function(){4===h.readyState&&a.setTimeout(function(){c&&d()})},c=c("abort");try{h.send(b.hasContent&&b.data||null)}catch(i){if(c)throw i}},abort:function(){c&&c()}}:void 0}),n.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/\b(?:java|ecma)script\b/},converters:{"text script":function(a){return n.globalEval(a),a}}}),n.ajaxPrefilter("script",function(a){void 0===a.cache&&(a.cache=!1),a.crossDomain&&(a.type="GET")}),n.ajaxTransport("script",function(a){if(a.crossDomain){var b,c;return{send:function(e,f){b=n("<script>").prop({charset:a.scriptCharset,src:a.url}).on("load error",c=function(a){b.remove(),c=null,a&&f("error"===a.type?404:200,a.type)}),d.head.appendChild(b[0])},abort:function(){c&&c()}}}});var Jb=[],Kb=/(=)\?(?=&|$)|\?\?/;n.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=Jb.pop()||n.expando+"_"+kb++;return this[a]=!0,a}}),n.ajaxPrefilter("json jsonp",function(b,c,d){var e,f,g,h=b.jsonp!==!1&&(Kb.test(b.url)?"url":"string"==typeof b.data&&0===(b.contentType||"").indexOf("application/x-www-form-urlencoded")&&Kb.test(b.data)&&"data");return h||"jsonp"===b.dataTypes[0]?(e=b.jsonpCallback=n.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,h?b[h]=b[h].replace(Kb,"$1"+e):b.jsonp!==!1&&(b.url+=(lb.test(b.url)?"&":"?")+b.jsonp+"="+e),b.converters["script json"]=function(){return g||n.error(e+" was not called"),g[0]},b.dataTypes[0]="json",f=a[e],a[e]=function(){g=arguments},d.always(function(){void 0===f?n(a).removeProp(e):a[e]=f,b[e]&&(b.jsonpCallback=c.jsonpCallback,Jb.push(e)),g&&n.isFunction(f)&&f(g[0]),g=f=void 0}),"script"):void 0}),n.parseHTML=function(a,b,c){if(!a||"string"!=typeof a)return null;"boolean"==typeof b&&(c=b,b=!1),b=b||d;var e=x.exec(a),f=!c&&[];return e?[b.createElement(e[1])]:(e=ca([a],b,f),f&&f.length&&n(f).remove(),n.merge([],e.childNodes))};var Lb=n.fn.load;n.fn.load=function(a,b,c){if("string"!=typeof a&&Lb)return Lb.apply(this,arguments);var d,e,f,g=this,h=a.indexOf(" ");return h>-1&&(d=n.trim(a.slice(h)),a=a.slice(0,h)),n.isFunction(b)?(c=b,b=void 0):b&&"object"==typeof b&&(e="POST"),g.length>0&&n.ajax({url:a,type:e||"GET",dataType:"html",data:b}).done(function(a){f=arguments,g.html(d?n("<div>").append(n.parseHTML(a)).find(d):a)}).always(c&&function(a,b){g.each(function(){c.apply(this,f||[a.responseText,b,a])})}),this},n.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(a,b){n.fn[b]=function(a){return this.on(b,a)}}),n.expr.filters.animated=function(a){return n.grep(n.timers,function(b){return a===b.elem}).length};function Mb(a){return n.isWindow(a)?a:9===a.nodeType&&a.defaultView}n.offset={setOffset:function(a,b,c){var d,e,f,g,h,i,j,k=n.css(a,"position"),l=n(a),m={};"static"===k&&(a.style.position="relative"),h=l.offset(),f=n.css(a,"top"),i=n.css(a,"left"),j=("absolute"===k||"fixed"===k)&&(f+i).indexOf("auto")>-1,j?(d=l.position(),g=d.top,e=d.left):(g=parseFloat(f)||0,e=parseFloat(i)||0),n.isFunction(b)&&(b=b.call(a,c,n.extend({},h))),null!=b.top&&(m.top=b.top-h.top+g),null!=b.left&&(m.left=b.left-h.left+e),"using"in b?b.using.call(a,m):l.css(m)}},n.fn.extend({offset:function(a){if(arguments.length)return void 0===a?this:this.each(function(b){n.offset.setOffset(this,a,b)});var b,c,d=this[0],e={top:0,left:0},f=d&&d.ownerDocument;if(f)return b=f.documentElement,n.contains(b,d)?(e=d.getBoundingClientRect(),c=Mb(f),{top:e.top+c.pageYOffset-b.clientTop,left:e.left+c.pageXOffset-b.clientLeft}):e},position:function(){if(this[0]){var a,b,c=this[0],d={top:0,left:0};return"fixed"===n.css(c,"position")?b=c.getBoundingClientRect():(a=this.offsetParent(),b=this.offset(),n.nodeName(a[0],"html")||(d=a.offset()),d.top+=n.css(a[0],"borderTopWidth",!0),d.left+=n.css(a[0],"borderLeftWidth",!0)),{top:b.top-d.top-n.css(c,"marginTop",!0),left:b.left-d.left-n.css(c,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var a=this.offsetParent;while(a&&"static"===n.css(a,"position"))a=a.offsetParent;return a||Ea})}}),n.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(a,b){var c="pageYOffset"===b;n.fn[a]=function(d){return K(this,function(a,d,e){var f=Mb(a);return void 0===e?f?f[b]:a[d]:void(f?f.scrollTo(c?f.pageXOffset:e,c?e:f.pageYOffset):a[d]=e)},a,d,arguments.length)}}),n.each(["top","left"],function(a,b){n.cssHooks[b]=Ga(l.pixelPosition,function(a,c){return c?(c=Fa(a,b),Ba.test(c)?n(a).position()[b]+"px":c):void 0})}),n.each({Height:"height",Width:"width"},function(a,b){n.each({padding:"inner"+a,content:b,"":"outer"+a},function(c,d){n.fn[d]=function(d,e){var f=arguments.length&&(c||"boolean"!=typeof d),g=c||(d===!0||e===!0?"margin":"border");return K(this,function(b,c,d){var e;return n.isWindow(b)?b.document.documentElement["client"+a]:9===b.nodeType?(e=b.documentElement,Math.max(b.body["scroll"+a],e["scroll"+a],b.body["offset"+a],e["offset"+a],e["client"+a])):void 0===d?n.css(b,c,g):n.style(b,c,d,g)},b,f?d:void 0,f,null)}})}),n.fn.extend({bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return 1===arguments.length?this.off(a,"**"):this.off(b,a||"**",c)},size:function(){return this.length}}),n.fn.andSelf=n.fn.addBack,"function"==typeof define&&define.amd&&define("jquery",[],function(){return n});var Nb=a.jQuery,Ob=a.$;return n.noConflict=function(b){return a.$===n&&(a.$=Ob),b&&a.jQuery===n&&(a.jQuery=Nb),n},b||(a.jQuery=a.$=n),n});

/*

 arcticModal — jQuery plugin
 Version: 0.3
 Author: Sergey Predvoditelev (sergey.predvoditelev@gmail.com)
 Company: Arctic Laboratory (http://arcticlab.ru/)

 Docs & Examples: http://arcticlab.ru/arcticmodal/

 */
(function($) {


	var default_options = {

		type: 'html', // ajax или html
		content: '',
		url: '',
		ajax: {},
		ajax_request: null,

		closeOnEsc: true,
		closeOnOverlayClick: true,

		clone: false,

		overlay: {
			block: undefined,
			tpl: '<div class="arcticmodal-overlay"></div>',
			css: {
				backgroundColor: '#000',
				opacity: .6
			}
		},

		container: {
			block: undefined,
			tpl: '<div class="arcticmodal-container"><table class="arcticmodal-container_i"><tr><td class="arcticmodal-container_i2"></td></tr></table></div>'
		},

		wrap: undefined,
		body: undefined,

		errors: {
			tpl: '<div class="arcticmodal-error arcticmodal-close"></div>',
			autoclose_delay: 2000,
			ajax_unsuccessful_load: 'Error'
		},

		openEffect: {
			type: 'fade',
			speed: 400
		},
		closeEffect: {
			type: 'fade',
			speed: 400
		},

		beforeOpen: $.noop,
		afterOpen: $.noop,
		beforeClose: $.noop,
		afterClose: $.noop,
		afterLoading: $.noop,
		afterLoadingOnShow: $.noop,
		errorLoading: $.noop

	};


	var modalID = 0;
	var modals = $([]);


	var utils = {


		// Определяет произошло ли событие e вне блока block
		isEventOut: function(blocks, e) {
			var r = true;
			$(blocks).each(function() {
				if ($(e.target).get(0)==$(this).get(0)) r = false;
				if ($(e.target).closest('HTML', $(this).get(0)).length==0) r = false;
			});
			return r;
		}


	};


	var modal = {


		// Возвращает элемент, которым был вызван плагин
		getParentEl: function(el) {
			var r = $(el);
			if (r.data('arcticmodal')) return r;
			r = $(el).closest('.arcticmodal-container').data('arcticmodalParentEl');
			if (r) return r;
			return false;
		},


		// Переход
		transition: function(el, action, options, callback) {
			callback = callback==undefined ? $.noop : callback;
			switch (options.type) {
				case 'fade':
					action=='show' ? el.fadeIn(options.speed, callback) : el.fadeOut(options.speed, callback);
					break;
				case 'none':
					action=='show' ? el.show() : el.hide();
					callback();
					break;
			}
		},


		// Подготвка содержимого окна
		prepare_body: function(D, $this) {

			// Обработчик закрытия
			$('.arcticmodal-close', D.body).unbind('click.arcticmodal').bind('click.arcticmodal', function() {
				$this.arcticmodal('close');
				return false;
			});

		},


		// Инициализация элемента
		init_el: function($this, options) {
			var D = $this.data('arcticmodal');
			if (D) return;

			D = options;
			modalID++;
			D.modalID = modalID;

			// Overlay
			D.overlay.block = $(D.overlay.tpl);
			D.overlay.block.css(D.overlay.css);

			// Container
			D.container.block = $(D.container.tpl);

			// BODY
			D.body = $('.arcticmodal-container_i2', D.container.block);
			if (options.clone) {
				D.body.html($this.clone(true));
			} else {
				$this.before('<div id="arcticmodalReserve' + D.modalID + '" style="display: none" />');
				D.body.html($this);
			}

			// Подготовка содержимого
			modal.prepare_body(D, $this);

			// Закрытие при клике на overlay
			if (D.closeOnOverlayClick)
				D.overlay.block.add(D.container.block).click(function(e) {
					if (utils.isEventOut($('>*', D.body), e))
						$this.arcticmodal('close');
				});

			// Запомним настройки
			D.container.block.data('arcticmodalParentEl', $this);
			$this.data('arcticmodal', D);
			modals = $.merge(modals, $this);

			// Показать
			$.proxy(actions.show, $this)();
			if (D.type=='html') return $this;

			// Ajax-загрузка
			if (D.ajax.beforeSend!=undefined) {
				var fn_beforeSend = D.ajax.beforeSend;
				delete D.ajax.beforeSend;
			}
			if (D.ajax.success!=undefined) {
				var fn_success = D.ajax.success;
				delete D.ajax.success;
			}
			if (D.ajax.error!=undefined) {
				var fn_error = D.ajax.error;
				delete D.ajax.error;
			}
			var o = $.extend(true, {
				url: D.url,
				beforeSend: function() {
					if (fn_beforeSend==undefined) {
						D.body.html('<div class="arcticmodal-loading" />');
					} else {
						fn_beforeSend(D, $this);
					}
				},
				success: function(responce) {

					// Событие после загрузки до показа содержимого
					$this.trigger('afterLoading');
					D.afterLoading(D, $this, responce);

					if (fn_success==undefined) {
						D.body.html(responce);
					} else {
						fn_success(D, $this, responce);
					}
					modal.prepare_body(D, $this);

					// Событие после загрузки после отображения содержимого
					$this.trigger('afterLoadingOnShow');
					D.afterLoadingOnShow(D, $this, responce);

				},
				error: function() {

					// Событие при ошибке загрузки
					$this.trigger('errorLoading');
					D.errorLoading(D, $this);

					if (fn_error==undefined) {
						D.body.html(D.errors.tpl);
						$('.arcticmodal-error', D.body).html(D.errors.ajax_unsuccessful_load);
						$('.arcticmodal-close', D.body).click(function() {
							$this.arcticmodal('close');
							return false;
						});
						if (D.errors.autoclose_delay)
							setTimeout(function() {
								$this.arcticmodal('close');
							}, D.errors.autoclose_delay);
					} else {
						fn_error(D, $this);
					}
				}
			}, D.ajax);
			D.ajax_request = $.ajax(o);

			// Запомнить настройки
			$this.data('arcticmodal', D);

		},


		// Инициализация
		init: function(options) {
			options = $.extend(true, {}, default_options, options);
			if ($.isFunction(this)) {
				if (options==undefined) {
					$.error('jquery.arcticmodal: Uncorrect parameters');
					return;
				}
				if (options.type=='') {
					$.error('jquery.arcticmodal: Don\'t set parameter "type"');
					return;
				}
				switch (options.type) {
					case 'html':
						if (options.content=='') {
							$.error('jquery.arcticmodal: Don\'t set parameter "content"');
							return
						}
						var c = options.content;
						options.content = '';

						return modal.init_el($(c), options);
						break;
					case 'ajax':
						if (options.url=='') {
							$.error('jquery.arcticmodal: Don\'t set parameter "url"');
							return;
						}
						return modal.init_el($('<div />'), options);
						break;
				}
			} else {
				return this.each(function() {
					modal.init_el($(this), $.extend(true, {}, options));
				});
			}
		}


	};


	var actions = {


		// Показать
		show: function() {
			var $this = modal.getParentEl(this);
			if ($this===false) {
				$.error('jquery.arcticmodal: Uncorrect call');
				return;
			}
			var D = $this.data('arcticmodal');

			// Добавить overlay и container
			D.overlay.block.hide();
			D.container.block.hide();
			$('BODY').append(D.overlay.block);
			$('BODY').append(D.container.block);

			// сделать ширину шапки равной основной ширине
			var fixedHeader = document.querySelector('.header__fixed');
			var mainWidth = document.querySelector('.header__main');
			fixedHeader.style.width = mainWidth.offsetWidth + 'px';
			window.onresize = function () {
				fixedHeader.style.width = mainWidth.offsetWidth + 'px';
			}

			// Событие
			D.beforeOpen(D, $this);
			$this.trigger('beforeOpen');

			// Wrap
			if (D.wrap.css('overflow')!='hidden') {
				D.wrap.data('arcticmodalOverflow', D.wrap.css('overflow'));
				var w1 = D.wrap.outerWidth(true);
				D.wrap.css('overflow', 'hidden');
				var w2 = D.wrap.outerWidth(true);
				if (w2!=w1)
					D.wrap.css('marginRight', (w2 - w1) + 'px');
			}

			// Скрыть предыдущие оверлеи
			modals.not($this).each(function() {
				var d = $(this).data('arcticmodal');
				d.overlay.block.hide();
			});

			// Показать
			modal.transition(D.overlay.block, 'show', modals.length>1 ? {type: 'none'} : D.openEffect);
			modal.transition(D.container.block, 'show', modals.length>1 ? {type: 'none'} : D.openEffect, function() {
				D.afterOpen(D, $this);
				$this.trigger('afterOpen');
			});

			return $this;
		},


		// Закрыть
		close: function() {
			if ($.isFunction(this)) {
				modals.each(function() {
					$(this).arcticmodal('close');
				});
			} else {
				return this.each(function() {
					var $this = modal.getParentEl(this);
					if ($this===false) {
						$.error('jquery.arcticmodal: Uncorrect call');
						return;
					}
					var D = $this.data('arcticmodal');

					// Событие перед закрытием
					if (D.beforeClose(D, $this)===false) return;
					$this.trigger('beforeClose');

					// Показать предыдущие оверлеи
					modals.not($this).last().each(function() {
						var d = $(this).data('arcticmodal');
						d.overlay.block.show();
					});

					modal.transition(D.overlay.block, 'hide', modals.length>1 ? {type: 'none'} : D.closeEffect);
					modal.transition(D.container.block, 'hide', modals.length>1 ? {type: 'none'} : D.closeEffect, function() {

						// Событие после закрытия
						D.afterClose(D, $this);
						$this.trigger('afterClose');

						// Если не клонировали - вернём на место
						if (!D.clone)
							$('#arcticmodalReserve' + D.modalID).replaceWith(D.body.find('>*'));

						D.overlay.block.remove();
						D.container.block.remove();
						$this.data('arcticmodal', null);
						if (!$('.arcticmodal-container').length) {
							if (D.wrap.data('arcticmodalOverflow'))
								D.wrap.css('overflow', D.wrap.data('arcticmodalOverflow'));
							D.wrap.css('marginRight', 0);
						}

					});

					if (D.type=='ajax')
						D.ajax_request.abort();

					modals = modals.not($this);
				});
			}
		},


		// Установить опции по-умолчанию
		setDefault: function(options) {
			$.extend(true, default_options, options);
		}


	};


	$(function() {
		default_options.wrap = $((document.all && !document.querySelector) ? 'html' : 'body');
	});


	// Закрытие при нажатии Escape
	$(document).bind('keyup.arcticmodal', function(e) {
		var m = modals.last();
		if (!m.length) return;
		var D = m.data('arcticmodal');
		if (D.closeOnEsc && (e.keyCode===27))
			m.arcticmodal('close');
	});


	$.arcticmodal = $.fn.arcticmodal = function(method) {

		if (actions[method]) {
			return actions[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method==='object' || !method) {
			return modal.init.apply(this, arguments);
		} else {
			$.error('jquery.arcticmodal: Method ' + method + ' does not exist');
		}

	};


})(jQuery);

/*
 * International Telephone Input v7.1.1
 * https://github.com/jackocnr/intl-tel-input.git
 * Licensed under the MIT license
 */
! function(a) {
  "function" == typeof define && define.amd ? define(["jquery"], function(b) {
    a(b, window, document)
  }) : "object" == typeof module && module.exports ? module.exports = a(require("jquery"), window, document) : a(jQuery, window, document)
}(function(a, b, c, d) {
  "use strict";

  function e(b, c) {
    this.a = b, c && (a.extend(c, c, {
      a: c.allowExtensions,
      b: c.formatAsYouType,
      c: c.autoHideDialCode,
      d: c.autoPlaceholder,
      e: c.dropdownContainer,
      f: c.excludeCountries,
      g: c.geoIpLookup,
      h: c.initialCountry,
      i: c.nationalMode,
      j: c.numberType,
      k: c.onlyCountries,
      l: c.preferredCountries,
      m: c.utilsScript
    })), this.b = a.extend({}, h, c), this.c = h, this.ns = "." + f + g++, this.d = Boolean(b.setSelectionRange), this.e = Boolean(a(b).attr("placeholder")), this.f = f
  }
  var f = "intlTelInput",
    g = 1,
    h = {
      a: !1,
      b: !1,
      c: !0,
      d: !0,
      e: "",
      f: [],
      g: null,
      h: "",
      i: !0,
      j: "MOBILE",
      k: [],
      l: ["us", "gb"],
      m: ""
    },
    i = {
      b: 38,
      c: 40,
      d: 13,
      e: 27,
      f: 43,
      A: 65,
      Z: 90,
      g: 48,
      h: 57,
      i: 32,
      Bi: 8,
      k: 9,
      l: 46,
      m: 17,
      n: 91,
      o: 224
    },
    j = !1;
  a(b).load(function() {
    j = !0
  }), e.prototype = {
    _a: function() {
      return this.b.i && (this.b.c = !1), navigator.userAgent.match(/IEMobile/i) && (this.b.b = !1), this.g = /Android.+Mobile|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent), this.g && (a("body").addClass("iti-mobile"), this.b.e || (this.b.e = "body")), this.h = new a.Deferred, this.i = new a.Deferred, this._b(), this._f(), this._h(), this._aListeners(), this._aRequests(), [this.h, this.i]
    },
    _b: function() {
      this._processAllCountries(), this._processCountryCodes(), this._processPreferredCountries()
    },
    _c: function(a, b, c) {
      b in this.q || (this.q[b] = []);
      var d = c || 0;
      this.q[b][d] = a
    },
    _filterCountries: function(b, c) {
      var d;
      for (d = 0; d < b.length; d++) b[d] = b[d].toLowerCase();
      for (this.p = [], d = 0; d < k.length; d++) c(a.inArray(k[d].iso2, b)) && this.p.push(k[d])
    },
    _processAllCountries: function() {
      this.b.k.length ? this._filterCountries(this.b.k, function(a) {
        return -1 != a
      }) : this.b.f.length ? this._filterCountries(this.b.f, function(a) {
        return -1 == a
      }) : this.p = k
    },
    _processCountryCodes: function() {
      this.q = {};
      for (var a = 0; a < this.p.length; a++) {
        var b = this.p[a];
        if (this._c(b.iso2, b.dialCode, b.priority), b.areaCodes)
          for (var c = 0; c < b.areaCodes.length; c++) this._c(b.iso2, b.dialCode + b.areaCodes[c])
      }
    },
    _processPreferredCountries: function() {
      this.r = [];
      for (var a = 0; a < this.b.l.length; a++) {
        var b = this.b.l[a].toLowerCase(),
          c = this._y(b, !1, !0);
        c && this.r.push(c)
      }
    },
    _f: function() {
      this.j = a(this.a), this.j.attr("autocomplete", "off"), this.j.wrap(a("<div>", {
        "class": "intl-tel-input"
      })), this.k = a("<a>", {
        "class": "flag-container"
      }).insertBefore(this.j);
      var b = a("<div>", {
        tabindex: "0",
        "class": "selected-flag"
      }).appendTo(this.k);
      this.l = a("<div>", {
        "class": "iti-flag"
      }).appendTo(b), a("<div>", {
        "class": "iti-arrow"
      }).appendTo(b), this.m = a("<ul>", {
        "class": "country-list hide"
      }), this.r.length && (this._g(this.r, "preferred"), a("<li>", {
        "class": "divider"
      }).appendTo(this.m)), this._g(this.p, ""), this.mItems = this.m.children(".country"), this.b.e ? this.dropdown = a("<div>", {
        "class": "intl-tel-input iti-container"
      }).append(this.m) : this.m.appendTo(this.k)
    },
    _g: function(a, b) {
      for (var c = "", d = 0; d < a.length; d++) {
        var e = a[d];
        c += "<li class='country " + b + "' data-dial-code='" + e.dialCode + "' data-country-code='" + e.iso2 + "'>", c += "<div class='flag-box'><div class='iti-flag " + e.iso2 + "'></div></div>", c += "<span class='country-name'>" + e.name + "</span>", c += "<span class='dial-code'>+" + e.dialCode + "</span>", c += "</li>"
      }
      this.m.append(c)
    },
    _h: function() {
      var a = this.j.val();
      if (this._af(a)) this._v(a);
      else if ("auto" !== this.b.h && (this.b.h ? this._setFlag(this.b.h) : (this.defaultCountry = this.r.length ? this.r[0].iso2 : this.p[0].iso2, a || this._setFlag(this.defaultCountry)), !a)) {
        var b = this._y(this.defaultCountry, !1, !1);
        this._ae(b.dialCode, !1)
      }
      a && this._uFromNumber(a)
    },
    _aListeners: function() {
      var a = this;
      this._aKeyListeners(), (this.b.c || this.b.b) && this._aFocusListeners();
      var b = this.j.closest("label");
      b.length && b.on("click" + this.ns, function(b) {
        a.m.hasClass("hide") ? a.j.focus() : b.preventDefault()
      });
      var c = this.l.parent();
      c.on("click" + this.ns, function() {
        !a.m.hasClass("hide") || a.j.prop("disabled") || a.j.prop("readonly") || a._n()
      }), this.k.on("keydown" + a.ns, function(b) {
        var c = a.m.hasClass("hide");
        !c || b.which != i.b && b.which != i.c && b.which != i.i && b.which != i.d || (b.preventDefault(), b.stopPropagation(), a._n()), b.which == i.k && a._ac()
      })
    },
    _aRequests: function() {
      var c = this;
      this.b.m ? j ? a.fn[f].loadUtils(this.b.m, this.i) : a(b).load(function() {
        a.fn[f].loadUtils(c.b.m, c.i)
      }) : this.i.resolve(), "auto" === this.b.h ? this._i3() : this.h.resolve()
    },
    _i3: function() {
      var c = b.Cookies ? Cookies.get("itiAutoCountry") : "";
      c && (a.fn[f].autoCountry = c), a.fn[f].autoCountry ? this.handleAutoCountry() : a.fn[f].startedLoadingAutoCountry || (a.fn[f].startedLoadingAutoCountry = !0, "function" == typeof this.b.g && this.b.g(function(c) {
        a.fn[f].autoCountry = c.toLowerCase(), b.Cookies && Cookies.set("itiAutoCountry", a.fn[f].autoCountry, {
          path: "/"
        }), setTimeout(function() {
          a(".intl-tel-input input").intlTelInput("handleAutoCountry")
        })
      }))
    },
    _aKeyListeners: function() {
      var a = this;
      this.b.b && this.j.on("keypress" + this.ns, function(c) {
        if (c.which >= i.i && !c.ctrlKey && !c.metaKey && b.intlTelInputUtils && !a.j.prop("readonly")) {
          c.preventDefault();
          var d = c.which >= i.g && c.which <= i.h || c.which == i.f,
            e = a.j[0],
            f = a.d && e.selectionStart == e.selectionEnd,
            g = a.j.attr("maxlength"),
            h = a.j.val(),
            j = g ? h.length < g : !0;
          if (j && (d || f)) {
            var k = d ? String.fromCharCode(c.which) : null;
            a._k(k, !0, d), h != a.j.val() && a.j.trigger("input")
          }
          d || a._j3()
        }
      }), this.j.on("cut" + this.ns + " paste" + this.ns, function() {
        setTimeout(function() {
          if (a.b.b && b.intlTelInputUtils) {
            var c = a.d && a.j[0].selectionStart == a.j.val().length;
            a._k(null, c, !0), a._j2()
          } else a._v(a.j.val())
        })
      }), this.j.on("keyup" + this.ns, function(c) {
        if (c.which == i.d || a.j.prop("readonly"));
        else if (a.b.b && b.intlTelInputUtils) {
          var d = a.d && a.j[0].selectionStart == a.j.val().length;
          a.j.val() ? (c.which == i.l && !d || c.which == i.Bi) && a._k(null, !1, !1) : a._v(""), a._j2()
        } else a._v(a.j.val())
      })
    },
    _j2: function() {
      if (!this.b.i) {
        var a = this.j.val(),
          b = this.j[0];
        if ("+" != a.charAt(0)) {
          var c = this.d ? b.selectionStart + 1 : 0;
          this.j.val("+" + a), this.d && b.setSelectionRange(c, c)
        }
      }
    },
    _j3: function() {
      var a = this;
      this.j.trigger("invalidkey").addClass("iti-invalid-key"), setTimeout(function() {
        a.j.removeClass("iti-invalid-key")
      }, 100)
    },
    _k: function(a, b, c) {
      var d, e = this.j.val(),
        f = (this._m2(e), this.j[0]),
        g = 0;
      if (this.d ? (g = this._k3(e, f.selectionEnd), a ? e = e.substr(0, f.selectionStart) + a + e.substring(f.selectionEnd, e.length) : d = e.substr(f.selectionStart - 2, 2)) : a && (e += a), this.b.i || "+" == e.charAt(0) || (e = "+" + e), this._v(e), this._uAsYouType(e, b, c), this.d) {
        var h;
        e = this.j.val(), g ? (h = this._k2(e, g), a || (h = this._k1(e, h, d))) : h = e.length, f.setSelectionRange(h, h)
      }
    },
    _uAsYouType: function(a, c, d) {
      var e;
      e = b.intlTelInputUtils && this.s ? this._cap(intlTelInputUtils.formatNumberAsYouType(a, this.s.iso2, c, this.b.a, d)) : a, this.j.val(e)
    },
    _cap: function(a) {
      var b = this.j.attr("maxlength");
      return b && a.length > b ? a.substr(0, b) : a
    },
    _k1: function(b, c, d) {
      for (var e = c; e > 0; e--) {
        var f = b.charAt(e - 1);
        if (a.isNumeric(f) || b.substr(e - 2, 2) == d) return e
      }
      return 0
    },
    _k2: function(b, c) {
      for (var d = b.length - 1; d >= 0; d--)
        if (a.isNumeric(b.charAt(d)) && 0 === --c) return d;
      return 0
    },
    _k3: function(b, c) {
      for (var d = 0, e = c; e < b.length; e++) a.isNumeric(b.charAt(e)) && d++;
      return d
    },
    _aFocusListeners: function() {
      var a = this;
      this.b.c && this.j.on("mousedown" + this.ns, function(b) {
        a.j.is(":focus") || a.j.val() || (b.preventDefault(), a.j.focus())
      }), this.j.on("focus" + this.ns, function() {
        var c = a.j.val();
        a.j.data("focusVal", c), a.b.c && !c && !a.j.prop("readonly") && a.s.dialCode && (a._uAsYouType("+" + a.s.dialCode, !0, !1), a.j.one("keypress.plus" + a.ns, function(c) {
          if (c.which == i.f) {
            var d = a.b.b && b.intlTelInputUtils ? "+" : "";
            a.j.val(d)
          }
        }), setTimeout(function() {
          var b = a.j[0];
          if (a.d) {
            var c = a.j.val().length;
            b.setSelectionRange(c, c)
          }
        }))
      }), this.j.on("blur" + this.ns, function() {
        if (a.b.c) {
          var c = a.j.val(),
            d = "+" == c.charAt(0);
          if (d) {
            var e = a._m(c);
            e && a.s.dialCode != e || a.j.val("")
          }
          a.j.off("keypress.plus" + a.ns)
        }
        a.b.b && b.intlTelInputUtils && a.j.val() != a.j.data("focusVal") && a.j.trigger("change")
      })
    },
    _m: function(a) {
      return a.replace(/\D/g, "")
    },
    _m2: function(a) {
      var b = "+" == a.charAt(0) ? "+" : "";
      return b + this._m(a)
    },
    _n: function() {
      this._o();
      var a = this.m.children(".active");
      a.length && (this._x(a), this._ad(a)), this._p(), this.l.children(".iti-arrow").addClass("up")
    },
    _o: function() {
      var c = this;
      if (this.b.e && this.dropdown.appendTo(this.b.e), this.n = this.m.removeClass("hide").outerHeight(), !this.g) {
        var d = this.j.offset(),
          e = d.top,
          f = a(b).scrollTop(),
          g = e + this.j.outerHeight() + this.n < f + a(b).height(),
          h = e - this.n > f;
        if (this.m.toggleClass("dropup", !g && h), this.b.e) {
          var i = !g && h ? 0 : this.j.innerHeight();
          this.dropdown.css({
            top: e + i,
            left: d.left
          }), a(b).on("scroll" + this.ns, function() {
            c._ac()
          })
        }
      }
    },
    _p: function() {
      var b = this;
      this.m.on("mouseover" + this.ns, ".country", function() {
        b._x(a(this))
      }), this.m.on("click" + this.ns, ".country", function() {
        b._ab(a(this))
      });
      var d = !0;
      a("html").on("click" + this.ns, function() {
        d || b._ac(), d = !1
      });
      var e = "",
        f = null;
      a(c).on("keydown" + this.ns, function(a) {
        a.preventDefault(), a.which == i.b || a.which == i.c ? b._q(a.which) : a.which == i.d ? b._r() : a.which == i.e ? b._ac() : (a.which >= i.A && a.which <= i.Z || a.which == i.i) && (f && clearTimeout(f), e += String.fromCharCode(a.which), b._s(e), f = setTimeout(function() {
          e = ""
        }, 1e3))
      })
    },
    _q: function(a) {
      var b = this.m.children(".highlight").first(),
        c = a == i.b ? b.prev() : b.next();
      c.length && (c.hasClass("divider") && (c = a == i.b ? c.prev() : c.next()), this._x(c), this._ad(c))
    },
    _r: function() {
      var a = this.m.children(".highlight").first();
      a.length && this._ab(a)
    },
    _s: function(a) {
      for (var b = 0; b < this.p.length; b++)
        if (this._t(this.p[b].name, a)) {
          var c = this.m.children("[data-country-code=" + this.p[b].iso2 + "]").not(".preferred");
          this._x(c), this._ad(c, !0);
          break
        }
    },
    _t: function(a, b) {
      return a.substr(0, b.length).toUpperCase() == b
    },
    _uFromNumber: function(a) {
      b.intlTelInputUtils && this.s && this.b.i && "+" === a.charAt(0) && (a = intlTelInputUtils.formatNumber(a, this.s.iso2, intlTelInputUtils.numberFormat.NATIONAL)), this._uAsYouType(a, !1, !1)
    },
    _v: function(b) {
      b && this.b.i && this.s && "1" == this.s.dialCode && "+" != b.charAt(0) && ("1" != b.charAt(0) && (b = "1" + b), b = "+" + b);
      var c = this._af(b),
        d = null;
      if (c) {
        var e = this.q[this._m(c)],
          f = this.s && -1 != a.inArray(this.s.iso2, e);
        if (!f || this._w(b, c))
          for (var g = 0; g < e.length; g++)
            if (e[g]) {
              d = e[g];
              break
            }
      } else "+" == b.charAt(0) && this._m(b).length ? d = "" : b && "+" != b || (d = this.defaultCountry);
      null !== d && this._setFlag(d)
    },
    _w: function(a, b) {
      return "+1" == b && this._m(a).length >= 4
    },
    _x: function(a) {
      this.mItems.removeClass("highlight"), a.addClass("highlight")
    },
    _y: function(a, b, c) {
      for (var d = b ? k : this.p, e = 0; e < d.length; e++)
        if (d[e].iso2 == a) return d[e];
      if (c) return null;
      throw new Error("No country data for '" + a + "'")
    },
    _setFlag: function(a) {
      this.s = a ? this._y(a, !1, !1) : {}, this.s.iso2 && (this.defaultCountry = this.s.iso2), this.l.attr("class", "iti-flag " + a);
      var b = a ? this.s.name + ": +" + this.s.dialCode : "Unknown";
      this.l.parent().attr("title", b), this._aa(), this.mItems.removeClass("active"), a && this.mItems.find(".iti-flag." + a).first().closest(".country").addClass("active")
    },
    _aa: function() {
      if (b.intlTelInputUtils && !this.e && this.b.d && this.s) {
        var a = this.s.iso2,
          c = intlTelInputUtils.numberType[this.b.j],
          d = a ? intlTelInputUtils.getExampleNumber(a, this.b.i, c) : "";
        "function" == typeof this.b.customPlaceholder && (d = this.b.customPlaceholder(d, this.s)), this.j.attr("placeholder", d)
      }
    },
    _ab: function(a) {
      if (this._setFlag(a.attr("data-country-code")), this._ac(), this._ae(a.attr("data-dial-code"), !0), this.j.trigger("country-change"), this.j.focus(), this.d) {
        var b = this.j.val().length;
        this.j[0].setSelectionRange(b, b)
      }
    },
    _ac: function() {
      this.m.addClass("hide"), this.l.children(".iti-arrow").removeClass("up"), a(c).off(this.ns), a("html").off(this.ns), this.m.off(this.ns), this.b.e && (this.g || a(b).off("scroll" + this.ns), this.dropdown.detach())
    },
    _ad: function(a, b) {
      var c = this.m,
        d = c.height(),
        e = c.offset().top,
        f = e + d,
        g = a.outerHeight(),
        h = a.offset().top,
        i = h + g,
        j = h - e + c.scrollTop(),
        k = d / 2 - g / 2;
      if (e > h) b && (j -= k), c.scrollTop(j);
      else if (i > f) {
        b && (j += k);
        var l = d - g;
        c.scrollTop(j - l)
      }
    },
    _ae: function(b, c) {
      var d, e = this.j.val();
      if (b = "+" + b, this.b.i && "+" != e.charAt(0)) d = e;
      else if (e) {
        var f = this._af(e);
        if (f.length > 1) d = e.replace(f, b);
        else {
          var g = "+" != e.charAt(0) ? a.trim(e) : "";
          d = b + g
        }
      } else d = !this.b.c || c ? b : "";
      this._uAsYouType(d, c, !1)
    },
    _af: function(b) {
      var c = "";
      if ("+" == b.charAt(0))
        for (var d = "", e = 0; e < b.length; e++) {
          var f = b.charAt(e);
          if (a.isNumeric(f) && (d += f, this.q[d] && (c = b.substr(0, e + 1)), 4 == d.length)) break
        }
      return c
    },
    handleAutoCountry: function() {
      "auto" === this.b.h && (this.defaultCountry = a.fn[f].autoCountry, this.j.val() || this.setCountry(this.defaultCountry), this.h.resolve())
    },
    destroy: function() {
      this._ac(), this.j.off(this.ns), this.l.parent().off(this.ns), this.j.closest("label").off(this.ns);
      var a = this.j.parent();
      a.before(this.j).remove()
    },
    getExtension: function() {
      return this.j.val().split(" ext. ")[1] || ""
    },
    getNumber: function(a) {
      return b.intlTelInputUtils ? intlTelInputUtils.formatNumber(this.j.val(), this.s.iso2, a) : ""
    },
    getNumberType: function() {
      return b.intlTelInputUtils ? intlTelInputUtils.getNumberType(this.j.val(), this.s.iso2) : -99
    },
    getSelectedCountryData: function() {
      return this.s || {}
    },
    getValidationError: function() {
      return b.intlTelInputUtils ? intlTelInputUtils.getValidationError(this.j.val(), this.s.iso2) : -99
    },
    isValidNumber: function() {
      var c = a.trim(this.j.val()),
        d = this.b.i ? this.s.iso2 : "";
      return b.intlTelInputUtils ? intlTelInputUtils.isValidNumber(c, d) : !1
    },
    setCountry: function(a) {
      a = a.toLowerCase(), this.l.hasClass(a) || (this._setFlag(a), this._ae(this.s.dialCode, !1))
    },
    setNumber: function(c, d) {
      this._v(c), a.isNumeric(d) && b.intlTelInputUtils && this.s ? this.j.val(this._cap(intlTelInputUtils.formatNumber(val, this.s.iso2, d))) : this._uFromNumber(c)
    },
    handleUtils: function() {
      b.intlTelInputUtils && (this.j.val() && this._uFromNumber(this.j.val()), this._aa()), this.i.resolve()
    }
  }, a.fn[f] = function(b) {
    var c = arguments;
    if (b === d || "object" == typeof b) {
      var g = [];
      return this.each(function() {
        if (!a.data(this, "plugin_" + f)) {
          var c = new e(this, b),
            d = c._a();
          g.push(d[0]), g.push(d[1]), a.data(this, "plugin_" + f, c)
        }
      }), a.when.apply(null, g)
    }
    if ("string" == typeof b && "_" !== b[0]) {
      var h;
      return this.each(function() {
        var d = a.data(this, "plugin_" + f);
        d instanceof e && "function" == typeof d[b] && (h = d[b].apply(d, Array.prototype.slice.call(c, 1))), "destroy" === b && a.data(this, "plugin_" + f, null)
      }), h !== d ? h : this
    }
  }, a.fn[f].getCountryData = function() {
    return k
  }, a.fn[f].loadUtils = function(b, c) {
    a.fn[f].loadedUtilsScript ? c && c.resolve() : (a.fn[f].loadedUtilsScript = !0, a.ajax({
      url: b,
      complete: function() {
        a(".intl-tel-input input").intlTelInput("handleUtils")
      },
      dataType: "script",
      cache: !0
    }))
  }, a.fn[f].version = "7.1.1";
  for (var k = [
      ["Afghanistan (‫افغانستان‬‎)", "af", "93"],
      ["Albania (Shqipëri)", "al", "355"],
      ["Algeria (‫الجزائر‬‎)", "dz", "213"],
      ["American Samoa", "as", "1684"],
      ["Andorra", "ad", "376"],
      ["Angola", "ao", "244"],
      ["Anguilla", "ai", "1264"],
      ["Antigua and Barbuda", "ag", "1268"],
      ["Argentina", "ar", "54"],
      ["Armenia (Հայաստան)", "am", "374"],
      ["Aruba", "aw", "297"],
      ["Australia", "au", "61", 0],
      ["Austria (Österreich)", "at", "43"],
      ["Azerbaijan (Azərbaycan)", "az", "994"],
      ["Bahamas", "bs", "1242"],
      ["Bahrain (‫البحرين‬‎)", "bh", "973"],
      ["Bangladesh (বাংলাদেশ)", "bd", "880"],
      ["Barbados", "bb", "1246"],
      ["Belarus (Беларусь)", "by", "375"],
      ["Belgium (België)", "be", "32"],
      ["Belize", "bz", "501"],
      ["Benin (Bénin)", "bj", "229"],
      ["Bermuda", "bm", "1441"],
      ["Bhutan (འབྲུག)", "bt", "975"],
      ["Bolivia", "bo", "591"],
      ["Bosnia and Herzegovina (Босна и Херцеговина)", "ba", "387"],
      ["Botswana", "bw", "267"],
      ["Brazil (Brasil)", "br", "55"],
      ["British Indian Ocean Territory", "io", "246"],
      ["British Virgin Islands", "vg", "1284"],
      ["Brunei", "bn", "673"],
      ["Bulgaria (България)", "bg", "359"],
      ["Burkina Faso", "bf", "226"],
      ["Burundi (Uburundi)", "bi", "257"],
      ["Cambodia (កម្ពុជា)", "kh", "855"],
      ["Cameroon (Cameroun)", "cm", "237"],
      ["Canada", "ca", "1", 1, ["204", "226", "236", "249", "250", "289", "306", "343", "365", "387", "403", "416", "418", "431", "437", "438", "450", "506", "514", "519", "548", "579", "581", "587", "604", "613", "639", "647", "672", "705", "709", "742", "778", "780", "782", "807", "819", "825", "867", "873", "902", "905"]],
      ["Cape Verde (Kabu Verdi)", "cv", "238"],
      ["Caribbean Netherlands", "bq", "599", 1],
      ["Cayman Islands", "ky", "1345"],
      ["Central African Republic (République centrafricaine)", "cf", "236"],
      ["Chad (Tchad)", "td", "235"],
      ["Chile", "cl", "56"],
      ["China (中国)", "cn", "86"],
      ["Christmas Island", "cx", "61", 2],
      ["Cocos (Keeling) Islands", "cc", "61", 1],
      ["Colombia", "co", "57"],
      ["Comoros (‫جزر القمر‬‎)", "km", "269"],
      ["Congo (DRC) (Jamhuri ya Kidemokrasia ya Kongo)", "cd", "243"],
      ["Congo (Republic) (Congo-Brazzaville)", "cg", "242"],
      ["Cook Islands", "ck", "682"],
      ["Costa Rica", "cr", "506"],
      ["Côte d’Ivoire", "ci", "225"],
      ["Croatia (Hrvatska)", "hr", "385"],
      ["Cuba", "cu", "53"],
      ["Curaçao", "cw", "599", 0],
      ["Cyprus (Κύπρος)", "cy", "357"],
      ["Czech Republic (Česká republika)", "cz", "420"],
      ["Denmark (Danmark)", "dk", "45"],
      ["Djibouti", "dj", "253"],
      ["Dominica", "dm", "1767"],
      ["Dominican Republic (República Dominicana)", "do", "1", 2, ["809", "829", "849"]],
      ["Ecuador", "ec", "593"],
      ["Egypt (‫مصر‬‎)", "eg", "20"],
      ["El Salvador", "sv", "503"],
      ["Equatorial Guinea (Guinea Ecuatorial)", "gq", "240"],
      ["Eritrea", "er", "291"],
      ["Estonia (Eesti)", "ee", "372"],
      ["Ethiopia", "et", "251"],
      ["Falkland Islands (Islas Malvinas)", "fk", "500"],
      ["Faroe Islands (Føroyar)", "fo", "298"],
      ["Fiji", "fj", "679"],
      ["Finland (Suomi)", "fi", "358", 0],
      ["France", "fr", "33"],
      ["French Guiana (Guyane française)", "gf", "594"],
      ["French Polynesia (Polynésie française)", "pf", "689"],
      ["Gabon", "ga", "241"],
      ["Gambia", "gm", "220"],
      ["Georgia (საქართველო)", "ge", "995"],
      ["Germany (Deutschland)", "de", "49"],
      ["Ghana (Gaana)", "gh", "233"],
      ["Gibraltar", "gi", "350"],
      ["Greece (Ελλάδα)", "gr", "30"],
      ["Greenland (Kalaallit Nunaat)", "gl", "299"],
      ["Grenada", "gd", "1473"],
      ["Guadeloupe", "gp", "590", 0],
      ["Guam", "gu", "1671"],
      ["Guatemala", "gt", "502"],
      ["Guernsey", "gg", "44", 1],
      ["Guinea (Guinée)", "gn", "224"],
      ["Guinea-Bissau (Guiné Bissau)", "gw", "245"],
      ["Guyana", "gy", "592"],
      ["Haiti", "ht", "509"],
      ["Honduras", "hn", "504"],
      ["Hong Kong (香港)", "hk", "852"],
      ["Hungary (Magyarország)", "hu", "36"],
      ["Iceland (Ísland)", "is", "354"],
      ["India (भारत)", "in", "91"],
      ["Indonesia", "id", "62"],
      ["Iran (‫ایران‬‎)", "ir", "98"],
      ["Iraq (‫العراق‬‎)", "iq", "964"],
      ["Ireland", "ie", "353"],
      ["Isle of Man", "im", "44", 2],
      ["Israel (‫ישראל‬‎)", "il", "972"],
      ["Italy (Italia)", "it", "39", 0],
      ["Jamaica", "jm", "1876"],
      ["Japan (日本)", "jp", "81"],
      ["Jersey", "je", "44", 3],
      ["Jordan (‫الأردن‬‎)", "jo", "962"],
      ["Kazakhstan (Казахстан)", "kz", "7", 1],
      ["Kenya", "ke", "254"],
      ["Kiribati", "ki", "686"],
      ["Kuwait (‫الكويت‬‎)", "kw", "965"],
      ["Kyrgyzstan (Кыргызстан)", "kg", "996"],
      ["Laos (ລາວ)", "la", "856"],
      ["Latvia (Latvija)", "lv", "371"],
      ["Lebanon (‫لبنان‬‎)", "lb", "961"],
      ["Lesotho", "ls", "266"],
      ["Liberia", "lr", "231"],
      ["Libya (‫ليبيا‬‎)", "ly", "218"],
      ["Liechtenstein", "li", "423"],
      ["Lithuania (Lietuva)", "lt", "370"],
      ["Luxembourg", "lu", "352"],
      ["Macau (澳門)", "mo", "853"],
      ["Macedonia (FYROM) (Македонија)", "mk", "389"],
      ["Madagascar (Madagasikara)", "mg", "261"],
      ["Malawi", "mw", "265"],
      ["Malaysia", "my", "60"],
      ["Maldives", "mv", "960"],
      ["Mali", "ml", "223"],
      ["Malta", "mt", "356"],
      ["Marshall Islands", "mh", "692"],
      ["Martinique", "mq", "596"],
      ["Mauritania (‫موريتانيا‬‎)", "mr", "222"],
      ["Mauritius (Moris)", "mu", "230"],
      ["Mayotte", "yt", "262", 1],
      ["Mexico (México)", "mx", "52"],
      ["Micronesia", "fm", "691"],
      ["Moldova (Republica Moldova)", "md", "373"],
      ["Monaco", "mc", "377"],
      ["Mongolia (Монгол)", "mn", "976"],
      ["Montenegro (Crna Gora)", "me", "382"],
      ["Montserrat", "ms", "1664"],
      ["Morocco (‫المغرب‬‎)", "ma", "212", 0],
      ["Mozambique (Moçambique)", "mz", "258"],
      ["Myanmar (Burma) (မြန်မာ)", "mm", "95"],
      ["Namibia (Namibië)", "na", "264"],
      ["Nauru", "nr", "674"],
      ["Nepal (नेपाल)", "np", "977"],
      ["Netherlands (Nederland)", "nl", "31"],
      ["New Caledonia (Nouvelle-Calédonie)", "nc", "687"],
      ["New Zealand", "nz", "64"],
      ["Nicaragua", "ni", "505"],
      ["Niger (Nijar)", "ne", "227"],
      ["Nigeria", "ng", "234"],
      ["Niue", "nu", "683"],
      ["Norfolk Island", "nf", "672"],
      ["North Korea (조선 민주주의 인민 공화국)", "kp", "850"],
      ["Northern Mariana Islands", "mp", "1670"],
      ["Norway (Norge)", "no", "47", 0],
      ["Oman (‫عُمان‬‎)", "om", "968"],
      ["Pakistan (‫پاکستان‬‎)", "pk", "92"],
      ["Palau", "pw", "680"],
      ["Palestine (‫فلسطين‬‎)", "ps", "970"],
      ["Panama (Panamá)", "pa", "507"],
      ["Papua New Guinea", "pg", "675"],
      ["Paraguay", "py", "595"],
      ["Peru (Perú)", "pe", "51"],
      ["Philippines", "ph", "63"],
      ["Poland (Polska)", "pl", "48"],
      ["Portugal", "pt", "351"],
      ["Puerto Rico", "pr", "1", 3, ["787", "939"]],
      ["Qatar (‫قطر‬‎)", "qa", "974"],
      ["Réunion (La Réunion)", "re", "262", 0],
      ["Romania (România)", "ro", "40"],
      ["Russia (Россия)", "ru", "7", 0],
      ["Rwanda", "rw", "250"],
      ["Saint Barthélemy (Saint-Barthélemy)", "bl", "590", 1],
      ["Saint Helena", "sh", "290"],
      ["Saint Kitts and Nevis", "kn", "1869"],
      ["Saint Lucia", "lc", "1758"],
      ["Saint Martin (Saint-Martin (partie française))", "mf", "590", 2],
      ["Saint Pierre and Miquelon (Saint-Pierre-et-Miquelon)", "pm", "508"],
      ["Saint Vincent and the Grenadines", "vc", "1784"],
      ["Samoa", "ws", "685"],
      ["San Marino", "sm", "378"],
      ["São Tomé and Príncipe (São Tomé e Príncipe)", "st", "239"],
      ["Saudi Arabia (‫المملكة العربية السعودية‬‎)", "sa", "966"],
      ["Senegal (Sénégal)", "sn", "221"],
      ["Serbia (Србија)", "rs", "381"],
      ["Seychelles", "sc", "248"],
      ["Sierra Leone", "sl", "232"],
      ["Singapore", "sg", "65"],
      ["Sint Maarten", "sx", "1721"],
      ["Slovakia (Slovensko)", "sk", "421"],
      ["Slovenia (Slovenija)", "si", "386"],
      ["Solomon Islands", "sb", "677"],
      ["Somalia (Soomaaliya)", "so", "252"],
      ["South Africa", "za", "27"],
      ["South Korea (대한민국)", "kr", "82"],
      ["South Sudan (‫جنوب السودان‬‎)", "ss", "211"],
      ["Spain (España)", "es", "34"],
      ["Sri Lanka (ශ්‍රී ලංකාව)", "lk", "94"],
      ["Sudan (‫السودان‬‎)", "sd", "249"],
      ["Suriname", "sr", "597"],
      ["Svalbard and Jan Mayen", "sj", "47", 1],
      ["Swaziland", "sz", "268"],
      ["Sweden (Sverige)", "se", "46"],
      ["Switzerland (Schweiz)", "ch", "41"],
      ["Syria (‫سوريا‬‎)", "sy", "963"],
      ["Taiwan (台灣)", "tw", "886"],
      ["Tajikistan", "tj", "992"],
      ["Tanzania", "tz", "255"],
      ["Thailand (ไทย)", "th", "66"],
      ["Timor-Leste", "tl", "670"],
      ["Togo", "tg", "228"],
      ["Tokelau", "tk", "690"],
      ["Tonga", "to", "676"],
      ["Trinidad and Tobago", "tt", "1868"],
      ["Tunisia (‫تونس‬‎)", "tn", "216"],
      ["Turkey (Türkiye)", "tr", "90"],
      ["Turkmenistan", "tm", "993"],
      ["Turks and Caicos Islands", "tc", "1649"],
      ["Tuvalu", "tv", "688"],
      ["U.S. Virgin Islands", "vi", "1340"],
      ["Uganda", "ug", "256"],
      ["Ukraine (Україна)", "ua", "380"],
      ["United Arab Emirates (‫الإمارات العربية المتحدة‬‎)", "ae", "971"],
      ["United Kingdom", "gb", "44", 0],
      ["United States", "us", "1", 0],
      ["Uruguay", "uy", "598"],
      ["Uzbekistan (Oʻzbekiston)", "uz", "998"],
      ["Vanuatu", "vu", "678"],
      ["Vatican City (Città del Vaticano)", "va", "39", 1],
      ["Venezuela", "ve", "58"],
      ["Vietnam (Việt Nam)", "vn", "84"],
      ["Wallis and Futuna", "wf", "681"],
      ["Western Sahara (‫الصحراء الغربية‬‎)", "eh", "212", 1],
      ["Yemen (‫اليمن‬‎)", "ye", "967"],
      ["Zambia", "zm", "260"],
      ["Zimbabwe", "zw", "263"],
      ["Åland Islands", "ax", "358", 1]
    ], l = 0; l < k.length; l++) {
    var m = k[l];
    k[l] = {
      name: m[0],
      iso2: m[1],
      dialCode: m[2],
      priority: m[3] || 0,
      areaCodes: m[4] || null
    }
  }
});

/*! nouislider - 9.1.0 - 2016-12-10 16:00:32 */

!function(a){"function"==typeof define&&define.amd?define([],a):"object"==typeof exports?module.exports=a():window.noUiSlider=a()}(function(){"use strict";function a(a,b){var c=document.createElement("div");return j(c,b),a.appendChild(c),c}function b(a){return a.filter(function(a){return!this[a]&&(this[a]=!0)},{})}function c(a,b){return Math.round(a/b)*b}function d(a,b){var c=a.getBoundingClientRect(),d=a.ownerDocument,e=d.documentElement,f=m();return/webkit.*Chrome.*Mobile/i.test(navigator.userAgent)&&(f.x=0),b?c.top+f.y-e.clientTop:c.left+f.x-e.clientLeft}function e(a){return"number"==typeof a&&!isNaN(a)&&isFinite(a)}function f(a,b,c){c>0&&(j(a,b),setTimeout(function(){k(a,b)},c))}function g(a){return Math.max(Math.min(a,100),0)}function h(a){return Array.isArray(a)?a:[a]}function i(a){a=String(a);var b=a.split(".");return b.length>1?b[1].length:0}function j(a,b){a.classList?a.classList.add(b):a.className+=" "+b}function k(a,b){a.classList?a.classList.remove(b):a.className=a.className.replace(new RegExp("(^|\\b)"+b.split(" ").join("|")+"(\\b|$)","gi")," ")}function l(a,b){return a.classList?a.classList.contains(b):new RegExp("\\b"+b+"\\b").test(a.className)}function m(){var a=void 0!==window.pageXOffset,b="CSS1Compat"===(document.compatMode||""),c=a?window.pageXOffset:b?document.documentElement.scrollLeft:document.body.scrollLeft,d=a?window.pageYOffset:b?document.documentElement.scrollTop:document.body.scrollTop;return{x:c,y:d}}function n(){return window.navigator.pointerEnabled?{start:"pointerdown",move:"pointermove",end:"pointerup"}:window.navigator.msPointerEnabled?{start:"MSPointerDown",move:"MSPointerMove",end:"MSPointerUp"}:{start:"mousedown touchstart",move:"mousemove touchmove",end:"mouseup touchend"}}function o(a,b){return 100/(b-a)}function p(a,b){return 100*b/(a[1]-a[0])}function q(a,b){return p(a,a[0]<0?b+Math.abs(a[0]):b-a[0])}function r(a,b){return b*(a[1]-a[0])/100+a[0]}function s(a,b){for(var c=1;a>=b[c];)c+=1;return c}function t(a,b,c){if(c>=a.slice(-1)[0])return 100;var d,e,f,g,h=s(c,a);return d=a[h-1],e=a[h],f=b[h-1],g=b[h],f+q([d,e],c)/o(f,g)}function u(a,b,c){if(c>=100)return a.slice(-1)[0];var d,e,f,g,h=s(c,b);return d=a[h-1],e=a[h],f=b[h-1],g=b[h],r([d,e],(c-f)*o(f,g))}function v(a,b,d,e){if(100===e)return e;var f,g,h=s(e,a);return d?(f=a[h-1],g=a[h],e-f>(g-f)/2?g:f):b[h-1]?a[h-1]+c(e-a[h-1],b[h-1]):e}function w(a,b,c){var d;if("number"==typeof b&&(b=[b]),"[object Array]"!==Object.prototype.toString.call(b))throw new Error("noUiSlider: 'range' contains invalid value.");if(d="min"===a?0:"max"===a?100:parseFloat(a),!e(d)||!e(b[0]))throw new Error("noUiSlider: 'range' value isn't numeric.");c.xPct.push(d),c.xVal.push(b[0]),d?c.xSteps.push(!isNaN(b[1])&&b[1]):isNaN(b[1])||(c.xSteps[0]=b[1]),c.xHighestCompleteStep.push(0)}function x(a,b,c){if(!b)return!0;c.xSteps[a]=p([c.xVal[a],c.xVal[a+1]],b)/o(c.xPct[a],c.xPct[a+1]);var d=(c.xVal[a+1]-c.xVal[a])/c.xNumSteps[a],e=Math.ceil(Number(d.toFixed(3))-1),f=c.xVal[a]+c.xNumSteps[a]*e;c.xHighestCompleteStep[a]=f}function y(a,b,c,d){this.xPct=[],this.xVal=[],this.xSteps=[d||!1],this.xNumSteps=[!1],this.xHighestCompleteStep=[],this.snap=b,this.direction=c;var e,f=[];for(e in a)a.hasOwnProperty(e)&&f.push([a[e],e]);for(f.length&&"object"==typeof f[0][0]?f.sort(function(a,b){return a[0][0]-b[0][0]}):f.sort(function(a,b){return a[0]-b[0]}),e=0;e<f.length;e++)w(f[e][1],f[e][0],this);for(this.xNumSteps=this.xSteps.slice(0),e=0;e<this.xNumSteps.length;e++)x(e,this.xNumSteps[e],this)}function z(a,b){if(!e(b))throw new Error("noUiSlider: 'step' is not numeric.");a.singleStep=b}function A(a,b){if("object"!=typeof b||Array.isArray(b))throw new Error("noUiSlider: 'range' is not an object.");if(void 0===b.min||void 0===b.max)throw new Error("noUiSlider: Missing 'min' or 'max' in 'range'.");if(b.min===b.max)throw new Error("noUiSlider: 'range' 'min' and 'max' cannot be equal.");a.spectrum=new y(b,a.snap,a.dir,a.singleStep)}function B(a,b){if(b=h(b),!Array.isArray(b)||!b.length)throw new Error("noUiSlider: 'start' option is incorrect.");a.handles=b.length,a.start=b}function C(a,b){if(a.snap=b,"boolean"!=typeof b)throw new Error("noUiSlider: 'snap' option must be a boolean.")}function D(a,b){if(a.animate=b,"boolean"!=typeof b)throw new Error("noUiSlider: 'animate' option must be a boolean.")}function E(a,b){if(a.animationDuration=b,"number"!=typeof b)throw new Error("noUiSlider: 'animationDuration' option must be a number.")}function F(a,b){var c,d=[!1];if("lower"===b?b=[!0,!1]:"upper"===b&&(b=[!1,!0]),b===!0||b===!1){for(c=1;c<a.handles;c++)d.push(b);d.push(!1)}else{if(!Array.isArray(b)||!b.length||b.length!==a.handles+1)throw new Error("noUiSlider: 'connect' option doesn't match handle count.");d=b}a.connect=d}function G(a,b){switch(b){case"horizontal":a.ort=0;break;case"vertical":a.ort=1;break;default:throw new Error("noUiSlider: 'orientation' option is invalid.")}}function H(a,b){if(!e(b))throw new Error("noUiSlider: 'margin' option must be numeric.");if(0!==b&&(a.margin=a.spectrum.getMargin(b),!a.margin))throw new Error("noUiSlider: 'margin' option is only supported on linear sliders.")}function I(a,b){if(!e(b))throw new Error("noUiSlider: 'limit' option must be numeric.");if(a.limit=a.spectrum.getMargin(b),!a.limit||a.handles<2)throw new Error("noUiSlider: 'limit' option is only supported on linear sliders with 2 or more handles.")}function J(a,b){if(!e(b))throw new Error("noUiSlider: 'padding' option must be numeric.");if(0!==b){if(a.padding=a.spectrum.getMargin(b),!a.padding)throw new Error("noUiSlider: 'padding' option is only supported on linear sliders.");if(a.padding<0)throw new Error("noUiSlider: 'padding' option must be a positive number.");if(a.padding>=50)throw new Error("noUiSlider: 'padding' option must be less than half the range.")}}function K(a,b){switch(b){case"ltr":a.dir=0;break;case"rtl":a.dir=1;break;default:throw new Error("noUiSlider: 'direction' option was not recognized.")}}function L(a,b){if("string"!=typeof b)throw new Error("noUiSlider: 'behaviour' must be a string containing options.");var c=b.indexOf("tap")>=0,d=b.indexOf("drag")>=0,e=b.indexOf("fixed")>=0,f=b.indexOf("snap")>=0,g=b.indexOf("hover")>=0;if(e){if(2!==a.handles)throw new Error("noUiSlider: 'fixed' behaviour must be used with 2 handles");H(a,a.start[1]-a.start[0])}a.events={tap:c||f,drag:d,fixed:e,snap:f,hover:g}}function M(a,b){if(b!==!1)if(b===!0){a.tooltips=[];for(var c=0;c<a.handles;c++)a.tooltips.push(!0)}else{if(a.tooltips=h(b),a.tooltips.length!==a.handles)throw new Error("noUiSlider: must pass a formatter for all handles.");a.tooltips.forEach(function(a){if("boolean"!=typeof a&&("object"!=typeof a||"function"!=typeof a.to))throw new Error("noUiSlider: 'tooltips' must be passed a formatter or 'false'.")})}}function N(a,b){if(a.format=b,"function"==typeof b.to&&"function"==typeof b.from)return!0;throw new Error("noUiSlider: 'format' requires 'to' and 'from' methods.")}function O(a,b){if(void 0!==b&&"string"!=typeof b&&b!==!1)throw new Error("noUiSlider: 'cssPrefix' must be a string or `false`.");a.cssPrefix=b}function P(a,b){if(void 0!==b&&"object"!=typeof b)throw new Error("noUiSlider: 'cssClasses' must be an object.");if("string"==typeof a.cssPrefix){a.cssClasses={};for(var c in b)b.hasOwnProperty(c)&&(a.cssClasses[c]=a.cssPrefix+b[c])}else a.cssClasses=b}function Q(a,b){if(b!==!0&&b!==!1)throw new Error("noUiSlider: 'useRequestAnimationFrame' option should be true (default) or false.");a.useRequestAnimationFrame=b}function R(a){var b={margin:0,limit:0,padding:0,animate:!0,animationDuration:300,format:U},c={step:{r:!1,t:z},start:{r:!0,t:B},connect:{r:!0,t:F},direction:{r:!0,t:K},snap:{r:!1,t:C},animate:{r:!1,t:D},animationDuration:{r:!1,t:E},range:{r:!0,t:A},orientation:{r:!1,t:G},margin:{r:!1,t:H},limit:{r:!1,t:I},padding:{r:!1,t:J},behaviour:{r:!0,t:L},format:{r:!1,t:N},tooltips:{r:!1,t:M},cssPrefix:{r:!1,t:O},cssClasses:{r:!1,t:P},useRequestAnimationFrame:{r:!1,t:Q}},d={connect:!1,direction:"ltr",behaviour:"tap",orientation:"horizontal",cssPrefix:"noUi-",cssClasses:{target:"target",base:"base",origin:"origin",handle:"handle",handleLower:"handle-lower",handleUpper:"handle-upper",horizontal:"horizontal",vertical:"vertical",background:"background",connect:"connect",ltr:"ltr",rtl:"rtl",draggable:"draggable",drag:"state-drag",tap:"state-tap",active:"active",tooltip:"tooltip",pips:"pips",pipsHorizontal:"pips-horizontal",pipsVertical:"pips-vertical",marker:"marker",markerHorizontal:"marker-horizontal",markerVertical:"marker-vertical",markerNormal:"marker-normal",markerLarge:"marker-large",markerSub:"marker-sub",value:"value",valueHorizontal:"value-horizontal",valueVertical:"value-vertical",valueNormal:"value-normal",valueLarge:"value-large",valueSub:"value-sub"},useRequestAnimationFrame:!0};Object.keys(c).forEach(function(e){if(void 0===a[e]&&void 0===d[e]){if(c[e].r)throw new Error("noUiSlider: '"+e+"' is required.");return!0}c[e].t(b,void 0===a[e]?d[e]:a[e])}),b.pips=a.pips;var e=[["left","top"],["right","bottom"]];return b.style=e[b.dir][b.ort],b.styleOposite=e[b.dir?0:1][b.ort],b}function S(c,e,i){function o(b,c){var d=a(b,e.cssClasses.origin),f=a(d,e.cssClasses.handle);return f.setAttribute("data-handle",c),0===c?j(f,e.cssClasses.handleLower):c===e.handles-1&&j(f,e.cssClasses.handleUpper),d}function p(b,c){return!!c&&a(b,e.cssClasses.connect)}function q(a,b){ba=[],ca=[],ca.push(p(b,a[0]));for(var c=0;c<e.handles;c++)ba.push(o(b,c)),ha[c]=c,ca.push(p(b,a[c+1]))}function r(b){j(b,e.cssClasses.target),0===e.dir?j(b,e.cssClasses.ltr):j(b,e.cssClasses.rtl),0===e.ort?j(b,e.cssClasses.horizontal):j(b,e.cssClasses.vertical),aa=a(b,e.cssClasses.base)}function s(b,c){return!!e.tooltips[c]&&a(b.firstChild,e.cssClasses.tooltip)}function t(){var a=ba.map(s);Z("update",function(b,c,d){if(a[c]){var f=b[c];e.tooltips[c]!==!0&&(f=e.tooltips[c].to(d[c])),a[c].innerHTML=f}})}function u(a,b,c){if("range"===a||"steps"===a)return ja.xVal;if("count"===a){var d,e=100/(b-1),f=0;for(b=[];(d=f++*e)<=100;)b.push(d);a="positions"}return"positions"===a?b.map(function(a){return ja.fromStepping(c?ja.getStep(a):a)}):"values"===a?c?b.map(function(a){return ja.fromStepping(ja.getStep(ja.toStepping(a)))}):b:void 0}function v(a,c,d){function e(a,b){return(a+b).toFixed(7)/1}var f={},g=ja.xVal[0],h=ja.xVal[ja.xVal.length-1],i=!1,j=!1,k=0;return d=b(d.slice().sort(function(a,b){return a-b})),d[0]!==g&&(d.unshift(g),i=!0),d[d.length-1]!==h&&(d.push(h),j=!0),d.forEach(function(b,g){var h,l,m,n,o,p,q,r,s,t,u=b,v=d[g+1];if("steps"===c&&(h=ja.xNumSteps[g]),h||(h=v-u),u!==!1&&void 0!==v)for(h=Math.max(h,1e-7),l=u;l<=v;l=e(l,h)){for(n=ja.toStepping(l),o=n-k,r=o/a,s=Math.round(r),t=o/s,m=1;m<=s;m+=1)p=k+m*t,f[p.toFixed(5)]=["x",0];q=d.indexOf(l)>-1?1:"steps"===c?2:0,!g&&i&&(q=0),l===v&&j||(f[n.toFixed(5)]=[l,q]),k=n}}),f}function w(a,b,c){function d(a,b){var c=b===e.cssClasses.value,d=c?m:n,f=c?k:l;return b+" "+d[e.ort]+" "+f[a]}function f(a,b,c){return'class="'+d(c[1],b)+'" style="'+e.style+": "+a+'%"'}function g(a,d){d[1]=d[1]&&b?b(d[0],d[1]):d[1],i+="<div "+f(a,e.cssClasses.marker,d)+"></div>",d[1]&&(i+="<div "+f(a,e.cssClasses.value,d)+">"+c.to(d[0])+"</div>")}var h=document.createElement("div"),i="",k=[e.cssClasses.valueNormal,e.cssClasses.valueLarge,e.cssClasses.valueSub],l=[e.cssClasses.markerNormal,e.cssClasses.markerLarge,e.cssClasses.markerSub],m=[e.cssClasses.valueHorizontal,e.cssClasses.valueVertical],n=[e.cssClasses.markerHorizontal,e.cssClasses.markerVertical];return j(h,e.cssClasses.pips),j(h,0===e.ort?e.cssClasses.pipsHorizontal:e.cssClasses.pipsVertical),Object.keys(a).forEach(function(b){g(b,a[b])}),h.innerHTML=i,h}function x(a){var b=a.mode,c=a.density||1,d=a.filter||!1,e=a.values||!1,f=a.stepped||!1,g=u(b,e,f),h=v(c,b,g),i=a.format||{to:Math.round};return fa.appendChild(w(h,d,i))}function y(){var a=aa.getBoundingClientRect(),b="offset"+["Width","Height"][e.ort];return 0===e.ort?a.width||aa[b]:a.height||aa[b]}function z(a,b,c,d){var f=function(b){return!fa.hasAttribute("disabled")&&(!l(fa,e.cssClasses.tap)&&(!!(b=A(b,d.pageOffset))&&(!(a===ea.start&&void 0!==b.buttons&&b.buttons>1)&&((!d.hover||!b.buttons)&&(b.calcPoint=b.points[e.ort],void c(b,d))))))},g=[];return a.split(" ").forEach(function(a){b.addEventListener(a,f,!1),g.push([a,f])}),g}function A(a,b){a.preventDefault();var c,d,e=0===a.type.indexOf("touch"),f=0===a.type.indexOf("mouse"),g=0===a.type.indexOf("pointer");if(0===a.type.indexOf("MSPointer")&&(g=!0),e){if(a.touches.length>1)return!1;c=a.changedTouches[0].pageX,d=a.changedTouches[0].pageY}return b=b||m(),(f||g)&&(c=a.clientX+b.x,d=a.clientY+b.y),a.pageOffset=b,a.points=[c,d],a.cursor=f||g,a}function B(a){var b=a-d(aa,e.ort),c=100*b/y();return e.dir?100-c:c}function C(a){var b=100,c=!1;return ba.forEach(function(d,e){if(!d.hasAttribute("disabled")){var f=Math.abs(ga[e]-a);f<b&&(c=e,b=f)}}),c}function D(a,b,c,d){var e=c.slice(),f=[!a,a],g=[a,!a];d=d.slice(),a&&d.reverse(),d.length>1?d.forEach(function(a,c){var d=M(e,a,e[a]+b,f[c],g[c]);d===!1?b=0:(b=d-e[a],e[a]=d)}):f=g=[!0];var h=!1;d.forEach(function(a,d){h=Q(a,c[a]+b,f[d],g[d])||h}),h&&d.forEach(function(a){E("update",a),E("slide",a)})}function E(a,b,c){Object.keys(la).forEach(function(d){var f=d.split(".")[0];a===f&&la[d].forEach(function(a){a.call(da,ka.map(e.format.to),b,ka.slice(),c||!1,ga.slice())})})}function F(a,b){"mouseout"===a.type&&"HTML"===a.target.nodeName&&null===a.relatedTarget&&H(a,b)}function G(a,b){if(navigator.appVersion.indexOf("MSIE 9")===-1&&0===a.buttons&&0!==b.buttonsProperty)return H(a,b);var c=(e.dir?-1:1)*(a.calcPoint-b.startCalcPoint),d=100*c/b.baseSize;D(c>0,d,b.locations,b.handleNumbers)}function H(a,b){ia&&(k(ia,e.cssClasses.active),ia=!1),a.cursor&&(document.body.style.cursor="",document.body.removeEventListener("selectstart",document.body.noUiListener)),document.documentElement.noUiListeners.forEach(function(a){document.documentElement.removeEventListener(a[0],a[1])}),k(fa,e.cssClasses.drag),P(),b.handleNumbers.forEach(function(a){E("set",a),E("change",a),E("end",a)})}function I(a,b){if(1===b.handleNumbers.length){var c=ba[b.handleNumbers[0]];if(c.hasAttribute("disabled"))return!1;ia=c.children[0],j(ia,e.cssClasses.active)}a.preventDefault(),a.stopPropagation();var d=z(ea.move,document.documentElement,G,{startCalcPoint:a.calcPoint,baseSize:y(),pageOffset:a.pageOffset,handleNumbers:b.handleNumbers,buttonsProperty:a.buttons,locations:ga.slice()}),f=z(ea.end,document.documentElement,H,{handleNumbers:b.handleNumbers}),g=z("mouseout",document.documentElement,F,{handleNumbers:b.handleNumbers});if(document.documentElement.noUiListeners=d.concat(f,g),a.cursor){document.body.style.cursor=getComputedStyle(a.target).cursor,ba.length>1&&j(fa,e.cssClasses.drag);var h=function(){return!1};document.body.noUiListener=h,document.body.addEventListener("selectstart",h,!1)}b.handleNumbers.forEach(function(a){E("start",a)})}function J(a){a.stopPropagation();var b=B(a.calcPoint),c=C(b);return c!==!1&&(e.events.snap||f(fa,e.cssClasses.tap,e.animationDuration),Q(c,b,!0,!0),P(),E("slide",c,!0),E("set",c,!0),E("change",c,!0),E("update",c,!0),void(e.events.snap&&I(a,{handleNumbers:[c]})))}function K(a){var b=B(a.calcPoint),c=ja.getStep(b),d=ja.fromStepping(c);Object.keys(la).forEach(function(a){"hover"===a.split(".")[0]&&la[a].forEach(function(a){a.call(da,d)})})}function L(a){a.fixed||ba.forEach(function(a,b){z(ea.start,a.children[0],I,{handleNumbers:[b]})}),a.tap&&z(ea.start,aa,J,{}),a.hover&&z(ea.move,aa,K,{hover:!0}),a.drag&&ca.forEach(function(b,c){if(b!==!1&&0!==c&&c!==ca.length-1){var d=ba[c-1],f=ba[c],g=[b];j(b,e.cssClasses.draggable),a.fixed&&(g.push(d.children[0]),g.push(f.children[0])),g.forEach(function(a){z(ea.start,a,I,{handles:[d,f],handleNumbers:[c-1,c]})})}})}function M(a,b,c,d,f){return ba.length>1&&(d&&b>0&&(c=Math.max(c,a[b-1]+e.margin)),f&&b<ba.length-1&&(c=Math.min(c,a[b+1]-e.margin))),ba.length>1&&e.limit&&(d&&b>0&&(c=Math.min(c,a[b-1]+e.limit)),f&&b<ba.length-1&&(c=Math.max(c,a[b+1]-e.limit))),e.padding&&(0===b&&(c=Math.max(c,e.padding)),b===ba.length-1&&(c=Math.min(c,100-e.padding))),c=ja.getStep(c),c=g(c),c!==a[b]&&c}function N(a){return a+"%"}function O(a,b){ga[a]=b,ka[a]=ja.fromStepping(b);var c=function(){ba[a].style[e.style]=N(b),S(a),S(a+1)};window.requestAnimationFrame&&e.useRequestAnimationFrame?window.requestAnimationFrame(c):c()}function P(){ha.forEach(function(a){var b=ga[a]>50?-1:1,c=3+(ba.length+b*a);ba[a].childNodes[0].style.zIndex=c})}function Q(a,b,c,d){return b=M(ga,a,b,c,d),b!==!1&&(O(a,b),!0)}function S(a){if(ca[a]){var b=0,c=100;0!==a&&(b=ga[a-1]),a!==ca.length-1&&(c=ga[a]),ca[a].style[e.style]=N(b),ca[a].style[e.styleOposite]=N(100-c)}}function T(a,b){null!==a&&a!==!1&&("number"==typeof a&&(a=String(a)),a=e.format.from(a),a===!1||isNaN(a)||Q(b,ja.toStepping(a),!1,!1))}function U(a,b){var c=h(a),d=void 0===ga[0];b=void 0===b||!!b,c.forEach(T),e.animate&&!d&&f(fa,e.cssClasses.tap,e.animationDuration),ha.forEach(function(a){Q(a,ga[a],!0,!1)}),P(),ha.forEach(function(a){E("update",a),null!==c[a]&&b&&E("set",a)})}function V(a){U(e.start,a)}function W(){var a=ka.map(e.format.to);return 1===a.length?a[0]:a}function X(){for(var a in e.cssClasses)e.cssClasses.hasOwnProperty(a)&&k(fa,e.cssClasses[a]);for(;fa.firstChild;)fa.removeChild(fa.firstChild);delete fa.noUiSlider}function Y(){return ga.map(function(a,b){var c=ja.getNearbySteps(a),d=ka[b],e=c.thisStep.step,f=null;e!==!1&&d+e>c.stepAfter.startValue&&(e=c.stepAfter.startValue-d),f=d>c.thisStep.startValue?c.thisStep.step:c.stepBefore.step!==!1&&d-c.stepBefore.highestStep,100===a?e=null:0===a&&(f=null);var g=ja.countStepDecimals();return null!==e&&e!==!1&&(e=Number(e.toFixed(g))),null!==f&&f!==!1&&(f=Number(f.toFixed(g))),[f,e]})}function Z(a,b){la[a]=la[a]||[],la[a].push(b),"update"===a.split(".")[0]&&ba.forEach(function(a,b){E("update",b)})}function $(a){var b=a&&a.split(".")[0],c=b&&a.substring(b.length);Object.keys(la).forEach(function(a){var d=a.split(".")[0],e=a.substring(d.length);b&&b!==d||c&&c!==e||delete la[a]})}function _(a,b){var c=W(),d=["margin","limit","padding","range","animate","snap","step","format"];d.forEach(function(b){void 0!==a[b]&&(i[b]=a[b])});var f=R(i);d.forEach(function(b){void 0!==a[b]&&(e[b]=f[b])}),f.spectrum.direction=ja.direction,ja=f.spectrum,e.margin=f.margin,e.limit=f.limit,e.padding=f.padding,ga=[],U(a.start||c,b)}var aa,ba,ca,da,ea=n(),fa=c,ga=[],ha=[],ia=!1,ja=e.spectrum,ka=[],la={};if(fa.noUiSlider)throw new Error("Slider was already initialized.");return r(fa),q(e.connect,aa),da={destroy:X,steps:Y,on:Z,off:$,get:W,set:U,reset:V,__moveHandles:function(a,b,c){D(a,b,ga,c)},options:i,updateOptions:_,target:fa,pips:x},L(e.events),U(e.start),e.pips&&x(e.pips),e.tooltips&&t(),da}function T(a,b){if(!a.nodeName)throw new Error("noUiSlider.create requires a single element.");var c=R(b,a),d=S(a,c,b);return a.noUiSlider=d,d}y.prototype.getMargin=function(a){var b=this.xNumSteps[0];if(b&&a/b%1!==0)throw new Error("noUiSlider: 'limit', 'margin' and 'padding' must be divisible by step.");return 2===this.xPct.length&&p(this.xVal,a)},y.prototype.toStepping=function(a){return a=t(this.xVal,this.xPct,a)},y.prototype.fromStepping=function(a){return u(this.xVal,this.xPct,a)},y.prototype.getStep=function(a){return a=v(this.xPct,this.xSteps,this.snap,a)},y.prototype.getNearbySteps=function(a){var b=s(a,this.xPct);return{stepBefore:{startValue:this.xVal[b-2],step:this.xNumSteps[b-2],highestStep:this.xHighestCompleteStep[b-2]},thisStep:{startValue:this.xVal[b-1],step:this.xNumSteps[b-1],highestStep:this.xHighestCompleteStep[b-1]},stepAfter:{startValue:this.xVal[b-0],step:this.xNumSteps[b-0],highestStep:this.xHighestCompleteStep[b-0]}}},y.prototype.countStepDecimals=function(){var a=this.xNumSteps.map(i);return Math.max.apply(null,a)},y.prototype.convert=function(a){return this.getStep(this.toStepping(a))};var U={to:function(a){return void 0!==a&&a.toFixed(2)},from:Number};return{create:T}});
// ProgressBar.js 1.0.1
// https://kimmobrunfeldt.github.io/progressbar.js
// License: MIT

(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.ProgressBar = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* shifty - v1.5.2 - 2016-02-10 - http://jeremyckahn.github.io/shifty */
;(function () {
  var root = this || Function('return this')();

/**
 * Shifty Core
 * By Jeremy Kahn - jeremyckahn@gmail.com
 */

var Tweenable = (function () {

  'use strict';

  // Aliases that get defined later in this function
  var formula;

  // CONSTANTS
  var DEFAULT_SCHEDULE_FUNCTION;
  var DEFAULT_EASING = 'linear';
  var DEFAULT_DURATION = 500;
  var UPDATE_TIME = 1000 / 60;

  var _now = Date.now
       ? Date.now
       : function () {return +new Date();};

  var now = typeof SHIFTY_DEBUG_NOW !== 'undefined' ? SHIFTY_DEBUG_NOW : _now;

  if (typeof window !== 'undefined') {
    // requestAnimationFrame() shim by Paul Irish (modified for Shifty)
    // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
    DEFAULT_SCHEDULE_FUNCTION = window.requestAnimationFrame
       || window.webkitRequestAnimationFrame
       || window.oRequestAnimationFrame
       || window.msRequestAnimationFrame
       || (window.mozCancelRequestAnimationFrame
       && window.mozRequestAnimationFrame)
       || setTimeout;
  } else {
    DEFAULT_SCHEDULE_FUNCTION = setTimeout;
  }

  function noop () {
    // NOOP!
  }

  /**
   * Handy shortcut for doing a for-in loop. This is not a "normal" each
   * function, it is optimized for Shifty.  The iterator function only receives
   * the property name, not the value.
   * @param {Object} obj
   * @param {Function(string)} fn
   * @private
   */
  function each (obj, fn) {
    var key;
    for (key in obj) {
      if (Object.hasOwnProperty.call(obj, key)) {
        fn(key);
      }
    }
  }

  /**
   * Perform a shallow copy of Object properties.
   * @param {Object} targetObject The object to copy into
   * @param {Object} srcObject The object to copy from
   * @return {Object} A reference to the augmented `targetObj` Object
   * @private
   */
  function shallowCopy (targetObj, srcObj) {
    each(srcObj, function (prop) {
      targetObj[prop] = srcObj[prop];
    });

    return targetObj;
  }

  /**
   * Copies each property from src onto target, but only if the property to
   * copy to target is undefined.
   * @param {Object} target Missing properties in this Object are filled in
   * @param {Object} src
   * @private
   */
  function defaults (target, src) {
    each(src, function (prop) {
      if (typeof target[prop] === 'undefined') {
        target[prop] = src[prop];
      }
    });
  }

  /**
   * Calculates the interpolated tween values of an Object for a given
   * timestamp.
   * @param {Number} forPosition The position to compute the state for.
   * @param {Object} currentState Current state properties.
   * @param {Object} originalState: The original state properties the Object is
   * tweening from.
   * @param {Object} targetState: The destination state properties the Object
   * is tweening to.
   * @param {number} duration: The length of the tween in milliseconds.
   * @param {number} timestamp: The UNIX epoch time at which the tween began.
   * @param {Object} easing: This Object's keys must correspond to the keys in
   * targetState.
   * @private
   */
  function tweenProps (forPosition, currentState, originalState, targetState,
    duration, timestamp, easing) {
    var normalizedPosition =
        forPosition < timestamp ? 0 : (forPosition - timestamp) / duration;


    var prop;
    var easingObjectProp;
    var easingFn;
    for (prop in currentState) {
      if (currentState.hasOwnProperty(prop)) {
        easingObjectProp = easing[prop];
        easingFn = typeof easingObjectProp === 'function'
          ? easingObjectProp
          : formula[easingObjectProp];

        currentState[prop] = tweenProp(
          originalState[prop],
          targetState[prop],
          easingFn,
          normalizedPosition
        );
      }
    }

    return currentState;
  }

  /**
   * Tweens a single property.
   * @param {number} start The value that the tween started from.
   * @param {number} end The value that the tween should end at.
   * @param {Function} easingFunc The easing curve to apply to the tween.
   * @param {number} position The normalized position (between 0.0 and 1.0) to
   * calculate the midpoint of 'start' and 'end' against.
   * @return {number} The tweened value.
   * @private
   */
  function tweenProp (start, end, easingFunc, position) {
    return start + (end - start) * easingFunc(position);
  }

  /**
   * Applies a filter to Tweenable instance.
   * @param {Tweenable} tweenable The `Tweenable` instance to call the filter
   * upon.
   * @param {String} filterName The name of the filter to apply.
   * @private
   */
  function applyFilter (tweenable, filterName) {
    var filters = Tweenable.prototype.filter;
    var args = tweenable._filterArgs;

    each(filters, function (name) {
      if (typeof filters[name][filterName] !== 'undefined') {
        filters[name][filterName].apply(tweenable, args);
      }
    });
  }

  var timeoutHandler_endTime;
  var timeoutHandler_currentTime;
  var timeoutHandler_isEnded;
  var timeoutHandler_offset;
  /**
   * Handles the update logic for one step of a tween.
   * @param {Tweenable} tweenable
   * @param {number} timestamp
   * @param {number} delay
   * @param {number} duration
   * @param {Object} currentState
   * @param {Object} originalState
   * @param {Object} targetState
   * @param {Object} easing
   * @param {Function(Object, *, number)} step
   * @param {Function(Function,number)}} schedule
   * @param {number=} opt_currentTimeOverride Needed for accurate timestamp in
   * Tweenable#seek.
   * @private
   */
  function timeoutHandler (tweenable, timestamp, delay, duration, currentState,
    originalState, targetState, easing, step, schedule,
    opt_currentTimeOverride) {

    timeoutHandler_endTime = timestamp + delay + duration;

    timeoutHandler_currentTime =
    Math.min(opt_currentTimeOverride || now(), timeoutHandler_endTime);

    timeoutHandler_isEnded =
      timeoutHandler_currentTime >= timeoutHandler_endTime;

    timeoutHandler_offset = duration - (
      timeoutHandler_endTime - timeoutHandler_currentTime);

    if (tweenable.isPlaying()) {
      if (timeoutHandler_isEnded) {
        step(targetState, tweenable._attachment, timeoutHandler_offset);
        tweenable.stop(true);
      } else {
        tweenable._scheduleId =
          schedule(tweenable._timeoutHandler, UPDATE_TIME);

        applyFilter(tweenable, 'beforeTween');

        // If the animation has not yet reached the start point (e.g., there was
        // delay that has not yet completed), just interpolate the starting
        // position of the tween.
        if (timeoutHandler_currentTime < (timestamp + delay)) {
          tweenProps(1, currentState, originalState, targetState, 1, 1, easing);
        } else {
          tweenProps(timeoutHandler_currentTime, currentState, originalState,
            targetState, duration, timestamp + delay, easing);
        }

        applyFilter(tweenable, 'afterTween');

        step(currentState, tweenable._attachment, timeoutHandler_offset);
      }
    }
  }


  /**
   * Creates a usable easing Object from a string, a function or another easing
   * Object.  If `easing` is an Object, then this function clones it and fills
   * in the missing properties with `"linear"`.
   * @param {Object.<string|Function>} fromTweenParams
   * @param {Object|string|Function} easing
   * @return {Object.<string|Function>}
   * @private
   */
  function composeEasingObject (fromTweenParams, easing) {
    var composedEasing = {};
    var typeofEasing = typeof easing;

    if (typeofEasing === 'string' || typeofEasing === 'function') {
      each(fromTweenParams, function (prop) {
        composedEasing[prop] = easing;
      });
    } else {
      each(fromTweenParams, function (prop) {
        if (!composedEasing[prop]) {
          composedEasing[prop] = easing[prop] || DEFAULT_EASING;
        }
      });
    }

    return composedEasing;
  }

  /**
   * Tweenable constructor.
   * @class Tweenable
   * @param {Object=} opt_initialState The values that the initial tween should
   * start at if a `from` object is not provided to `{{#crossLink
   * "Tweenable/tween:method"}}{{/crossLink}}` or `{{#crossLink
   * "Tweenable/setConfig:method"}}{{/crossLink}}`.
   * @param {Object=} opt_config Configuration object to be passed to
   * `{{#crossLink "Tweenable/setConfig:method"}}{{/crossLink}}`.
   * @module Tweenable
   * @constructor
   */
  function Tweenable (opt_initialState, opt_config) {
    this._currentState = opt_initialState || {};
    this._configured = false;
    this._scheduleFunction = DEFAULT_SCHEDULE_FUNCTION;

    // To prevent unnecessary calls to setConfig do not set default
    // configuration here.  Only set default configuration immediately before
    // tweening if none has been set.
    if (typeof opt_config !== 'undefined') {
      this.setConfig(opt_config);
    }
  }

  /**
   * Configure and start a tween.
   * @method tween
   * @param {Object=} opt_config Configuration object to be passed to
   * `{{#crossLink "Tweenable/setConfig:method"}}{{/crossLink}}`.
   * @chainable
   */
  Tweenable.prototype.tween = function (opt_config) {
    if (this._isTweening) {
      return this;
    }

    // Only set default config if no configuration has been set previously and
    // none is provided now.
    if (opt_config !== undefined || !this._configured) {
      this.setConfig(opt_config);
    }

    this._timestamp = now();
    this._start(this.get(), this._attachment);
    return this.resume();
  };

  /**
   * Configure a tween that will start at some point in the future.
   *
   * @method setConfig
   * @param {Object} config The following values are valid:
   * - __from__ (_Object=_): Starting position.  If omitted, `{{#crossLink
   *   "Tweenable/get:method"}}get(){{/crossLink}}` is used.
   * - __to__ (_Object=_): Ending position.
   * - __duration__ (_number=_): How many milliseconds to animate for.
   * - __delay__ (_delay=_): How many milliseconds to wait before starting the
   *   tween.
   * - __start__ (_Function(Object, *)_): Function to execute when the tween
   *   begins.  Receives the state of the tween as the first parameter and
   *   `attachment` as the second parameter.
   * - __step__ (_Function(Object, *, number)_): Function to execute on every
   *   tick.  Receives `{{#crossLink
   *   "Tweenable/get:method"}}get(){{/crossLink}}` as the first parameter,
   *   `attachment` as the second parameter, and the time elapsed since the
   *   start of the tween as the third. This function is not called on the
   *   final step of the animation, but `finish` is.
   * - __finish__ (_Function(Object, *)_): Function to execute upon tween
   *   completion.  Receives the state of the tween as the first parameter and
   *   `attachment` as the second parameter.
   * - __easing__ (_Object.<string|Function>|string|Function=_): Easing curve
   *   name(s) or function(s) to use for the tween.
   * - __attachment__ (_*_): Cached value that is passed to the
   *   `step`/`start`/`finish` methods.
   * @chainable
   */
  Tweenable.prototype.setConfig = function (config) {
    config = config || {};
    this._configured = true;

    // Attach something to this Tweenable instance (e.g.: a DOM element, an
    // object, a string, etc.);
    this._attachment = config.attachment;

    // Init the internal state
    this._pausedAtTime = null;
    this._scheduleId = null;
    this._delay = config.delay || 0;
    this._start = config.start || noop;
    this._step = config.step || noop;
    this._finish = config.finish || noop;
    this._duration = config.duration || DEFAULT_DURATION;
    this._currentState = shallowCopy({}, config.from) || this.get();
    this._originalState = this.get();
    this._targetState = shallowCopy({}, config.to) || this.get();

    var self = this;
    this._timeoutHandler = function () {
      timeoutHandler(self,
        self._timestamp,
        self._delay,
        self._duration,
        self._currentState,
        self._originalState,
        self._targetState,
        self._easing,
        self._step,
        self._scheduleFunction
      );
    };

    // Aliases used below
    var currentState = this._currentState;
    var targetState = this._targetState;

    // Ensure that there is always something to tween to.
    defaults(targetState, currentState);

    this._easing = composeEasingObject(
      currentState, config.easing || DEFAULT_EASING);

    this._filterArgs =
      [currentState, this._originalState, targetState, this._easing];

    applyFilter(this, 'tweenCreated');
    return this;
  };

  /**
   * @method get
   * @return {Object} The current state.
   */
  Tweenable.prototype.get = function () {
    return shallowCopy({}, this._currentState);
  };

  /**
   * @method set
   * @param {Object} state The current state.
   */
  Tweenable.prototype.set = function (state) {
    this._currentState = state;
  };

  /**
   * Pause a tween.  Paused tweens can be resumed from the point at which they
   * were paused.  This is different from `{{#crossLink
   * "Tweenable/stop:method"}}{{/crossLink}}`, as that method
   * causes a tween to start over when it is resumed.
   * @method pause
   * @chainable
   */
  Tweenable.prototype.pause = function () {
    this._pausedAtTime = now();
    this._isPaused = true;
    return this;
  };

  /**
   * Resume a paused tween.
   * @method resume
   * @chainable
   */
  Tweenable.prototype.resume = function () {
    if (this._isPaused) {
      this._timestamp += now() - this._pausedAtTime;
    }

    this._isPaused = false;
    this._isTweening = true;

    this._timeoutHandler();

    return this;
  };

  /**
   * Move the state of the animation to a specific point in the tween's
   * timeline.  If the animation is not running, this will cause the `step`
   * handlers to be called.
   * @method seek
   * @param {millisecond} millisecond The millisecond of the animation to seek
   * to.  This must not be less than `0`.
   * @chainable
   */
  Tweenable.prototype.seek = function (millisecond) {
    millisecond = Math.max(millisecond, 0);
    var currentTime = now();

    if ((this._timestamp + millisecond) === 0) {
      return this;
    }

    this._timestamp = currentTime - millisecond;

    if (!this.isPlaying()) {
      this._isTweening = true;
      this._isPaused = false;

      // If the animation is not running, call timeoutHandler to make sure that
      // any step handlers are run.
      timeoutHandler(this,
        this._timestamp,
        this._delay,
        this._duration,
        this._currentState,
        this._originalState,
        this._targetState,
        this._easing,
        this._step,
        this._scheduleFunction,
        currentTime
      );

      this.pause();
    }

    return this;
  };

  /**
   * Stops and cancels a tween.
   * @param {boolean=} gotoEnd If `false` or omitted, the tween just stops at
   * its current state, and the `finish` handler is not invoked.  If `true`,
   * the tweened object's values are instantly set to the target values, and
   * `finish` is invoked.
   * @method stop
   * @chainable
   */
  Tweenable.prototype.stop = function (gotoEnd) {
    this._isTweening = false;
    this._isPaused = false;
    this._timeoutHandler = noop;

    (root.cancelAnimationFrame            ||
    root.webkitCancelAnimationFrame     ||
    root.oCancelAnimationFrame          ||
    root.msCancelAnimationFrame         ||
    root.mozCancelRequestAnimationFrame ||
    root.clearTimeout)(this._scheduleId);

    if (gotoEnd) {
      applyFilter(this, 'beforeTween');
      tweenProps(
        1,
        this._currentState,
        this._originalState,
        this._targetState,
        1,
        0,
        this._easing
      );
      applyFilter(this, 'afterTween');
      applyFilter(this, 'afterTweenEnd');
      this._finish.call(this, this._currentState, this._attachment);
    }

    return this;
  };

  /**
   * @method isPlaying
   * @return {boolean} Whether or not a tween is running.
   */
  Tweenable.prototype.isPlaying = function () {
    return this._isTweening && !this._isPaused;
  };

  /**
   * Set a custom schedule function.
   *
   * If a custom function is not set,
   * [`requestAnimationFrame`](https://developer.mozilla.org/en-US/docs/Web/API/window.requestAnimationFrame)
   * is used if available, otherwise
   * [`setTimeout`](https://developer.mozilla.org/en-US/docs/Web/API/Window.setTimeout)
   * is used.
   * @method setScheduleFunction
   * @param {Function(Function,number)} scheduleFunction The function to be
   * used to schedule the next frame to be rendered.
   */
  Tweenable.prototype.setScheduleFunction = function (scheduleFunction) {
    this._scheduleFunction = scheduleFunction;
  };

  /**
   * `delete` all "own" properties.  Call this when the `Tweenable` instance
   * is no longer needed to free memory.
   * @method dispose
   */
  Tweenable.prototype.dispose = function () {
    var prop;
    for (prop in this) {
      if (this.hasOwnProperty(prop)) {
        delete this[prop];
      }
    }
  };

  /**
   * Filters are used for transforming the properties of a tween at various
   * points in a Tweenable's life cycle.  See the README for more info on this.
   * @private
   */
  Tweenable.prototype.filter = {};

  /**
   * This object contains all of the tweens available to Shifty.  It is
   * extensible - simply attach properties to the `Tweenable.prototype.formula`
   * Object following the same format as `linear`.
   *
   * `pos` should be a normalized `number` (between 0 and 1).
   * @property formula
   * @type {Object(function)}
   */
  Tweenable.prototype.formula = {
    linear: function (pos) {
      return pos;
    }
  };

  formula = Tweenable.prototype.formula;

  shallowCopy(Tweenable, {
    'now': now
    ,'each': each
    ,'tweenProps': tweenProps
    ,'tweenProp': tweenProp
    ,'applyFilter': applyFilter
    ,'shallowCopy': shallowCopy
    ,'defaults': defaults
    ,'composeEasingObject': composeEasingObject
  });

  // `root` is provided in the intro/outro files.

  // A hook used for unit testing.
  if (typeof SHIFTY_DEBUG_NOW === 'function') {
    root.timeoutHandler = timeoutHandler;
  }

  // Bootstrap Tweenable appropriately for the environment.
  if (typeof exports === 'object') {
    // CommonJS
    module.exports = Tweenable;
  } else if (typeof define === 'function' && define.amd) {
    // AMD
    define(function () {return Tweenable;});
  } else if (typeof root.Tweenable === 'undefined') {
    // Browser: Make `Tweenable` globally accessible.
    root.Tweenable = Tweenable;
  }

  return Tweenable;

} ());

/*!
 * All equations are adapted from Thomas Fuchs'
 * [Scripty2](https://github.com/madrobby/scripty2/blob/master/src/effects/transitions/penner.js).
 *
 * Based on Easing Equations (c) 2003 [Robert
 * Penner](http://www.robertpenner.com/), all rights reserved. This work is
 * [subject to terms](http://www.robertpenner.com/easing_terms_of_use.html).
 */

/*!
 *  TERMS OF USE - EASING EQUATIONS
 *  Open source under the BSD License.
 *  Easing Equations (c) 2003 Robert Penner, all rights reserved.
 */

;(function () {

  Tweenable.shallowCopy(Tweenable.prototype.formula, {
    easeInQuad: function (pos) {
      return Math.pow(pos, 2);
    },

    easeOutQuad: function (pos) {
      return -(Math.pow((pos - 1), 2) - 1);
    },

    easeInOutQuad: function (pos) {
      if ((pos /= 0.5) < 1) {return 0.5 * Math.pow(pos,2);}
      return -0.5 * ((pos -= 2) * pos - 2);
    },

    easeInCubic: function (pos) {
      return Math.pow(pos, 3);
    },

    easeOutCubic: function (pos) {
      return (Math.pow((pos - 1), 3) + 1);
    },

    easeInOutCubic: function (pos) {
      if ((pos /= 0.5) < 1) {return 0.5 * Math.pow(pos,3);}
      return 0.5 * (Math.pow((pos - 2),3) + 2);
    },

    easeInQuart: function (pos) {
      return Math.pow(pos, 4);
    },

    easeOutQuart: function (pos) {
      return -(Math.pow((pos - 1), 4) - 1);
    },

    easeInOutQuart: function (pos) {
      if ((pos /= 0.5) < 1) {return 0.5 * Math.pow(pos,4);}
      return -0.5 * ((pos -= 2) * Math.pow(pos,3) - 2);
    },

    easeInQuint: function (pos) {
      return Math.pow(pos, 5);
    },

    easeOutQuint: function (pos) {
      return (Math.pow((pos - 1), 5) + 1);
    },

    easeInOutQuint: function (pos) {
      if ((pos /= 0.5) < 1) {return 0.5 * Math.pow(pos,5);}
      return 0.5 * (Math.pow((pos - 2),5) + 2);
    },

    easeInSine: function (pos) {
      return -Math.cos(pos * (Math.PI / 2)) + 1;
    },

    easeOutSine: function (pos) {
      return Math.sin(pos * (Math.PI / 2));
    },

    easeInOutSine: function (pos) {
      return (-0.5 * (Math.cos(Math.PI * pos) - 1));
    },

    easeInExpo: function (pos) {
      return (pos === 0) ? 0 : Math.pow(2, 10 * (pos - 1));
    },

    easeOutExpo: function (pos) {
      return (pos === 1) ? 1 : -Math.pow(2, -10 * pos) + 1;
    },

    easeInOutExpo: function (pos) {
      if (pos === 0) {return 0;}
      if (pos === 1) {return 1;}
      if ((pos /= 0.5) < 1) {return 0.5 * Math.pow(2,10 * (pos - 1));}
      return 0.5 * (-Math.pow(2, -10 * --pos) + 2);
    },

    easeInCirc: function (pos) {
      return -(Math.sqrt(1 - (pos * pos)) - 1);
    },

    easeOutCirc: function (pos) {
      return Math.sqrt(1 - Math.pow((pos - 1), 2));
    },

    easeInOutCirc: function (pos) {
      if ((pos /= 0.5) < 1) {return -0.5 * (Math.sqrt(1 - pos * pos) - 1);}
      return 0.5 * (Math.sqrt(1 - (pos -= 2) * pos) + 1);
    },

    easeOutBounce: function (pos) {
      if ((pos) < (1 / 2.75)) {
        return (7.5625 * pos * pos);
      } else if (pos < (2 / 2.75)) {
        return (7.5625 * (pos -= (1.5 / 2.75)) * pos + 0.75);
      } else if (pos < (2.5 / 2.75)) {
        return (7.5625 * (pos -= (2.25 / 2.75)) * pos + 0.9375);
      } else {
        return (7.5625 * (pos -= (2.625 / 2.75)) * pos + 0.984375);
      }
    },

    easeInBack: function (pos) {
      var s = 1.70158;
      return (pos) * pos * ((s + 1) * pos - s);
    },

    easeOutBack: function (pos) {
      var s = 1.70158;
      return (pos = pos - 1) * pos * ((s + 1) * pos + s) + 1;
    },

    easeInOutBack: function (pos) {
      var s = 1.70158;
      if ((pos /= 0.5) < 1) {
        return 0.5 * (pos * pos * (((s *= (1.525)) + 1) * pos - s));
      }
      return 0.5 * ((pos -= 2) * pos * (((s *= (1.525)) + 1) * pos + s) + 2);
    },

    elastic: function (pos) {
      // jshint maxlen:90
      return -1 * Math.pow(4,-8 * pos) * Math.sin((pos * 6 - 1) * (2 * Math.PI) / 2) + 1;
    },

    swingFromTo: function (pos) {
      var s = 1.70158;
      return ((pos /= 0.5) < 1) ?
          0.5 * (pos * pos * (((s *= (1.525)) + 1) * pos - s)) :
          0.5 * ((pos -= 2) * pos * (((s *= (1.525)) + 1) * pos + s) + 2);
    },

    swingFrom: function (pos) {
      var s = 1.70158;
      return pos * pos * ((s + 1) * pos - s);
    },

    swingTo: function (pos) {
      var s = 1.70158;
      return (pos -= 1) * pos * ((s + 1) * pos + s) + 1;
    },

    bounce: function (pos) {
      if (pos < (1 / 2.75)) {
        return (7.5625 * pos * pos);
      } else if (pos < (2 / 2.75)) {
        return (7.5625 * (pos -= (1.5 / 2.75)) * pos + 0.75);
      } else if (pos < (2.5 / 2.75)) {
        return (7.5625 * (pos -= (2.25 / 2.75)) * pos + 0.9375);
      } else {
        return (7.5625 * (pos -= (2.625 / 2.75)) * pos + 0.984375);
      }
    },

    bouncePast: function (pos) {
      if (pos < (1 / 2.75)) {
        return (7.5625 * pos * pos);
      } else if (pos < (2 / 2.75)) {
        return 2 - (7.5625 * (pos -= (1.5 / 2.75)) * pos + 0.75);
      } else if (pos < (2.5 / 2.75)) {
        return 2 - (7.5625 * (pos -= (2.25 / 2.75)) * pos + 0.9375);
      } else {
        return 2 - (7.5625 * (pos -= (2.625 / 2.75)) * pos + 0.984375);
      }
    },

    easeFromTo: function (pos) {
      if ((pos /= 0.5) < 1) {return 0.5 * Math.pow(pos,4);}
      return -0.5 * ((pos -= 2) * Math.pow(pos,3) - 2);
    },

    easeFrom: function (pos) {
      return Math.pow(pos,4);
    },

    easeTo: function (pos) {
      return Math.pow(pos,0.25);
    }
  });

}());

// jshint maxlen:100
/**
 * The Bezier magic in this file is adapted/copied almost wholesale from
 * [Scripty2](https://github.com/madrobby/scripty2/blob/master/src/effects/transitions/cubic-bezier.js),
 * which was adapted from Apple code (which probably came from
 * [here](http://opensource.apple.com/source/WebCore/WebCore-955.66/platform/graphics/UnitBezier.h)).
 * Special thanks to Apple and Thomas Fuchs for much of this code.
 */

/**
 *  Copyright (c) 2006 Apple Computer, Inc. All rights reserved.
 *
 *  Redistribution and use in source and binary forms, with or without
 *  modification, are permitted provided that the following conditions are met:
 *
 *  1. Redistributions of source code must retain the above copyright notice,
 *  this list of conditions and the following disclaimer.
 *
 *  2. Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation
 *  and/or other materials provided with the distribution.
 *
 *  3. Neither the name of the copyright holder(s) nor the names of any
 *  contributors may be used to endorse or promote products derived from
 *  this software without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 *  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 *  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 *  ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
 *  LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 *  CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 *  SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 *  INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 *  CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */
;(function () {
  // port of webkit cubic bezier handling by http://www.netzgesta.de/dev/
  function cubicBezierAtTime(t,p1x,p1y,p2x,p2y,duration) {
    var ax = 0,bx = 0,cx = 0,ay = 0,by = 0,cy = 0;
    function sampleCurveX(t) {
      return ((ax * t + bx) * t + cx) * t;
    }
    function sampleCurveY(t) {
      return ((ay * t + by) * t + cy) * t;
    }
    function sampleCurveDerivativeX(t) {
      return (3.0 * ax * t + 2.0 * bx) * t + cx;
    }
    function solveEpsilon(duration) {
      return 1.0 / (200.0 * duration);
    }
    function solve(x,epsilon) {
      return sampleCurveY(solveCurveX(x, epsilon));
    }
    function fabs(n) {
      if (n >= 0) {
        return n;
      } else {
        return 0 - n;
      }
    }
    function solveCurveX(x, epsilon) {
      var t0,t1,t2,x2,d2,i;
      for (t2 = x, i = 0; i < 8; i++) {
        x2 = sampleCurveX(t2) - x;
        if (fabs(x2) < epsilon) {
          return t2;
        }
        d2 = sampleCurveDerivativeX(t2);
        if (fabs(d2) < 1e-6) {
          break;
        }
        t2 = t2 - x2 / d2;
      }
      t0 = 0.0;
      t1 = 1.0;
      t2 = x;
      if (t2 < t0) {
        return t0;
      }
      if (t2 > t1) {
        return t1;
      }
      while (t0 < t1) {
        x2 = sampleCurveX(t2);
        if (fabs(x2 - x) < epsilon) {
          return t2;
        }
        if (x > x2) {
          t0 = t2;
        }else {
          t1 = t2;
        }
        t2 = (t1 - t0) * 0.5 + t0;
      }
      return t2; // Failure.
    }
    cx = 3.0 * p1x;
    bx = 3.0 * (p2x - p1x) - cx;
    ax = 1.0 - cx - bx;
    cy = 3.0 * p1y;
    by = 3.0 * (p2y - p1y) - cy;
    ay = 1.0 - cy - by;
    return solve(t, solveEpsilon(duration));
  }
  /**
   *  getCubicBezierTransition(x1, y1, x2, y2) -> Function
   *
   *  Generates a transition easing function that is compatible
   *  with WebKit's CSS transitions `-webkit-transition-timing-function`
   *  CSS property.
   *
   *  The W3C has more information about CSS3 transition timing functions:
   *  http://www.w3.org/TR/css3-transitions/#transition-timing-function_tag
   *
   *  @param {number} x1
   *  @param {number} y1
   *  @param {number} x2
   *  @param {number} y2
   *  @return {function}
   *  @private
   */
  function getCubicBezierTransition (x1, y1, x2, y2) {
    return function (pos) {
      return cubicBezierAtTime(pos,x1,y1,x2,y2,1);
    };
  }
  // End ported code

  /**
   * Create a Bezier easing function and attach it to `{{#crossLink
   * "Tweenable/formula:property"}}Tweenable#formula{{/crossLink}}`.  This
   * function gives you total control over the easing curve.  Matthew Lein's
   * [Ceaser](http://matthewlein.com/ceaser/) is a useful tool for visualizing
   * the curves you can make with this function.
   * @method setBezierFunction
   * @param {string} name The name of the easing curve.  Overwrites the old
   * easing function on `{{#crossLink
   * "Tweenable/formula:property"}}Tweenable#formula{{/crossLink}}` if it
   * exists.
   * @param {number} x1
   * @param {number} y1
   * @param {number} x2
   * @param {number} y2
   * @return {function} The easing function that was attached to
   * Tweenable.prototype.formula.
   */
  Tweenable.setBezierFunction = function (name, x1, y1, x2, y2) {
    var cubicBezierTransition = getCubicBezierTransition(x1, y1, x2, y2);
    cubicBezierTransition.displayName = name;
    cubicBezierTransition.x1 = x1;
    cubicBezierTransition.y1 = y1;
    cubicBezierTransition.x2 = x2;
    cubicBezierTransition.y2 = y2;

    return Tweenable.prototype.formula[name] = cubicBezierTransition;
  };


  /**
   * `delete` an easing function from `{{#crossLink
   * "Tweenable/formula:property"}}Tweenable#formula{{/crossLink}}`.  Be
   * careful with this method, as it `delete`s whatever easing formula matches
   * `name` (which means you can delete standard Shifty easing functions).
   * @method unsetBezierFunction
   * @param {string} name The name of the easing function to delete.
   * @return {function}
   */
  Tweenable.unsetBezierFunction = function (name) {
    delete Tweenable.prototype.formula[name];
  };

})();

;(function () {

  function getInterpolatedValues (
    from, current, targetState, position, easing, delay) {
    return Tweenable.tweenProps(
      position, current, from, targetState, 1, delay, easing);
  }

  // Fake a Tweenable and patch some internals.  This approach allows us to
  // skip uneccessary processing and object recreation, cutting down on garbage
  // collection pauses.
  var mockTweenable = new Tweenable();
  mockTweenable._filterArgs = [];

  /**
   * Compute the midpoint of two Objects.  This method effectively calculates a
   * specific frame of animation that `{{#crossLink
   * "Tweenable/tween:method"}}{{/crossLink}}` does many times over the course
   * of a full tween.
   *
   *     var interpolatedValues = Tweenable.interpolate({
   *       width: '100px',
   *       opacity: 0,
   *       color: '#fff'
   *     }, {
   *       width: '200px',
   *       opacity: 1,
   *       color: '#000'
   *     }, 0.5);
   *
   *     console.log(interpolatedValues);
   *     // {opacity: 0.5, width: "150px", color: "rgb(127,127,127)"}
   *
   * @static
   * @method interpolate
   * @param {Object} from The starting values to tween from.
   * @param {Object} targetState The ending values to tween to.
   * @param {number} position The normalized position value (between `0.0` and
   * `1.0`) to interpolate the values between `from` and `to` for.  `from`
   * represents `0` and `to` represents `1`.
   * @param {Object.<string|Function>|string|Function} easing The easing
   * curve(s) to calculate the midpoint against.  You can reference any easing
   * function attached to `Tweenable.prototype.formula`, or provide the easing
   * function(s) directly.  If omitted, this defaults to "linear".
   * @param {number=} opt_delay Optional delay to pad the beginning of the
   * interpolated tween with.  This increases the range of `position` from (`0`
   * through `1`) to (`0` through `1 + opt_delay`).  So, a delay of `0.5` would
   * increase all valid values of `position` to numbers between `0` and `1.5`.
   * @return {Object}
   */
  Tweenable.interpolate = function (
    from, targetState, position, easing, opt_delay) {

    var current = Tweenable.shallowCopy({}, from);
    var delay = opt_delay || 0;
    var easingObject = Tweenable.composeEasingObject(
      from, easing || 'linear');

    mockTweenable.set({});

    // Alias and reuse the _filterArgs array instead of recreating it.
    var filterArgs = mockTweenable._filterArgs;
    filterArgs.length = 0;
    filterArgs[0] = current;
    filterArgs[1] = from;
    filterArgs[2] = targetState;
    filterArgs[3] = easingObject;

    // Any defined value transformation must be applied
    Tweenable.applyFilter(mockTweenable, 'tweenCreated');
    Tweenable.applyFilter(mockTweenable, 'beforeTween');

    var interpolatedValues = getInterpolatedValues(
      from, current, targetState, position, easingObject, delay);

    // Transform values back into their original format
    Tweenable.applyFilter(mockTweenable, 'afterTween');

    return interpolatedValues;
  };

}());

/**
 * This module adds string interpolation support to Shifty.
 *
 * The Token extension allows Shifty to tween numbers inside of strings.  Among
 * other things, this allows you to animate CSS properties.  For example, you
 * can do this:
 *
 *     var tweenable = new Tweenable();
 *     tweenable.tween({
 *       from: { transform: 'translateX(45px)' },
 *       to: { transform: 'translateX(90xp)' }
 *     });
 *
 * `translateX(45)` will be tweened to `translateX(90)`.  To demonstrate:
 *
 *     var tweenable = new Tweenable();
 *     tweenable.tween({
 *       from: { transform: 'translateX(45px)' },
 *       to: { transform: 'translateX(90px)' },
 *       step: function (state) {
 *         console.log(state.transform);
 *       }
 *     });
 *
 * The above snippet will log something like this in the console:
 *
 *     translateX(60.3px)
 *     ...
 *     translateX(76.05px)
 *     ...
 *     translateX(90px)
 *
 * Another use for this is animating colors:
 *
 *     var tweenable = new Tweenable();
 *     tweenable.tween({
 *       from: { color: 'rgb(0,255,0)' },
 *       to: { color: 'rgb(255,0,255)' },
 *       step: function (state) {
 *         console.log(state.color);
 *       }
 *     });
 *
 * The above snippet will log something like this:
 *
 *     rgb(84,170,84)
 *     ...
 *     rgb(170,84,170)
 *     ...
 *     rgb(255,0,255)
 *
 * This extension also supports hexadecimal colors, in both long (`#ff00ff`)
 * and short (`#f0f`) forms.  Be aware that hexadecimal input values will be
 * converted into the equivalent RGB output values.  This is done to optimize
 * for performance.
 *
 *     var tweenable = new Tweenable();
 *     tweenable.tween({
 *       from: { color: '#0f0' },
 *       to: { color: '#f0f' },
 *       step: function (state) {
 *         console.log(state.color);
 *       }
 *     });
 *
 * This snippet will generate the same output as the one before it because
 * equivalent values were supplied (just in hexadecimal form rather than RGB):
 *
 *     rgb(84,170,84)
 *     ...
 *     rgb(170,84,170)
 *     ...
 *     rgb(255,0,255)
 *
 * ## Easing support
 *
 * Easing works somewhat differently in the Token extension.  This is because
 * some CSS properties have multiple values in them, and you might need to
 * tween each value along its own easing curve.  A basic example:
 *
 *     var tweenable = new Tweenable();
 *     tweenable.tween({
 *       from: { transform: 'translateX(0px) translateY(0px)' },
 *       to: { transform:   'translateX(100px) translateY(100px)' },
 *       easing: { transform: 'easeInQuad' },
 *       step: function (state) {
 *         console.log(state.transform);
 *       }
 *     });
 *
 * The above snippet will create values like this:
 *
 *     translateX(11.56px) translateY(11.56px)
 *     ...
 *     translateX(46.24px) translateY(46.24px)
 *     ...
 *     translateX(100px) translateY(100px)
 *
 * In this case, the values for `translateX` and `translateY` are always the
 * same for each step of the tween, because they have the same start and end
 * points and both use the same easing curve.  We can also tween `translateX`
 * and `translateY` along independent curves:
 *
 *     var tweenable = new Tweenable();
 *     tweenable.tween({
 *       from: { transform: 'translateX(0px) translateY(0px)' },
 *       to: { transform:   'translateX(100px) translateY(100px)' },
 *       easing: { transform: 'easeInQuad bounce' },
 *       step: function (state) {
 *         console.log(state.transform);
 *       }
 *     });
 *
 * The above snippet will create values like this:
 *
 *     translateX(10.89px) translateY(82.35px)
 *     ...
 *     translateX(44.89px) translateY(86.73px)
 *     ...
 *     translateX(100px) translateY(100px)
 *
 * `translateX` and `translateY` are not in sync anymore, because `easeInQuad`
 * was specified for `translateX` and `bounce` for `translateY`.  Mixing and
 * matching easing curves can make for some interesting motion in your
 * animations.
 *
 * The order of the space-separated easing curves correspond the token values
 * they apply to.  If there are more token values than easing curves listed,
 * the last easing curve listed is used.
 * @submodule Tweenable.token
 */

// token function is defined above only so that dox-foundation sees it as
// documentation and renders it.  It is never used, and is optimized away at
// build time.

;(function (Tweenable) {

  /**
   * @typedef {{
   *   formatString: string
   *   chunkNames: Array.<string>
   * }}
   * @private
   */
  var formatManifest;

  // CONSTANTS

  var R_NUMBER_COMPONENT = /(\d|\-|\.)/;
  var R_FORMAT_CHUNKS = /([^\-0-9\.]+)/g;
  var R_UNFORMATTED_VALUES = /[0-9.\-]+/g;
  var R_RGB = new RegExp(
    'rgb\\(' + R_UNFORMATTED_VALUES.source +
    (/,\s*/.source) + R_UNFORMATTED_VALUES.source +
    (/,\s*/.source) + R_UNFORMATTED_VALUES.source + '\\)', 'g');
  var R_RGB_PREFIX = /^.*\(/;
  var R_HEX = /#([0-9]|[a-f]){3,6}/gi;
  var VALUE_PLACEHOLDER = 'VAL';

  // HELPERS

  /**
   * @param {Array.number} rawValues
   * @param {string} prefix
   *
   * @return {Array.<string>}
   * @private
   */
  function getFormatChunksFrom (rawValues, prefix) {
    var accumulator = [];

    var rawValuesLength = rawValues.length;
    var i;

    for (i = 0; i < rawValuesLength; i++) {
      accumulator.push('_' + prefix + '_' + i);
    }

    return accumulator;
  }

  /**
   * @param {string} formattedString
   *
   * @return {string}
   * @private
   */
  function getFormatStringFrom (formattedString) {
    var chunks = formattedString.match(R_FORMAT_CHUNKS);

    if (!chunks) {
      // chunks will be null if there were no tokens to parse in
      // formattedString (for example, if formattedString is '2').  Coerce
      // chunks to be useful here.
      chunks = ['', ''];

      // If there is only one chunk, assume that the string is a number
      // followed by a token...
      // NOTE: This may be an unwise assumption.
    } else if (chunks.length === 1 ||
      // ...or if the string starts with a number component (".", "-", or a
      // digit)...
    formattedString[0].match(R_NUMBER_COMPONENT)) {
      // ...prepend an empty string here to make sure that the formatted number
      // is properly replaced by VALUE_PLACEHOLDER
      chunks.unshift('');
    }

    return chunks.join(VALUE_PLACEHOLDER);
  }

  /**
   * Convert all hex color values within a string to an rgb string.
   *
   * @param {Object} stateObject
   *
   * @return {Object} The modified obj
   * @private
   */
  function sanitizeObjectForHexProps (stateObject) {
    Tweenable.each(stateObject, function (prop) {
      var currentProp = stateObject[prop];

      if (typeof currentProp === 'string' && currentProp.match(R_HEX)) {
        stateObject[prop] = sanitizeHexChunksToRGB(currentProp);
      }
    });
  }

  /**
   * @param {string} str
   *
   * @return {string}
   * @private
   */
  function  sanitizeHexChunksToRGB (str) {
    return filterStringChunks(R_HEX, str, convertHexToRGB);
  }

  /**
   * @param {string} hexString
   *
   * @return {string}
   * @private
   */
  function convertHexToRGB (hexString) {
    var rgbArr = hexToRGBArray(hexString);
    return 'rgb(' + rgbArr[0] + ',' + rgbArr[1] + ',' + rgbArr[2] + ')';
  }

  var hexToRGBArray_returnArray = [];
  /**
   * Convert a hexadecimal string to an array with three items, one each for
   * the red, blue, and green decimal values.
   *
   * @param {string} hex A hexadecimal string.
   *
   * @returns {Array.<number>} The converted Array of RGB values if `hex` is a
   * valid string, or an Array of three 0's.
   * @private
   */
  function hexToRGBArray (hex) {

    hex = hex.replace(/#/, '');

    // If the string is a shorthand three digit hex notation, normalize it to
    // the standard six digit notation
    if (hex.length === 3) {
      hex = hex.split('');
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }

    hexToRGBArray_returnArray[0] = hexToDec(hex.substr(0, 2));
    hexToRGBArray_returnArray[1] = hexToDec(hex.substr(2, 2));
    hexToRGBArray_returnArray[2] = hexToDec(hex.substr(4, 2));

    return hexToRGBArray_returnArray;
  }

  /**
   * Convert a base-16 number to base-10.
   *
   * @param {Number|String} hex The value to convert
   *
   * @returns {Number} The base-10 equivalent of `hex`.
   * @private
   */
  function hexToDec (hex) {
    return parseInt(hex, 16);
  }

  /**
   * Runs a filter operation on all chunks of a string that match a RegExp
   *
   * @param {RegExp} pattern
   * @param {string} unfilteredString
   * @param {function(string)} filter
   *
   * @return {string}
   * @private
   */
  function filterStringChunks (pattern, unfilteredString, filter) {
    var pattenMatches = unfilteredString.match(pattern);
    var filteredString = unfilteredString.replace(pattern, VALUE_PLACEHOLDER);

    if (pattenMatches) {
      var pattenMatchesLength = pattenMatches.length;
      var currentChunk;

      for (var i = 0; i < pattenMatchesLength; i++) {
        currentChunk = pattenMatches.shift();
        filteredString = filteredString.replace(
          VALUE_PLACEHOLDER, filter(currentChunk));
      }
    }

    return filteredString;
  }

  /**
   * Check for floating point values within rgb strings and rounds them.
   *
   * @param {string} formattedString
   *
   * @return {string}
   * @private
   */
  function sanitizeRGBChunks (formattedString) {
    return filterStringChunks(R_RGB, formattedString, sanitizeRGBChunk);
  }

  /**
   * @param {string} rgbChunk
   *
   * @return {string}
   * @private
   */
  function sanitizeRGBChunk (rgbChunk) {
    var numbers = rgbChunk.match(R_UNFORMATTED_VALUES);
    var numbersLength = numbers.length;
    var sanitizedString = rgbChunk.match(R_RGB_PREFIX)[0];

    for (var i = 0; i < numbersLength; i++) {
      sanitizedString += parseInt(numbers[i], 10) + ',';
    }

    sanitizedString = sanitizedString.slice(0, -1) + ')';

    return sanitizedString;
  }

  /**
   * @param {Object} stateObject
   *
   * @return {Object} An Object of formatManifests that correspond to
   * the string properties of stateObject
   * @private
   */
  function getFormatManifests (stateObject) {
    var manifestAccumulator = {};

    Tweenable.each(stateObject, function (prop) {
      var currentProp = stateObject[prop];

      if (typeof currentProp === 'string') {
        var rawValues = getValuesFrom(currentProp);

        manifestAccumulator[prop] = {
          'formatString': getFormatStringFrom(currentProp)
          ,'chunkNames': getFormatChunksFrom(rawValues, prop)
        };
      }
    });

    return manifestAccumulator;
  }

  /**
   * @param {Object} stateObject
   * @param {Object} formatManifests
   * @private
   */
  function expandFormattedProperties (stateObject, formatManifests) {
    Tweenable.each(formatManifests, function (prop) {
      var currentProp = stateObject[prop];
      var rawValues = getValuesFrom(currentProp);
      var rawValuesLength = rawValues.length;

      for (var i = 0; i < rawValuesLength; i++) {
        stateObject[formatManifests[prop].chunkNames[i]] = +rawValues[i];
      }

      delete stateObject[prop];
    });
  }

  /**
   * @param {Object} stateObject
   * @param {Object} formatManifests
   * @private
   */
  function collapseFormattedProperties (stateObject, formatManifests) {
    Tweenable.each(formatManifests, function (prop) {
      var currentProp = stateObject[prop];
      var formatChunks = extractPropertyChunks(
        stateObject, formatManifests[prop].chunkNames);
      var valuesList = getValuesList(
        formatChunks, formatManifests[prop].chunkNames);
      currentProp = getFormattedValues(
        formatManifests[prop].formatString, valuesList);
      stateObject[prop] = sanitizeRGBChunks(currentProp);
    });
  }

  /**
   * @param {Object} stateObject
   * @param {Array.<string>} chunkNames
   *
   * @return {Object} The extracted value chunks.
   * @private
   */
  function extractPropertyChunks (stateObject, chunkNames) {
    var extractedValues = {};
    var currentChunkName, chunkNamesLength = chunkNames.length;

    for (var i = 0; i < chunkNamesLength; i++) {
      currentChunkName = chunkNames[i];
      extractedValues[currentChunkName] = stateObject[currentChunkName];
      delete stateObject[currentChunkName];
    }

    return extractedValues;
  }

  var getValuesList_accumulator = [];
  /**
   * @param {Object} stateObject
   * @param {Array.<string>} chunkNames
   *
   * @return {Array.<number>}
   * @private
   */
  function getValuesList (stateObject, chunkNames) {
    getValuesList_accumulator.length = 0;
    var chunkNamesLength = chunkNames.length;

    for (var i = 0; i < chunkNamesLength; i++) {
      getValuesList_accumulator.push(stateObject[chunkNames[i]]);
    }

    return getValuesList_accumulator;
  }

  /**
   * @param {string} formatString
   * @param {Array.<number>} rawValues
   *
   * @return {string}
   * @private
   */
  function getFormattedValues (formatString, rawValues) {
    var formattedValueString = formatString;
    var rawValuesLength = rawValues.length;

    for (var i = 0; i < rawValuesLength; i++) {
      formattedValueString = formattedValueString.replace(
        VALUE_PLACEHOLDER, +rawValues[i].toFixed(4));
    }

    return formattedValueString;
  }

  /**
   * Note: It's the duty of the caller to convert the Array elements of the
   * return value into numbers.  This is a performance optimization.
   *
   * @param {string} formattedString
   *
   * @return {Array.<string>|null}
   * @private
   */
  function getValuesFrom (formattedString) {
    return formattedString.match(R_UNFORMATTED_VALUES);
  }

  /**
   * @param {Object} easingObject
   * @param {Object} tokenData
   * @private
   */
  function expandEasingObject (easingObject, tokenData) {
    Tweenable.each(tokenData, function (prop) {
      var currentProp = tokenData[prop];
      var chunkNames = currentProp.chunkNames;
      var chunkLength = chunkNames.length;

      var easing = easingObject[prop];
      var i;

      if (typeof easing === 'string') {
        var easingChunks = easing.split(' ');
        var lastEasingChunk = easingChunks[easingChunks.length - 1];

        for (i = 0; i < chunkLength; i++) {
          easingObject[chunkNames[i]] = easingChunks[i] || lastEasingChunk;
        }

      } else {
        for (i = 0; i < chunkLength; i++) {
          easingObject[chunkNames[i]] = easing;
        }
      }

      delete easingObject[prop];
    });
  }

  /**
   * @param {Object} easingObject
   * @param {Object} tokenData
   * @private
   */
  function collapseEasingObject (easingObject, tokenData) {
    Tweenable.each(tokenData, function (prop) {
      var currentProp = tokenData[prop];
      var chunkNames = currentProp.chunkNames;
      var chunkLength = chunkNames.length;

      var firstEasing = easingObject[chunkNames[0]];
      var typeofEasings = typeof firstEasing;

      if (typeofEasings === 'string') {
        var composedEasingString = '';

        for (var i = 0; i < chunkLength; i++) {
          composedEasingString += ' ' + easingObject[chunkNames[i]];
          delete easingObject[chunkNames[i]];
        }

        easingObject[prop] = composedEasingString.substr(1);
      } else {
        easingObject[prop] = firstEasing;
      }
    });
  }

  Tweenable.prototype.filter.token = {
    'tweenCreated': function (currentState, fromState, toState, easingObject) {
      sanitizeObjectForHexProps(currentState);
      sanitizeObjectForHexProps(fromState);
      sanitizeObjectForHexProps(toState);
      this._tokenData = getFormatManifests(currentState);
    },

    'beforeTween': function (currentState, fromState, toState, easingObject) {
      expandEasingObject(easingObject, this._tokenData);
      expandFormattedProperties(currentState, this._tokenData);
      expandFormattedProperties(fromState, this._tokenData);
      expandFormattedProperties(toState, this._tokenData);
    },

    'afterTween': function (currentState, fromState, toState, easingObject) {
      collapseFormattedProperties(currentState, this._tokenData);
      collapseFormattedProperties(fromState, this._tokenData);
      collapseFormattedProperties(toState, this._tokenData);
      collapseEasingObject(easingObject, this._tokenData);
    }
  };

} (Tweenable));

}).call(null);

},{}],2:[function(require,module,exports){
// Circle shaped progress bar

var Shape = require('./shape');
var utils = require('./utils');

var Circle = function Circle(container, options) {
    // Use two arcs to form a circle
    // See this answer http://stackoverflow.com/a/10477334/1446092
    this._pathTemplate =
        'M 50,50 m 0,-{radius}' +
        ' a {radius},{radius} 0 1 1 0,{2radius}' +
        ' a {radius},{radius} 0 1 1 0,-{2radius}';

    this.containerAspectRatio = 1;

    Shape.apply(this, arguments);
};

Circle.prototype = new Shape();
Circle.prototype.constructor = Circle;

Circle.prototype._pathString = function _pathString(opts) {
    var widthOfWider = opts.strokeWidth;
    if (opts.trailWidth && opts.trailWidth > opts.strokeWidth) {
        widthOfWider = opts.trailWidth;
    }

    var r = 50 - widthOfWider / 2;

    return utils.render(this._pathTemplate, {
        radius: r,
        '2radius': r * 2
    });
};

Circle.prototype._trailString = function _trailString(opts) {
    return this._pathString(opts);
};

module.exports = Circle;

},{"./shape":7,"./utils":8}],3:[function(require,module,exports){
// Line shaped progress bar

var Shape = require('./shape');
var utils = require('./utils');

var Line = function Line(container, options) {
    this._pathTemplate = 'M 0,{center} L 100,{center}';
    Shape.apply(this, arguments);
};

Line.prototype = new Shape();
Line.prototype.constructor = Line;

Line.prototype._initializeSvg = function _initializeSvg(svg, opts) {
    svg.setAttribute('viewBox', '0 0 100 ' + opts.strokeWidth);
    svg.setAttribute('preserveAspectRatio', 'none');
};

Line.prototype._pathString = function _pathString(opts) {
    return utils.render(this._pathTemplate, {
        center: opts.strokeWidth / 2
    });
};

Line.prototype._trailString = function _trailString(opts) {
    return this._pathString(opts);
};

module.exports = Line;

},{"./shape":7,"./utils":8}],4:[function(require,module,exports){
module.exports = {
    // Higher level API, different shaped progress bars
    Line: require('./line'),
    Circle: require('./circle'),
    SemiCircle: require('./semicircle'),

    // Lower level API to use any SVG path
    Path: require('./path'),

    // Base-class for creating new custom shapes
    // to be in line with the API of built-in shapes
    // Undocumented.
    Shape: require('./shape'),

    // Internal utils, undocumented.
    utils: require('./utils')
};

},{"./circle":2,"./line":3,"./path":5,"./semicircle":6,"./shape":7,"./utils":8}],5:[function(require,module,exports){
// Lower level API to animate any kind of svg path

var Tweenable = require('shifty');
var utils = require('./utils');

var EASING_ALIASES = {
    easeIn: 'easeInCubic',
    easeOut: 'easeOutCubic',
    easeInOut: 'easeInOutCubic'
};

var Path = function Path(path, opts) {
    // Throw a better error if not initialized with `new` keyword
    if (!(this instanceof Path)) {
        throw new Error('Constructor was called without new keyword');
    }

    // Default parameters for animation
    opts = utils.extend({
        duration: 800,
        easing: 'linear',
        from: {},
        to: {},
        step: function() {}
    }, opts);

    var element;
    if (utils.isString(path)) {
        element = document.querySelector(path);
    } else {
        element = path;
    }

    // Reveal .path as public attribute
    this.path = element;
    this._opts = opts;
    this._tweenable = null;

    // Set up the starting positions
    var length = this.path.getTotalLength();
    this.path.style.strokeDasharray = length + ' ' + length;
    this.set(0);
};

Path.prototype.value = function value() {
    var offset = this._getComputedDashOffset();
    var length = this.path.getTotalLength();

    var progress = 1 - offset / length;
    // Round number to prevent returning very small number like 1e-30, which
    // is practically 0
    return parseFloat(progress.toFixed(6), 10);
};

Path.prototype.set = function set(progress) {
    this.stop();

    this.path.style.strokeDashoffset = this._progressToOffset(progress);

    var step = this._opts.step;
    if (utils.isFunction(step)) {
        var easing = this._easing(this._opts.easing);
        var values = this._calculateTo(progress, easing);
        var reference = this._opts.shape || this;
        step(values, reference, this._opts.attachment);
    }
};

Path.prototype.stop = function stop() {
    this._stopTween();
    this.path.style.strokeDashoffset = this._getComputedDashOffset();
};

// Method introduced here:
// http://jakearchibald.com/2013/animated-line-drawing-svg/
Path.prototype.animate = function animate(progress, opts, cb) {
    opts = opts || {};

    if (utils.isFunction(opts)) {
        cb = opts;
        opts = {};
    }

    var passedOpts = utils.extend({}, opts);

    // Copy default opts to new object so defaults are not modified
    var defaultOpts = utils.extend({}, this._opts);
    opts = utils.extend(defaultOpts, opts);

    var shiftyEasing = this._easing(opts.easing);
    var values = this._resolveFromAndTo(progress, shiftyEasing, passedOpts);

    this.stop();

    // Trigger a layout so styles are calculated & the browser
    // picks up the starting position before animating
    this.path.getBoundingClientRect();

    var offset = this._getComputedDashOffset();
    var newOffset = this._progressToOffset(progress);

    var self = this;
    this._tweenable = new Tweenable();
    this._tweenable.tween({
        from: utils.extend({ offset: offset }, values.from),
        to: utils.extend({ offset: newOffset }, values.to),
        duration: opts.duration,
        easing: shiftyEasing,
        step: function(state) {
            self.path.style.strokeDashoffset = state.offset;
            var reference = opts.shape || self;
            opts.step(state, reference, opts.attachment);
        },
        finish: function(state) {
            if (utils.isFunction(cb)) {
                cb();
            }
        }
    });
};

Path.prototype._getComputedDashOffset = function _getComputedDashOffset() {
    var computedStyle = window.getComputedStyle(this.path, null);
    return parseFloat(computedStyle.getPropertyValue('stroke-dashoffset'), 10);
};

Path.prototype._progressToOffset = function _progressToOffset(progress) {
    var length = this.path.getTotalLength();
    return length - progress * length;
};

// Resolves from and to values for animation.
Path.prototype._resolveFromAndTo = function _resolveFromAndTo(progress, easing, opts) {
    if (opts.from && opts.to) {
        return {
            from: opts.from,
            to: opts.to
        };
    }

    return {
        from: this._calculateFrom(easing),
        to: this._calculateTo(progress, easing)
    };
};

// Calculate `from` values from options passed at initialization
Path.prototype._calculateFrom = function _calculateFrom(easing) {
    return Tweenable.interpolate(this._opts.from, this._opts.to, this.value(), easing);
};

// Calculate `to` values from options passed at initialization
Path.prototype._calculateTo = function _calculateTo(progress, easing) {
    return Tweenable.interpolate(this._opts.from, this._opts.to, progress, easing);
};

Path.prototype._stopTween = function _stopTween() {
    if (this._tweenable !== null) {
        this._tweenable.stop();
        this._tweenable = null;
    }
};

Path.prototype._easing = function _easing(easing) {
    if (EASING_ALIASES.hasOwnProperty(easing)) {
        return EASING_ALIASES[easing];
    }

    return easing;
};

module.exports = Path;

},{"./utils":8,"shifty":1}],6:[function(require,module,exports){
// Semi-SemiCircle shaped progress bar

var Shape = require('./shape');
var Circle = require('./circle');
var utils = require('./utils');

var SemiCircle = function SemiCircle(container, options) {
    // Use one arc to form a SemiCircle
    // See this answer http://stackoverflow.com/a/10477334/1446092
    this._pathTemplate =
        'M 50,50 m -{radius},0' +
        ' a {radius},{radius} 0 1 1 {2radius},0';

    this.containerAspectRatio = 2;

    Shape.apply(this, arguments);
};

SemiCircle.prototype = new Shape();
SemiCircle.prototype.constructor = SemiCircle;

SemiCircle.prototype._initializeSvg = function _initializeSvg(svg, opts) {
    svg.setAttribute('viewBox', '0 0 100 50');
};

SemiCircle.prototype._initializeTextContainer = function _initializeTextContainer(
    opts,
    container,
    textContainer
) {
    if (opts.text.style) {
        // Reset top style
        textContainer.style.top = 'auto';
        textContainer.style.bottom = '0';

        if (opts.text.alignToBottom) {
            utils.setStyle(textContainer, 'transform', 'translate(-50%, 0)');
        } else {
            utils.setStyle(textContainer, 'transform', 'translate(-50%, 50%)');
        }
    }
};

// Share functionality with Circle, just have different path
SemiCircle.prototype._pathString = Circle.prototype._pathString;
SemiCircle.prototype._trailString = Circle.prototype._trailString;

module.exports = SemiCircle;

},{"./circle":2,"./shape":7,"./utils":8}],7:[function(require,module,exports){
// Base object for different progress bar shapes

var Path = require('./path');
var utils = require('./utils');

var DESTROYED_ERROR = 'Object is destroyed';

var Shape = function Shape(container, opts) {
    // Throw a better error if progress bars are not initialized with `new`
    // keyword
    if (!(this instanceof Shape)) {
        throw new Error('Constructor was called without new keyword');
    }

    // Prevent calling constructor without parameters so inheritance
    // works correctly. To understand, this is how Shape is inherited:
    //
    //   Line.prototype = new Shape();
    //
    // We just want to set the prototype for Line.
    if (arguments.length === 0) {
        return;
    }

    // Default parameters for progress bar creation
    this._opts = utils.extend({
        color: '#555',
        strokeWidth: 1.0,
        trailColor: null,
        trailWidth: null,
        fill: null,
        text: {
            style: {
                color: null,
                position: 'absolute',
                left: '50%',
                top: '50%',
                padding: 0,
                margin: 0,
                transform: {
                    prefix: true,
                    value: 'translate(-50%, -50%)'
                }
            },
            autoStyleContainer: true,
            alignToBottom: true,
            value: null,
            className: 'progressbar-text'
        },
        svgStyle: {
            display: 'block',
            width: '100%'
        },
        warnings: false
    }, opts, true);  // Use recursive extend

    // If user specifies e.g. svgStyle or text style, the whole object
    // should replace the defaults to make working with styles easier
    if (utils.isObject(opts) && opts.svgStyle !== undefined) {
        this._opts.svgStyle = opts.svgStyle;
    }
    if (utils.isObject(opts) && utils.isObject(opts.text) && opts.text.style !== undefined) {
        this._opts.text.style = opts.text.style;
    }

    var svgView = this._createSvgView(this._opts);

    var element;
    if (utils.isString(container)) {
        element = document.querySelector(container);
    } else {
        element = container;
    }

    if (!element) {
        throw new Error('Container does not exist: ' + container);
    }

    this._container = element;
    this._container.appendChild(svgView.svg);
    if (this._opts.warnings) {
        this._warnContainerAspectRatio(this._container);
    }

    if (this._opts.svgStyle) {
        utils.setStyles(svgView.svg, this._opts.svgStyle);
    }

    // Expose public attributes before Path initialization
    this.svg = svgView.svg;
    this.path = svgView.path;
    this.trail = svgView.trail;
    this.text = null;

    var newOpts = utils.extend({
        attachment: undefined,
        shape: this
    }, this._opts);
    this._progressPath = new Path(svgView.path, newOpts);

    if (utils.isObject(this._opts.text) && this._opts.text.value !== null) {
        this.setText(this._opts.text.value);
    }
};

Shape.prototype.animate = function animate(progress, opts, cb) {
    if (this._progressPath === null) {
        throw new Error(DESTROYED_ERROR);
    }

    this._progressPath.animate(progress, opts, cb);
};

Shape.prototype.stop = function stop() {
    if (this._progressPath === null) {
        throw new Error(DESTROYED_ERROR);
    }

    // Don't crash if stop is called inside step function
    if (this._progressPath === undefined) {
        return;
    }

    this._progressPath.stop();
};

Shape.prototype.destroy = function destroy() {
    if (this._progressPath === null) {
        throw new Error(DESTROYED_ERROR);
    }

    this.stop();
    this.svg.parentNode.removeChild(this.svg);
    this.svg = null;
    this.path = null;
    this.trail = null;
    this._progressPath = null;

    if (this.text !== null) {
        this.text.parentNode.removeChild(this.text);
        this.text = null;
    }
};

Shape.prototype.set = function set(progress) {
    if (this._progressPath === null) {
        throw new Error(DESTROYED_ERROR);
    }

    this._progressPath.set(progress);
};

Shape.prototype.value = function value() {
    if (this._progressPath === null) {
        throw new Error(DESTROYED_ERROR);
    }

    if (this._progressPath === undefined) {
        return 0;
    }

    return this._progressPath.value();
};

Shape.prototype.setText = function setText(newText) {
    if (this._progressPath === null) {
        throw new Error(DESTROYED_ERROR);
    }

    if (this.text === null) {
        // Create new text node
        this.text = this._createTextContainer(this._opts, this._container);
        this._container.appendChild(this.text);
    }

    // Remove previous text and add new
    if (utils.isObject(newText)) {
        utils.removeChildren(this.text);
        this.text.appendChild(newText);
    } else {
        this.text.innerHTML = newText;
    }
};

Shape.prototype._createSvgView = function _createSvgView(opts) {
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this._initializeSvg(svg, opts);

    var trailPath = null;
    // Each option listed in the if condition are 'triggers' for creating
    // the trail path
    if (opts.trailColor || opts.trailWidth) {
        trailPath = this._createTrail(opts);
        svg.appendChild(trailPath);
    }

    var path = this._createPath(opts);
    svg.appendChild(path);

    return {
        svg: svg,
        path: path,
        trail: trailPath
    };
};

Shape.prototype._initializeSvg = function _initializeSvg(svg, opts) {
    svg.setAttribute('viewBox', '0 0 100 100');
};

Shape.prototype._createPath = function _createPath(opts) {
    var pathString = this._pathString(opts);
    return this._createPathElement(pathString, opts);
};

Shape.prototype._createTrail = function _createTrail(opts) {
    // Create path string with original passed options
    var pathString = this._trailString(opts);

    // Prevent modifying original
    var newOpts = utils.extend({}, opts);

    // Defaults for parameters which modify trail path
    if (!newOpts.trailColor) {
        newOpts.trailColor = '#eee';
    }
    if (!newOpts.trailWidth) {
        newOpts.trailWidth = newOpts.strokeWidth;
    }

    newOpts.color = newOpts.trailColor;
    newOpts.strokeWidth = newOpts.trailWidth;

    // When trail path is set, fill must be set for it instead of the
    // actual path to prevent trail stroke from clipping
    newOpts.fill = null;

    return this._createPathElement(pathString, newOpts);
};

Shape.prototype._createPathElement = function _createPathElement(pathString, opts) {
    var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', pathString);
    path.setAttribute('stroke', opts.color);
    path.setAttribute('stroke-width', opts.strokeWidth);

    if (opts.fill) {
        path.setAttribute('fill', opts.fill);
    } else {
        path.setAttribute('fill-opacity', '0');
    }

    return path;
};

Shape.prototype._createTextContainer = function _createTextContainer(opts, container) {
    var textContainer = document.createElement('div');
    textContainer.className = opts.text.className;

    var textStyle = opts.text.style;
    if (textStyle) {
        if (opts.text.autoStyleContainer) {
            container.style.position = 'relative';
        }

        utils.setStyles(textContainer, textStyle);
        // Default text color to progress bar's color
        if (!textStyle.color) {
            textContainer.style.color = opts.color;
        }
    }

    this._initializeTextContainer(opts, container, textContainer);
    return textContainer;
};

// Give custom shapes possibility to modify text element
Shape.prototype._initializeTextContainer = function(opts, container, element) {
    // By default, no-op
    // Custom shapes should respect API options, such as text.style
};

Shape.prototype._pathString = function _pathString(opts) {
    throw new Error('Override this function for each progress bar');
};

Shape.prototype._trailString = function _trailString(opts) {
    throw new Error('Override this function for each progress bar');
};

Shape.prototype._warnContainerAspectRatio = function _warnContainerAspectRatio(container) {
    if (!this.containerAspectRatio) {
        return;
    }

    var computedStyle = window.getComputedStyle(container, null);
    var width = parseFloat(computedStyle.getPropertyValue('width'), 10);
    var height = parseFloat(computedStyle.getPropertyValue('height'), 10);
    if (!utils.floatEquals(this.containerAspectRatio, width / height)) {
        console.warn(
            'Incorrect aspect ratio of container',
            '#' + container.id,
            'detected:',
            computedStyle.getPropertyValue('width') + '(width)',
            '/',
            computedStyle.getPropertyValue('height') + '(height)',
            '=',
            width / height
        );

        console.warn(
            'Aspect ratio of should be',
            this.containerAspectRatio
        );
    }
};

module.exports = Shape;

},{"./path":5,"./utils":8}],8:[function(require,module,exports){
// Utility functions

var PREFIXES = 'Webkit Moz O ms'.split(' ');
var FLOAT_COMPARISON_EPSILON = 0.001;

// Copy all attributes from source object to destination object.
// destination object is mutated.
function extend(destination, source, recursive) {
    destination = destination || {};
    source = source || {};
    recursive = recursive || false;

    for (var attrName in source) {
        if (source.hasOwnProperty(attrName)) {
            var destVal = destination[attrName];
            var sourceVal = source[attrName];
            if (recursive && isObject(destVal) && isObject(sourceVal)) {
                destination[attrName] = extend(destVal, sourceVal, recursive);
            } else {
                destination[attrName] = sourceVal;
            }
        }
    }

    return destination;
}

// Renders templates with given variables. Variables must be surrounded with
// braces without any spaces, e.g. {variable}
// All instances of variable placeholders will be replaced with given content
// Example:
// render('Hello, {message}!', {message: 'world'})
function render(template, vars) {
    var rendered = template;

    for (var key in vars) {
        if (vars.hasOwnProperty(key)) {
            var val = vars[key];
            var regExpString = '\\{' + key + '\\}';
            var regExp = new RegExp(regExpString, 'g');

            rendered = rendered.replace(regExp, val);
        }
    }

    return rendered;
}

function setStyle(element, style, value) {
    var elStyle = element.style;  // cache for performance

    for (var i = 0; i < PREFIXES.length; ++i) {
        var prefix = PREFIXES[i];
        elStyle[prefix + capitalize(style)] = value;
    }

    elStyle[style] = value;
}

function setStyles(element, styles) {
    forEachObject(styles, function(styleValue, styleName) {
        // Allow disabling some individual styles by setting them
        // to null or undefined
        if (styleValue === null || styleValue === undefined) {
            return;
        }

        // If style's value is {prefix: true, value: '50%'},
        // Set also browser prefixed styles
        if (isObject(styleValue) && styleValue.prefix === true) {
            setStyle(element, styleName, styleValue.value);
        } else {
            element.style[styleName] = styleValue;
        }
    });
}

function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

function isString(obj) {
    return typeof obj === 'string' || obj instanceof String;
}

function isFunction(obj) {
    return typeof obj === 'function';
}

function isArray(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
}

// Returns true if `obj` is object as in {a: 1, b: 2}, not if it's function or
// array
function isObject(obj) {
    if (isArray(obj)) {
        return false;
    }

    var type = typeof obj;
    return type === 'object' && !!obj;
}

function forEachObject(object, callback) {
    for (var key in object) {
        if (object.hasOwnProperty(key)) {
            var val = object[key];
            callback(val, key);
        }
    }
}

function floatEquals(a, b) {
    return Math.abs(a - b) < FLOAT_COMPARISON_EPSILON;
}

// https://coderwall.com/p/nygghw/don-t-use-innerhtml-to-empty-dom-elements
function removeChildren(el) {
    while (el.firstChild) {
        el.removeChild(el.firstChild);
    }
}

module.exports = {
    extend: extend,
    render: render,
    setStyle: setStyle,
    setStyles: setStyles,
    capitalize: capitalize,
    isString: isString,
    isFunction: isFunction,
    isObject: isObject,
    forEachObject: forEachObject,
    floatEquals: floatEquals,
    removeChildren: removeChildren
};

},{}]},{},[4])(4)
});
!function(t,e){"function"==typeof define&&define.amd?define(e):"object"==typeof exports?module.exports=e(require,exports,module):t.ScrollReveal=e()}(this,function(t,e,n){return function(){var t,e,n;this.ScrollReveal=function(){function i(n){return window==this?new i(n):(e=this,e.tools=new t,e.tools.extend(e.defaults,n||{}),e.tools.isMobile()&&!e.defaults.mobile?!1:e.tools.isSupported("transform")&&e.tools.isSupported("transition")?(e.store={elements:{},containers:[]},e.history=[],e.counter=0,e.running=!1,e.initialized=!1,e):console.warn("ScrollReveal is not supported in this browser."))}return i.prototype.defaults={origin:"bottom",distance:"20px",duration:500,delay:0,rotate:{x:0,y:0,z:0},opacity:0,scale:.9,easing:"cubic-bezier( 0.6, 0.2, 0.1, 1 )",container:null,mobile:!0,reset:!1,useDelay:"always",viewFactor:.2,viewOffset:{top:0,right:0,bottom:0,left:0},afterReveal:function(t){},afterReset:function(t){}},i.prototype.reveal=function(t,n,i){var o,r,s,a;if(r=n&&n.container?n.container:e.defaults.container?e.defaults.container:window.document.documentElement,o=Array.prototype.slice.call(r.querySelectorAll(t)),!o.length)return console.warn("reveal('"+t+"') failed: no elements found."),e;for(var l=0;l<o.length;l++)s={},a=o[l].getAttribute("data-sr-id"),a?s=e.store.elements[a]:(s={id:++e.counter,domEl:o[l],seen:!1,revealed:!1},s.domEl.setAttribute("data-sr-id",s.id)),e.configure(s,n||{}),e.style(s),e.updateStore(s),s.revealed||s.domEl.setAttribute("style",s.styles.inline+s.styles.transform.initial);return i||(e.record(t,n),e.initTimeout&&window.clearTimeout(e.initTimeout),e.initTimeout=window.setTimeout(e.init,0)),e},i.prototype.configure=function(t,n){t.config?t.config=e.tools.extendClone(t.config,n):t.config=e.tools.extendClone(e.defaults,n),"top"===t.config.origin||"bottom"===t.config.origin?t.config.axis="Y":t.config.axis="X",("top"===t.config.origin||"left"===t.config.origin)&&(t.config.distance="-"+t.config.distance)},i.prototype.style=function(t){function e(e){parseInt(n.distance)&&(e.initial+=" translate"+n.axis+"("+n.distance+")",e.target+=" translate"+n.axis+"(0)"),n.scale&&(e.initial+=" scale("+n.scale+")",e.target+=" scale(1)"),n.rotate.x&&(e.initial+=" rotateX("+n.rotate.x+"deg)",e.target+=" rotateX(0)"),n.rotate.y&&(e.initial+=" rotateY("+n.rotate.y+"deg)",e.target+=" rotateY(0)"),n.rotate.z&&(e.initial+=" rotateZ("+n.rotate.z+"deg)",e.target+=" rotateZ(0)"),e.initial+="; opacity: "+n.opacity+";",e.target+="; opacity: "+t.styles.computed.opacity+";"}var n=t.config,i=window.getComputedStyle(t.domEl);t.styles||(t.styles={transition:{},transform:{},computed:{}},t.styles.inline=t.domEl.getAttribute("style")||"",t.styles.inline+="; visibility: visible; ",t.styles.computed.opacity=i.opacity,i.transition&&"all 0s ease 0s"!=i.transition?t.styles.computed.transition=i.transition+", ":t.styles.computed.transition=""),t.styles.transition.instant="-webkit-transition: "+t.styles.computed.transition+"-webkit-transform "+n.duration/1e3+"s "+n.easing+" 0s, opacity "+n.duration/1e3+"s "+n.easing+" 0s; transition: "+t.styles.computed.transition+"transform "+n.duration/1e3+"s "+n.easing+" 0s, opacity "+n.duration/1e3+"s "+n.easing+" 0s; ",t.styles.transition.delayed="-webkit-transition: "+t.styles.computed.transition+"-webkit-transform "+n.duration/1e3+"s "+n.easing+" "+n.delay/1e3+"s, opacity "+n.duration/1e3+"s "+n.easing+" "+n.delay/1e3+"s; transition: "+t.styles.computed.transition+"transform "+n.duration/1e3+"s "+n.easing+" "+n.delay/1e3+"s, opacity "+n.duration/1e3+"s "+n.easing+" "+n.delay/1e3+"s; ",t.styles.transform.initial=" -webkit-transform:",t.styles.transform.target=" -webkit-transform:",e(t.styles.transform),t.styles.transform.initial+="transform:",t.styles.transform.target+="transform:",e(t.styles.transform)},i.prototype.updateStore=function(t){var n=t.config.container;n&&-1==e.store.containers.indexOf(n)&&e.store.containers.push(t.config.container),e.store.elements[t.id]=t},i.prototype.record=function(t,n){var i={selector:t,config:n};e.history.push(i)},i.prototype.init=function(){e.animate();for(var t=0;t<e.store.containers.length;t++)e.store.containers[t].addEventListener("scroll",e.handler),e.store.containers[t].addEventListener("resize",e.handler);return e.initialized||(window.addEventListener("scroll",e.handler),window.addEventListener("resize",e.handler),e.initialized=!0),e},i.prototype.handler=function(){e.running||n(function(){e.running=!0,e.animate()})},i.prototype.animate=function(){function t(t,e){var n=0,i=0,o="after";switch(t){case"reveal":i=e.config.duration+e.config.delay,o+="Reveal";break;case"reset":i=e.config.duration,o+="Reset"}return e.timer&&(n=Math.abs(e.timer.started-new Date),window.clearTimeout(e.timer.clock)),e.timer={started:new Date},e.timer.clock=window.setTimeout(function(){e.config[o](e.domEl),e.timer=null},i-n),"reveal"===t?e.revealed=!0:e.revealed=!1}var n,i;e.tools.forOwn(e.store.elements,function(o){n=e.store.elements[o],i=e.isElemVisible(n),i&&!n.revealed?("always"===n.config.useDelay||"onload"===n.config.useDelay&&!e.initialized||"once"===n.config.useDelay&&!n.seen?n.domEl.setAttribute("style",n.styles.inline+n.styles.transform.target+n.styles.transition.delayed):n.domEl.setAttribute("style",n.styles.inline+n.styles.transform.target+n.styles.transition.instant),n.seen=!0,t("reveal",n)):!i&&n.config.reset&&n.revealed&&(n.domEl.setAttribute("style",n.styles.inline+n.styles.transform.initial+n.styles.transition.instant),t("reset",n))}),e.running=!1},i.prototype.getContainer=function(t){t||(t=window.document.documentElement);var e=t.clientWidth,n=t.clientHeight;return{width:e,height:n}},i.prototype.getScrolled=function(t){if(t){var n=e.getOffset(t);return{x:t.scrollLeft+n.left,y:t.scrollTop+n.top}}return{x:window.pageXOffset,y:window.pageYOffset}},i.prototype.getOffset=function(t){var e=0,n=0,i=t.offsetHeight,o=t.offsetWidth;do isNaN(t.offsetTop)||(e+=t.offsetTop),isNaN(t.offsetLeft)||(n+=t.offsetLeft);while(t=t.offsetParent);return{top:e,left:n,height:i,width:o}},i.prototype.isElemVisible=function(t){function n(){var e=f+l*a,n=d+c*a,i=u-l*a,o=y-c*a,p=s.y+t.config.viewOffset.top,g=s.x+t.config.viewOffset.left,m=s.y-t.config.viewOffset.bottom+r.height,w=s.x-t.config.viewOffset.right+r.width;return m>e&&i>p&&n>g&&w>o}function i(){return"fixed"===window.getComputedStyle(t.domEl).position}var o=e.getOffset(t.domEl),r=e.getContainer(t.config.container),s=e.getScrolled(t.config.container),a=t.config.viewFactor,l=o.height,c=o.width,f=o.top,d=o.left,u=f+l,y=d+c;return n()||i()},i.prototype.sync=function(){if(e.history.length){for(var t=0;t<e.history.length;t++){var n=e.history[t];e.reveal(n.selector,n.config,!0)}e.init()}else console.warn("sync() failed: no reveals found.");return e},i}();var t=function(){function t(){}return t.prototype.isObject=function(t){return null!==t&&"object"==typeof t&&t.constructor==Object},t.prototype.forOwn=function(t,e){if(!this.isObject(t))throw new TypeError("Expected 'object', but received '"+typeof t+"'.");for(var n in t)t.hasOwnProperty(n)&&e(n)},t.prototype.extend=function(t,e){return this.forOwn(e,function(n){this.isObject(e[n])?(t[n]&&this.isObject(t[n])||(t[n]={}),this.extend(t[n],e[n])):t[n]=e[n]}.bind(this)),t},t.prototype.extendClone=function(t,e){return this.extend(this.extend({},t),e)},t.prototype.isMobile=function(){return/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)},t.prototype.isSupported=function(t){for(var e=document.createElement("sensor"),n="Webkit,Moz,O,".split(","),i=(t+n.join(t+",")).split(","),o=0;o<i.length;o++)if(""===!e.style[i[o]])return!1;return!0},t}(),n=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame}.call(this),this.ScrollReveal});

/* =============================================================

  Smooth Scroll v4.4
  Animate scrolling to anchor links, by Chris Ferdinandi.
  http://gomakethings.com

  Additional contributors:
  https://github.com/cferdinandi/smooth-scroll#contributors

  Free to use under the MIT License.
  http://gomakethings.com/mit/

  p.s. This is a custom build for Fixed Nav, ask @adtileHQ for
  any changes made into this build

 * ============================================================= */

window.smoothScroll = (function (window, document, undefined) {

  'use strict';

  // Default settings
  // Private {object} variable
  var _defaults = {
    speed: 500,
    easing: 'easeInOutCubic',
    updateURL: false,
    callbackBefore: function () {},
    callbackAfter: function () {}
  };

  // Merge default settings with user options
  // Private method
  // Returns an {object}
  var _mergeObjects = function ( original, updates ) {
    for (var key in updates) {
      original[key] = updates[key];
    }
    return original;
  };

  // Calculate the easing pattern
  // Private method
  // Returns a decimal number
  var _easingPattern = function ( type, time ) {
    if ( type == 'easeInQuad' ) return time * time; // accelerating from zero velocity
    if ( type == 'easeOutQuad' ) return time * (2 - time); // decelerating to zero velocity
    if ( type == 'easeInOutQuad' ) return time < 0.5 ? 2 * time * time : -1 + (4 - 2 * time) * time; // acceleration until halfway, then deceleration
    if ( type == 'easeInCubic' ) return time * time * time; // accelerating from zero velocity
    if ( type == 'easeOutCubic' ) return (--time) * time * time + 1; // decelerating to zero velocity
    if ( type == 'easeInOutCubic' ) return time < 0.5 ? 4 * time * time * time : (time - 1) * (2 * time - 2) * (2 * time - 2) + 1; // acceleration until halfway, then deceleration
    if ( type == 'easeInQuart' ) return time * time * time * time; // accelerating from zero velocity
    if ( type == 'easeOutQuart' ) return 1 - (--time) * time * time * time; // decelerating to zero velocity
    if ( type == 'easeInOutQuart' ) return time < 0.5 ? 8 * time * time * time * time : 1 - 8 * (--time) * time * time * time; // acceleration until halfway, then deceleration
    if ( type == 'easeInQuint' ) return time * time * time * time * time; // accelerating from zero velocity
    if ( type == 'easeOutQuint' ) return 1 + (--time) * time * time * time * time; // decelerating to zero velocity
    if ( type == 'easeInOutQuint' ) return time < 0.5 ? 16 * time * time * time * time * time : 1 + 16 * (--time) * time * time * time * time; // acceleration until halfway, then deceleration
    return time; // no easing, no acceleration
  };

  // Calculate how far to scroll
  // Private method
  // Returns an integer
  var _getEndLocation = function ( anchor, headerHeight ) {
    var location = 0;
    if (anchor.offsetParent) {
      do {
        location += anchor.offsetTop;
        anchor = anchor.offsetParent;
      } while (anchor);
    }
    location = location - headerHeight;
    if ( location >= 0 ) {
      return location;
    } else {
      return 0;
    }
  };

  // Convert data-options attribute into an object of key/value pairs
  // Private method
  // Returns an {object}
  var _getDataOptions = function ( options ) {

    if ( options === null || options === undefined  ) {
      return {};
    } else {
      var settings = {}; // Create settings object
      options = options.split(';'); // Split into array of options

      // Create a key/value pair for each setting
      options.forEach( function(option) {
        option = option.trim();
        if ( option !== '' ) {
          option = option.split(':');
          settings[option[0]] = option[1].trim();
        }
      });

      return settings;
    }

  };

  // Update the URL
  // Private method
  // Runs functions
  var _updateURL = function ( anchor, url ) {
    if ( (url === true || url === 'true') && history.pushState ) {
      history.pushState( {pos:anchor.id}, '', anchor );
    }
  };

  // Start/stop the scrolling animation
  // Public method
  // Runs functions
  var animateScroll = function ( toggle, anchor, options, event ) {

    // Options and overrides
    options = _mergeObjects( _defaults, options || {} ); // Merge user options with defaults
    var overrides = _getDataOptions( toggle ? toggle.getAttribute('data-options') : null );
    var speed = overrides.speed || options.speed;
    var easing = overrides.easing || options.easing;
    var updateURL = overrides.updateURL || options.updateURL;

    // Selectors and variables
    var headerHeight = 55;
    var startLocation = window.pageYOffset; // Current location on the page
    var endLocation = _getEndLocation( document.querySelector(anchor), headerHeight ); // Scroll to location
    var animationInterval; // interval timer
    var distance = endLocation - startLocation; // distance to travel
    var timeLapsed = 0;
    var percentage, position;

    // Prevent default click event
    if ( toggle && toggle.tagName === 'A' && event ) {
      event.preventDefault();
    }

    // Update URL
    _updateURL(anchor, updateURL);

    // Stop the scroll animation when it reaches its target (or the bottom/top of page)
    // Private method
    // Runs functions
    var _stopAnimateScroll = function (position, endLocation, animationInterval) {
      var currentLocation = window.pageYOffset;
      if ( position == endLocation || currentLocation == endLocation || ( (window.innerHeight + currentLocation) >= document.body.scrollHeight ) ) {
        clearInterval(animationInterval);
        options.callbackAfter( toggle, anchor ); // Run callbacks after animation complete
      }
    };

    // Loop scrolling animation
    // Private method
    // Runs functions
    var _loopAnimateScroll = function () {
      timeLapsed += 16;
      percentage = ( timeLapsed / speed );
      percentage = ( percentage > 1 ) ? 1 : percentage;
      position = startLocation + ( distance * _easingPattern(easing, percentage) );
      window.scrollTo( 0, Math.floor(position) );
      _stopAnimateScroll(position, endLocation, animationInterval);
    };

    // Set interval timer
    // Private method
    // Runs functions
    var _startAnimateScroll = function () {
      options.callbackBefore( toggle, anchor ); // Run callbacks before animating scroll
      animationInterval = setInterval(_loopAnimateScroll, 16);
    };

    // Reset position to fix weird iOS bug
    // https://github.com/cferdinandi/smooth-scroll/issues/45
    if ( window.pageYOffset === 0 ) {
      window.scrollTo( 0, 0 );
    }

    // Start scrolling animation
    _startAnimateScroll();

  };

  // Initialize Smooth Scroll
  // Public method
  // Runs functions
  var init = function ( options ) {

    // Feature test before initializing
    if ( 'querySelector' in document && 'addEventListener' in window && Array.prototype.forEach ) {

      // Selectors and variables
      options = _mergeObjects( _defaults, options || {} ); // Merge user options with defaults
      var toggles = document.querySelectorAll('[data-scroll]'); // Get smooth scroll toggles

      // When a toggle is clicked, run the click handler
      Array.prototype.forEach.call(toggles, function (toggle, index) {
        toggle.addEventListener('click', animateScroll.bind( null, toggle, toggle.getAttribute('href'), options ), false);
      });

    }

  };

  // Return public methods
  return {
    init: init,
    animateScroll: animateScroll
  };

})(window, document);

/*! smooth-scroll v10.2.0 | (c) 2016 Chris Ferdinandi | MIT License | http://github.com/cferdinandi/smooth-scroll */
!(function(e,t){"function"==typeof define&&define.amd?define([],t(e)):"object"==typeof exports?module.exports=t(e):e.smoothScroll=t(e)})("undefined"!=typeof global?global:this.window||this.global,(function(e){"use strict";var t,n,o,r,a,c,l,i={},u="querySelector"in document&&"addEventListener"in e,s={selector:"[data-scroll]",selectorHeader:null,speed:500,easing:"easeInOutCubic",offset:0,callback:function(){}},f=function(){var e={},t=!1,n=0,o=arguments.length;"[object Boolean]"===Object.prototype.toString.call(arguments[0])&&(t=arguments[0],n++);for(var r=function(n){for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t&&"[object Object]"===Object.prototype.toString.call(n[o])?e[o]=f(!0,e[o],n[o]):e[o]=n[o])};n<o;n++){var a=arguments[n];r(a)}return e},d=function(e){return Math.max(e.scrollHeight,e.offsetHeight,e.clientHeight)},h=function(e,t){for(Element.prototype.matches||(Element.prototype.matches=Element.prototype.matchesSelector||Element.prototype.mozMatchesSelector||Element.prototype.msMatchesSelector||Element.prototype.oMatchesSelector||Element.prototype.webkitMatchesSelector||function(e){for(var t=(this.document||this.ownerDocument).querySelectorAll(e),n=t.length;--n>=0&&t.item(n)!==this;);return n>-1});e&&e!==document;e=e.parentNode)if(e.matches(t))return e;return null},m=function(e){"#"===e.charAt(0)&&(e=e.substr(1));for(var t,n=String(e),o=n.length,r=-1,a="",c=n.charCodeAt(0);++r<o;){if(t=n.charCodeAt(r),0===t)throw new InvalidCharacterError("Invalid character: the input contains U+0000.");a+=t>=1&&t<=31||127==t||0===r&&t>=48&&t<=57||1===r&&t>=48&&t<=57&&45===c?"\\"+t.toString(16)+" ":t>=128||45===t||95===t||t>=48&&t<=57||t>=65&&t<=90||t>=97&&t<=122?n.charAt(r):"\\"+n.charAt(r)}return"#"+a},p=function(e,t){var n;return"easeInQuad"===e&&(n=t*t),"easeOutQuad"===e&&(n=t*(2-t)),"easeInOutQuad"===e&&(n=t<.5?2*t*t:-1+(4-2*t)*t),"easeInCubic"===e&&(n=t*t*t),"easeOutCubic"===e&&(n=--t*t*t+1),"easeInOutCubic"===e&&(n=t<.5?4*t*t*t:(t-1)*(2*t-2)*(2*t-2)+1),"easeInQuart"===e&&(n=t*t*t*t),"easeOutQuart"===e&&(n=1- --t*t*t*t),"easeInOutQuart"===e&&(n=t<.5?8*t*t*t*t:1-8*--t*t*t*t),"easeInQuint"===e&&(n=t*t*t*t*t),"easeOutQuint"===e&&(n=1+--t*t*t*t*t),"easeInOutQuint"===e&&(n=t<.5?16*t*t*t*t*t:1+16*--t*t*t*t*t),n||t},g=function(e,t,n){var o=0;if(e.offsetParent)do o+=e.offsetTop,e=e.offsetParent;while(e);return o=Math.max(o-t-n,0),Math.min(o,v()-b())},b=function(){return Math.max(document.documentElement.clientHeight,e.innerHeight||0)},v=function(){return Math.max(document.body.scrollHeight,document.documentElement.scrollHeight,document.body.offsetHeight,document.documentElement.offsetHeight,document.body.clientHeight,document.documentElement.clientHeight)},y=function(e){return e&&"object"==typeof JSON&&"function"==typeof JSON.parse?JSON.parse(e):{}},O=function(e){return e?d(e)+e.offsetTop:0},S=function(t,n,o){o||(t.focus(),document.activeElement.id!==t.id&&(t.setAttribute("tabindex","-1"),t.focus(),t.style.outline="none"),e.scrollTo(0,n))};i.animateScroll=function(n,o,c){var i=y(o?o.getAttribute("data-options"):null),u=f(t||s,c||{},i),d="[object Number]"===Object.prototype.toString.call(n),h=d||!n.tagName?null:n;if(d||h){var m=e.pageYOffset;u.selectorHeader&&!r&&(r=document.querySelector(u.selectorHeader)),a||(a=O(r));var b,E,H=d?n:g(h,a,parseInt(u.offset,10)),I=H-m,A=v(),j=0,M=function(t,r,a){var c=e.pageYOffset;(t==r||c==r||e.innerHeight+c>=A)&&(clearInterval(a),S(n,r,d),u.callback(n,o))},w=function(){j+=16,b=j/parseInt(u.speed,10),b=b>1?1:b,E=m+I*p(u.easing,b),e.scrollTo(0,Math.floor(E)),M(E,H,l)},Q=function(){clearInterval(l),l=setInterval(w,16)};0===e.pageYOffset&&e.scrollTo(0,0),Q()}};var E=function(t){e.location.hash;n&&(n.id=n.getAttribute("data-scroll-id"),i.animateScroll(n,o),n=null,o=null)},H=function(r){if(0===r.button&&!r.metaKey&&!r.ctrlKey&&(o=h(r.target,t.selector),o&&"a"===o.tagName.toLowerCase()&&o.hostname===e.location.hostname&&o.pathname===e.location.pathname&&/#/.test(o.href))){var a=m(o.hash);if("#"===a){r.preventDefault(),n=document.body;var c=n.id?n.id:"smooth-scroll-top";return n.setAttribute("data-scroll-id",c),n.id="",void(e.location.hash.substring(1)===c?E():e.location.hash=c)}n=document.querySelector(a),n&&(n.setAttribute("data-scroll-id",n.id),n.id="",o.hash===e.location.hash&&(r.preventDefault(),E()))}},I=function(e){c||(c=setTimeout((function(){c=null,a=O(r)}),66))};return i.destroy=function(){t&&(document.removeEventListener("click",H,!1),e.removeEventListener("resize",I,!1),t=null,n=null,o=null,r=null,a=null,c=null,l=null)},i.init=function(n){u&&(i.destroy(),t=f(s,n||{}),r=t.selectorHeader?document.querySelector(t.selectorHeader):null,a=O(r),document.addEventListener("click",H,!1),e.addEventListener("hashchange",E,!1),r&&e.addEventListener("resize",I,!1))},i}));

(function(){var k,aa=this;function m(a,b){var c=a.split("."),d=aa;c[0]in d||!d.execScript||d.execScript("var "+c[0]);for(var e;c.length&&(e=c.shift());)c.length||void 0===b?d=d[e]?d[e]:d[e]={}:d[e]=b}function q(a,b){function c(){}c.prototype=b.prototype;a.xa=b.prototype;a.prototype=new c;a.prototype.constructor=a;a.Da=function(a,c,f){for(var g=Array(arguments.length-2),h=2;h<arguments.length;h++)g[h-2]=arguments[h];return b.prototype[c].apply(a,g)}};function r(a,b){null!=a&&this.append.apply(this,arguments)}k=r.prototype;k.f="";k.set=function(a){this.f=""+a};k.append=function(a,b,c){this.f+=a;if(null!=b)for(var d=1;d<arguments.length;d++)this.f+=arguments[d];return this};k.clear=function(){this.f=""};k.toString=function(){return this.f};function ba(a,b){a.sort(b||ca)}function ca(a,b){return a>b?1:a<b?-1:0};function da(a){var b=[],c=0,d;for(d in a)b[c++]=a[d];return b};function ea(a,b,c){this.ta=a;this.ma=b.name||null;this.n={};for(a=0;a<c.length;a++)b=c[a],this.n[b.j]=b}ea.prototype.getName=function(){return this.ma};function fa(a){a=da(a.n);ba(a,function(a,c){return a.j-c.j});return a};function ga(a,b,c){this.j=b;this.ma=c.name;this.da=!!c.pa;this.p=c.a;this.na=c.type;this.ia=!1;switch(this.p){case ha:case ia:case ja:case ka:case la:case ma:case na:this.ia=!0}this.w=c.defaultValue}var na=1,ma=2,ha=3,ia=4,ja=6,ka=16,la=18;ga.prototype.getName=function(){return this.ma};function t(){this.c={};this.n=this.e().n;this.g=this.la=null}k=t.prototype;k.e=function(){var a=this.constructor;return a.wa||(a.wa=u(a,a.Ea))};k.has=function(a){return null!=this.c[a.j]};k.get=function(a,b){return v(this,a.j,b)};k.set=function(a,b){w(this,a.j,b)};k.add=function(a,b){oa(this,a.j,b)};k.clear=function(a){pa(this,a.j)};
function qa(a,b){for(var c=fa(a.e()),d=0;d<c.length;d++){var e=c[d],f=e.j;if(null!=b.c[f]){a.g&&delete a.g[e.j];var g=11==e.p||10==e.p;if(e.da)for(var e=x(b,f)||[],h=0;h<e.length;h++)oa(a,f,g?e[h].clone():e[h]);else e=x(b,f),g?(g=x(a,f))?qa(g,e):w(a,f,e.clone()):w(a,f,e)}}}k.clone=function(){var a=new this.constructor;a!=this&&(a.c={},a.g&&(a.g={}),qa(a,this));return a};
function x(a,b){var c=a.c[b];if(null==c)return null;if(a.la){if(!(b in a.g)){var d=a.la,e=a.n[b];if(null!=c)if(e.da){for(var f=[],g=0;g<c.length;g++)f[g]=d.ca(e,c[g]);c=f}else c=d.ca(e,c);return a.g[b]=c}return a.g[b]}return c}function v(a,b,c){var d=x(a,b);return a.n[b].da?d[c||0]:d}
function y(a,b){var c;if(null!=a.c[b])c=v(a,b,void 0);else a:{c=a.n[b];if(void 0===c.w){var d=c.na;if(d===Boolean)c.w=!1;else if(d===Number)c.w=0;else if(d===String)c.w=c.ia?"0":"";else{c=new d;break a}}c=c.w}return c}function z(a,b){return a.n[b].da?null!=a.c[b]?a.c[b].length:0:null!=a.c[b]?1:0}function w(a,b,c){a.c[b]=c;a.g&&(a.g[b]=c)}function oa(a,b,c){a.c[b]||(a.c[b]=[]);a.c[b].push(c);a.g&&delete a.g[b]}function pa(a,b){delete a.c[b];a.g&&delete a.g[b]}
function u(a,b){var c=[],d=b[0],e;for(e in b)0!=e&&c.push(new ga(0,e,b[e]));return new ea(a,d,c)};/*

 Protocol Buffer 2 Copyright 2008 Google Inc.
 All other code copyright its respective owners.
 Copyright (C) 2010 The Libphonenumber Authors

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
function A(){t.call(this)}var B;q(A,t);function C(){t.call(this)}var D;q(C,t);function E(){t.call(this)}var F;q(E,t);E.prototype.ra=function(){return v(this,10)};E.prototype.l=function(){return y(this,10)};E.prototype.ba=function(a){w(this,10,a)};
A.prototype.e=function(){B||(B=u(A,{0:{name:"NumberFormat",ja:"i18n.phonenumbers.NumberFormat"},1:{name:"pattern",required:!0,a:9,type:String},2:{name:"format",required:!0,a:9,type:String},3:{name:"leading_digits_pattern",pa:!0,a:9,type:String},4:{name:"national_prefix_formatting_rule",a:9,type:String},6:{name:"national_prefix_optional_when_formatting",a:8,type:Boolean},5:{name:"domestic_carrier_code_formatting_rule",a:9,type:String}}));return B};A.ctor=A;A.ctor.e=A.prototype.e;
C.prototype.e=function(){D||(D=u(C,{0:{name:"PhoneNumberDesc",ja:"i18n.phonenumbers.PhoneNumberDesc"},2:{name:"national_number_pattern",a:9,type:String},3:{name:"possible_number_pattern",a:9,type:String},6:{name:"example_number",a:9,type:String},7:{name:"national_number_matcher_data",a:12,type:String},8:{name:"possible_number_matcher_data",a:12,type:String}}));return D};C.ctor=C;C.ctor.e=C.prototype.e;
E.prototype.e=function(){F||(F=u(E,{0:{name:"PhoneMetadata",ja:"i18n.phonenumbers.PhoneMetadata"},1:{name:"general_desc",a:11,type:C},2:{name:"fixed_line",a:11,type:C},3:{name:"mobile",a:11,type:C},4:{name:"toll_free",a:11,type:C},5:{name:"premium_rate",a:11,type:C},6:{name:"shared_cost",a:11,type:C},7:{name:"personal_number",a:11,type:C},8:{name:"voip",a:11,type:C},21:{name:"pager",a:11,type:C},25:{name:"uan",a:11,type:C},27:{name:"emergency",a:11,type:C},28:{name:"voicemail",a:11,type:C},24:{name:"no_international_dialling",
a:11,type:C},9:{name:"id",required:!0,a:9,type:String},10:{name:"country_code",a:5,type:Number},11:{name:"international_prefix",a:9,type:String},17:{name:"preferred_international_prefix",a:9,type:String},12:{name:"national_prefix",a:9,type:String},13:{name:"preferred_extn_prefix",a:9,type:String},15:{name:"national_prefix_for_parsing",a:9,type:String},16:{name:"national_prefix_transform_rule",a:9,type:String},18:{name:"same_mobile_and_fixed_line_pattern",a:8,defaultValue:!1,type:Boolean},19:{name:"number_format",
pa:!0,a:11,type:A},20:{name:"intl_number_format",pa:!0,a:11,type:A},22:{name:"main_country_for_code",a:8,defaultValue:!1,type:Boolean},23:{name:"leading_digits",a:9,type:String},26:{name:"leading_zero_possible",a:8,defaultValue:!1,type:Boolean}}));return F};E.ctor=E;E.ctor.e=E.prototype.e;/*

 Protocol Buffer 2 Copyright 2008 Google Inc.
 All other code copyright its respective owners.
 Copyright (C) 2010 The Libphonenumber Authors

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
function G(){t.call(this)}var H;q(G,t);G.prototype.ra=function(){return v(this,1)};G.prototype.l=function(){return y(this,1)};G.prototype.ba=function(a){w(this,1,a)};G.prototype.getExtension=function(){return v(this,3)};var ra={Ca:1,Ba:5,Aa:10,za:20};
G.prototype.e=function(){H||(H=u(G,{0:{name:"PhoneNumber",ja:"i18n.phonenumbers.PhoneNumber"},1:{name:"country_code",required:!0,a:5,type:Number},2:{name:"national_number",required:!0,a:4,type:Number},3:{name:"extension",a:9,type:String},4:{name:"italian_leading_zero",a:8,type:Boolean},8:{name:"number_of_leading_zeros",a:5,defaultValue:1,type:Number},5:{name:"raw_input",a:9,type:String},6:{name:"country_code_source",a:14,defaultValue:1,type:ra},7:{name:"preferred_domestic_carrier_code",a:9,type:String}}));
return H};G.ctor=G;G.ctor.e=G.prototype.e;function I(){}I.prototype.$=function(a){new a.ta;throw Error("Unimplemented");};I.prototype.ca=function(a,b){if(11==a.p||10==a.p)return b instanceof t?b:this.$(a.na.e(),b);if(14==a.p||!a.ia)return b;var c=a.na;if(c===String){if("number"==typeof b)return String(b)}else if(c===Number&&"string"==typeof b&&("Infinity"===b||"-Infinity"===b||"NaN"===b||/^-?[0-9]+$/.test(b)))return Number(b);return b};function J(){}q(J,I);J.prototype.$=function(a,b){var c=new a.ta;c.la=this;c.c=b;c.g={};return c};function K(){}q(K,J);K.prototype.ya=!1;K.prototype.ca=function(a,b){return 8==a.p?!!b:I.prototype.ca.apply(this,arguments)};K.prototype.$=function(a,b){var c=b;if(this.ya){var c=[],d;for(d in b)c[parseInt(d,10)+1]=b[d]}return K.xa.$.call(this,a,c)};/*

 Copyright (C) 2010 The Libphonenumber Authors

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
var L={1:"US AG AI AS BB BM BS CA DM DO GD GU JM KN KY LC MP MS PR SX TC TT VC VG VI".split(" "),7:["RU","KZ"],20:["EG"],27:["ZA"],30:["GR"],31:["NL"],32:["BE"],33:["FR"],34:["ES"],36:["HU"],39:["IT","VA"],40:["RO"],41:["CH"],43:["AT"],44:["GB","GG","IM","JE"],45:["DK"],46:["SE"],47:["NO","SJ"],48:["PL"],49:["DE"],51:["PE"],52:["MX"],53:["CU"],54:["AR"],55:["BR"],56:["CL"],57:["CO"],58:["VE"],60:["MY"],61:["AU","CC","CX"],62:["ID"],63:["PH"],64:["NZ"],65:["SG"],66:["TH"],81:["JP"],82:["KR"],84:["VN"],
86:["CN"],90:["TR"],91:["IN"],92:["PK"],93:["AF"],94:["LK"],95:["MM"],98:["IR"],211:["SS"],212:["MA","EH"],213:["DZ"],216:["TN"],218:["LY"],220:["GM"],221:["SN"],222:["MR"],223:["ML"],224:["GN"],225:["CI"],226:["BF"],227:["NE"],228:["TG"],229:["BJ"],230:["MU"],231:["LR"],232:["SL"],233:["GH"],234:["NG"],235:["TD"],236:["CF"],237:["CM"],238:["CV"],239:["ST"],240:["GQ"],241:["GA"],242:["CG"],243:["CD"],244:["AO"],245:["GW"],246:["IO"],247:["AC"],248:["SC"],249:["SD"],250:["RW"],251:["ET"],252:["SO"],
253:["DJ"],254:["KE"],255:["TZ"],256:["UG"],257:["BI"],258:["MZ"],260:["ZM"],261:["MG"],262:["RE","YT"],263:["ZW"],264:["NA"],265:["MW"],266:["LS"],267:["BW"],268:["SZ"],269:["KM"],290:["SH","TA"],291:["ER"],297:["AW"],298:["FO"],299:["GL"],350:["GI"],351:["PT"],352:["LU"],353:["IE"],354:["IS"],355:["AL"],356:["MT"],357:["CY"],358:["FI","AX"],359:["BG"],370:["LT"],371:["LV"],372:["EE"],373:["MD"],374:["AM"],375:["BY"],376:["AD"],377:["MC"],378:["SM"],380:["UA"],381:["RS"],382:["ME"],385:["HR"],386:["SI"],
387:["BA"],389:["MK"],420:["CZ"],421:["SK"],423:["LI"],500:["FK"],501:["BZ"],502:["GT"],503:["SV"],504:["HN"],505:["NI"],506:["CR"],507:["PA"],508:["PM"],509:["HT"],590:["GP","BL","MF"],591:["BO"],592:["GY"],593:["EC"],594:["GF"],595:["PY"],596:["MQ"],597:["SR"],598:["UY"],599:["CW","BQ"],670:["TL"],672:["NF"],673:["BN"],674:["NR"],675:["PG"],676:["TO"],677:["SB"],678:["VU"],679:["FJ"],680:["PW"],681:["WF"],682:["CK"],683:["NU"],685:["WS"],686:["KI"],687:["NC"],688:["TV"],689:["PF"],690:["TK"],691:["FM"],
692:["MH"],800:["001"],808:["001"],850:["KP"],852:["HK"],853:["MO"],855:["KH"],856:["LA"],870:["001"],878:["001"],880:["BD"],881:["001"],882:["001"],883:["001"],886:["TW"],888:["001"],960:["MV"],961:["LB"],962:["JO"],963:["SY"],964:["IQ"],965:["KW"],966:["SA"],967:["YE"],968:["OM"],970:["PS"],971:["AE"],972:["IL"],973:["BH"],974:["QA"],975:["BT"],976:["MN"],977:["NP"],979:["001"],992:["TJ"],993:["TM"],994:["AZ"],995:["GE"],996:["KG"],998:["UZ"]},sa={AC:[,[,,"[46]\\d{4}|[01589]\\d{5}","\\d{5,6}"],
[,,"6[2-467]\\d{3}","\\d{5}",,,"62889"],[,,"4\\d{4}","\\d{5}",,,"40123"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],"AC",247,"00",,,,,,,,,,[,,"NA","NA"],,,[,,"NA","NA"],[,,"[01589]\\d{5}","\\d{6}",,,"542011"],,,[,,"NA","NA"]],AD:[,[,,"(?:[346-9]|180)\\d{5}","\\d{6,8}"],[,,"[78]\\d{5}","\\d{6}",,,"712345"],[,,"[346]\\d{5}","\\d{6}",,,"312345"],[,,"180[02]\\d{4}","\\d{8}",,,"18001234"],[,,"9\\d{5}","\\d{6}",,,"912345"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],"AD",376,"00",
,,,,,,,[[,"(\\d{3})(\\d{3})","$1 $2",["[346-9]"]],[,"(180[02])(\\d{4})","$1 $2",["1"]]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],AE:[,[,,"[2-79]\\d{7,8}|800\\d{2,9}","\\d{5,12}"],[,,"[2-4679][2-8]\\d{6}","\\d{7,8}",,,"22345678"],[,,"5[0256]\\d{7}","\\d{9}",,,"501234567"],[,,"400\\d{6}|800\\d{2,9}","\\d{5,12}",,,"800123456"],[,,"900[02]\\d{5}","\\d{9}",,,"900234567"],[,,"700[05]\\d{5}","\\d{9}",,,"700012345"],[,,"NA","NA"],[,,"NA","NA"],"AE",971,"00","0",,,"0",,,,[[,"([2-4679])(\\d{3})(\\d{4})",
"$1 $2 $3",["[2-4679][2-8]"],"0$1"],[,"(5[0256])(\\d{3})(\\d{4})","$1 $2 $3",["5"],"0$1"],[,"([479]00)(\\d)(\\d{5})","$1 $2 $3",["[479]0"],"$1"],[,"([68]00)(\\d{2,9})","$1 $2",["60|8"],"$1"]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"600[25]\\d{5}","\\d{9}",,,"600212345"],,,[,,"NA","NA"]],AF:[,[,,"[2-7]\\d{8}","\\d{7,9}"],[,,"(?:[25][0-8]|[34][0-4]|6[0-5])[2-9]\\d{6}","\\d{7,9}",,,"234567890"],[,,"7(?:[014-9]\\d{7}|2[89]\\d{6})","\\d{9}",,,"701234567"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],
[,,"NA","NA"],"AF",93,"00","0",,,"0",,,,[[,"([2-7]\\d)(\\d{3})(\\d{4})","$1 $2 $3",["[2-7]"],"0$1"]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],AG:[,[,,"[2589]\\d{9}","\\d{7}(?:\\d{3})?"],[,,"268(?:4(?:6[0-38]|84)|56[0-2])\\d{4}","\\d{7}(?:\\d{3})?",,,"2684601234"],[,,"268(?:464|7(?:2[0-9]|64|7[0-689]|8[02-68]))\\d{4}","\\d{10}",,,"2684641234"],[,,"8(?:00|44|55|66|77|88)[2-9]\\d{6}","\\d{10}",,,"8002123456"],[,,"900[2-9]\\d{6}","\\d{10}",,,"9002123456"],[,,"NA","NA"],[,,"5(?:00|33|44|66|77)[2-9]\\d{6}",
"\\d{10}",,,"5002345678"],[,,"26848[01]\\d{4}","\\d{10}",,,"2684801234"],"AG",1,"011","1",,,"1",,,,,,[,,"26840[69]\\d{4}","\\d{10}",,,"2684061234"],,"268",[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],AI:[,[,,"[2589]\\d{9}","\\d{7}(?:\\d{3})?"],[,,"2644(?:6[12]|9[78])\\d{4}","\\d{7}(?:\\d{3})?",,,"2644612345"],[,,"264(?:235|476|5(?:3[6-9]|8[1-4])|7(?:29|72))\\d{4}","\\d{10}",,,"2642351234"],[,,"8(?:00|44|55|66|77|88)[2-9]\\d{6}","\\d{10}",,,"8002123456"],[,,"900[2-9]\\d{6}","\\d{10}",,,"9002123456"],
[,,"NA","NA"],[,,"5(?:00|33|44|66|77)[2-9]\\d{6}","\\d{10}",,,"5002345678"],[,,"NA","NA"],"AI",1,"011","1",,,"1",,,,,,[,,"NA","NA"],,"264",[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],AL:[,[,,"[2-57]\\d{7}|6\\d{8}|8\\d{5,7}|9\\d{5}","\\d{5,9}"],[,,"(?:2(?:[168][1-9]|[247]\\d|9[1-7])|3(?:1[1-3]|[2-6]\\d|[79][1-8]|8[1-9])|4\\d{2}|5(?:1[1-4]|[2-578]\\d|6[1-5]|9[1-7])|8(?:[19][1-5]|[2-6]\\d|[78][1-7]))\\d{5}","\\d{5,8}",,,"22345678"],[,,"6[6-9]\\d{7}","\\d{9}",,,"661234567"],[,,"800\\d{4}","\\d{7}",,
,"8001234"],[,,"900\\d{3}","\\d{6}",,,"900123"],[,,"808\\d{3}","\\d{6}",,,"808123"],[,,"700\\d{5}","\\d{8}",,,"70012345"],[,,"NA","NA"],"AL",355,"00","0",,,"0",,,,[[,"(4)(\\d{3})(\\d{4})","$1 $2 $3",["4[0-6]"],"0$1"],[,"(6[6-9])(\\d{3})(\\d{4})","$1 $2 $3",["6"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["[2358][2-5]|4[7-9]"],"0$1"],[,"(\\d{3})(\\d{3,5})","$1 $2",["[235][16-9]|8[016-9]|[79]"],"0$1"]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],AM:[,[,,"[1-9]\\d{7}","\\d{5,8}"],
[,,"(?:1[01]\\d|2(?:2[2-46]|3[1-8]|4[2-69]|5[2-7]|6[1-9]|8[1-7])|3[12]2|47\\d)\\d{5}","\\d{5,8}",,,"10123456"],[,,"(?:4[139]|55|77|9[1-9])\\d{6}","\\d{8}",,,"77123456"],[,,"800\\d{5}","\\d{8}",,,"80012345"],[,,"90[016]\\d{5}","\\d{8}",,,"90012345"],[,,"80[1-4]\\d{5}","\\d{8}",,,"80112345"],[,,"NA","NA"],[,,"60[2-6]\\d{5}","\\d{8}",,,"60271234"],"AM",374,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{6})","$1 $2",["1|47"],"(0$1)"],[,"(\\d{2})(\\d{6})","$1 $2",["4[139]|[5-7]|9[1-9]"],"0$1"],[,"(\\d{3})(\\d{5})",
"$1 $2",["[23]"],"(0$1)"],[,"(\\d{3})(\\d{2})(\\d{3})","$1 $2 $3",["8|90"],"0 $1"]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],AO:[,[,,"[29]\\d{8}","\\d{9}"],[,,"2\\d(?:[26-9]\\d|\\d[26-9])\\d{5}","\\d{9}",,,"222123456"],[,,"9[1-49]\\d{7}","\\d{9}",,,"923123456"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],"AO",244,"00",,,,,,,,[[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3"]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],AR:[,[,,"11\\d{8}|[2368]\\d{9}|9\\d{10}",
"\\d{6,11}"],[,,"11\\d{8}|(?:2(?:2(?:[013]\\d|2[13-79]|4[1-6]|5[2457]|6[124-8]|7[1-4]|8[13-6]|9[1267])|3(?:1[467]|2[03-6]|3[13-8]|[49][2-6]|5[2-8]|[067]\\d)|4(?:7[3-8]|9\\d)|6(?:[01346]\\d|2[24-6]|5[15-8])|80\\d|9(?:[0124789]\\d|3[1-6]|5[234]|6[2-46]))|3(?:3(?:2[79]|6\\d|8[2578])|4(?:[78]\\d|0[0124-9]|[1-35]\\d|4[24-7]|6[02-9]|9[123678])|5(?:[138]\\d|2[1245]|4[1-9]|6[2-4]|7[1-6])|6[24]\\d|7(?:[0469]\\d|1[1568]|2[013-9]|3[145]|5[14-8]|7[2-57]|8[0-24-9])|8(?:[013578]\\d|2[15-7]|4[13-6]|6[1-357-9]|9[124]))|670\\d)\\d{6}",
"\\d{6,10}",,,"1123456789"],[,,"675\\d{7}|9(?:11[2-9]\\d{7}|(?:2(?:2[013]|3[067]|49|6[01346]|80|9[147-9])|3(?:36|4[12358]|5[138]|6[24]|7[069]|8[013578]))[2-9]\\d{6}|\\d{4}[2-9]\\d{5})","\\d{6,11}",,,"91123456789"],[,,"800\\d{7}","\\d{10}",,,"8001234567"],[,,"60[04579]\\d{7}","\\d{10}",,,"6001234567"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],"AR",54,"00","0",,,"0?(?:(11|2(?:2(?:02?|[13]|2[13-79]|4[1-6]|5[2457]|6[124-8]|7[1-4]|8[13-6]|9[1267])|3(?:02?|1[467]|2[03-6]|3[13-8]|[49][2-6]|5[2-8]|[67])|4(?:7[3-578]|9)|6(?:[0136]|2[24-6]|4[6-8]?|5[15-8])|80|9(?:0[1-3]|[19]|2\\d|3[1-6]|4[02568]?|5[2-4]|6[2-46]|72?|8[23]?))|3(?:3(?:2[79]|6|8[2578])|4(?:0[0-24-9]|[12]|3[5-8]?|4[24-7]|5[4-68]?|6[02-9]|7[126]|8[2379]?|9[1-36-8])|5(?:1|2[1245]|3[237]?|4[1-46-9]|6[2-4]|7[1-6]|8[2-5]?)|6[24]|7(?:[069]|1[1568]|2[15]|3[145]|4[13]|5[14-8]|7[2-57]|8[126])|8(?:[01]|2[15-7]|3[2578]?|4[13-6]|5[4-8]?|6[1-357-9]|7[36-8]?|8[5-8]?|9[124])))?15)?",
"9$1",,,[[,"([68]\\d{2})(\\d{3})(\\d{4})","$1-$2-$3",["[68]"],"0$1"],[,"(\\d{2})(\\d{4})","$1-$2",["[2-9]"],"$1"],[,"(\\d{3})(\\d{4})","$1-$2",["[2-9]"],"$1"],[,"(\\d{4})(\\d{4})","$1-$2",["[2-9]"],"$1"],[,"(9)(11)(\\d{4})(\\d{4})","$2 15-$3-$4",["911"],"0$1"],[,"(9)(\\d{3})(\\d{3})(\\d{4})","$2 15-$3-$4",["9(?:2[234689]|3[3-8])","9(?:2(?:2[013]|3[067]|49|6[01346]|80|9[147-9])|3(?:36|4[1-358]|5[138]|6[24]|7[069]|8[013578]))","9(?:2(?:2(?:0[013-9]|[13])|3(?:0[013-9]|[67])|49|6(?:[0136]|4[0-59])|8|9(?:[19]|44|7[013-9]|8[14]))|3(?:36|4(?:[12]|3[456]|[58]4)|5(?:1|3[0-24-689]|8[46])|6|7[069]|8(?:[01]|34|[578][45])))",
"9(?:2(?:2(?:0[013-9]|[13])|3(?:0[013-9]|[67])|49|6(?:[0136]|4[0-59])|8|9(?:[19]|44|7[013-9]|8[14]))|3(?:36|4(?:[12]|3(?:4|5[014]|6[1239])|[58]4)|5(?:1|3[0-24-689]|8[46])|6|7[069]|8(?:[01]|34|[578][45])))"],"0$1"],[,"(9)(\\d{4})(\\d{2})(\\d{4})","$2 15-$3-$4",["9[23]"],"0$1"],[,"(11)(\\d{4})(\\d{4})","$1 $2-$3",["1"],"0$1",,1],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2-$3",["2(?:2[013]|3[067]|49|6[01346]|80|9[147-9])|3(?:36|4[1-358]|5[138]|6[24]|7[069]|8[013578])","2(?:2(?:0[013-9]|[13])|3(?:0[013-9]|[67])|49|6(?:[0136]|4[0-59])|8|9(?:[19]|44|7[013-9]|8[14]))|3(?:36|4(?:[12]|3[456]|[58]4)|5(?:1|3[0-24-689]|8[46])|6|7[069]|8(?:[01]|34|[578][45]))",
"2(?:2(?:0[013-9]|[13])|3(?:0[013-9]|[67])|49|6(?:[0136]|4[0-59])|8|9(?:[19]|44|7[013-9]|8[14]))|3(?:36|4(?:[12]|3(?:4|5[014]|6[1239])|[58]4)|5(?:1|3[0-24-689]|8[46])|6|7[069]|8(?:[01]|34|[578][45]))"],"0$1",,1],[,"(\\d{4})(\\d{2})(\\d{4})","$1 $2-$3",["[23]"],"0$1",,1],[,"(\\d{3})","$1",["1[012]|911"],"$1"]],[[,"([68]\\d{2})(\\d{3})(\\d{4})","$1-$2-$3",["[68]"],"0$1"],[,"(9)(11)(\\d{4})(\\d{4})","$1 $2 $3-$4",["911"]],[,"(9)(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3-$4",["9(?:2[234689]|3[3-8])","9(?:2(?:2[013]|3[067]|49|6[01346]|80|9[147-9])|3(?:36|4[1-358]|5[138]|6[24]|7[069]|8[013578]))",
"9(?:2(?:2(?:0[013-9]|[13])|3(?:0[013-9]|[67])|49|6(?:[0136]|4[0-59])|8|9(?:[19]|44|7[013-9]|8[14]))|3(?:36|4(?:[12]|3[456]|[58]4)|5(?:1|3[0-24-689]|8[46])|6|7[069]|8(?:[01]|34|[578][45])))","9(?:2(?:2(?:0[013-9]|[13])|3(?:0[013-9]|[67])|49|6(?:[0136]|4[0-59])|8|9(?:[19]|44|7[013-9]|8[14]))|3(?:36|4(?:[12]|3(?:4|5[014]|6[1239])|[58]4)|5(?:1|3[0-24-689]|8[46])|6|7[069]|8(?:[01]|34|[578][45])))"]],[,"(9)(\\d{4})(\\d{2})(\\d{4})","$1 $2 $3-$4",["9[23]"]],[,"(11)(\\d{4})(\\d{4})","$1 $2-$3",["1"],"0$1",
,1],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2-$3",["2(?:2[013]|3[067]|49|6[01346]|80|9[147-9])|3(?:36|4[1-358]|5[138]|6[24]|7[069]|8[013578])","2(?:2(?:0[013-9]|[13])|3(?:0[013-9]|[67])|49|6(?:[0136]|4[0-59])|8|9(?:[19]|44|7[013-9]|8[14]))|3(?:36|4(?:[12]|3[456]|[58]4)|5(?:1|3[0-24-689]|8[46])|6|7[069]|8(?:[01]|34|[578][45]))","2(?:2(?:0[013-9]|[13])|3(?:0[013-9]|[67])|49|6(?:[0136]|4[0-59])|8|9(?:[19]|44|7[013-9]|8[14]))|3(?:36|4(?:[12]|3(?:4|5[014]|6[1239])|[58]4)|5(?:1|3[0-24-689]|8[46])|6|7[069]|8(?:[01]|34|[578][45]))"],
"0$1",,1],[,"(\\d{4})(\\d{2})(\\d{4})","$1 $2-$3",["[23]"],"0$1",,1]],[,,"NA","NA"],,,[,,"810\\d{7}","\\d{10}",,,"8101234567"],[,,"810\\d{7}","\\d{10}",,,"8101234567"],,,[,,"NA","NA"]],AS:[,[,,"[5689]\\d{9}","\\d{7}(?:\\d{3})?"],[,,"6846(?:22|33|44|55|77|88|9[19])\\d{4}","\\d{7}(?:\\d{3})?",,,"6846221234"],[,,"684(?:2(?:5[2468]|72)|7(?:3[13]|70))\\d{4}","\\d{10}",,,"6847331234"],[,,"8(?:00|44|55|66|77|88)[2-9]\\d{6}","\\d{10}",,,"8002123456"],[,,"900[2-9]\\d{6}","\\d{10}",,,"9002123456"],[,,"NA",
"NA"],[,,"5(?:00|33|44|66|77)[2-9]\\d{6}","\\d{10}",,,"5002345678"],[,,"NA","NA"],"AS",1,"011","1",,,"1",,,,,,[,,"NA","NA"],,"684",[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],AT:[,[,,"[1-9]\\d{3,12}","\\d{3,13}"],[,,"1\\d{3,12}|(?:2(?:1[467]|2[13-8]|5[2357]|6[1-46-8]|7[1-8]|8[124-7]|9[1458])|3(?:1[1-8]|3[23568]|4[5-7]|5[1378]|6[1-38]|8[3-68])|4(?:2[1-8]|35|63|7[1368]|8[2457])|5(?:12|2[1-8]|3[357]|4[147]|5[12578]|6[37])|6(?:13|2[1-47]|4[1-35-8]|5[468]|62)|7(?:2[1-8]|3[25]|4[13478]|5[68]|6[16-8]|7[1-6]|9[45]))\\d{3,10}",
"\\d{3,13}",,,"1234567890"],[,,"6(?:5[0-3579]|6[013-9]|[7-9]\\d)\\d{4,10}","\\d{7,13}",,,"664123456"],[,,"800\\d{6,10}","\\d{9,13}",,,"800123456"],[,,"(?:9(?:0[01]|3[019]))\\d{6,10}","\\d{9,13}",,,"900123456"],[,,"8(?:10\\d|2(?:[01]\\d|8\\d?))\\d{5,9}","\\d{8,13}",,,"810123456"],[,,"NA","NA"],[,,"780\\d{6,10}","\\d{9,13}",,,"780123456"],"AT",43,"00","0",,,"0",,,,[[,"(116\\d{3})","$1",["116"],"$1"],[,"(1)(\\d{3,12})","$1 $2",["1"],"0$1"],[,"(5\\d)(\\d{3,5})","$1 $2",["5[079]"],"0$1"],[,"(5\\d)(\\d{3})(\\d{3,4})",
"$1 $2 $3",["5[079]"],"0$1"],[,"(5\\d)(\\d{4})(\\d{4,7})","$1 $2 $3",["5[079]"],"0$1"],[,"(\\d{3})(\\d{3,10})","$1 $2",["316|46|51|732|6(?:5[0-3579]|[6-9])|7(?:[28]0)|[89]"],"0$1"],[,"(\\d{4})(\\d{3,9})","$1 $2",["2|3(?:1[1-578]|[3-8])|4[2378]|5[2-6]|6(?:[12]|4[1-9]|5[468])|7(?:2[1-8]|35|4[1-8]|[5-79])"],"0$1"]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"5(?:(?:0[1-9]|17)\\d{2,10}|[79]\\d{3,11})|720\\d{6,10}","\\d{5,13}",,,"50123"],,,[,,"NA","NA"]],AU:[,[,,"[1-578]\\d{5,9}","\\d{6,10}"],[,,"[237]\\d{8}|8(?:[68]\\d{3}|7[0-69]\\d{2}|9(?:[02-9]\\d{2}|1(?:[0-57-9]\\d|6[0135-9])))\\d{4}",
"\\d{8,9}",,,"212345678"],[,,"14(?:5\\d|71)\\d{5}|4(?:[0-2]\\d|3[0-57-9]|4[47-9]|5[0-25-9]|6[6-9]|7[02-9]|8[147-9]|9[017-9])\\d{6}","\\d{9}",,,"412345678"],[,,"180(?:0\\d{3}|2)\\d{3}","\\d{7,10}",,,"1800123456"],[,,"190[0126]\\d{6}","\\d{10}",,,"1900123456"],[,,"13(?:00\\d{2})?\\d{4}","\\d{6,10}",,,"1300123456"],[,,"500\\d{6}","\\d{9}",,,"500123456"],[,,"550\\d{6}","\\d{9}",,,"550123456"],"AU",61,"(?:14(?:1[14]|34|4[17]|[56]6|7[47]|88))?001[14-689]","0",,,"0",,"0011",,[[,"([2378])(\\d{4})(\\d{4})",
"$1 $2 $3",["[2378]"],"(0$1)"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[45]|14"],"0$1"],[,"(16)(\\d{3})(\\d{2,4})","$1 $2 $3",["16"],"0$1"],[,"(1[389]\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["1(?:[38]0|90)","1(?:[38]00|90)"],"$1"],[,"(180)(2\\d{3})","$1 $2",["180","1802"],"$1"],[,"(19\\d)(\\d{3})","$1 $2",["19[13]"],"$1"],[,"(19\\d{2})(\\d{4})","$1 $2",["19[67]"],"$1"],[,"(13)(\\d{2})(\\d{2})","$1 $2 $3",["13[1-9]"],"$1"]],,[,,"16\\d{3,7}","\\d{5,9}",,,"1612345"],1,,[,,"1(?:3(?:\\d{4}|00\\d{6})|80(?:0\\d{6}|2\\d{3}))",
"\\d{6,10}",,,"1300123456"],[,,"NA","NA"],,,[,,"NA","NA"]],AW:[,[,,"[25-9]\\d{6}","\\d{7}"],[,,"5(?:2\\d|8[1-9])\\d{4}","\\d{7}",,,"5212345"],[,,"(?:5(?:6\\d|9[2-478])|6(?:[039]0|22|4[01]|6[0-2])|7[34]\\d|9(?:6[45]|9[4-8]))\\d{4}","\\d{7}",,,"5601234"],[,,"800\\d{4}","\\d{7}",,,"8001234"],[,,"900\\d{4}","\\d{7}",,,"9001234"],[,,"NA","NA"],[,,"NA","NA"],[,,"28\\d{5}|501\\d{4}","\\d{7}",,,"5011234"],"AW",297,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2"]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,
[,,"NA","NA"]],AX:[,[,,"[135]\\d{5,9}|[27]\\d{4,9}|4\\d{5,10}|6\\d{7,8}|8\\d{6,9}","\\d{5,12}"],[,,"18[1-8]\\d{3,9}","\\d{6,12}",,,"1812345678"],[,,"4\\d{5,10}|50\\d{4,8}","\\d{6,11}",,,"412345678"],[,,"800\\d{4,7}","\\d{7,10}",,,"8001234567"],[,,"[67]00\\d{5,6}","\\d{8,9}",,,"600123456"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],"AX",358,"00|99[049]","0",,,"0",,,,,,[,,"NA","NA"],,,[,,"[13]00\\d{3,7}|2(?:0(?:0\\d{3,7}|2[023]\\d{1,6}|9[89]\\d{1,6}))|60(?:[12]\\d{5,6}|6\\d{7})|7(?:1\\d{7}|3\\d{8}|5[03-9]\\d{2,7})",
"\\d{5,10}",,,"100123"],[,,"[13]0\\d{4,8}|2(?:0(?:[016-8]\\d{3,7}|[2-59]\\d{2,7})|9\\d{4,8})|60(?:[12]\\d{5,6}|6\\d{7})|7(?:1\\d{7}|3\\d{8}|5[03-9]\\d{2,7})","\\d{5,10}",,,"10112345"],,,[,,"NA","NA"]],AZ:[,[,,"[1-9]\\d{8}","\\d{7,9}"],[,,"(?:1[28]\\d|2(?:02|1[24]|2[2-4]|33|[45]2|6[23])|365)\\d{6}","\\d{7,9}",,,"123123456"],[,,"(?:4[04]|5[015]|60|7[07])\\d{7}","\\d{9}",,,"401234567"],[,,"88\\d{7}","\\d{9}",,,"881234567"],[,,"900200\\d{3}","\\d{9}",,,"900200123"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA",
"NA"],"AZ",994,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["(?:1[28]|2(?:[45]2|[0-36])|365)"],"(0$1)"],[,"(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[4-8]"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["9"],"0$1"]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],BA:[,[,,"[3-9]\\d{7,8}","\\d{6,9}"],[,,"(?:[35]\\d|49)\\d{6}","\\d{6,8}",,,"30123456"],[,,"6(?:03|44|71|[1-356])\\d{6}","\\d{8,9}",,,"61123456"],[,,"8[08]\\d{6}","\\d{8}",,,"80123456"],
[,,"9[0246]\\d{6}","\\d{8}",,,"90123456"],[,,"8[12]\\d{6}","\\d{8}",,,"82123456"],[,,"NA","NA"],[,,"NA","NA"],"BA",387,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2-$3",["[3-5]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["6[1-356]|[7-9]"],"0$1"],[,"(\\d{2})(\\d{2})(\\d{2})(\\d{3})","$1 $2 $3 $4",["6[047]"],"0$1"]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"70[23]\\d{5}","\\d{8}",,,"70223456"],,,[,,"NA","NA"]],BB:[,[,,"[2589]\\d{9}","\\d{7}(?:\\d{3})?"],[,,"246(?:2(?:2[78]|7[0-4])|4(?:1[024-6]|2\\d|3[2-9])|5(?:20|[34]\\d|54|7[1-3])|6(?:2\\d|38)|7(?:37|57)|9(?:1[89]|63))\\d{4}",
"\\d{7}(?:\\d{3})?",,,"2464123456"],[,,"246(?:2(?:[356]\\d|4[0-57-9]|8[0-79])|45\\d|8(?:[2-5]\\d|83))\\d{4}","\\d{10}",,,"2462501234"],[,,"8(?:00|44|55|66|77|88)[2-9]\\d{6}","\\d{10}",,,"8002123456"],[,,"900\\d{7}|246976\\d{4}","\\d{10}",,,"9002123456"],[,,"NA","NA"],[,,"5(?:00|33|44|66|77)[2-9]\\d{3}","\\d{10}",,,"5002345678"],[,,"24631\\d{5}","\\d{10}",,,"2463101234"],"BB",1,"011","1",,,"1",,,,,,[,,"NA","NA"],,"246",[,,"NA","NA"],[,,"246(?:292|41[7-9]|43[01])\\d{4}","\\d{10}",,,"2464301234"],,,
[,,"NA","NA"]],BD:[,[,,"[2-79]\\d{5,9}|1\\d{9}|8[0-7]\\d{4,8}","\\d{6,10}"],[,,"2(?:550\\d|7(?:1[0-267]|2[0-289]|3[0-29]|[46][01]|5[1-3]|7[017]|91)|8(?:0[125]|[139][1-6]|2[0157-9]|6[1-35]|7[1-5]|8[1-8]|90)|9(?:0[0-2]|1[0-4]|2[568]|3[3-6]|5[5-7]|6[0167]|7[15]|8[0146-8]))\\d{4}|3(?:12?[5-7]\\d{2}|0(?:2(?:[025-79]\\d|[348]\\d{1,2})|3(?:[2-4]\\d|[56]\\d?))|2(?:1\\d{2}|2(?:[12]\\d|[35]\\d{1,2}|4\\d?))|3(?:1\\d{2}|2(?:[2356]\\d|4\\d{1,2}))|4(?:1\\d{2}|2(?:2\\d{1,2}|[47]|5\\d{2}))|5(?:1\\d{2}|29)|[67]1\\d{2}|8(?:1\\d{2}|2(?:2\\d{2}|3|4\\d)))\\d{3}|4(?:0(?:2(?:[09]\\d|7)|33\\d{2})|1\\d{3}|2(?:1\\d{2}|2(?:[25]\\d?|[348]\\d|[67]\\d{1,2}))|3(?:1\\d{2}(?:\\d{2})?|2(?:[045]\\d|[236-9]\\d{1,2})|32\\d{2})|4(?:[18]\\d{2}|2(?:[2-46]\\d{2}|3)|5[25]\\d{2})|5(?:1\\d{2}|2(?:3\\d|5))|6(?:[18]\\d{2}|2(?:3(?:\\d{2})?|[46]\\d{1,2}|5\\d{2}|7\\d)|5(?:3\\d?|4\\d|[57]\\d{1,2}|6\\d{2}|8))|71\\d{2}|8(?:[18]\\d{2}|23\\d{2}|54\\d{2})|9(?:[18]\\d{2}|2[2-5]\\d{2}|53\\d{1,2}))\\d{3}|5(?:02[03489]\\d{2}|1\\d{2}|2(?:1\\d{2}|2(?:2(?:\\d{2})?|[457]\\d{2}))|3(?:1\\d{2}|2(?:[37](?:\\d{2})?|[569]\\d{2}))|4(?:1\\d{2}|2[46]\\d{2})|5(?:1\\d{2}|26\\d{1,2})|6(?:[18]\\d{2}|2|53\\d{2})|7(?:1|24)\\d{2}|8(?:1|26)\\d{2}|91\\d{2})\\d{3}|6(?:0(?:1\\d{2}|2(?:3\\d{2}|4\\d{1,2}))|2(?:2[2-5]\\d{2}|5(?:[3-5]\\d{2}|7)|8\\d{2})|3(?:1|2[3478])\\d{2}|4(?:1|2[34])\\d{2}|5(?:1|2[47])\\d{2}|6(?:[18]\\d{2}|6(?:2(?:2\\d|[34]\\d{2})|5(?:[24]\\d{2}|3\\d|5\\d{1,2})))|72[2-5]\\d{2}|8(?:1\\d{2}|2[2-5]\\d{2})|9(?:1\\d{2}|2[2-6]\\d{2}))\\d{3}|7(?:(?:02|[3-589]1|6[12]|72[24])\\d{2}|21\\d{3}|32)\\d{3}|8(?:(?:4[12]|[5-7]2|1\\d?)|(?:0|3[12]|[5-7]1|217)\\d)\\d{4}|9(?:[35]1|(?:[024]2|81)\\d|(?:1|[24]1)\\d{2})\\d{3}",
"\\d{6,9}",,,"27111234"],[,,"(?:1[13-9]\\d|(?:3[78]|44)[02-9]|6(?:44|6[02-9]))\\d{7}","\\d{10}",,,"1812345678"],[,,"80[03]\\d{7}","\\d{10}",,,"8001234567"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"96(?:0[49]|1[0-4]|6[69])\\d{6}","\\d{10}",,,"9604123456"],"BD",880,"00[12]?","0",,,"0",,"00",,[[,"(2)(\\d{7,8})","$1-$2",["2"],"0$1"],[,"(\\d{2})(\\d{4,6})","$1-$2",["[3-79]1"],"0$1"],[,"(\\d{4})(\\d{3,6})","$1-$2",["1|3(?:0|[2-58]2)|4(?:0|[25]2|3[23]|[4689][25])|5(?:[02-578]2|6[25])|6(?:[0347-9]2|[26][25])|7[02-9]2|8(?:[023][23]|[4-7]2)|9(?:[02][23]|[458]2|6[016])"],
"0$1"],[,"(\\d{3})(\\d{3,7})","$1-$2",["[3-79][2-9]|8"],"0$1"]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],BE:[,[,,"[1-9]\\d{7,8}","\\d{8,9}"],[,,"(?:1[0-69]|[23][2-8]|4[23]|5\\d|6[013-57-9]|71|8[1-79]|9[2-4])\\d{6}|80[2-8]\\d{5}","\\d{8}",,,"12345678"],[,,"4(?:6[0135-8]|[79]\\d|8[3-9])\\d{6}","\\d{9}",,,"470123456"],[,,"800\\d{5}","\\d{8}",,,"80012345"],[,,"(?:70[2-467]|90[0-79])\\d{5}","\\d{8}",,,"90123456"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],"BE",32,"00","0",,,"0",,,,
[[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["4[6-9]"],"0$1"],[,"(\\d)(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[23]|4[23]|9[2-4]"],"0$1"],[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[156]|7[018]|8(?:0[1-9]|[1-79])"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{3})","$1 $2 $3",["(?:80|9)0"],"0$1"]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"78\\d{6}","\\d{8}",,,"78123456"],,,[,,"NA","NA"]],BF:[,[,,"[267]\\d{7}","\\d{8}"],[,,"2(?:0(?:49|5[23]|9[016-9])|4(?:4[569]|5[4-6]|7[0179])|5(?:[34]\\d|50))\\d{4}",
"\\d{8}",,,"20491234"],[,,"6(?:[0-689]\\d|7[0-5])\\d{5}|7\\d{7}","\\d{8}",,,"70123456"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],"BF",226,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4"]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],BG:[,[,,"[23567]\\d{5,7}|[489]\\d{6,8}","\\d{5,9}"],[,,"2(?:[0-8]\\d{5,6}|9\\d{4,6})|(?:[36]\\d|5[1-9]|8[1-6]|9[1-7])\\d{5,6}|(?:4(?:[124-7]\\d|3[1-6])|7(?:0[1-9]|[1-9]\\d))\\d{4,5}","\\d{5,8}",,,"2123456"],
[,,"(?:8[7-9]\\d|9(?:8\\d|99))\\d{6}|4(?:3[0789]|8\\d)\\d{5}","\\d{8,9}",,,"48123456"],[,,"800\\d{5}","\\d{8}",,,"80012345"],[,,"90\\d{6}","\\d{8}",,,"90123456"],[,,"NA","NA"],[,,"700\\d{5}","\\d{5,9}",,,"70012345"],[,,"NA","NA"],"BG",359,"00","0",,,"0",,,,[[,"(2)(\\d{5})","$1 $2",["29"],"0$1"],[,"(2)(\\d{3})(\\d{3,4})","$1 $2 $3",["2"],"0$1"],[,"(\\d{3})(\\d{4})","$1 $2",["43[124-7]|70[1-9]"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{2})","$1 $2 $3",["43[124-7]|70[1-9]"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{3})",
"$1 $2 $3",["[78]00"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["999"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{2,3})","$1 $2 $3",["[356]|4[124-7]|7[1-9]|8[1-6]|9[1-7]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["48|8[7-9]|9[08]"],"0$1"]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],BH:[,[,,"[136-9]\\d{7}","\\d{8}"],[,,"(?:1(?:3[1356]|6[0156]|7\\d)\\d|6(?:1[16]\\d|500|6(?:0\\d|3[12]|44|7[7-9])|9[69][69])|7(?:1(?:11|78)|7\\d{2}))\\d{4}","\\d{8}",,,"17001234"],[,,"(?:3(?:[1-4679]\\d|5[013569]|8[0-47-9])\\d|6(?:3(?:00|33|6[16])|6(?:[69]\\d|3[03-9]|7[0-6])))\\d{4}",
"\\d{8}",,,"36001234"],[,,"80\\d{6}","\\d{8}",,,"80123456"],[,,"(?:87|9[014578])\\d{6}","\\d{8}",,,"90123456"],[,,"84\\d{6}","\\d{8}",,,"84123456"],[,,"NA","NA"],[,,"NA","NA"],"BH",973,"00",,,,,,,,[[,"(\\d{4})(\\d{4})","$1 $2"]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],BI:[,[,,"[267]\\d{7}","\\d{8}"],[,,"22\\d{6}","\\d{8}",,,"22201234"],[,,"(?:29|6[189]|7[124-9])\\d{6}","\\d{8}",,,"79561234"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],"BI",257,"00",
,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4"]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],BJ:[,[,,"[2689]\\d{7}|7\\d{3}","\\d{4,8}"],[,,"2(?:02|1[037]|2[45]|3[68])\\d{5}","\\d{8}",,,"20211234"],[,,"(?:6[146-8]|9[03-9])\\d{6}","\\d{8}",,,"90011234"],[,,"7[3-5]\\d{2}","\\d{4}",,,"7312"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"857[58]\\d{4}","\\d{8}",,,"85751234"],"BJ",229,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4"]],,[,,"NA","NA"],,,[,,"NA",
"NA"],[,,"81\\d{6}","\\d{8}",,,"81123456"],,,[,,"NA","NA"]],BL:[,[,,"[56]\\d{8}","\\d{9}"],[,,"590(?:2[7-9]|5[12]|87)\\d{4}","\\d{9}",,,"590271234"],[,,"690(?:0[0-7]|[1-9]\\d)\\d{4}","\\d{9}",,,"690301234"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],"BL",590,"00","0",,,"0",,,,,,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],BM:[,[,,"[4589]\\d{9}","\\d{7}(?:\\d{3})?"],[,,"441(?:2(?:02|23|61|[3479]\\d)|[46]\\d{2}|5(?:4\\d|60|89)|824)\\d{4}","\\d{7}(?:\\d{3})?",
,,"4412345678"],[,,"441(?:[37]\\d|5[0-39])\\d{5}","\\d{10}",,,"4413701234"],[,,"8(?:00|44|55|66|77|88)[2-9]\\d{6}","\\d{10}",,,"8002123456"],[,,"900[2-9]\\d{6}","\\d{10}",,,"9002123456"],[,,"NA","NA"],[,,"5(?:00|33|44|66|77)[2-9]\\d{6}","\\d{10}",,,"5002345678"],[,,"NA","NA"],"BM",1,"011","1",,,"1",,,,,,[,,"NA","NA"],,"441",[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],BN:[,[,,"[2-578]\\d{6}","\\d{7}"],[,,"2(?:[013-9]\\d|2[0-7])\\d{4}|[3-5]\\d{6}","\\d{7}",,,"2345678"],[,,"22[89]\\d{4}|[78]\\d{6}",
"\\d{7}",,,"7123456"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],"BN",673,"00",,,,,,,,[[,"([2-578]\\d{2})(\\d{4})","$1 $2"]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],BO:[,[,,"[23467]\\d{7}","\\d{7,8}"],[,,"(?:2(?:2\\d{2}|5(?:11|[258]\\d|9[67])|6(?:12|2\\d|9[34])|8(?:2[34]|39|62))|3(?:3\\d{2}|4(?:6\\d|8[24])|8(?:25|42|5[257]|86|9[25])|9(?:2\\d|3[234]|4[248]|5[24]|6[2-6]|7\\d))|4(?:4\\d{2}|6(?:11|[24689]\\d|72)))\\d{4}","\\d{7,8}",,,"22123456"],[,,"[67]\\d{7}",
"\\d{8}",,,"71234567"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],"BO",591,"00(1\\d)?","0",,,"0(1\\d)?",,,,[[,"([234])(\\d{7})","$1 $2",["[234]"],,"0$CC $1"],[,"([67]\\d{7})","$1",["[67]"],,"0$CC $1"]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],BQ:[,[,,"[347]\\d{6}","\\d{7}"],[,,"(?:318[023]|416[023]|7(?:1[578]|50)\\d)\\d{3}","\\d{7}",,,"7151234"],[,,"(?:318[14-68]|416[15-9]|7(?:0[01]|7[07]|[89]\\d)\\d)\\d{3}","\\d{7}",,,"3181234"],[,,"NA","NA"],[,,"NA",
"NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],"BQ",599,"00",,,,,,,,,,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],BR:[,[,,"[1-46-9]\\d{7,10}|5\\d{8,9}","\\d{8,11}"],[,,"1[1-9][2-5]\\d{7}|(?:[4689][1-9]|2[12478]|3[1-578]|5[1-5]|7[13-579])[2-5]\\d{7}","\\d{8,11}",,,"1123456789"],[,,"1[1-9](?:7|9\\d)\\d{7}|(?:2[12478]|3[1-578]|7[13-579]|[89][1-9])9?[6-9]\\d{7}|(?:[46][1-9]|5[1-5])[6-9]\\d{7}","\\d{10,11}",,,"11961234567"],[,,"800\\d{6,7}","\\d{8,11}",,,"800123456"],[,,"[359]00\\d{6,7}",
"\\d{8,11}",,,"300123456"],[,,"(?:300\\d|40(?:0\\d|20))\\d{4}","\\d{8}",,,"40041234"],[,,"NA","NA"],[,,"NA","NA"],"BR",55,"00(?:1[245]|2[1-35]|31|4[13]|[56]5|99)","0",,,"0(?:(1[245]|2[1-35]|31|4[13]|[56]5|99)(\\d{10,11}))?","$2",,,[[,"(\\d{4})(\\d{4})","$1-$2",["[2-9](?:[1-9]|0[1-9])"],"$1"],[,"(\\d{5})(\\d{4})","$1-$2",["9(?:[1-9]|0[1-9])"],"$1"],[,"(\\d{3,5})","$1",["1[125689]"],"$1"],[,"(\\d{2})(\\d{5})(\\d{4})","$1 $2-$3",["(?:[189][1-9]|2[12478]|3[1-578]|7[13-579])9"],"($1)","0 $CC ($1)"],[,
"(\\d{2})(\\d{4})(\\d{4})","$1 $2-$3",["[1-9][1-9]"],"($1)","0 $CC ($1)"],[,"(\\d{4})(\\d{4})","$1-$2",["(?:300|40(?:0|20))"]],[,"([3589]00)(\\d{2,3})(\\d{4})","$1 $2 $3",["[3589]00"],"0$1"]],[[,"(\\d{2})(\\d{5})(\\d{4})","$1 $2-$3",["(?:[189][1-9]|2[12478]|3[1-578]|7[13-579])9"],"($1)","0 $CC ($1)"],[,"(\\d{2})(\\d{4})(\\d{4})","$1 $2-$3",["[1-9][1-9]"],"($1)","0 $CC ($1)"],[,"(\\d{4})(\\d{4})","$1-$2",["(?:300|40(?:0|20))"]],[,"([3589]00)(\\d{2,3})(\\d{4})","$1 $2 $3",["[3589]00"],"0$1"]],[,,"NA",
"NA"],,,[,,"(?:300\\d|40(?:0\\d|20))\\d{4}","\\d{8}",,,"40041234"],[,,"NA","NA"],,,[,,"NA","NA"]],BS:[,[,,"[2589]\\d{9}","\\d{7}(?:\\d{3})?"],[,,"242(?:3(?:02|[236][1-9]|4[0-24-9]|5[0-68]|7[3467]|8[0-4]|9[2-467])|461|502|6(?:0[1-3]|12|7[67]|8[78]|9[89])|7(?:02|88))\\d{4}","\\d{7}(?:\\d{3})?",,,"2423456789"],[,,"242(?:3(?:5[79]|[79]5)|4(?:[2-4][1-9]|5[1-8]|6[2-8]|7\\d|81)|5(?:2[45]|3[35]|44|5[1-9]|65|77)|6[34]6|727)\\d{4}","\\d{10}",,,"2423591234"],[,,"242300\\d{4}|8(?:00|44|55|66|77|88)[2-9]\\d{6}",
"\\d{10}",,,"8002123456"],[,,"900[2-9]\\d{6}","\\d{10}",,,"9002123456"],[,,"NA","NA"],[,,"5(?:00|33|44|66|77)[2-9]\\d{6}","\\d{10}",,,"5002345678"],[,,"NA","NA"],"BS",1,"011","1",,,"1",,,,,,[,,"NA","NA"],,"242",[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],BT:[,[,,"[1-8]\\d{6,7}","\\d{6,8}"],[,,"(?:2[3-6]|[34][5-7]|5[236]|6[2-46]|7[246]|8[2-4])\\d{5}","\\d{6,7}",,,"2345678"],[,,"(?:1[67]|77)\\d{6}","\\d{8}",,,"17123456"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],"BT",975,
"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["1|77"]],[,"([2-8])(\\d{3})(\\d{3})","$1 $2 $3",["[2-68]|7[246]"]]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],BW:[,[,,"[2-79]\\d{6,7}","\\d{7,8}"],[,,"(?:2(?:4[0-48]|6[0-24]|9[0578])|3(?:1[0235-9]|55|[69]\\d|7[01])|4(?:6[03]|7[1267]|9[0-5])|5(?:3[0389]|4[0489]|7[1-47]|88|9[0-49])|6(?:2[1-35]|5[149]|8[067]))\\d{4}","\\d{7}",,,"2401234"],[,,"7(?:[1-6]\\d|7[014-8])\\d{5}","\\d{8}",,,"71123456"],[,,"NA","NA"],[,,"90\\d{5}",
"\\d{7}",,,"9012345"],[,,"NA","NA"],[,,"NA","NA"],[,,"79[12][01]\\d{4}","\\d{8}",,,"79101234"],"BW",267,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2",["[2-6]"]],[,"(7\\d)(\\d{3})(\\d{3})","$1 $2 $3",["7"]],[,"(90)(\\d{5})","$1 $2",["9"]]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],BY:[,[,,"[1-4]\\d{8}|800\\d{3,7}|[89]\\d{9,10}","\\d{6,11}"],[,,"(?:1(?:5(?:1[1-5]|[24]\\d|6[2-4]|9[1-7])|6(?:[235]\\d|4[1-7])|7\\d{2})|2(?:1(?:[246]\\d|3[0-35-9]|5[1-9])|2(?:[235]\\d|4[0-8])|3(?:[26]\\d|3[02-79]|4[024-7]|5[03-7])))\\d{5}",
"\\d{6,11}",,,"152450911"],[,,"(?:2(?:5[5679]|9[1-9])|33\\d|44\\d)\\d{6}","\\d{9}",,,"294911911"],[,,"8(?:0[13]|20\\d)\\d{7}|800\\d{3,7}","\\d{6,11}",,,"8011234567"],[,,"(?:810|902)\\d{7}","\\d{10}",,,"9021234567"],[,,"NA","NA"],[,,"NA","NA"],[,,"249\\d{6}","\\d{9}",,,"249123456"],"BY",375,"810","8",,,"8?0?",,"8~10",,[[,"(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2-$3-$4",["17[0-3589]|2[4-9]|[34]","17(?:[02358]|1[0-2]|9[0189])|2[4-9]|[34]"],"8 0$1"],[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2-$3-$4",
["1(?:5[24]|6[235]|7[467])|2(?:1[246]|2[25]|3[26])","1(?:5[24]|6(?:2|3[04-9]|5[0346-9])|7(?:[46]|7[37-9]))|2(?:1[246]|2[25]|3[26])"],"8 0$1"],[,"(\\d{4})(\\d{2})(\\d{3})","$1 $2-$3",["1(?:5[169]|6[3-5]|7[179])|2(?:1[35]|2[34]|3[3-5])","1(?:5[169]|6(?:3[1-3]|4|5[125])|7(?:1[3-9]|7[0-24-6]|9[2-7]))|2(?:1[35]|2[34]|3[3-5])"],"8 0$1"],[,"([89]\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["8[01]|9"],"8 $1"],[,"(82\\d)(\\d{4})(\\d{4})","$1 $2 $3",["82"],"8 $1"],[,"(800)(\\d{3})","$1 $2",["800"],"8 $1"],[,"(800)(\\d{2})(\\d{2,4})",
"$1 $2 $3",["800"],"8 $1"]],,[,,"NA","NA"],,,[,,"8(?:[013]|[12]0)\\d{8}|800\\d{3,7}|902\\d{7}","\\d{6,11}",,,"82012345678"],[,,"NA","NA"],,,[,,"NA","NA"]],BZ:[,[,,"[2-8]\\d{6}|0\\d{10}","\\d{7}(?:\\d{4})?"],[,,"[234578][02]\\d{5}","\\d{7}",,,"2221234"],[,,"6[0-367]\\d{5}","\\d{7}",,,"6221234"],[,,"0800\\d{7}","\\d{11}",,,"08001234123"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],"BZ",501,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1-$2",["[2-8]"]],[,"(0)(800)(\\d{4})(\\d{3})","$1-$2-$3-$4",["0"]]],
,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],1,,[,,"NA","NA"]],CA:[,[,,"[2-9]\\d{9}|3\\d{6}","\\d{7}(?:\\d{3})?"],[,,"(?:2(?:04|[23]6|[48]9|50)|3(?:06|43|65)|4(?:03|1[68]|3[178]|50)|5(?:06|1[49]|48|79|8[17])|6(?:0[04]|13|22|39|47)|7(?:0[59]|78|8[02])|8(?:[06]7|19|25|73)|90[25])[2-9]\\d{6}|310\\d{4}","\\d{7}(?:\\d{3})?",,,"2042345678"],[,,"(?:2(?:04|[23]6|[48]9|50)|3(?:06|43|65)|4(?:03|1[68]|3[178]|50)|5(?:06|1[49]|48|79|8[17])|6(?:0[04]|13|22|39|47)|7(?:0[59]|78|8[02])|8(?:[06]7|19|25|73)|90[25])[2-9]\\d{6}",
"\\d{7}(?:\\d{3})?",,,"2042345678"],[,,"8(?:00|44|55|66|77|88)[2-9]\\d{6}|310\\d{4}","\\d{7}(?:\\d{3})?",,,"8002123456"],[,,"900[2-9]\\d{6}","\\d{10}",,,"9002123456"],[,,"NA","NA"],[,,"5(?:00|33|44|66|77)[2-9]\\d{6}","\\d{10}",,,"5002345678"],[,,"NA","NA"],"CA",1,"011","1",,,"1",,,,,,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],CC:[,[,,"[1458]\\d{5,9}","\\d{6,10}"],[,,"89162\\d{4}","\\d{8,9}",,,"891621234"],[,,"14(?:5\\d|71)\\d{5}|4(?:[0-2]\\d|3[0-57-9]|4[47-9]|5[0-25-9]|6[6-9]|7[02-9]|8[147-9]|9[017-9])\\d{6}",
"\\d{9}",,,"412345678"],[,,"180(?:0\\d{3}|2)\\d{3}","\\d{7,10}",,,"1800123456"],[,,"190[0126]\\d{6}","\\d{10}",,,"1900123456"],[,,"13(?:00\\d{2})?\\d{4}","\\d{6,10}",,,"1300123456"],[,,"500\\d{6}","\\d{9}",,,"500123456"],[,,"550\\d{6}","\\d{9}",,,"550123456"],"CC",61,"(?:14(?:1[14]|34|4[17]|[56]6|7[47]|88))?001[14-689]","0",,,"0",,"0011",,,,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],CD:[,[,,"[2-6]\\d{6}|[18]\\d{6,8}|9\\d{8}","\\d{7,9}"],[,,"1(?:2\\d{7}|\\d{6})|[2-6]\\d{6}","\\d{7,9}",
,,"1234567"],[,,"8(?:[0-2459]\\d{2}|8)\\d{5}|9[7-9]\\d{7}","\\d{7,9}",,,"991234567"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],"CD",243,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["12"],"0$1"],[,"([89]\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["8[0-2459]|9"],"0$1"],[,"(\\d{2})(\\d{2})(\\d{3})","$1 $2 $3",["88"],"0$1"],[,"(\\d{2})(\\d{5})","$1 $2",["[1-6]"],"0$1"]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],CF:[,[,,"[278]\\d{7}","\\d{8}"],[,
,"2[12]\\d{6}","\\d{8}",,,"21612345"],[,,"7[0257]\\d{6}","\\d{8}",,,"70012345"],[,,"NA","NA"],[,,"8776\\d{4}","\\d{8}",,,"87761234"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],"CF",236,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4"]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],CG:[,[,,"[028]\\d{8}","\\d{9}"],[,,"222[1-589]\\d{5}","\\d{9}",,,"222123456"],[,,"0[14-6]\\d{7}","\\d{9}",,,"061234567"],[,,"NA","NA"],[,,"800\\d{6}","\\d{9}",,,"800123456"],[,,"NA","NA"],[,
,"NA","NA"],[,,"NA","NA"],"CG",242,"00",,,,,,,,[[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[02]"]],[,"(\\d)(\\d{4})(\\d{4})","$1 $2 $3",["8"]]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],1,,[,,"NA","NA"]],CH:[,[,,"[2-9]\\d{8}|860\\d{9}","\\d{9}(?:\\d{3})?"],[,,"(?:2[12467]|3[1-4]|4[134]|5[256]|6[12]|[7-9]1)\\d{7}","\\d{9}",,,"212345678"],[,,"7[5-9]\\d{7}","\\d{9}",,,"781234567"],[,,"800\\d{6}","\\d{9}",,,"800123456"],[,,"90[016]\\d{6}","\\d{9}",,,"900123456"],[,,"84[0248]\\d{6}","\\d{9}",,,"840123456"],
[,,"878\\d{6}","\\d{9}",,,"878123456"],[,,"NA","NA"],"CH",41,"00","0",,,"0",,,,[[,"([2-9]\\d)(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[2-7]|[89]1"],"0$1"],[,"([89]\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["8[047]|90"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4 $5",["860"],"0$1"]],,[,,"74[0248]\\d{6}","\\d{9}",,,"740123456"],,,[,,"NA","NA"],[,,"5[18]\\d{7}","\\d{9}",,,"581234567"],,,[,,"860\\d{9}","\\d{12}",,,"860123456789"]],CI:[,[,,"[02-8]\\d{7}","\\d{8}"],[,,"(?:2(?:0[023]|1[02357]|[23][045]|4[03-5])|3(?:0[06]|1[069]|[2-4][07]|5[09]|6[08]))\\d{5}",
"\\d{8}",,,"21234567"],[,,"(?:0[1-9]|4\\d|5[4-9]|6[015-79]|7[578]|87)\\d{6}","\\d{8}",,,"01234567"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],"CI",225,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4"]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],1,,[,,"NA","NA"]],CK:[,[,,"[2-8]\\d{4}","\\d{5}"],[,,"(?:2\\d|3[13-7]|4[1-5])\\d{3}","\\d{5}",,,"21234"],[,,"[5-8]\\d{4}","\\d{5}",,,"71234"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],
"CK",682,"00",,,,,,,,[[,"(\\d{2})(\\d{3})","$1 $2"]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],CL:[,[,,"(?:[2-9]|600|123)\\d{7,8}","\\d{7,11}"],[,,"2(?:2\\d{7}|3(?:20|22)\\d{5}|1962\\d{4})|(?:3[2-5]|[47][1-35]|5[1-3578]|6[13-57])\\d{7}","\\d{7,9}",,,"221234567"],[,,"9[4-9]\\d{7}","\\d{8,9}",,,"961234567"],[,,"800\\d{6}|1230\\d{7}","\\d{9,11}",,,"800123456"],[,,"NA","NA"],[,,"600\\d{7,8}","\\d{10,11}",,,"6001234567"],[,,"NA","NA"],[,,"44\\d{7}","\\d{9}",,,"441234567"],"CL",56,"(?:0|1(?:1[0-69]|2[0-57]|5[13-58]|69|7[0167]|8[018]))0",
"0",,,"0|(1(?:1[0-69]|2[0-57]|5[13-58]|69|7[0167]|8[018]))",,,,[[,"(\\d)(\\d{4})(\\d{4})","$1 $2 $3",["2[23]"],"($1)","$CC ($1)"],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[357]|4[1-35]|6[13-57]"],"($1)","$CC ($1)"],[,"(9)(\\d{4})(\\d{4})","$1 $2 $3",["9"],"0$1"],[,"(44)(\\d{3})(\\d{4})","$1 $2 $3",["44"],"0$1"],[,"([68]00)(\\d{3})(\\d{3,4})","$1 $2 $3",["60|8"],"$1"],[,"(600)(\\d{3})(\\d{2})(\\d{3})","$1 $2 $3 $4",["60"],"$1"],[,"(1230)(\\d{3})(\\d{4})","$1 $2 $3",["1"],"$1"],[,"(\\d{5})(\\d{4})",
"$1 $2",["219"],"($1)","$CC ($1)"],[,"(\\d{4,5})","$1",["[1-9]"],"$1"]],[[,"(\\d)(\\d{4})(\\d{4})","$1 $2 $3",["2[23]"],"($1)","$CC ($1)"],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[357]|4[1-35]|6[13-57]"],"($1)","$CC ($1)"],[,"(9)(\\d{4})(\\d{4})","$1 $2 $3",["9"],"0$1"],[,"(44)(\\d{3})(\\d{4})","$1 $2 $3",["44"],"0$1"],[,"([68]00)(\\d{3})(\\d{3,4})","$1 $2 $3",["60|8"],"$1"],[,"(600)(\\d{3})(\\d{2})(\\d{3})","$1 $2 $3 $4",["60"],"$1"],[,"(1230)(\\d{3})(\\d{4})","$1 $2 $3",["1"],"$1"],[,"(\\d{5})(\\d{4})",
"$1 $2",["219"],"($1)","$CC ($1)"]],[,,"NA","NA"],,,[,,"600\\d{7,8}","\\d{10,11}",,,"6001234567"],[,,"NA","NA"],,,[,,"NA","NA"]],CM:[,[,,"[2368]\\d{7,8}","\\d{8,9}"],[,,"2(?:22|33|4[23])\\d{6}","\\d{9}",,,"222123456"],[,,"6[5-9]\\d{7}","\\d{9}",,,"671234567"],[,,"800\\d{5}","\\d{8}",,,"80012345"],[,,"88\\d{6}","\\d{8}",,,"88012345"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],"CM",237,"00",,,,,,,,[[,"([26])(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4 $5",["[26]"]],[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})",
"$1 $2 $3 $4",["[23]|88"]],[,"(800)(\\d{2})(\\d{3})","$1 $2 $3",["80"]]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],CN:[,[,,"[1-7]\\d{6,11}|8[0-357-9]\\d{6,9}|9\\d{7,10}","\\d{4,12}"],[,,"21(?:100\\d{2}|95\\d{3,4}|\\d{8,10})|(?:10|2[02-57-9]|3(?:11|7[179])|4(?:[15]1|3[12])|5(?:1\\d|2[37]|3[12]|51|7[13-79]|9[15])|7(?:31|5[457]|6[09]|91)|8(?:[57]1|98))(?:100\\d{2}|95\\d{3,4}|\\d{8})|(?:3(?:1[02-9]|35|49|5\\d|7[02-68]|9[1-68])|4(?:1[02-9]|2[179]|3[3-9]|5[2-9]|6[4789]|7\\d|8[23])|5(?:3[03-9]|4[36]|5[02-9]|6[1-46]|7[028]|80|9[2-46-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[17]\\d|2[248]|3[04-9]|4[3-6]|5[0-3689]|6[2368]|9[02-9])|8(?:1[236-8]|2[5-7]|3\\d|5[4-9]|7[02-9]|8[3678]|9[1-7])|9(?:0[1-3689]|1[1-79]|[379]\\d|4[13]|5[1-5]))(?:100\\d{2}|95\\d{3,4}|\\d{7})|80(?:29|6[03578]|7[018]|81)\\d{4}",
"\\d{4,12}",,,"1012345678"],[,,"1(?:[38]\\d|4[57]|5[0-35-9]|7[06-8])\\d{8}","\\d{11}",,,"13123456789"],[,,"(?:10)?800\\d{7}","\\d{10,12}",,,"8001234567"],[,,"16[08]\\d{5}","\\d{8}",,,"16812345"],[,,"400\\d{7}|950\\d{7,8}|(?:10|2[0-57-9]|3(?:[157]\\d|35|49|9[1-68])|4(?:[17]\\d|2[179]|[35][1-9]|6[4789]|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[14-9]|8[3678]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]\\d|4[13]|5[1-5]))96\\d{3,4}",
"\\d{7,11}",,,"4001234567"],[,,"NA","NA"],[,,"NA","NA"],"CN",86,"(1(?:[129]\\d{3}|79\\d{2}))?00","0",,,"(1(?:[129]\\d{3}|79\\d{2}))|0",,"00",,[[,"(80\\d{2})(\\d{4})","$1 $2",["80[2678]"],"0$1","$CC $1",1],[,"([48]00)(\\d{3})(\\d{4})","$1 $2 $3",["[48]00"]],[,"(\\d{5,6})","$1",["100|95"]],[,"(\\d{2})(\\d{5,6})","$1 $2",["(?:10|2\\d)[19]","(?:10|2\\d)(?:10|9[56])","(?:10|2\\d)(?:100|9[56])"],"0$1","$CC $1"],[,"(\\d{3})(\\d{5,6})","$1 $2",["[3-9]","[3-9]\\d{2}[19]","[3-9]\\d{2}(?:10|9[56])"],"0$1","$CC $1"],
[,"(\\d{3,4})(\\d{4})","$1 $2",["[2-9]"]],[,"(21)(\\d{4})(\\d{4,6})","$1 $2 $3",["21"],"0$1","$CC $1",1],[,"([12]\\d)(\\d{4})(\\d{4})","$1 $2 $3",["10[1-9]|2[02-9]","10[1-9]|2[02-9]","10(?:[1-79]|8(?:[1-9]|0[1-9]))|2[02-9]"],"0$1","$CC $1",1],[,"(\\d{3})(\\d{4})(\\d{4})","$1 $2 $3",["3(?:11|7[179])|4(?:[15]1|3[12])|5(?:1|2[37]|3[12]|51|7[13-79]|9[15])|7(?:31|5[457]|6[09]|91)|8(?:[57]1|98)"],"0$1","$CC $1",1],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["3(?:1[02-9]|35|49|5|7[02-68]|9[1-68])|4(?:1[02-9]|2[179]|[35][2-9]|6[4789]|7\\d|8[23])|5(?:3[03-9]|4[36]|5[02-9]|6[1-46]|7[028]|80|9[2-46-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]|2[248]|3[04-9]|4[3-6]|6[2368])|8(?:1[236-8]|2[5-7]|3|5[4-9]|7[02-9]|8[3678]|9[1-7])|9(?:0[1-3689]|1[1-79]|[379]|4[13]|5[1-5])"],
"0$1","$CC $1",1],[,"(\\d{3})(\\d{4})(\\d{4})","$1 $2 $3",["1[3-578]"],,"$CC $1"],[,"(10800)(\\d{3})(\\d{4})","$1 $2 $3",["108","1080","10800"]],[,"(\\d{3})(\\d{7,8})","$1 $2",["950"]]],[[,"(80\\d{2})(\\d{4})","$1 $2",["80[2678]"],"0$1","$CC $1",1],[,"([48]00)(\\d{3})(\\d{4})","$1 $2 $3",["[48]00"]],[,"(\\d{2})(\\d{5,6})","$1 $2",["(?:10|2\\d)[19]","(?:10|2\\d)(?:10|9[56])","(?:10|2\\d)(?:100|9[56])"],"0$1","$CC $1"],[,"(\\d{3})(\\d{5,6})","$1 $2",["[3-9]","[3-9]\\d{2}[19]","[3-9]\\d{2}(?:10|9[56])"],
"0$1","$CC $1"],[,"(21)(\\d{4})(\\d{4,6})","$1 $2 $3",["21"],"0$1","$CC $1",1],[,"([12]\\d)(\\d{4})(\\d{4})","$1 $2 $3",["10[1-9]|2[02-9]","10[1-9]|2[02-9]","10(?:[1-79]|8(?:[1-9]|0[1-9]))|2[02-9]"],"0$1","$CC $1",1],[,"(\\d{3})(\\d{4})(\\d{4})","$1 $2 $3",["3(?:11|7[179])|4(?:[15]1|3[12])|5(?:1|2[37]|3[12]|51|7[13-79]|9[15])|7(?:31|5[457]|6[09]|91)|8(?:[57]1|98)"],"0$1","$CC $1",1],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["3(?:1[02-9]|35|49|5|7[02-68]|9[1-68])|4(?:1[02-9]|2[179]|[35][2-9]|6[4789]|7\\d|8[23])|5(?:3[03-9]|4[36]|5[02-9]|6[1-46]|7[028]|80|9[2-46-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]|2[248]|3[04-9]|4[3-6]|6[2368])|8(?:1[236-8]|2[5-7]|3|5[4-9]|7[02-9]|8[3678]|9[1-7])|9(?:0[1-3689]|1[1-79]|[379]|4[13]|5[1-5])"],
"0$1","$CC $1",1],[,"(\\d{3})(\\d{4})(\\d{4})","$1 $2 $3",["1[3-578]"],,"$CC $1"],[,"(10800)(\\d{3})(\\d{4})","$1 $2 $3",["108","1080","10800"]],[,"(\\d{3})(\\d{7,8})","$1 $2",["950"]]],[,,"NA","NA"],,,[,,"(?:4|(?:10)?8)00\\d{7}|950\\d{7,8}","\\d{10,12}",,,"4001234567"],[,,"NA","NA"],,,[,,"NA","NA"]],CO:[,[,,"(?:[13]\\d{0,3}|[24-8])\\d{7}","\\d{7,11}"],[,,"[124-8][2-9]\\d{6}","\\d{8}",,,"12345678"],[,,"3(?:0[0-5]|1\\d|2[0-2]|5[01])\\d{7}","\\d{10}",,,"3211234567"],[,,"1800\\d{7}","\\d{11}",,,"18001234567"],
[,,"19(?:0[01]|4[78])\\d{7}","\\d{11}",,,"19001234567"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],"CO",57,"00(?:4(?:[14]4|56)|[579])","0",,,"0([3579]|4(?:44|56))?",,,,[[,"(\\d)(\\d{7})","$1 $2",["1(?:8[2-9]|9[0-3]|[2-7])|[24-8]","1(?:8[2-9]|9(?:09|[1-3])|[2-7])|[24-8]"],"($1)","0$CC $1"],[,"(\\d{3})(\\d{7})","$1 $2",["3"],,"0$CC $1"],[,"(1)(\\d{3})(\\d{7})","$1-$2-$3",["1(?:80|9[04])","1(?:800|9(?:0[01]|4[78]))"],"0$1"]],[[,"(\\d)(\\d{7})","$1 $2",["1(?:8[2-9]|9[0-3]|[2-7])|[24-8]","1(?:8[2-9]|9(?:09|[1-3])|[2-7])|[24-8]"],
"($1)","0$CC $1"],[,"(\\d{3})(\\d{7})","$1 $2",["3"],,"0$CC $1"],[,"(1)(\\d{3})(\\d{7})","$1 $2 $3",["1(?:80|9[04])","1(?:800|9(?:0[01]|4[78]))"]]],[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],CR:[,[,,"[24-9]\\d{7,9}","\\d{8,10}"],[,,"2[0-24-7]\\d{6}","\\d{8}",,,"22123456"],[,,"5(?:0[01]|7[0-3])\\d{5}|(?:[67][0-3]|8[3-9])\\d{6}","\\d{8}",,,"83123456"],[,,"800\\d{7}","\\d{10}",,,"8001234567"],[,,"90[059]\\d{7}","\\d{10}",,,"9001234567"],[,,"NA","NA"],[,,"NA","NA"],[,,"210[0-6]\\d{4}|4\\d{7}|5100\\d{4}",
"\\d{8}",,,"40001234"],"CR",506,"00",,,,"(19(?:0[012468]|1[09]|20|66|77|99))",,,,[[,"(\\d{4})(\\d{4})","$1 $2",["[24-7]|8[3-9]"],,"$CC $1"],[,"(\\d{3})(\\d{3})(\\d{4})","$1-$2-$3",["[89]0"],,"$CC $1"]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],CU:[,[,,"[2-57]\\d{5,7}","\\d{4,8}"],[,,"2[1-4]\\d{5,6}|3(?:1\\d{6}|[23]\\d{4,6})|4(?:[125]\\d{5,6}|[36]\\d{6}|[78]\\d{4,6})|7\\d{6,7}","\\d{4,8}",,,"71234567"],[,,"5\\d{7}","\\d{8}",,,"51234567"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],
[,,"NA","NA"],[,,"NA","NA"],"CU",53,"119","0",,,"0",,,,[[,"(\\d)(\\d{6,7})","$1 $2",["7"],"(0$1)"],[,"(\\d{2})(\\d{4,6})","$1 $2",["[2-4]"],"(0$1)"],[,"(\\d)(\\d{7})","$1 $2",["5"],"0$1"]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],CV:[,[,,"[259]\\d{6}","\\d{7}"],[,,"2(?:2[1-7]|3[0-8]|4[12]|5[1256]|6\\d|7[1-3]|8[1-5])\\d{4}","\\d{7}",,,"2211234"],[,,"(?:9\\d|59)\\d{5}","\\d{7}",,,"9911234"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],"CV",238,"0",,,,,,
,,[[,"(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3"]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],CW:[,[,,"[169]\\d{6,7}","\\d{7,8}"],[,,"9(?:[48]\\d{2}|50\\d|7(?:2[0-24]|[34]\\d|6[35-7]|77|8[7-9]))\\d{4}","\\d{7,8}",,,"94151234"],[,,"9(?:5(?:[12467]\\d|3[01])|6(?:[15-9]\\d|3[01]))\\d{4}","\\d{7,8}",,,"95181234"],[,,"NA","NA"],[,,"NA","NA"],[,,"60[0-2]\\d{4}","\\d{7}",,,"6001234"],[,,"NA","NA"],[,,"NA","NA"],"CW",599,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2",["[13-7]"]],[,"(9)(\\d{3})(\\d{4})",
"$1 $2 $3",["9"]]],,[,,"955\\d{5}","\\d{7,8}",,,"95581234"],1,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],CX:[,[,,"[1458]\\d{5,9}","\\d{6,10}"],[,,"89164\\d{4}","\\d{8,9}",,,"891641234"],[,,"14(?:5\\d|71)\\d{5}|4(?:[0-2]\\d|3[0-57-9]|4[47-9]|5[0-25-9]|6[6-9]|7[02-9]|8[147-9]|9[017-9])\\d{6}","\\d{9}",,,"412345678"],[,,"180(?:0\\d{3}|2)\\d{3}","\\d{7,10}",,,"1800123456"],[,,"190[0126]\\d{6}","\\d{10}",,,"1900123456"],[,,"13(?:00\\d{2})?\\d{4}","\\d{6,10}",,,"1300123456"],[,,"500\\d{6}","\\d{9}",
,,"500123456"],[,,"550\\d{6}","\\d{9}",,,"550123456"],"CX",61,"(?:14(?:1[14]|34|4[17]|[56]6|7[47]|88))?001[14-689]","0",,,"0",,"0011",,,,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],CY:[,[,,"[257-9]\\d{7}","\\d{8}"],[,,"2[2-6]\\d{6}","\\d{8}",,,"22345678"],[,,"9[4-79]\\d{6}","\\d{8}",,,"96123456"],[,,"800\\d{5}","\\d{8}",,,"80001234"],[,,"90[09]\\d{5}","\\d{8}",,,"90012345"],[,,"80[1-9]\\d{5}","\\d{8}",,,"80112345"],[,,"700\\d{5}","\\d{8}",,,"70012345"],[,,"NA","NA"],"CY",357,"00",
,,,,,,,[[,"(\\d{2})(\\d{6})","$1 $2"]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"(?:50|77)\\d{6}","\\d{8}",,,"77123456"],,,[,,"NA","NA"]],CZ:[,[,,"[2-8]\\d{8}|9\\d{8,11}","\\d{9,12}"],[,,"2\\d{8}|(?:3[1257-9]|4[16-9]|5[13-9])\\d{7}","\\d{9,12}",,,"212345678"],[,,"(?:60[1-8]|7(?:0[2-5]|[2379]\\d))\\d{6}","\\d{9,12}",,,"601123456"],[,,"800\\d{6}","\\d{9,12}",,,"800123456"],[,,"9(?:0[05689]|76)\\d{6}","\\d{9,12}",,,"900123456"],[,,"8[134]\\d{7}","\\d{9,12}",,,"811234567"],[,,"70[01]\\d{6}","\\d{9,12}",,,"700123456"],
[,,"9[17]0\\d{6}","\\d{9,12}",,,"910123456"],"CZ",420,"00",,,,,,,,[[,"([2-9]\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["[2-8]|9[015-7]"]],[,"(96\\d)(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3 $4",["96"]],[,"(9\\d)(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3 $4",["9[36]"]]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"9(?:5\\d|7[234])\\d{6}","\\d{9,12}",,,"972123456"],,,[,,"9(?:3\\d{9}|6\\d{7,10})","\\d{9,12}",,,"93123456789"]],DE:[,[,,"[1-35-9]\\d{3,14}|4(?:[0-8]\\d{4,12}|9(?:[0-37]\\d|4(?:[1-35-8]|4\\d?)|5\\d{1,2}|6[1-8]\\d?)\\d{2,8})",
"\\d{2,15}"],[,,"[246]\\d{5,13}|3(?:0\\d{3,13}|2\\d{9}|[3-9]\\d{4,13})|5(?:0[2-8]|[1256]\\d|[38][0-8]|4\\d{0,2}|[79][0-7])\\d{3,11}|7(?:0[2-8]|[1-9]\\d)\\d{3,10}|8(?:0[2-9]|[1-9]\\d)\\d{3,10}|9(?:0[6-9]\\d{3,10}|1\\d{4,12}|[2-9]\\d{4,11})","\\d{2,15}",,,"30123456"],[,,"1(?:5[0-25-9]\\d{8}|6[023]\\d{7,8}|7(?:[0-57-9]\\d?|6\\d)\\d{7})","\\d{10,11}",,,"15123456789"],[,,"800\\d{7,12}","\\d{10,15}",,,"8001234567890"],[,,"137[7-9]\\d{6}|900(?:[135]\\d{6}|9\\d{7})","\\d{10,11}",,,"9001234567"],[,,"1(?:3(?:7[1-6]\\d{6}|8\\d{4})|80\\d{5,11})",
"\\d{7,14}",,,"18012345"],[,,"700\\d{8}","\\d{11}",,,"70012345678"],[,,"NA","NA"],"DE",49,"00","0",,,"0",,,,[[,"(1\\d{2})(\\d{7,8})","$1 $2",["1[67]"],"0$1"],[,"(15\\d{3})(\\d{6})","$1 $2",["15[0568]"],"0$1"],[,"(1\\d{3})(\\d{7})","$1 $2",["15"],"0$1"],[,"(\\d{2})(\\d{3,11})","$1 $2",["3[02]|40|[68]9"],"0$1"],[,"(\\d{3})(\\d{3,11})","$1 $2",["2(?:\\d1|0[2389]|1[24]|28|34)|3(?:[3-9][15]|40)|[4-8][1-9]1|9(?:06|[1-9]1)"],"0$1"],[,"(\\d{4})(\\d{2,11})","$1 $2",["[24-6]|[7-9](?:\\d[1-9]|[1-9]\\d)|3(?:[3569][02-46-9]|4[2-4679]|7[2-467]|8[2-46-8])",
"[24-6]|[7-9](?:\\d[1-9]|[1-9]\\d)|3(?:3(?:0[1-467]|2[127-9]|3[124578]|[46][1246]|7[1257-9]|8[1256]|9[145])|4(?:2[135]|3[1357]|4[13578]|6[1246]|7[1356]|9[1346])|5(?:0[14]|2[1-3589]|3[1357]|4[1246]|6[1-4]|7[1346]|8[13568]|9[1246])|6(?:0[356]|2[1-489]|3[124-6]|4[1347]|6[13]|7[12579]|8[1-356]|9[135])|7(?:2[1-7]|3[1357]|4[145]|6[1-5]|7[1-4])|8(?:21|3[1468]|4[1347]|6[0135-9]|7[1467]|8[136])|9(?:0[12479]|2[1358]|3[1357]|4[134679]|6[1-9]|7[136]|8[147]|9[1468]))"],"0$1"],[,"(3\\d{4})(\\d{1,10})","$1 $2",
["3"],"0$1"],[,"(800)(\\d{7,12})","$1 $2",["800"],"0$1"],[,"(177)(99)(\\d{7,8})","$1 $2 $3",["177","1779","17799"],"0$1"],[,"(\\d{3})(\\d)(\\d{4,10})","$1 $2 $3",["(?:18|90)0|137","1(?:37|80)|900[1359]"],"0$1"],[,"(1\\d{2})(\\d{5,11})","$1 $2",["181"],"0$1"],[,"(18\\d{3})(\\d{6})","$1 $2",["185","1850","18500"],"0$1"],[,"(18\\d{2})(\\d{7})","$1 $2",["18[68]"],"0$1"],[,"(18\\d)(\\d{8})","$1 $2",["18[2-579]"],"0$1"],[,"(700)(\\d{4})(\\d{4})","$1 $2 $3",["700"],"0$1"],[,"(138)(\\d{4})","$1 $2",["138"],
"0$1"]],,[,,"16(?:4\\d{1,10}|[89]\\d{1,11})","\\d{4,14}",,,"16412345"],,,[,,"NA","NA"],[,,"18(?:1\\d{5,11}|[2-9]\\d{8})","\\d{8,14}",,,"18500123456"],,,[,,"17799\\d{7,8}","\\d{12,13}",,,"177991234567"]],DJ:[,[,,"[27]\\d{7}","\\d{8}"],[,,"2(?:1[2-5]|7[45])\\d{5}","\\d{8}",,,"21360003"],[,,"77[6-8]\\d{5}","\\d{8}",,,"77831001"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],"DJ",253,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4"]],,[,,"NA","NA"],,,[,,"NA","NA"],
[,,"NA","NA"],,,[,,"NA","NA"]],DK:[,[,,"[2-9]\\d{7}","\\d{8}"],[,,"(?:[2-7]\\d|8[126-9]|9[1-36-9])\\d{6}","\\d{8}",,,"32123456"],[,,"(?:[2-7]\\d|8[126-9]|9[1-36-9])\\d{6}","\\d{8}",,,"20123456"],[,,"80\\d{6}","\\d{8}",,,"80123456"],[,,"90\\d{6}","\\d{8}",,,"90123456"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],"DK",45,"00",,,,,,,1,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4"]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],DM:[,[,,"[57-9]\\d{9}","\\d{7}(?:\\d{3})?"],[,,"767(?:2(?:55|66)|4(?:2[01]|4[0-25-9])|50[0-4]|70[1-3])\\d{4}",
"\\d{7}(?:\\d{3})?",,,"7674201234"],[,,"767(?:2(?:[234689]5|7[5-7])|31[5-7]|61[2-7])\\d{4}","\\d{10}",,,"7672251234"],[,,"8(?:00|44|55|66|77|88)[2-9]\\d{6}","\\d{10}",,,"8002123456"],[,,"900[2-9]\\d{6}","\\d{10}",,,"9002123456"],[,,"NA","NA"],[,,"5(?:00|33|44|66|77)[2-9]\\d{6}","\\d{10}",,,"5002345678"],[,,"NA","NA"],"DM",1,"011","1",,,"1",,,,,,[,,"NA","NA"],,"767",[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],DO:[,[,,"[589]\\d{9}","\\d{7}(?:\\d{3})?"],[,,"8(?:[04]9[2-9]\\d{6}|29(?:2(?:[0-59]\\d|6[04-9]|7[0-27]|8[0237-9])|3(?:[0-35-9]\\d|4[7-9])|[45]\\d{2}|6(?:[0-27-9]\\d|[3-5][1-9]|6[0135-8])|7(?:0[013-9]|[1-37]\\d|4[1-35689]|5[1-4689]|6[1-57-9]|8[1-79]|9[1-8])|8(?:0[146-9]|1[0-48]|[248]\\d|3[1-79]|5[01589]|6[013-68]|7[124-8]|9[0-8])|9(?:[0-24]\\d|3[02-46-9]|5[0-79]|60|7[0169]|8[57-9]|9[02-9]))\\d{4})",
"\\d{7}(?:\\d{3})?",,,"8092345678"],[,,"8[024]9[2-9]\\d{6}","\\d{7}(?:\\d{3})?",,,"8092345678"],[,,"8(?:00|44|55|66|77|88)[2-9]\\d{6}","\\d{10}",,,"8002123456"],[,,"900[2-9]\\d{6}","\\d{10}",,,"9002123456"],[,,"NA","NA"],[,,"5(?:00|33|44|66|77)[2-9]\\d{6}","\\d{10}",,,"5002345678"],[,,"NA","NA"],"DO",1,"011","1",,,"1",,,,,,[,,"NA","NA"],,"8[024]9",[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],DZ:[,[,,"(?:[1-4]|[5-9]\\d)\\d{7}","\\d{8,9}"],[,,"(?:1\\d|2[013-79]|3[0-8]|4[0135689])\\d{6}|9619\\d{5}",
"\\d{8,9}",,,"12345678"],[,,"(?:5[4-6]|7[7-9])\\d{7}|6(?:[569]\\d|7[0-6])\\d{6}","\\d{9}",,,"551234567"],[,,"800\\d{6}","\\d{9}",,,"800123456"],[,,"80[3-689]1\\d{5}","\\d{9}",,,"808123456"],[,,"80[12]1\\d{5}","\\d{9}",,,"801123456"],[,,"NA","NA"],[,,"98[23]\\d{6}","\\d{9}",,,"983123456"],"DZ",213,"00","0",,,"0",,,,[[,"([1-4]\\d)(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[1-4]"],"0$1"],[,"([5-8]\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[5-8]"],"0$1"],[,"(9\\d)(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",
["9"],"0$1"]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],EC:[,[,,"1\\d{9,10}|[2-8]\\d{7}|9\\d{8}","\\d{7,11}"],[,,"[2-7][2-7]\\d{6}","\\d{7,8}",,,"22123456"],[,,"9(?:39|[45][89]|[67][7-9]|[89]\\d)\\d{6}","\\d{9}",,,"991234567"],[,,"1800\\d{6,7}","\\d{10,11}",,,"18001234567"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"[2-7]890\\d{4}","\\d{8}",,,"28901234"],"EC",593,"00","0",,,"0",,,,[[,"(\\d)(\\d{3})(\\d{4})","$1 $2-$3",["[247]|[356][2-8]"],"(0$1)"],[,"(\\d{2})(\\d{3})(\\d{4})",
"$1 $2 $3",["9"],"0$1"],[,"(1800)(\\d{3})(\\d{3,4})","$1 $2 $3",["1"],"$1"]],[[,"(\\d)(\\d{3})(\\d{4})","$1-$2-$3",["[247]|[356][2-8]"]],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["9"],"0$1"],[,"(1800)(\\d{3})(\\d{3,4})","$1 $2 $3",["1"],"$1"]],[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],EE:[,[,,"1\\d{3,4}|[3-9]\\d{6,7}|800\\d{6,7}","\\d{4,10}"],[,,"(?:3[23589]|4[3-8]|6\\d|7[1-9]|88)\\d{5}","\\d{7}",,,"3212345"],[,,"(?:5\\d|8[1-5])\\d{6}|5(?:[02]\\d{2}|1(?:[0-8]\\d|95)|5[0-478]\\d|64[0-4]|65[1-589])\\d{3}",
"\\d{7,8}",,,"51234567"],[,,"800(?:0\\d{3}|1\\d|[2-9])\\d{3}","\\d{7,10}",,,"80012345"],[,,"(?:40\\d{2}|900)\\d{4}","\\d{7,8}",,,"9001234"],[,,"NA","NA"],[,,"70[0-2]\\d{5}","\\d{8}",,,"70012345"],[,,"NA","NA"],"EE",372,"00",,,,,,,,[[,"([3-79]\\d{2})(\\d{4})","$1 $2",["[369]|4[3-8]|5(?:[0-2]|5[0-478]|6[45])|7[1-9]","[369]|4[3-8]|5(?:[02]|1(?:[0-8]|95)|5[0-478]|6(?:4[0-4]|5[1-589]))|7[1-9]"]],[,"(70)(\\d{2})(\\d{4})","$1 $2 $3",["70"]],[,"(8000)(\\d{3})(\\d{3})","$1 $2 $3",["800","8000"]],[,"([458]\\d{3})(\\d{3,4})",
"$1 $2",["40|5|8(?:00|[1-5])","40|5|8(?:00[1-9]|[1-5])"]]],,[,,"NA","NA"],,,[,,"1\\d{3,4}|800[2-9]\\d{3}","\\d{4,7}",,,"8002123"],[,,"1(?:2[01245]|3[0-6]|4[1-489]|5[0-59]|6[1-46-9]|7[0-27-9]|8[189]|9[012])\\d{1,2}","\\d{4,5}",,,"12123"],,,[,,"NA","NA"]],EG:[,[,,"1\\d{4,9}|[2456]\\d{8}|3\\d{7}|[89]\\d{8,9}","\\d{5,10}"],[,,"(?:1(?:3[23]\\d|5(?:[23]|9\\d))|2[2-4]\\d{2}|3\\d{2}|4(?:0[2-5]|[578][23]|64)\\d|5(?:0[2-7]|[57][23])\\d|6[24-689]3\\d|8(?:2[2-57]|4[26]|6[237]|8[2-4])\\d|9(?:2[27]|3[24]|52|6[2356]|7[2-4])\\d)\\d{5}|1[69]\\d{3}",
"\\d{5,9}",,,"234567890"],[,,"1(?:0[0-269]|1[0-245]|2[0-278])\\d{7}","\\d{10}",,,"1001234567"],[,,"800\\d{7}","\\d{10}",,,"8001234567"],[,,"900\\d{7}","\\d{10}",,,"9001234567"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],"EG",20,"00","0",,,"0",,,,[[,"(\\d)(\\d{7,8})","$1 $2",["[23]"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["1[012]|[89]00"],"0$1"],[,"(\\d{2})(\\d{6,7})","$1 $2",["1[35]|[4-6]|[89][2-9]"],"0$1"]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],EH:[,[,,"[5689]\\d{8}",
"\\d{9}"],[,,"528[89]\\d{5}","\\d{9}",,,"528812345"],[,,"6(?:0[0-8]|[12-79]\\d|8[017])\\d{6}","\\d{9}",,,"650123456"],[,,"80\\d{7}","\\d{9}",,,"801234567"],[,,"89\\d{7}","\\d{9}",,,"891234567"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],"EH",212,"00","0",,,"0",,,,,,[,,"NA","NA"],,"528[89]",[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],ER:[,[,,"[178]\\d{6}","\\d{6,7}"],[,,"1(?:1[12568]|20|40|55|6[146])\\d{4}|8\\d{6}","\\d{6,7}",,,"8370362"],[,,"17[1-3]\\d{4}|7\\d{6}","\\d{7}",,,"7123456"],[,,"NA","NA"],
[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],"ER",291,"00","0",,,"0",,,,[[,"(\\d)(\\d{3})(\\d{3})","$1 $2 $3",,"0$1"]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],ES:[,[,,"[5-9]\\d{8}","\\d{9}"],[,,"8(?:[13]0|[28][0-8]|[47][1-9]|5[01346-9]|6[0457-9])\\d{6}|9(?:[1238][0-8]\\d{6}|4[1-9]\\d{6}|5\\d{7}|6(?:[0-8]\\d{6}|9(?:0(?:[0-57-9]\\d{4}|6(?:0[0-8]|1[1-9]|[2-9]\\d)\\d{2})|[1-9]\\d{5}))|7(?:[124-9]\\d{2}|3(?:[0-8]\\d|9[1-9]))\\d{4})","\\d{9}",,,"810123456"],[,,"(?:6\\d{6}|7[1-4]\\d{5}|9(?:6906(?:09|10)|7390\\d{2}))\\d{2}",
"\\d{9}",,,"612345678"],[,,"[89]00\\d{6}","\\d{9}",,,"800123456"],[,,"80[367]\\d{6}","\\d{9}",,,"803123456"],[,,"90[12]\\d{6}","\\d{9}",,,"901123456"],[,,"70\\d{7}","\\d{9}",,,"701234567"],[,,"NA","NA"],"ES",34,"00",,,,,,,,[[,"([89]00)(\\d{3})(\\d{3})","$1 $2 $3",["[89]00"]],[,"([5-9]\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[568]|[79][0-8]"]]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"51\\d{7}","\\d{9}",,,"511234567"],,,[,,"NA","NA"]],ET:[,[,,"[1-59]\\d{8}","\\d{7,9}"],[,,"(?:11(?:1(?:1[124]|2[2-57]|3[1-5]|5[5-8]|8[6-8])|2(?:13|3[6-8]|5[89]|7[05-9]|8[2-6])|3(?:2[01]|3[0-289]|4[1289]|7[1-4]|87)|4(?:1[69]|3[2-49]|4[0-3]|6[5-8])|5(?:1[57]|44|5[0-4])|6(?:18|2[69]|4[5-7]|5[1-5]|6[0-59]|8[015-8]))|2(?:2(?:11[1-9]|22[0-7]|33\\d|44[1467]|66[1-68])|5(?:11[124-6]|33[2-8]|44[1467]|55[14]|66[1-3679]|77[124-79]|880))|3(?:3(?:11[0-46-8]|22[0-6]|33[0134689]|44[04]|55[0-6]|66[01467])|4(?:44[0-8]|55[0-69]|66[0-3]|77[1-5]))|4(?:6(?:22[0-24-7]|33[1-5]|44[13-69]|55[14-689]|660|88[1-4])|7(?:11[1-9]|22[1-9]|33[13-7]|44[13-6]|55[1-689]))|5(?:7(?:227|55[05]|(?:66|77)[14-8])|8(?:11[149]|22[013-79]|33[0-68]|44[013-8]|550|66[1-5]|77\\d)))\\d{4}",
"\\d{7,9}",,,"111112345"],[,,"9(?:[1-3]\\d|4[02467]|5[89])\\d{6}","\\d{9}",,,"911234567"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],"ET",251,"00","0",,,"0",,,,[[,"([1-59]\\d)(\\d{3})(\\d{4})","$1 $2 $3",,"0$1"]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],FI:[,[,,"1\\d{4,11}|[2-9]\\d{4,10}","\\d{5,12}"],[,,"1(?:[3569][1-8]\\d{3,9}|[47]\\d{5,10})|2[1-8]\\d{3,9}|3(?:[1-8]\\d{3,9}|9\\d{4,8})|[5689][1-8]\\d{3,9}","\\d{5,12}",,,"1312345678"],[,,"4\\d{5,10}|50\\d{4,8}",
"\\d{6,11}",,,"412345678"],[,,"800\\d{4,7}","\\d{7,10}",,,"8001234567"],[,,"[67]00\\d{5,6}","\\d{8,9}",,,"600123456"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],"FI",358,"00|99[049]","0",,,"0",,,,[[,"(\\d{3})(\\d{3,7})","$1 $2",["(?:[1-3]00|[6-8]0)"],"0$1"],[,"(116\\d{3})","$1",["116"],"$1"],[,"(\\d{2})(\\d{4,10})","$1 $2",["[14]|2[09]|50|7[135]"],"0$1"],[,"(\\d)(\\d{4,11})","$1 $2",["[25689][1-8]|3"],"0$1"]],,[,,"NA","NA"],1,,[,,"[13]00\\d{3,7}|2(?:0(?:0\\d{3,7}|2[023]\\d{1,6}|9[89]\\d{1,6}))|60(?:[12]\\d{5,6}|6\\d{7})|7(?:1\\d{7}|3\\d{8}|5[03-9]\\d{2,7})",
"\\d{5,10}",,,"100123"],[,,"[13]0\\d{4,8}|2(?:0(?:[016-8]\\d{3,7}|[2-59]\\d{2,7})|9\\d{4,8})|60(?:[12]\\d{5,6}|6\\d{7})|7(?:1\\d{7}|3\\d{8}|5[03-9]\\d{2,7})","\\d{5,10}",,,"10112345"],,,[,,"NA","NA"]],FJ:[,[,,"[36-9]\\d{6}|0\\d{10}","\\d{7}(?:\\d{4})?"],[,,"(?:3[0-5]|6[25-7]|8[58])\\d{5}","\\d{7}",,,"3212345"],[,,"(?:7[0-8]|8[034679]|9\\d)\\d{5}","\\d{7}",,,"7012345"],[,,"0800\\d{7}","\\d{11}",,,"08001234567"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],"FJ",679,"0(?:0|52)",,,,,,"00",
,[[,"(\\d{3})(\\d{4})","$1 $2",["[36-9]"]],[,"(\\d{4})(\\d{3})(\\d{4})","$1 $2 $3",["0"]]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],1,,[,,"NA","NA"]],FK:[,[,,"[2-7]\\d{4}","\\d{5}"],[,,"[2-47]\\d{4}","\\d{5}",,,"31234"],[,,"[56]\\d{4}","\\d{5}",,,"51234"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],"FK",500,"00",,,,,,,,,,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],FM:[,[,,"[39]\\d{6}","\\d{7}"],[,,"3[2357]0[1-9]\\d{3}|9[2-6]\\d{5}","\\d{7}",,,"3201234"],
[,,"3[2357]0[1-9]\\d{3}|9[2-7]\\d{5}","\\d{7}",,,"3501234"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],"FM",691,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2"]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],FO:[,[,,"[2-9]\\d{5}","\\d{6}"],[,,"(?:20|[3-4]\\d|8[19])\\d{4}","\\d{6}",,,"201234"],[,,"(?:2[1-9]|5\\d|7[1-79])\\d{4}","\\d{6}",,,"211234"],[,,"80[257-9]\\d{3}","\\d{6}",,,"802123"],[,,"90(?:[1345][15-7]|2[125-7]|99)\\d{2}","\\d{6}",,,"901123"],[,,"NA","NA"],
[,,"NA","NA"],[,,"(?:6[0-36]|88)\\d{4}","\\d{6}",,,"601234"],"FO",298,"00",,,,"(10(?:01|[12]0|88))",,,,[[,"(\\d{6})","$1",,,"$CC $1"]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],FR:[,[,,"[1-9]\\d{8}","\\d{9}"],[,,"[1-5]\\d{8}","\\d{9}",,,"123456789"],[,,"6\\d{8}|7(?:00\\d{6}|[3-9]\\d{7})","\\d{9}",,,"612345678"],[,,"80\\d{7}","\\d{9}",,,"801234567"],[,,"89[1-37-9]\\d{6}","\\d{9}",,,"891123456"],[,,"8(?:1[019]|2[0156]|84|90)\\d{6}","\\d{9}",,,"810123456"],[,,"NA","NA"],[,,"9\\d{8}",
"\\d{9}",,,"912345678"],"FR",33,"00","0",,,"0",,,,[[,"([1-79])(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4 $5",["[1-79]"],"0$1"],[,"(1\\d{2})(\\d{3})","$1 $2",["11"],"$1"],[,"(8\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["8"],"0 $1"]],[[,"([1-79])(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4 $5",["[1-79]"],"0$1"],[,"(8\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["8"],"0 $1"]],[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],GA:[,[,,"0?\\d{7}","\\d{7,8}"],[,,"01\\d{6}","\\d{8}",
,,"01441234"],[,,"0?[2-7]\\d{6}","\\d{7,8}",,,"06031234"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],"GA",241,"00",,,,,,,,[[,"(\\d)(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[2-7]"],"0$1"],[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["0"]]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],1,,[,,"NA","NA"]],GB:[,[,,"\\d{7,10}","\\d{4,10}"],[,,"2(?:0[01378]|3[0189]|4[017]|8[0-46-9]|9[012])\\d{7}|1(?:(?:1(?:3[0-48]|[46][0-4]|5[012789]|7[0-49]|8[01349])|21[0-7]|31[0-8]|[459]1\\d|61[0-46-9]))\\d{6}|1(?:2(?:0[024-9]|2[3-9]|3[3-79]|4[1-689]|[58][02-9]|6[0-4789]|7[013-9]|9\\d)|3(?:0\\d|[25][02-9]|3[02-579]|[468][0-46-9]|7[1235679]|9[24578])|4(?:0[03-9]|[28][02-5789]|[37]\\d|4[02-69]|5[0-8]|[69][0-79])|5(?:0[1235-9]|2[024-9]|3[015689]|4[02-9]|5[03-9]|6\\d|7[0-35-9]|8[0-468]|9[0-5789])|6(?:0[034689]|2[0-35689]|[38][013-9]|4[1-467]|5[0-69]|6[13-9]|7[0-8]|9[0124578])|7(?:0[0246-9]|2\\d|3[023678]|4[03-9]|5[0-46-9]|6[013-9]|7[0-35-9]|8[024-9]|9[02-9])|8(?:0[35-9]|2[1-5789]|3[02-578]|4[0-578]|5[124-9]|6[2-69]|7\\d|8[02-9]|9[02569])|9(?:0[02-589]|2[02-689]|3[1-5789]|4[2-9]|5[0-579]|6[234789]|7[0124578]|8\\d|9[2-57]))\\d{6}|1(?:2(?:0(?:46[1-4]|87[2-9])|545[1-79]|76(?:2\\d|3[1-8]|6[1-6])|9(?:7(?:2[0-4]|3[2-5])|8(?:2[2-8]|7[0-4789]|8[345])))|3(?:638[2-5]|647[23]|8(?:47[04-9]|64[015789]))|4(?:044[1-7]|20(?:2[23]|8\\d)|6(?:0(?:30|5[2-57]|6[1-8]|7[2-8])|140)|8(?:052|87[123]))|5(?:24(?:3[2-79]|6\\d)|276\\d|6(?:26[06-9]|686))|6(?:06(?:4\\d|7[4-79])|295[567]|35[34]\\d|47(?:24|61)|59(?:5[08]|6[67]|74)|955[0-4])|7(?:26(?:6[13-9]|7[0-7])|442\\d|50(?:2[0-3]|[3-68]2|76))|8(?:27[56]\\d|37(?:5[2-5]|8[239])|84(?:3[2-58]))|9(?:0(?:0(?:6[1-8]|85)|52\\d)|3583|4(?:66[1-8]|9(?:2[01]|81))|63(?:23|3[1-4])|9561))\\d{3}|176888[234678]\\d{2}|16977[23]\\d{3}",
"\\d{4,10}",,,"1212345678"],[,,"7(?:[1-4]\\d\\d|5(?:0[0-8]|[13-9]\\d|2[0-35-9])|7(?:0[1-9]|[1-7]\\d|8[02-9]|9[0-689])|8(?:[014-9]\\d|[23][0-8])|9(?:[04-9]\\d|1[02-9]|2[0-35-9]|3[0-689]))\\d{6}","\\d{10}",,,"7400123456"],[,,"80(?:0(?:1111|\\d{6,7})|8\\d{7})|500\\d{6}","\\d{7}(?:\\d{2,3})?",,,"8001234567"],[,,"(?:87[123]|9(?:[01]\\d|8[2349]))\\d{7}","\\d{10}",,,"9012345678"],[,,"8(?:4(?:5464\\d|[2-5]\\d{7})|70\\d{7})","\\d{7}(?:\\d{3})?",,,"8431234567"],[,,"70\\d{8}","\\d{10}",,,"7012345678"],[,,"56\\d{8}",
"\\d{10}",,,"5612345678"],"GB",44,"00","0"," x",,"0",,,,[[,"(\\d{2})(\\d{4})(\\d{4})","$1 $2 $3",["2|5[56]|7(?:0|6[013-9])","2|5[56]|7(?:0|6(?:[013-9]|2[0-35-9]))"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["1(?:1|\\d1)|3|9[018]"],"0$1"],[,"(\\d{5})(\\d{4,5})","$1 $2",["1(?:38|5[23]|69|76|94)","1(?:387|5(?:24|39)|697|768|946)","1(?:3873|5(?:242|39[456])|697[347]|768[347]|9467)"],"0$1"],[,"(1\\d{3})(\\d{5,6})","$1 $2",["1"],"0$1"],[,"(7\\d{3})(\\d{6})","$1 $2",["7(?:[1-5789]|62)","7(?:[1-5789]|624)"],
"0$1"],[,"(800)(\\d{4})","$1 $2",["800","8001","80011","800111","8001111"],"0$1"],[,"(845)(46)(4\\d)","$1 $2 $3",["845","8454","84546","845464"],"0$1"],[,"(8\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["8(?:4[2-5]|7[0-3])"],"0$1"],[,"(80\\d)(\\d{3})(\\d{4})","$1 $2 $3",["80"],"0$1"],[,"([58]00)(\\d{6})","$1 $2",["[58]00"],"0$1"]],,[,,"76(?:0[012]|2[356]|4[0134]|5[49]|6[0-369]|77|81|9[39])\\d{6}","\\d{10}",,,"7640123456"],1,,[,,"NA","NA"],[,,"(?:3[0347]|55)\\d{8}","\\d{10}",,,"5512345678"],,,[,,"NA","NA"]],
GD:[,[,,"[4589]\\d{9}","\\d{7}(?:\\d{3})?"],[,,"473(?:2(?:3[0-2]|69)|3(?:2[89]|86)|4(?:[06]8|3[5-9]|4[0-49]|5[5-79]|68|73|90)|63[68]|7(?:58|84)|800|938)\\d{4}","\\d{7}(?:\\d{3})?",,,"4732691234"],[,,"473(?:4(?:0[2-79]|1[04-9]|20|58)|5(?:2[01]|3[3-8])|901)\\d{4}","\\d{10}",,,"4734031234"],[,,"8(?:00|44|55|66|77|88)[2-9]\\d{6}","\\d{10}",,,"8002123456"],[,,"900[2-9]\\d{6}","\\d{10}",,,"9002123456"],[,,"NA","NA"],[,,"5(?:00|33|44|66|77)[2-9]\\d{6}","\\d{10}",,,"5002345678"],[,,"NA","NA"],"GD",1,"011",
"1",,,"1",,,,,,[,,"NA","NA"],,"473",[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],GE:[,[,,"[34578]\\d{8}","\\d{6,9}"],[,,"(?:3(?:[256]\\d|4[124-9]|7[0-4])|4(?:1\\d|2[2-7]|3[1-79]|4[2-8]|7[239]|9[1-7]))\\d{6}","\\d{6,9}",,,"322123456"],[,,"5(?:14|5[01578]|68|7[0147-9]|9[0-35-9])\\d{6}","\\d{9}",,,"555123456"],[,,"800\\d{6}","\\d{9}",,,"800123456"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"706\\d{6}","\\d{9}",,,"706123456"],"GE",995,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",
["[348]"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["7"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["5"],"$1"]],,[,,"NA","NA"],,,[,,"706\\d{6}","\\d{9}",,,"706123456"],[,,"NA","NA"],,,[,,"NA","NA"]],GF:[,[,,"[56]\\d{8}","\\d{9}"],[,,"594(?:10|2[012457-9]|3[0-57-9]|4[3-9]|5[7-9]|6[0-3]|9[014])\\d{4}","\\d{9}",,,"594101234"],[,,"694(?:[04][0-7]|1[0-5]|3[018]|[29]\\d)\\d{4}","\\d{9}",,,"694201234"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],"GF",594,"00",
"0",,,"0",,,,[[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",,"0$1"]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],GG:[,[,,"[135789]\\d{6,9}","\\d{6,10}"],[,,"1481\\d{6}","\\d{6,10}",,,"1481456789"],[,,"7(?:781|839|911)\\d{6}","\\d{10}",,,"7781123456"],[,,"80(?:0(?:1111|\\d{6,7})|8\\d{7})|500\\d{6}","\\d{7}(?:\\d{2,3})?",,,"8001234567"],[,,"(?:87[123]|9(?:[01]\\d|8[0-3]))\\d{7}","\\d{10}",,,"9012345678"],[,,"8(?:4(?:5464\\d|[2-5]\\d{7})|70\\d{7})","\\d{7}(?:\\d{3})?",,,"8431234567"],
[,,"70\\d{8}","\\d{10}",,,"7012345678"],[,,"56\\d{8}","\\d{10}",,,"5612345678"],"GG",44,"00","0"," x",,"0",,,,,,[,,"76(?:0[012]|2[356]|4[0134]|5[49]|6[0-369]|77|81|9[39])\\d{6}","\\d{10}",,,"7640123456"],,,[,,"NA","NA"],[,,"(?:3[0347]|55)\\d{8}","\\d{10}",,,"5512345678"],,,[,,"NA","NA"]],GH:[,[,,"[235]\\d{8}|8\\d{7}","\\d{7,9}"],[,,"3(?:0[237]\\d|[167](?:2[0-6]|7\\d)|2(?:2[0-5]|7\\d)|3(?:2[0-3]|7\\d)|4(?:2[013-9]|3[01]|7\\d)|5(?:2[0-7]|7\\d)|8(?:2[0-2]|7\\d)|9(?:20|7\\d))\\d{5}","\\d{7,9}",,,"302345678"],
[,,"(?:2[034678]\\d|5(?:[047]\\d|5[3-6]|6[01]))\\d{6}","\\d{9}",,,"231234567"],[,,"800\\d{5}","\\d{8}",,,"80012345"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],"GH",233,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[235]"],"0$1"],[,"(\\d{3})(\\d{5})","$1 $2",["8"],"0$1"]],,[,,"NA","NA"],,,[,,"800\\d{5}","\\d{8}",,,"80012345"],[,,"NA","NA"],,,[,,"NA","NA"]],GI:[,[,,"[2568]\\d{7}","\\d{8}"],[,,"2(?:00\\d|1(?:6[24-7]|9\\d)|2(?:00|2[2457]))\\d{4}","\\d{8}",,,"20012345"],[,
,"(?:5[46-8]|62)\\d{6}","\\d{8}",,,"57123456"],[,,"80\\d{6}","\\d{8}",,,"80123456"],[,,"8[1-689]\\d{6}","\\d{8}",,,"88123456"],[,,"87\\d{6}","\\d{8}",,,"87123456"],[,,"NA","NA"],[,,"NA","NA"],"GI",350,"00",,,,,,,,[[,"(\\d{3})(\\d{5})","$1 $2",["2"]]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],GL:[,[,,"[1-689]\\d{5}","\\d{6}"],[,,"(?:19|3[1-6]|6[14689]|8[14-79]|9\\d)\\d{4}","\\d{6}",,,"321000"],[,,"[245][2-9]\\d{4}","\\d{6}",,,"221234"],[,,"80\\d{4}","\\d{6}",,,"801234"],[,,"NA",
"NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"3[89]\\d{4}","\\d{6}",,,"381234"],"GL",299,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3"]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],GM:[,[,,"[2-9]\\d{6}","\\d{7}"],[,,"(?:4(?:[23]\\d{2}|4(?:1[024679]|[6-9]\\d))|5(?:54[0-7]|6(?:[67]\\d)|7(?:1[04]|2[035]|3[58]|48))|8\\d{3})\\d{3}","\\d{7}",,,"5661234"],[,,"[23679]\\d{6}","\\d{7}",,,"3012345"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],"GM",220,"00",,,,,,,,[[,
"(\\d{3})(\\d{4})","$1 $2"]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],GN:[,[,,"[367]\\d{7,8}","\\d{8,9}"],[,,"30(?:24|3[12]|4[1-35-7]|5[13]|6[189]|[78]1|9[1478])\\d{4}","\\d{8}",,,"30241234"],[,,"6[02356]\\d{7}","\\d{9}",,,"601123456"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"722\\d{6}","\\d{9}",,,"722123456"],"GN",224,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["3"]],[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[67]"]]],,[,,"NA",
"NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],GP:[,[,,"[56]\\d{8}","\\d{9}"],[,,"590(?:0[13468]|1[012]|2[0-68]|3[28]|4[0-8]|5[579]|6[0189]|70|8[0-689]|9\\d)\\d{4}","\\d{9}",,,"590201234"],[,,"690(?:0[0-7]|[1-9]\\d)\\d{4}","\\d{9}",,,"690301234"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],"GP",590,"00","0",,,"0",,,,[[,"([56]90)(\\d{2})(\\d{4})","$1 $2-$3",,"0$1"]],,[,,"NA","NA"],1,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],GQ:[,[,,"[23589]\\d{8}","\\d{9}"],[,,"3(?:3(?:3\\d[7-9]|[0-24-9]\\d[46])|5\\d{2}[7-9])\\d{4}",
"\\d{9}",,,"333091234"],[,,"(?:222|551)\\d{6}","\\d{9}",,,"222123456"],[,,"80\\d[1-9]\\d{5}","\\d{9}",,,"800123456"],[,,"90\\d[1-9]\\d{5}","\\d{9}",,,"900123456"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],"GQ",240,"00",,,,,,,,[[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[235]"]],[,"(\\d{3})(\\d{6})","$1 $2",["[89]"]]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],GR:[,[,,"[26-9]\\d{9}","\\d{10}"],[,,"2(?:1\\d{2}|2(?:2[1-46-9]|3[1-8]|4[1-7]|5[1-4]|6[1-8]|7[1-5]|[89][1-9])|3(?:1\\d|2[1-57]|[35][1-3]|4[13]|7[1-7]|8[124-6]|9[1-79])|4(?:1\\d|2[1-8]|3[1-4]|4[13-5]|6[1-578]|9[1-5])|5(?:1\\d|[29][1-4]|3[1-5]|4[124]|5[1-6])|6(?:1\\d|3[1245]|4[1-7]|5[13-9]|[269][1-6]|7[14]|8[1-5])|7(?:1\\d|2[1-5]|3[1-6]|4[1-7]|5[1-57]|6[135]|9[125-7])|8(?:1\\d|2[1-5]|[34][1-4]|9[1-57]))\\d{6}",
"\\d{10}",,,"2123456789"],[,,"69\\d{8}","\\d{10}",,,"6912345678"],[,,"800\\d{7}","\\d{10}",,,"8001234567"],[,,"90[19]\\d{7}","\\d{10}",,,"9091234567"],[,,"8(?:0[16]|12|25)\\d{7}","\\d{10}",,,"8011234567"],[,,"70\\d{8}","\\d{10}",,,"7012345678"],[,,"NA","NA"],"GR",30,"00",,,,,,,,[[,"([27]\\d)(\\d{4})(\\d{4})","$1 $2 $3",["21|7"]],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["2[2-9]1|[689]"]],[,"(2\\d{3})(\\d{6})","$1 $2",["2[2-9][02-9]"]]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],
GT:[,[,,"[2-7]\\d{7}|1[89]\\d{9}","\\d{8}(?:\\d{3})?"],[,,"[267][2-9]\\d{6}","\\d{8}",,,"22456789"],[,,"[345]\\d{7}","\\d{8}",,,"51234567"],[,,"18[01]\\d{8}","\\d{11}",,,"18001112222"],[,,"19\\d{9}","\\d{11}",,,"19001112222"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],"GT",502,"00",,,,,,,,[[,"(\\d{4})(\\d{4})","$1 $2",["[2-7]"]],[,"(\\d{4})(\\d{3})(\\d{4})","$1 $2 $3",["1"]]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],GU:[,[,,"[5689]\\d{9}","\\d{7}(?:\\d{3})?"],[,,"671(?:3(?:00|3[39]|4[349]|55|6[26])|4(?:56|7[1-9]|8[236-9])|5(?:55|6[2-5]|88)|6(?:3[2-578]|4[24-9]|5[34]|78|8[5-9])|7(?:[079]7|2[0167]|3[45]|8[789])|8(?:[2-5789]8|6[48])|9(?:2[29]|6[79]|7[179]|8[789]|9[78]))\\d{4}",
"\\d{7}(?:\\d{3})?",,,"6713001234"],[,,"671(?:3(?:00|3[39]|4[349]|55|6[26])|4(?:56|7[1-9]|8[236-9])|5(?:55|6[2-5]|88)|6(?:3[2-578]|4[24-9]|5[34]|78|8[5-9])|7(?:[079]7|2[0167]|3[45]|8[789])|8(?:[2-5789]8|6[48])|9(?:2[29]|6[79]|7[179]|8[789]|9[78]))\\d{4}","\\d{7}(?:\\d{3})?",,,"6713001234"],[,,"8(?:00|44|55|66|77|88)[2-9]\\d{6}","\\d{10}",,,"8002123456"],[,,"900[2-9]\\d{6}","\\d{10}",,,"9002123456"],[,,"NA","NA"],[,,"5(?:00|33|44|66|77)[2-9]\\d{6}","\\d{10}",,,"5002345678"],[,,"NA","NA"],"GU",1,"011",
"1",,,"1",,,1,,,[,,"NA","NA"],,"671",[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],GW:[,[,,"(?:4(?:0\\d{5}|4\\d{7})|9\\d{8})","\\d{7,9}"],[,,"443(?:2[0125]|3[1245]|4[12]|5[1-4]|70|9[1-467])\\d{4}","\\d{7,9}",,,"443201234"],[,,"9(?:55\\d|6(?:6\\d|9[012])|77\\d)\\d{5}","\\d{7,9}",,,"955012345"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"40\\d{5}","\\d{7,9}",,,"4012345"],"GW",245,"00",,,,,,,,[[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["44|9[567]"]],[,"(\\d{3})(\\d{4})","$1 $2",["40"]]],
,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],GY:[,[,,"[2-4679]\\d{6}","\\d{7}"],[,,"(?:2(?:1[6-9]|2[0-35-9]|3[1-4]|5[3-9]|6\\d|7[0-24-79])|3(?:2[25-9]|3\\d)|4(?:4[0-24]|5[56])|77[1-57])\\d{4}","\\d{7}",,,"2201234"],[,,"6\\d{6}","\\d{7}",,,"6091234"],[,,"(?:289|862)\\d{4}","\\d{7}",,,"2891234"],[,,"9008\\d{3}","\\d{7}",,,"9008123"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],"GY",592,"001",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2"]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA",
"NA"]],HK:[,[,,"[235-7]\\d{7}|8\\d{7,8}|9\\d{4,10}","\\d{5,11}"],[,,"(?:[23]\\d|58)\\d{6}","\\d{8}",,,"21234567"],[,,"(?:5[1-79]\\d|6\\d{2}|8[4-79]\\d|9(?:0[1-9]|[1-8]\\d))\\d{5}","\\d{8}",,,"51234567"],[,,"800\\d{6}","\\d{9}",,,"800123456"],[,,"900(?:[0-24-9]\\d{7}|3\\d{1,4})","\\d{5,11}",,,"90012345678"],[,,"NA","NA"],[,,"8[1-3]\\d{6}","\\d{8}",,,"81123456"],[,,"NA","NA"],"HK",852,"00",,,,,,,,[[,"(\\d{4})(\\d{4})","$1 $2",["[235-7]|[89](?:0[1-9]|[1-9])"]],[,"(800)(\\d{3})(\\d{3})","$1 $2 $3",["800"]],
[,"(900)(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3 $4",["900"]],[,"(900)(\\d{2,5})","$1 $2",["900"]]],,[,,"7\\d{7}","\\d{8}",,,"71234567"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],HN:[,[,,"[237-9]\\d{7}","\\d{8}"],[,,"2(?:2(?:0[019]|1[1-36]|[23]\\d|4[056]|5[57]|7[01389]|8[0146-9]|9[012])|4(?:2[3-59]|3[13-689]|4[0-68]|5[1-35])|5(?:4[3-5]|5\\d|6[56]|74)|6(?:[056]\\d|3[04]|4[0-378]|[78][0-8]|9[01])|7(?:6[46-9]|7[02-9]|8[34])|8(?:79|8[0-35789]|9[1-57-9]))\\d{4}","\\d{8}",,,"22123456"],[,,"[37-9]\\d{7}",
"\\d{8}",,,"91234567"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],"HN",504,"00",,,,,,,,[[,"(\\d{4})(\\d{4})","$1-$2"]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],HR:[,[,,"[1-7]\\d{5,8}|[89]\\d{6,11}","\\d{6,12}"],[,,"1\\d{7}|(?:2[0-3]|3[1-5]|4[02-47-9]|5[1-3])\\d{6,7}","\\d{6,9}",,,"12345678"],[,,"9(?:[1-9]\\d{6,10}|01\\d{6,9})","\\d{8,12}",,,"912345678"],[,,"80[01]\\d{4,7}","\\d{7,10}",,,"8001234567"],[,,"6(?:[01459]\\d{4,7})","\\d{6,9}",,,"611234"],
[,,"NA","NA"],[,,"7[45]\\d{4,7}","\\d{6,9}",,,"741234567"],[,,"NA","NA"],"HR",385,"00","0",,,"0",,,,[[,"(1)(\\d{4})(\\d{3})","$1 $2 $3",["1"],"0$1"],[,"(6[09])(\\d{4})(\\d{3})","$1 $2 $3",["6[09]"],"0$1"],[,"([67]2)(\\d{3})(\\d{3,4})","$1 $2 $3",["[67]2"],"0$1"],[,"([2-5]\\d)(\\d{3})(\\d{3,4})","$1 $2 $3",["[2-5]"],"0$1"],[,"(9\\d)(\\d{3})(\\d{3,4})","$1 $2 $3",["9"],"0$1"],[,"(9\\d)(\\d{4})(\\d{4})","$1 $2 $3",["9"],"0$1"],[,"(9\\d)(\\d{3,4})(\\d{3})(\\d{3})","$1 $2 $3 $4",["9"],"0$1"],[,"(\\d{2})(\\d{2})(\\d{2,3})",
"$1 $2 $3",["6[0145]|7"],"0$1"],[,"(\\d{2})(\\d{3,4})(\\d{3})","$1 $2 $3",["6[0145]|7"],"0$1"],[,"(80[01])(\\d{2})(\\d{2,3})","$1 $2 $3",["8"],"0$1"],[,"(80[01])(\\d{3,4})(\\d{3})","$1 $2 $3",["8"],"0$1"]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"[76]2\\d{6,7}","\\d{8,9}",,,"62123456"],,,[,,"NA","NA"]],HT:[,[,,"[2-489]\\d{7}","\\d{8}"],[,,"2(?:[248]\\d|5[1-5]|94)\\d{5}","\\d{8}",,,"22453300"],[,,"(?:3[1-9]\\d|4\\d{2}|9(?:8[0-35]|9[5-9]))\\d{5}","\\d{8}",,,"34101234"],[,,"8\\d{7}","\\d{8}",,,"80012345"],
[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"98[89]\\d{5}","\\d{8}",,,"98901234"],"HT",509,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{4})","$1 $2 $3"]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],HU:[,[,,"[1-9]\\d{7,8}","\\d{6,9}"],[,,"(?:1\\d|2(?:1\\d|[2-9])|3(?:[2-7]|8\\d)|4[24-9]|5[2-79]|6[23689]|7(?:1\\d|[2-9])|8[2-57-9]|9[2-69])\\d{6}","\\d{6,9}",,,"12345678"],[,,"(?:[257]0|3[01])\\d{7}","\\d{9}",,,"201234567"],[,,"80\\d{6}","\\d{8}",,,"80123456"],[,,"9[01]\\d{6}","\\d{8}",,,"90123456"],
[,,"40\\d{6}","\\d{8}",,,"40123456"],[,,"NA","NA"],[,,"NA","NA"],"HU",36,"00","06",,,"06",,,,[[,"(1)(\\d{3})(\\d{4})","$1 $2 $3",["1"],"($1)"],[,"(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["[2-9]"],"($1)"]],,[,,"NA","NA"],,,[,,"[48]0\\d{6}","\\d{8}",,,"80123456"],[,,"NA","NA"],,,[,,"NA","NA"]],ID:[,[,,"(?:[1-79]\\d{6,10}|8\\d{7,11})","\\d{5,12}"],[,,"2(?:1(?:14\\d{3}|[0-8]\\d{6,7}|500\\d{3}|9\\d{6})|2\\d{6,8}|4\\d{7,8})|(?:2(?:[35][1-4]|6[0-8]|7[1-6]|8\\d|9[1-8])|3(?:1|[25][1-8]|3[1-68]|4[1-3]|6[1-3568]|7[0-469]|8\\d)|4(?:0[1-589]|1[01347-9]|2[0-36-8]|3[0-24-68]|43|5[1-378]|6[1-5]|7[134]|8[1245])|5(?:1[1-35-9]|2[25-8]|3[124-9]|4[1-3589]|5[1-46]|6[1-8])|6(?:19?|[25]\\d|3[1-69]|4[1-6])|7(?:02|[125][1-9]|[36]\\d|4[1-8]|7[0-36-9])|9(?:0[12]|1[013-8]|2[0-479]|5[125-8]|6[23679]|7[159]|8[01346]))\\d{5,8}",
"\\d{5,11}",,,"612345678"],[,,"(?:2(?:1(?:3[145]|4[01]|5[1-469]|60|8[0359]|9\\d)|2(?:88|9[1256])|3[1-4]9|4(?:36|91)|5(?:1[349]|[2-4]9)|6[0-7]9|7(?:[1-36]9|4[39])|8[1-5]9|9[1-48]9)|3(?:19[1-3]|2[12]9|3[13]9|4(?:1[69]|39)|5[14]9|6(?:1[69]|2[89])|709)|4[13]19|5(?:1(?:19|8[39])|4[129]9|6[12]9)|6(?:19[12]|2(?:[23]9|77))|7(?:1[13]9|2[15]9|419|5(?:1[89]|29)|6[15]9|7[178]9))\\d{5,6}|8[1-35-9]\\d{7,10}","\\d{9,12}",,,"812345678"],[,,"177\\d{6,8}|800\\d{5,7}","\\d{8,11}",,,"8001234567"],[,,"809\\d{7}","\\d{10}",
,,"8091234567"],[,,"804\\d{7}","\\d{10}",,,"8041234567"],[,,"NA","NA"],[,,"NA","NA"],"ID",62,"0(?:0[1789]|10(?:00|1[67]))","0",,,"0",,,,[[,"(\\d{2})(\\d{5,8})","$1 $2",["2[124]|[36]1"],"(0$1)"],[,"(\\d{3})(\\d{5,8})","$1 $2",["[4579]|2[035-9]|[36][02-9]"],"(0$1)"],[,"(8\\d{2})(\\d{3,4})(\\d{3,5})","$1-$2-$3",["8[1-35-9]"],"0$1"],[,"(1)(500)(\\d{3})","$1 $2 $3",["15"],"$1"],[,"(177)(\\d{6,8})","$1 $2",["17"],"0$1"],[,"(800)(\\d{5,7})","$1 $2",["800"],"0$1"],[,"(804)(\\d{3})(\\d{4})","$1 $2 $3",["804"],
"0$1"],[,"(80\\d)(\\d)(\\d{3})(\\d{3})","$1 $2 $3 $4",["80[79]"],"0$1"]],,[,,"NA","NA"],,,[,,"8071\\d{6}","\\d{10}",,,"8071123456"],[,,"1500\\d{3}|8071\\d{6}","\\d{7,10}",,,"8071123456"],,,[,,"NA","NA"]],IE:[,[,,"[124-9]\\d{6,9}","\\d{5,10}"],[,,"1\\d{7,8}|2(?:1\\d{6,7}|3\\d{7}|[24-9]\\d{5})|4(?:0[24]\\d{5}|[1-469]\\d{7}|5\\d{6}|7\\d{5}|8[0-46-9]\\d{7})|5(?:0[45]\\d{5}|1\\d{6}|[23679]\\d{7}|8\\d{5})|6(?:1\\d{6}|[237-9]\\d{5}|[4-6]\\d{7})|7[14]\\d{7}|9(?:1\\d{6}|[04]\\d{7}|[35-9]\\d{5})","\\d{5,10}",
,,"2212345"],[,,"8(?:22\\d{6}|[35-9]\\d{7})","\\d{9}",,,"850123456"],[,,"1800\\d{6}","\\d{10}",,,"1800123456"],[,,"15(?:1[2-8]|[2-8]0|9[089])\\d{6}","\\d{10}",,,"1520123456"],[,,"18[59]0\\d{6}","\\d{10}",,,"1850123456"],[,,"700\\d{6}","\\d{9}",,,"700123456"],[,,"76\\d{7}","\\d{9}",,,"761234567"],"IE",353,"00","0",,,"0",,,,[[,"(1)(\\d{3,4})(\\d{4})","$1 $2 $3",["1"],"(0$1)"],[,"(\\d{2})(\\d{5})","$1 $2",["2[24-9]|47|58|6[237-9]|9[35-9]"],"(0$1)"],[,"(\\d{3})(\\d{5})","$1 $2",["40[24]|50[45]"],"(0$1)"],
[,"(48)(\\d{4})(\\d{4})","$1 $2 $3",["48"],"(0$1)"],[,"(818)(\\d{3})(\\d{3})","$1 $2 $3",["81"],"(0$1)"],[,"(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["[24-69]|7[14]"],"(0$1)"],[,"([78]\\d)(\\d{3,4})(\\d{4})","$1 $2 $3",["76|8[35-9]"],"0$1"],[,"(700)(\\d{3})(\\d{3})","$1 $2 $3",["70"],"0$1"],[,"(\\d{4})(\\d{3})(\\d{3})","$1 $2 $3",["1(?:8[059]|5)","1(?:8[059]0|5)"],"$1"]],,[,,"NA","NA"],,,[,,"18[59]0\\d{6}","\\d{10}",,,"1850123456"],[,,"818\\d{6}","\\d{9}",,,"818123456"],,,[,,"8[35-9]\\d{8}","\\d{10}",
,,"8501234567"]],IL:[,[,,"[17]\\d{6,9}|[2-589]\\d{3}(?:\\d{3,6})?|6\\d{3}","\\d{4,10}"],[,,"[2-489]\\d{7}","\\d{7,8}",,,"21234567"],[,,"5(?:[02-47-9]\\d{2}|5(?:01|2[23]|3[2-4]|4[45]|5[5689]|6[67]|7[0178]|[89][6-9])|6[2-9]\\d)\\d{5}","\\d{9}",,,"501234567"],[,,"1(?:80[019]\\d{3}|255)\\d{3}","\\d{7,10}",,,"1800123456"],[,,"1(?:212|(?:9(?:0[01]|19)|200)\\d{2})\\d{4}","\\d{8,10}",,,"1919123456"],[,,"1700\\d{6}","\\d{10}",,,"1700123456"],[,,"NA","NA"],[,,"7(?:18\\d|2[23]\\d|3[237]\\d|47\\d|6(?:5\\d|8[0168])|7\\d{2}|8(?:2\\d|33|55|77|81)|9[29]\\d)\\d{5}",
"\\d{9}",,,"771234567"],"IL",972,"0(?:0|1[2-9])","0",,,"0",,,,[[,"([2-489])(\\d{3})(\\d{4})","$1-$2-$3",["[2-489]"],"0$1"],[,"([57]\\d)(\\d{3})(\\d{4})","$1-$2-$3",["[57]"],"0$1"],[,"(1)([7-9]\\d{2})(\\d{3})(\\d{3})","$1-$2-$3-$4",["1[7-9]"],"$1"],[,"(1255)(\\d{3})","$1-$2",["125"],"$1"],[,"(1200)(\\d{3})(\\d{3})","$1-$2-$3",["120"],"$1"],[,"(1212)(\\d{2})(\\d{2})","$1-$2-$3",["121"],"$1"],[,"(1599)(\\d{6})","$1-$2",["15"],"$1"],[,"(\\d{4})","*$1",["[2-689]"],"$1"]],,[,,"NA","NA"],,,[,,"1700\\d{6}|[2-689]\\d{3}",
"\\d{4,10}",,,"1700123456"],[,,"[2-689]\\d{3}|1599\\d{6}","\\d{4}(?:\\d{6})?",,,"1599123456"],,,[,,"NA","NA"]],IM:[,[,,"[135789]\\d{6,9}","\\d{6,10}"],[,,"1624\\d{6}","\\d{6,10}",,,"1624456789"],[,,"7[569]24\\d{6}","\\d{10}",,,"7924123456"],[,,"808162\\d{4}","\\d{10}",,,"8081624567"],[,,"(?:872299|90[0167]624)\\d{4}","\\d{10}",,,"9016247890"],[,,"8(?:4(?:40[49]06|5624\\d)|70624\\d)\\d{3}","\\d{10}",,,"8456247890"],[,,"70\\d{8}","\\d{10}",,,"7012345678"],[,,"56\\d{8}","\\d{10}",,,"5612345678"],"IM",
44,"00","0"," x",,"0",,,,,,[,,"NA","NA"],,,[,,"NA","NA"],[,,"3(?:08162\\d|3\\d{5}|4(?:40[49]06|5624\\d)|7(?:0624\\d|2299\\d))\\d{3}|55\\d{8}","\\d{10}",,,"5512345678"],,,[,,"NA","NA"]],IN:[,[,,"1\\d{7,12}|[2-9]\\d{9,10}","\\d{6,13}"],[,,"(?:11|2[02]|33|4[04]|79)[2-7]\\d{7}|80[2-467]\\d{7}|(?:1(?:2[0-249]|3[0-25]|4[145]|[59][14]|6[014]|7[1257]|8[01346])|2(?:1[257]|3[013]|4[01]|5[0137]|6[0158]|78|8[1568]|9[14])|3(?:26|4[1-3]|5[34]|6[01489]|7[02-46]|8[159])|4(?:1[36]|2[1-47]|3[15]|5[12]|6[0-26-9]|7[0-24-9]|8[013-57]|9[014-7])|5(?:1[025]|[36][25]|22|4[28]|5[12]|[78]1|9[15])|6(?:12|[2345]1|57|6[13]|7[14]|80)|7(?:12|2[14]|3[134]|4[47]|5[15]|[67]1|88)|8(?:16|2[014]|3[126]|6[136]|7[078]|8[34]|91))[2-7]\\d{6}|(?:(?:1(?:2[35-8]|3[346-9]|4[236-9]|[59][0235-9]|6[235-9]|7[34689]|8[257-9])|2(?:1[134689]|3[24-8]|4[2-8]|5[25689]|6[2-4679]|7[13-79]|8[2-479]|9[235-9])|3(?:01|1[79]|2[1-5]|4[25-8]|5[125689]|6[235-7]|7[157-9]|8[2-467])|4(?:1[14578]|2[5689]|3[2-467]|5[4-7]|6[35]|73|8[2689]|9[2389])|5(?:[16][146-9]|2[14-8]|3[1346]|4[14-69]|5[46]|7[2-4]|8[2-8]|9[246])|6(?:1[1358]|2[2457]|3[2-4]|4[235-7]|[57][2-689]|6[24-578]|8[1-6])|8(?:1[1357-9]|2[235-8]|3[03-57-9]|4[0-24-9]|5\\d|6[2457-9]|7[1-6]|8[1256]|9[2-4]))\\d|7(?:(?:1[013-9]|2[0235-9]|3[2679]|4[1-35689]|5[2-46-9]|[67][02-9]|9\\d)\\d|8(?:2[0-6]|[013-8]\\d)))[2-7]\\d{5}",
"\\d{6,10}",,,"1123456789"],[,,"(?:7(?:0\\d{2}|2(?:[0235679]\\d|[14][017-9]|8[0-59]|9[389])|3(?:[058]\\d|1[09]|7[3679]|9[689])|4(?:0[1-9]|1[015-9]|[29][89]|39|8[389])|5(?:[034678]\\d|2[03-9]|5[017-9]|9[7-9])|6(?:0[0-47]|1[0-257-9]|2[0-4]|3[19]|5[4589]|[6-9]\\d)|7(?:0[2-9]|[1-79]\\d|8[1-9])|8[0-79]\\d)|8(?:0(?:[01589]\\d|6[67])|1(?:[02-57-9]\\d|1[0135-9])|2(?:[236-9]\\d|5[1-9])|3(?:[0357-9]\\d|4[1-9])|[45]\\d{2}|6[02457-9]\\d|7(?:07|[1-69]\\d)|8(?:[0-26-9]\\d|44|5[2-9])|9(?:[035-9]\\d|2[2-9]|4[0-8]))|9\\d{3})\\d{6}",
"\\d{10}",,,"9123456789"],[,,"1(?:600\\d{6}|80(?:0\\d{4,9}|3\\d{9}))","\\d{8,13}",,,"1800123456"],[,,"186[12]\\d{9}","\\d{13}",,,"1861123456789"],[,,"1860\\d{7}","\\d{11}",,,"18603451234"],[,,"NA","NA"],[,,"NA","NA"],"IN",91,"00","0",,,"0",,,,[[,"(\\d{5})(\\d{5})","$1 $2",["7(?:[0257]|3[0157-9]|4[0-389]|6[0-35-9]|8[0-79])|8(?:0[015689]|1[0-57-9]|2[2356-9]|3[0-57-9]|[45]|6[02457-9]|7[01-69]|8[0-24-9]|9[02-9])|9","7(?:0|2(?:[0235679]|[14][017-9]|8[0-59]|9[389])|3(?:[058]|1[09]|7[3679]|9[689])|4(?:0[1-9]|1[015-9]|[29][89]|39|8[389])|5(?:[034678]|2[03-9]|5[017-9]|9[7-9])|6(?:0[0-47]|1[0-257-9]|2[0-4]|3[19]|5[4589]|[6-9])|7(?:0[2-9]|[1-79]|8[1-9])|8[0-79])|8(?:0(?:[01589]|6[67])|1(?:[02-57-9]|1[0135-9])|2(?:[236-9]|5[1-9])|3(?:[0357-9]|4[1-9])|[45]|6[02457-9]|7(?:07|[1-69])|8(?:[0-26-9]|44|5[2-9])|9(?:[035-9]|2[2-9]|4[0-8]))|9"],
"0$1",,1],[,"(\\d{2})(\\d{4})(\\d{4})","$1 $2 $3",["11|2[02]|33|4[04]|79|80[2-46]"],"0$1",,1],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["1(?:2[0-249]|3[0-25]|4[145]|[569][14]|7[1257]|8[1346]|[68][1-9])|2(?:1[257]|3[013]|4[01]|5[0137]|6[0158]|78|8[1568]|9[14])|3(?:26|4[1-3]|5[34]|6[01489]|7[02-46]|8[159])|4(?:1[36]|2[1-47]|3[15]|5[12]|6[0-26-9]|7[0-24-9]|8[013-57]|9[014-7])|5(?:1[025]|[36][25]|22|4[28]|5[12]|[78]1|9[15])|6(?:12|[2345]1|57|6[13]|7[14]|80)"],"0$1",,1],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",
["7(?:12|2[14]|3[134]|4[47]|5[15]|[67]1|88)","7(?:12|2[14]|3[134]|4[47]|5(?:1|5[2-6])|[67]1|88)"],"0$1",,1],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["8(?:16|2[014]|3[126]|6[136]|7[078]|8[34]|91)"],"0$1",,1],[,"(\\d{4})(\\d{3})(\\d{3})","$1 $2 $3",["1(?:[23579]|[468][1-9])|[2-8]"],"0$1",,1],[,"(1600)(\\d{2})(\\d{4})","$1 $2 $3",["160","1600"],"$1",,1],[,"(1800)(\\d{4,5})","$1 $2",["180","1800"],"$1",,1],[,"(18[06]0)(\\d{2,4})(\\d{4})","$1 $2 $3",["18[06]","18[06]0"],"$1",,1],[,"(140)(\\d{3})(\\d{4})",
"$1 $2 $3",["140"],"$1",,1],[,"(\\d{4})(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3 $4",["18[06]","18(?:0[03]|6[12])"],"$1",,1]],,[,,"NA","NA"],,,[,,"1(?:600\\d{6}|8(?:0(?:0\\d{4,9}|3\\d{9})|6(?:0\\d{7}|[12]\\d{9})))","\\d{8,13}",,,"1800123456"],[,,"140\\d{7}","\\d{10}",,,"1409305260"],,,[,,"NA","NA"]],IO:[,[,,"3\\d{6}","\\d{7}"],[,,"37\\d{5}","\\d{7}",,,"3709100"],[,,"38\\d{5}","\\d{7}",,,"3801234"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],"IO",246,"00",,,,,,,,[[,"(\\d{3})(\\d{4})",
"$1 $2"]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],IQ:[,[,,"[1-7]\\d{7,9}","\\d{6,10}"],[,,"1\\d{7}|(?:2[13-5]|3[02367]|4[023]|5[03]|6[026])\\d{6,7}","\\d{6,9}",,,"12345678"],[,,"7[3-9]\\d{8}","\\d{10}",,,"7912345678"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],"IQ",964,"00","0",,,"0",,,,[[,"(1)(\\d{3})(\\d{4})","$1 $2 $3",["1"],"0$1"],[,"([2-6]\\d)(\\d{3})(\\d{3,4})","$1 $2 $3",["[2-6]"],"0$1"],[,"(7\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["7"],"0$1"]],
,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],IR:[,[,,"[1-8]\\d{9}|9(?:[0-4]\\d{8}|9\\d{2,8})","\\d{4,10}"],[,,"(?:1[137]|2[13-68]|3[1458]|4[145]|5[146-8]|6[146]|7[1467]|8[13467])\\d{8}","\\d{10}",,,"2123456789"],[,,"9(?:0[1-3]|[13]\\d|2[0-2]|90)\\d{7}","\\d{10}",,,"9123456789"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"(?:[2-6]0\\d|993)\\d{7}","\\d{10}",,,"9932123456"],"IR",98,"00","0",,,"0",,,,[[,"(21)(\\d{3,5})","$1 $2",["21"],"0$1"],[,"(\\d{2})(\\d{4})(\\d{4})",
"$1 $2 $3",["[1-8]"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3,4})","$1 $2 $3",["9"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{2,3})","$1 $2 $3",["9"],"0$1"],[,"(\\d{3})(\\d{3})","$1 $2",["9"],"0$1"]],,[,,"943\\d{7}","\\d{10}",,,"9432123456"],,,[,,"NA","NA"],[,,"9990\\d{0,6}","\\d{4,10}",,,"9990123456"],,,[,,"NA","NA"]],IS:[,[,,"[4-9]\\d{6}|38\\d{7}","\\d{7,9}"],[,,"(?:4(?:1[0-24-6]|2[0-7]|[37][0-8]|4[0-245]|5[0-68]|6\\d|8[0-36-8])|5(?:05|[156]\\d|2[02578]|3[013-79]|4[03-7]|7[0-2578]|8[0-35-9]|9[013-689])|87[23])\\d{4}",
"\\d{7}",,,"4101234"],[,,"38[589]\\d{6}|(?:6(?:1[1-8]|2[056]|3[089]|4[0167]|5[0159]|[67][0-69]|9\\d)|7(?:5[057]|6[0-2]|[78]\\d)|8(?:2[0-59]|3[0-4]|[469]\\d|5[1-9]))\\d{4}","\\d{7,9}",,,"6111234"],[,,"800\\d{4}","\\d{7}",,,"8001234"],[,,"90\\d{5}","\\d{7}",,,"9011234"],[,,"NA","NA"],[,,"NA","NA"],[,,"49\\d{5}","\\d{7}",,,"4921234"],"IS",354,"1(?:0(?:01|10|20)|100)|00",,,,,,"00",,[[,"(\\d{3})(\\d{4})","$1 $2",["[4-9]"]],[,"(3\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["3"]]],,[,,"NA","NA"],,,[,,"NA","NA"],
[,,"809\\d{4}","\\d{7}",,,"8091234"],,,[,,"(?:6(?:2[1-478]|49|8\\d)|8(?:7[0189]|80)|95[48])\\d{4}","\\d{7}",,,"6211234"]],IT:[,[,,"[01589]\\d{5,10}|3(?:[12457-9]\\d{8}|[36]\\d{7,9})","\\d{6,11}"],[,,"0(?:[26]\\d{4,9}|(?:1(?:[0159]\\d|[27][1-5]|31|4[1-4]|6[1356]|8[2-57])|3(?:[0159]\\d|2[1-4]|3[12]|[48][1-6]|6[2-59]|7[1-7])|4(?:[0159]\\d|[23][1-9]|4[245]|6[1-5]|7[1-4]|81)|5(?:[0159]\\d|2[1-5]|3[2-6]|4[1-79]|6[4-6]|7[1-578]|8[3-8])|7(?:[0159]\\d|2[12]|3[1-7]|4[2346]|6[13569]|7[13-6]|8[1-59])|8(?:[0159]\\d|2[34578]|3[1-356]|[6-8][1-5])|9(?:[0159]\\d|[238][1-5]|4[12]|6[1-8]|7[1-6]))\\d{2,7})",
"\\d{6,11}",,,"0212345678"],[,,"3(?:[12457-9]\\d{8}|6\\d{7,8}|3\\d{7,9})","\\d{9,11}",,,"3123456789"],[,,"80(?:0\\d{6}|3\\d{3})","\\d{6,9}",,,"800123456"],[,,"0878\\d{5}|1(?:44|6[346])\\d{6}|89(?:2\\d{3}|4(?:[0-4]\\d{2}|[5-9]\\d{4})|5(?:[0-4]\\d{2}|[5-9]\\d{6})|9\\d{6})","\\d{6,10}",,,"899123456"],[,,"84(?:[08]\\d{6}|[17]\\d{3})","\\d{6,9}",,,"848123456"],[,,"1(?:78\\d|99)\\d{6}","\\d{9,10}",,,"1781234567"],[,,"55\\d{8}","\\d{10}",,,"5512345678"],"IT",39,"00",,,,,,,,[[,"(\\d{2})(\\d{3,4})(\\d{4})",
"$1 $2 $3",["0[26]|55"]],[,"(0[26])(\\d{4})(\\d{5})","$1 $2 $3",["0[26]"]],[,"(0[26])(\\d{4,6})","$1 $2",["0[26]"]],[,"(0\\d{2})(\\d{3,4})(\\d{4})","$1 $2 $3",["0[13-57-9][0159]"]],[,"(\\d{3})(\\d{3,6})","$1 $2",["0[13-57-9][0159]|8(?:03|4[17]|9[245])","0[13-57-9][0159]|8(?:03|4[17]|9(?:2|[45][0-4]))"]],[,"(0\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["0[13-57-9][2-46-8]"]],[,"(0\\d{3})(\\d{2,6})","$1 $2",["0[13-57-9][2-46-8]"]],[,"(\\d{3})(\\d{3})(\\d{3,4})","$1 $2 $3",["[13]|8(?:00|4[08]|9[59])","[13]|8(?:00|4[08]|9(?:5[5-9]|9))"]],
[,"(\\d{4})(\\d{4})","$1 $2",["894","894[5-9]"]],[,"(\\d{3})(\\d{4})(\\d{4})","$1 $2 $3",["3"]]],,[,,"NA","NA"],1,,[,,"848\\d{6}","\\d{9}",,,"848123456"],[,,"NA","NA"],1,,[,,"NA","NA"]],JE:[,[,,"[135789]\\d{6,9}","\\d{6,10}"],[,,"1534\\d{6}","\\d{6,10}",,,"1534456789"],[,,"7(?:509|7(?:00|97)|829|937)\\d{6}","\\d{10}",,,"7797123456"],[,,"80(?:07(?:35|81)|8901)\\d{4}","\\d{10}",,,"8007354567"],[,,"(?:871206|90(?:066[59]|1810|71(?:07|55)))\\d{4}","\\d{10}",,,"9018105678"],[,,"8(?:4(?:4(?:4(?:05|42|69)|703)|5(?:041|800))|70002)\\d{4}",
"\\d{10}",,,"8447034567"],[,,"701511\\d{4}","\\d{10}",,,"7015115678"],[,,"56\\d{8}","\\d{10}",,,"5612345678"],"JE",44,"00","0"," x",,"0",,,,,,[,,"76(?:0[012]|2[356]|4[0134]|5[49]|6[0-369]|77|81|9[39])\\d{6}","\\d{10}",,,"7640123456"],,,[,,"NA","NA"],[,,"3(?:0(?:07(?:35|81)|8901)|3\\d{4}|4(?:4(?:4(?:05|42|69)|703)|5(?:041|800))|7(?:0002|1206))\\d{4}|55\\d{8}","\\d{10}",,,"5512345678"],,,[,,"NA","NA"]],JM:[,[,,"[589]\\d{9}","\\d{7}(?:\\d{3})?"],[,,"876(?:5(?:0[12]|1[0-468]|2[35]|63)|6(?:0[1-3579]|1[027-9]|[23]\\d|40|5[06]|6[2-589]|7[05]|8[04]|9[4-9])|7(?:0[2-689]|[1-6]\\d|8[056]|9[45])|9(?:0[1-8]|1[02378]|[2-8]\\d|9[2-468]))\\d{4}",
"\\d{7}(?:\\d{3})?",,,"8765123456"],[,,"876(?:2[16-9]\\d|[348]\\d{2}|5(?:0[3-9]|27|6[0-24-9]|[3-578]\\d)|7(?:0[07]|7\\d|8[1-47-9]|9[0-36-9])|9(?:[01]9|9[0579]))\\d{4}","\\d{10}",,,"8762101234"],[,,"8(?:00|44|55|66|77|88)[2-9]\\d{6}","\\d{10}",,,"8002123456"],[,,"900[2-9]\\d{6}","\\d{10}",,,"9002123456"],[,,"NA","NA"],[,,"5(?:00|33|44|66|77)[2-9]\\d{6}","\\d{10}",,,"5002345678"],[,,"NA","NA"],"JM",1,"011","1",,,"1",,,,,,[,,"NA","NA"],,"876",[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],JO:[,[,,"[235-9]\\d{7,8}",
"\\d{8,9}"],[,,"(?:2(?:6(?:2[0-35-9]|3[0-57-8]|4[24-7]|5[0-24-8]|[6-8][023]|9[0-3])|7(?:0[1-79]|10|2[014-7]|3[0-689]|4[019]|5[0-3578]))|32(?:0[1-69]|1[1-35-7]|2[024-7]|3\\d|4[0-3]|[57][023]|6[03])|53(?:0[0-3]|[13][023]|2[0-59]|49|5[0-35-9]|6[15]|7[45]|8[1-6]|9[0-36-9])|6(?:2[50]0|3(?:00|33)|4(?:0[0125]|1[2-7]|2[0569]|[38][07-9]|4[025689]|6[0-589]|7\\d|9[0-2])|5(?:[01][056]|2[034]|3[0-57-9]|4[17-8]|5[0-69]|6[0-35-9]|7[1-379]|8[0-68]|9[02-39]))|87(?:[02]0|7[08]|90))\\d{4}","\\d{8}",,,"62001234"],[,
,"7(?:55|7[025-9]|8[015-9]|9[0-25-9])\\d{6}","\\d{9}",,,"790123456"],[,,"80\\d{6}","\\d{8}",,,"80012345"],[,,"900\\d{5}","\\d{8}",,,"90012345"],[,,"85\\d{6}","\\d{8}",,,"85012345"],[,,"70\\d{7}","\\d{9}",,,"700123456"],[,,"NA","NA"],"JO",962,"00","0",,,"0",,,,[[,"(\\d)(\\d{3})(\\d{4})","$1 $2 $3",["[2356]|87"],"(0$1)"],[,"(7)(\\d{4})(\\d{4})","$1 $2 $3",["7[457-9]"],"0$1"],[,"(\\d{3})(\\d{5,6})","$1 $2",["70|8[0158]|9"],"0$1"]],,[,,"74(?:66|77)\\d{5}","\\d{9}",,,"746612345"],,,[,,"NA","NA"],[,,"8(?:10|8\\d)\\d{5}",
"\\d{8}",,,"88101234"],,,[,,"NA","NA"]],JP:[,[,,"[1-9]\\d{8,9}|00(?:[36]\\d{7,14}|7\\d{5,7}|8\\d{7})","\\d{8,17}"],[,,"(?:1(?:1[235-8]|2[3-6]|3[3-9]|4[2-6]|[58][2-8]|6[2-7]|7[2-9]|9[1-9])|2[2-9]\\d|[36][1-9]\\d|4(?:6[02-8]|[2-578]\\d|9[2-59])|5(?:6[1-9]|7[2-8]|[2-589]\\d)|7(?:3[4-9]|4[02-9]|[25-9]\\d)|8(?:3[2-9]|4[5-9]|5[1-9]|8[03-9]|[2679]\\d)|9(?:[679][1-9]|[2-58]\\d))\\d{6}","\\d{9}",,,"312345678"],[,,"[7-9]0[1-9]\\d{7}","\\d{10}",,,"9012345678"],[,,"120\\d{6}|800\\d{7}|00(?:37\\d{6,13}|66\\d{6,13}|777(?:[01]\\d{2}|5\\d{3}|8\\d{4})|882[1245]\\d{4})",
"\\d{8,17}",,,"120123456"],[,,"990\\d{6}","\\d{9}",,,"990123456"],[,,"NA","NA"],[,,"60\\d{7}","\\d{9}",,,"601234567"],[,,"50[1-9]\\d{7}","\\d{10}",,,"5012345678"],"JP",81,"010","0",,,"0",,,,[[,"(\\d{3})(\\d{3})(\\d{3})","$1-$2-$3",["(?:12|57|99)0"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{4})","$1-$2-$3",["800"],"0$1"],[,"(\\d{4})(\\d{4})","$1-$2",["0077"],"$1"],[,"(\\d{4})(\\d{2})(\\d{3,4})","$1-$2-$3",["0077"],"$1"],[,"(\\d{4})(\\d{2})(\\d{4})","$1-$2-$3",["0088"],"$1"],[,"(\\d{4})(\\d{3})(\\d{3,4})","$1-$2-$3",
["00(?:37|66)"],"$1"],[,"(\\d{4})(\\d{4})(\\d{4,5})","$1-$2-$3",["00(?:37|66)"],"$1"],[,"(\\d{4})(\\d{5})(\\d{5,6})","$1-$2-$3",["00(?:37|66)"],"$1"],[,"(\\d{4})(\\d{6})(\\d{6,7})","$1-$2-$3",["00(?:37|66)"],"$1"],[,"(\\d{2})(\\d{4})(\\d{4})","$1-$2-$3",["[2579]0|80[1-9]"],"0$1"],[,"(\\d{4})(\\d)(\\d{4})","$1-$2-$3",["1(?:26|3[79]|4[56]|5[4-68]|6[3-5])|5(?:76|97)|499|746|8(?:3[89]|63|47|51)|9(?:49|80|9[16])","1(?:267|3(?:7[247]|9[278])|4(?:5[67]|66)|5(?:47|58|64|8[67])|6(?:3[245]|48|5[4-68]))|5(?:76|97)9|499[2468]|7468|8(?:3(?:8[78]|96)|636|477|51[24])|9(?:496|802|9(?:1[23]|69))",
"1(?:267|3(?:7[247]|9[278])|4(?:5[67]|66)|5(?:47|58|64|8[67])|6(?:3[245]|48|5[4-68]))|5(?:769|979[2-69])|499[2468]|7468|8(?:3(?:8[78]|96[2457-9])|636[2-57-9]|477|51[24])|9(?:496|802|9(?:1[23]|69))"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{4})","$1-$2-$3",["1(?:2[3-6]|3[3-9]|4[2-6]|5[2-8]|[68][2-7]|7[2-689]|9[1-578])|2(?:2[03-689]|3[3-58]|4[0-468]|5[04-8]|6[013-8]|7[06-9]|8[02-57-9]|9[13])|4(?:2[28]|3[689]|6[035-7]|7[05689]|80|9[3-5])|5(?:3[1-36-9]|4[4578]|5[013-8]|6[1-9]|7[2-8]|8[14-7]|9[4-9])|7(?:2[15]|3[5-9]|4[02-9]|6[135-8]|7[0-4689]|9[014-9])|8(?:2[49]|3[3-8]|4[5-8]|5[2-9]|6[35-9]|7[579]|8[03-579]|9[2-8])|9(?:[23]0|4[02-46-9]|5[024-79]|6[4-9]|7[2-47-9]|8[02-7]|9[3-7])",
"1(?:2[3-6]|3[3-9]|4[2-6]|5(?:[236-8]|[45][2-69])|[68][2-7]|7[2-689]|9[1-578])|2(?:2(?:[04-689]|3[23])|3[3-58]|4[0-468]|5(?:5[78]|7[2-4]|[0468][2-9])|6(?:[0135-8]|4[2-5])|7(?:[0679]|8[2-7])|8(?:[024578]|3[25-9]|9[6-9])|9(?:11|3[2-4]))|4(?:2(?:2[2-9]|8[237-9])|3[689]|6[035-7]|7(?:[059][2-8]|[68])|80|9[3-5])|5(?:3[1-36-9]|4[4578]|5[013-8]|6[1-9]|7[2-8]|8[14-7]|9(?:[89][2-8]|[4-7]))|7(?:2[15]|3[5-9]|4[02-9]|6[135-8]|7[0-4689]|9(?:[017-9]|4[6-8]|5[2-478]|6[2-589]))|8(?:2(?:4[4-8]|9[2-8])|3(?:7[2-6]|[3-6][2-9]|8[2-5])|4[5-8]|5[2-9]|6(?:[37]|5[4-7]|6[2-9]|8[2-8]|9[236-9])|7[579]|8[03-579]|9[2-8])|9(?:[23]0|4[02-46-9]|5[024-79]|6[4-9]|7[2-47-9]|8[02-7]|9(?:3[34]|[4-7]))",
"1(?:2[3-6]|3[3-9]|4[2-6]|5(?:[236-8]|[45][2-69])|[68][2-7]|7[2-689]|9[1-578])|2(?:2(?:[04-689]|3[23])|3[3-58]|4[0-468]|5(?:5[78]|7[2-4]|[0468][2-9])|6(?:[0135-8]|4[2-5])|7(?:[0679]|8[2-7])|8(?:[024578]|3[25-9]|9[6-9])|9(?:11|3[2-4]))|4(?:2(?:2[2-9]|8[237-9])|3[689]|6[035-7]|7(?:[059][2-8]|[68])|80|9[3-5])|5(?:3[1-36-9]|4[4578]|5[013-8]|6[1-9]|7[2-8]|8[14-7]|9(?:[89][2-8]|[4-7]))|7(?:2[15]|3[5-9]|4[02-9]|6[135-8]|7[0-4689]|9(?:[017-9]|4[6-8]|5[2-478]|6[2-589]))|8(?:2(?:4[4-8]|9(?:[3578]|20|4[04-9]|6[56]))|3(?:7(?:[2-5]|6[0-59])|[3-6][2-9]|8[2-5])|4[5-8]|5[2-9]|6(?:[37]|5(?:[467]|5[014-9])|6(?:[2-8]|9[02-69])|8[2-8]|9(?:[236-8]|9[23]))|7[579]|8[03-579]|9[2-8])|9(?:[23]0|4[02-46-9]|5[024-79]|6[4-9]|7[2-47-9]|8[02-7]|9(?:3(?:3[02-9]|4[0-24689])|4[2-69]|[5-7]))",
"1(?:2[3-6]|3[3-9]|4[2-6]|5(?:[236-8]|[45][2-69])|[68][2-7]|7[2-689]|9[1-578])|2(?:2(?:[04-689]|3[23])|3[3-58]|4[0-468]|5(?:5[78]|7[2-4]|[0468][2-9])|6(?:[0135-8]|4[2-5])|7(?:[0679]|8[2-7])|8(?:[024578]|3[25-9]|9[6-9])|9(?:11|3[2-4]))|4(?:2(?:2[2-9]|8[237-9])|3[689]|6[035-7]|7(?:[059][2-8]|[68])|80|9[3-5])|5(?:3[1-36-9]|4[4578]|5[013-8]|6[1-9]|7[2-8]|8[14-7]|9(?:[89][2-8]|[4-7]))|7(?:2[15]|3[5-9]|4[02-9]|6[135-8]|7[0-4689]|9(?:[017-9]|4[6-8]|5[2-478]|6[2-589]))|8(?:2(?:4[4-8]|9(?:[3578]|20|4[04-9]|6(?:5[25]|60)))|3(?:7(?:[2-5]|6[0-59])|[3-6][2-9]|8[2-5])|4[5-8]|5[2-9]|6(?:[37]|5(?:[467]|5[014-9])|6(?:[2-8]|9[02-69])|8[2-8]|9(?:[236-8]|9[23]))|7[579]|8[03-579]|9[2-8])|9(?:[23]0|4[02-46-9]|5[024-79]|6[4-9]|7[2-47-9]|8[02-7]|9(?:3(?:3[02-9]|4[0-24689])|4[2-69]|[5-7]))"],
"0$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1-$2-$3",["1|2(?:2[37]|5[5-9]|64|78|8[39]|91)|4(?:2[2689]|64|7[347])|5(?:[2-589]|39)|60|8(?:[46-9]|3[279]|2[124589])|9(?:[235-8]|93)","1|2(?:2[37]|5(?:[57]|[68]0|9[19])|64|78|8[39]|917)|4(?:2(?:[68]|20|9[178])|64|7[347])|5(?:[2-589]|39[67])|60|8(?:[46-9]|3[279]|2[124589])|9(?:[235-8]|93[34])","1|2(?:2[37]|5(?:[57]|[68]0|9(?:17|99))|64|78|8[39]|917)|4(?:2(?:[68]|20|9[178])|64|7[347])|5(?:[2-589]|39[67])|60|8(?:[46-9]|3[279]|2[124589])|9(?:[235-8]|93(?:31|4))"],
"0$1"],[,"(\\d{3})(\\d{2})(\\d{4})","$1-$2-$3",["2(?:9[14-79]|74|[34]7|[56]9)|82|993"],"0$1"],[,"(\\d)(\\d{4})(\\d{4})","$1-$2-$3",["3|4(?:2[09]|7[01])|6[1-9]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1-$2-$3",["[2479][1-9]"],"0$1"]],[[,"(\\d{3})(\\d{3})(\\d{3})","$1-$2-$3",["(?:12|57|99)0"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{4})","$1-$2-$3",["800"],"0$1"],[,"(\\d{2})(\\d{4})(\\d{4})","$1-$2-$3",["[2579]0|80[1-9]"],"0$1"],[,"(\\d{4})(\\d)(\\d{4})","$1-$2-$3",["1(?:26|3[79]|4[56]|5[4-68]|6[3-5])|5(?:76|97)|499|746|8(?:3[89]|63|47|51)|9(?:49|80|9[16])",
"1(?:267|3(?:7[247]|9[278])|4(?:5[67]|66)|5(?:47|58|64|8[67])|6(?:3[245]|48|5[4-68]))|5(?:76|97)9|499[2468]|7468|8(?:3(?:8[78]|96)|636|477|51[24])|9(?:496|802|9(?:1[23]|69))","1(?:267|3(?:7[247]|9[278])|4(?:5[67]|66)|5(?:47|58|64|8[67])|6(?:3[245]|48|5[4-68]))|5(?:769|979[2-69])|499[2468]|7468|8(?:3(?:8[78]|96[2457-9])|636[2-57-9]|477|51[24])|9(?:496|802|9(?:1[23]|69))"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{4})","$1-$2-$3",["1(?:2[3-6]|3[3-9]|4[2-6]|5[2-8]|[68][2-7]|7[2-689]|9[1-578])|2(?:2[03-689]|3[3-58]|4[0-468]|5[04-8]|6[013-8]|7[06-9]|8[02-57-9]|9[13])|4(?:2[28]|3[689]|6[035-7]|7[05689]|80|9[3-5])|5(?:3[1-36-9]|4[4578]|5[013-8]|6[1-9]|7[2-8]|8[14-7]|9[4-9])|7(?:2[15]|3[5-9]|4[02-9]|6[135-8]|7[0-4689]|9[014-9])|8(?:2[49]|3[3-8]|4[5-8]|5[2-9]|6[35-9]|7[579]|8[03-579]|9[2-8])|9(?:[23]0|4[02-46-9]|5[024-79]|6[4-9]|7[2-47-9]|8[02-7]|9[3-7])",
"1(?:2[3-6]|3[3-9]|4[2-6]|5(?:[236-8]|[45][2-69])|[68][2-7]|7[2-689]|9[1-578])|2(?:2(?:[04-689]|3[23])|3[3-58]|4[0-468]|5(?:5[78]|7[2-4]|[0468][2-9])|6(?:[0135-8]|4[2-5])|7(?:[0679]|8[2-7])|8(?:[024578]|3[25-9]|9[6-9])|9(?:11|3[2-4]))|4(?:2(?:2[2-9]|8[237-9])|3[689]|6[035-7]|7(?:[059][2-8]|[68])|80|9[3-5])|5(?:3[1-36-9]|4[4578]|5[013-8]|6[1-9]|7[2-8]|8[14-7]|9(?:[89][2-8]|[4-7]))|7(?:2[15]|3[5-9]|4[02-9]|6[135-8]|7[0-4689]|9(?:[017-9]|4[6-8]|5[2-478]|6[2-589]))|8(?:2(?:4[4-8]|9[2-8])|3(?:7[2-6]|[3-6][2-9]|8[2-5])|4[5-8]|5[2-9]|6(?:[37]|5[4-7]|6[2-9]|8[2-8]|9[236-9])|7[579]|8[03-579]|9[2-8])|9(?:[23]0|4[02-46-9]|5[024-79]|6[4-9]|7[2-47-9]|8[02-7]|9(?:3[34]|[4-7]))",
"1(?:2[3-6]|3[3-9]|4[2-6]|5(?:[236-8]|[45][2-69])|[68][2-7]|7[2-689]|9[1-578])|2(?:2(?:[04-689]|3[23])|3[3-58]|4[0-468]|5(?:5[78]|7[2-4]|[0468][2-9])|6(?:[0135-8]|4[2-5])|7(?:[0679]|8[2-7])|8(?:[024578]|3[25-9]|9[6-9])|9(?:11|3[2-4]))|4(?:2(?:2[2-9]|8[237-9])|3[689]|6[035-7]|7(?:[059][2-8]|[68])|80|9[3-5])|5(?:3[1-36-9]|4[4578]|5[013-8]|6[1-9]|7[2-8]|8[14-7]|9(?:[89][2-8]|[4-7]))|7(?:2[15]|3[5-9]|4[02-9]|6[135-8]|7[0-4689]|9(?:[017-9]|4[6-8]|5[2-478]|6[2-589]))|8(?:2(?:4[4-8]|9(?:[3578]|20|4[04-9]|6[56]))|3(?:7(?:[2-5]|6[0-59])|[3-6][2-9]|8[2-5])|4[5-8]|5[2-9]|6(?:[37]|5(?:[467]|5[014-9])|6(?:[2-8]|9[02-69])|8[2-8]|9(?:[236-8]|9[23]))|7[579]|8[03-579]|9[2-8])|9(?:[23]0|4[02-46-9]|5[024-79]|6[4-9]|7[2-47-9]|8[02-7]|9(?:3(?:3[02-9]|4[0-24689])|4[2-69]|[5-7]))",
"1(?:2[3-6]|3[3-9]|4[2-6]|5(?:[236-8]|[45][2-69])|[68][2-7]|7[2-689]|9[1-578])|2(?:2(?:[04-689]|3[23])|3[3-58]|4[0-468]|5(?:5[78]|7[2-4]|[0468][2-9])|6(?:[0135-8]|4[2-5])|7(?:[0679]|8[2-7])|8(?:[024578]|3[25-9]|9[6-9])|9(?:11|3[2-4]))|4(?:2(?:2[2-9]|8[237-9])|3[689]|6[035-7]|7(?:[059][2-8]|[68])|80|9[3-5])|5(?:3[1-36-9]|4[4578]|5[013-8]|6[1-9]|7[2-8]|8[14-7]|9(?:[89][2-8]|[4-7]))|7(?:2[15]|3[5-9]|4[02-9]|6[135-8]|7[0-4689]|9(?:[017-9]|4[6-8]|5[2-478]|6[2-589]))|8(?:2(?:4[4-8]|9(?:[3578]|20|4[04-9]|6(?:5[25]|60)))|3(?:7(?:[2-5]|6[0-59])|[3-6][2-9]|8[2-5])|4[5-8]|5[2-9]|6(?:[37]|5(?:[467]|5[014-9])|6(?:[2-8]|9[02-69])|8[2-8]|9(?:[236-8]|9[23]))|7[579]|8[03-579]|9[2-8])|9(?:[23]0|4[02-46-9]|5[024-79]|6[4-9]|7[2-47-9]|8[02-7]|9(?:3(?:3[02-9]|4[0-24689])|4[2-69]|[5-7]))"],
"0$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1-$2-$3",["1|2(?:2[37]|5[5-9]|64|78|8[39]|91)|4(?:2[2689]|64|7[347])|5(?:[2-589]|39)|60|8(?:[46-9]|3[279]|2[124589])|9(?:[235-8]|93)","1|2(?:2[37]|5(?:[57]|[68]0|9[19])|64|78|8[39]|917)|4(?:2(?:[68]|20|9[178])|64|7[347])|5(?:[2-589]|39[67])|60|8(?:[46-9]|3[279]|2[124589])|9(?:[235-8]|93[34])","1|2(?:2[37]|5(?:[57]|[68]0|9(?:17|99))|64|78|8[39]|917)|4(?:2(?:[68]|20|9[178])|64|7[347])|5(?:[2-589]|39[67])|60|8(?:[46-9]|3[279]|2[124589])|9(?:[235-8]|93(?:31|4))"],
"0$1"],[,"(\\d{3})(\\d{2})(\\d{4})","$1-$2-$3",["2(?:9[14-79]|74|[34]7|[56]9)|82|993"],"0$1"],[,"(\\d)(\\d{4})(\\d{4})","$1-$2-$3",["3|4(?:2[09]|7[01])|6[1-9]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1-$2-$3",["[2479][1-9]"],"0$1"]],[,,"20\\d{8}","\\d{10}",,,"2012345678"],,,[,,"00(?:37\\d{6,13}|66\\d{6,13}|777(?:[01]\\d{2}|5\\d{3}|8\\d{4})|882[1245]\\d{4})","\\d{8,17}",,,"00777012"],[,,"570\\d{6}","\\d{9}",,,"570123456"],1,,[,,"NA","NA"]],KE:[,[,,"20\\d{6,7}|[4-9]\\d{6,9}","\\d{7,10}"],[,,"20\\d{6,7}|4(?:[0136]\\d{7}|[245]\\d{5,7})|5(?:[08]\\d{7}|[1-79]\\d{5,7})|6(?:[01457-9]\\d{5,7}|[26]\\d{7})",
"\\d{7,9}",,,"202012345"],[,,"7(?:[0-36]\\d|5[0-6]|7[0-5]|8[0-25-9]|9[0-4])\\d{6}","\\d{9}",,,"712123456"],[,,"800[24-8]\\d{5,6}","\\d{9,10}",,,"800223456"],[,,"900[02-9]\\d{5}","\\d{9}",,,"900223456"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],"KE",254,"000","0",,,"0",,,,[[,"(\\d{2})(\\d{5,7})","$1 $2",["[24-6]"],"0$1"],[,"(\\d{3})(\\d{6})","$1 $2",["7"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3,4})","$1 $2 $3",["[89]"],"0$1"]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],KG:[,[,,"[235-8]\\d{8,9}",
"\\d{5,10}"],[,,"(?:3(?:1(?:[256]\\d|3[1-9]|47)|2(?:22|3[0-479]|6[0-7])|4(?:22|5[6-9]|6\\d)|5(?:22|3[4-7]|59|6\\d)|6(?:22|5[35-7]|6\\d)|7(?:22|3[468]|4[1-9]|59|[67]\\d)|9(?:22|4[1-8]|6\\d))|6(?:09|12|2[2-4])\\d)\\d{5}","\\d{5,10}",,,"312123456"],[,,"(?:20[0-35]|5[124-7]\\d|7[07]\\d)\\d{6}","\\d{9}",,,"700123456"],[,,"800\\d{6,7}","\\d{9,10}",,,"800123456"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],"KG",996,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[25-7]|31[25]"],
"0$1"],[,"(\\d{4})(\\d{5})","$1 $2",["3(?:1[36]|[2-9])"],"0$1"],[,"(\\d{3})(\\d{3})(\\d)(\\d{3})","$1 $2 $3 $4",["8"],"0$1"]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],KH:[,[,,"[1-9]\\d{7,9}","\\d{6,10}"],[,,"(?:2[3-6]|3[2-6]|4[2-4]|[5-7][2-5])(?:[237-9]|4[56]|5\\d|6\\d?)\\d{5}|23(?:4[234]|8\\d{2})\\d{4}","\\d{6,9}",,,"23756789"],[,,"(?:1(?:[013-9]|2\\d?)|3[18]\\d|6[016-9]|7(?:[07-9]|[16]\\d)|8(?:[013-79]|8\\d)|9(?:6\\d|7\\d?|[0-589]))\\d{6}","\\d{8,9}",,,"91234567"],[,,"1800(?:1\\d|2[019])\\d{4}",
"\\d{10}",,,"1800123456"],[,,"1900(?:1\\d|2[09])\\d{4}","\\d{10}",,,"1900123456"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],"KH",855,"00[14-9]","0",,,"0",,,,[[,"(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["1\\d[1-9]|[2-9]"],"0$1"],[,"(1[89]00)(\\d{3})(\\d{3})","$1 $2 $3",["1[89]0"]]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],KI:[,[,,"[2458]\\d{4}|3\\d{4,7}|7\\d{7}","\\d{5,8}"],[,,"(?:[24]\\d|3[1-9]|50|8[0-5])\\d{3}","\\d{5}",,,"31234"],[,,"7\\d{7}","\\d{8}",,,"72012345"],[,,"NA","NA"],
[,,"3001\\d{4}","\\d{5,8}",,,"30010000"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],"KI",686,"00",,,,"0",,,,,,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],KM:[,[,,"[379]\\d{6}","\\d{7}"],[,,"7(?:6[0-37-9]|7[0-57-9])\\d{4}","\\d{7}",,,"7712345"],[,,"3[234]\\d{5}","\\d{7}",,,"3212345"],[,,"NA","NA"],[,,"(?:39[01]|9[01]0)\\d{4}","\\d{7}",,,"9001234"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],"KM",269,"00",,,,,,,,[[,"(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3"]],,[,,"NA","NA"],,,[,,"NA","NA"],
[,,"NA","NA"],,,[,,"NA","NA"]],KN:[,[,,"[589]\\d{9}","\\d{7}(?:\\d{3})?"],[,,"869(?:2(?:29|36)|302|4(?:6[015-9]|70))\\d{4}","\\d{7}(?:\\d{3})?",,,"8692361234"],[,,"869(?:5(?:5[6-8]|6[5-7])|66\\d|76[02-6])\\d{4}","\\d{10}",,,"8697652917"],[,,"8(?:00|44|55|66|77|88)[2-9]\\d{6}","\\d{10}",,,"8002123456"],[,,"900[2-9]\\d{6}","\\d{10}",,,"9002123456"],[,,"NA","NA"],[,,"5(?:00|33|44|66|77)[2-9]\\d{6}","\\d{10}",,,"5002345678"],[,,"NA","NA"],"KN",1,"011","1",,,"1",,,,,,[,,"NA","NA"],,"869",[,,"NA","NA"],
[,,"NA","NA"],,,[,,"NA","NA"]],KP:[,[,,"1\\d{9}|[28]\\d{7}","\\d{6,8}|\\d{10}"],[,,"2\\d{7}|85\\d{6}","\\d{6,8}",,,"21234567"],[,,"19[123]\\d{7}","\\d{10}",,,"1921234567"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],"KP",850,"00|99","0",,,"0",,,,[[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["1"],"0$1"],[,"(\\d)(\\d{3})(\\d{4})","$1 $2 $3",["2"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["8"],"0$1"]],,[,,"NA","NA"],,,[,,"2(?:[0-24-9]\\d{2}|3(?:[0-79]\\d|8[02-9]))\\d{4}",
"\\d{8}",,,"23821234"],[,,"NA","NA"],,,[,,"NA","NA"]],KR:[,[,,"[1-7]\\d{3,9}|8\\d{8}","\\d{4,10}"],[,,"(?:2|3[1-3]|[46][1-4]|5[1-5])(?:1\\d{2,3}|[1-9]\\d{6,7})","\\d{4,10}",,,"22123456"],[,,"1[0-26-9]\\d{7,8}","\\d{9,10}",,,"1000000000"],[,,"80\\d{7}","\\d{9}",,,"801234567"],[,,"60[2-9]\\d{6}","\\d{9}",,,"602345678"],[,,"NA","NA"],[,,"50\\d{8}","\\d{10}",,,"5012345678"],[,,"70\\d{8}","\\d{10}",,,"7012345678"],"KR",82,"00(?:[124-68]|[37]\\d{2})","0",,,"0(8[1-46-8]|85\\d{2})?",,,,[[,"(\\d{2})(\\d{4})(\\d{4})",
"$1-$2-$3",["1(?:0|1[19]|[69]9|5[458])|[57]0","1(?:0|1[19]|[69]9|5(?:44|59|8))|[57]0"],"0$1","0$CC-$1"],[,"(\\d{2})(\\d{3,4})(\\d{4})","$1-$2-$3",["1(?:[01]|5[1-4]|6[2-8]|[7-9])|[68]0|[3-6][1-9][1-9]","1(?:[01]|5(?:[1-3]|4[56])|6[2-8]|[7-9])|[68]0|[3-6][1-9][1-9]"],"0$1","0$CC-$1"],[,"(\\d{3})(\\d)(\\d{4})","$1-$2-$3",["131","1312"],"0$1","0$CC-$1"],[,"(\\d{3})(\\d{2})(\\d{4})","$1-$2-$3",["131","131[13-9]"],"0$1","0$CC-$1"],[,"(\\d{3})(\\d{3})(\\d{4})","$1-$2-$3",["13[2-9]"],"0$1","0$CC-$1"],[,"(\\d{2})(\\d{2})(\\d{3})(\\d{4})",
"$1-$2-$3-$4",["30"],"0$1","0$CC-$1"],[,"(\\d)(\\d{3,4})(\\d{4})","$1-$2-$3",["2[1-9]"],"0$1","0$CC-$1"],[,"(\\d)(\\d{3,4})","$1-$2",["21[0-46-9]"],"0$1","0$CC-$1"],[,"(\\d{2})(\\d{3,4})","$1-$2",["[3-6][1-9]1","[3-6][1-9]1(?:[0-46-9])"],"0$1","0$CC-$1"],[,"(\\d{4})(\\d{4})","$1-$2",["1(?:5[46-9]|6[04678]|8[0579])","1(?:5(?:44|66|77|88|99)|6(?:00|44|6[16]|70|88)|8(?:00|55|77|99))"],"$1","0$CC-$1"]],,[,,"15\\d{7,8}","\\d{9,10}",,,"1523456789"],,,[,,"NA","NA"],[,,"1(?:5(?:44|66|77|88|99)|6(?:00|44|6[16]|70|88)|8(?:00|55|77|99))\\d{4}",
"\\d{8}",,,"15441234"],,,[,,"NA","NA"]],KW:[,[,,"[12569]\\d{6,7}","\\d{7,8}"],[,,"(?:18\\d|2(?:[23]\\d{2}|4(?:[1-35-9]\\d|44)|5(?:0[034]|[2-46]\\d|5[1-3]|7[1-7])))\\d{4}","\\d{7,8}",,,"22345678"],[,,"(?:5(?:[05]\\d{2}|1[0-7]\\d|2(?:22|55))|6(?:0[034679]\\d|5[015-9]\\d|6\\d{2}|7[067]\\d|9[0369]\\d)|9(?:0[09]\\d|22\\d|4[01479]\\d|55\\d|6[0679]\\d|[79]\\d{2}|8[057-9]\\d))\\d{4}","\\d{8}",,,"50012345"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],"KW",965,"00",,,,,,,,[[,"(\\d{4})(\\d{3,4})",
"$1 $2",["[126]|9[04-9]|52[25]"]],[,"(\\d{3})(\\d{5})","$1 $2",["5[015]|92"]]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],KY:[,[,,"[3589]\\d{9}","\\d{7}(?:\\d{3})?"],[,,"345(?:2(?:22|44)|444|6(?:23|38|40)|7(?:4[35-79]|6[6-9]|77)|8(?:00|1[45]|25|[48]8)|9(?:14|4[035-9]))\\d{4}","\\d{7}(?:\\d{3})?",,,"3452221234"],[,,"345(?:32[1-9]|5(?:1[67]|2[5-7]|4[6-8]|76)|9(?:1[67]|2[2-9]|3[689]))\\d{4}","\\d{10}",,,"3453231234"],[,,"8(?:00|44|55|66|77|88)[2-9]\\d{6}","\\d{10}",,,"8002345678"],
[,,"900[2-9]\\d{6}|345976\\d{4}","\\d{10}",,,"9002345678"],[,,"NA","NA"],[,,"5(?:00|33|44|66|77)[2-9]\\d{6}","\\d{10}",,,"5002345678"],[,,"NA","NA"],"KY",1,"011","1",,,"1",,,,,,[,,"345849\\d{4}","\\d{10}",,,"3458491234"],,"345",[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],KZ:[,[,,"(?:33\\d|7\\d{2}|80[09])\\d{7}","\\d{10}"],[,,"33622\\d{5}|7(?:1(?:0(?:[23]\\d|4[023]|59|63)|1(?:[23]\\d|4[0-79]|59)|2(?:[23]\\d|59)|3(?:2\\d|3[1-79]|4[0-35-9]|59)|4(?:2\\d|3[013-79]|4[0-8]|5[1-79])|5(?:2\\d|3[1-8]|4[1-7]|59)|6(?:[234]\\d|5[19]|61)|72\\d|8(?:[27]\\d|3[1-46-9]|4[0-5]))|2(?:1(?:[23]\\d|4[46-9]|5[3469])|2(?:2\\d|3[0679]|46|5[12679])|3(?:[234]\\d|5[139])|4(?:2\\d|3[1235-9]|59)|5(?:[23]\\d|4[01246-8]|59|61)|6(?:2\\d|3[1-9]|4[0-4]|59)|7(?:[237]\\d|40|5[279])|8(?:[23]\\d|4[0-3]|59)|9(?:2\\d|3[124578]|59)))\\d{5}",
"\\d{10}",,,"7123456789"],[,,"7(?:0[012578]|47|6[02-4]|7[15-8]|85)\\d{7}","\\d{10}",,,"7710009998"],[,,"800\\d{7}","\\d{10}",,,"8001234567"],[,,"809\\d{7}","\\d{10}",,,"8091234567"],[,,"NA","NA"],[,,"NA","NA"],[,,"751\\d{7}","\\d{10}",,,"7511234567"],"KZ",7,"810","8",,,"8",,"8~10",,,,[,,"NA","NA"],,,[,,"751\\d{7}","\\d{10}",,,"7511234567"],[,,"NA","NA"],,,[,,"NA","NA"]],LA:[,[,,"[2-8]\\d{7,9}","\\d{6,10}"],[,,"(?:2[13]|3(?:0\\d|[14])|[5-7][14]|41|8[1468])\\d{6}","\\d{6,9}",,,"21212862"],[,,"20(?:2[2389]|5[4-689]|7[6-8]|9[15-9])\\d{6}",
"\\d{10}",,,"2023123456"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],"LA",856,"00","0",,,"0",,,,[[,"(20)(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3 $4",["20"],"0$1"],[,"([2-8]\\d)(\\d{3})(\\d{3})","$1 $2 $3",["2[13]|3[14]|[4-8]"],"0$1"],[,"(30)(\\d{2})(\\d{2})(\\d{3})","$1 $2 $3 $4",["30"],"0$1"]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],LB:[,[,,"[13-9]\\d{6,7}","\\d{7,8}"],[,,"(?:[14-6]\\d{2}|7(?:[2-57]\\d|62|8[0-7]|9[04-9])|8[02-9]\\d|9\\d{2})\\d{4}","\\d{7}",
,,"1123456"],[,,"(?:3\\d|7(?:[01]\\d|6[013-9]|8[89]|9[1-3])|81\\d)\\d{5}","\\d{7,8}",,,"71123456"],[,,"NA","NA"],[,,"9[01]\\d{6}","\\d{8}",,,"90123456"],[,,"80\\d{6}","\\d{8}",,,"80123456"],[,,"NA","NA"],[,,"NA","NA"],"LB",961,"00","0",,,"0",,,,[[,"(\\d)(\\d{3})(\\d{3})","$1 $2 $3",["[13-6]|7(?:[2-57]|62|8[0-7]|9[04-9])|8[02-9]|9"],"0$1"],[,"([7-9]\\d)(\\d{3})(\\d{3})","$1 $2 $3",["[89][01]|7(?:[01]|6[013-9]|8[89]|9[1-3])"]]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],LC:[,[,,"[5789]\\d{9}",
"\\d{7}(?:\\d{3})?"],[,,"758(?:4(?:30|5[0-9]|6[2-9]|8[0-2])|57[0-2]|638)\\d{4}","\\d{7}(?:\\d{3})?",,,"7584305678"],[,,"758(?:28[4-7]|384|4(?:6[01]|8[4-9])|5(?:1[89]|20|84)|7(?:1[2-9]|2[0-8]))\\d{4}","\\d{10}",,,"7582845678"],[,,"8(?:00|44|55|66|77|88)[2-9]\\d{6}","\\d{10}",,,"8002123456"],[,,"900[2-9]\\d{6}","\\d{10}",,,"9002123456"],[,,"NA","NA"],[,,"5(?:00|33|44|66|77)[2-9]\\d{6}","\\d{10}",,,"5002345678"],[,,"NA","NA"],"LC",1,"011","1",,,"1",,,,,,[,,"NA","NA"],,"758",[,,"NA","NA"],[,,"NA","NA"],
,,[,,"NA","NA"]],LI:[,[,,"6\\d{8}|[23789]\\d{6}","\\d{7,9}"],[,,"(?:2(?:01|1[27]|3\\d|6[02-578]|96)|3(?:7[0135-7]|8[048]|9[0269]))\\d{4}","\\d{7}",,,"2345678"],[,,"6(?:51[01]|6(?:0[0-6]|2[016-9]|39))\\d{5}|7(?:[37-9]\\d|42|56)\\d{4}","\\d{7,9}",,,"660234567"],[,,"80(?:02[28]|9\\d{2})\\d{2}","\\d{7}",,,"8002222"],[,,"90(?:02[258]|1(?:23|3[14])|66[136])\\d{2}","\\d{7}",,,"9002222"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],"LI",423,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3",["[23789]"]],
[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["6[56]"]],[,"(69)(7\\d{2})(\\d{4})","$1 $2 $3",["697"]]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"870(?:28|87)\\d{2}","\\d{7}",,,"8702812"],,,[,,"697(?:42|56|[7-9]\\d)\\d{4}","\\d{9}",,,"697861234"]],LK:[,[,,"[1-9]\\d{8}","\\d{7,9}"],[,,"(?:[189]1|2[13-7]|3[1-8]|4[157]|5[12457]|6[35-7])[2-57]\\d{6}","\\d{7,9}",,,"112345678"],[,,"7[0125-8]\\d{7}","\\d{9}",,,"712345678"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],"LK",94,"00","0",,,"0",,
,,[[,"(\\d{2})(\\d{1})(\\d{6})","$1 $2 $3",["[1-689]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["7"],"0$1"]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],LR:[,[,,"2\\d{7,8}|[37-9]\\d{8}|4\\d{6}|5\\d{6,8}","\\d{7,9}"],[,,"2\\d{7}","\\d{8}",,,"21234567"],[,,"(?:330\\d|4[67]|5\\d|77\\d{2}|88\\d{2}|994\\d)\\d{5}|(?:20\\d{3}|33(?:0\\d{2}|2(?:02|5\\d))|555\\d{2}|77[0567]\\d{2}|88[068]\\d{2}|994\\d{2})\\d{4}","\\d{7,9}",,,"770123456"],[,,"NA","NA"],[,,"90[03]\\d{6}","\\d{9}",,,"900123456"],
[,,"NA","NA"],[,,"NA","NA"],[,,"332(?:0[02]|5\\d)\\d{4}","\\d{9}",,,"332001234"],"LR",231,"00","0",,,"0",,,,[[,"(2\\d)(\\d{3})(\\d{3})","$1 $2 $3",["2"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[2579]"],"0$1"],[,"([4-6])(\\d{3})(\\d{3})","$1 $2 $3",["[4-6]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[38]"],"0$1"]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],LS:[,[,,"[2568]\\d{7}","\\d{8}"],[,,"2\\d{7}","\\d{8}",,,"22123456"],[,,"[56]\\d{7}","\\d{8}",,,"50123456"],
[,,"800[256]\\d{4}","\\d{8}",,,"80021234"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],"LS",266,"00",,,,,,,,[[,"(\\d{4})(\\d{4})","$1 $2"]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],LT:[,[,,"[3-9]\\d{7}","\\d{8}"],[,,"(?:3[1478]|4[124-6]|52)\\d{6}","\\d{8}",,,"31234567"],[,,"6\\d{7}","\\d{8}",,,"61234567"],[,,"800\\d{5}","\\d{8}",,,"80012345"],[,,"9(?:0[0239]|10)\\d{5}","\\d{8}",,,"90012345"],[,,"808\\d{5}","\\d{8}",,,"80812345"],[,,"700\\d{5}","\\d{8}",,,"70012345"],
[,,"NA","NA"],"LT",370,"00","8",,,"[08]",,,,[[,"([34]\\d)(\\d{6})","$1 $2",["37|4(?:1|5[45]|6[2-4])"],"(8-$1)",,1],[,"([3-6]\\d{2})(\\d{5})","$1 $2",["3[148]|4(?:[24]|6[09])|528|6"],"(8-$1)",,1],[,"([7-9]\\d{2})(\\d{2})(\\d{3})","$1 $2 $3",["[7-9]"],"8 $1",,1],[,"(5)(2\\d{2})(\\d{4})","$1 $2 $3",["52[0-79]"],"(8-$1)",,1]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"70[67]\\d{5}","\\d{8}",,,"70712345"],,,[,,"NA","NA"]],LU:[,[,,"[24-9]\\d{3,10}|3(?:[0-46-9]\\d{2,9}|5[013-9]\\d{1,8})","\\d{4,11}"],[,,"(?:2[2-9]\\d{2,9}|(?:[3457]\\d{2}|8(?:0[2-9]|[13-9]\\d)|9(?:0[89]|[2-579]\\d))\\d{1,8})",
"\\d{4,11}",,,"27123456"],[,,"6[2679][18]\\d{6}","\\d{9}",,,"628123456"],[,,"800\\d{5}","\\d{8}",,,"80012345"],[,,"90[015]\\d{5}","\\d{8}",,,"90012345"],[,,"801\\d{5}","\\d{8}",,,"80112345"],[,,"70\\d{6}","\\d{8}",,,"70123456"],[,,"20(?:1\\d{5}|[2-689]\\d{1,7})","\\d{4,10}",,,"20201234"],"LU",352,"00",,,,"(15(?:0[06]|1[12]|35|4[04]|55|6[26]|77|88|99)\\d)",,,,[[,"(\\d{2})(\\d{3})","$1 $2",["[2-5]|7[1-9]|[89](?:[1-9]|0[2-9])"],,"$CC $1"],[,"(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3",["[2-5]|7[1-9]|[89](?:[1-9]|0[2-9])"],
,"$CC $1"],[,"(\\d{2})(\\d{2})(\\d{3})","$1 $2 $3",["20"],,"$CC $1"],[,"(\\d{2})(\\d{2})(\\d{2})(\\d{1,2})","$1 $2 $3 $4",["2(?:[0367]|4[3-8])"],,"$CC $1"],[,"(\\d{2})(\\d{2})(\\d{2})(\\d{3})","$1 $2 $3 $4",["20"],,"$CC $1"],[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})(\\d{1,2})","$1 $2 $3 $4 $5",["2(?:[0367]|4[3-8])"],,"$CC $1"],[,"(\\d{2})(\\d{2})(\\d{2})(\\d{1,4})","$1 $2 $3 $4",["2(?:[12589]|4[12])|[3-5]|7[1-9]|8(?:[1-9]|0[2-9])|9(?:[1-9]|0[2-46-9])"],,"$CC $1"],[,"(\\d{3})(\\d{2})(\\d{3})","$1 $2 $3",
["70|80[01]|90[015]"],,"$CC $1"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["6"],,"$CC $1"]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],LV:[,[,,"[2689]\\d{7}","\\d{8}"],[,,"6[3-8]\\d{6}","\\d{8}",,,"63123456"],[,,"2\\d{7}","\\d{8}",,,"21234567"],[,,"80\\d{6}","\\d{8}",,,"80123456"],[,,"90\\d{6}","\\d{8}",,,"90123456"],[,,"81\\d{6}","\\d{8}",,,"81123456"],[,,"NA","NA"],[,,"NA","NA"],"LV",371,"00",,,,,,,,[[,"([2689]\\d)(\\d{3})(\\d{3})","$1 $2 $3"]],,[,,"NA","NA"],,,[,,"NA","NA"],[,
,"NA","NA"],,,[,,"NA","NA"]],LY:[,[,,"[25679]\\d{8}","\\d{7,9}"],[,,"(?:2[1345]|5[1347]|6[123479]|71)\\d{7}","\\d{7,9}",,,"212345678"],[,,"9[1-6]\\d{7}","\\d{9}",,,"912345678"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],"LY",218,"00","0",,,"0",,,,[[,"([25679]\\d)(\\d{7})","$1-$2",,"0$1"]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],MA:[,[,,"[5689]\\d{8}","\\d{9}"],[,,"5(?:2(?:(?:[015-7]\\d|2[2-9]|3[2-57]|4[2-8]|8[235-7])\\d|9(?:0\\d|[89]0))|3(?:(?:[0-4]\\d|[57][2-9]|6[235-8]|9[3-9])\\d|8(?:0\\d|[89]0)))\\d{4}",
"\\d{9}",,,"520123456"],[,,"6(?:0[0-8]|[12-79]\\d|8[017])\\d{6}","\\d{9}",,,"650123456"],[,,"80\\d{7}","\\d{9}",,,"801234567"],[,,"89\\d{7}","\\d{9}",,,"891234567"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],"MA",212,"00","0",,,"0",,,,[[,"([56]\\d{2})(\\d{6})","$1-$2",["5(?:2[015-7]|3[0-4])|6"],"0$1"],[,"([58]\\d{3})(\\d{5})","$1-$2",["5(?:2[2-489]|3[5-9])|892","5(?:2(?:[2-48]|90)|3(?:[5-79]|80))|892"],"0$1"],[,"(5\\d{4})(\\d{4})","$1-$2",["5(?:29|38)","5(?:29|38)[89]"],"0$1"],[,"(8[09])(\\d{7})",
"$1-$2",["8(?:0|9[013-9])"],"0$1"]],,[,,"NA","NA"],1,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],MC:[,[,,"[4689]\\d{7,8}","\\d{8,9}"],[,,"870\\d{5}|9[2-47-9]\\d{6}","\\d{8}",,,"99123456"],[,,"6\\d{8}|4(?:4\\d|5[1-9])\\d{5}","\\d{8,9}",,,"612345678"],[,,"90\\d{6}","\\d{8}",,,"90123456"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],"MC",377,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["9"],"$1"],[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["4"],"0$1"],[,"(6)(\\d{2})(\\d{2})(\\d{2})(\\d{2})",
"$1 $2 $3 $4 $5",["6"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{2})","$1 $2 $3",["8"],"$1"]],,[,,"NA","NA"],,,[,,"8\\d{7}","\\d{8}"],[,,"NA","NA"],,,[,,"NA","NA"]],MD:[,[,,"[235-9]\\d{7}","\\d{8}"],[,,"(?:2(?:1[0569]|2\\d|3[015-7]|4[1-46-9]|5[0-24689]|6[2-589]|7[1-37]|9[1347-9])|5(?:33|5[257]))\\d{5}","\\d{8}",,,"22212345"],[,,"(?:562\\d|6(?:[089]\\d{2}|[12][01]\\d|7(?:[1-6]\\d|7[0-4]))|7(?:6[07]|7[457-9]|[89]\\d)\\d)\\d{4}","\\d{8}",,,"62112345"],[,,"800\\d{5}","\\d{8}",,,"80012345"],[,,"90[056]\\d{5}","\\d{8}",
,,"90012345"],[,,"808\\d{5}","\\d{8}",,,"80812345"],[,,"NA","NA"],[,,"3[08]\\d{6}","\\d{8}",,,"30123456"],"MD",373,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["22|3"],"0$1"],[,"([25-7]\\d{2})(\\d{2})(\\d{3})","$1 $2 $3",["2[13-79]|[5-7]"],"0$1"],[,"([89]\\d{2})(\\d{5})","$1 $2",["[89]"],"0$1"]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"8(?:03|14)\\d{5}","\\d{8}",,,"80312345"],,,[,,"NA","NA"]],ME:[,[,,"[2-9]\\d{7,8}","\\d{6,9}"],[,,"(?:20[2-8]|3(?:0[2-7]|[12][35-7]|3[4-7])|4(?:0[2367]|1[267])|5(?:0[467]|1[267]|2[367]))\\d{5}",
"\\d{6,8}",,,"30234567"],[,,"6(?:00\\d|32\\d|[89]\\d{2}|61\\d|7(?:[0-8]\\d|9(?:[3-9]|[0-2]\\d)))\\d{4}","\\d{8,9}",,,"67622901"],[,,"80\\d{6}","\\d{8}",,,"80080002"],[,,"(?:9(?:4[1568]|5[178]))\\d{5}","\\d{8}",,,"94515151"],[,,"NA","NA"],[,,"NA","NA"],[,,"78[1-9]\\d{5}","\\d{8}",,,"78108780"],"ME",382,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["[2-57-9]|6[036-9]","[2-57-9]|6(?:[03689]|7(?:[0-8]|9[3-9]))"],"0$1"],[,"(67)(9)(\\d{3})(\\d{3})","$1 $2 $3 $4",["679","679[0-2]"],"0$1"]],
,[,,"NA","NA"],,,[,,"NA","NA"],[,,"77\\d{6}","\\d{8}",,,"77273012"],,,[,,"NA","NA"]],MF:[,[,,"[56]\\d{8}","\\d{9}"],[,,"590(?:[02][79]|13|5[0-268]|[78]7)\\d{4}","\\d{9}",,,"590271234"],[,,"690(?:0[0-7]|[1-9]\\d)\\d{4}","\\d{9}",,,"690301234"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],"MF",590,"00","0",,,"0",,,,,,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],MG:[,[,,"[23]\\d{8}","\\d{7,9}"],[,,"20(?:2\\d{2}|4[47]\\d|5[3467]\\d|6[279]\\d|7(?:2[29]|[35]\\d)|8[268]\\d|9[245]\\d)\\d{4}",
"\\d{7,9}",,,"202123456"],[,,"3[2-49]\\d{7}","\\d{9}",,,"321234567"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"22\\d{7}","\\d{9}",,,"221234567"],"MG",261,"00","0",,,"0",,,,[[,"([23]\\d)(\\d{2})(\\d{3})(\\d{2})","$1 $2 $3 $4",,"0$1"]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],MH:[,[,,"[2-6]\\d{6}","\\d{7}"],[,,"(?:247|528|625)\\d{4}","\\d{7}",,,"2471234"],[,,"(?:235|329|45[56]|545)\\d{4}","\\d{7}",,,"2351234"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA",
"NA"],[,,"635\\d{4}","\\d{7}",,,"6351234"],"MH",692,"011","1",,,"1",,,,[[,"(\\d{3})(\\d{4})","$1-$2"]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],MK:[,[,,"[2-578]\\d{7}","\\d{8}"],[,,"(?:2(?:[23]\\d|5[124578]|6[01])|3(?:1[3-6]|[23][2-6]|4[2356])|4(?:[23][2-6]|4[3-6]|5[256]|6[25-8]|7[24-6]|8[4-6]))\\d{5}","\\d{6,8}",,,"22212345"],[,,"7(?:[0-25-8]\\d{2}|32\\d|421)\\d{4}","\\d{8}",,,"72345678"],[,,"800\\d{5}","\\d{8}",,,"80012345"],[,,"5[02-9]\\d{6}","\\d{8}",,,"50012345"],[,,"8(?:0[1-9]|[1-9]\\d)\\d{5}",
"\\d{8}",,,"80123456"],[,,"NA","NA"],[,,"NA","NA"],"MK",389,"00","0",,,"0",,,,[[,"(2)(\\d{3})(\\d{4})","$1 $2 $3",["2"],"0$1"],[,"([347]\\d)(\\d{3})(\\d{3})","$1 $2 $3",["[347]"],"0$1"],[,"([58]\\d{2})(\\d)(\\d{2})(\\d{2})","$1 $2 $3 $4",["[58]"],"0$1"]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],ML:[,[,,"[246-9]\\d{7}","\\d{8}"],[,,"(?:2(?:0(?:2[0-589]|7\\d)|1(?:2[5-7]|[3-689]\\d|7[2-4689]))|44[239]\\d)\\d{4}","\\d{8}",,,"20212345"],[,,"[67]\\d{7}|9[0-25-9]\\d{6}","\\d{8}",,,"65012345"],
[,,"800\\d{5}","\\d{8}",,,"80012345"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],"ML",223,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[246-9]"]],[,"(\\d{4})","$1",["67|74"]]],[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[246-9]"]]],[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],MM:[,[,,"[14578]\\d{5,7}|[26]\\d{5,8}|9(?:2\\d{0,2}|[58]|3\\d|4\\d{1,2}|6\\d?|[79]\\d{0,2})\\d{6}","\\d{5,10}"],[,,"1(?:2\\d{1,2}|[3-5]\\d|6\\d?|[89][0-6]\\d)\\d{4}|2(?:2(?:000\\d{3}|\\d{4})|3\\d{4}|4(?:0\\d{5}|\\d{4})|5(?:1\\d{3,6}|[02-9]\\d{3,5})|[6-9]\\d{4})|4(?:2[245-8]|[346][2-6]|5[3-5])\\d{4}|5(?:2(?:20?|[3-8])|3[2-68]|4(?:21?|[4-8])|5[23]|6[2-4]|7[2-8]|8[24-7]|9[2-7])\\d{4}|6(?:0[23]|1[2356]|[24][2-6]|3[24-6]|5[2-4]|6[2-8]|7(?:[2367]|4\\d|5\\d?|8[145]\\d)|8[245]|9[24])\\d{4}|7(?:[04][24-8]|[15][2-7]|22|3[2-4])\\d{4}|8(?:1(?:2\\d{1,2}|[3-689]\\d)|2(?:2\\d|3(?:\\d|20)|[4-8]\\d)|3[24]\\d|4[24-7]\\d|5[245]\\d|6[23]\\d)\\d{3}",
"\\d{5,9}",,,"1234567"],[,,"17[01]\\d{4}|9(?:2(?:[0-4]|5\\d{2}|6[0-5]\\d)|3[0-36]\\d|4(?:0[0-4]\\d|[1379]\\d|2\\d{2}|4[0-589]\\d|5\\d{2}|88)|5[0-6]|61?\\d|7(?:3\\d|[789]\\d{2})|8\\d|9(?:1\\d|[67]\\d{2}|[089]))\\d{5}","\\d{7,10}",,,"92123456"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"1333\\d{4}","\\d{8}",,,"13331234"],"MM",95,"00","0",,,"0",,,,[[,"(\\d)(\\d{3})(\\d{3,4})","$1 $2 $3",["1|2[245]"],"0$1"],[,"(2)(\\d{4})(\\d{4})","$1 $2 $3",["251"],"0$1"],[,"(\\d)(\\d{2})(\\d{3})","$1 $2 $3",
["16|2"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["67|81"],"0$1"],[,"(\\d{2})(\\d{2})(\\d{3,4})","$1 $2 $3",["[4-8]"],"0$1"],[,"(9)(\\d{3})(\\d{4,6})","$1 $2 $3",["9(?:2[0-4]|[35-9]|4[137-9])"],"0$1"],[,"(9)([34]\\d{4})(\\d{4})","$1 $2 $3",["9(?:3[0-36]|4[0-57-9])"],"0$1"],[,"(9)(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3 $4",["92[56]"],"0$1"],[,"(9)(\\d{3})(\\d{3})(\\d{2})","$1 $2 $3 $4",["93"],"0$1"]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],MN:[,[,,"[12]\\d{7,9}|[57-9]\\d{7}",
"\\d{6,10}"],[,,"[12](?:1\\d|2(?:[1-3]\\d?|7\\d)|3[2-8]\\d{1,2}|4[2-68]\\d{1,2}|5[1-4689]\\d{1,2})\\d{5}|5[0568]\\d{6}","\\d{6,10}",,,"50123456"],[,,"(?:8(?:[05689]\\d|3[01])|9[013-9]\\d)\\d{5}","\\d{8}",,,"88123456"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"7[05-8]\\d{6}","\\d{8}",,,"75123456"],"MN",976,"001","0",,,"0",,,,[[,"([12]\\d)(\\d{2})(\\d{4})","$1 $2 $3",["[12]1"],"0$1"],[,"([12]2\\d)(\\d{5,6})","$1 $2",["[12]2[1-3]"],"0$1"],[,"([12]\\d{3})(\\d{5})","$1 $2",["[12](?:27|[3-5])",
"[12](?:27|[3-5]\\d)2"],"0$1"],[,"(\\d{4})(\\d{4})","$1 $2",["[57-9]"],"$1"],[,"([12]\\d{4})(\\d{4,5})","$1 $2",["[12](?:27|[3-5])","[12](?:27|[3-5]\\d)[4-9]"],"0$1"]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],MO:[,[,,"[268]\\d{7}","\\d{8}"],[,,"(?:28[2-57-9]|8[2-57-9]\\d)\\d{5}","\\d{8}",,,"28212345"],[,,"6(?:[2356]\\d|8[18])\\d{5}","\\d{8}",,,"66123456"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],"MO",853,"00",,,,,,,,[[,"([268]\\d{3})(\\d{4})","$1 $2"]],
,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],MP:[,[,,"[5689]\\d{9}","\\d{7}(?:\\d{3})?"],[,,"670(?:2(?:3[3-7]|56|8[5-8])|32[1238]|4(?:33|8[348])|5(?:32|55|88)|6(?:64|70|82)|78[589]|8[3-9]8|989)\\d{4}","\\d{7}(?:\\d{3})?",,,"6702345678"],[,,"670(?:2(?:3[3-7]|56|8[5-8])|32[1238]|4(?:33|8[348])|5(?:32|55|88)|6(?:64|70|82)|78[589]|8[3-9]8|989)\\d{4}","\\d{7}(?:\\d{3})?",,,"6702345678"],[,,"8(?:00|44|55|66|77|88)[2-9]\\d{6}","\\d{10}",,,"8002123456"],[,,"900[2-9]\\d{6}","\\d{10}",,,"9002123456"],
[,,"NA","NA"],[,,"5(?:00|33|44|66|77)[2-9]\\d{6}","\\d{10}",,,"5002345678"],[,,"NA","NA"],"MP",1,"011","1",,,"1",,,1,,,[,,"NA","NA"],,"670",[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],MQ:[,[,,"[56]\\d{8}","\\d{9}"],[,,"596(?:0[2-5]|[12]0|3[05-9]|4[024-8]|[5-7]\\d|89|9[4-8])\\d{4}","\\d{9}",,,"596301234"],[,,"696(?:[0-479]\\d|5[01]|8[0-689])\\d{4}","\\d{9}",,,"696201234"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],"MQ",596,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})",
"$1 $2 $3 $4",,"0$1"]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],MR:[,[,,"[2-48]\\d{7}","\\d{8}"],[,,"25[08]\\d{5}|35\\d{6}|45[1-7]\\d{5}","\\d{8}",,,"35123456"],[,,"[234][0-46-9]\\d{6}","\\d{8}",,,"22123456"],[,,"800\\d{5}","\\d{8}",,,"80012345"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],"MR",222,"00",,,,,,,,[[,"([2-48]\\d)(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4"]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],MS:[,[,,"[5689]\\d{9}","\\d{7}(?:\\d{3})?"],
[,,"664491\\d{4}","\\d{7}(?:\\d{3})?",,,"6644912345"],[,,"66449[2-6]\\d{4}","\\d{10}",,,"6644923456"],[,,"8(?:00|44|55|66|77|88)[2-9]\\d{6}","\\d{10}",,,"8002123456"],[,,"900[2-9]\\d{6}","\\d{10}",,,"9002123456"],[,,"NA","NA"],[,,"5(?:00|33|44|66|77)[2-9]\\d{6}","\\d{10}",,,"5002345678"],[,,"NA","NA"],"MS",1,"011","1",,,"1",,,,,,[,,"NA","NA"],,"664",[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],MT:[,[,,"[2357-9]\\d{7}","\\d{8}"],[,,"2(?:0(?:1[0-6]|3[1-4]|[69]\\d)|[1-357]\\d{2})\\d{4}","\\d{8}",,,"21001234"],
[,,"(?:7(?:210|[79]\\d{2})|9(?:2(?:1[01]|31)|696|8(?:1[1-3]|89|97)|9\\d{2}))\\d{4}","\\d{8}",,,"96961234"],[,,"800[3467]\\d{4}","\\d{8}",,,"80071234"],[,,"5(?:0(?:0(?:37|43)|6\\d{2}|70\\d|9[0168])|[12]\\d0[1-5])\\d{3}","\\d{8}",,,"50037123"],[,,"NA","NA"],[,,"NA","NA"],[,,"3550\\d{4}","\\d{8}",,,"35501234"],"MT",356,"00",,,,,,,,[[,"(\\d{4})(\\d{4})","$1 $2"]],,[,,"7117\\d{4}","\\d{8}",,,"71171234"],,,[,,"NA","NA"],[,,"501\\d{5}","\\d{8}",,,"50112345"],,,[,,"NA","NA"]],MU:[,[,,"[2-9]\\d{6,7}","\\d{7,8}"],
[,,"(?:2(?:[03478]\\d|1[0-7]|6[1-69])|4(?:[013568]\\d|2[4-7])|5(?:44\\d|471)|6\\d{2}|8(?:14|3[129]))\\d{4}","\\d{7,8}",,,"2012345"],[,,"5(?:2[59]\\d|4(?:2[1-389]|4\\d|7[1-9]|9\\d)|7\\d{2}|8(?:[0-2568]\\d|7[15-8])|9[0-8]\\d)\\d{4}","\\d{8}",,,"52512345"],[,,"80[012]\\d{4}","\\d{7}",,,"8001234"],[,,"30\\d{5}","\\d{7}",,,"3012345"],[,,"NA","NA"],[,,"NA","NA"],[,,"3(?:20|9\\d)\\d{4}","\\d{7}",,,"3201234"],"MU",230,"0(?:0|[2-7]0|33)",,,,,,"020",,[[,"([2-46-9]\\d{2})(\\d{4})","$1 $2",["[2-46-9]"]],[,"(5\\d{3})(\\d{4})",
"$1 $2",["5"]]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],MV:[,[,,"[3467]\\d{6}|9(?:00\\d{7}|\\d{6})","\\d{7,10}"],[,,"(?:3(?:0[01]|3[0-59])|6(?:[567][02468]|8[024689]|90))\\d{4}","\\d{7}",,,"6701234"],[,,"(?:46[46]|7[3-9]\\d|9[15-9]\\d)\\d{4}","\\d{7}",,,"7712345"],[,,"NA","NA"],[,,"900\\d{7}","\\d{10}",,,"9001234567"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],"MV",960,"0(?:0|19)",,,,,,"00",,[[,"(\\d{3})(\\d{4})","$1-$2",["[3467]|9(?:[1-9]|0[1-9])"]],[,"(\\d{3})(\\d{3})(\\d{4})",
"$1 $2 $3",["900"]]],,[,,"781\\d{4}","\\d{7}",,,"7812345"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],MW:[,[,,"(?:1(?:\\d{2})?|[2789]\\d{2})\\d{6}","\\d{7,9}"],[,,"(?:1[2-9]|21\\d{2})\\d{5}","\\d{7,9}",,,"1234567"],[,,"(?:111|77\\d|88\\d|99\\d)\\d{6}","\\d{9}",,,"991234567"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],"MW",265,"00","0",,,"0",,,,[[,"(\\d)(\\d{3})(\\d{3})","$1 $2 $3",["1"],"0$1"],[,"(2\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["2"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})",
"$1 $2 $3 $4",["[1789]"],"0$1"]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],MX:[,[,,"[1-9]\\d{9,10}","\\d{7,11}"],[,,"(?:33|55|81)\\d{8}|(?:2(?:0[01]|2[2-9]|3[1-35-8]|4[13-9]|7[1-689]|8[1-578]|9[467])|3(?:1[1-79]|[2458][1-9]|7[1-8]|9[1-5])|4(?:1[1-57-9]|[24-6][1-9]|[37][1-8]|8[1-35-9]|9[2-689])|5(?:88|9[1-79])|6(?:1[2-68]|[234][1-9]|5[1-3689]|6[12457-9]|7[1-7]|8[67]|9[4-8])|7(?:[13467][1-9]|2[1-8]|5[13-9]|8[1-69]|9[17])|8(?:2[13-689]|3[1-6]|4[124-6]|6[1246-9]|7[1-378]|9[12479])|9(?:1[346-9]|2[1-4]|3[2-46-8]|5[1348]|[69][1-9]|7[12]|8[1-8]))\\d{7}",
"\\d{7,10}",,,"2221234567"],[,,"1(?:(?:33|55|81)\\d{8}|(?:2(?:2[2-9]|3[1-35-8]|4[13-9]|7[1-689]|8[1-578]|9[467])|3(?:1[1-79]|[2458][1-9]|7[1-8]|9[1-5])|4(?:1[1-57-9]|[24-6][1-9]|[37][1-8]|8[1-35-9]|9[2-689])|5(?:88|9[1-79])|6(?:1[2-68]|[2-4][1-9]|5[1-3689]|6[12457-9]|7[1-7]|8[67]|9[4-8])|7(?:[13467][1-9]|2[1-8]|5[13-9]|8[1-69]|9[17])|8(?:2[13-689]|3[1-6]|4[124-6]|6[1246-9]|7[1-378]|9[12479])|9(?:1[346-9]|2[1-4]|3[2-46-8]|5[1348]|[69][1-9]|7[12]|8[1-8]))\\d{7})","\\d{11}",,,"12221234567"],[,,"8(?:00|88)\\d{7}",
"\\d{10}",,,"8001234567"],[,,"900\\d{7}","\\d{10}",,,"9001234567"],[,,"300\\d{7}","\\d{10}",,,"3001234567"],[,,"500\\d{7}","\\d{10}",,,"5001234567"],[,,"NA","NA"],"MX",52,"0[09]","01",,,"0[12]|04[45](\\d{10})","1$1",,,[[,"([358]\\d)(\\d{4})(\\d{4})","$1 $2 $3",["33|55|81"],"01 $1",,1],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["[2467]|3[0-2457-9]|5[089]|8[02-9]|9[0-35-9]"],"01 $1",,1],[,"(1)([358]\\d)(\\d{4})(\\d{4})","044 $2 $3 $4",["1(?:33|55|81)"],"$1",,1],[,"(1)(\\d{3})(\\d{3})(\\d{4})","044 $2 $3 $4",
["1(?:[2467]|3[0-2457-9]|5[089]|8[2-9]|9[1-35-9])"],"$1",,1]],[[,"([358]\\d)(\\d{4})(\\d{4})","$1 $2 $3",["33|55|81"],"01 $1",,1],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["[2467]|3[0-2457-9]|5[089]|8[02-9]|9[0-35-9]"],"01 $1",,1],[,"(1)([358]\\d)(\\d{4})(\\d{4})","$1 $2 $3 $4",["1(?:33|55|81)"]],[,"(1)(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3 $4",["1(?:[2467]|3[0-2457-9]|5[089]|8[2-9]|9[1-35-9])"]]],[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],1,,[,,"NA","NA"]],MY:[,[,,"[13-9]\\d{7,9}","\\d{6,10}"],[,,"(?:3[2-9]\\d|[4-9][2-9])\\d{6}",
"\\d{6,9}",,,"323456789"],[,,"1(?:1[1-5]\\d{2}|[02-4679][2-9]\\d|59\\d{2}|8(?:1[23]|[2-9]\\d))\\d{5}","\\d{9,10}",,,"123456789"],[,,"1[378]00\\d{6}","\\d{10}",,,"1300123456"],[,,"1600\\d{6}","\\d{10}",,,"1600123456"],[,,"NA","NA"],[,,"NA","NA"],[,,"154\\d{7}","\\d{10}",,,"1541234567"],"MY",60,"00","0",,,"0",,,,[[,"([4-79])(\\d{3})(\\d{4})","$1-$2 $3",["[4-79]"],"0$1"],[,"(3)(\\d{4})(\\d{4})","$1-$2 $3",["3"],"0$1"],[,"([18]\\d)(\\d{3})(\\d{3,4})","$1-$2 $3",["1[02-46-9][1-9]|8"],"0$1"],[,"(1)([36-8]00)(\\d{2})(\\d{4})",
"$1-$2-$3-$4",["1[36-8]0"]],[,"(11)(\\d{4})(\\d{4})","$1-$2 $3",["11"],"0$1"],[,"(15[49])(\\d{3})(\\d{4})","$1-$2 $3",["15"],"0$1"]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],MZ:[,[,,"[28]\\d{7,8}","\\d{8,9}"],[,,"2(?:[1346]\\d|5[0-2]|[78][12]|93)\\d{5}","\\d{8}",,,"21123456"],[,,"8[23467]\\d{7}","\\d{9}",,,"821234567"],[,,"800\\d{6}","\\d{9}",,,"800123456"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],"MZ",258,"00",,,,,,,,[[,"([28]\\d)(\\d{3})(\\d{3,4})","$1 $2 $3",
["2|8[2-7]"]],[,"(80\\d)(\\d{3})(\\d{3})","$1 $2 $3",["80"]]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],NA:[,[,,"[68]\\d{7,8}","\\d{8,9}"],[,,"6(?:1(?:17|2(?:[0189]\\d|[2-6]|7\\d?)|3(?:[01378]|2\\d)|4(?:[024]|10?|3[15]?)|69|7[014])|2(?:17|5(?:[0-36-8]|4\\d?)|69|70)|3(?:17|2(?:[0237]\\d?|[14-689])|34|6[289]|7[01]|81)|4(?:17|2(?:[012]|7?)|4(?:[06]|1\\d)|5(?:[01357]|[25]\\d?)|69|7[01])|5(?:17|2(?:[0459]|[23678]\\d?)|69|7[01])|6(?:17|2(?:5|6\\d?)|38|42|69|7[01])|7(?:17|2(?:[569]|[234]\\d?)|3(?:0\\d?|[13])|69|7[01]))\\d{4}",
"\\d{8,9}",,,"61221234"],[,,"(?:60|8[125])\\d{7}","\\d{9}",,,"811234567"],[,,"NA","NA"],[,,"8701\\d{5}","\\d{9}",,,"870123456"],[,,"NA","NA"],[,,"NA","NA"],[,,"8(?:3\\d{2}|86)\\d{5}","\\d{8,9}",,,"88612345"],"NA",264,"00","0",,,"0",,,,[[,"(8\\d)(\\d{3})(\\d{4})","$1 $2 $3",["8[1235]"],"0$1"],[,"(6\\d)(\\d{3})(\\d{3,4})","$1 $2 $3",["6"],"0$1"],[,"(88)(\\d{3})(\\d{3})","$1 $2 $3",["88"],"0$1"],[,"(870)(\\d{3})(\\d{3})","$1 $2 $3",["870"],"0$1"]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA",
"NA"]],NC:[,[,,"[2-57-9]\\d{5}","\\d{6}"],[,,"(?:2[03-9]|3[0-5]|4[1-7]|88)\\d{4}","\\d{6}",,,"201234"],[,,"(?:5[0-4]|[79]\\d|8[0-79])\\d{4}","\\d{6}",,,"751234"],[,,"NA","NA"],[,,"36\\d{4}","\\d{6}",,,"366711"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],"NC",687,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})","$1.$2.$3",["[2-46-9]|5[0-4]"]]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],NE:[,[,,"[0289]\\d{7}","\\d{8}"],[,,"2(?:0(?:20|3[1-7]|4[134]|5[14]|6[14578]|7[1-578])|1(?:4[145]|5[14]|6[14-68]|7[169]|88))\\d{4}",
"\\d{8}",,,"20201234"],[,,"(?:8[089]|9\\d)\\d{6}","\\d{8}",,,"93123456"],[,,"08\\d{6}","\\d{8}",,,"08123456"],[,,"09\\d{6}","\\d{8}",,,"09123456"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],"NE",227,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[289]|09"]],[,"(08)(\\d{3})(\\d{3})","$1 $2 $3",["08"]]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],1,,[,,"NA","NA"]],NF:[,[,,"[13]\\d{5}","\\d{5,6}"],[,,"(?:1(?:06|17|28|39)|3[012]\\d)\\d{3}","\\d{5,6}",,,"106609"],[,,"3[58]\\d{4}","\\d{5,6}",
,,"381234"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],"NF",672,"00",,,,,,,,[[,"(\\d{2})(\\d{4})","$1 $2",["1"]],[,"(\\d)(\\d{5})","$1 $2",["3"]]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],NG:[,[,,"[1-6]\\d{5,8}|9\\d{5,9}|[78]\\d{5,13}","\\d{5,14}"],[,,"[12]\\d{6,7}|9(?:0[3-9]|[1-9]\\d)\\d{5}|(?:3\\d|4[023568]|5[02368]|6[02-469]|7[4-69]|8[2-9])\\d{6}|(?:4[47]|5[14579]|6[1578]|7[0-357])\\d{5,6}|(?:78|41)\\d{5}","\\d{5,9}",,,"12345678"],[,,"(?:1(?:7[34]\\d|8(?:04|[124579]\\d|8[0-3])|95\\d)|287[0-7]|3(?:18[1-8]|88[0-7]|9(?:8[5-9]|6[1-5]))|4(?:28[0-2]|6(?:7[1-9]|8[02-47])|88[0-2])|5(?:2(?:7[7-9]|8\\d)|38[1-79]|48[0-7]|68[4-7])|6(?:2(?:7[7-9]|8\\d)|4(?:3[7-9]|[68][129]|7[04-69]|9[1-8])|58[0-2]|98[7-9])|7(?:38[0-7]|69[1-8]|78[2-4])|8(?:28[3-9]|38[0-2]|4(?:2[12]|3[147-9]|5[346]|7[4-9]|8[014-689]|90)|58[1-8]|78[2-9]|88[5-7])|98[07]\\d)\\d{4}|(?:70[1-689]\\d|8(?:0(?:1[01]|[2-9]\\d)|1(?:[0-8]\\d|9[01]))|90[23589]\\d)\\d{6}",
"\\d{8,10}",,,"8021234567"],[,,"800\\d{7,11}","\\d{10,14}",,,"80017591759"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],"NG",234,"009","0",,,"0",,,,[[,"(\\d{3})(\\d{3})(\\d{3,4})","$1 $2 $3",["70|8[01]|90[23589]"],"0$1"],[,"(\\d)(\\d{3})(\\d{3,4})","$1 $2 $3",["[12]|9(?:0[3-9]|[1-9])"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{2,3})","$1 $2 $3",["[3-6]|7(?:[1-79]|0[1-9])|8[2-9]"],"0$1"],[,"([78]00)(\\d{4})(\\d{4,5})","$1 $2 $3",["[78]00"],"0$1"],[,"([78]00)(\\d{5})(\\d{5,6})","$1 $2 $3",["[78]00"],
"0$1"],[,"(78)(\\d{2})(\\d{3})","$1 $2 $3",["78"],"0$1"]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"700\\d{7,11}","\\d{10,14}",,,"7001234567"],,,[,,"NA","NA"]],NI:[,[,,"[12578]\\d{7}","\\d{8}"],[,,"2\\d{7}","\\d{8}",,,"21234567"],[,,"5(?:5[0-7]\\d{5}|[78]\\d{6})|7[5-8]\\d{6}|8\\d{7}","\\d{8}",,,"81234567"],[,,"1800\\d{4}","\\d{8}",,,"18001234"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],"NI",505,"00",,,,,,,,[[,"(\\d{4})(\\d{4})","$1 $2"]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA",
"NA"]],NL:[,[,,"1\\d{4,8}|[2-7]\\d{8}|[89]\\d{6,9}","\\d{5,10}"],[,,"(?:1[0135-8]|2[02-69]|3[0-68]|4[0135-9]|[57]\\d|8[478])\\d{7}","\\d{9}",,,"101234567"],[,,"6[1-58]\\d{7}","\\d{9}",,,"612345678"],[,,"800\\d{4,7}","\\d{7,10}",,,"8001234"],[,,"90[069]\\d{4,7}","\\d{7,10}",,,"9061234"],[,,"NA","NA"],[,,"NA","NA"],[,,"85\\d{7}","\\d{9}",,,"851234567"],"NL",31,"00","0",,,"0",,,,[[,"([1-578]\\d)(\\d{3})(\\d{4})","$1 $2 $3",["1[035]|2[0346]|3[03568]|4[0356]|5[0358]|7|8[4578]"],"0$1"],[,"([1-5]\\d{2})(\\d{3})(\\d{3})",
"$1 $2 $3",["1[16-8]|2[259]|3[124]|4[17-9]|5[124679]"],"0$1"],[,"(6)(\\d{8})","$1 $2",["6[0-57-9]"],"0$1"],[,"(66)(\\d{7})","$1 $2",["66"],"0$1"],[,"(14)(\\d{3,4})","$1 $2",["14"],"$1"],[,"([89]0\\d)(\\d{4,7})","$1 $2",["80|9"],"0$1"]],,[,,"66\\d{7}","\\d{9}",,,"662345678"],,,[,,"14\\d{3,4}","\\d{5,6}"],[,,"140(?:1(?:[035]|[16-8]\\d)|2(?:[0346]|[259]\\d)|3(?:[03568]|[124]\\d)|4(?:[0356]|[17-9]\\d)|5(?:[0358]|[124679]\\d)|7\\d|8[458])","\\d{5,6}",,,"14020"],,,[,,"NA","NA"]],NO:[,[,,"0\\d{4}|[2-9]\\d{7}",
"\\d{5}(?:\\d{3})?"],[,,"(?:2[1-4]|3[1-3578]|5[1-35-7]|6[1-4679]|7[0-8])\\d{6}","\\d{8}",,,"21234567"],[,,"(?:4[015-8]|5[89]|9\\d)\\d{6}","\\d{8}",,,"40612345"],[,,"80[01]\\d{5}","\\d{8}",,,"80012345"],[,,"82[09]\\d{5}","\\d{8}",,,"82012345"],[,,"810(?:0[0-6]|[2-8]\\d)\\d{3}","\\d{8}",,,"81021234"],[,,"880\\d{5}","\\d{8}",,,"88012345"],[,,"85[0-5]\\d{5}","\\d{8}",,,"85012345"],"NO",47,"00",,,,,,,,[[,"([489]\\d{2})(\\d{2})(\\d{3})","$1 $2 $3",["[489]"]],[,"([235-7]\\d)(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",
["[235-7]"]]],,[,,"NA","NA"],1,,[,,"NA","NA"],[,,"0\\d{4}|81(?:0(?:0[7-9]|1\\d)|5\\d{2})\\d{3}","\\d{5}(?:\\d{3})?",,,"01234"],1,,[,,"81[23]\\d{5}","\\d{8}",,,"81212345"]],NP:[,[,,"[1-8]\\d{7}|9(?:[1-69]\\d{6,8}|7[2-6]\\d{5,7}|8\\d{8})","\\d{6,10}"],[,,"(?:1[0-6]\\d|2[13-79][2-6]|3[135-8][2-6]|4[146-9][2-6]|5[135-7][2-6]|6[13-9][2-6]|7[15-9][2-6]|8[1-46-9][2-6]|9[1-79][2-6])\\d{5}","\\d{6,8}",,,"14567890"],[,,"9(?:6[013]|7[245]|8[0-24-6])\\d{7}","\\d{10}",,,"9841234567"],[,,"NA","NA"],[,,"NA","NA"],
[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],"NP",977,"00","0",,,"0",,,,[[,"(1)(\\d{7})","$1-$2",["1[2-6]"],"0$1"],[,"(\\d{2})(\\d{6})","$1-$2",["1[01]|[2-8]|9(?:[1-69]|7[15-9])"],"0$1"],[,"(9\\d{2})(\\d{7})","$1-$2",["9(?:6[013]|7[245]|8)"],"$1"]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],NR:[,[,,"[458]\\d{6}","\\d{7}"],[,,"(?:444|888)\\d{4}","\\d{7}",,,"4441234"],[,,"55[5-9]\\d{4}","\\d{7}",,,"5551234"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],"NR",
674,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2"]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],NU:[,[,,"[1-5]\\d{3}","\\d{4}"],[,,"[34]\\d{3}","\\d{4}",,,"4002"],[,,"[125]\\d{3}","\\d{4}",,,"1234"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],"NU",683,"00",,,,,,,,,,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],NZ:[,[,,"6[235-9]\\d{6}|[2-57-9]\\d{7,10}","\\d{7,11}"],[,,"(?:3[2-79]|[49][2-9]|6[235-9]|7[2-57-9])\\d{6}|24099\\d{3}","\\d{7,8}",,,"32345678"],
[,,"2(?:[028]\\d{7,8}|1(?:[03]\\d{5,7}|[12457]\\d{5,6}|[689]\\d{5})|[79]\\d{7})","\\d{8,10}",,,"211234567"],[,,"508\\d{6,7}|80\\d{6,8}","\\d{8,10}",,,"800123456"],[,,"90\\d{7,9}","\\d{9,11}",,,"900123456"],[,,"NA","NA"],[,,"70\\d{7}","\\d{9}",,,"701234567"],[,,"NA","NA"],"NZ",64,"0(?:0|161)","0",,,"0",,"00",,[[,"([34679])(\\d{3})(\\d{4})","$1-$2 $3",["[346]|7[2-57-9]|9[1-9]"],"0$1"],[,"(24099)(\\d{3})","$1 $2",["240","2409","24099"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["21"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3,5})",
"$1 $2 $3",["2(?:1[1-9]|[69]|7[0-35-9])|70|86"],"0$1"],[,"(2\\d)(\\d{3,4})(\\d{4})","$1 $2 $3",["2[028]"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3,4})","$1 $2 $3",["2(?:10|74)|5|[89]0"],"0$1"]],,[,,"[28]6\\d{6,7}","\\d{8,9}",,,"26123456"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],OM:[,[,,"(?:2[2-6]|5|9\\d)\\d{6}|800\\d{5,6}","\\d{7,9}"],[,,"2[2-6]\\d{6}","\\d{8}",,,"23123456"],[,,"9(?:0[1-9]|[1-9]\\d)\\d{5}","\\d{8}",,,"92123456"],[,,"8007\\d{4,5}|500\\d{4}","\\d{7,9}",,,"80071234"],[,,"(?:900)\\d{5}",
"\\d{8}",,,"90012345"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],"OM",968,"00",,,,,,,,[[,"(2\\d)(\\d{6})","$1 $2",["2"]],[,"(9\\d{3})(\\d{4})","$1 $2",["9"]],[,"([58]00)(\\d{4,6})","$1 $2",["[58]"]]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],PA:[,[,,"[1-9]\\d{6,7}","\\d{7,8}"],[,,"(?:1(?:0[0-8]|1[49]|2[37]|3[0137]|4[147]|5[05]|6[58]|7[0167]|8[58]|9[139])|2(?:[0235679]\\d|1[0-7]|4[04-9]|8[028])|3(?:[09]\\d|1[014-7]|2[0-3]|3[03]|4[03-57]|55|6[068]|7[06-8]|8[06-9])|4(?:3[013-69]|4\\d|7[0-589])|5(?:[01]\\d|2[0-7]|[56]0|79)|7(?:0[09]|2[0-267]|3[06]|[469]0|5[06-9]|7[0-24-79]|8[7-9])|8(?:09|[34]\\d|5[0134]|8[02])|9(?:0[6-9]|1[016-8]|2[036-8]|3[3679]|40|5[0489]|6[06-9]|7[046-9]|8[36-8]|9[1-9]))\\d{4}",
"\\d{7}",,,"2001234"],[,,"(?:1[16]1|21[89]|8(?:1[01]|7[23]))\\d{4}|6(?:[024-9]\\d|1[0-5]|3[0-24-9])\\d{5}","\\d{7,8}",,,"60012345"],[,,"80[09]\\d{4}","\\d{7}",,,"8001234"],[,,"(?:779|8(?:55|60|7[78])|9(?:00|81))\\d{4}","\\d{7}",,,"8601234"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],"PA",507,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1-$2",["[1-57-9]"]],[,"(\\d{4})(\\d{4})","$1-$2",["6"]]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],PE:[,[,,"[14-9]\\d{7,8}","\\d{6,9}"],[,,"(?:1\\d|4[1-4]|5[1-46]|6[1-7]|7[2-46]|8[2-4])\\d{6}",
"\\d{6,8}",,,"11234567"],[,,"9\\d{8}","\\d{9}",,,"912345678"],[,,"800\\d{5}","\\d{8}",,,"80012345"],[,,"805\\d{5}","\\d{8}",,,"80512345"],[,,"801\\d{5}","\\d{8}",,,"80112345"],[,,"80[24]\\d{5}","\\d{8}",,,"80212345"],[,,"NA","NA"],"PE",51,"19(?:1[124]|77|90)00","0"," Anexo ",,"0",,,,[[,"(1)(\\d{7})","$1 $2",["1"],"(0$1)"],[,"([4-8]\\d)(\\d{6})","$1 $2",["[4-7]|8[2-4]"],"(0$1)"],[,"(\\d{3})(\\d{5})","$1 $2",["80"],"(0$1)"],[,"(9\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["9"],"$1"]],,[,,"NA","NA"],,,[,,"NA",
"NA"],[,,"NA","NA"],,,[,,"NA","NA"]],PF:[,[,,"4\\d{5,7}|8\\d{7}","\\d{6}(?:\\d{2})?"],[,,"4(?:[09][45689]\\d|4)\\d{4}","\\d{6}(?:\\d{2})?",,,"40412345"],[,,"8[79]\\d{6}","\\d{8}",,,"87123456"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],"PF",689,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["4[09]|8[79]"]],[,"(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3",["44"]]],,[,,"NA","NA"],,,[,,"44\\d{4}","\\d{6}",,,"441234"],[,,"NA","NA"],,,[,,"NA","NA"]],PG:[,[,,"[1-9]\\d{6,7}",
"\\d{7,8}"],[,,"(?:3[0-2]\\d|4[25]\\d|5[34]\\d|64[1-9]|77(?:[0-24]\\d|30)|85[02-46-9]|9[78]\\d)\\d{4}","\\d{7}",,,"3123456"],[,,"(?:20150|68\\d{2}|7(?:[0-689]\\d|75)\\d{2})\\d{3}","\\d{7,8}",,,"6812345"],[,,"180\\d{4}","\\d{7}",,,"1801234"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"275\\d{4}","\\d{7}",,,"2751234"],"PG",675,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2",["[13-689]|27"]],[,"(\\d{4})(\\d{4})","$1 $2",["20|7"]]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],PH:[,[,,"2\\d{5,7}|[3-9]\\d{7,9}|1800\\d{7,9}",
"\\d{5,13}"],[,,"2\\d{5}(?:\\d{2})?|(?:3[2-68]|4[2-9]|5[2-6]|6[2-58]|7[24578]|8[2-8])\\d{7}|88(?:22\\d{6}|42\\d{4})","\\d{5,10}",,,"21234567"],[,,"(?:81[37]|9(?:0[5-9]|1[024-9]|2[0-35-9]|3[02-9]|4[236-9]|50|7[34-79]|89|9[4-9]))\\d{7}","\\d{10}",,,"9051234567"],[,,"1800\\d{7,9}","\\d{11,13}",,,"180012345678"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],"PH",63,"00","0",,,"0",,,,[[,"(2)(\\d{3})(\\d{4})","$1 $2 $3",["2"],"(0$1)"],[,"(2)(\\d{5})","$1 $2",["2"],"(0$1)"],[,"(\\d{4})(\\d{4,6})",
"$1 $2",["3(?:23|39|46)|4(?:2[3-6]|[35]9|4[26]|76)|5(?:22|44)|642|8(?:62|8[245])","3(?:230|397|461)|4(?:2(?:35|[46]4|51)|396|4(?:22|63)|59[347]|76[15])|5(?:221|446)|642[23]|8(?:622|8(?:[24]2|5[13]))"],"(0$1)"],[,"(\\d{5})(\\d{4})","$1 $2",["346|4(?:27|9[35])|883","3469|4(?:279|9(?:30|56))|8834"],"(0$1)"],[,"([3-8]\\d)(\\d{3})(\\d{4})","$1 $2 $3",["[3-8]"],"(0$1)"],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["81|9"],"0$1"],[,"(1800)(\\d{3})(\\d{4})","$1 $2 $3",["1"]],[,"(1800)(\\d{1,2})(\\d{3})(\\d{4})",
"$1 $2 $3 $4",["1"]]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],PK:[,[,,"1\\d{8}|[2-8]\\d{5,11}|9(?:[013-9]\\d{4,9}|2\\d(?:111\\d{6}|\\d{3,7}))","\\d{6,12}"],[,,"(?:21|42)[2-9]\\d{7}|(?:2[25]|4[0146-9]|5[1-35-7]|6[1-8]|7[14]|8[16]|91)[2-9]\\d{6}|(?:2(?:3[2358]|4[2-4]|9[2-8])|45[3479]|54[2-467]|60[468]|72[236]|8(?:2[2-689]|3[23578]|4[3478]|5[2356])|9(?:1|2[2-8]|3[27-9]|4[2-6]|6[3569]|9[25-8]))[2-9]\\d{5,6}|58[126]\\d{7}","\\d{6,10}",,,"2123456789"],[,,"3(?:0\\d|1[0-6]|2[0-5]|3[0-7]|4[0-8]|55|64)\\d{7}",
"\\d{10}",,,"3012345678"],[,,"800\\d{5}","\\d{8}",,,"80012345"],[,,"900\\d{5}","\\d{8}",,,"90012345"],[,,"NA","NA"],[,,"122\\d{6}","\\d{9}",,,"122044444"],[,,"NA","NA"],"PK",92,"00","0",,,"0",,,,[[,"(\\d{2})(111)(\\d{3})(\\d{3})","$1 $2 $3 $4",["(?:2[125]|4[0-246-9]|5[1-35-7]|6[1-8]|7[14]|8[16]|91)1","(?:2[125]|4[0-246-9]|5[1-35-7]|6[1-8]|7[14]|8[16]|91)11","(?:2[125]|4[0-246-9]|5[1-35-7]|6[1-8]|7[14]|8[16]|91)111"],"(0$1)"],[,"(\\d{3})(111)(\\d{3})(\\d{3})","$1 $2 $3 $4",["2[349]|45|54|60|72|8[2-5]|9[2-9]",
"(?:2[349]|45|54|60|72|8[2-5]|9[2-9])\\d1","(?:2[349]|45|54|60|72|8[2-5]|9[2-9])\\d11","(?:2[349]|45|54|60|72|8[2-5]|9[2-9])\\d111"],"(0$1)"],[,"(\\d{2})(\\d{7,8})","$1 $2",["(?:2[125]|4[0-246-9]|5[1-35-7]|6[1-8]|7[14]|8[16]|91)[2-9]"],"(0$1)"],[,"(\\d{3})(\\d{6,7})","$1 $2",["2[349]|45|54|60|72|8[2-5]|9[2-9]","(?:2[349]|45|54|60|72|8[2-5]|9[2-9])\\d[2-9]"],"(0$1)"],[,"(3\\d{2})(\\d{7})","$1 $2",["3"],"0$1"],[,"([15]\\d{3})(\\d{5,6})","$1 $2",["58[12]|1"],"(0$1)"],[,"(586\\d{2})(\\d{5})","$1 $2",
["586"],"(0$1)"],[,"([89]00)(\\d{3})(\\d{2})","$1 $2 $3",["[89]00"],"0$1"]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"(?:2(?:[125]|3[2358]|4[2-4]|9[2-8])|4(?:[0-246-9]|5[3479])|5(?:[1-35-7]|4[2-467])|6(?:[1-8]|0[468])|7(?:[14]|2[236])|8(?:[16]|2[2-689]|3[23578]|4[3478]|5[2356])|9(?:1|22|3[27-9]|4[2-6]|6[3569]|9[2-7]))111\\d{6}","\\d{11,12}",,,"21111825888"],,,[,,"NA","NA"]],PL:[,[,,"[12]\\d{6,8}|[3-57-9]\\d{8}|6\\d{5,8}","\\d{6,9}"],[,,"(?:1[2-8]|2[2-69]|3[2-4]|4[1-468]|5[24-689]|6[1-3578]|7[14-7]|8[1-79]|9[145])\\d{7}|[12]2\\d{5}",
"\\d{6,9}",,,"123456789"],[,,"(?:5[0137]|6[069]|7[2389]|88)\\d{7}","\\d{9}",,,"512345678"],[,,"800\\d{6}","\\d{9}",,,"800123456"],[,,"70\\d{7}","\\d{9}",,,"701234567"],[,,"801\\d{6}","\\d{9}",,,"801234567"],[,,"NA","NA"],[,,"39\\d{7}","\\d{9}",,,"391234567"],"PL",48,"00",,,,,,,,[[,"(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[14]|2[0-57-9]|3[2-4]|5[24-689]|6[1-3578]|7[14-7]|8[1-79]|9[145]"]],[,"(\\d{2})(\\d{1})(\\d{4})","$1 $2 $3",["[12]2"]],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["26|39|5[0137]|6[0469]|7[02389]|8[08]"]],
[,"(\\d{3})(\\d{2})(\\d{2,3})","$1 $2 $3",["64"]],[,"(\\d{3})(\\d{3})","$1 $2",["64"]]],,[,,"64\\d{4,7}","\\d{6,9}",,,"641234567"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],PM:[,[,,"[45]\\d{5}","\\d{6}"],[,,"41\\d{4}","\\d{6}",,,"411234"],[,,"55\\d{4}","\\d{6}",,,"551234"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],"PM",508,"00","0",,,"0",,,,[[,"([45]\\d)(\\d{2})(\\d{2})","$1 $2 $3",,"0$1"]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],PR:[,[,,"[5789]\\d{9}",
"\\d{7}(?:\\d{3})?"],[,,"(?:787|939)[2-9]\\d{6}","\\d{7}(?:\\d{3})?",,,"7872345678"],[,,"(?:787|939)[2-9]\\d{6}","\\d{7}(?:\\d{3})?",,,"7872345678"],[,,"8(?:00|44|55|66|77|88)[2-9]\\d{6}","\\d{10}",,,"8002345678"],[,,"900[2-9]\\d{6}","\\d{10}",,,"9002345678"],[,,"NA","NA"],[,,"5(?:00|33|44|66|77)[2-9]\\d{6}","\\d{10}",,,"5002345678"],[,,"NA","NA"],"PR",1,"011","1",,,"1",,,1,,,[,,"NA","NA"],,"787|939",[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],PS:[,[,,"[24589]\\d{7,8}|1(?:[78]\\d{8}|[49]\\d{2,3})",
"\\d{4,10}"],[,,"(?:22[234789]|42[45]|82[01458]|92[369])\\d{5}","\\d{7,8}",,,"22234567"],[,,"5[69]\\d{7}","\\d{9}",,,"599123456"],[,,"1800\\d{6}","\\d{10}",,,"1800123456"],[,,"1(?:4|9\\d)\\d{2}","\\d{4,5}",,,"19123"],[,,"1700\\d{6}","\\d{10}",,,"1700123456"],[,,"NA","NA"],[,,"NA","NA"],"PS",970,"00","0",,,"0",,,,[[,"([2489])(2\\d{2})(\\d{4})","$1 $2 $3",["[2489]"],"0$1"],[,"(5[69]\\d)(\\d{3})(\\d{3})","$1 $2 $3",["5"],"0$1"],[,"(1[78]00)(\\d{3})(\\d{3})","$1 $2 $3",["1[78]"],"$1"]],,[,,"NA","NA"],
,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],PT:[,[,,"[2-46-9]\\d{8}","\\d{9}"],[,,"2(?:[12]\\d|[35][1-689]|4[1-59]|6[1-35689]|7[1-9]|8[1-69]|9[1256])\\d{6}","\\d{9}",,,"212345678"],[,,"9(?:[1236]\\d{2}|480)\\d{5}","\\d{9}",,,"912345678"],[,,"80[02]\\d{6}","\\d{9}",,,"800123456"],[,,"6(?:0[178]|4[68])\\d{6}|76(?:0[1-57]|1[2-47]|2[237])\\d{5}","\\d{9}",,,"760123456"],[,,"80(?:8\\d|9[1579])\\d{5}","\\d{9}",,,"808123456"],[,,"884[0-4689]\\d{5}","\\d{9}",,,"884123456"],[,,"30\\d{7}","\\d{9}",,,"301234567"],
"PT",351,"00",,,,,,,,[[,"(2\\d)(\\d{3})(\\d{4})","$1 $2 $3",["2[12]"]],[,"([2-46-9]\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["2[3-9]|[346-9]"]]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"7(?:0(?:7\\d|8[17]))\\d{5}","\\d{9}",,,"707123456"],,,[,,"600\\d{6}","\\d{9}",,,"600110000"]],PW:[,[,,"[2-8]\\d{6}","\\d{7}"],[,,"2552255|(?:277|345|488|5(?:35|44|87)|6(?:22|54|79)|7(?:33|47)|8(?:24|55|76))\\d{4}","\\d{7}",,,"2771234"],[,,"(?:6[234689]0|77[45789])\\d{4}","\\d{7}",,,"6201234"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA",
"NA"],[,,"NA","NA"],[,,"NA","NA"],"PW",680,"01[12]",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2"]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],PY:[,[,,"5[0-5]\\d{4,7}|[2-46-9]\\d{5,8}","\\d{5,9}"],[,,"(?:[26]1|3[289]|4[124678]|7[123]|8[1236])\\d{5,7}|(?:2(?:2[4568]|7[15]|9[1-5])|3(?:18|3[167]|4[2357]|51)|4(?:18|2[45]|3[12]|5[13]|64|71|9[1-47])|5(?:[1-4]\\d|5[0234])|6(?:3[1-3]|44|7[1-4678])|7(?:17|4[0-4]|6[1-578]|75|8[0-8])|858)\\d{5,6}","\\d{5,9}",,,"212345678"],[,,"9(?:6[12]|[78][1-6]|9[1-5])\\d{6}",
"\\d{9}",,,"961456789"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"8700[0-4]\\d{4}","\\d{9}",,,"870012345"],"PY",595,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{5,7})","$1 $2",["(?:[26]1|3[289]|4[124678]|7[123]|8[1236])"],"($1)"],[,"(\\d{3})(\\d{3,6})","$1 $2",["[2-9]0"],"0$1"],[,"(\\d{3})(\\d{6})","$1 $2",["9[1-9]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["8700"]],[,"(\\d{3})(\\d{4,6})","$1 $2",["[2-8][1-9]"],"($1)"]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"[2-9]0\\d{4,7}","\\d{6,9}",
,,"201234567"],,,[,,"NA","NA"]],QA:[,[,,"[2-8]\\d{6,7}","\\d{7,8}"],[,,"4[04]\\d{6}","\\d{7,8}",,,"44123456"],[,,"[3567]\\d{7}","\\d{7,8}",,,"33123456"],[,,"800\\d{4}","\\d{7,8}",,,"8001234"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],"QA",974,"00",,,,,,,,[[,"([28]\\d{2})(\\d{4})","$1 $2",["[28]"]],[,"([3-7]\\d{3})(\\d{4})","$1 $2",["[3-7]"]]],,[,,"2(?:[12]\\d|61)\\d{4}","\\d{7}",,,"2123456"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],RE:[,[,,"[268]\\d{8}","\\d{9}"],[,,"262\\d{6}",
"\\d{9}",,,"262161234"],[,,"6(?:9[23]|47)\\d{6}","\\d{9}",,,"692123456"],[,,"80\\d{7}","\\d{9}",,,"801234567"],[,,"89[1-37-9]\\d{6}","\\d{9}",,,"891123456"],[,,"8(?:1[019]|2[0156]|84|90)\\d{6}","\\d{9}",,,"810123456"],[,,"NA","NA"],[,,"NA","NA"],"RE",262,"00","0",,,"0",,,,[[,"([268]\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",,"0$1"]],,[,,"NA","NA"],1,"262|6[49]|8",[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],RO:[,[,,"2\\d{5,8}|[37-9]\\d{8}","\\d{6,9}"],[,,"2(?:1(?:\\d{7}|9\\d{3})|[3-6](?:\\d{7}|\\d9\\d{2}))|3[13-6]\\d{7}",
"\\d{6,9}",,,"211234567"],[,,"7(?:[0-8]\\d{2}|99\\d)\\d{5}","\\d{9}",,,"712345678"],[,,"800\\d{6}","\\d{9}",,,"800123456"],[,,"90[036]\\d{6}","\\d{9}",,,"900123456"],[,,"801\\d{6}","\\d{9}",,,"801123456"],[,,"802\\d{6}","\\d{9}",,,"802123456"],[,,"NA","NA"],"RO",40,"00","0"," int ",,"0",,,,[[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[23]1"],"0$1"],[,"(21)(\\d{4})","$1 $2",["21"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[23][3-7]|[7-9]"],"0$1"],[,"(2\\d{2})(\\d{3})","$1 $2",["2[3-6]"],"0$1"]],
,[,,"NA","NA"],,,[,,"NA","NA"],[,,"37\\d{7}","\\d{9}",,,"372123456"],,,[,,"NA","NA"]],RS:[,[,,"[126-9]\\d{4,11}|3(?:[0-79]\\d{3,10}|8[2-9]\\d{2,9})","\\d{5,12}"],[,,"(?:1(?:[02-9][2-9]|1[1-9])\\d|2(?:[0-24-7][2-9]\\d|[389](?:0[2-9]|[2-9]\\d))|3(?:[0-8][2-9]\\d|9(?:[2-9]\\d|0[2-9])))\\d{3,8}","\\d{5,12}",,,"10234567"],[,,"6(?:[0-689]|7\\d)\\d{6,7}","\\d{8,10}",,,"601234567"],[,,"800\\d{3,9}","\\d{6,12}",,,"80012345"],[,,"(?:90[0169]|78\\d)\\d{3,7}","\\d{6,12}",,,"90012345"],[,,"NA","NA"],[,,"NA","NA"],
[,,"NA","NA"],"RS",381,"00","0",,,"0",,,,[[,"([23]\\d{2})(\\d{4,9})","$1 $2",["(?:2[389]|39)0"],"0$1"],[,"([1-3]\\d)(\\d{5,10})","$1 $2",["1|2(?:[0-24-7]|[389][1-9])|3(?:[0-8]|9[1-9])"],"0$1"],[,"(6\\d)(\\d{6,8})","$1 $2",["6"],"0$1"],[,"([89]\\d{2})(\\d{3,9})","$1 $2",["[89]"],"0$1"],[,"(7[26])(\\d{4,9})","$1 $2",["7[26]"],"0$1"],[,"(7[08]\\d)(\\d{4,9})","$1 $2",["7[08]"],"0$1"]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"7[06]\\d{4,10}","\\d{6,12}",,,"700123456"],,,[,,"NA","NA"]],RU:[,[,,"[3489]\\d{9}",
"\\d{10}"],[,,"(?:3(?:0[12]|4[1-35-79]|5[1-3]|65|8[1-58]|9[0145])|4(?:01|1[1356]|2[13467]|7[1-5]|8[1-7]|9[1-689])|8(?:1[1-8]|2[01]|3[13-6]|4[0-8]|5[15]|6[1-35-79]|7[1-37-9]))\\d{7}","\\d{10}",,,"3011234567"],[,,"9\\d{9}","\\d{10}",,,"9123456789"],[,,"80[04]\\d{7}","\\d{10}",,,"8001234567"],[,,"80[39]\\d{7}","\\d{10}",,,"8091234567"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],"RU",7,"810","8",,,"8",,"8~10",,[[,"(\\d{3})(\\d{2})(\\d{2})","$1-$2-$3",["[1-79]"],"$1",,1],[,"([3489]\\d{2})(\\d{3})(\\d{2})(\\d{2})",
"$1 $2-$3-$4",["[34689]"],"8 ($1)",,1],[,"(7\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["7"],"8 ($1)",,1]],[[,"([3489]\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2-$3-$4",["[34689]"],"8 ($1)",,1],[,"(7\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["7"],"8 ($1)",,1]],[,,"NA","NA"],1,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],RW:[,[,,"[027-9]\\d{7,8}","\\d{8,9}"],[,,"2[258]\\d{7}|06\\d{6}","\\d{8,9}",,,"250123456"],[,,"7[238]\\d{7}","\\d{9}",,,"720123456"],[,,"800\\d{6}","\\d{9}",,,"800123456"],[,,"900\\d{6}","\\d{9}",
,,"900123456"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],"RW",250,"00","0",,,"0",,,,[[,"(2\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["2"],"$1"],[,"([7-9]\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["[7-9]"],"0$1"],[,"(0\\d)(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["0"]]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],1,,[,,"NA","NA"]],SA:[,[,,"1\\d{7,8}|(?:[2-467]|92)\\d{7}|5\\d{8}|8\\d{9}","\\d{7,10}"],[,,"11\\d{7}|1?(?:2[24-8]|3[35-8]|4[3-68]|6[2-5]|7[235-7])\\d{6}","\\d{7,9}",,,"112345678"],[,,"(?:5(?:[013-689]\\d|7[0-26-8])|811\\d)\\d{6}",
"\\d{9,10}",,,"512345678"],[,,"800\\d{7}","\\d{10}",,,"8001234567"],[,,"NA","NA"],[,,"92[05]\\d{6}","\\d{9}",,,"920012345"],[,,"NA","NA"],[,,"NA","NA"],"SA",966,"00","0",,,"0",,,,[[,"([1-467])(\\d{3})(\\d{4})","$1 $2 $3",["[1-467]"],"0$1"],[,"(1\\d)(\\d{3})(\\d{4})","$1 $2 $3",["1[1-467]"],"0$1"],[,"(5\\d)(\\d{3})(\\d{4})","$1 $2 $3",["5"],"0$1"],[,"(92\\d{2})(\\d{5})","$1 $2",["92"],"$1"],[,"(800)(\\d{3})(\\d{4})","$1 $2 $3",["80"],"$1"],[,"(811)(\\d{3})(\\d{3,4})","$1 $2 $3",["81"],"0$1"]],,[,,
"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],SB:[,[,,"[1-9]\\d{4,6}","\\d{5,7}"],[,,"(?:1[4-79]|[23]\\d|4[0-2]|5[03]|6[0-37])\\d{3}","\\d{5}",,,"40123"],[,,"48\\d{3}|7(?:30|[46-8]\\d|5[025-9]|9[0-5])\\d{4}|8[4-8]\\d{5}|9(?:1[2-9]|2[013-9]|3[0-2]|[46]\\d|5[0-46-9]|7[0-689]|8[0-79]|9[0-8])\\d{4}","\\d{5,7}",,,"7421234"],[,,"1[38]\\d{3}","\\d{5}",,,"18123"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"5[12]\\d{3}","\\d{5}",,,"51123"],"SB",677,"0[01]",,,,,,,,[[,"(\\d{2})(\\d{5})","$1 $2",
["[7-9]"]]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],SC:[,[,,"[2468]\\d{5,6}","\\d{6,7}"],[,,"4[2-46]\\d{5}","\\d{7}",,,"4217123"],[,,"2[5-8]\\d{5}","\\d{7}",,,"2510123"],[,,"8000\\d{2}","\\d{6}",,,"800000"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"64\\d{5}","\\d{7}",,,"6412345"],"SC",248,"0[0-2]",,,,,,"00",,[[,"(\\d{3})(\\d{3})","$1 $2",["8"]],[,"(\\d)(\\d{3})(\\d{3})","$1 $2 $3",["[246]"]]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],SD:[,[,,"[19]\\d{8}",
"\\d{9}"],[,,"1(?:[125]\\d|8[3567])\\d{6}","\\d{9}",,,"121231234"],[,,"9[0-3569]\\d{7}","\\d{9}",,,"911231234"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],"SD",249,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",,"0$1"]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],SE:[,[,,"[1-9]\\d{5,9}","\\d{5,10}"],[,,"1(?:0[1-8]\\d{6}|[136]\\d{5,7}|(?:2[0-35]|4[0-4]|5[0-25-9]|7[13-6]|[89]\\d)\\d{5,6})|2(?:[136]\\d{5,7}|(?:2[0-7]|4[0136-8]|5[0138]|7[018]|8[01]|9[0-57])\\d{5,6})|3(?:[356]\\d{5,7}|(?:0[0-4]|1\\d|2[0-25]|4[056]|7[0-2]|8[0-3]|9[023])\\d{5,6})|4(?:0[1-9]\\d{4,6}|[246]\\d{5,7}|(?:1[013-8]|3[0135]|5[14-79]|7[0-246-9]|8[0156]|9[0-689])\\d{5,6})|5(?:0[0-6]|[15][0-5]|2[0-68]|3[0-4]|4\\d|6[03-5]|7[013]|8[0-79]|9[01])\\d{5,6}|6(?:0[1-9]\\d{4,6}|3\\d{5,7}|(?:1[1-3]|2[0-4]|4[02-57]|5[0-37]|6[0-3]|7[0-2]|8[0247]|9[0-356])\\d{5,6})|8[1-9]\\d{5,7}|9(?:0[1-9]\\d{4,6}|(?:1[0-68]|2\\d|3[02-5]|4[0-3]|5[0-4]|[68][01]|7[0135-8])\\d{5,6})",
"\\d{5,9}",,,"8123456"],[,,"7[02369]\\d{7}","\\d{9}",,,"701234567"],[,,"20(?:0(?:0\\d{2}|[1-9](?:0\\d{1,4}|[1-9]\\d{4}))|1(?:0\\d{4}|[1-9]\\d{4,5})|[2-9]\\d{5})","\\d{6,9}",,,"20123456"],[,,"9(?:00|39|44)(?:1(?:[0-26]\\d{5}|[3-57-9]\\d{2})|2(?:[0-2]\\d{5}|[3-9]\\d{2})|3(?:[0139]\\d{5}|[24-8]\\d{2})|4(?:[045]\\d{5}|[1-36-9]\\d{2})|5(?:5\\d{5}|[0-46-9]\\d{2})|6(?:[679]\\d{5}|[0-58]\\d{2})|7(?:[078]\\d{5}|[1-69]\\d{2})|8(?:[578]\\d{5}|[0-469]\\d{2}))","\\d{7}(?:\\d{3})?",,,"9001234567"],[,,"77(?:0(?:0\\d{2}|[1-9](?:0\\d|[1-9]\\d{4}))|[1-6][1-9]\\d{5})",
"\\d{6}(?:\\d{3})?",,,"771234567"],[,,"75[1-8]\\d{6}","\\d{9}",,,"751234567"],[,,"NA","NA"],"SE",46,"00","0",,,"0",,,,[[,"(8)(\\d{2,3})(\\d{2,3})(\\d{2})","$1-$2 $3 $4",["8"],"0$1"],[,"([1-69]\\d)(\\d{2,3})(\\d{2})(\\d{2})","$1-$2 $3 $4",["1[013689]|2[0136]|3[1356]|4[0246]|54|6[03]|90"],"0$1"],[,"([1-69]\\d)(\\d{3})(\\d{2})","$1-$2 $3",["1[13689]|2[136]|3[1356]|4[0246]|54|6[03]|90"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1-$2 $3 $4",["1[2457]|2[2457-9]|3[0247-9]|4[1357-9]|5[0-35-9]|6[124-9]|9(?:[125-8]|3[0-5]|4[0-3])"],
"0$1"],[,"(\\d{3})(\\d{2,3})(\\d{2})","$1-$2 $3",["1[2457]|2[2457-9]|3[0247-9]|4[1357-9]|5[0-35-9]|6[124-9]|9(?:[125-8]|3[0-5]|4[0-3])"],"0$1"],[,"(7\\d)(\\d{3})(\\d{2})(\\d{2})","$1-$2 $3 $4",["7"],"0$1"],[,"(77)(\\d{2})(\\d{2})","$1-$2$3",["7"],"0$1"],[,"(20)(\\d{2,3})(\\d{2})","$1-$2 $3",["20"],"0$1"],[,"(9[034]\\d)(\\d{2})(\\d{2})(\\d{3})","$1-$2 $3 $4",["9[034]"],"0$1"],[,"(9[034]\\d)(\\d{4})","$1-$2",["9[034]"],"0$1"]],[[,"(8)(\\d{2,3})(\\d{2,3})(\\d{2})","$1 $2 $3 $4",["8"]],[,"([1-69]\\d)(\\d{2,3})(\\d{2})(\\d{2})",
"$1 $2 $3 $4",["1[013689]|2[0136]|3[1356]|4[0246]|54|6[03]|90"]],[,"([1-69]\\d)(\\d{3})(\\d{2})","$1 $2 $3",["1[13689]|2[136]|3[1356]|4[0246]|54|6[03]|90"]],[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["1[2457]|2[2457-9]|3[0247-9]|4[1357-9]|5[0-35-9]|6[124-9]|9(?:[125-8]|3[0-5]|4[0-3])"]],[,"(\\d{3})(\\d{2,3})(\\d{2})","$1 $2 $3",["1[2457]|2[2457-9]|3[0247-9]|4[1357-9]|5[0-35-9]|6[124-9]|9(?:[125-8]|3[0-5]|4[0-3])"]],[,"(7\\d)(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["7"]],[,"(77)(\\d{2})(\\d{2})",
"$1 $2 $3",["7"]],[,"(20)(\\d{2,3})(\\d{2})","$1 $2 $3",["20"]],[,"(9[034]\\d)(\\d{2})(\\d{2})(\\d{3})","$1 $2 $3 $4",["9[034]"]],[,"(9[034]\\d)(\\d{4})","$1 $2",["9[034]"]]],[,,"74[02-9]\\d{6}","\\d{9}",,,"740123456"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],SG:[,[,,"[36]\\d{7}|[17-9]\\d{7,10}","\\d{8,11}"],[,,"6[1-9]\\d{6}","\\d{8}",,,"61234567"],[,,"(?:8[1-8]|9[0-8])\\d{6}","\\d{8}",,,"81234567"],[,,"1?800\\d{7}","\\d{10,11}",,,"18001234567"],[,,"1900\\d{7}","\\d{11}",,,"19001234567"],[,
,"NA","NA"],[,,"NA","NA"],[,,"3[12]\\d{6}","\\d{8}",,,"31234567"],"SG",65,"0[0-3]\\d",,,,,,,,[[,"([3689]\\d{3})(\\d{4})","$1 $2",["[369]|8[1-9]"]],[,"(1[89]00)(\\d{3})(\\d{4})","$1 $2 $3",["1[89]"]],[,"(7000)(\\d{4})(\\d{3})","$1 $2 $3",["70"]],[,"(800)(\\d{3})(\\d{4})","$1 $2 $3",["80"]]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"7000\\d{7}","\\d{11}",,,"70001234567"],,,[,,"NA","NA"]],SH:[,[,,"[256]\\d{4}","\\d{4,5}"],[,,"2(?:[0-57-9]\\d|6[4-9])\\d{2}","\\d{5}",,,"22158"],[,,"[56]\\d{4}","\\d{5}"],[,,"NA",
"NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"262\\d{2}","\\d{5}"],"SH",290,"00",,,,,,,,,,[,,"NA","NA"],1,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],SI:[,[,,"[1-7]\\d{6,7}|[89]\\d{4,7}","\\d{5,8}"],[,,"(?:1\\d|[25][2-8]|3[24-8]|4[24-8]|7[3-8])\\d{6}","\\d{7,8}",,,"11234567"],[,,"(?:[37][01]|4[0139]|51|6[48])\\d{6}","\\d{8}",,,"31234567"],[,,"80\\d{4,6}","\\d{6,8}",,,"80123456"],[,,"90\\d{4,6}|89[1-3]\\d{2,5}","\\d{5,8}",,,"90123456"],[,,"NA","NA"],[,,"NA","NA"],[,,"(?:59|8[1-3])\\d{6}","\\d{8}",
,,"59012345"],"SI",386,"00","0",,,"0",,,,[[,"(\\d)(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[12]|3[24-8]|4[24-8]|5[2-8]|7[3-8]"],"(0$1)"],[,"([3-7]\\d)(\\d{3})(\\d{3})","$1 $2 $3",["[37][01]|4[0139]|51|6"],"0$1"],[,"([89][09])(\\d{3,6})","$1 $2",["[89][09]"],"0$1"],[,"([58]\\d{2})(\\d{5})","$1 $2",["59|8[1-3]"],"0$1"]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],SJ:[,[,,"0\\d{4}|[4789]\\d{7}","\\d{5}(?:\\d{3})?"],[,,"79\\d{6}","\\d{8}",,,"79123456"],[,,"(?:4[015-8]|5[89]|9\\d)\\d{6}",
"\\d{8}",,,"41234567"],[,,"80[01]\\d{5}","\\d{8}",,,"80012345"],[,,"82[09]\\d{5}","\\d{8}",,,"82012345"],[,,"810(?:0[0-6]|[2-8]\\d)\\d{3}","\\d{8}",,,"81021234"],[,,"880\\d{5}","\\d{8}",,,"88012345"],[,,"85[0-5]\\d{5}","\\d{8}",,,"85012345"],"SJ",47,"00",,,,,,,,,,[,,"NA","NA"],,,[,,"NA","NA"],[,,"0\\d{4}|81(?:0(?:0[7-9]|1\\d)|5\\d{2})\\d{3}","\\d{5}(?:\\d{3})?",,,"01234"],1,,[,,"81[23]\\d{5}","\\d{8}",,,"81212345"]],SK:[,[,,"(?:[2-68]\\d{8}|9\\d{6,8})","\\d{7,9}"],[,,"[2-5]\\d{8}","\\d{9}",,,"212345678"],
[,,"9(?:0[1-8]|1[0-24-9]|4[0489]|50)\\d{6}","\\d{9}",,,"912123456"],[,,"800\\d{6}","\\d{9}",,,"800123456"],[,,"9(?:[78]\\d{7}|00\\d{6})","\\d{9}",,,"900123456"],[,,"8[5-9]\\d{7}","\\d{9}",,,"850123456"],[,,"NA","NA"],[,,"6(?:02|5[0-4]|9[0-6])\\d{6}","\\d{9}",,,"690123456"],"SK",421,"00","0",,,"0",,,,[[,"(2)(\\d{3})(\\d{3})(\\d{2})","$1/$2 $3 $4",["2"],"0$1"],[,"([3-5]\\d)(\\d{3})(\\d{2})(\\d{2})","$1/$2 $3 $4",["[3-5]"],"0$1"],[,"([689]\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["[689]"],"0$1"],[,"(9090)(\\d{3})",
"$1 $2",["9090"],"0$1"]],,[,,"9090\\d{3}","\\d{7}",,,"9090123"],,,[,,"(?:602|8(?:00|[5-9]\\d)|9(?:00|[78]\\d))\\d{6}|9090\\d{3}","\\d{7,9}",,,"800123456"],[,,"96\\d{7}","\\d{9}",,,"961234567"],,,[,,"NA","NA"]],SL:[,[,,"[2-9]\\d{7}","\\d{6,8}"],[,,"[235]2[2-4][2-9]\\d{4}","\\d{6,8}",,,"22221234"],[,,"(?:2[15]|3[03-5]|4[04]|5[05]|66|7[6-9]|88|99)\\d{6}","\\d{6,8}",,,"25123456"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],"SL",232,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{6})","$1 $2",
,"(0$1)"]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],SM:[,[,,"[05-7]\\d{7,9}","\\d{6,10}"],[,,"0549(?:8[0157-9]|9\\d)\\d{4}","\\d{6,10}",,,"0549886377"],[,,"6[16]\\d{6}","\\d{8}",,,"66661212"],[,,"NA","NA"],[,,"7[178]\\d{6}","\\d{8}",,,"71123456"],[,,"NA","NA"],[,,"NA","NA"],[,,"5[158]\\d{6}","\\d{8}",,,"58001110"],"SM",378,"00",,,,"(?:0549)?([89]\\d{5})","0549$1",,,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[5-7]"]],[,"(0549)(\\d{6})","$1 $2",["0"]],[,"(\\d{6})","0549 $1",
["[89]"]]],[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[5-7]"]],[,"(0549)(\\d{6})","($1) $2",["0"]],[,"(\\d{6})","(0549) $1",["[89]"]]],[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],1,,[,,"NA","NA"]],SN:[,[,,"[3789]\\d{8}","\\d{9}"],[,,"3(?:0(?:1[0-2]|80)|282|3(?:8[1-9]|9[3-9])|611|90[1-5])\\d{5}","\\d{9}",,,"301012345"],[,,"7(?:[067]\\d|21|8[0-26]|90)\\d{6}","\\d{9}",,,"701234567"],[,,"800\\d{6}","\\d{9}",,,"800123456"],[,,"88[4689]\\d{6}","\\d{9}",,,"884123456"],[,,"81[02468]\\d{6}","\\d{9}",
,,"810123456"],[,,"NA","NA"],[,,"3392\\d{5}|93330\\d{4}","\\d{9}",,,"933301234"],"SN",221,"00",,,,,,,,[[,"(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[379]"]],[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["8"]]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],SO:[,[,,"[1-79]\\d{6,8}","\\d{7,9}"],[,,"(?:1\\d|2[0-79]|3[0-46-8]|4[0-7]|59)\\d{5}","\\d{7}",,,"4012345"],[,,"(?:15\\d|2(?:4\\d|8)|6[1-35-9]?\\d{2}|7(?:[1-8]\\d|99?\\d)|9(?:07|[2-9])\\d)\\d{5}","\\d{7,9}",,,"71123456"],
[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],"SO",252,"00","0",,,"0",,,,[[,"(\\d)(\\d{6})","$1 $2",["2[0-79]|[13-5]"]],[,"(\\d)(\\d{7})","$1 $2",["24|[67]"]],[,"(\\d{2})(\\d{5,7})","$1 $2",["15|28|6[1-35-9]|799|9[2-9]"]],[,"(90\\d)(\\d{3})(\\d{3})","$1 $2 $3",["90"]]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],SR:[,[,,"[2-8]\\d{5,6}","\\d{6,7}"],[,,"(?:2[1-3]|3[0-7]|4\\d|5[2-58]|68\\d)\\d{4}","\\d{6,7}",,,"211234"],[,,"(?:7[124-7]|8[1-9])\\d{5}","\\d{7}",
,,"7412345"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"5(?:6\\d{4}|90[0-4]\\d{3})","\\d{6,7}",,,"561234"],"SR",597,"00",,,,,,,,[[,"(\\d{3})(\\d{3})","$1-$2",["[2-4]|5[2-58]"]],[,"(\\d{2})(\\d{2})(\\d{2})","$1-$2-$3",["56"]],[,"(\\d{3})(\\d{4})","$1-$2",["59|[6-8]"]]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],SS:[,[,,"[19]\\d{8}","\\d{9}"],[,,"18\\d{7}","\\d{9}",,,"181234567"],[,,"(?:12|9[1257])\\d{7}","\\d{9}",,,"977123456"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA",
"NA"],[,,"NA","NA"],[,,"NA","NA"],"SS",211,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",,"0$1"]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],ST:[,[,,"[29]\\d{6}","\\d{7}"],[,,"22\\d{5}","\\d{7}",,,"2221234"],[,,"9(?:0(?:0[5-9]|[1-9]\\d)|[89]\\d{2})\\d{3}","\\d{7}",,,"9812345"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],"ST",239,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2"]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],SV:[,[,
,"[267]\\d{7}|[89]\\d{6}(?:\\d{4})?","\\d{7,8}|\\d{11}"],[,,"2[1-6]\\d{6}","\\d{8}",,,"21234567"],[,,"[67]\\d{7}","\\d{8}",,,"70123456"],[,,"800\\d{4}(?:\\d{4})?","\\d{7}(?:\\d{4})?",,,"8001234"],[,,"900\\d{4}(?:\\d{4})?","\\d{7}(?:\\d{4})?",,,"9001234"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],"SV",503,"00",,,,,,,,[[,"(\\d{4})(\\d{4})","$1 $2",["[267]"]],[,"(\\d{3})(\\d{4})","$1 $2",["[89]"]],[,"(\\d{3})(\\d{4})(\\d{4})","$1 $2 $3",["[89]"]]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA",
"NA"]],SX:[,[,,"[5789]\\d{9}","\\d{7}(?:\\d{3})?"],[,,"7215(?:4[2-8]|8[239]|9[056])\\d{4}","\\d{7}(?:\\d{3})?",,,"7215425678"],[,,"7215(?:1[02]|2\\d|5[034679]|8[014-8])\\d{4}","\\d{10}",,,"7215205678"],[,,"8(?:00|44|55|66|77|88)[2-9]\\d{6}","\\d{10}",,,"8002123456"],[,,"900[2-9]\\d{6}","\\d{10}",,,"9002123456"],[,,"NA","NA"],[,,"5(?:00|33|44|66|77)[2-9]\\d{6}","\\d{10}",,,"5002345678"],[,,"NA","NA"],"SX",1,"011","1",,,"1",,,,,,[,,"NA","NA"],,"721",[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],SY:[,
[,,"[1-59]\\d{7,8}","\\d{6,9}"],[,,"(?:1(?:1\\d?|4\\d|[2356])|2(?:1\\d?|[235])|3(?:[13]\\d|4)|4[13]|5[1-3])\\d{6}","\\d{6,9}",,,"112345678"],[,,"9(?:22|[35][0-8]|4\\d|6[024-9]|88|9[0-489])\\d{6}","\\d{9}",,,"944567890"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],"SY",963,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["[1-5]"],"0$1",,1],[,"(9\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["9"],"0$1",,1]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],SZ:[,
[,,"[027]\\d{7}","\\d{8}"],[,,"2[2-5]\\d{6}","\\d{8}",,,"22171234"],[,,"7[6-8]\\d{6}","\\d{8}",,,"76123456"],[,,"0800\\d{4}","\\d{8}",,,"08001234"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],"SZ",268,"00",,,,,,,,[[,"(\\d{4})(\\d{4})","$1 $2",["[027]"]]],,[,,"NA","NA"],,,[,,"0800\\d{4}","\\d{8}",,,"08001234"],[,,"NA","NA"],1,,[,,"NA","NA"]],TA:[,[,,"8\\d{3}","\\d{4}"],[,,"8\\d{3}","\\d{4}",,,"8999"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],"TA",
290,"00",,,,,,,,,,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],TC:[,[,,"[5689]\\d{9}","\\d{7}(?:\\d{3})?"],[,,"649(?:712|9(?:4\\d|50))\\d{4}","\\d{7}(?:\\d{3})?",,,"6497121234"],[,,"649(?:2(?:3[129]|4[1-7])|3(?:3[1-389]|4[1-7])|4[34][1-3])\\d{4}","\\d{10}",,,"6492311234"],[,,"8(?:00|44|55|66|77|88)[2-9]\\d{6}","\\d{10}",,,"8002345678"],[,,"900[2-9]\\d{6}","\\d{10}",,,"9002345678"],[,,"NA","NA"],[,,"5(?:00|33|44|66|77)[2-9]\\d{6}","\\d{10}",,,"5002345678"],[,,"64971[01]\\d{4}","\\d{10}",
,,"6497101234"],"TC",1,"011","1",,,"1",,,,,,[,,"NA","NA"],,"649",[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],TD:[,[,,"[2679]\\d{7}","\\d{8}"],[,,"22(?:[3789]0|5[0-5]|6[89])\\d{4}","\\d{8}",,,"22501234"],[,,"(?:6[023568]\\d|77\\d|9\\d{2})\\d{5}","\\d{8}",,,"63012345"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],"TD",235,"00|16",,,,,,"00",,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4"]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],TG:[,[,,"[29]\\d{7}",
"\\d{8}"],[,,"2(?:2[2-7]|3[23]|44|55|66|77)\\d{5}","\\d{8}",,,"22212345"],[,,"9[0-389]\\d{6}","\\d{8}",,,"90112345"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],"TG",228,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4"]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],TH:[,[,,"[2-9]\\d{7,8}|1\\d{3}(?:\\d{5,6})?","\\d{4}|\\d{8,10}"],[,,"(?:2\\d|3[2-9]|4[2-5]|5[2-6]|7[3-7])\\d{6}","\\d{8}",,,"21234567"],[,,"(?:14|6[1-3]|[89]\\d)\\d{7}","\\d{9}",
,,"812345678"],[,,"1800\\d{6}","\\d{10}",,,"1800123456"],[,,"1900\\d{6}","\\d{10}",,,"1900123456"],[,,"NA","NA"],[,,"NA","NA"],[,,"6[08]\\d{7}","\\d{9}",,,"601234567"],"TH",66,"00","0",,,"0",,,,[[,"(2)(\\d{3})(\\d{4})","$1 $2 $3",["2"],"0$1"],[,"([13-9]\\d)(\\d{3})(\\d{3,4})","$1 $2 $3",["14|[3-9]"],"0$1"],[,"(1[89]00)(\\d{3})(\\d{3})","$1 $2 $3",["1"],"$1"]],,[,,"NA","NA"],,,[,,"1\\d{3}","\\d{4}",,,"1100"],[,,"1\\d{3}","\\d{4}",,,"1100"],,,[,,"NA","NA"]],TJ:[,[,,"[3-59]\\d{8}","\\d{3,9}"],[,,"(?:3(?:1[3-5]|2[245]|3[12]|4[24-7]|5[25]|72)|4(?:46|74|87))\\d{6}",
"\\d{3,9}",,,"372123456"],[,,"(?:50[125]|9[0-35-9]\\d)\\d{6}","\\d{9}",,,"917123456"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],"TJ",992,"810","8",,,"8",,"8~10",,[[,"([349]\\d{2})(\\d{2})(\\d{4})","$1 $2 $3",["[34]7|91[78]"],"(8) $1",,1],[,"([459]\\d)(\\d{3})(\\d{4})","$1 $2 $3",["4[48]|5|9(?:1[59]|[0235-9])"],"(8) $1",,1],[,"(331700)(\\d)(\\d{2})","$1 $2 $3",["331","3317","33170","331700"],"(8) $1",,1],[,"(\\d{4})(\\d)(\\d{4})","$1 $2 $3",["3[1-5]","3(?:[1245]|3(?:[02-9]|1[0-589]))"],
"(8) $1",,1]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],TK:[,[,,"[2-9]\\d{3}","\\d{4}"],[,,"[2-4]\\d{3}","\\d{4}",,,"3010"],[,,"[5-9]\\d{3}","\\d{4}",,,"5190"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],"TK",690,"00",,,,,,,,,,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],TL:[,[,,"[2-489]\\d{6}|7\\d{6,7}","\\d{7,8}"],[,,"(?:2[1-5]|3[1-9]|4[1-4])\\d{5}","\\d{7}",,,"2112345"],[,,"7[3-8]\\d{6}","\\d{8}",,,"77212345"],[,,"80\\d{5}","\\d{7}",
,,"8012345"],[,,"90\\d{5}","\\d{7}",,,"9012345"],[,,"NA","NA"],[,,"70\\d{5}","\\d{7}",,,"7012345"],[,,"NA","NA"],"TL",670,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2",["[2-489]"]],[,"(\\d{4})(\\d{4})","$1 $2",["7"]]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],TM:[,[,,"[1-6]\\d{7}","\\d{8}"],[,,"(?:1(?:2\\d|3[1-9])|2(?:22|4[0-35-8])|3(?:22|4[03-9])|4(?:22|3[128]|4\\d|6[15])|5(?:22|5[7-9]|6[014-689]))\\d{5}","\\d{8}",,,"12345678"],[,,"6[1-9]\\d{6}","\\d{8}",,,"66123456"],[,,"NA","NA"],
[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],"TM",993,"810","8",,,"8",,"8~10",,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2-$3-$4",["12"],"(8 $1)"],[,"(\\d{2})(\\d{6})","$1 $2",["6"],"8 $1"],[,"(\\d{3})(\\d)(\\d{2})(\\d{2})","$1 $2-$3-$4",["13|[2-5]"],"(8 $1)"]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],TN:[,[,,"[2-57-9]\\d{7}","\\d{8}"],[,,"3(?:[012]\\d|6[0-4]|91)\\d{5}|7\\d{7}|81200\\d{3}","\\d{8}",,,"71234567"],[,,"(?:[259]\\d|4[0-6])\\d{6}","\\d{8}",,,"20123456"],
[,,"8010\\d{4}","\\d{8}",,,"80101234"],[,,"88\\d{6}","\\d{8}",,,"88123456"],[,,"8[12]10\\d{4}","\\d{8}",,,"81101234"],[,,"NA","NA"],[,,"NA","NA"],"TN",216,"00",,,,,,,,[[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3"]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],TO:[,[,,"[02-8]\\d{4,6}","\\d{5,7}"],[,,"(?:2\\d|3[1-8]|4[1-4]|[56]0|7[0149]|8[05])\\d{3}","\\d{5}",,,"20123"],[,,"(?:7[578]|8[47-9])\\d{5}","\\d{7}",,,"7715123"],[,,"0800\\d{3}","\\d{7}",,,"0800222"],[,,"NA","NA"],[,,"NA","NA"],
[,,"NA","NA"],[,,"NA","NA"],"TO",676,"00",,,,,,,,[[,"(\\d{2})(\\d{3})","$1-$2",["[1-6]|7[0-4]|8[05]"]],[,"(\\d{3})(\\d{4})","$1 $2",["7[5-9]|8[47-9]"]],[,"(\\d{4})(\\d{3})","$1 $2",["0"]]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],1,,[,,"NA","NA"]],TR:[,[,,"[2-589]\\d{9}|444\\d{4}","\\d{7,10}"],[,,"(?:2(?:[13][26]|[28][2468]|[45][268]|[67][246])|3(?:[13][28]|[24-6][2468]|[78][02468]|92)|4(?:[16][246]|[23578][2468]|4[26]))\\d{7}","\\d{10}",,,"2123456789"],[,,"5(?:0[1-7]|22|[34]\\d|5[1-59]|9[246])\\d{7}",
"\\d{10}",,,"5012345678"],[,,"800\\d{7}","\\d{10}",,,"8001234567"],[,,"900\\d{7}","\\d{10}",,,"9001234567"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],"TR",90,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["[23]|4(?:[0-35-9]|4[0-35-9])"],"(0$1)",,1],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["[589]"],"0$1",,1],[,"(444)(\\d{1})(\\d{3})","$1 $2 $3",["444"]]],,[,,"512\\d{7}","\\d{10}",,,"5123456789"],,,[,,"444\\d{4}","\\d{7}",,,"4441444"],[,,"444\\d{4}|850\\d{7}","\\d{7,10}",,,"4441444"],,
,[,,"NA","NA"]],TT:[,[,,"[589]\\d{9}","\\d{7}(?:\\d{3})?"],[,,"868(?:2(?:01|2[1-6]|3[1-5])|6(?:0[79]|1[02-8]|2[1-9]|[3-69]\\d|7[0-79])|82[124])\\d{4}","\\d{7}(?:\\d{3})?",,,"8682211234"],[,,"868(?:2(?:[789]\\d)|3(?:0[1-9]|1[02-9]|[2-9]\\d)|4[6-9]\\d|6(?:20|78|8\\d)|7(?:0[1-9]|1[02-9]|[2-9]\\d))\\d{4}","\\d{10}",,,"8682911234"],[,,"8(?:00|44|55|66|77|88)[2-9]\\d{6}","\\d{10}",,,"8002345678"],[,,"900[2-9]\\d{6}","\\d{10}",,,"9002345678"],[,,"NA","NA"],[,,"5(?:00|33|44|66|77)[2-9]\\d{6}","\\d{10}",,
,"5002345678"],[,,"NA","NA"],"TT",1,"011","1",,,"1",,,,,,[,,"NA","NA"],,"868",[,,"NA","NA"],[,,"NA","NA"],,,[,,"868619\\d{4}","\\d{10}"]],TV:[,[,,"[279]\\d{4,6}","\\d{5,7}"],[,,"2[02-9]\\d{3}","\\d{5}",,,"20123"],[,,"(?:70\\d|90)\\d{4}","\\d{6,7}",,,"901234"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],"TV",688,"00",,,,,,,,,,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],TW:[,[,,"[2-689]\\d{7,8}|7\\d{7,9}","\\d{8,10}"],[,,"[2-8]\\d{7,8}","\\d{8,9}",,,"21234567"],
[,,"9\\d{8}","\\d{9}",,,"912345678"],[,,"800\\d{6}","\\d{9}",,,"800123456"],[,,"900\\d{6}","\\d{9}",,,"900123456"],[,,"NA","NA"],[,,"NA","NA"],[,,"70\\d{8}","\\d{10}",,,"7012345678"],"TW",886,"0(?:0[25679]|19)","0","#",,"0",,,,[[,"([2-8])(\\d{3,4})(\\d{4})","$1 $2 $3",["[2-6]|[78][1-9]"],"0$1"],[,"([89]\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["80|9"],"0$1"],[,"(70)(\\d{4})(\\d{4})","$1 $2 $3",["70"],"0$1"]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],TZ:[,[,,"\\d{9}","\\d{7,9}"],[,,
"2[2-8]\\d{7}","\\d{7,9}",,,"222345678"],[,,"(?:6[25-8]|7[13-9])\\d{7}","\\d{9}",,,"621234567"],[,,"80[08]\\d{6}","\\d{9}",,,"800123456"],[,,"90\\d{7}","\\d{9}",,,"900123456"],[,,"8(?:40|6[01])\\d{6}","\\d{9}",,,"840123456"],[,,"NA","NA"],[,,"41\\d{7}","\\d{9}",,,"412345678"],"TZ",255,"00[056]","0",,,"0",,,,[[,"([24]\\d)(\\d{3})(\\d{4})","$1 $2 $3",["[24]"],"0$1"],[,"([67]\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["[67]"],"0$1"],[,"([89]\\d{2})(\\d{2})(\\d{4})","$1 $2 $3",["[89]"],"0$1"]],,[,,"NA","NA"],
,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],UA:[,[,,"[3-9]\\d{8}","\\d{5,9}"],[,,"(?:3[1-8]|4[13-8]|5[1-7]|6[12459])\\d{7}","\\d{5,9}",,,"311234567"],[,,"(?:39|50|6[36-8]|73|9[1-9])\\d{7}","\\d{9}",,,"391234567"],[,,"800\\d{6}","\\d{9}",,,"800123456"],[,,"900\\d{6}","\\d{9}",,,"900123456"],[,,"NA","NA"],[,,"NA","NA"],[,,"89\\d{7}","\\d{9}",,,"891234567"],"UA",380,"00","0",,,"0",,"0~0",,[[,"([3-9]\\d)(\\d{3})(\\d{4})","$1 $2 $3",["[38]9|4(?:[45][0-5]|87)|5(?:0|6[37]|7[37])|6[36-8]|73|9[1-9]","[38]9|4(?:[45][0-5]|87)|5(?:0|6(?:3[14-7]|7)|7[37])|6[36-8]|73|9[1-9]"],
"0$1"],[,"([3-689]\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["3[1-8]2|4[13678]2|5(?:[12457]2|6[24])|6(?:[49]2|[12][29]|5[24])|8[0-8]|90","3(?:[1-46-8]2[013-9]|52)|4(?:[1378]2|62[013-9])|5(?:[12457]2|6[24])|6(?:[49]2|[12][29]|5[24])|8[0-8]|90"],"0$1"],[,"([3-6]\\d{3})(\\d{5})","$1 $2",["3(?:5[013-9]|[1-46-8])|4(?:[137][013-9]|6|[45][6-9]|8[4-6])|5(?:[1245][013-9]|6[0135-9]|3|7[4-6])|6(?:[49][013-9]|5[0135-9]|[12][13-8])","3(?:5[013-9]|[1-46-8](?:22|[013-9]))|4(?:[137][013-9]|6(?:[013-9]|22)|[45][6-9]|8[4-6])|5(?:[1245][013-9]|6(?:3[02389]|[015689])|3|7[4-6])|6(?:[49][013-9]|5[0135-9]|[12][13-8])"],
"0$1"]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],UG:[,[,,"\\d{9}","\\d{5,9}"],[,,"20(?:[0147]\\d{2}|2(?:40|[5-9]\\d)|3[23]\\d|5[0-4]\\d|6[03]\\d|8[0-2]\\d)\\d{4}|[34]\\d{8}","\\d{5,9}",,,"312345678"],[,,"2030\\d{5}|7(?:0[0-7]|[15789]\\d|2[03]|30|[46][0-4])\\d{6}","\\d{9}",,,"712345678"],[,,"800[123]\\d{5}","\\d{9}",,,"800123456"],[,,"90[123]\\d{6}","\\d{9}",,,"901123456"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],"UG",256,"00[057]","0",,,"0",,,,[[,"(\\d{3})(\\d{6})","$1 $2",["[7-9]|20(?:[013-8]|2[5-9])|4(?:6[45]|[7-9])"],
"0$1"],[,"(\\d{2})(\\d{7})","$1 $2",["3|4(?:[1-5]|6[0-36-9])"],"0$1"],[,"(2024)(\\d{5})","$1 $2",["2024"],"0$1"]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],US:[,[,,"[2-9]\\d{9}","\\d{7}(?:\\d{3})?"],[,,"(?:2(?:0[1-35-9]|1[02-9]|2[04589]|3[149]|4[08]|5[1-46]|6[0279]|7[026]|8[13])|3(?:0[1-57-9]|1[02-9]|2[0135]|3[014679]|4[67]|5[12]|6[014]|8[56])|4(?:0[124-9]|1[02-579]|2[3-5]|3[0245]|4[0235]|58|69|7[0589]|8[04])|5(?:0[1-57-9]|1[0235-8]|20|3[0149]|4[01]|5[19]|6[1-37]|7[013-5]|8[056])|6(?:0[1-35-9]|1[024-9]|2[03689]|3[016]|4[16]|5[017]|6[0-279]|78|8[12])|7(?:0[1-46-8]|1[02-9]|2[0457]|3[1247]|4[07]|5[47]|6[02359]|7[02-59]|8[156])|8(?:0[1-68]|1[02-8]|28|3[0-25]|4[3578]|5[046-9]|6[02-5]|7[028])|9(?:0[1346-9]|1[02-9]|2[0589]|3[01678]|4[0179]|5[12469]|7[0-3589]|8[0459]))[2-9]\\d{6}",
"\\d{7}(?:\\d{3})?",,,"2015555555"],[,,"(?:2(?:0[1-35-9]|1[02-9]|2[04589]|3[149]|4[08]|5[1-46]|6[0279]|7[026]|8[13])|3(?:0[1-57-9]|1[02-9]|2[0135]|3[014679]|4[67]|5[12]|6[014]|8[56])|4(?:0[124-9]|1[02-579]|2[3-5]|3[0245]|4[0235]|58|69|7[0589]|8[04])|5(?:0[1-57-9]|1[0235-8]|20|3[0149]|4[01]|5[19]|6[1-37]|7[013-5]|8[056])|6(?:0[1-35-9]|1[024-9]|2[03689]|3[016]|4[16]|5[017]|6[0-279]|78|8[12])|7(?:0[1-46-8]|1[02-9]|2[0457]|3[1247]|4[07]|5[47]|6[02359]|7[02-59]|8[156])|8(?:0[1-68]|1[02-8]|28|3[0-25]|4[3578]|5[046-9]|6[02-5]|7[028])|9(?:0[1346-9]|1[02-9]|2[0589]|3[01678]|4[0179]|5[12469]|7[0-3589]|8[0459]))[2-9]\\d{6}",
"\\d{7}(?:\\d{3})?",,,"2015555555"],[,,"8(?:00|44|55|66|77|88)[2-9]\\d{6}","\\d{10}",,,"8002345678"],[,,"900[2-9]\\d{6}","\\d{10}",,,"9002345678"],[,,"NA","NA"],[,,"5(?:00|33|44|66|77)[2-9]\\d{6}","\\d{10}",,,"5002345678"],[,,"NA","NA"],"US",1,"011","1",,,"1",,,1,[[,"(\\d{3})(\\d{4})","$1-$2",,,,1],[,"(\\d{3})(\\d{3})(\\d{4})","($1) $2-$3",,,,1]],[[,"(\\d{3})(\\d{3})(\\d{4})","$1-$2-$3"]],[,,"NA","NA"],1,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],UY:[,[,,"[2489]\\d{6,7}","\\d{7,8}"],[,,"2\\d{7}|4[2-7]\\d{6}",
"\\d{7,8}",,,"21231234"],[,,"9[1-9]\\d{6}","\\d{8}",,,"94231234"],[,,"80[05]\\d{4}","\\d{7}",,,"8001234"],[,,"90[0-8]\\d{4}","\\d{7}",,,"9001234"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],"UY",598,"0(?:1[3-9]\\d|0)","0"," int. ",,"0",,"00",,[[,"(\\d{4})(\\d{4})","$1 $2",["[24]"]],[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["9[1-9]"],"0$1"],[,"(\\d{3})(\\d{4})","$1 $2",["[89]0"],"0$1"]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],UZ:[,[,,"[679]\\d{8}","\\d{7,9}"],[,,"(?:6(?:1(?:22|3[124]|4[1-4]|5[123578]|64)|2(?:22|3[0-57-9]|41)|5(?:22|3[3-7]|5[024-8])|6\\d{2}|7(?:[23]\\d|7[69])|9(?:22|4[1-8]|6[135]))|7(?:0(?:5[4-9]|6[0146]|7[12456]|9[135-8])|1[12]\\d|2(?:22|3[1345789]|4[123579]|5[14])|3(?:2\\d|3[1578]|4[1-35-7]|5[1-57]|61)|4(?:2\\d|3[1-579]|7[1-79])|5(?:22|5[1-9]|6[1457])|6(?:22|3[12457]|4[13-8])|9(?:22|5[1-9])))\\d{5}",
"\\d{7,9}",,,"662345678"],[,,"6(?:1(?:2(?:98|2[01])|35[0-4]|50\\d|61[23]|7(?:[01][017]|4\\d|55|9[5-9]))|2(?:11\\d|2(?:[12]1|9[01379])|5(?:[126]\\d|3[0-4])|7\\d{2})|5(?:19[01]|2(?:27|9[26])|30\\d|59\\d|7\\d{2})|6(?:2(?:1[5-9]|2[0367]|38|41|52|60)|3[79]\\d|4(?:56|83)|7(?:[07]\\d|1[017]|3[07]|4[047]|5[057]|67|8[0178]|9[79])|9[0-3]\\d)|7(?:2(?:24|3[237]|4[5-9]|7[15-8])|5(?:7[12]|8[0589])|7(?:0\\d|[39][07])|9(?:0\\d|7[079]))|9(?:2(?:1[1267]|5\\d|3[01]|7[0-4])|5[67]\\d|6(?:2[0-26]|8\\d)|7\\d{2}))\\d{4}|7(?:0\\d{3}|1(?:13[01]|6(?:0[47]|1[67]|66)|71[3-69]|98\\d)|2(?:2(?:2[79]|95)|3(?:2[5-9]|6[0-6])|57\\d|7(?:0\\d|1[17]|2[27]|3[37]|44|5[057]|66|88))|3(?:2(?:1[0-6]|21|3[469]|7[159])|33\\d|5(?:0[0-4]|5[579]|9\\d)|7(?:[0-3579]\\d|4[0467]|6[67]|8[078])|9[4-6]\\d)|4(?:2(?:29|5[0257]|6[0-7]|7[1-57])|5(?:1[0-4]|8\\d|9[5-9])|7(?:0\\d|1[024589]|2[0127]|3[0137]|[46][07]|5[01]|7[5-9]|9[079])|9(?:7[015-9]|[89]\\d))|5(?:112|2(?:0\\d|2[29]|[49]4)|3[1568]\\d|52[6-9]|7(?:0[01578]|1[017]|[23]7|4[047]|[5-7]\\d|8[78]|9[079]))|6(?:2(?:2[1245]|4[2-4])|39\\d|41[179]|5(?:[349]\\d|5[0-2])|7(?:0[017]|[13]\\d|22|44|55|67|88))|9(?:22[128]|3(?:2[0-4]|7\\d)|57[05629]|7(?:2[05-9]|3[37]|4\\d|60|7[2579]|87|9[07])))\\d{4}|9[0-57-9]\\d{7}",
"\\d{7,9}",,,"912345678"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],"UZ",998,"810","8",,,"8",,"8~10",,[[,"([679]\\d)(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",,"8 $1"]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],VA:[,[,,"(?:0(?:878\\d{5}|6698\\d{5})|[1589]\\d{5,10}|3(?:[12457-9]\\d{8}|[36]\\d{7,9}))","\\d{6,11}"],[,,"06698\\d{5}","\\d{10}",,,"0669812345"],[,,"3(?:[12457-9]\\d{8}|6\\d{7,8}|3\\d{7,9})","\\d{9,11}",,,"3123456789"],[,,"80(?:0\\d{6}|3\\d{3})",
"\\d{6,9}",,,"800123456"],[,,"0878\\d{5}|1(?:44|6[346])\\d{6}|89(?:2\\d{3}|4(?:[0-4]\\d{2}|[5-9]\\d{4})|5(?:[0-4]\\d{2}|[5-9]\\d{6})|9\\d{6})","\\d{6,10}",,,"899123456"],[,,"84(?:[08]\\d{6}|[17]\\d{3})","\\d{6,9}",,,"848123456"],[,,"1(?:78\\d|99)\\d{6}","\\d{9,10}",,,"1781234567"],[,,"55\\d{8}","\\d{10}",,,"5512345678"],"VA",39,"00",,,,,,,,,,[,,"NA","NA"],,,[,,"848\\d{6}","\\d{9}",,,"848123456"],[,,"NA","NA"],1,,[,,"NA","NA"]],VC:[,[,,"[5789]\\d{9}","\\d{7}(?:\\d{3})?"],[,,"784(?:266|3(?:6[6-9]|7\\d|8[0-24-6])|4(?:38|5[0-36-8]|8[0-8])|5(?:55|7[0-2]|93)|638|784)\\d{4}",
"\\d{7}(?:\\d{3})?",,,"7842661234"],[,,"784(?:4(?:3[0-4]|5[45]|89|9[0-58])|5(?:2[6-9]|3[0-4]))\\d{4}","\\d{10}",,,"7844301234"],[,,"8(?:00|44|55|66|77|88)[2-9]\\d{6}","\\d{10}",,,"8002345678"],[,,"900[2-9]\\d{6}","\\d{10}",,,"9002345678"],[,,"NA","NA"],[,,"5(?:00|33|44|66|77)[2-9]\\d{6}","\\d{10}",,,"5002345678"],[,,"NA","NA"],"VC",1,"011","1",,,"1",,,,,,[,,"NA","NA"],,"784",[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],VE:[,[,,"[24589]\\d{9}","\\d{7,10}"],[,,"(?:2(?:12|3[457-9]|[58][1-9]|[467]\\d|9[1-6])|50[01])\\d{7}",
"\\d{7,10}",,,"2121234567"],[,,"4(?:1[24-8]|2[46])\\d{7}","\\d{10}",,,"4121234567"],[,,"800\\d{7}","\\d{10}",,,"8001234567"],[,,"900\\d{7}","\\d{10}",,,"9001234567"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],"VE",58,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{7})","$1-$2",,"0$1","$CC $1"]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],VG:[,[,,"[2589]\\d{9}","\\d{7}(?:\\d{3})?"],[,,"284(?:(?:229|4(?:22|9[45])|774|8(?:52|6[459]))\\d{4}|496[0-5]\\d{3})","\\d{7}(?:\\d{3})?",,,"2842291234"],[,,
"284(?:(?:3(?:0[0-3]|4[0-367]|94)|4(?:4[0-6]|68|99)|54[0-57])\\d{4}|496[6-9]\\d{3})","\\d{10}",,,"2843001234"],[,,"8(?:00|44|55|66|77|88)[2-9]\\d{6}","\\d{10}",,,"8002345678"],[,,"900[2-9]\\d{6}","\\d{10}",,,"9002345678"],[,,"NA","NA"],[,,"5(?:00|33|44|66|77)[2-9]\\d{6}","\\d{10}",,,"5002345678"],[,,"NA","NA"],"VG",1,"011","1",,,"1",,,,,,[,,"NA","NA"],,"284",[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],VI:[,[,,"[3589]\\d{9}","\\d{7}(?:\\d{3})?"],[,,"340(?:2(?:01|2[0678]|44|77)|3(?:32|44)|4(?:22|7[34])|5(?:1[34]|55)|6(?:26|4[23]|77|9[023])|7(?:1[2-589]|27|7\\d)|884|998)\\d{4}",
"\\d{7}(?:\\d{3})?",,,"3406421234"],[,,"340(?:2(?:01|2[0678]|44|77)|3(?:32|44)|4(?:22|7[34])|5(?:1[34]|55)|6(?:26|4[23]|77|9[023])|7(?:1[2-589]|27|7\\d)|884|998)\\d{4}","\\d{7}(?:\\d{3})?",,,"3406421234"],[,,"8(?:00|44|55|66|77|88)[2-9]\\d{6}","\\d{10}",,,"8002345678"],[,,"900[2-9]\\d{6}","\\d{10}",,,"9002345678"],[,,"NA","NA"],[,,"5(?:00|33|44|66|77)[2-9]\\d{6}","\\d{10}",,,"5002345678"],[,,"NA","NA"],"VI",1,"011","1",,,"1",,,1,,,[,,"NA","NA"],,"340",[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],
VN:[,[,,"[17]\\d{6,9}|[2-69]\\d{7,9}|8\\d{6,8}","\\d{7,10}"],[,,"(?:2(?:[025-79]|1[0189]|[348][01])|3(?:[0136-9]|[25][01])|4\\d|5(?:[01][01]|[2-9])|6(?:[0-46-8]|5[01])|7(?:[02-79]|[18][01])|8[1-9])\\d{7}","\\d{9,10}",,,"2101234567"],[,,"(?:9\\d|1(?:2\\d|6[2-9]|8[68]|99))\\d{7}","\\d{9,10}",,,"912345678"],[,,"1800\\d{4,6}","\\d{8,10}",,,"1800123456"],[,,"1900\\d{4,6}","\\d{8,10}",,,"1900123456"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],"VN",84,"00","0",,,"0",,,,[[,"([17]99)(\\d{4})","$1 $2",["[17]99"],
"0$1",,1],[,"([48])(\\d{4})(\\d{4})","$1 $2 $3",["[48]"],"0$1",,1],[,"([235-7]\\d)(\\d{4})(\\d{3})","$1 $2 $3",["2[025-79]|3[0136-9]|5[2-9]|6[0-46-8]|7[02-79]"],"0$1",,1],[,"(80)(\\d{5})","$1 $2",["80"],"0$1",,1],[,"(69\\d)(\\d{4,5})","$1 $2",["69"],"0$1",,1],[,"([235-7]\\d{2})(\\d{4})(\\d{3})","$1 $2 $3",["2[1348]|3[25]|5[01]|65|7[18]"],"0$1",,1],[,"(9\\d)(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["9"],"0$1",,1],[,"(1[2689]\\d)(\\d{3})(\\d{4})","$1 $2 $3",["1(?:[26]|8[68]|99)"],"0$1",,1],[,"(1[89]00)(\\d{4,6})",
"$1 $2",["1[89]0"],"$1",,1]],,[,,"NA","NA"],,,[,,"[17]99\\d{4}|69\\d{5,6}","\\d{7,8}",,,"1992000"],[,,"[17]99\\d{4}|69\\d{5,6}|80\\d{5}","\\d{7,8}",,,"1992000"],,,[,,"NA","NA"]],VU:[,[,,"[2-57-9]\\d{4,6}","\\d{5,7}"],[,,"(?:2[02-9]\\d|3(?:[5-7]\\d|8[0-8])|48[4-9]|88\\d)\\d{2}","\\d{5}",,,"22123"],[,,"(?:5(?:7[2-5]|[0-689]\\d)|7[013-7]\\d)\\d{4}","\\d{7}",,,"5912345"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],"VU",678,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2",["[579]"]]],
,[,,"NA","NA"],,,[,,"NA","NA"],[,,"3[03]\\d{3}|900\\d{4}","\\d{5,7}",,,"30123"],,,[,,"NA","NA"]],WF:[,[,,"[4-8]\\d{5}","\\d{6}"],[,,"(?:50|68|72)\\d{4}","\\d{6}",,,"501234"],[,,"(?:50|68|72|8[23])\\d{4}","\\d{6}",,,"501234"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],"WF",681,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3"]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"[48]0\\d{4}","\\d{6}",,,"401234"]],WS:[,[,,"[2-8]\\d{4,6}","\\d{5,7}"],[,,"(?:[2-5]\\d|6[1-9]|84\\d{2})\\d{3}",
"\\d{5,7}",,,"22123"],[,,"(?:60|7[25-7]\\d)\\d{4}","\\d{6,7}",,,"601234"],[,,"800\\d{3}","\\d{6}",,,"800123"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],"WS",685,"0",,,,,,,,[[,"(8\\d{2})(\\d{3,4})","$1 $2",["8"]],[,"(7\\d)(\\d{5})","$1 $2",["7"]],[,"(\\d{5})","$1",["[2-6]"]]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],YE:[,[,,"[1-7]\\d{6,8}","\\d{6,9}"],[,,"(?:1(?:7\\d|[2-68])|2[2-68]|3[2358]|4[2-58]|5[2-6]|6[3-58]|7[24-68])\\d{5}","\\d{6,8}",,,"1234567"],[,,"7[0137]\\d{7}",
"\\d{9}",,,"712345678"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],"YE",967,"00","0",,,"0",,,,[[,"([1-7])(\\d{3})(\\d{3,4})","$1 $2 $3",["[1-6]|7[24-68]"],"0$1"],[,"(7\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["7[0137]"],"0$1"]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],YT:[,[,,"[268]\\d{8}","\\d{9}"],[,,"269(?:6[0-4]|50)\\d{4}","\\d{9}",,,"269601234"],[,,"639\\d{6}","\\d{9}",,,"639123456"],[,,"80\\d{7}","\\d{9}",,,"801234567"],[,,"NA","NA"],[,,"NA","NA"],
[,,"NA","NA"],[,,"NA","NA"],"YT",262,"00","0",,,"0",,,,,,[,,"NA","NA"],,"269|63",[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],ZA:[,[,,"[1-79]\\d{8}|8(?:[067]\\d{7}|[1-4]\\d{3,7})","\\d{5,9}"],[,,"(?:1[0-8]|2[0-378]|3[1-69]|4\\d|5[1346-8])\\d{7}","\\d{9}",,,"101234567"],[,,"(?:6[0-5]|7[0-46-9])\\d{7}|8[1-4]\\d{3,7}","\\d{5,9}",,,"711234567"],[,,"80\\d{7}","\\d{9}",,,"801234567"],[,,"86[2-9]\\d{6}|90\\d{7}","\\d{9}",,,"862345678"],[,,"860\\d{6}","\\d{9}",,,"860123456"],[,,"NA","NA"],[,,"87\\d{7}","\\d{9}",
,,"871234567"],"ZA",27,"00","0",,,"0",,,,[[,"(860)(\\d{3})(\\d{3})","$1 $2 $3",["860"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[1-79]|8(?:[0-47]|6[1-9])"],"0$1"],[,"(\\d{2})(\\d{3,4})","$1 $2",["8[1-4]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{2,3})","$1 $2 $3",["8[1-4]"],"0$1"]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"861\\d{6}","\\d{9}",,,"861123456"],,,[,,"NA","NA"]],ZM:[,[,,"[289]\\d{8}","\\d{9}"],[,,"21[1-8]\\d{6}","\\d{9}",,,"211234567"],[,,"9(?:5[05]|6\\d|7[1-9])\\d{6}","\\d{9}",,,"955123456"],
[,,"800\\d{6}","\\d{9}",,,"800123456"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],"ZM",260,"00","0",,,"0",,,,[[,"([29]\\d)(\\d{7})","$1 $2",["[29]"],"0$1"],[,"(800)(\\d{3})(\\d{3})","$1 $2 $3",["8"],"0$1"]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],ZW:[,[,,"2(?:[012457-9]\\d{3,8}|6(?:[14]\\d{7}|\\d{4}))|[13-79]\\d{4,9}|8[06]\\d{8}","\\d{3,10}"],[,,"(?:2(?:0(?:4\\d|5\\d{2})|2[278]\\d|48\\d|7(?:[1-7]\\d|[089]\\d{2})|8(?:[2-57-9]|[146]\\d{2})|98)|3(?:08|17|3[78]|7(?:[19]|[56]\\d)|8[37]|98)|5[15][78]|6(?:28\\d{2}|[36]7|75\\d|[69]8|8(?:7\\d|8)))\\d{3}|(?:2(?:1[39]|2[0157]|6[14]|7[35]|84)|329)\\d{7}|(?:1(?:3\\d{2}|9\\d|[4-8])|2(?:0\\d{2}|[569]\\d)|3(?:[26]|[013459]\\d)|5(?:0|5\\d{2}|[689]\\d)|6(?:[39]|[01246]\\d|[78]\\d{2}))\\d{3}|(?:29\\d|39|54)\\d{6}|(?:(?:25|54)83|2582\\d)\\d{3}|(?:4\\d{6,7}|9[2-9]\\d{4,5})",
"\\d{3,10}",,,"1312345"],[,,"7[1378]\\d{7}","\\d{9}",,,"711234567"],[,,"800\\d{7}","\\d{10}",,,"8001234567"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"86(?:1[12]|30|44|55|77|8[367]|99)\\d{6}","\\d{10}",,,"8686123456"],"ZW",263,"00","0",,,"0",,,,[[,"([49])(\\d{3})(\\d{2,4})","$1 $2 $3",["4|9[2-9]"],"0$1"],[,"(7\\d)(\\d{3})(\\d{3,4})","$1 $2 $3",["7"],"0$1"],[,"(86\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["86[24]"],"0$1"],[,"([2356]\\d{2})(\\d{3,5})","$1 $2",["2(?:0[45]|2[278]|[49]8|[78])|3(?:08|17|3[78]|7[1569]|8[37]|98)|5[15][78]|6(?:[29]8|[38]7|6[78]|75|[89]8)"],
"0$1"],[,"(\\d{3})(\\d{3})(\\d{3,4})","$1 $2 $3",["2(?:1[39]|2[0157]|6[14]|7[35]|84)|329"],"0$1"],[,"([1-356]\\d)(\\d{3,5})","$1 $2",["1[3-9]|2[0569]|3[0-69]|5[05689]|6[0-46-9]"],"0$1"],[,"([235]\\d)(\\d{3})(\\d{3,4})","$1 $2 $3",["[23]9|54"],"0$1"],[,"([25]\\d{3})(\\d{3,5})","$1 $2",["(?:25|54)8","258[23]|5483"],"0$1"],[,"(8\\d{3})(\\d{6})","$1 $2",["86"],"0$1"],[,"(80\\d)(\\d{3})(\\d{4})","$1 $2 $3",["80"],"0$1"]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],800:[,[,,"\\d{8}","\\d{8}",
,,"12345678"],[,,"NA","NA",,,"12345678"],[,,"NA","NA",,,"12345678"],[,,"\\d{8}","\\d{8}",,,"12345678"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],"001",800,,,,,,,,1,[[,"(\\d{4})(\\d{4})","$1 $2"]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],1,,[,,"NA","NA"]],808:[,[,,"\\d{8}","\\d{8}",,,"12345678"],[,,"NA","NA",,,"12345678"],[,,"NA","NA",,,"12345678"],[,,"NA","NA"],[,,"NA","NA"],[,,"\\d{8}","\\d{8}",,,"12345678"],[,,"NA","NA"],[,,"NA","NA"],"001",808,,,,,,,,1,[[,"(\\d{4})(\\d{4})","$1 $2"]],
,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],1,,[,,"NA","NA"]],870:[,[,,"[35-7]\\d{8}","\\d{9}",,,"301234567"],[,,"NA","NA",,,"301234567"],[,,"(?:[356]\\d|7[6-8])\\d{7}","\\d{9}",,,"301234567"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],"001",870,,,,,,,,,[[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3"]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],878:[,[,,"1\\d{11}","\\d{12}",,,"101234567890"],[,,"NA","NA",,,"101234567890"],[,,"NA","NA",,,"101234567890"],[,,"NA",
"NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"10\\d{10}","\\d{12}",,,"101234567890"],"001",878,,,,,,,,1,[[,"(\\d{2})(\\d{5})(\\d{5})","$1 $2 $3"]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],881:[,[,,"[67]\\d{8}","\\d{9}",,,"612345678"],[,,"NA","NA",,,"612345678"],[,,"[67]\\d{8}","\\d{9}",,,"612345678"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],"001",881,,,,,,,,,[[,"(\\d)(\\d{3})(\\d{5})","$1 $2 $3",["[67]"]]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA",
"NA"],,,[,,"NA","NA"]],882:[,[,,"[13]\\d{6,11}","\\d{7,12}",,,"3451234567"],[,,"NA","NA",,,"3451234567"],[,,"3(?:2\\d{3}|37\\d{2}|4(?:2|7\\d{3}))\\d{4}","\\d{7,10}",,,"3451234567"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"1(?:3(?:0[0347]|[13][0139]|2[035]|4[013568]|6[0459]|7[06]|8[15678]|9[0689])\\d{4}|6\\d{5,10})|345\\d{7}","\\d{7,12}",,,"3451234567"],"001",882,,,,,,,,,[[,"(\\d{2})(\\d{4})(\\d{3})","$1 $2 $3",["3[23]"]],[,"(\\d{2})(\\d{5})","$1 $2",["16|342"]],[,"(\\d{2})(\\d{4})(\\d{4})",
"$1 $2 $3",["34[57]"]],[,"(\\d{3})(\\d{4})(\\d{4})","$1 $2 $3",["348"]],[,"(\\d{2})(\\d{2})(\\d{4})","$1 $2 $3",["1"]],[,"(\\d{2})(\\d{3,4})(\\d{4})","$1 $2 $3",["16"]],[,"(\\d{2})(\\d{4,5})(\\d{5})","$1 $2 $3",["16"]]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"348[57]\\d{7}","\\d{11}",,,"3451234567"]],883:[,[,,"51\\d{7}(?:\\d{3})?","\\d{9}(?:\\d{3})?",,,"510012345"],[,,"NA","NA",,,"510012345"],[,,"NA","NA",,,"510012345"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"51(?:00\\d{5}(?:\\d{3})?|[13]0\\d{8})",
"\\d{9}(?:\\d{3})?",,,"510012345"],"001",883,,,,,,,,1,[[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["510"]],[,"(\\d{3})(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3 $4",["510"]],[,"(\\d{4})(\\d{4})(\\d{4})","$1 $2 $3",["51[13]"]]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],,,[,,"NA","NA"]],888:[,[,,"\\d{11}","\\d{11}",,,"12345678901"],[,,"NA","NA",,,"12345678901"],[,,"NA","NA",,,"12345678901"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],"001",888,,,,,,,,1,[[,"(\\d{3})(\\d{3})(\\d{5})",
"$1 $2 $3"]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"\\d{11}","\\d{11}",,,"12345678901"],1,,[,,"NA","NA"]],979:[,[,,"\\d{9}","\\d{9}",,,"123456789"],[,,"NA","NA",,,"123456789"],[,,"NA","NA",,,"123456789"],[,,"NA","NA"],[,,"\\d{9}","\\d{9}",,,"123456789"],[,,"NA","NA"],[,,"NA","NA"],[,,"NA","NA"],"001",979,,,,,,,,1,[[,"(\\d)(\\d{4})(\\d{4})","$1 $2 $3"]],,[,,"NA","NA"],,,[,,"NA","NA"],[,,"NA","NA"],1,,[,,"NA","NA"]]};/*

 Copyright (C) 2010 The Libphonenumber Authors.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
function M(){this.ua={}}M.r=function(){return M.sa?M.sa:M.sa=new M};
var N={0:"0",1:"1",2:"2",3:"3",4:"4",5:"5",6:"6",7:"7",8:"8",9:"9","\uff10":"0","\uff11":"1","\uff12":"2","\uff13":"3","\uff14":"4","\uff15":"5","\uff16":"6","\uff17":"7","\uff18":"8","\uff19":"9","\u0660":"0","\u0661":"1","\u0662":"2","\u0663":"3","\u0664":"4","\u0665":"5","\u0666":"6","\u0667":"7","\u0668":"8","\u0669":"9","\u06f0":"0","\u06f1":"1","\u06f2":"2","\u06f3":"3","\u06f4":"4","\u06f5":"5","\u06f6":"6","\u06f7":"7","\u06f8":"8","\u06f9":"9"},ta={0:"0",1:"1",2:"2",3:"3",4:"4",5:"5",6:"6",
7:"7",8:"8",9:"9","\uff10":"0","\uff11":"1","\uff12":"2","\uff13":"3","\uff14":"4","\uff15":"5","\uff16":"6","\uff17":"7","\uff18":"8","\uff19":"9","\u0660":"0","\u0661":"1","\u0662":"2","\u0663":"3","\u0664":"4","\u0665":"5","\u0666":"6","\u0667":"7","\u0668":"8","\u0669":"9","\u06f0":"0","\u06f1":"1","\u06f2":"2","\u06f3":"3","\u06f4":"4","\u06f5":"5","\u06f6":"6","\u06f7":"7","\u06f8":"8","\u06f9":"9",A:"2",B:"2",C:"2",D:"3",E:"3",F:"3",G:"4",H:"4",I:"4",J:"5",K:"5",L:"5",M:"6",N:"6",O:"6",P:"7",
Q:"7",R:"7",S:"7",T:"8",U:"8",V:"8",W:"9",X:"9",Y:"9",Z:"9"},ua=RegExp("[+\uff0b]+"),O=RegExp("^[+\uff0b]+"),va=RegExp("([0-9\uff10-\uff19\u0660-\u0669\u06f0-\u06f9])"),wa=RegExp("[+\uff0b0-9\uff10-\uff19\u0660-\u0669\u06f0-\u06f9]"),xa=/[\\\/] *x/,ya=RegExp("[^0-9\uff10-\uff19\u0660-\u0669\u06f0-\u06f9A-Za-z#]+$"),za=/(?:.*?[A-Za-z]){3}.*/,Aa=RegExp("(?:;ext=([0-9\uff10-\uff19\u0660-\u0669\u06f0-\u06f9]{1,7})|[ \u00a0\\t,]*(?:e?xt(?:ensi(?:o\u0301?|\u00f3))?n?|\uff45?\uff58\uff54\uff4e?|[,x\uff58#\uff03~\uff5e]|int|anexo|\uff49\uff4e\uff54)[:\\.\uff0e]?[ \u00a0\\t,-]*([0-9\uff10-\uff19\u0660-\u0669\u06f0-\u06f9]{1,7})#?|[- ]+([0-9\uff10-\uff19\u0660-\u0669\u06f0-\u06f9]{1,5})#)$",
"i"),Ba=RegExp("^[0-9\uff10-\uff19\u0660-\u0669\u06f0-\u06f9]{2}$|^[+\uff0b]*(?:[-x\u2010-\u2015\u2212\u30fc\uff0d-\uff0f \u00a0\u00ad\u200b\u2060\u3000()\uff08\uff09\uff3b\uff3d.\\[\\]/~\u2053\u223c\uff5e*]*[0-9\uff10-\uff19\u0660-\u0669\u06f0-\u06f9]){3,}[-x\u2010-\u2015\u2212\u30fc\uff0d-\uff0f \u00a0\u00ad\u200b\u2060\u3000()\uff08\uff09\uff3b\uff3d.\\[\\]/~\u2053\u223c\uff5e*A-Za-z0-9\uff10-\uff19\u0660-\u0669\u06f0-\u06f9]*(?:;ext=([0-9\uff10-\uff19\u0660-\u0669\u06f0-\u06f9]{1,7})|[ \u00a0\\t,]*(?:e?xt(?:ensi(?:o\u0301?|\u00f3))?n?|\uff45?\uff58\uff54\uff4e?|[,x\uff58#\uff03~\uff5e]|int|anexo|\uff49\uff4e\uff54)[:\\.\uff0e]?[ \u00a0\\t,-]*([0-9\uff10-\uff19\u0660-\u0669\u06f0-\u06f9]{1,7})#?|[- ]+([0-9\uff10-\uff19\u0660-\u0669\u06f0-\u06f9]{1,5})#)?$",
"i"),Ca=/(\$\d)/,Da=/^\(?\$1\)?$/;function Ea(a){var b=a.search(wa);0<=b?(a=a.substring(b),a=a.replace(ya,""),b=a.search(xa),0<=b&&(a=a.substring(0,b))):a="";return a}function Fa(a){return 2>a.length?!1:P(Ba,a)}function Ga(a){return P(za,a)?Q(a,ta):Q(a,N)}function Ha(a){var b=Ga(a.toString());a.clear();a.append(b)}function Q(a,b){for(var c=new r,d,e=a.length,f=0;f<e;++f)d=a.charAt(f),d=b[d.toUpperCase()],null!=d&&c.append(d);return c.toString()}
function R(a){return null!=a&&isNaN(a)&&a.toUpperCase()in sa}
M.prototype.format=function(a,b){if(0==v(a,2)&&null!=a.c[5]){var c=y(a,5);if(0<c.length)return c}var c=a.l(),d=S(a);if(0==b)return Ia(c,0,d,"");if(!(c in L))return d;var e=T(this,c,U(c)),f;f=null!=a.c[3]&&0!=a.getExtension().length?3==b?";ext="+a.getExtension():null!=e.c[13]?v(e,13)+y(a,3):" ext. "+y(a,3):"";a:{for(var e=0==(x(e,20)||[]).length||2==b?x(e,19)||[]:x(e,20)||[],g,h=e.length,l=0;l<h;++l){g=e[l];var n=z(g,3);if(0==n||0==d.search(v(g,3,n-1)))if(n=new RegExp(v(g,1)),P(n,d)){e=g;break a}}e=
null}null!=e&&(h=e,e=y(h,2),g=new RegExp(v(h,1)),y(h,5),l="",h=y(h,4),l=2==b&&null!=h&&0<h.length?d.replace(g,e.replace(Ca,h)):d.replace(g,e),3==b&&(l=l.replace(RegExp("^[-x\u2010-\u2015\u2212\u30fc\uff0d-\uff0f \u00a0\u00ad\u200b\u2060\u3000()\uff08\uff09\uff3b\uff3d.\\[\\]/~\u2053\u223c\uff5e]+"),""),l=l.replace(RegExp("[-x\u2010-\u2015\u2212\u30fc\uff0d-\uff0f \u00a0\u00ad\u200b\u2060\u3000()\uff08\uff09\uff3b\uff3d.\\[\\]/~\u2053\u223c\uff5e]+","g"),"-")),d=l);return Ia(c,b,d,f)};
function T(a,b,c){return"001"==c?V(a,""+b):V(a,c)}function S(a){var b=""+v(a,2);return null!=a.c[4]&&v(a,4)?Array(y(a,8)+1).join("0")+b:b}function Ia(a,b,c,d){switch(b){case 0:return"+"+a+c+d;case 1:return"+"+a+" "+c+d;case 3:return"tel:+"+a+"-"+c+d;default:return c+d}}
function Ja(a,b){switch(b){case 4:return v(a,5);case 3:return v(a,4);case 1:return v(a,3);case 0:case 2:return v(a,2);case 5:return v(a,6);case 6:return v(a,8);case 7:return v(a,7);case 8:return v(a,21);case 9:return v(a,25);case 10:return v(a,28);default:return v(a,1)}}function W(a,b){return X(a,v(b,1))?X(a,v(b,5))?4:X(a,v(b,4))?3:X(a,v(b,6))?5:X(a,v(b,8))?6:X(a,v(b,7))?7:X(a,v(b,21))?8:X(a,v(b,25))?9:X(a,v(b,28))?10:X(a,v(b,2))?v(b,18)||X(a,v(b,3))?2:0:!v(b,18)&&X(a,v(b,3))?1:-1:-1}
function V(a,b){if(null==b)return null;b=b.toUpperCase();var c=a.ua[b];if(null==c){c=sa[b];if(null==c)return null;c=(new K).$(E.e(),c);a.ua[b]=c}return c}function X(a,b){return P(y(b,3),a)&&P(y(b,2),a)}function Ka(a,b){if(null==b)return null;var c=b.l(),c=L[c];if(null==c)c=null;else if(1==c.length)c=c[0];else a:{for(var d=S(b),e,f=c.length,g=0;g<f;g++){e=c[g];var h=V(a,e);if(null!=h.c[23]){if(0==d.search(v(h,23))){c=e;break a}}else if(-1!=W(d,h)){c=e;break a}}c=null}return c}
function U(a){a=L[a];return null==a?"ZZ":a[0]}function La(a,b){var c=V(a,b);if(null==c)throw"Invalid region code: "+b;return c.l()}function Ma(a,b){return P(a,b)?0:0==b.search(a)?3:2}function Na(a,b){var c=a.toString();if(0==c.length||"0"==c.charAt(0))return 0;for(var d,e=c.length,f=1;3>=f&&f<=e;++f)if(d=parseInt(c.substring(0,f),10),d in L)return b.append(c.substring(f)),d;return 0}
function Oa(a,b,c,d,e){if(0==a.length)return 0;a=new r(a);var f;null!=b&&(f=v(b,11));null==f&&(f="NonMatch");var g=a.toString();if(0==g.length)f=20;else if(O.test(g))g=g.replace(O,""),a.clear(),a.append(Ga(g)),f=1;else{g=new RegExp(f);Ha(a);f=a.toString();if(0==f.search(g)){var g=f.match(g)[0].length,h=f.substring(g).match(va);h&&null!=h[1]&&0<h[1].length&&"0"==Q(h[1],N)?f=!1:(a.clear(),a.append(f.substring(g)),f=!0)}else f=!1;f=f?5:20}d&&w(e,6,f);if(20!=f){if(2>=a.f.length)throw"Phone number too short after IDD";
c=Na(a,c);if(0!=c)return e.ba(c),c;throw"Invalid country calling code";}if(null!=b&&(f=b.l(),g=""+f,h=a.toString(),0==h.lastIndexOf(g,0))){var l=new r(h.substring(g.length)),h=v(b,1),g=new RegExp(y(h,2));Pa(l,b,null);b=l.toString();h=y(h,3);if(!P(g,a.toString())&&P(g,b)||3==Ma(h,a.toString()))return c.append(b),d&&w(e,6,10),e.ba(f),f}e.ba(0);return 0}
function Pa(a,b,c){var d=a.toString(),e=d.length,f=v(b,15);if(0!=e&&null!=f&&0!=f.length&&(f=new RegExp("^(?:"+f+")"),e=f.exec(d))){var g=RegExp,h;h=v(b,1);h=y(h,2);g=new g(h);h=P(g,d);var l=e.length-1;b=v(b,16);if(null==b||0==b.length||null==e[l]||0==e[l].length){if(!h||P(g,d.substring(e[0].length)))null!=c&&0<l&&null!=e[l]&&c.append(e[1]),a.set(d.substring(e[0].length))}else if(d=d.replace(f,b),!h||P(g,d))null!=c&&0<l&&c.append(e[1]),a.set(d)}}
M.prototype.parse=function(a,b){return Qa(this,a,b,!1)};function Y(a,b,c){if(!R(c)&&0<b.length&&"+"!=b.charAt(0))throw"Invalid country calling code";return Qa(a,b,c,!0)}
function Qa(a,b,c,d){if(null==b)throw"The string supplied did not seem to be a phone number";if(250<b.length)throw"The string supplied is too long to be a phone number";var e=new r,f=b.indexOf(";phone-context=");if(0<f){var g=f+15;if("+"==b.charAt(g)){var h=b.indexOf(";",g);0<h?e.append(b.substring(g,h)):e.append(b.substring(g))}g=b.indexOf("tel:");e.append(b.substring(0<=g?g+4:0,f))}else e.append(Ea(b));f=e.toString();g=f.indexOf(";isub=");0<g&&(e.clear(),e.append(f.substring(0,g)));if(!Fa(e.toString()))throw"The string supplied did not seem to be a phone number";
f=e.toString();if(!(R(c)||null!=f&&0<f.length&&O.test(f)))throw"Invalid country calling code";f=new G;d&&w(f,5,b);a:{b=e.toString();g=b.search(Aa);if(0<=g&&Fa(b.substring(0,g)))for(var h=b.match(Aa),l=h.length,n=1;n<l;++n)if(null!=h[n]&&0<h[n].length){e.clear();e.append(b.substring(0,g));b=h[n];break a}b=""}0<b.length&&w(f,3,b);g=V(a,c);b=new r;h=0;l=e.toString();try{h=Oa(l,g,b,d,f)}catch(p){if("Invalid country calling code"==p&&O.test(l)){if(l=l.replace(O,""),h=Oa(l,g,b,d,f),0==h)throw p;}else throw p;
}0!=h?(e=U(h),e!=c&&(g=T(a,h,e))):(Ha(e),b.append(e.toString()),null!=c?(h=g.l(),f.ba(h)):d&&pa(f,6));if(2>b.f.length)throw"The string supplied is too short to be a phone number";null!=g&&(a=new r,c=new r(b.toString()),Pa(c,g,a),e=c.toString(),g=v(g,1),g=y(g,3),2!=Ma(g,e)&&(b=c,d&&w(f,7,a.toString())));d=b.toString();a=d.length;if(2>a)throw"The string supplied is too short to be a phone number";if(17<a)throw"The string supplied is too long to be a phone number";if(1<d.length&&"0"==d.charAt(0)){w(f,
4,!0);for(a=1;a<d.length-1&&"0"==d.charAt(a);)a++;1!=a&&w(f,8,a)}w(f,2,parseInt(d,10));return f}function P(a,b){var c="string"==typeof a?b.match("^(?:"+a+")$"):b.match(a);return c&&c[0].length==b.length?!0:!1};/*

 Copyright (C) 2010 The Libphonenumber Authors.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
function Ra(a){this.qa="\u2008";this.fa=new RegExp(this.qa);this.ga="";this.q=new r;this.v="";this.k=new r;this.u=new r;this.m=!0;this.aa=this.s=this.ka=!1;this.oa=M.r();this.t=0;this.d=new r;this.ea=!1;this.o="";this.b=new r;this.h=[];this.ha=a;this.va=this.i=Sa(this,this.ha)}var Ta=new E;w(Ta,11,"NA");
var Ua=/\[([^\[\]])*\]/g,Va=/\d(?=[^,}][^,}])/g,Wa=RegExp("^[-x\u2010-\u2015\u2212\u30fc\uff0d-\uff0f \u00a0\u00ad\u200b\u2060\u3000()\uff08\uff09\uff3b\uff3d.\\[\\]/~\u2053\u223c\uff5e]*(\\$\\d[-x\u2010-\u2015\u2212\u30fc\uff0d-\uff0f \u00a0\u00ad\u200b\u2060\u3000()\uff08\uff09\uff3b\uff3d.\\[\\]/~\u2053\u223c\uff5e]*)+$"),Xa=/[- ]/;function Sa(a,b){var c=R(b)?La(a.oa,b):0,c=V(a.oa,U(c));return null!=c?c:Ta}
function Ya(a){for(var b=a.h.length,c=0;c<b;++c){var d=a.h[c],e=y(d,1);if(a.v==e)return!1;var f;f=a;var g=d,h=y(g,1);if(-1!=h.indexOf("|"))f=!1;else{h=h.replace(Ua,"\\d");h=h.replace(Va,"\\d");f.q.clear();var l;l=f;var g=y(g,2),n="999999999999999".match(h)[0];n.length<l.b.f.length?l="":(h=n.replace(new RegExp(h,"g"),g),l=h=h.replace(RegExp("9","g"),l.qa));0<l.length?(f.q.append(l),f=!0):f=!1}if(f)return a.v=e,a.ea=Xa.test(v(d,4)),a.t=0,!0}return a.m=!1}
function Za(a,b){for(var c=[],d=b.length-3,e=a.h.length,f=0;f<e;++f){var g=a.h[f];if(0==z(g,3))c.push(a.h[f]);else{var h=Math.min(d,z(g,3)-1),g=v(g,3,h);0==b.search(g)&&c.push(a.h[f])}}a.h=c}Ra.prototype.clear=function(){this.ga="";this.k.clear();this.u.clear();this.q.clear();this.t=0;this.v="";this.d.clear();this.o="";this.b.clear();this.m=!0;this.aa=this.s=this.ka=!1;this.h=[];this.ea=!1;this.i!=this.va&&(this.i=Sa(this,this.ha))};function $a(a,b){a.ga=ab(a,b);return a.ga}
function ab(a,b){a.k.append(b);var c=b;if(va.test(c)||1==a.k.f.length&&ua.test(c)){var c=b,d;"+"==c?(d=c,a.u.append(c)):(d=N[c],a.u.append(d),a.b.append(d));b=d}else a.m=!1,a.ka=!0;if(!a.m){if(!a.ka)if(bb(a)){if(cb(a))return db(a)}else if(0<a.o.length&&(c=a.b.toString(),a.b.clear(),a.b.append(a.o),a.b.append(c),c=a.d.toString(),d=c.lastIndexOf(a.o),a.d.clear(),a.d.append(c.substring(0,d))),a.o!=eb(a))return a.d.append(" "),db(a);return a.k.toString()}switch(a.u.f.length){case 0:case 1:case 2:return a.k.toString();
case 3:if(bb(a))a.aa=!0;else return a.o=eb(a),fb(a);default:if(a.aa)return cb(a)&&(a.aa=!1),a.d.toString()+a.b.toString();if(0<a.h.length){c=gb(a,b);d=hb(a);if(0<d.length)return d;Za(a,a.b.toString());return Ya(a)?ib(a):a.m?Z(a,c):a.k.toString()}return fb(a)}}function db(a){a.m=!0;a.aa=!1;a.h=[];a.t=0;a.q.clear();a.v="";return fb(a)}
function hb(a){for(var b=a.b.toString(),c=a.h.length,d=0;d<c;++d){var e=a.h[d],f=y(e,1);if((new RegExp("^(?:"+f+")$")).test(b))return a.ea=Xa.test(v(e,4)),b=b.replace(new RegExp(f,"g"),v(e,2)),Z(a,b)}return""}function Z(a,b){var c=a.d.f.length;return a.ea&&0<c&&" "!=a.d.toString().charAt(c-1)?a.d+" "+b:a.d+b}
function fb(a){var b=a.b.toString();if(3<=b.length){for(var c=a.s&&0<z(a.i,20)?x(a.i,20)||[]:x(a.i,19)||[],d=c.length,e=0;e<d;++e){var f=c[e],g;(g=null==a.i.c[12]||a.s||v(f,6))||(g=y(f,4),g=0==g.length||Da.test(g));g&&(g=y(f,2),Wa.test(g)&&a.h.push(f))}Za(a,b);b=hb(a);return 0<b.length?b:Ya(a)?ib(a):a.k.toString()}return Z(a,b)}function ib(a){var b=a.b.toString(),c=b.length;if(0<c){for(var d="",e=0;e<c;e++)d=gb(a,b.charAt(e));return a.m?Z(a,d):a.k.toString()}return a.d.toString()}
function eb(a){var b=a.b.toString(),c=0,d;1!=a.i.ra()?d=!1:(d=a.b.toString(),d="1"==d.charAt(0)&&"0"!=d.charAt(1)&&"1"!=d.charAt(1));d?(c=1,a.d.append("1").append(" "),a.s=!0):null!=a.i.c[15]&&(d=new RegExp("^(?:"+v(a.i,15)+")"),d=b.match(d),null!=d&&null!=d[0]&&0<d[0].length&&(a.s=!0,c=d[0].length,a.d.append(b.substring(0,c))));a.b.clear();a.b.append(b.substring(c));return b.substring(0,c)}
function bb(a){var b=a.u.toString(),c=new RegExp("^(?:\\+|"+v(a.i,11)+")"),c=b.match(c);return null!=c&&null!=c[0]&&0<c[0].length?(a.s=!0,c=c[0].length,a.b.clear(),a.b.append(b.substring(c)),a.d.clear(),a.d.append(b.substring(0,c)),"+"!=b.charAt(0)&&a.d.append(" "),!0):!1}function cb(a){if(0==a.b.f.length)return!1;var b=new r,c=Na(a.b,b);if(0==c)return!1;a.b.clear();a.b.append(b.toString());b=U(c);"001"==b?a.i=V(a.oa,""+c):b!=a.ha&&(a.i=Sa(a,b));a.d.append(""+c).append(" ");a.o="";return!0}
function gb(a,b){var c=a.q.toString();if(0<=c.substring(a.t).search(a.fa)){var d=c.search(a.fa),c=c.replace(a.fa,b);a.q.clear();a.q.append(c);a.t=d;return c.substring(0,a.t+1)}1==a.h.length&&(a.m=!1);a.v="";return a.k.toString()};function jb(a,b){try{var c=M.r(),d;var e=Y(c,a,b),f=S(e),g=e.l();if(g in L){var h,l=T(c,g,U(g));h=v(l,1);var n=y(h,3);d=Ma(n,f)}else d=1;return d}catch(p){return"Invalid country calling code"==p?1:"The string supplied did not seem to be a phone number"==p?4:"Phone number too short after IDD"==p||"The string supplied is too short to be a phone number"==p?2:"The string supplied is too long to be a phone number"==p?3:-99}}m("intlTelInputUtils",{});
m("intlTelInputUtils.formatNumberAsYouType",function(a,b,c,d,e){try{var f=a.replace(/\D/g,""),g=new Ra(b),h="",l;"+"==a.substr(0,1)&&(f="+"+f);for(var n=0;n<f.length;n++){l=$a(g,f.charAt(n));if(d&&h&&l.length<=h.length&&-1==l.indexOf(" ")&&2!=jb(f.substring(0,n-1),b))return h+" ext. "+f.substring(n,f.length);h=l}" "==h.charAt(h.length-1)&&(h=h.substr(0,h.length-1));if(c&&!a.split(" ext. ")[1]){var p=$a(g,"5");" "==p.charAt(p.length-1)&&(p=p.substr(0,p.length-1));if(isNaN(parseFloat(p.substr(p.length-
2,1))))return p.substr(0,p.length-1);if(d&&h&&p.length<=h.length&&-1==p.indexOf(" ")&&2!=jb(f.substring(0,n-1),b)&&!e)return h+" ext. "}return h}catch(kb){return a}});m("intlTelInputUtils.formatNumber",function(a,b,c){try{var d=M.r(),e=Y(d,a,b);return d.format(e,"undefined"==typeof c?0:c)}catch(f){return""}});
m("intlTelInputUtils.getExampleNumber",function(a,b,c){try{var d=M.r(),e;a:{if(R(a)){var f=Ja(V(d,a),c);try{if(null!=f.c[6]){e=d.parse(y(f,6),a);break a}}catch(g){}}e=null}return d.format(e,b?2:1)}catch(h){return""}});m("intlTelInputUtils.getNumberType",function(a,b){try{var c=M.r(),d;var e=Y(c,a,b),f=Ka(c,e),g=T(c,e.l(),f);if(null==g)d=-1;else{var h=S(e);d=W(h,g)}return d}catch(l){return-99}});m("intlTelInputUtils.getValidationError",jb);
m("intlTelInputUtils.isValidNumber",function(a,b){try{var c=M.r(),d=Y(c,a,b),e;var f=Ka(c,d),g=d.l(),h=T(c,g,f);if(null==h||"001"!=f&&g!=La(c,f))e=!1;else{var l=S(d);e=-1!=W(l,h)}return e}catch(n){return!1}});m("intlTelInputUtils.numberType",{FIXED_LINE:0,MOBILE:1,FIXED_LINE_OR_MOBILE:2,TOLL_FREE:3,PREMIUM_RATE:4,SHARED_COST:5,VOIP:6,PERSONAL_NUMBER:7,PAGER:8,UAN:9,VOICEMAIL:10,UNKNOWN:-1});m("intlTelInputUtils.validationError",{IS_POSSIBLE:0,INVALID_COUNTRY_CODE:1,TOO_SHORT:2,TOO_LONG:3,NOT_A_NUMBER:4});
m("intlTelInputUtils.numberFormat",{E164:0,INTERNATIONAL:1,NATIONAL:2,RFC3966:3});})();

'use strict';
(function(){
	var slider = document.getElementById('slider');

	noUiSlider.create(slider, {
		start: [ 40000 ],
		step: 10000,
		connect: [false, true],
		range: {
			'min': [  0 ],
			'max': [ 70000 ]
		}
	});

	var leads = document.getElementById('money-leads');
	var orders = document.getElementById('money-orders');
	var payment = document.getElementById('money-payment');
	var sum = document.getElementById('money-sum');
	var revenue = document.getElementById('money-revenue');

	slider.noUiSlider.on('update', function( values, handle ) {
		switch (values[handle]) {
			case '0.00':
				leads.innerHTML = '0';
				orders.innerHTML = '0';
				payment.innerHTML = '0';
				sum.innerHTML = '0';
				revenue.innerHTML = '0';
				break;
			case '10000.00':
				leads.innerHTML = '10';
				orders.innerHTML = '12';
				payment.innerHTML = '8';
				sum.innerHTML = '16 000';
				revenue.innerHTML = '4 000';
				break;
			case '20000.00':
				leads.innerHTML = '20';
				orders.innerHTML = '23';
				payment.innerHTML = '15';
				sum.innerHTML = '30 000';
				revenue.innerHTML = '7 500';
				break;
			case '30000.00':
				leads.innerHTML = '30';
				orders.innerHTML = '34';
				payment.innerHTML = '22';
				sum.innerHTML = '45 000';
				revenue.innerHTML = '11 250';
				break;
			case '40000.00':
				leads.innerHTML = '40';
				orders.innerHTML = '46';
				payment.innerHTML = '26';
				sum.innerHTML = '57 000';
				revenue.innerHTML = '14 000';
				break;
			case '50000.00':
				leads.innerHTML = '50';
				orders.innerHTML = '56';
				payment.innerHTML = '36';
				sum.innerHTML = '72 000';
				revenue.innerHTML = '18 000';
				break;
			case '60000.00':
				leads.innerHTML = '100';
				orders.innerHTML = '114';
				payment.innerHTML = '72';
				sum.innerHTML = '144 000';
				revenue.innerHTML = '36 000';
				break;
			case '70000.00':
				leads.innerHTML = '200';
				orders.innerHTML = '226';
				payment.innerHTML = '143';
				sum.innerHTML = '286 000';
				revenue.innerHTML = '71 500';
				break;
			default:

		}
	});

	//подключаем плагин модальных окон
	// $('.header__login>span').click(function () {
	// 		var c = $('.popup_b--login');
	//     $.arcticmodal({
	//         content: c
	//     });
	// });

	$(document).ready(function(){
	$(".popup-input--tel").intlTelInput({
							utilsScript: '../js/utils.js',
	            defaultCountry: "ru",
	            onlyCountries: ["ru", "by", "ua", "md", "kz", "az", "am", "kg", "tj", "tm", "uz"],
							nationalMode: false,
	        		preferredCountries: ["ru", "by", "ua"]
	        });
				});

		(function() {
					document.getElementById("tel").onkeypress= function(event){
						event= event || window.event;
						if (event.charCode && (event.charCode < 48 || event.charCode > 57))// проверка на event.charCode - чтобы пользователь мог нажать backspace, enter, стрелочку назад...
						return false;
				};
				})();

	if (window.innerWidth <= '768') {
		smoothScroll.init({
		    selector: '[data-scroll]', // Selector for links (must be a class, ID, data attribute, or element tag)
		    selectorHeader: null, // Selector for fixed headers (must be a valid CSS selector) [optional]
		    speed: 500, // Integer. How fast to complete the scroll in milliseconds
		    easing: 'easeInOutCubic', // Easing pattern to use
		    offset: 90 // Integer. How far to offset the scrolling anchor location in pixels
		});
	} else {
		smoothScroll.init({
		    selector: '[data-scroll]', // Selector for links (must be a class, ID, data attribute, or element tag)
		    selectorHeader: null, // Selector for fixed headers (must be a valid CSS selector) [optional]
		    speed: 500, // Integer. How fast to complete the scroll in milliseconds
		    easing: 'easeInOutCubic', // Easing pattern to use
		    offset: 95 // Integer. How far to offset the scrolling anchor location in pixels
		});
	};
	// smoothScroll.init({
	//     selector: '[data-scroll]', // Selector for links (must be a class, ID, data attribute, or element tag)
	//     selectorHeader: null, // Selector for fixed headers (must be a valid CSS selector) [optional]
	//     speed: 500, // Integer. How fast to complete the scroll in milliseconds
	//     easing: 'easeInOutCubic', // Easing pattern to use
	//     offset: 50 // Integer. How far to offset the scrolling anchor location in pixels
	// });



		if (window.innerWidth <= '768') {
			var elem5 = document.querySelector('.top');
			var flkty = new Flickity( elem5, {
				wrapAround: true,
				cellAlign: 'left',
				contain: true
			});
		};

	var elem = document.querySelector('.reviews');
	var flkty = new Flickity( elem, {
	  wrapAround: true,
	  cellAlign: 'left',
	  contain: true
	});


	if (window.innerWidth <= '768') {
		var elem2 = document.querySelector('.conditions');
		var flkty = new Flickity( elem2, {
		  wrapAround: true,
		  cellAlign: 'left',
		  contain: true
		});
	};

	if (window.innerWidth <= '768') {
		var elem3 = document.querySelector('.benefits');
		var flkty = new Flickity( elem3, {
			wrapAround: true,
			groupCells: true
		});
	};

	if (window.innerWidth <= '768') {
		var elem4 = document.querySelector('.promo-mat__list');
		var flkty = new Flickity( elem4, {
			wrapAround: true,
			cellAlign: 'left',
			contain: true
		});
	};


})();


(function($) {

    var scripts = [];

    function loadScript(url, callback, context) {

        var script = scripts[url] || (scripts[url] = {
                loaded    : false,
                callbacks : []
            });

        if(script.loaded) {
            return callback.apply(context);
        }

        script.callbacks.push({
            fn      : callback,
            context : context
        });

        if(script.callbacks.length == 1) {
            $.ajax({
                type     : 'GET',
                url      : url,
                dataType : 'script',
                cache    : true,
                success  : function() {
                    script.loaded = true;
                    $.each(script.callbacks, function() {
                        this.fn.apply(this.context);
                    });
                    script.callbacks.length = 0;
                }
            });
        }

    }

    $.requireScript = function(url, callback, context, options) {

        if(typeof options === 'undefined' && context && context.hasOwnProperty('parallel')) {
            options = context;
            context = window;
        }

        options = $.extend({ parallel : true }, options);

        if(!$.isArray(url)) {
            return loadScript(url, callback, context);
        }

        var counter = 0;

        // parallel loading
        if(options.parallel) {
            return $.each(url, function() {
                loadScript(this, function() {
                    if(++counter == url.length) {
                        callback.apply(context);
                    }
                });
            });
        }

        // sequential loading
        (function() {
            if(counter == url.length) {
                return callback.apply(context);
            }
            loadScript(url[counter++], arguments.callee);
        })();

    };

    $.requireScript.registerLoaded = function(url) {
        $.each($.makeArray(url), function() {
            (scripts[url] || (scripts[url] = {})).loaded = true;
        });
    };

})(jQuery);

/**
 * Показ формы логина
 */
function showLoginForm() {
    var c = $('#login_form');
    $.arcticmodal('close');
    $.arcticmodal({
        afterClose: function() {
            $( ".input-error--top" ).html('');
        },
        content: c
    });
}

/**
 * Попап об успешном восстановлении
 */
function remindCompletedPopup() {
    var c = $('#pass_remind_completed_customer');
    $.arcticmodal('close');
    $.arcticmodal({
        content: c
    });
}

/**
 * Попап восстановления пароля автором
 * @param phone_number
 * @param email
 */
function remindAuthorPopup(phone_number, email) {
    var c = $('#remind_sms_sent');
    $.arcticmodal('close');
    $('#reminder_phone').html(phone_number);
    $('#reminder_email_input').val(email);
    $.arcticmodal({
        content: c
    });
}

/**
 * Попап о неправильном номере телефона
 */
function remindIncorrectPhonePopup() {
    var c = $('#remind_invalid');
    $.arcticmodal('close');
    $.arcticmodal({
        content: c
    });
}

/**
 * Попап о создании нового пароля
 */
function createNewPassword() {
    var c = $('#popup_new_password');
    $.arcticmodal('close');
    $.arcticmodal({
        content: c
    });
}

/**
 * Автологин и показ попапа о смене пароля
 * @param code
 */
function autologinAndChangePass(code) {
    var url = "/remind/autologin/"+code;
    $.ajax({
        type: "POST",
        url: url,
        success: function(response) {
            if(response.status == 'ERROR') {

            } else {
                createNewPassword();
            }
        }
    });
}

/**
 * Создание партнёра
 */
function createPartner() {
    var url = "/signup/logged";
    $.ajax({
        type: "POST",
        url: url,
        success: function(response) {
            if(response.is_new) {
                window.location.replace("/signup/redirect?code=" + response.code);
            }else{
                window.location.replace("/");
            }
        }
    });
}

/**
 * Сколнение существительных по падежам
 * @param number
 * @param one
 * @param two
 * @param five
 * @returns {*}
 */
function declension(number, one, two, five) {

    number = Math.abs(number);
    number %= 100;

    if (number >= 5 && number <= 20) {
        return five;
    }

    number %= 10;

    if (number == 1) {
        return one;
    }

    if (number >= 2 && number <= 4) {
        return two;
    }

    return five;

}


$('.header__login>span, .modal-login, .sign_in-form').click(function (e) {
    e.preventDefault();
    showLoginForm();
});


$('.recover').click(function (e) {
    e.preventDefault();
    var c = $('#form_remind_customer');
    $.arcticmodal('close');

    $.arcticmodal({
        afterClose: function() {
            $('.input-inner').removeClass('input-inner--error');
            $(".input-error--remind" ).html('');
            $('#remind_email').val('');
            $('#remind_submit_customer').prop("disabled",false);
        },
        content: c
    });
});


$('#remind_check_code').click(function (e) {
    var url = "/remind/check";
    e.preventDefault();
    $.ajax({
        type: "POST",
        url: url,
        data: $("#remind_sms_sent").serialize(),
        success: function(response) {
            if(response.status == 'ERROR') {
                $(".input-error--sms_sent").addClass('input-error--active');
                if(response.fields.invalid_code) {
                    $( ".input-error--sms_sent" ).html('Вы ввели неверный код');
                }
                if(response.fields.code_expired) {
                    $( ".input-error--sms_sent" ).html('Введенный код устарел. Отправьте еще раз');
                }
            } else {
                autologinAndChangePass(response.code);
            }
        }
    });
});


$('.become-a-partner-logged').click(function (e) {
    e.preventDefault();
    createPartner();
});


$('#remind_change_password').click(function (e) {
    var url = "/remind/password/change";
    e.preventDefault();
    $.ajax({
        type: "POST",
        url: url,
        data: $("#popup_new_password").serialize(),
        success: function(response) {
            if(response.status == 'ERROR') {
                $("#remind_change_password_error").addClass('input-error--active');
                if(response.fields.password && response.fields.password == 'incorrect_length') {
                    $("#remind_change_password_error").html('Пароль должен быть не короче 6-ти символов');
                }
                if(response.fields.password && ((response.fields.password == 'required' && response.fields.confirm_password == 'required')) || response.fields.confirm_password && response.fields.confirm_password == 'equals') {
                    $("#remind_change_password_error").html('Пароли не совпадают');
                }
            } else {
                createPartner();
            }
        }
    });

});

var recaptcha_login ='';
$('#login_submit').click(function (e) {
    var url = "/login";
    e.preventDefault();
    if(window.grecaptcha) {
        $("#login_form").append('<input type = "hidden" name = "response" value="' + window.grecaptcha.getResponse + '"/>');
    }
    console.log($("#login_form").serialize());
    $.ajax({
        type: "POST",
        url: url,
        data: $("#login_form").serialize(),
        success: function(response) {
            if(response.status == 'ERROR') {
                if(response.fields.user_blocked) {
                    $( ".input-error--top" ).html('Ваш аккаунт заблокирован');
                }
                if(response.fields.not_found) {
                    $( ".input-error--top" ).html('Пользователь с таким e-mail и паролем не найден');
                }
                if(response.fields.captcha == 'invalid') {
                    $( ".input-error--top" ).html('Пожалуйста, подтвердите, что вы не робот!');
                }


                if(!!response.captcha) {
                        var mysitekey = response.captcha
                        if($("#recaptcha_login").length == 0) {
                            $("#login_form #password").parents(".input-inner").after('<div class="input-inner" style="height:95px"><div id="recaptcha_login" style="transform:scale(0.91);transform-origin:0 0;"></div></div>');
                            recaptcha_login = grecaptcha.render('recaptcha_login', {
                                'sitekey' : mysitekey
                            });
                        } else {
                            if(typeof recaptcha_login != 'undefined'){
                                window.grecaptcha.reset(recaptcha_login);
                            }
                        }
                }

            } else {
                if(response.is_new) {
                    window.location.replace("/signup/redirect?code="+response.code);
                }else{
                    window.location.replace("/statistics/main");
                }
            }
        }
    });

});


$('#retry_to_send_code').click(function (e) {
    var url = "/remind";
    e.preventDefault();
    $.ajax({
        type: "POST",
        url: url,
        data: $("#remind_sms_sent").serialize(),
        success: function (response) {
            $(".input-error--sms_sent").addClass('input-error--active');
            if (response.status == 'ERROR') {
                if (response.fields.retry_in) {
                    $(".input-error--sms_sent").html('Повторная отправка смс доступна через '+response.fields.retry_in+' '+ declension(response.fields.retry_in, 'минута', 'минуты', 'минут'));
                }
            } else {
                $(".input-error--sms_sent").html('Повторное смс отправлено');
            }
        }
    });
});


$('#remind_submit_customer').click(function (e) {
    var url = "/remind";
    e.preventDefault();

    $('#remind_submit_customer').prop("disabled",true);
    $.ajax({
        type: "POST",
        url: url,
        data: $("#form_remind_customer").serialize(),
        success: function(response) {
            if(response.status == 'ERROR') {
                $("#remind_email").parent().addClass('input-inner--error');
                if(response.fields.captcha) {
                    if(typeof recaptcha_remind != 'undefined'){
                        window.grecaptcha.reset(recaptcha_remind);
                    }
                    $( ".input-error--remind" ).html('Пожалуйста, подтвердите, что вы не робот!');
                }
                if(response.fields.email) {
                    $( ".input-error--remind" ).html('Укажите e-mail');
                }
                if(response.fields.invalid_user) {
                    $( ".input-error--remind" ).html('Указанный e-mail не найден');
                }
                if(response.fields.incorrect_phone_length) {
                    remindIncorrectPhonePopup();
                }
                if (response.fields.retry_in) {
                    $(".input-error--remind").html('Повторная отправка смс доступна через '+response.fields.retry_in+' '+ declension(response.fields.retry_in, 'минута', 'минуты', 'минут'));
                }
                $('#remind_submit_customer').prop("disabled",false);
            }else{
                if(response.role == 1) {
                    remindCompletedPopup();
                }
                if(response.role == 2) {
                    remindAuthorPopup(response.phone, response.email);
                }
            }
        }
    });

});


$('.become-a-partner, .sign_up-form').click(function (e) {
    e.preventDefault();
    var c = $('.popup_b--registr');

    $.arcticmodal('close');
    $.arcticmodal({
        afterClose: function() {
            $('.input-inner').removeClass('input-inner--error');
        },
        content: c
    });
});


$('#register_submit').click(function (e) {
    var url = "/signup";
    e.preventDefault();
    $('.input-inner--error').removeClass('input-inner--error');


    if(document.getElementsByClassName('phone_country_code')[0]){
        var em = document.getElementsByClassName('phone_country_code');
        while(em[0]) {
            em[0].parentNode.removeChild(em[0]);
        }
    }

    var element = document.getElementsByClassName('country highlight active')[0] ? document.getElementsByClassName('country highlight active')[0] :
        document.getElementsByClassName('country preferred active')[0];

    if(element){
        var input = document.createElement("input");
        input.setAttribute("type", "hidden");
        input.setAttribute("class", "phone_country_code");
        input.setAttribute("name", "phone_country_code");
        input.setAttribute("value", element.getAttribute('data-dial-code'));
        document.getElementById("signup_form").appendChild(input);
    }

    $.ajax({
        type: "POST",
        url: url,
        data: $("#signup_form").serialize(),
        success: function(response) {
            if(response.status == 'ERROR') {
                if(response.fields) {
                    if(response.fields.email) {
                        $("#email").parent().addClass('input-inner--error');
                    }
                    if(response.fields.name) {
                        $("#name").parent().addClass('input-inner--error');
                        var text = 'Укажите имя';
                        if(response.fields.name == 'not_email') {
                            text = 'Имя не может быть почтой';
                        }
                        $("#name_error_text").html(text);
                    }
                    if(response.fields.password) {
                        $("#pass").parent().addClass('input-inner--error');
                    }
                    if(response.fields.rules) {
                        $("#rules").parent().addClass('input-inner--error');
                    }
                    if(response.fields.phone) {
                        $("#tel").parent().parent().addClass('input-inner--error');
                    }
                    if(response.fields.user_exists) {
                        $.arcticmodal('close');
                        showLoginForm();
                        $( ".input-error--top" ).html('Вы уже зарегистрированы. Введите e-mail и пароль для входа');
                    }
                }
            } else {
                window.location.replace("/signup/redirect?code="+response.code);
            }
        }
    });

});