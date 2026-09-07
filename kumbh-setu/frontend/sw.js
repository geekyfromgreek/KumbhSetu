const CACHE_NAME = 'kumbhsetu-v2';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/yatri_home.html',
  '/marketplace.html',
  '/listing_detail.html',
  '/fare_board.html',
  '/guide_detail.html',
  '/bookings_queue.html',
  '/police_escalations.html',
  '/kumbhveer_portal.html',
  '/marketplace_management.html',
  '/food_finder.html',
  '/emergency_sos.html',
  '/nashikkar_login.html',
  '/nashikkar_overview.html',
  '/report_issue.html',
  '/price_flags.html',
  '/i18n.js',
  '/supabase.js',
  '/supabase_realtime.js',
  '/api_config.js',
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
            console.log('[SW] Clearing old cache:', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const url = event.request.url;

  // Pass-through for external API calls, Supabase, Render backend, and non-GET requests
  if (
    url.includes('supabase.co') ||
    url.includes('onrender.com') ||
    url.includes('/api/') ||
    url.includes(':8000') ||
    event.request.method !== 'GET'
  ) {
    return;
  }

  // Network-first strategy with cache fallback (prevents stale redirect errors)
  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
        }
        return networkResponse;
      })
      .catch(() => {
        return caches.match(event.request).then((cached) => {
          if (cached) return cached;
          // Fallback for navigation requests
          if (event.request.mode === 'navigate') {
            return caches.match(event.request.url) || caches.match('/index.html');
          }
        });
      })
  );
});
