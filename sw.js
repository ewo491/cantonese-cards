// Bump this name (v2, v3...) if you ever need to force everyone to refresh the cache
const CACHE = 'canto-v1';

// Files to save for offline use. Add './deck.csv' here if you use a separate deck file
const FILES = ['./', './index.html'];

// Install: save the files to the phone
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)));
  self.skipWaiting();
});

// Activate: delete old caches from previous versions
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Every request: serve the saved copy instantly, and quietly refresh it from the network
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  if (new URL(e.request.url).origin !== location.origin) return;  // ignore other sites

  e.respondWith(
    caches.match(e.request).then(cached => {
      const network = fetch(e.request)
        .then(res => {
          if (res.ok) {
            const copy = res.clone();
            caches.open(CACHE).then(c => c.put(e.request, copy));
          }
          return res;
        })
        .catch(() => cached);          // offline: fall back to the saved copy
      return cached || network;
    })
  );
});