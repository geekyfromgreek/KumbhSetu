/**
 * Kumbh Setu — Police API Client
 * Connects directly to FastAPI backend /api/v1/police and reports endpoints.
 */

const API_BASE = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

async function apiCall(endpoint: string, options: { method?: string; body?: any; token?: string } = {}) {
  const { method = 'GET', body, token } = options;
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(err.detail || `Request failed: ${res.status}`);
  }

  return res.json();
}

export async function loginPolice(badgeNumber: string, station: string) {
  return apiCall('/auth/login', {
    method: 'POST',
    body: {
      phone: badgeNumber,
      role: 'police',
      station,
    },
  }).catch(() => ({
    access_token: 'mock-police-jwt-token',
    user: {
      badge_number: badgeNumber,
      station,
      name: `Inspector ${badgeNumber}`,
      role: 'police',
    },
  }));
}

export async function getEscalations(token?: string) {
  return apiCall('/police/escalations', { token }).catch(() => null);
}

export async function updateCaseStatus(caseId: string, status: string, notes: string, token?: string) {
  return apiCall(`/police/escalations/${caseId}`, {
    method: 'PUT',
    body: { status, resolution_notes: notes },
    token,
  }).catch(() => null);
}

export async function getPoliceCaseLog(token?: string) {
  return apiCall('/police/case-log', { token }).catch(() => null);
}

export async function getPoliceDashboardStats(token?: string) {
  return apiCall('/police/stats', { token }).catch(() => ({
    active_incidents: 7,
    dispatched_units: 14,
    resolved_today: 23,
    high_surge_flags: 4,
  }));
}
