/* RsLive Go - sw.js v65 - MATCHES app.js v65 */
const CACHE_NAME = 'rslive-go-v65';
const CORE = [
  '/',
  '/index.html',
  '/app.js',
  '/player.html',
  '/manifest.json'
];

// Install - Core file cache করো
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(CORE).catch(()=>{}))
      .then(() => self.skipWaiting())
  );
});

// Activate - পুরানো Cache মুছে ফেলো, নাহলে পুরানো app.js চলবে
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((k) => {
          if (k !== CACHE_NAME && k.startsWith('rslive')) {
            return caches.delete(k);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch - আসল লজিক
self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);

  // 1. শুধু GET request handle করবো
  if (e.request.method !== 'GET') return;

  // 2. config.json / playlists / matches - কখনোই Cache থেকে দিবো না, সবসময় Fresh
  // এটাই Home / Categories না চলার আসল কারণ ছিলো
  if (
    url.pathname.includes('/config.json') ||
    url.pathname.includes('/notifications.json') ||
    url.pathname.includes('/matches') ||
    url.hostname === 'raw.githubusercontent.com' ||
    url.pathname.includes('/api/playlists')
  ) {
    e.respondWith(
      fetch(e.request, { cache: 'no-store' })
        .catch(() => caches.match(e.request))
    );
    return;
  }

  // 3. /api/playlists - GitHub config.json থেকে Playlist বানাও
  // app.js এ getPlaylistsFromSW() এইটা খোঁজে
  if (url.pathname === '/api/playlists') {
    e.respondWith(
      (async () => {
        try {
          const r = await fetch('https://raw.githubusercontent.com/rsbd80/RsLive-Go/main/data/config.json?t=' + Date.now(), { cache: 'no-store' });
          const cfg = await r.json();
          const list = Array.isArray(cfg.playlists) ? cfg.playlists : [];
          return new Response(JSON.stringify(list), {
            headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }
          });
        } catch (err) {
          return new Response(JSON.stringify([]), {
            headers: { 'Content-Type': 'application/json' }
          });
        }
      })()
    );
    return;
  }

  // 4. .m3u / .m3u8 / ভিডিও - কখনোই SW দিয়ে আটকাবো না, সরাসরি Network
  if (
    url.pathname.endsWith('.m3u') ||
    url.pathname.endsWith('.m3u8') ||
    url.pathname.endsWith('.ts') ||
    url.pathname.includes('.m3u')
  ) {
    e.respondWith(fetch(e.request));
    return;
  }

  // 5. app.js / index.html / player.html - Network First, না পেলে Cache
  // যাতে নতুন Update সাথে সাথে আসে
  if (
    url.pathname.endsWith('/app.js') ||
    url.pathname.endsWith('/index.html') ||
    url.pathname === '/' ||
    url.pathname.endsWith('/
