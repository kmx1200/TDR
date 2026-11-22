const V='repos-v20',F=['./','index.html','rules.js','vendor/jspdf.umd.min.js','manifest.webmanifest','icons/icon-192.png','icons/icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(F.map(u=>new Request(u,{cache:'reload'})))));self.skipWaiting()});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=V).map(x=>caches.delete(x)))).then(()=>clients.claim())));
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!='GET')return;const p=new URL(r.url).pathname.endsWith('personnel.json');
  e.respondWith(fetch(r,{cache:p?'reload':'no-cache'}).then(x=>{if(x.ok){const c=x.clone();caches.open(V).then(k=>k.put(p?'personnel.json':r,c))}return x}).catch(()=>caches.match(p?'personnel.json':r)))});
