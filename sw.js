/* RsLive Go - Secure SW + PWA + Per Playlist Proxy + Auto Sports Data - FINAL v66 */
const CACHE_NAME = 'rslive-v66-pwa';
const CORE_ASSETS = ['/', '/index.html', '/player.html', '/manifest.json'];
const PROXY_BASE = 'https://stream-through-spark.lovable.app/api/proxy?u=';
const SPORTS_DATA_URL = 'https://raw.githubusercontent.com/sm-monirulislam/Upcoming-and-Live-Sports-Data/refs/heads/main/Sports_data.json';

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

// ===== Sports_data.json Normalize - সব ফরম্যাট হ্যান্ডেল করবে =====
function _normalizeSports(raw){
  const arr = Array.isArray(raw) ? raw : (raw.matches || raw.data || raw.events || raw.upcoming || raw.live || raw.channels || []);
  if(!Array.isArray(arr)) return [];
  return arr.map(m=>{
    if(!m || typeof m !== 'object') return null;
    const title = m.match || m.title || m.name || m.event || m.fixture || '';
    const teamA = m.team1 || m.teamA || m.home_team || m.home || (Array.isArray(m.teams) ? m.teams[0] : '') || '';
    const teamB = m.team2 || m.teamB || m.away_team || m.away || (Array.isArray(m.teams) ? m.teams[1] : '') || '';
    const name = title || (teamA && teamB ? teamA + ' vs ' + teamB : '');
    if(!name) return null;
    let tA = teamA, tB = teamB;
    if(!tA && name.includes(' vs ')){ const p = name.split(' vs '); tA = p[0].trim(); tB = p[1].trim(); }
    const startRaw = m.start_time || m.start || m.date || m.time || m.startTime || m.match_time || '';
    const endRaw = m.end_time || m.end || m.endTime || '';
    const start = startRaw ? new Date(startRaw).toISOString() : new Date().toISOString();
    const end = endRaw ? new Date(endRaw).toISOString() : new Date(new Date(start).getTime() + 4*3600000).toISOString();
    return {
      name: name,
      teamA: tA || name,
      teamB: tB || '',
      teamALogo: m.team1_logo || m.teamA_logo || m.home_logo || m.logo1 || m.image1 || '',
      teamBLogo: m.team2_logo || m.teamB_logo || m.away_logo || m.logo2 || m.image2 || '',
      matchType: m.tournament || m.category || m.sport || m.league || m.matchType || 'Cricket',
      category: m.category || m.sport || 'Cricket',
      startTime: start, endTime: end, start: start, end: end,
      url: m.stream_url || m.url || m.link || m.stream || m.live_url || '',
      streams: [{ stream_url: m.stream_url || m.url || m.link || '' }],
      status: (m.status || '').toLowerCase(),
      isAuto: true,
      // চ্যানেল কার্ডের জন্য - শুধু Upcoming / Live কার্ডে ইউজ হবে
      cardType: 'upcoming_live'
    };
  }).filter(Boolean);
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

  // ===== 1. Playlist API - আগেরটাই, চেঞ্জ নাই =====
  if(url.pathname.endsWith('/api/playlists')){
    const data = _P.map(x => {
      const raw = _d(x.u);
      return { name: x.n, url: _proxy(raw, x.n), rawUrl: raw, useProxy: !!PROXY_MAP[x.n] };
    });
    event.respondWith(new Response(JSON.stringify(data), { headers: {'Content-Type':'application/json'} }));
    return;
  }

  // ===== 2. NEW - Sports Data API - শুধু Upcoming / Live কার্ডের জন্য =====
  // index.html থেকে fetch('/api/sports_data') করলেই এইটা চলবে
  if(url.pathname.endsWith('/api/sports_data') || url.pathname.endsWith('/api/auto_matches') || url.pathname.endsWith('/api/upcoming')){
    event.respondWith(
      fetch(SPORTS_DATA_URL + '?t=' + Date.now()).then(async res => {
        const raw = await res.json();
        const normalized = _normalizeSports(raw);
        // Cache এও রাখলাম, নেট না থাকলে পুরোনোটা দেখাবে
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

  // ===== 3. Direct Sports_data.json - কখনো পুরোনো Cache দিবে না, Network First =====
  if(url.href.includes('Sports_data.json') || url.href.includes('Upcoming-and-Live-Sports-Data')){
    event.respondWith(fetch(req).then(res => res).catch(()=> caches.match(req)));
    return;
  }

  // ===== 4. config.json - কখনো Cache না, Notice এর ফিক্স =====
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
  if(e.data.type==='SET_PROXY_ALL'){
    PROXY_MAP = { ...PROXY_MAP, ...e.data.map };
  }
  if(e.data.type==='GET_PROXY_MAP'){
    e.ports[0]?.postMessage({ map: PROXY_MAP });
  }
  // NEW - Sports Data Refresh
  if(e.data.type==='REFRESH_SPORTS'){
    caches.delete(CACHE_NAME).then(()=> self.clients.claim());
  }
});
