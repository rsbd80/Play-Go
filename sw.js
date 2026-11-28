
/* RsLive Go - Service Worker v66
   Fixed API Order + Fresh Config + Network First
*/

const CACHE_NAME = 'rslive-go-v66';

const CORE = [
  '/',
  '/index.html',
  '/app.js',
  '/player.html',
  '/manifest.json'
];

// INSTALL
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(CORE).catch(err => {
        console.warn('Core cache error:', err);
      }))
      .then(() => self.skipWaiting())
  );
});

// ACTIVATE
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.map(key => {
          if (key.startsWith('rslive') && key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      ))
      .then(() => self.clients.claim())
  );
});

// FETCH
self.addEventListener('fetch', (event) => {
  const request = event.request;

  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  const path = url.pathname;

  // 1. Playlist API - MUST CHECK BEFORE GENERAL CONFIG RULE
  if (path === '/api/playlists') {
    event.respondWith((async () => {
      try {
        const response = await fetch(
          'https://raw.githubusercontent.com/rsbd80/RsLive-Go/main/data/config.json?t=' + Date.now(),
          { cache: 'no-store' }
        );

        if (!response.ok) throw new Error('Config HTTP ' + response.status);

        const config = await response.json();
        const playlists = Array.isArray(config.playlists)
          ? config.playlists
          : [];

        return new Response(JSON.stringify(playlists), {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store'
          }
        });
      } catch (error) {
        console.error('Playlist API error:', error);

        return new Response(JSON.stringify([]), {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store'
          }
        });
      }
    })());

    return;
  }

  // 2. Always fresh: config, notifications, matches and GitHub raw
  if (
    path.includes('/config.json') ||
    path.includes('/notifications.json') ||
    path.includes('/matches') ||
    url.hostname === 'raw.githubusercontent.com'
  ) {
    event.respondWith(
      fetch(request, { cache: 'no-store' })
        .catch(() => caches.match(request))
    );
    return;
  }

  // 3. M3U / M3U8 / video - direct network
  if (
    path.endsWith('.m3u') ||
    path.endsWith('.m3u8') ||
    path.endsWith('.ts') ||
    path.includes('.m3u')
  ) {
    event.respondWith(fetch(request));
    return;
  }

  // 4. Main app files - Network First
  if (
    path.endsWith('/app.js') ||
    path.endsWith('/index.html') ||
    path === '/' ||
    path.endsWith('/player.html') ||
    path.endsWith('/manifest.json')
  ) {
    event.respondWith((async () => {
      try {
        const response = await fetch(request, { cache: 'no-store' });

        if (response && response.ok) {
          const cache = await caches.open(CACHE_NAME);
          cache.put(request, response.clone());
        }

        return response;
      } catch (error) {
        const cached = await caches.match(request);
        if (cached) return cached;

        return new Response('Offline - Please connect to the internet.', {
          status: 503,
          headers: { 'Content-Type': 'text/plain' }
        });
      }
    })());

    return;
  }

  // 5. Other requests - Network First, fallback to cache
  event.respondWith((async () => {
    try {
      return await fetch(request);
    } catch (error) {
      const cached = await caches.match(request);
      if (cached) return cached;
      throw error;
    }
  })());
});
