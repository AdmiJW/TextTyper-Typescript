!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.TextTyper=e():t.TextTyper=e()}(self,(function(){return(()=>{"use strict";var t={404:(t,e,n)=>{n.d(e,{Z:()=>u});var i=n(81),r=n.n(i),s=n(645),o=n.n(s)()(r());o.push([t.id,"[is='text-cursor'] {\r\n    display: inline-block;\r\n    margin: 0 .1em;\r\n\r\n    min-height: 1.2em;\r\n    min-width: 0.07em;\r\n    vertical-align: text-bottom;\r\n    background-color: black;\r\n\r\n    animation-name: CURSOR_BLINK_FLASH;\r\n}\r\n\r\n\r\n@keyframes CURSOR_BLINK_FLASH {\r\n    0%, 50% {\r\n        opacity: 1;\r\n    }\r\n    51%, 100% {\r\n        opacity: 0;\r\n    }\r\n}",""]);const u=o},645:t=>{t.exports=function(t){var e=[];return e.toString=function(){return this.map((function(e){var n="",i=void 0!==e[5];return e[4]&&(n+="@supports (".concat(e[4],") {")),e[2]&&(n+="@media ".concat(e[2]," {")),i&&(n+="@layer".concat(e[5].length>0?" ".concat(e[5]):""," {")),n+=t(e),i&&(n+="}"),e[2]&&(n+="}"),e[4]&&(n+="}"),n})).join("")},e.i=function(t,n,i,r,s){"string"==typeof t&&(t=[[null,t,void 0]]);var o={};if(i)for(var u=0;u<this.length;u++){var a=this[u][0];null!=a&&(o[a]=!0)}for(var c=0;c<t.length;c++){var h=[].concat(t[c]);i&&o[h[0]]||(void 0!==s&&(void 0===h[5]||(h[1]="@layer".concat(h[5].length>0?" ".concat(h[5]):""," {").concat(h[1],"}")),h[5]=s),n&&(h[2]?(h[1]="@media ".concat(h[2]," {").concat(h[1],"}"),h[2]=n):h[2]=n),r&&(h[4]?(h[1]="@supports (".concat(h[4],") {").concat(h[1],"}"),h[4]=r):h[4]="".concat(r)),e.push(h))}},e}},81:t=>{t.exports=function(t){return t[1]}},379:t=>{var e=[];function n(t){for(var n=-1,i=0;i<e.length;i++)if(e[i].identifier===t){n=i;break}return n}function i(t,i){for(var s={},o=[],u=0;u<t.length;u++){var a=t[u],c=i.base?a[0]+i.base:a[0],h=s[c]||0,l="".concat(c," ").concat(h);s[c]=h+1;var d=n(l),p={css:a[1],media:a[2],sourceMap:a[3],supports:a[4],layer:a[5]};if(-1!==d)e[d].references++,e[d].updater(p);else{var f=r(p,i);i.byIndex=u,e.splice(u,0,{identifier:l,updater:f,references:1})}o.push(l)}return o}function r(t,e){var n=e.domAPI(e);return n.update(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap&&e.supports===t.supports&&e.layer===t.layer)return;n.update(t=e)}else n.remove()}}t.exports=function(t,r){var s=i(t=t||[],r=r||{});return function(t){t=t||[];for(var o=0;o<s.length;o++){var u=n(s[o]);e[u].references--}for(var a=i(t,r),c=0;c<s.length;c++){var h=n(s[c]);0===e[h].references&&(e[h].updater(),e.splice(h,1))}s=a}}},569:t=>{var e={};t.exports=function(t,n){var i=function(t){if(void 0===e[t]){var n=document.querySelector(t);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(t){n=null}e[t]=n}return e[t]}(t);if(!i)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");i.appendChild(n)}},216:t=>{t.exports=function(t){var e=document.createElement("style");return t.setAttributes(e,t.attributes),t.insert(e,t.options),e}},565:(t,e,n)=>{t.exports=function(t){var e=n.nc;e&&t.setAttribute("nonce",e)}},795:t=>{t.exports=function(t){var e=t.insertStyleElement(t);return{update:function(n){!function(t,e,n){var i="";n.supports&&(i+="@supports (".concat(n.supports,") {")),n.media&&(i+="@media ".concat(n.media," {"));var r=void 0!==n.layer;r&&(i+="@layer".concat(n.layer.length>0?" ".concat(n.layer):""," {")),i+=n.css,r&&(i+="}"),n.media&&(i+="}"),n.supports&&(i+="}");var s=n.sourceMap;s&&"undefined"!=typeof btoa&&(i+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(s))))," */")),e.styleTagTransform(i,t,e.options)}(e,t,n)},remove:function(){!function(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t)}(e)}}}},589:t=>{t.exports=function(t,e){if(e.styleSheet)e.styleSheet.cssText=t;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(t))}}}},e={};function n(i){var r=e[i];if(void 0!==r)return r.exports;var s=e[i]={id:i,exports:{}};return t[i](s,s.exports,n),s.exports}n.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return n.d(e,{a:e}),e},n.d=(t,e)=>{for(var i in e)n.o(e,i)&&!n.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:e[i]})},n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e);var i={};return(()=>{n.d(i,{default:()=>T});const t=1e3;var e=n(379),r=n.n(e),s=n(795),o=n.n(s),u=n(569),a=n.n(u),c=n(565),h=n.n(c),l=n(216),d=n.n(l),p=n(589),f=n.n(p),v=n(404),x={};x.styleTagTransform=f(),x.setAttributes=h(),x.insert=a().bind(null,"head"),x.domAPI=o(),x.insertStyleElement=d(),r()(v.Z,x),v.Z&&v.Z.locals&&v.Z.locals;class y extends HTMLSpanElement{constructor(e=1e3){super(),this.blinkDuration=t,this.isBlinking=!0,this.setAttribute("is","text-cursor"),this.style.animationIterationCount="infinite",this.style.animationTimingFunction="linear",this.setBlinkingDuration(e)}setBlinkingDuration(t){if(!isFinite(t)||t<0)throw`Invalid blink duration provided in the constructor of Cursor: ${t}`;return this.blinkDuration=t,this.style.animationDuration=`${t}ms`,this}setIsBlinking(t){return!this.isBlinking&&t?this.style.animationDuration=`${this.blinkDuration}ms`:this.isBlinking&&!t&&(this.style.animationDuration="0ms"),this.isBlinking=t,this}}customElements.define("text-cursor",y,{extends:"span"});const m=y;function g(t,e,n=[],i=!1){return new Promise((r=>{let s;i||(s=t(...n)),setTimeout((()=>{i&&(s=t(...n)),r(s)}),e)}))}var b=function(t,e,n,i){return new(n||(n=Promise))((function(r,s){function o(t){try{a(i.next(t))}catch(t){s(t)}}function u(t){try{a(i.throw(t))}catch(t){s(t)}}function a(t){var e;t.done?r(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(o,u)}a((i=i.apply(t,e||[])).next())}))};var C=function(t,e,n,i){return new(n||(n=Promise))((function(r,s){function o(t){try{a(i.next(t))}catch(t){s(t)}}function u(t){try{a(i.throw(t))}catch(t){s(t)}}function a(t){var e;t.done?r(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(o,u)}a((i=i.apply(t,e||[])).next())}))};const T=class{constructor(t,{typeCPS:e=10,deleteCPS:n=10,blinkDuration:i=1e3}){if(this.typeMsPerCharacter=100,this.deleteMsPerCharacter=100,!(t instanceof Element))throw"The textbox passed into the TextTyper constructor must be a valid HTML element!";for(this.textbox=t,this.configure({typeCPS:e,deleteCPS:n}),this.textCursor=new m(i),this.textNode=document.createTextNode("");this.textbox.firstChild;)this.textbox.removeChild(this.textbox.firstChild);this.textbox.classList.add("text-box"),this.textbox.appendChild(this.textNode),this.textbox.appendChild(this.textCursor)}_type(t){"\n"===t?this._newline():this.textNode.textContent+=t}_delete(t){!this.textNode.textContent&&this.textNode.previousSibling?(this.textbox.removeChild(this.textCursor.previousSibling),this.textbox.removeChild(this.textCursor.previousSibling),this.textNode=this.textCursor.previousSibling):this.textNode.textContent=this.textNode.textContent.slice(0,-t)}_newline(){this.textbox.insertBefore(document.createElement("br"),this.textCursor),this.textbox.insertBefore(document.createTextNode(""),this.textCursor),this.textNode=this.textCursor.previousSibling}type(t,e){return C(this,void 0,void 0,(function*(){this.textCursor.setIsBlinking(!1);for(let e of t)yield g((()=>{this._type(e)}),this.typeMsPerCharacter);this.textCursor.setIsBlinking(!0),e&&e(void 0)}))}putText(t,e){return C(this,void 0,void 0,(function*(){this.textCursor.setIsBlinking(!1),this._type(t),this.textCursor.setIsBlinking(!0),e&&e(void 0)}))}delete(t=1/0,e){return C(this,void 0,void 0,(function*(){for(this.textCursor.setIsBlinking(!1);t-- >0&&(this.textNode.textContent||this.textNode.previousSibling);)yield g((()=>{this._delete(1)}),this.deleteMsPerCharacter);this.textCursor.setIsBlinking(!0),e&&e(void 0)}))}clear(t){return C(this,void 0,void 0,(function*(){this._delete(1/0),t&&t(void 0)}))}configure({typeCPS:t,deleteCPS:e,blinkDuration:n},i){return C(this,void 0,void 0,(function*(){if(null!=t){if(!isFinite(t)||t<=0)throw"The type character per second (typeCPS) must be greater than 0!";this.typeMsPerCharacter=1e3/t}if(null!=e){if(!isFinite(e)||e<=0)throw"The delete character per second (deleteCPS) must be greater than 0!";this.deleteMsPerCharacter=1e3/e}null!=n&&this.textCursor.setBlinkingDuration(n),i&&i(void 0)}))}getEventQueue(){return new class{constructor(t){this.eventQueue=[],this.historyQueue=[],this.textTyper=t}start(){return b(this,void 0,void 0,(function*(){for(;this.eventQueue.length;){const t=this.eventQueue.shift();yield new Promise((e=>this._executeFunc(t,e,!0)))}}))}loop(t=1/0){return this.eventQueue.push({thisBinding:this,eventFunc:this._looper,args:[t]}),this}standby(t){return this.eventQueue.push({thisBinding:this,eventFunc:this._standby,args:[t]}),this}clearHistory(){return this.eventQueue.push({thisBinding:this,eventFunc:this._looper,args:[0]}),this}type(t){return this.eventQueue.push({thisBinding:this.textTyper,eventFunc:this.textTyper.type,args:[t]}),this}putText(t){return this.eventQueue.push({thisBinding:this.textTyper,eventFunc:this.textTyper.putText,args:[t]}),this}delete(t=1/0){return this.eventQueue.push({thisBinding:this.textTyper,eventFunc:this.textTyper.delete,args:[t]}),this}clear(){return this.eventQueue.push({thisBinding:this.textTyper,eventFunc:this.textTyper.clear,args:[]}),this}configure(t){return this.eventQueue.push({thisBinding:this.textTyper,eventFunc:this.textTyper.configure,args:[t]}),this}_executeFunc(t,e,n){const{thisBinding:i,eventFunc:r,args:s}=t;n&&this.historyQueue.push(t),r.call(i,...s,e)}_looper(t=1/0,e){return b(this,void 0,void 0,(function*(){for(t===1/0&&e(void 0);t-- >0;)for(let t of this.historyQueue)t.eventFunc!==this._looper&&(yield new Promise((e=>this._executeFunc(t,e,!1))));this.historyQueue=[],e(void 0)}))}_standby(t,e){return b(this,void 0,void 0,(function*(){yield g((()=>{}),t),e&&e(void 0)}))}}(this)}}})(),i.default})()}));