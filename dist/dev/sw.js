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
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-5199072c'], (function (workbox) { 'use strict';

  self.skipWaiting();
  workbox.clientsClaim();

  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  workbox.precacheAndRoute([{
    "url": "assets/avatar-EB3heKtb.png",
    "revision": null
  }, {
    "url": "assets/default-BWJF8lQT.js",
    "revision": null
  }, {
    "url": "assets/index-0VXtmAo9.css",
    "revision": null
  }, {
    "url": "assets/index-BP8gXbPR.js",
    "revision": null
  }, {
    "url": "assets/index-ByLKSftM.js",
    "revision": null
  }, {
    "url": "assets/index-CWUT6KLr.css",
    "revision": null
  }, {
    "url": "assets/index-CyI2GcKh.css",
    "revision": null
  }, {
    "url": "assets/index-DY7ND6Im.js",
    "revision": null
  }, {
    "url": "assets/layout01-ac92lb6u.js",
    "revision": null
  }, {
    "url": "assets/workbox-window.prod.es5-B8JjyKVo.js",
    "revision": null
  }, {
    "url": "favicon.ico",
    "revision": "6383936a90261021312dfcf540081b99"
  }, {
    "url": "index.html",
    "revision": "9b31a73058c079df8e417a712f079cf3"
  }, {
    "url": "pwa/apple-startup-1024x1024.png",
    "revision": "46ae11dd4da51f6619d8ae55fea29bd1"
  }, {
    "url": "pwa/apple-touch-icon-114x114.png",
    "revision": "c29d2680c4af0deff43ec3140708ca1e"
  }, {
    "url": "pwa/apple-touch-icon-120x120.png",
    "revision": "c0d97c3d99aba9df10334acd84411e0a"
  }, {
    "url": "pwa/apple-touch-icon-144x144.png",
    "revision": "1351f5da6aa1ad8c68653ac172403271"
  }, {
    "url": "pwa/apple-touch-icon-152x152.png",
    "revision": "bf7ff5c28718b6a63f3a80ee80f3b872"
  }, {
    "url": "pwa/apple-touch-icon-180x180.png",
    "revision": "62420f56ca8e5ce37deaec2925357e73"
  }, {
    "url": "pwa/apple-touch-icon-57x57.png",
    "revision": "e4b285251c92e16501bad254325bf63c"
  }, {
    "url": "pwa/apple-touch-icon-60x60.png",
    "revision": "352c38fdfeab274839577c88cf280034"
  }, {
    "url": "pwa/apple-touch-icon-72x72.png",
    "revision": "7a7c2fedd126d96b31e52b55f5a332f4"
  }, {
    "url": "pwa/favicon-16x16.png",
    "revision": "c5f04f1288a6d658fbc241d7483d97bc"
  }, {
    "url": "pwa/favicon-32x32.png",
    "revision": "c89409717edeebd00a21cdc320e728d1"
  }, {
    "url": "pwa/pwa-180x180.png",
    "revision": "ebb84008339179dced908546673090e4"
  }, {
    "url": "pwa/pwa-192x192.png",
    "revision": "11964451e1bda0336f02a89ca48657a6"
  }, {
    "url": "pwa/pwa-512x512.png",
    "revision": "8542f086d1da68eb0f6a0e61f5f12aba"
  }, {
    "url": "pwa/pwa-64x64.png",
    "revision": "6383936a90261021312dfcf540081b99"
  }, {
    "url": "pwa/pwa-svg-16.svg",
    "revision": "e571b1c7ab446a39a78d76bbd939d449"
  }, {
    "url": "pwa/pwa-svg-24.svg",
    "revision": "ff35b3cceeb8eadebdb529d8b7f28200"
  }, {
    "url": "pwa/pwa-svg-32.svg",
    "revision": "ac6e473e84751d8da41ceee772765801"
  }, {
    "url": "pwa/pwa-svg-64.svg",
    "revision": "00b44c9975a367d589eb4150db23614b"
  }, {
    "url": "pwa/pwa-svg-64.svg",
    "revision": "00b44c9975a367d589eb4150db23614b"
  }, {
    "url": "pwa/pwa-svg-32.svg",
    "revision": "ac6e473e84751d8da41ceee772765801"
  }, {
    "url": "pwa/pwa-svg-24.svg",
    "revision": "ff35b3cceeb8eadebdb529d8b7f28200"
  }, {
    "url": "pwa/pwa-svg-16.svg",
    "revision": "e571b1c7ab446a39a78d76bbd939d449"
  }, {
    "url": "pwa/pwa-64x64.png",
    "revision": "6383936a90261021312dfcf540081b99"
  }, {
    "url": "pwa/pwa-192x192.png",
    "revision": "11964451e1bda0336f02a89ca48657a6"
  }, {
    "url": "pwa/pwa-512x512.png",
    "revision": "8542f086d1da68eb0f6a0e61f5f12aba"
  }, {
    "url": "pwa/apple-startup-1024x1024.png",
    "revision": "46ae11dd4da51f6619d8ae55fea29bd1"
  }, {
    "url": "manifest.webmanifest",
    "revision": "57a0b86f35bd5814d95b23e2ab8e67ef"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("index.html")));

}));
