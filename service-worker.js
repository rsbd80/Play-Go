/* =========================================================
   RS Live TV - Service Worker
   PWA + Offline Support + Screen Wake Lock Bridge
========================================================= */

const CACHE_NAME = 'rs-live-tv-v1.0.0';

const CORE_ASSETS = [
  '/',
  '/index.html',
  '/channel.html',
  '/style.css',
  '/bootstrap.min.css',
  '/manifest.json',
  '/settings.json'
];

/* ---------- INSTALL ---------- */
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(CORE_ASSETS).catch(() => {}))
  );
});

/* ---------- ACTIVATE ---------- */
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((k) => k !== CACHE_NAME)
            .map((k) => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

/* ---------- FETCH ---------- */
self.addEventListener('fetch', (event) => {
  const req = event.request;

  // শুধু GET request হ্যান্ডেল করি
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  // Live stream / m3u8 / API call গুলো ক্যাশ করব না
  if (
    url.pathname.endsWith('.m3u8') ||
    url.pathname.endsWith('.ts') ||
    url.pathname.includes('/api/') ||
    url.hostname.includes('aynaott') ||
    url.hostname.includes('ncare') ||
    url.hostname.includes('jagobd')
  ) {
    return; // browser default fetch ব্যবহার করবে
  }

  // Network-first (fresh content)
  event.respondWith(
    fetch(req)
      .then((res) => {
        // সফল হলে cache-এ রাখি
        if (res && res.status === 200 && res.type === 'basic') {
          const resClone = res.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(req, resClone).catch(() => {});
          });
        }
        return res;
      })
      .catch(() => caches.match(req).then((c) => c || caches.match('/index.html')))
  );
});

/* ---------- MESSAGE (Wake Lock bridge) ---------- */
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
