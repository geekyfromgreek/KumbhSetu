-- ==============================================================================
-- KUMBHSETU UNIFIED DATABASE SCHEMA & REALTIME SETUP FOR SUPABASE
-- Project: KumbhSetu Maha Kumbh Mela 2026 Unified Ecosystem
-- Connected Apps:
-- 1. KumbhSetu-Expo (Pilgrim Mobile App)
-- 2. KumbhSetu-Admins (District Administration & DBA Portal)
-- 3. KumbhSetu-LocalBazaar (Local Eateries & Merchants App)
-- 4. KumbhVeer (Ground Volunteers & Fact-Checkers App)
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ------------------------------------------------------------------------------
-- 1. TARIFFS & ROUTE PRICE CAPS (Managed by Admin -> Read by Pilgrims)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.tariff_routes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    route_name TEXT NOT NULL,
    vehicle_type TEXT DEFAULT 'Auto Rickshaw',
    standard_rate NUMERIC(10, 2) NOT NULL,
    distance_km NUMERIC(6, 2) DEFAULT 0,
    night_rate NUMERIC(10, 2),
    shared_auto_rate NUMERIC(10, 2),
    bus_rate NUMERIC(10, 2),
    approx_minutes INT DEFAULT 20,
    traffic_note TEXT,
    approved_by TEXT DEFAULT 'RTO Nashik',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Ensure all tariff columns exist
ALTER TABLE public.tariff_routes ADD COLUMN IF NOT EXISTS shared_auto_rate NUMERIC(10, 2);
ALTER TABLE public.tariff_routes ADD COLUMN IF NOT EXISTS bus_rate NUMERIC(10, 2);
ALTER TABLE public.tariff_routes ADD COLUMN IF NOT EXISTS approx_minutes INT DEFAULT 20;
ALTER TABLE public.tariff_routes ADD COLUMN IF NOT EXISTS traffic_note TEXT;

-- ------------------------------------------------------------------------------
-- 2. ESSENTIAL COMMODITY PRICES (Managed by Admin -> Read by Pilgrims)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.commodity_prices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    item_name TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('Water & Milk', 'Prasad & Puja', 'Food & Snacks', 'Essentials', 'Lodging')),
    max_retail_price NUMERIC(10, 2) NOT NULL,
    unit TEXT NOT NULL,
    notes TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ------------------------------------------------------------------------------
-- 3. MERCHANTS & EATERIES (Registered via LocalBazaar -> Verified by Admin -> Shown to Pilgrims)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.merchants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_name TEXT NOT NULL,
    owner_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('Eatery / Bhojanalaya', 'Sweets & Snacks', 'Puja Samagri', 'Handicrafts', 'Accommodations', 'General Store')),
    scale_type TEXT NOT NULL CHECK (scale_type IN ('Large Scale Eatery', 'Small Eatery / Stall', 'Retail Shop')),
    fssai_number TEXT,
    fssai_license_url TEXT,
    facade_image_url TEXT,
    address TEXT NOT NULL,
    sector TEXT NOT NULL,
    is_verified BOOLEAN DEFAULT FALSE,
    is_open_now BOOLEAN DEFAULT TRUE,
    rating NUMERIC(3, 2) DEFAULT 4.8,
    review_count INT DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Ensure all columns exist even if table was previously created
ALTER TABLE public.merchants ADD COLUMN IF NOT EXISTS is_open_now BOOLEAN DEFAULT TRUE;
ALTER TABLE public.merchants ADD COLUMN IF NOT EXISTS rating NUMERIC(3, 2) DEFAULT 4.8;
ALTER TABLE public.merchants ADD COLUMN IF NOT EXISTS review_count INT DEFAULT 1;
ALTER TABLE public.merchants ADD COLUMN IF NOT EXISTS is_verified BOOLEAN DEFAULT FALSE;

-- ------------------------------------------------------------------------------
-- 4. MERCHANT CATALOG ITEMS (Managed via LocalBazaar -> Viewed by Pilgrims)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.catalog_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    merchant_id UUID REFERENCES public.merchants(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    description TEXT,
    image_url TEXT,
    is_available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ------------------------------------------------------------------------------
-- 5. SHOP REVIEWS & RATINGS (Pilgrims rate shops -> Automatically ranks shops)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.shop_reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    merchant_id UUID REFERENCES public.merchants(id) ON DELETE CASCADE,
    user_name TEXT NOT NULL,
    rating NUMERIC(2, 1) NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Function to recalculate merchant rating when a review is added
CREATE OR REPLACE FUNCTION update_merchant_rating_avg()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE public.merchants
    SET 
        rating = COALESCE((SELECT ROUND(AVG(rating), 1) FROM public.shop_reviews WHERE merchant_id = NEW.merchant_id), 4.8),
        review_count = (SELECT COUNT(*) FROM public.shop_reviews WHERE merchant_id = NEW.merchant_id),
        updated_at = timezone('utc'::text, now())
    WHERE id = NEW.merchant_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_update_merchant_rating ON public.shop_reviews;
CREATE TRIGGER trigger_update_merchant_rating
AFTER INSERT OR UPDATE OR DELETE ON public.shop_reviews
FOR EACH ROW EXECUTE FUNCTION update_merchant_rating_avg();

-- ------------------------------------------------------------------------------
-- 6. INCIDENTS & GRIEVANCES (Reported by Pilgrims -> Claimed/Resolved by KumbhVeer Volunteers & Admins)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.incidents_and_grievances (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('Overcharging', 'Crowd Density', 'Cleanliness / Sanitation', 'Medical Emergency', 'Lost & Found', 'Harassment / Security', 'Infrastructure')),
    sector TEXT NOT NULL,
    location_details TEXT NOT NULL,
    photo_url TEXT,
    status TEXT NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'ASSIGNED', 'IN_PROGRESS', 'RESOLVED', 'REJECTED')),
    priority TEXT NOT NULL DEFAULT 'MEDIUM' CHECK (priority IN ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL')),
    reporter_name TEXT,
    reporter_phone TEXT,
    assigned_volunteer_id UUID,
    assigned_volunteer_name TEXT,
    resolution_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    resolved_at TIMESTAMP WITH TIME ZONE
);

-- ------------------------------------------------------------------------------
-- 7. FACT-CHECKS & RUMOR BUSTING (Reported by Pilgrims/Volunteers -> Fact-Checked on Ground by KumbhVeer -> Official Verified by Admin)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.fact_checks_and_rumors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    claim_title TEXT NOT NULL,
    claim_details TEXT NOT NULL,
    verdict TEXT NOT NULL DEFAULT 'UNDER_REVIEW' CHECK (verdict IN ('TRUE', 'FALSE', 'MISLEADING', 'UNDER_REVIEW')),
    official_explanation TEXT,
    evidence_image_url TEXT,
    submitted_by TEXT DEFAULT 'Pilgrim',
    verified_by_volunteer TEXT,
    verified_by_admin TEXT,
    source_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ------------------------------------------------------------------------------
-- 8. VOLUNTEER PROFILES (Registered in KumbhVeer -> Validated & Active on Ground)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.volunteer_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name TEXT NOT NULL,
    phone TEXT NOT NULL UNIQUE,
    id_card_number TEXT NOT NULL,
    assigned_sector TEXT NOT NULL,
    avatar_url TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    tasks_resolved_count INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ------------------------------------------------------------------------------
-- 9. PILGRIM INQUIRIES TO MERCHANTS (Sent from Pilgrim App -> Received in LocalBazaar)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.pilgrim_inquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    merchant_id UUID REFERENCES public.merchants(id) ON DELETE CASCADE,
    item_id UUID REFERENCES public.catalog_items(id) ON DELETE SET NULL,
    pilgrim_name TEXT NOT NULL,
    pilgrim_phone TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'NEW' CHECK (status IN ('NEW', 'RESPONDED', 'CLOSED')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ------------------------------------------------------------------------------
-- 10. SHAHI SNAN & AUSPICIOUS MUHURATS (Managed by Admin -> Realtime Streamed to Pilgrims)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.snan_muhurats (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    title_hi TEXT,
    title_mr TEXT,
    snan_date TEXT NOT NULL,
    muhurat_time TEXT NOT NULL,
    ghat_location TEXT NOT NULL,
    importance TEXT,
    crowd_level TEXT NOT NULL DEFAULT 'Extreme' CHECK (crowd_level IN ('Moderate', 'High', 'Extreme')),
    is_major BOOLEAN DEFAULT TRUE,
    order_num INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Seed Official Shahi Snan Dates
INSERT INTO public.snan_muhurats (title, title_hi, title_mr, snan_date, muhurat_time, ghat_location, importance, crowd_level, is_major, order_num)
VALUES
('1st Shahi Snan (Makar Sankranti)', 'प्रथम शाही स्नान (मकर संक्रांति)', 'पहिला शाही स्नान (मकर संक्रांती)', '14 January 2027', '04:15 AM – 08:30 AM (Brahma Muhurat)', 'Ramkund (Nashik) & Kushavarta (Trimbakeshwar)', 'Opening Royal Holy Dip of Maha Kumbh by all Akhadas followed by Yatris.', 'Extreme', TRUE, 1),
('2nd Shahi Snan (Mauni Amavasya)', 'द्वितीय शाही स्नान (मौनी अमावस्या)', 'दुसरा शाही स्नान (मौनी अमावस्या)', '06 February 2027', '03:45 AM – 09:15 AM (Amrit Vela)', 'Ramkund, Nashik & Godavari Sangam', 'The Most Auspicious Royal Bathing Day of the 12-Year Kumbh Cycle.', 'Extreme', TRUE, 2),
('3rd Shahi Snan (Basant Panchami)', 'तृतीय शाही स्नान (बसंत पंचमी)', 'तिसरा शाही स्नान (वसंत पंचमी)', '12 February 2027', '05:00 AM – 10:00 AM', 'Kushavarta Kund (Trimbakeshwar)', 'Sacred Akharas procession dedicated to Lord Shiva and Maa Saraswati.', 'High', TRUE, 3),
('Maghi Purnima Snan', 'माघी पूर्णिमा पवित्र स्नान', 'माघी पौर्णिमा पवित्र स्नान', '21 February 2027', '04:30 AM – 09:00 AM', 'Ramkund, Nashik', 'Kalpavas Purnahuti & Divine Godavari Aarti Holy Dip.', 'High', FALSE, 4),
('Maha Shivratri Shahi Snan', 'महाशिवरात्रि महा शाही स्नान', 'महाशिवरात्री महा शाही स्नान', '06 March 2027', '03:30 AM – 11:30 AM (Char Pahar Puja)', 'Trimbakeshwar Jyotirlinga Kushavarta Kund', 'Grand Concluding Royal Snan of Maha Kumbh Nashik–Trimbakeshwar.', 'Extreme', TRUE, 5)
ON CONFLICT DO NOTHING;

-- ------------------------------------------------------------------------------
-- 11. REALTIME REPLICATION SETUP (For instant cross-app syncing)
-- ------------------------------------------------------------------------------
ALTER PUBLICATION supabase_realtime ADD TABLE public.tariff_routes;
ALTER PUBLICATION supabase_realtime ADD TABLE public.commodity_prices;
ALTER PUBLICATION supabase_realtime ADD TABLE public.merchants;
ALTER PUBLICATION supabase_realtime ADD TABLE public.catalog_items;
ALTER PUBLICATION supabase_realtime ADD TABLE public.shop_reviews;
ALTER PUBLICATION supabase_realtime ADD TABLE public.incidents_and_grievances;
ALTER PUBLICATION supabase_realtime ADD TABLE public.fact_checks_and_rumors;
ALTER PUBLICATION supabase_realtime ADD TABLE public.volunteer_profiles;
ALTER PUBLICATION supabase_realtime ADD TABLE public.pilgrim_inquiries;
ALTER PUBLICATION supabase_realtime ADD TABLE public.snan_muhurats;

-- ------------------------------------------------------------------------------
-- 12. ROW LEVEL SECURITY (RLS) POLICIES - OPEN FOR ANONYMOUS/AUTHENTICATED ACCESS
-- ------------------------------------------------------------------------------
ALTER TABLE public.tariff_routes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.commodity_prices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.merchants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.catalog_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shop_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.incidents_and_grievances ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fact_checks_and_rumors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.volunteer_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pilgrim_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.snan_muhurats ENABLE ROW LEVEL SECURITY;

-- Allow unrestricted read & write with the Anon Key for Maha Kumbh client apps
CREATE POLICY "Allow public all access on tariff_routes" ON public.tariff_routes FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public all access on commodity_prices" ON public.commodity_prices FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public all access on merchants" ON public.merchants FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public all access on catalog_items" ON public.catalog_items FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public all access on shop_reviews" ON public.shop_reviews FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public all access on incidents_and_grievances" ON public.incidents_and_grievances FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public all access on fact_checks_and_rumors" ON public.fact_checks_and_rumors FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public all access on volunteer_profiles" ON public.volunteer_profiles FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public all access on pilgrim_inquiries" ON public.pilgrim_inquiries FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public all access on snan_muhurats" ON public.snan_muhurats FOR ALL USING (true) WITH CHECK (true);

-- ------------------------------------------------------------------------------
-- 13. STORAGE BUCKET CONFIGURATION FOR 'kumbh-media'
-- ------------------------------------------------------------------------------
INSERT INTO storage.buckets (id, name, public) 
VALUES ('kumbh-media', 'kumbh-media', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Allow public uploads to kumbh-media" ON storage.objects 
FOR INSERT WITH CHECK (bucket_id = 'kumbh-media');

CREATE POLICY "Allow public reads from kumbh-media" ON storage.objects 
FOR SELECT USING (bucket_id = 'kumbh-media');

CREATE POLICY "Allow public updates to kumbh-media" ON storage.objects 
FOR UPDATE USING (bucket_id = 'kumbh-media');

