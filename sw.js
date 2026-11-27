/* RsLive Go - Secure SW + PWA + Per Playlist Proxy - FINAL v23 */
const CACHE_NAME = 'rslive-v6-pwa';
const CORE_ASSETS = ['/', '/index.html', '/player.html', '/manifest.json'];
const PROXY_BASE = 'https://stream-through-spark.lovable.app/api/proxy?u=';

/* 👇 Proxy কন্ট্রোল শুধু এখান থেকে - Developer Only */
let PROXY_MAP = {
  'Tapmad': false,
  'Sports': true,
  'Toffee': true,
  'AynaOTT': false,
  'JagoBD': false,
  'Bangladesh': false,
  'India': false
};

const _P = [
  { n: 'Tapmad', u: 'aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3NtLW1vbmlydWxpc2xhbS9UYXBtYWRfQXV0b19VcGRhdGVfUGxheWxpc3QvcmVmcy9oZWFkcy9tYWluL3RhcG1hZF9zbS5tM3U=', p: 0 },
  { n: 'Sports', u: 'aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2phbm5hdHVsYnVzcmEwMDAvU3BvcnRzLVBsYXlsaXN0L3JlZnMvaGVhZHMvbWFpbi9zcG9ydHMubTN1', p: 1 },
  { n: 'Toffee', u: 'aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3NtLW1vbmlydWxpc2xhbS9Ub2ZmZWUtQXV0by1VcGRhdGUvcmVmcy9oZWFkcy9tYWluL3RvZmZlZV9wbGF5bGlzdC5tM3U=', p: 1 },
  { n: 'AynaOTT', u: 'aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3NtLW1vbmlydWxpc2xhbS9BeW5hT1RUX0F1dG9fVXBkYXRlX1BsYXlsaXN0L3JlZnMvaGVhZHMvbWFpbi9heW5hb3R0Lm0zdQ==', p: 0 },
  { n: 'JagoBD', u: 'aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3NtLW1vbmlydWxpc2xhbS9qYWdvX2JkX2F1dG9fdXBkYXRlX3BsYXlsaXN0LS9yZWZzL2hlYWRzL21haW4vamFnb19iZF9tYWluLm0zdQ==', p: 0 },
  { n: 'Bangladesh', u: 'aHR0cHM6Ly9pcHR2LW9yZy5naXRodWIuaW8vaXB0di9jb3VudHJpZXMvYmQubTN1', p: 0 },
  { n: 'India', u: 'aHR0cHM6Ly9pcHR2LW9yZy5naXRodWIuaW8vaXB0di9jb3VudHJpZXMvaW4ubTN1', p: 0 }
];

function _d(s){
  if(!s) return '';
  if(s.startsWith('http')) return s;
  try{ return atob(s); }catch(e){ return s; }
}
function _proxy(url, name){
  if(PROXY_MAP[name]) return PROXY_BASE + encodeURIComponent(url);
  return url;
}

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
    const data = _P.map(x => {
      const raw = _d(x.u);
      return { name: x.n, url: _proxy(raw, x.n), rawUrl: raw, useProxy: !!PROXY_MAP[x.n] };
    });
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
self.addEventListener('message', e => {
  if(!e.data) return;
  if(e.data.type==='SKIP_WAITING') self.skipWaiting();
  if(e.data.type==='SET_PROXY_ONE'){
    PROXY_MAP[e.data.name] = !!e.data.enabled;
    self.clients.matchAll().then(cs => cs.forEach(c => c.postMessage({ type:'PROXY_UPDATED', map: PROXY_MAP })));
  }
  if(e.data.type==='SET_PROXY_ALL'){
    PROXY_MAP = { ...PROXY_MAP, ...e.data.map };
  }
  if(e.data.type==='GET_PROXY_MAP'){
    e.ports[0]?.postMessage({ map: PROXY_MAP });
  }
});
