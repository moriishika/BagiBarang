if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let s=Promise.resolve();return r[e]||(s=new Promise((async s=>{if("document"in self){const r=document.createElement("script");r.src=e,document.head.appendChild(r),r.onload=s}else importScripts(e),s()}))),s.then((()=>{if(!r[e])throw new Error(`Module ${e} didn’t register its module`);return r[e]}))},s=(s,r)=>{Promise.all(s.map(e)).then((e=>r(1===e.length?e[0]:e)))},r={require:Promise.resolve(s)};self.define=(s,n,a)=>{r[s]||(r[s]=Promise.resolve().then((()=>{let r={};const i={uri:location.origin+s.slice(1)};return Promise.all(n.map((s=>{switch(s){case"exports":return r;case"module":return i;default:return e(s)}}))).then((e=>{const s=a(...e);return r.default||(r.default=s),r}))})))}}define("./sw.js",["./workbox-ea903bce"],(function(e){"use strict";importScripts("fallback-5RYFHd_TU75iRFF1s4f05.js"),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/61ev4nvYOTL.jpg",revision:"88657991cac0f3fbaf8ae4eebf233f62"},{url:"/MoriiUta.png",revision:"46d94eeb971bf2e602104494e0be47db"},{url:"/_next/static/5RYFHd_TU75iRFF1s4f05/_buildManifest.js",revision:"5RYFHd_TU75iRFF1s4f05"},{url:"/_next/static/5RYFHd_TU75iRFF1s4f05/_ssgManifest.js",revision:"5RYFHd_TU75iRFF1s4f05"},{url:"/_next/static/chunks/21-6d133970e824c361d3a9.js",revision:"5RYFHd_TU75iRFF1s4f05"},{url:"/_next/static/chunks/288-78b52ea2e468fc28bf82.js",revision:"5RYFHd_TU75iRFF1s4f05"},{url:"/_next/static/chunks/597-8eda43b4daa862712e2e.js",revision:"5RYFHd_TU75iRFF1s4f05"},{url:"/_next/static/chunks/674-612c85a99032ebebec74.js",revision:"5RYFHd_TU75iRFF1s4f05"},{url:"/_next/static/chunks/framework-1a8d6b8d7ba18d0d7861.js",revision:"5RYFHd_TU75iRFF1s4f05"},{url:"/_next/static/chunks/main-7713a1ef2965e1d091b8.js",revision:"5RYFHd_TU75iRFF1s4f05"},{url:"/_next/static/chunks/pages/_app-5309da4feb57eed5dfa0.js",revision:"5RYFHd_TU75iRFF1s4f05"},{url:"/_next/static/chunks/pages/_error-ac9f90bacbe0b44db9a9.js",revision:"5RYFHd_TU75iRFF1s4f05"},{url:"/_next/static/chunks/pages/_offline-177b3099f4caabd4f64a.js",revision:"5RYFHd_TU75iRFF1s4f05"},{url:"/_next/static/chunks/pages/home-dba4cd2e8738cf803d12.js",revision:"5RYFHd_TU75iRFF1s4f05"},{url:"/_next/static/chunks/pages/index-daf9bd71970a42bb22f0.js",revision:"5RYFHd_TU75iRFF1s4f05"},{url:"/_next/static/chunks/pages/login-52b2bd6997a591938bca.js",revision:"5RYFHd_TU75iRFF1s4f05"},{url:"/_next/static/chunks/pages/profile-4e7431736df78e5c85f3.js",revision:"5RYFHd_TU75iRFF1s4f05"},{url:"/_next/static/chunks/pages/uploaditem-d389fd37be06dd0c0a9b.js",revision:"5RYFHd_TU75iRFF1s4f05"},{url:"/_next/static/chunks/polyfills-8683bd742a84c1edd48c.js",revision:"5RYFHd_TU75iRFF1s4f05"},{url:"/_next/static/chunks/webpack-eb4d5dfa1e20b46a276f.js",revision:"5RYFHd_TU75iRFF1s4f05"},{url:"/_next/static/css/a8ce2bd2585736deb867.css",revision:"5RYFHd_TU75iRFF1s4f05"},{url:"/_offline",revision:"5RYFHd_TU75iRFF1s4f05"},{url:"/favicon.ico",revision:"c92b85a5b907c70211f4ec25e29a8c4a"},{url:"/kotori.jpg",revision:"0607353c1792071ad01afd83735845e1"},{url:"/kotori2.jpg",revision:"117c79d43f8781ddbf1bef07ffacfd34"},{url:"/logo192.png",revision:"33dbdd0177549353eeeb785d02c294af"},{url:"/logo512.png",revision:"917515db74ea8d1aee6a246cfbcc0b45"},{url:"/manifest.json",revision:"adca13a37ed4b90428c0e95a675f2c8e"},{url:"/robots.txt",revision:"fa1ded1ed7c11438a9b0385b1e112850"},{url:"/service-worker.js",revision:"dcd0515a8c581734173c19e6e9ec9ab3"},{url:"/unnamed.png",revision:"3fdaf184008962e392bee429f29daa6b"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:r,state:n})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s},{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts",plugins:[{handlerDidError:async({request:e})=>self.fallback(e)},new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[{handlerDidError:async({request:e})=>self.fallback(e)},new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[{handlerDidError:async({request:e})=>self.fallback(e)},new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[{handlerDidError:async({request:e})=>self.fallback(e)},new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:mp3|mp4)$/i,new e.StaleWhileRevalidate({cacheName:"static-media-assets",plugins:[{handlerDidError:async({request:e})=>self.fallback(e)},new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[{handlerDidError:async({request:e})=>self.fallback(e)},new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[{handlerDidError:async({request:e})=>self.fallback(e)},new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[{handlerDidError:async({request:e})=>self.fallback(e)},new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[{handlerDidError:async({request:e})=>self.fallback(e)},new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[{handlerDidError:async({request:e})=>self.fallback(e)},new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[{handlerDidError:async({request:e})=>self.fallback(e)},new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET")}));
