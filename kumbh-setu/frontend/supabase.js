/**
 * Kumbh Setu — Supabase & Core API Initializer
 * Enables Supabase Auth, Cloud PostgreSQL, and dynamic API base endpoint for PC & Mobile APK
 *
 * Exposes window._supabaseReady — a Promise that resolves to the supabaseClient
 * once the CDN is loaded and the client is created. Other scripts (e.g. supabase_realtime.js)
 * should await this promise instead of checking window.supabaseClient synchronously.
 */
(function() {
  const SUPABASE_URL = "https://asparwhkzpnnittnhsic.supabase.co";
  const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFzcGFyd2hrenBubml0dG5oc2ljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg2ODcyNTgsImV4cCI6MjEwNDI2MzI1OH0.toLmY3O-s1dwJg7yX9E4iAdPtzqG_Fj-UiU0Jb4R3Ik";

  // Dynamic API Host detection: Works seamlessly on localhost, Vercel, LAN mobile, or APK WebView
  const host = window.location.hostname || "localhost";
  const proto = window.location.protocol === 'https:' ? 'https:' : 'http:';
  if (host.includes('vercel.app') || host.includes('render.com') || (proto === 'https:' && !host.match(/^(localhost|127\.0\.0\.1|192\.168\.|10\.|172\.)/))) {
    window.API_BASE_URL = "";
  } else if (host === "localhost" || host === "127.0.0.1") {
    window.API_BASE_URL = "http://localhost:8000";
  } else if (host) {
    window.API_BASE_URL = `${proto}//${host}:8000`;
  } else {
    window.API_BASE_URL = "";
  }
  window.API_BASE = window.API_BASE_URL;

  // Safe universal URL resolver
  window.getApiUrl = function(endpointPath) {
    const base = (window.API_BASE_URL || '').replace(/\/+$/, '');
    const cleanPath = endpointPath.startsWith('/') ? endpointPath : '/' + endpointPath;
    if (base.endsWith('/api') && cleanPath.startsWith('/api/')) {
      return base + cleanPath.slice(4);
    }
    return base + cleanPath;
  };

  // Register Service Worker for Mobile PWA
  if ('serviceWorker' in navigator && window.location.protocol.startsWith('http')) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').catch(err => console.log('SW registration error:', err));
    });
  }

  // ── Supabase Client Initialization (Promise-based, race-condition-safe) ───
  function createClient() {
    if (!window.supabase) return null;
    try {
      const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
      window.supabaseClient = client;
      console.log("Kumbh Setu Supabase Client & API Initialized:", window.API_BASE_URL);
      return client;
    } catch (e) {
      console.warn("[KumbhSetu] Supabase client creation error:", e);
      return null;
    }
  }

  // If CDN was loaded before this script (e.g. via explicit <script> tag in HTML), init immediately
  if (window.supabase) {
    const client = createClient();
    window._supabaseReady = Promise.resolve(client);
  } else {
    // Load CDN dynamically and expose a Promise that resolves when client is ready
    window._supabaseReady = new Promise(function(resolve) {
      var script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";
      script.onload = function() {
        resolve(createClient());
      };
      script.onerror = function() {
        console.warn("[KumbhSetu] Failed to load Supabase CDN — running in API-only mode");
        resolve(null);
      };
      document.head.appendChild(script);
    });
  }
})();
