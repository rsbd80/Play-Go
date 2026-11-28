/* RsLive Go - Secure SW + PWA + Per Playlist Proxy + Auto Sports Data - FINAL v67 */
const CACHE_NAME = 'rslive-v67-pwa';
const CORE_ASSETS = ['/', '/index.html', '/player.html', '/manifest.json'];
const PROXY_BASE = 'https://stream-through-spark.lovable.app/api/proxy?u=';
const SPORTS_DATA_URL = 'https://raw.githubusercontent.com/sm-monirulislam/Upcoming-and-Live-Sports-Data/refs/heads/main/Sports_data.json';
let PROXY_MAP = { 'Tapmad': false, 'Sports': true, 'Toffee': true, 'AynaOTT': false, 'JagoBD': false, 'Bangladesh': false, 'India': false };
const _P = [
  { n: 'Tapmad', u: 'aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3NtLW1vbmlydWxpc2xhbS9UYXBtYWRfQXV0b19VcGRhdGVfUGxheWxpc3QvcmVmcy9oZWFkcy9tYWluL3RhcG1hZF9zbS5tM3U=', p: 0 },
  { n: 'Sports', u: 'aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2phbm5hdHVsYnVzcmEwMDAvU3BvcnRzLVBsYXlsaXN0L3JlZnMvaGVhZHMvbWFpbi9zcG9ydHMubTN1', p: 1 },
  { n: 'Toffee', u: 'aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3NtLW1vbmlydWxpc2xhbS9Ub2ZmZWUtQXV0by1VcGRhdGUvcmVmcy9oZWFkcy9tYWluL3RvZmZlZV9wbGF5bGlzdC5tM3U=', p: 1 },
  { n: 'AynaOTT', u: 'aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3NtLW1vbmlydWxpc2xhbS9BeW5hT1RUX0F1dG9fVXBkYXRlX1BsYXlsaXN0L3JlZnMvaGVhZHMvbWFpbi9heW5hb3R0Lm0zdQ==', p: 0 },
  { n: 'JagoBD', u: 'aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3NtLW1vbmlydWxpc2xhbS9qYWdvX2JkX2F1dG9fdXBkYXRlX3BsYXlsaXN0LS9yZWZzL2hlYWRzL21haW4vamFnb19iZF9tYWluLm0zdQ==', p: 0 },
  { n: 'Bangladesh', u: 'aHR0cHM6Ly9pcHR2LW9yZy5naXRodWIuaW8vaXB0di9jb3VudHJpZXMvYmQubTN1', p: 0 },
  { n: 'India', u: 'aHR0cHM6Ly9pcHR2LW9yZy5naXRodWIuaW8vaXB0di9jb3VudHJpZXMvaW4ubTN1', p: 0 }
];
function _d(s){ if(!s) return ''; if(s.startsWith('http')) return s; try{ return atob(s); }catch(e){ return s; } }
function _proxy(url, name){ if(PROXY_MAP[name]) return PROXY_BASE + encodeURIComponent(url); return url; }
// ===== v67 - Sports_data আসল ফরম্যাট: eventInfo + Category + DD/MM/YYYY =====
function _parseTime(s){
  if(!s) return '';
  s=String(s).trim();
  const mm=s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})\s+(\d{1,2}):(\d{2})(?::(\d{2}))?\s*(AM|PM)?$/i);
  if(mm){
    let d=+mm[1],mo=+mm[2]-1,y=+mm[3],h=+mm[4],mi=+mm[5],sec=+mm[6]||0;
    const ap=(mm[7]||'').toUpperCase();
    if(ap==='PM'&&h<12) h+=12; if(ap==='AM'&&h===12) h=0;
    return new Date(y,mo,d,h,mi,sec).toISOString();
  }
  try{ return new Date(s.replace(' ','T')).toISOString(); }catch(e){ return ''; }
}
function _normalizeSports(raw){
  const list = Array.isArray(raw) ? raw : (raw.matches || raw.data || []);
  return list.map(m=>{
    const info = m.eventInfo || {};
    const st = _parseTime(info.startTime || m.startTime || m.start || '');
    const name = m.event_name || info.eventName || m.name || '';
    const good = (m.streams||[]).find(s=> s && s.stream_url && String(s.stream_url).trim());
    return {
      name, teamA: info.teamA||'', teamB: info.teamB||'',
      teamALogo: info.teamAFlag||'', teamBLogo: info.teamBFlag||'',
      matchType: m.Category||m.category||'Cricket', category: m.Category||m.category||'Cricket',
      startTime: st||new Date().toISOString(),
      endTime: new Date(new Date(st||Date.now()).getTime()+4*3600000).toISOString(),
      url: good?good.stream_url:'', streams: (m.streams||[]).filter(s=>s.stream_url),
      status: String(m.status||'').toUpperCase(), isAuto: true
    };
  }).filter(x=>x.name);
}
self.addEventListener('install', e => { self.skipWaiting(); e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(CORE_ASSETS).catch(()=>{}))); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))).then(()=>self.clients.claim())); });
self.addEventListener('fetch', event => {
  const req = event.request;
  const url = new URL(req.url);
  if(url.pathname.endsWith('/api/playlists')){
    const data = _P.map(x => { const raw = _d(x.u); return { name: x.n, url: _proxy(raw, x.n), rawUrl: raw, useProxy: !!PROXY_MAP[x.n] }; });
    event.respondWith(new Response(JSON.stringify(data), { headers: {'Content-Type':'application/json'} }));
    return;
  }
  if(url.pathname.endsWith('/api/sports_data') || url.pathname.endsWith('/api/auto_matches') || url.pathname.endsWith('/api/upcoming')){
    event.respondWith(
      fetch(SPORTS_DATA_URL + '?t=' + Date.now()).then(async res => {
        const raw = await res.json();
        const normalized = _normalizeSports(raw);
        const cache = await caches.open(CACHE_NAME);
        cache.put('/api/sports_data', new Response(JSON.stringify(normalized), { headers: {'Content-Type':'application/json'} }));
        return new Response(JSON.stringify(normalized), { headers: {'Content-Type':'application/json'} });
      }).catch(async () => {
        const cached = await caches.match('/api/sports_data');
        if(cached) return cached;
        return new Response(JSON.stringify([]), { headers: {'Content-Type':'application/json'} });
      })
    );
    return;
  }
  if(url.href.includes('Sports_data.json') || url.href.includes('Upcoming-and-Live-Sports-Data')){
    event.respondWith(fetch(req).then(res => res).catch(()=> caches.match(req)));
    return;
  }
  if(url.pathname.endsWith('config.json') || url.pathname.includes('/data/config')){
    event.respondWith(fetch(req).then(res => res).catch(()=> caches.match(req)));
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
  if(e.data.type==='SET_PROXY_ALL'){ PROXY_MAP = { ...PROXY_MAP, ...e.data.map }; }
  if(e.data.type==='GET_PROXY_MAP'){ e.ports[0]?.postMessage({ map: PROXY_MAP }); }
});
