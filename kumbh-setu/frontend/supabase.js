/**
 * Kumbh Setu — Supabase & Core API Initializer
 * Enables Supabase Auth, Cloud PostgreSQL, and dynamic API base endpoint for PC & Mobile APK
 */
(function() {
  const SUPABASE_URL = "https://asparwhkzpnnittnhsic.supabase.co";
  const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFzcGFyd2hrenBubml0dG5oc2ljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg2ODcyNTgsImV4cCI6MjEwNDI2MzI1OH0.toLmY3O-s1dwJg7yX9E4iAdPtzqG_Fj-UiU0Jb4R3Ik";

  // Dynamic API Host detection: Works seamlessly on localhost, 192.168.x.x LAN mobile, or APK WebView
  const host = window.location.hostname || "localhost";
  if (host === "localhost" || host === "127.0.0.1") {
    window.API_BASE_URL = "http://localhost:8000";
  } else if (host.startsWith("192.168.") || host.startsWith("10.") || host.startsWith("172.")) {
    window.API_BASE_URL = `http://${host}:8000`;
  } else {
    // Cloud / Production fallback or current origin
    window.API_BASE_URL = window.location.origin.includes(":3000") 
      ? window.location.origin.replace(":3000", ":8000") 
      : window.location.origin;
  }

  // Register Service Worker for Mobile PWA
  if ('serviceWorker' in navigator && window.location.protocol.startsWith('http')) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').catch(err => console.log('SW registration error:', err));
    });
  }

  if (window.supabase) {
    window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  } else {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";
    script.onload = function() {
      if (window.supabase) {
        window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        console.log("Kumbh Setu Supabase Client & API Initialized:", window.API_BASE_URL);
      }
    };
    document.head.appendChild(script);
  }
})();
