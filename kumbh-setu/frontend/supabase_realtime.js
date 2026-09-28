/**
 * Kumbh Setu — Supabase Real-Time Engine
 * Provides real-time subscriptions, CRUD helpers, and graceful FastAPI fallback.
 * Include after supabase.js on any page that needs live data.
 *
 * Usage:
 *   await KumbhRealtime.ready();
 *   KumbhRealtime.subscribe('reports', 'INSERT', (newRow) => { ... });
 *   KumbhRealtime.insert('reports', { category: '...', ... });
 *   const { data } = await KumbhRealtime.select('reports', { status: 'New' });
 */
(function () {
  'use strict';

  const POLL_INTERVAL_MS = 8000; // Fallback polling interval if Supabase realtime unavailable
  const MAX_WAIT_MS = 3000;      // Max time to wait for supabaseClient init

  // ── Helpers ─────────────────────────────────────────────────────────────────
  function apiBase() {
    return window.API_BASE_URL || window.API_BASE || 'http://localhost:8000';
  }

  function getClient() {
    return window.supabaseClient || null;
  }

  // Wait until window.supabaseClient exists (set by supabase.js CDN loader)
  function waitForClient() {
    return new Promise((resolve) => {
      if (getClient()) return resolve(getClient());
      const start = Date.now();
      const iv = setInterval(() => {
        if (getClient()) { clearInterval(iv); resolve(getClient()); }
        else if (Date.now() - start > MAX_WAIT_MS) { clearInterval(iv); resolve(null); }
      }, 100);
    });
  }

  // ── Active subscriptions tracking ──────────────────────────────────────────
  const _channels = {};   // table -> RealtimeChannel
  const _callbacks = {};  // table -> { INSERT: [], UPDATE: [], DELETE: [], '*': [] }
  const _pollTimers = {}; // table -> setInterval id (fallback)
  const _lastCounts = {}; // table -> last known count (for poll-based change detection)

  // ── Core API ───────────────────────────────────────────────────────────────

  const KumbhRealtime = {

    /** Wait for Supabase client to be ready. Returns true if available, false for fallback mode. */
    async ready() {
      const client = await waitForClient();
      KumbhRealtime._client = client;
      KumbhRealtime._mode = client ? 'supabase' : 'fallback';
      console.log(`[KumbhRealtime] Mode: ${KumbhRealtime._mode}`);

      if (client && client.auth) {
        try {
          const { data } = await client.auth.getSession();
          if (!data?.session) {
            const role = localStorage.getItem('kumbhsetu_nashikkar_role') || 'resident';
            const emailMap = {
              guide: 'guide.suresh@kumbhsetu.in',
              vendor: 'vendor.godavari@kumbhsetu.in',
              volunteers: 'kumbhveer.kthm@kumbhsetu.in',
              kumbhveer: 'kumbhveer.kthm@kumbhsetu.in',
              resident: 'resident.panchavati@kumbhsetu.in',
              nashikkar: 'resident.panchavati@kumbhsetu.in'
            };
            const email = emailMap[role] || 'resident.panchavati@kumbhsetu.in';
            const { data: authData } = await client.auth.signInWithPassword({
              email: email,
              password: 'KumbhSetu@2027'
            });
            if (authData?.session) {
              localStorage.setItem('kumbhsetu_jwt', authData.session.access_token);
              console.log('[KumbhRealtime] Active auth session verified for:', email);
            }
          } else {
            localStorage.setItem('kumbhsetu_jwt', data.session.access_token);
          }
        } catch (e) {
          console.log('[KumbhRealtime] Session note:', e?.message);
        }
      }

      return !!client;
    },

    /** Current mode: 'supabase' or 'fallback' */
    _mode: 'unknown',
    _client: null,

    // ── Subscribe to real-time changes on a table ──────────────────────────
    /**
     * @param {string} table   - Supabase table name (e.g. 'reports')
     * @param {string} event   - 'INSERT' | 'UPDATE' | 'DELETE' | '*'
     * @param {Function} cb    - callback(payload) — payload.new for INSERT/UPDATE
     */
    subscribe(table, event, cb) {
      if (!_callbacks[table]) {
        _callbacks[table] = { INSERT: [], UPDATE: [], DELETE: [], '*': [] };
      }
      _callbacks[table][event].push(cb);

      // If we already have a channel for this table, skip creating another
      if (_channels[table]) return;

      const client = KumbhRealtime._client;

      if (client) {
        try {
          const channel = client
            .channel(`realtime-${table}`)
            .on('postgres_changes', { event: '*', schema: 'public', table: table }, (payload) => {
              console.log(`[KumbhRealtime] ${table} ${payload.eventType}`, payload);
              _dispatch(table, payload.eventType, payload);
            })
            .subscribe((status) => {
              console.log(`[KumbhRealtime] Channel ${table}: ${status}`);
              if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT') {
                // Fall back to polling
                _startPolling(table);
              }
            });

          _channels[table] = channel;
          return;
        } catch (e) {
          console.warn(`[KumbhRealtime] Realtime channel failed for ${table}, falling back to polling`, e);
        }
      }

      // Fallback: poll the FastAPI backend
      _startPolling(table);
    },

    /** Unsubscribe all listeners for a table */
    unsubscribe(table) {
      if (_channels[table]) {
        try { _channels[table].unsubscribe(); } catch (e) { /* ok */ }
        delete _channels[table];
      }
      if (_pollTimers[table]) {
        clearInterval(_pollTimers[table]);
        delete _pollTimers[table];
      }
      delete _callbacks[table];
    },

    // ── CRUD Helpers (Supabase-first, FastAPI fallback) ──────────────────

    /** Insert a row into a table */
    async insert(table, data) {
      const client = KumbhRealtime._client;

      // Try Supabase first
      if (client) {
        try {
          const { data: result, error } = await client.from(table).insert([data]);
          if (!error) {
            console.log(`[KumbhRealtime] Inserted into ${table} via Supabase`, result || data);
            return { data: result || data, source: 'supabase' };
          }
          console.warn(`[KumbhRealtime] Supabase insert error for ${table}:`, error?.message);
        } catch (e) {
          console.warn(`[KumbhRealtime] Supabase insert failed for ${table}`, e);
        }
      }

      // Fallback: POST to FastAPI
      const apiMap = {
        reports: '/api/v1/reports/',
        vendors: '/api/v1/vendors/register',
        listings: '/api/v1/marketplace/listings',
        escalations: '/api/v1/police/escalate'
      };
      const endpoint = apiMap[table];
      if (!endpoint) return { data: null, source: 'none', error: 'No endpoint' };

      try {
        const res = await fetch(apiBase() + endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        const json = await res.json();
        console.log(`[KumbhRealtime] Inserted into ${table} via FastAPI`, json);
        return { data: json, source: 'fastapi' };
      } catch (e) {
        console.error(`[KumbhRealtime] FastAPI insert also failed for ${table}`, e);
        return { data: null, source: 'error', error: e.message };
      }
    },

    /** Update a row in a table (Supabase first + FastAPI sync) */
    async update(table, id, data) {
      const client = KumbhRealtime._client;
      let supabaseOk = false;
      if (client) {
        try {
          const { data: result, error } = await client.from(table).update(data).eq('id', id);
          if (!error) {
            console.log(`[KumbhRealtime] Updated ${table} via Supabase`, id);
            supabaseOk = true;
          } else {
            console.warn(`[KumbhRealtime] Supabase update error:`, error?.message);
          }
        } catch (e) { /* fall through */ }
      }

      // If updating report or escalation, ensure FastAPI backend is also in sync
      if (table === 'reports' && data.status) {
        try {
          const token = localStorage.getItem('kumbhsetu_jwt') || 'demo-nashikkar-token';
          await fetch(apiBase() + '/api/v1/reports/' + encodeURIComponent(id) + '/status', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
            body: JSON.stringify({ status: data.status, notes: data.notes || 'Status updated' })
          });
        } catch (e) { /* fallback */ }
      } else if (table === 'escalations' && data.status) {
        try {
          const token = localStorage.getItem('kumbhsetu_jwt') || 'demo-police-token';
          await fetch(apiBase() + '/api/v1/police/escalations/' + encodeURIComponent(id), {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
            body: JSON.stringify({ status: data.status, notes: data.notes })
          });
        } catch (e) { /* fallback */ }
      }

      _dispatch(table, 'UPDATE', { new: { id, ...data }, eventType: 'UPDATE', table });
      return { data: { id, ...data }, source: supabaseOk ? 'supabase' : 'fastapi' };
    },

    /** Dedicated helper: Resolve a report across Supabase AND FastAPI backend */
    async resolveReport(reportId, notes = 'Penalty Imposed & Resolved by Citizen') {
      const client = KumbhRealtime._client;
      const now = new Date().toISOString();

      // 1. Update Supabase reports table
      if (client) {
        try {
          const { error } = await client.from('reports').update({
            status: 'Resolved',
            notes: notes,
            updated_at: now
          }).eq('id', reportId);
          if (!error) {
            console.log('[KumbhRealtime] Report resolved in Supabase:', reportId);
          } else {
            console.warn('[KumbhRealtime] Supabase resolve note:', error?.message);
          }
        } catch (e) {
          console.warn('[KumbhRealtime] Supabase resolve exception:', e);
        }
      }

      // 2. Synchronize to FastAPI backend
      try {
        const token = localStorage.getItem('kumbhsetu_jwt') || 'demo-nashikkar-token';
        const res = await fetch(apiBase() + '/api/v1/reports/' + encodeURIComponent(reportId) + '/status', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          },
          body: JSON.stringify({
            status: 'Resolved',
            notes: notes
          })
        });
        if (res.ok) {
          console.log('[KumbhRealtime] Report resolved in FastAPI backend:', reportId);
        }
      } catch (err) {
        console.warn('[KumbhRealtime] FastAPI backend resolve note:', err);
      }

      // 3. Dispatch local event for instant reactive UI update
      _dispatch('reports', 'UPDATE', {
        new: { id: reportId, status: 'Resolved', notes: notes, updated_at: now },
        eventType: 'UPDATE',
        table: 'reports'
      });

      return true;
    },

    /** Select rows from a table with optional filters */
    async select(table, filters = {}, options = {}) {
      const client = KumbhRealtime._client;
      if (client) {
        try {
          let query = client.from(table).select('*');
          Object.entries(filters).forEach(([key, val]) => {
            query = query.eq(key, val);
          });
          if (options.order) query = query.order(options.order, { ascending: options.ascending ?? false });
          else query = query.order('created_at', { ascending: false });
          if (options.limit) query = query.limit(options.limit);

          const { data, error } = await query;
          if (!error && data && data.length > 0) return { data, source: 'supabase', count: data.length };
          console.warn(`[KumbhRealtime] Supabase select error:`, error?.message);
        } catch (e) { /* fall through */ }
      }

      // Fallback: try FastAPI
      const apiMap = {
        reports: '/api/v1/reports/',
        vendors: '/api/v1/vendors/registrations',
        listings: '/api/v1/marketplace/listings',
        escalations: '/api/v1/police/escalations'
      };
      const endpoint = apiMap[table];
      if (!endpoint) return { data: [], source: 'none' };

      try {
        const token = localStorage.getItem('kumbhsetu_jwt') || 'demo-nashikkar-token';
        const res = await fetch(apiBase() + endpoint, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const json = await res.json();
          const items = json.reports || json || [];
          return { data: items, source: 'fastapi', count: items.length };
        }
      } catch (e) { /* fall through */ }

      return { data: [], source: 'offline' };
    },

    /** Dedicated helper: fetch reports from Supabase (or FastAPI fallback) */
    async getReports(options = {}) {
      const client = KumbhRealtime._client;
      if (client) {
        try {
          let q = client.from('reports').select('*');
          if (options.status) q = q.eq('status', options.status);
          q = q.order('created_at', { ascending: false });
          if (options.limit) q = q.limit(options.limit);
          const { data, error } = await q;
          if (!error && data && data.length > 0) {
            return data;
          }
        } catch (e) { /* fallback */ }
      }

      // Fallback: FastAPI
      try {
        const token = localStorage.getItem('kumbhsetu_jwt') || 'demo-nashikkar-token';
        let url = apiBase() + '/api/v1/reports/?page_size=' + (options.limit || 50);
        if (options.status) url += '&status=' + encodeURIComponent(options.status);
        const res = await fetch(url, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const json = await res.json();
          return json.reports || json || [];
        }
      } catch (e) { /* offline */ }

      return [];
    },

    /** Get count of rows in a table (with optional filter) */
    async count(table, filters = {}) {
      const client = KumbhRealtime._client;
      if (client) {
        try {
          let query = client.from(table).select('id', { count: 'exact', head: true });
          Object.entries(filters).forEach(([key, val]) => {
            query = query.eq(key, val);
          });
          const { count, error } = await query;
          if (!error && count !== null) return { count, source: 'supabase' };
        } catch (e) { /* fall through */ }
      }
      return { count: null, source: 'fallback' };
    },

    /** Fetch live dashboard stats (reports, vendors, flags, escalations) */
    async dashboardStats() {
      const client = KumbhRealtime._client;
      const stats = {
        reports_total: 0,
        reports_new: 0,
        reports_resolved: 0,
        reports_escalated: 0,
        vendors_total: 0,
        vendors_pending: 0,
        vendors_verified: 0,
        price_flags: 0,
        escalations_total: 0,
        volunteers_active: 21,
        listings_total: 182,
        source: 'unknown'
      };

      if (client) {
        try {
          const [rTotal, rNew, rResolved, rEscalated, vTotal, vPending, vVerified, pFlags, eTotal, lTotal] = await Promise.allSettled([
            client.from('reports').select('id', { count: 'exact', head: true }),
            client.from('reports').select('id', { count: 'exact', head: true }).eq('status', 'New'),
            client.from('reports').select('id', { count: 'exact', head: true }).eq('status', 'Resolved'),
            client.from('reports').select('id', { count: 'exact', head: true }).eq('status', 'Escalated to Police'),
            client.from('vendors').select('id', { count: 'exact', head: true }),
            client.from('vendors').select('id', { count: 'exact', head: true }).eq('verification_status', 'Pending Verification'),
            client.from('vendors').select('id', { count: 'exact', head: true }).eq('verification_status', 'Verified'),
            client.from('listings').select('id', { count: 'exact', head: true }).eq('price_flagged', true),
            client.from('escalations').select('id', { count: 'exact', head: true }),
            client.from('listings').select('id', { count: 'exact', head: true }),
          ]);

          const val = (r) => (r.status === 'fulfilled' && r.value && !r.value.error && r.value.count !== null) ? r.value.count : null;

          const repCnt = val(rTotal);
          if (repCnt !== null && repCnt > 0) {
            stats.reports_total = repCnt;
            stats.reports_new = val(rNew) ?? repCnt;
            stats.reports_resolved = val(rResolved) ?? 0;
            stats.reports_escalated = val(rEscalated) ?? 0;
            stats.source = 'supabase';
          }
          if (val(vTotal) !== null) stats.vendors_total = val(vTotal);
          if (val(vPending) !== null) stats.vendors_pending = val(vPending);
          if (val(vVerified) !== null) stats.vendors_verified = val(vVerified);
          if (val(pFlags) !== null) stats.price_flags = val(pFlags);
          if (val(eTotal) !== null) stats.escalations_total = val(eTotal);
          if (val(lTotal) !== null && val(lTotal) > 0) stats.listings_total = val(lTotal);

          if (stats.source === 'supabase') {
            console.log('[KumbhRealtime] Dashboard stats from Supabase:', stats);
            return stats;
          }
        } catch (e) {
          console.warn('[KumbhRealtime] Supabase dashboard stats failed, trying FastAPI', e);
        }
      }

      // Fallback: FastAPI
      try {
        const token = localStorage.getItem('kumbhsetu_jwt') || 'demo-nashikkar-token';
        const headers = { 'Authorization': `Bearer ${token}` };
        const res = await fetch(apiBase() + '/api/v1/reports/stats', { headers });
        if (res.ok) {
          const data = await res.json();
          stats.reports_total = data.total || stats.reports_total || 0;
          stats.reports_new = data.new || stats.reports_new || 0;
          stats.reports_resolved = data.resolved || 0;
          stats.reports_escalated = data.escalated_to_police || 0;
          stats.source = 'fastapi';
        }
      } catch (e) { /* offline */ }

      return stats;
    }
  };

  // ── Internal: dispatch callbacks ───────────────────────────────────────────
  function _dispatch(table, eventType, payload) {
    const cbs = _callbacks[table];
    if (!cbs) return;

    const eventCbs = cbs[eventType] || [];
    const wildcardCbs = cbs['*'] || [];

    [...eventCbs, ...wildcardCbs].forEach((cb) => {
      try { cb(payload); } catch (e) { console.error('[KumbhRealtime] Callback error:', e); }
    });
  }

  // ── Internal: fallback polling ─────────────────────────────────────────────
  function _startPolling(table) {
    if (_pollTimers[table]) return; // already polling

    console.log(`[KumbhRealtime] Starting fallback polling for ${table} (${POLL_INTERVAL_MS}ms)`);

    const poll = async () => {
      try {
        const { count } = await KumbhRealtime.count(table);
        const prev = _lastCounts[table];
        _lastCounts[table] = count;

        if (prev !== undefined && count !== null && count > prev) {
          // Something was inserted — trigger callbacks
          _dispatch(table, 'INSERT', { new: null, eventType: 'INSERT', table, _polled: true });
        }
      } catch (e) { /* silent */ }
    };

    poll(); // initial
    _pollTimers[table] = setInterval(poll, POLL_INTERVAL_MS);
  }

  // ── Expose globally ────────────────────────────────────────────────────────
  window.KumbhRealtime = KumbhRealtime;

})();
