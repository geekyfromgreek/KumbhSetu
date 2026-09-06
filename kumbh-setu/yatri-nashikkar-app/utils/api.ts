/**
 * Kumbh Setu — API Client
 * Centralized API calls to the FastAPI backend.
 */

const API_BASE = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

// Default location: Nashik center (Panchavati area)
export const DEFAULT_LAT = 19.9975;
export const DEFAULT_LNG = 73.7898;

interface RequestOptions {
  method?: string;
  body?: any;
  token?: string;
}

async function apiCall(endpoint: string, options: RequestOptions = {}) {
  const { method = 'GET', body, token } = options;
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  const config: RequestInit = {
    method,
    headers,
  };
  
  if (body) {
    config.body = JSON.stringify(body);
  }
  
  try {
    const response = await fetch(`${API_BASE}${endpoint}`, config);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.detail || 'API request failed');
    }
    
    return data;
  } catch (error: any) {
    console.error(`API Error [${endpoint}]:`, error.message);
    throw error;
  }
}

// ─── Marketplace ────────────────────────────────────────

export async function getListings(params: {
  category?: string;
  search?: string;
  page?: number;
  page_size?: number;
  sort_by?: string;
  user_lat?: number;
  user_lng?: number;
} = {}) {
  const queryParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      queryParams.append(key, String(value));
    }
  });
  return apiCall(`/marketplace/listings?${queryParams}`);
}

export async function getListing(id: string, userLat?: number, userLng?: number) {
  const params = new URLSearchParams();
  if (userLat) params.append('user_lat', String(userLat));
  if (userLng) params.append('user_lng', String(userLng));
  return apiCall(`/marketplace/listings/${id}?${params}`);
}

export async function getCategories() {
  return apiCall('/marketplace/categories');
}

export async function searchListings(query: string) {
  return apiCall(`/marketplace/search-autocomplete?q=${encodeURIComponent(query)}`);
}

export async function getFareEstimate(fromLat: number, fromLng: number, toLat: number, toLng: number) {
  return apiCall(`/marketplace/fare-estimate?from_lat=${fromLat}&from_lng=${fromLng}&to_lat=${toLat}&to_lng=${toLng}`);
}

// ─── Reports ────────────────────────────────────────────

export async function submitReport(report: {
  category: string;
  issue_type: string;
  description?: string;
  listing_id?: string;
  listing_name?: string;
  photo_url?: string;
  reporter_phone?: string;
}) {
  return apiCall('/reports/', { method: 'POST', body: report });
}

export async function getReports(token: string, params: { status?: string; page?: number } = {}) {
  const queryParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) queryParams.append(key, String(value));
  });
  return apiCall(`/reports/?${queryParams}`, { token });
}

export async function updateReportStatus(reportId: string, status: string, notes: string, token: string) {
  return apiCall(`/reports/${reportId}/status`, {
    method: 'PUT',
    body: { status, notes },
    token,
  });
}

export async function getReportStats(token: string) {
  return apiCall('/reports/stats', { token });
}

// ─── Bookings ───────────────────────────────────────────

export async function createBooking(booking: {
  listing_id: string;
  listing_name?: string;
  category: string;
  guest_name: string;
  guest_phone: string;
  guest_count?: number;
  check_in?: string;
  check_out?: string;
  special_requests?: string;
}) {
  return apiCall('/bookings/', { method: 'POST', body: booking });
}

export async function getBookings(token: string, params: { status?: string } = {}) {
  const queryParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) queryParams.append(key, String(value));
  });
  return apiCall(`/bookings/?${queryParams}`, { token });
}

export async function updateBooking(bookingId: string, status: string, notes: string, token: string) {
  return apiCall(`/bookings/${bookingId}`, {
    method: 'PUT',
    body: { status, notes },
    token,
  });
}

export async function getBookingStats(token: string) {
  return apiCall('/bookings/stats', { token });
}

// ─── Auth ───────────────────────────────────────────────

export async function login(phone?: string, email?: string) {
  return apiCall('/auth/login', { method: 'POST', body: { phone, email } });
}

export async function getProfile(token: string) {
  return apiCall('/auth/me', { token });
}

export async function getDemoTokens() {
  return apiCall('/auth/demo-tokens');
}

// ─── Police / Escalations ───────────────────────────────

export async function getEscalations(token: string, params: { status?: string; page?: number } = {}) {
  const queryParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) queryParams.append(key, String(value));
  });
  return apiCall(`/police/escalations?${queryParams}`, { token });
}

export async function getEscalation(id: string, token: string) {
  return apiCall(`/police/escalations/${id}`, { token });
}

export async function updateEscalation(id: string, update: any, token: string) {
  return apiCall(`/police/escalations/${id}`, { method: 'PUT', body: update, token });
}

export async function getCaseLog(token: string, params: { search?: string; status?: string } = {}) {
  const queryParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) queryParams.append(key, String(value));
  });
  return apiCall(`/police/case-log?${queryParams}`, { token });
}

// ─── Infrastructure / Emergency ─────────────────────────

export async function getEmergencyServices(userLat?: number, userLng?: number) {
  const params = new URLSearchParams();
  if (userLat) params.append('user_lat', String(userLat));
  if (userLng) params.append('user_lng', String(userLng));
  return apiCall(`/infrastructure/emergency?${params}`);
}

export async function getNearbyInfrastructure(userLat: number, userLng: number, category?: string) {
  const params = new URLSearchParams({
    user_lat: String(userLat),
    user_lng: String(userLng),
  });
  if (category) params.append('category', category);
  return apiCall(`/infrastructure/nearby?${params}`);
}

// ─── Helpers ────────────────────────────────────────────

export function getNavigateUrl(lat: number, lng: number): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=driving`;
}

export function formatPrice(price: number | null | undefined): string {
  if (price === null || price === undefined) return '—';
  return `₹${price.toFixed(0)}`;
}

export function getVerificationColor(status: string): string {
  switch (status) {
    case 'Kumbhveer Verified': return '#2E7D32';
    case 'Pending Verification': return '#F57F17';
    case 'Flagged — Info Incomplete': return '#C62828';
    default: return '#757575';
  }
}

export function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    eatery: 'Eateries',
    hotel: 'Hotels',
    rickshaw_bus: 'Rickshaw & Bus',
    local_guide: 'Local Guides',
  };
  return labels[category] || category;
}

// Aliases
export const fetchCategories = getCategories;
export const fetchReports = async (token: string = '') => getReports(token);
export const escalateReport = async (reportId: string, notes: string = '') => {
  return apiCall(`/reports/${reportId}/status`, {
    method: 'PUT',
    body: { status: 'escalated', notes },
  });
};
export const fetchEmergencyInfo = async (lat?: number, lng?: number) => {
  return getEmergencyServices(lat, lng);
};
