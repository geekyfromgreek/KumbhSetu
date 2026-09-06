const CACHE_NAME = 'kumbhsetu-v1';
const STATIC_ASSETS = [
  '/',
  '/yatri_home.html',
  '/marketplace.html',
  '/listing_detail.html',
  '/fare_board.html',
  '/guide_detail.html',
  '/food_finder.html',
  '/emergency_sos.html',
  '/nashikkar_login.html',
  '/nashikkar_overview.html',
  '/report_issue.html',
  '/i18n.js',
  '/supabase.js',
  '/manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch((err) => {
        console.warn('PWA Pre-cache skipped some dynamic routes:', err);
      });
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Pass-through for external API calls and Supabase
  if (event.request.url.includes('supabase.co') || event.request.url.includes(':8000') || event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // Fetch in background to update cache
        fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, networkResponse));
          }
        }).catch(() => {});
        return cachedResponse;
      }
      return fetch(event.request).catch(() => caches.match('/yatri_home.html'));
    })
  );
});
