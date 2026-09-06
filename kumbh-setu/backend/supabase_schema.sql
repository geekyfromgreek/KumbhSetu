-- ================================================================
-- Kumbh Setu (कुंभसेतु) — Full Supabase PostgreSQL & pgvector Schema
-- Civic Trust, Fair Pricing & Local Guide Biometric Verification
-- ================================================================

-- 1. Enable Required Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "vector"; -- For mathematical selfie identity embeddings

-- 2. LISTINGS TABLE (5,441+ Nashik Eateries, Stays, Transport, Bazaar)
CREATE TABLE IF NOT EXISTS public.listings (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    subcategory TEXT,
    description TEXT,
    address TEXT,
    phone TEXT,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    maps_link TEXT,
    reference_price DOUBLE PRECISION,
    reported_price DOUBLE PRECISION,
    rating DOUBLE PRECISION DEFAULT 4.5,
    review_count INTEGER DEFAULT 0,
    opening_hours TEXT,
    known_for TEXT,
    image_url TEXT,
    verification_status TEXT DEFAULT 'Pending Verification',
    price_flagged INTEGER DEFAULT 0,
    price_delta_percent DOUBLE PRECISION,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for spatial & category queries
CREATE INDEX IF NOT EXISTS idx_listings_category ON public.listings(category);
CREATE INDEX IF NOT EXISTS idx_listings_status ON public.listings(verification_status);

-- 3. LOCAL GUIDES TABLE (Selfie Identity Verification + pgvector)
CREATE TABLE IF NOT EXISTS public.local_guides (
    id TEXT PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    phone_number TEXT NOT NULL,
    govt_id_number TEXT,
    govt_id_document_url TEXT,
    face_embedding vector(128), -- 128-d Facenet embedding vector
    registration_source TEXT DEFAULT 'self',
    verification_status TEXT DEFAULT 'Verified',
    base_location_lat DOUBLE PRECISION DEFAULT 19.9975,
    base_location_lng DOUBLE PRECISION DEFAULT 73.7898,
    base_location_name TEXT DEFAULT 'Ramkund Main Ghat',
    languages_spoken JSONB DEFAULT '["Marathi", "Hindi", "English"]'::jsonb,
    rating DOUBLE PRECISION DEFAULT 4.9,
    review_count INTEGER DEFAULT 0,
    hourly_rate DOUBLE PRECISION DEFAULT 150.0,
    experience_years INTEGER DEFAULT 5,
    specialties JSONB DEFAULT '["Godavari Aarti", "Temple Heritage"]'::jsonb,
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    last_active_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. BOOKINGS TABLE
CREATE TABLE IF NOT EXISTS public.bookings (
    id TEXT PRIMARY KEY,
    listing_id TEXT NOT NULL,
    listing_name TEXT,
    category TEXT NOT NULL,
    guest_name TEXT NOT NULL,
    guest_phone TEXT NOT NULL,
    guest_count INTEGER DEFAULT 1,
    check_in TIMESTAMPTZ,
    check_out TIMESTAMPTZ,
    special_requests TEXT,
    status TEXT DEFAULT 'Pending',
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. REPORTS & GRIEVANCES TABLE
CREATE TABLE IF NOT EXISTS public.reports (
    id TEXT PRIMARY KEY,
    category TEXT NOT NULL,
    listing_id TEXT,
    listing_name TEXT,
    issue_type TEXT NOT NULL,
    description TEXT,
    photo_url TEXT,
    reporter_phone TEXT,
    status TEXT DEFAULT 'New',
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. POLICE ESCALATIONS TABLE
CREATE TABLE IF NOT EXISTS public.escalations (
    id TEXT PRIMARY KEY,
    report_id TEXT REFERENCES public.reports(id) ON DELETE CASCADE,
    category TEXT NOT NULL,
    listing_name TEXT,
    issue_type TEXT NOT NULL,
    description TEXT,
    priority TEXT DEFAULT 'Medium',
    status TEXT DEFAULT 'New',
    escalated_by TEXT,
    assigned_to TEXT,
    notes TEXT,
    escalated_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. FACT CHECKS & RUMOR DEBUNKING TABLE
CREATE TABLE IF NOT EXISTS public.fact_checks (
    id TEXT PRIMARY KEY,
    claim_text TEXT NOT NULL,
    verdict TEXT NOT NULL,
    pib_case_number TEXT,
    priority TEXT DEFAULT 'HIGH',
    category TEXT DEFAULT 'Crowd & Ghats',
    debunk_explanation TEXT NOT NULL,
    official_source_url TEXT,
    reported_count INTEGER DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. KUMBHVEER REWARDS & CIVIC AUDITORS
CREATE TABLE IF NOT EXISTS public.volunteer_rewards (
    id TEXT PRIMARY KEY,
    volunteer_name TEXT NOT NULL,
    phone_number TEXT,
    college_name TEXT NOT NULL,
    points INTEGER DEFAULT 0,
    tier TEXT DEFAULT 'Kumbhveer Sevak',
    audits_completed INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.local_guides ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.escalations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fact_checks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.volunteer_rewards ENABLE ROW LEVEL SECURITY;

-- Allow public read on verified listings & fact checks
CREATE POLICY "Public Read Listings" ON public.listings FOR SELECT USING (true);
CREATE POLICY "Public Read Fact Checks" ON public.fact_checks FOR SELECT USING (true);
CREATE POLICY "Public Read Local Guides" ON public.local_guides FOR SELECT USING (true);
CREATE POLICY "Public Insert Reports" ON public.reports FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Insert Bookings" ON public.bookings FOR INSERT WITH CHECK (true);

-- Authenticated Users & Admins
CREATE POLICY "Admin All Access Listings" ON public.listings FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin All Access Guides" ON public.local_guides FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin All Access Reports" ON public.reports FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin All Access Escalations" ON public.escalations FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin All Access Bookings" ON public.bookings FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin All Access Rewards" ON public.volunteer_rewards FOR ALL TO authenticated USING (true);
