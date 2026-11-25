/* RsLive Go - Secure SW + PWA */
const CACHE_NAME = 'rslive-v3-pwa';
const CORE_ASSETS = ['/', '/index.html', '/player.html', '/manifest.json'];

const _P = [
  { n: 'Tapmad', u: 'aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3NtLW1vbmlydWxpc2xhbS9UYXBtYWRfQXV0b19VcGRhdGVfUGxheWxpc3QvcmVmcy9oZWFkcy9tYWluL3RhcG1hZF9zbS5tM3U=', p: 0 },
  { n: 'Sports', u: 'aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2phbm5hdHVsYnVzcmEwMDAvU3BvcnRzLVBsYXlsaXN0L3JlZnMvaGVhZHMvbWFpbi9zcG9ydHMubTN1', p: 1 },
  { n: 'Toffee', u: 'aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3NtLW1vbmlydWxpc2xhbS9Ub2ZmZWUtQXV0by1VcGRhdGUvcmVmcy9oZWFkcy9tYWluL3RvZmZlZV9wbGF5bGlzdC5tM3U=', p: 1 },
  { n: 'AynaOTT', u: 'aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3NtLW1vbmlydWxpc2xhbS9BeW5hT1RUX0F1dG9fVXBkYXRlX1BsYXlsaXN0L3JlZnMvaGVhZHMvbWFpbi9heW5hb3R0Lm0zdQ==', p: 0 },
  { n: 'JagoBD', u: 'aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3NtLW1vbmlydWxpc2xhbS9qYWdvX2JkX2F1dG9fdXBkYXRlX3BsYXlsaXN0LS9yZWZzL2hlYWRzL21haW4vamFnb19iZF9tYWluLm0zdQ==', p: 0 },
  { n: 'Bangladesh', u: 'aHR0cHM6Ly9pcHR2LW9yZy5naXRodWIuaW8vaXB0di9jb3VudHJpZXMvYmQubTN1', p: 0 },
  { n: 'India', u: 'aHR0cHM6Ly9pcHR2LW9yZy5naXRodWIuaW8vaXB0di9jb3VudHJpZXMvaW4ubTN1', p: 0 }
];
function _d(s){ try{ return atob(s); }catch(e){ return ''; } }

self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(CORE_ASSETS).catch(()=>{})));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch', event => {
  const req = event.request;
  const url = new URL(req.url);
  if(url.pathname.endsWith('/api/playlists')){
    const data = _P.map(x => ({ name: x.n, url: _d(x.u), useProxy: x.p===1 }));
    event.respondWith(new Response(JSON.stringify(data), { headers: {'Content-Type':'application/json'} }));
    return;
  }
  if(req.method !== 'GET') return;
  if(url.pathname.endsWith('.m3u8') || url.pathname.endsWith('.ts') || url.pathname.includes('/api/')) return;
  event.respondWith(
    fetch(req).then(res => {
      if(res && res.status===200 && res.type==='basic'){
        const cl = res.clone();
        caches.open(CACHE_NAME).then(c=>c.put(req, cl).catch(()=>{}));
      }
      return res;
    }).catch(()=> caches.match(req).then(c=> c || caches.match('/index.html')))
  );
});
self.addEventListener('message', e => { if(e.data && e.data.type==='SKIP_WAITING') self.skipWaiting(); });
