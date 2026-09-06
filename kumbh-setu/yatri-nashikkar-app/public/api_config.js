/**
 * Kumbh Setu — Universal API & Mobile Network Resolver
 * Dynamically resolves backend API base URL across:
 * - Localhost (laptop / dev)
 * - Smartphone browser accessing via LAN IP (e.g. 192.168.x.x, 10.x.x.x, 172.x.x.x)
 * - Production cloud domains
 * - WebView / Cordova / Capacitor APKs
 */
(function() {
  function getApiBaseUrl() {
    const loc = window.location;
    const host = loc.hostname || 'localhost';
    const protocol = loc.protocol === 'https:' ? 'https:' : 'http:';

    // When accessed from a phone via LAN IP or hostname, connect to laptop's port 8000
    if (host && host !== 'localhost' && host !== '127.0.0.1') {
      return `${protocol}//${host}:8000`;
    }

    return 'http://localhost:8000';
  }

  window.API_BASE_URL = getApiBaseUrl();
  window.API_BASE = window.API_BASE_URL;
  console.log('[KumbhSetu] Initialized API Base URL:', window.API_BASE_URL);
})();
