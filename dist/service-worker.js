if(!self.define){let e,s={};const i=(i,t)=>(i=new URL(i+".js",t).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(t,r)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(s[o])return;let n={};const d=e=>i(e,o),f={module:{uri:o},exports:n,require:d};s[o]=Promise.all(t.map((e=>f[e]||d(e)))).then((e=>(r(...e),n)))}}define(["./workbox-915e8d08"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"about.html",revision:"6a4dafbe54a4ffc8472719043231068b"},{url:"index.html",revision:"fd6520df084d7e984b2f33bfdefd5b1d"},{url:"main.js",revision:"d41d8cd98f00b204e9800998ecf8427e"},{url:"styles.css",revision:"a41e2b5c3f52236611c55a5140e399d8"}],{})}));
//# sourceMappingURL=service-worker.js.map
