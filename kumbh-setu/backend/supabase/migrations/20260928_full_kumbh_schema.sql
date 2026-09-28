-- ==============================================================================
-- KUMBHSETU FULL-STACK SCHEMA MIGRATION (Supabase PostgreSQL + pgvector)
-- Migration: 20260928_full_kumbh_schema.sql
-- Covers: Profiles, Listings, Guides (vector 128), Bookings, Reports,
--         Escalations, Price Flags, Volunteer Records, Verification Logs
-- ==============================================================================

-- 1. Enable Required Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "vector";

-- 2. User Profiles
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('yatri', 'guide', 'vendor', 'resident', 'volunteer', 'police')),
    phone TEXT,
    avatar_url TEXT,
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Verified Bazaar Listings (5,441 Stalls, Hotels & Transport)
CREATE TABLE IF NOT EXISTS public.listings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('Eatery', 'Hotel/Stay', 'Auto/Transit', 'Puja Samagri', 'Guide', 'General')),
    sector TEXT NOT NULL,
    price_ceiling NUMERIC(10, 2),
    current_price NUMERIC(10, 2),
    rating NUMERIC(3, 2) DEFAULT 4.8,
    is_verified BOOLEAN DEFAULT TRUE,
    fssai_number TEXT,
    owner_phone TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Certified Local Guides (128-d Reference Selfie Embedding)
CREATE TABLE IF NOT EXISTS public.local_guides (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    license_no TEXT NOT NULL UNIQUE,
    phone TEXT NOT NULL,
    languages TEXT[] DEFAULT ARRAY['Hindi', 'Marathi', 'English'],
    rating NUMERIC(3, 2) DEFAULT 4.9,
    tours_completed INT DEFAULT 0,
    selfie_embedding vector(128),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Yatri Bookings & Tour Passes
CREATE TABLE IF NOT EXISTS public.bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_token TEXT NOT NULL UNIQUE,
    guide_id UUID REFERENCES public.local_guides(id) ON DELETE SET NULL,
    listing_id UUID REFERENCES public.listings(id) ON DELETE SET NULL,
    pilgrim_name TEXT NOT NULL,
    pilgrim_phone TEXT NOT NULL,
    tour_date DATE NOT NULL,
    slot_time TEXT NOT NULL,
    amount NUMERIC(10, 2) NOT NULL,
    meetup_point TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'confirmed' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
    selfie_verified BOOLEAN DEFAULT FALSE,
    verified_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Citizen Reports & Price Grievances
CREATE TABLE IF NOT EXISTS public.reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    report_token TEXT NOT NULL UNIQUE,
    vendor_name TEXT NOT NULL,
    category TEXT NOT NULL,
    sector TEXT NOT NULL,
    charged_amount NUMERIC(10, 2) NOT NULL,
    statutory_ceiling NUMERIC(10, 2) NOT NULL,
    delta_overcharge NUMERIC(10, 2) GENERATED ALWAYS AS (charged_amount - statutory_ceiling) STORED,
    description TEXT,
    photo_evidence_url TEXT,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'under_review', 'escalated', 'resolved', 'dismissed')),
    reporter_phone TEXT,
    location_lat DOUBLE PRECISION,
    location_lng DOUBLE PRECISION,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. Statutory Police Escalations & Fines
CREATE TABLE IF NOT EXISTS public.escalations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    docket_no TEXT NOT NULL UNIQUE,
    report_id UUID REFERENCES public.reports(id) ON DELETE CASCADE,
    vendor_name TEXT NOT NULL,
    category TEXT NOT NULL,
    sector TEXT NOT NULL,
    priority TEXT NOT NULL DEFAULT 'MEDIUM' CHECK (priority IN ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL')),
    status TEXT NOT NULL DEFAULT 'investigating' CHECK (status IN ('pending', 'investigating', 'resolved', 'penalized')),
    patrol_squad_assigned TEXT,
    fine_amount NUMERIC(10, 2) DEFAULT 0,
    resolution_notes TEXT,
    resolved_by_badge TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    resolved_at TIMESTAMP WITH TIME ZONE
);

-- 8. Merchant Price Flag Review Queue
CREATE TABLE IF NOT EXISTS public.price_flags (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    vendor_name TEXT NOT NULL,
    sector TEXT NOT NULL,
    violation_type TEXT NOT NULL,
    reported_delta NUMERIC(10, 2) NOT NULL,
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'under_review', 'warned', 'escalated', 'resolved')),
    action_taken TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 9. Kumbhveer Volunteer Records & Karma Ledger
CREATE TABLE IF NOT EXISTS public.volunteer_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    volunteer_name TEXT NOT NULL,
    task_type TEXT NOT NULL CHECK (task_type IN ('stall_audit', 'tariff_check', 'samagri_check', 'queue_assistance')),
    stall_target TEXT NOT NULL,
    sector TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'verified' CHECK (status IN ('assigned', 'in_progress', 'verified', 'flagged')),
    points_awarded INT DEFAULT 50,
    photo_proof_url TEXT,
    gps_lat DOUBLE PRECISION,
    gps_lng DOUBLE PRECISION,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 10. Selfie Identity Verification Logs (Strict Privacy: NO raw photos or embeddings)
CREATE TABLE IF NOT EXISTS public.verification_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    guide_id UUID REFERENCES public.local_guides(id) ON DELETE CASCADE,
    booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE,
    identity_confirmed BOOLEAN NOT NULL,
    verified_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 11. RPC Function: Cosine Similarity Matching for 128-d Selfie Embeddings
CREATE OR REPLACE FUNCTION match_guide_selfie_embedding(
    query_embedding vector(128),
    target_guide_id UUID,
    similarity_threshold float DEFAULT 0.68
)
RETURNS boolean AS $$
DECLARE
    matched boolean;
BEGIN
    SELECT (1 - (selfie_embedding <=> query_embedding)) >= similarity_threshold
    INTO matched
    FROM public.local_guides
    WHERE id = target_guide_id
    LIMIT 1;

    RETURN COALESCE(matched, false);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 12. Realtime Publication Setup
DO $$
BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.listings;
    ALTER PUBLICATION supabase_realtime ADD TABLE public.bookings;
    ALTER PUBLICATION supabase_realtime ADD TABLE public.reports;
    ALTER PUBLICATION supabase_realtime ADD TABLE public.escalations;
    ALTER PUBLICATION supabase_realtime ADD TABLE public.price_flags;
    ALTER PUBLICATION supabase_realtime ADD TABLE public.volunteer_records;
    ALTER PUBLICATION supabase_realtime ADD TABLE public.verification_logs;
EXCEPTION WHEN OTHERS THEN
    -- If tables are already in publication, ignore
    NULL;
END;
$$;

-- 13. Row-Level Security Policies
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.local_guides ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.escalations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.price_flags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.volunteer_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.verification_logs ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
    CREATE POLICY "Allow public all access on profiles" ON public.profiles FOR ALL USING (true) WITH CHECK (true);
    CREATE POLICY "Allow public all access on listings" ON public.listings FOR ALL USING (true) WITH CHECK (true);
    CREATE POLICY "Allow public all access on local_guides" ON public.local_guides FOR ALL USING (true) WITH CHECK (true);
    CREATE POLICY "Allow public all access on bookings" ON public.bookings FOR ALL USING (true) WITH CHECK (true);
    CREATE POLICY "Allow public all access on reports" ON public.reports FOR ALL USING (true) WITH CHECK (true);
    CREATE POLICY "Allow public all access on escalations" ON public.escalations FOR ALL USING (true) WITH CHECK (true);
    CREATE POLICY "Allow public all access on price_flags" ON public.price_flags FOR ALL USING (true) WITH CHECK (true);
    CREATE POLICY "Allow public all access on volunteer_records" ON public.volunteer_records FOR ALL USING (true) WITH CHECK (true);
    CREATE POLICY "Allow public all access on verification_logs" ON public.verification_logs FOR ALL USING (true) WITH CHECK (true);
EXCEPTION WHEN OTHERS THEN
    NULL;
END;
$$;
