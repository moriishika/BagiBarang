<<<<<<< HEAD
if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let s=Promise.resolve();return n[e]||(s=new Promise((async s=>{if("document"in self){const n=document.createElement("script");n.src=e,document.head.appendChild(n),n.onload=s}else importScripts(e),s()}))),s.then((()=>{if(!n[e])throw new Error(`Module ${e} didn’t register its module`);return n[e]}))},s=(s,n)=>{Promise.all(s.map(e)).then((e=>n(1===e.length?e[0]:e)))},n={require:Promise.resolve(s)};self.define=(s,r,i)=>{n[s]||(n[s]=Promise.resolve().then((()=>{let n={};const a={uri:location.origin+s.slice(1)};return Promise.all(r.map((s=>{switch(s){case"exports":return n;case"module":return a;default:return e(s)}}))).then((e=>{const s=i(...e);return n.default||(n.default=s),n}))})))}}define("./sw.js",["./workbox-ea903bce"],(function(e){"use strict";importScripts("fallback-m4F5ZppBnVpipPWtTHwf4.js"),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/MoriiUta.png",revision:"46d94eeb971bf2e602104494e0be47db"},{url:"/_next/static/chunks/164-63aa0881afc9fa2ce731.js",revision:"m4F5ZppBnVpipPWtTHwf4"},{url:"/_next/static/chunks/312-d285cdd0d9c04b9596d9.js",revision:"m4F5ZppBnVpipPWtTHwf4"},{url:"/_next/static/chunks/395-2207a7f8f1e26754993d.js",revision:"m4F5ZppBnVpipPWtTHwf4"},{url:"/_next/static/chunks/675-68bc35d0bd8a52e2a5b7.js",revision:"m4F5ZppBnVpipPWtTHwf4"},{url:"/_next/static/chunks/framework-92300432a1172ef1338b.js",revision:"m4F5ZppBnVpipPWtTHwf4"},{url:"/_next/static/chunks/main-b449f89ec2fd6b0ffe72.js",revision:"m4F5ZppBnVpipPWtTHwf4"},{url:"/_next/static/chunks/pages/_app-a2e18e2a3b95e4863b8d.js",revision:"m4F5ZppBnVpipPWtTHwf4"},{url:"/_next/static/chunks/pages/_error-9faf4177fb4e528b4124.js",revision:"m4F5ZppBnVpipPWtTHwf4"},{url:"/_next/static/chunks/pages/_offline-0f298f52cb1aac6bf420.js",revision:"m4F5ZppBnVpipPWtTHwf4"},{url:"/_next/static/chunks/pages/index-dcab506feeb414ba89d5.js",revision:"m4F5ZppBnVpipPWtTHwf4"},{url:"/_next/static/chunks/pages/items/%5Bid%5D-b24a53b381ebc0a88963.js",revision:"m4F5ZppBnVpipPWtTHwf4"},{url:"/_next/static/chunks/pages/login-e730498fdf6e819d2871.js",revision:"m4F5ZppBnVpipPWtTHwf4"},{url:"/_next/static/chunks/pages/profile-dd04b2cb81d0e41293a5.js",revision:"m4F5ZppBnVpipPWtTHwf4"},{url:"/_next/static/chunks/pages/signup-99f9cec355c36de68abe.js",revision:"m4F5ZppBnVpipPWtTHwf4"},{url:"/_next/static/chunks/pages/uploaditem-4c8de3676e865b8b349c.js",revision:"m4F5ZppBnVpipPWtTHwf4"},{url:"/_next/static/chunks/polyfills-a54b4f32bdc1ef890ddd.js",revision:"m4F5ZppBnVpipPWtTHwf4"},{url:"/_next/static/chunks/webpack-61095c13c5984b221292.js",revision:"m4F5ZppBnVpipPWtTHwf4"},{url:"/_next/static/css/3e16ffea79729426ff2b.css",revision:"m4F5ZppBnVpipPWtTHwf4"},{url:"/_next/static/css/836d4c7d3056cd3529a4.css",revision:"m4F5ZppBnVpipPWtTHwf4"},{url:"/_next/static/m4F5ZppBnVpipPWtTHwf4/_buildManifest.js",revision:"m4F5ZppBnVpipPWtTHwf4"},{url:"/_next/static/m4F5ZppBnVpipPWtTHwf4/_ssgManifest.js",revision:"m4F5ZppBnVpipPWtTHwf4"},{url:"/_next/static/media/ajax-loader.fb6f3c230cb846e25247dfaa1da94d8f.gif",revision:"m4F5ZppBnVpipPWtTHwf4"},{url:"/_next/static/media/slick.2630a3e3eab21c607e21576571b95b9d.svg",revision:"m4F5ZppBnVpipPWtTHwf4"},{url:"/_next/static/media/slick.295183786cd8a138986521d9f388a286.woff",revision:"m4F5ZppBnVpipPWtTHwf4"},{url:"/_next/static/media/slick.a4e97f5a2a64f0ab132323fbeb33ae29.eot",revision:"m4F5ZppBnVpipPWtTHwf4"},{url:"/_next/static/media/slick.c94f7671dcc99dce43e22a89f486f7c2.ttf",revision:"m4F5ZppBnVpipPWtTHwf4"},{url:"/_offline",revision:"m4F5ZppBnVpipPWtTHwf4"},{url:"/assets/icons/circleacc.svg",revision:"4e2c165e54e0c01fa4517e922892aa4d"},{url:"/assets/icons/hand-with-box.svg",revision:"8cfa466a04b08f7a23664c17e017f917"},{url:"/assets/icons/handpackage.svg",revision:"55be23aaec987027a1fbd58d811ba518"},{url:"/assets/icons/home-solid.svg",revision:"fa2c07daf87d1ec998638f37e1412080"},{url:"/assets/icons/home.svg",revision:"e23ac331fdb005ca578d072974378bea"},{url:"/assets/icons/inventory.svg",revision:"edaf94df658eee4e7088b5a91b2e1d9d"},{url:"/assets/icons/share.svg",revision:"c9fbf7cb00dea1aca7b5e5521c2953c9"},{url:"/assets/images/items/1626794674195Artboard – 2.png",revision:"a51cc4a5a1a4d7480ef821830f2c775e"},{url:"/favicon.ico",revision:"c92b85a5b907c70211f4ec25e29a8c4a"},{url:"/logo192.png",revision:"33dbdd0177549353eeeb785d02c294af"},{url:"/logo512.png",revision:"917515db74ea8d1aee6a246cfbcc0b45"},{url:"/manifest.json",revision:"adca13a37ed4b90428c0e95a675f2c8e"},{url:"/robots.txt",revision:"fa1ded1ed7c11438a9b0385b1e112850"},{url:"/service-worker.js",revision:"f032d58f80cc0131b98aedb8bfe7e34e"},{url:"/unnamed.png",revision:"3fdaf184008962e392bee429f29daa6b"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:n,state:r})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s},{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[{handlerDidError:async({request:e})=>self.fallback(e)},new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[{handlerDidError:async({request:e})=>self.fallback(e)},new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[{handlerDidError:async({request:e})=>self.fallback(e)},new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[{handlerDidError:async({request:e})=>self.fallback(e)},new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[{handlerDidError:async({request:e})=>self.fallback(e)},new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:mp3|mp4)$/i,new e.StaleWhileRevalidate({cacheName:"static-media-assets",plugins:[{handlerDidError:async({request:e})=>self.fallback(e)},new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[{handlerDidError:async({request:e})=>self.fallback(e)},new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[{handlerDidError:async({request:e})=>self.fallback(e)},new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[{handlerDidError:async({request:e})=>self.fallback(e)},new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[{handlerDidError:async({request:e})=>self.fallback(e)},new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[{handlerDidError:async({request:e})=>self.fallback(e)},new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[{handlerDidError:async({request:e})=>self.fallback(e)},new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[{handlerDidError:async({request:e})=>self.fallback(e)},new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600,purgeOnQuotaError:!0})]}),"GET")}));
=======
/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  const singleRequire = name => {
    if (name !== 'require') {
      name = name + '.js';
    }
    let promise = Promise.resolve();
    if (!registry[name]) {
      
        promise = new Promise(async resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = name;
            document.head.appendChild(script);
            script.onload = resolve;
          } else {
            importScripts(name);
            resolve();
          }
        });
      
    }
    return promise.then(() => {
      if (!registry[name]) {
        throw new Error(`Module ${name} didn’t register its module`);
      }
      return registry[name];
    });
  };

  const require = (names, resolve) => {
    Promise.all(names.map(singleRequire))
      .then(modules => resolve(modules.length === 1 ? modules[0] : modules));
  };
  
  const registry = {
    require: Promise.resolve(require)
  };

  self.define = (moduleName, depsNames, factory) => {
    if (registry[moduleName]) {
      // Module is already loading or loaded.
      return;
    }
    registry[moduleName] = Promise.resolve().then(() => {
      let exports = {};
      const module = {
        uri: location.origin + moduleName.slice(1)
      };
      return Promise.all(
        depsNames.map(depName => {
          switch(depName) {
            case "exports":
              return exports;
            case "module":
              return module;
            default:
              return singleRequire(depName);
          }
        })
      ).then(deps => {
        const facValue = factory(...deps);
        if(!exports.default) {
          exports.default = facValue;
        }
        return exports;
      });
    });
  };
}
define("./sw.js",['./workbox-6b19f60b'], function (workbox) { 'use strict';

  /**
  * Welcome to your Workbox-powered service worker!
  *
  * You'll need to register this file in your web app.
  * See https://goo.gl/nhQhGp
  *
  * The rest of the code is auto-generated. Please don't update this file
  * directly; instead, make changes to your Workbox build configuration
  * and re-run your build process.
  * See https://goo.gl/2aRDsh
  */

  importScripts("fallback-development.js");
  self.skipWaiting();
  workbox.clientsClaim();
  workbox.registerRoute("/", new workbox.NetworkFirst({
    "cacheName": "start-url",
    plugins: [{
      cacheWillUpdate: async ({
        request,
        response,
        event,
        state
      }) => {
        if (response && response.type === 'opaqueredirect') {
          return new Response(response.body, {
            status: 200,
            statusText: 'OK',
            headers: response.headers
          });
        }

        return response;
      }
    }, {
      handlerDidError: async ({
        request
      }) => self.fallback(request)
    }]
  }), 'GET');
  workbox.registerRoute(/.*/i, new workbox.NetworkOnly({
    "cacheName": "dev",
    plugins: [{
      handlerDidError: async ({
        request
      }) => self.fallback(request)
    }]
  }), 'GET');

});
//# sourceMappingURL=sw.js.map
>>>>>>> 5a86c914f2b2fffd0706ad45fafd41b1dbb80304
