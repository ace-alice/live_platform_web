if(!self.define){let e,a={};const s=(s,i)=>(s=new URL(s+".js",i).href,a[s]||new Promise((a=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=a,document.head.appendChild(e)}else e=s,importScripts(s),a()})).then((()=>{let e=a[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(i,n)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(a[r])return;let o={};const d=e=>s(e,r),l={module:{uri:r},exports:o,require:d};a[r]=Promise.all(i.map((e=>l[e]||d(e)))).then((e=>(n(...e),o)))}}define(["./workbox-e1498109"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/_plugin-vue_export-helper-BCo6x5W8.js",revision:null},{url:"assets/avatar-EB3heKtb.png",revision:null},{url:"assets/default-BhwMaPUK.js",revision:null},{url:"assets/index-4SuFmCUE.js",revision:null},{url:"assets/index-B8ojg0a2.js",revision:null},{url:"assets/index-CAndancJ.css",revision:null},{url:"assets/index-cCAkofzF.js",revision:null},{url:"assets/index-CMlkqMqH.css",revision:null},{url:"assets/index-CWUT6KLr.css",revision:null},{url:"assets/layout01-C8q1FL0X.js",revision:null},{url:"assets/workbox-window.prod.es5-B8JjyKVo.js",revision:null},{url:"favicon.ico",revision:"6383936a90261021312dfcf540081b99"},{url:"index.html",revision:"5ddd49a2c045f78aed15a12ad4536df2"},{url:"pwa/apple-startup-1024x1024.png",revision:"46ae11dd4da51f6619d8ae55fea29bd1"},{url:"pwa/apple-touch-icon-114x114.png",revision:"c29d2680c4af0deff43ec3140708ca1e"},{url:"pwa/apple-touch-icon-120x120.png",revision:"c0d97c3d99aba9df10334acd84411e0a"},{url:"pwa/apple-touch-icon-144x144.png",revision:"1351f5da6aa1ad8c68653ac172403271"},{url:"pwa/apple-touch-icon-152x152.png",revision:"bf7ff5c28718b6a63f3a80ee80f3b872"},{url:"pwa/apple-touch-icon-180x180.png",revision:"62420f56ca8e5ce37deaec2925357e73"},{url:"pwa/apple-touch-icon-57x57.png",revision:"e4b285251c92e16501bad254325bf63c"},{url:"pwa/apple-touch-icon-60x60.png",revision:"352c38fdfeab274839577c88cf280034"},{url:"pwa/apple-touch-icon-72x72.png",revision:"7a7c2fedd126d96b31e52b55f5a332f4"},{url:"pwa/favicon-16x16.png",revision:"c5f04f1288a6d658fbc241d7483d97bc"},{url:"pwa/favicon-32x32.png",revision:"c89409717edeebd00a21cdc320e728d1"},{url:"pwa/pwa-180x180.png",revision:"ebb84008339179dced908546673090e4"},{url:"pwa/pwa-192x192.png",revision:"11964451e1bda0336f02a89ca48657a6"},{url:"pwa/pwa-512x512.png",revision:"8542f086d1da68eb0f6a0e61f5f12aba"},{url:"pwa/pwa-64x64.png",revision:"6383936a90261021312dfcf540081b99"},{url:"pwa/pwa-svg-16.svg",revision:"e571b1c7ab446a39a78d76bbd939d449"},{url:"pwa/pwa-svg-24.svg",revision:"ff35b3cceeb8eadebdb529d8b7f28200"},{url:"pwa/pwa-svg-32.svg",revision:"ac6e473e84751d8da41ceee772765801"},{url:"pwa/pwa-svg-64.svg",revision:"00b44c9975a367d589eb4150db23614b"},{url:"pwa/pwa-svg-64.svg",revision:"00b44c9975a367d589eb4150db23614b"},{url:"pwa/pwa-svg-32.svg",revision:"ac6e473e84751d8da41ceee772765801"},{url:"pwa/pwa-svg-24.svg",revision:"ff35b3cceeb8eadebdb529d8b7f28200"},{url:"pwa/pwa-svg-16.svg",revision:"e571b1c7ab446a39a78d76bbd939d449"},{url:"pwa/pwa-64x64.png",revision:"6383936a90261021312dfcf540081b99"},{url:"pwa/pwa-192x192.png",revision:"11964451e1bda0336f02a89ca48657a6"},{url:"pwa/pwa-512x512.png",revision:"8542f086d1da68eb0f6a0e61f5f12aba"},{url:"pwa/apple-startup-1024x1024.png",revision:"46ae11dd4da51f6619d8ae55fea29bd1"},{url:"manifest.webmanifest",revision:"57a0b86f35bd5814d95b23e2ab8e67ef"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
