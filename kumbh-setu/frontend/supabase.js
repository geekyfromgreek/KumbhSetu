/**
 * Kumbh Setu — Supabase Client Initializer
 * Enables Supabase Auth (SMS OTP, Email, Anonymous) and Realtime Database Queries
 */
(function() {
  const SUPABASE_URL = "https://asparwhkzpnnittnhsic.supabase.co";
  const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFzcGFyd2hrenBubml0dG5oc2ljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg2ODcyNTgsImV4cCI6MjEwNDI2MzI1OH0.toLmY3O-s1dwJg7yX9E4iAdPtzqG_Fj-UiU0Jb4R3Ik";

  if (window.supabase) {
    window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  } else {
    // Dynamic script loader for Supabase JS CDN if not already loaded
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";
    script.onload = function() {
      if (window.supabase) {
        window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        console.log("Kumbh Setu Supabase Client initialized successfully.");
      }
    };
    document.head.appendChild(script);
  }
})();
