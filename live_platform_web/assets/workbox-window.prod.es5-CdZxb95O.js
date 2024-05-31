try{self["workbox:window:7.0.0"]&&_()}catch(n){}function E(n,r){return new Promise(function(t){var i=new MessageChannel;i.port1.onmessage=function(c){t(c.data)},n.postMessage(r,[i.port2])})}function W(n){var r=function(t,i){if(typeof t!="object"||!t)return t;var c=t[Symbol.toPrimitive];if(c!==void 0){var h=c.call(t,i);if(typeof h!="object")return h;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(n,"string");return typeof r=="symbol"?r:r+""}function k(n,r){for(var t=0;t<r.length;t++){var i=r[t];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(n,W(i.key),i)}}function P(n,r){return P=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,i){return t.__proto__=i,t},P(n,r)}function j(n,r){(r==null||r>n.length)&&(r=n.length);for(var t=0,i=new Array(r);t<r;t++)i[t]=n[t];return i}function L(n,r){var t=typeof Symbol!="undefined"&&n[Symbol.iterator]||n["@@iterator"];if(t)return(t=t.call(n)).next.bind(t);if(Array.isArray(n)||(t=function(c,h){if(c){if(typeof c=="string")return j(c,h);var l=Object.prototype.toString.call(c).slice(8,-1);return l==="Object"&&c.constructor&&(l=c.constructor.name),l==="Map"||l==="Set"?Array.from(c):l==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(l)?j(c,h):void 0}}(n))||r){t&&(n=t);var i=0;return function(){return i>=n.length?{done:!0}:{done:!1,value:n[i++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}try{self["workbox:core:7.0.0"]&&_()}catch(n){}var w=function(){var n=this;this.promise=new Promise(function(r,t){n.resolve=r,n.reject=t})};function b(n,r){var t=location.href;return new URL(n,t).href===new URL(r,t).href}var g=function(n,r){this.type=n,Object.assign(this,r)};function d(n,r,t){return t?r?r(n):n:(n&&n.then||(n=Promise.resolve(n)),r?n.then(r):n)}function O(){}var x={type:"SKIP_WAITING"};function S(n,r){return n&&n.then?n.then(O):Promise.resolve()}var U=function(n){function r(v,u){var e,o;return u===void 0&&(u={}),(e=n.call(this)||this).nn={},e.tn=0,e.rn=new w,e.en=new w,e.on=new w,e.un=0,e.an=new Set,e.cn=function(){var s=e.fn,a=s.installing;e.tn>0||!b(a.scriptURL,e.sn.toString())||performance.now()>e.un+6e4?(e.vn=a,s.removeEventListener("updatefound",e.cn)):(e.hn=a,e.an.add(a),e.rn.resolve(a)),++e.tn,a.addEventListener("statechange",e.ln)},e.ln=function(s){var a=e.fn,f=s.target,p=f.state,m=f===e.vn,y={sw:f,isExternal:m,originalEvent:s};!m&&e.mn&&(y.isUpdate=!0),e.dispatchEvent(new g(p,y)),p==="installed"?e.wn=self.setTimeout(function(){p==="installed"&&a.waiting===f&&e.dispatchEvent(new g("waiting",y))},200):p==="activating"&&(clearTimeout(e.wn),m||e.en.resolve(f))},e.yn=function(s){var a=e.hn,f=a!==navigator.serviceWorker.controller;e.dispatchEvent(new g("controlling",{isExternal:f,originalEvent:s,sw:a,isUpdate:e.mn})),f||e.on.resolve(a)},e.gn=(o=function(s){var a=s.data,f=s.ports,p=s.source;return d(e.getSW(),function(){e.an.has(p)&&e.dispatchEvent(new g("message",{data:a,originalEvent:s,ports:f,sw:p}))})},function(){for(var s=[],a=0;a<arguments.length;a++)s[a]=arguments[a];try{return Promise.resolve(o.apply(this,s))}catch(f){return Promise.reject(f)}}),e.sn=v,e.nn=u,navigator.serviceWorker.addEventListener("message",e.gn),e}var t,i;i=n,(t=r).prototype=Object.create(i.prototype),t.prototype.constructor=t,P(t,i);var c,h,l=r.prototype;return l.register=function(v){var u=(v===void 0?{}:v).immediate,e=u!==void 0&&u;try{var o=this;return d(function(s,a){var f=s();return f&&f.then?f.then(a):a(f)}(function(){if(!e&&document.readyState!=="complete")return S(new Promise(function(s){return window.addEventListener("load",s)}))},function(){return o.mn=!!navigator.serviceWorker.controller,o.dn=o.pn(),d(o.bn(),function(s){o.fn=s,o.dn&&(o.hn=o.dn,o.en.resolve(o.dn),o.on.resolve(o.dn),o.dn.addEventListener("statechange",o.ln,{once:!0}));var a=o.fn.waiting;return a&&b(a.scriptURL,o.sn.toString())&&(o.hn=a,Promise.resolve().then(function(){o.dispatchEvent(new g("waiting",{sw:a,wasWaitingBeforeRegister:!0}))}).then(function(){})),o.hn&&(o.rn.resolve(o.hn),o.an.add(o.hn)),o.fn.addEventListener("updatefound",o.cn),navigator.serviceWorker.addEventListener("controllerchange",o.yn),o.fn})}))}catch(s){return Promise.reject(s)}},l.update=function(){try{return this.fn?d(S(this.fn.update())):d()}catch(v){return Promise.reject(v)}},l.getSW=function(){return this.hn!==void 0?Promise.resolve(this.hn):this.rn.promise},l.messageSW=function(v){try{return d(this.getSW(),function(u){return E(u,v)})}catch(u){return Promise.reject(u)}},l.messageSkipWaiting=function(){this.fn&&this.fn.waiting&&E(this.fn.waiting,x)},l.pn=function(){var v=navigator.serviceWorker.controller;return v&&b(v.scriptURL,this.sn.toString())?v:void 0},l.bn=function(){try{var v=this;return d(function(u,e){try{var o=u()}catch(s){return e(s)}return o&&o.then?o.then(void 0,e):o}(function(){return d(navigator.serviceWorker.register(v.sn,v.nn),function(u){return v.un=performance.now(),u})},function(u){throw u}))}catch(u){return Promise.reject(u)}},c=r,(h=[{key:"active",get:function(){return this.en.promise}},{key:"controlling",get:function(){return this.on.promise}}])&&k(c.prototype,h),Object.defineProperty(c,"prototype",{writable:!1}),c}(function(){function n(){this.Pn=new Map}var r=n.prototype;return r.addEventListener=function(t,i){this.jn(t).add(i)},r.removeEventListener=function(t,i){this.jn(t).delete(i)},r.dispatchEvent=function(t){t.target=this;for(var i,c=L(this.jn(t.type));!(i=c()).done;)(0,i.value)(t)},r.jn=function(t){return this.Pn.has(t)||this.Pn.set(t,new Set),this.Pn.get(t)},n}());export{U as Workbox,g as WorkboxEvent,E as messageSW};
