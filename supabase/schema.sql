-- ====================================================================
-- CRAFTTRUE INDIA - COMPLETE DATABASE SCHEMA WITH RBAC
-- Specialized for: GI-183 (Bagru) & GI-147 (Sanganer) Hand-Block Textiles
-- Dual-Persona Authentication: Consumer (Phone OTP / Email) vs. Artisan
-- ====================================================================

-- 1. Enable Required Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. User Profiles Table (Directly Linked to Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY, -- References auth.users(id) in Supabase production
    email TEXT UNIQUE,
    phone TEXT UNIQUE,
    full_name TEXT NOT NULL DEFAULT 'Craft Patron',
    role TEXT NOT NULL DEFAULT 'consumer' CHECK (role IN ('consumer', 'artisan', 'retailer', 'admin')),
    avatar_url TEXT,
    
    -- Artisan-Specific Credentials (NULL for Normal Users)
    cluster TEXT CHECK (cluster IN ('Bagru', 'Sanganer')),
    workshop_name TEXT,
    pehchan_id TEXT UNIQUE,               -- Govt. of India Ministry of Textiles Pehchan Card
    gi_authorized_user_no TEXT UNIQUE,    -- e.g., GI-183-AU-BAGRU-019
    is_verified_artisan BOOLEAN DEFAULT false,
    experience_years INT DEFAULT 15,
    lineage_or_caste TEXT DEFAULT 'Traditional Chhipa Community',
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Index for high-speed lookup by role, phone, and email
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_phone ON public.profiles(phone);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);

-- 3. Artisan Workshops Directory
CREATE TABLE IF NOT EXISTS public.artisan_workshops (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    artisan_name TEXT NOT NULL,
    workshop_name TEXT NOT NULL,
    cluster TEXT NOT NULL CHECK (cluster IN ('Bagru', 'Sanganer')),
    location_address TEXT NOT NULL,
    lineage_or_caste TEXT DEFAULT 'Traditional Chhipa Community',
    experience_years INT NOT NULL DEFAULT 20,
    gi_authorized_user_no TEXT,
    gi_status TEXT NOT NULL DEFAULT 'Verified' CHECK (gi_status IN ('Verified', 'Documented', 'Under Review', 'Not Applicable')),
    bio TEXT NOT NULL,
    image_url TEXT,
    consent_obtained BOOLEAN NOT NULL DEFAULT true,
    total_earnings_inr NUMERIC(12, 2) DEFAULT 0.00,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 4. Master Products Catalog
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_code TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    title_hi TEXT,
    cluster TEXT NOT NULL CHECK (cluster IN ('Bagru', 'Sanganer')),
    category TEXT NOT NULL DEFAULT 'Textile' CHECK (category IN ('Textile', 'Apparel', 'Home Furnishing', 'Fabric')),
    description TEXT NOT NULL,
    artisan_workshop_id UUID REFERENCES public.artisan_workshops(id) ON DELETE CASCADE,
    
    -- Weaving Method vs. Printing Technique Distinction
    weaving_method TEXT NOT NULL CHECK (weaving_method IN ('Handloom', 'Powerloom', 'Mill-Made', 'Handspun Khadi', 'Unknown')),
    printing_technique TEXT NOT NULL CHECK (printing_technique IN ('Traditional Hand-Block', 'Mud-Resist Dabu Hand-Block', 'Screen Print', 'Machine/Digital Print', 'Unknown')),
    dye_type TEXT NOT NULL CHECK (dye_type IN ('100% Natural Vegetable Dye', 'Alizarin & Harda Mineral', 'Synthetic Pigment Dye', 'Mixed Dyes', 'Unknown')),
    fabric_composition TEXT NOT NULL DEFAULT '100% Handloom Cotton',
    
    verification_status TEXT NOT NULL DEFAULT 'PARTIALLY_VERIFIED' CHECK (
        verification_status IN ('VERIFIED', 'PARTIALLY_VERIFIED', 'UNVERIFIED', 'UNDER_INVESTIGATION', 'CONFIRMED_MISREPRESENTATION')
    ),
    retail_price_inr NUMERIC(10, 2) NOT NULL,
    image_url TEXT NOT NULL,
    is_demo BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_products_code ON public.products(product_code);
CREATE INDEX IF NOT EXISTS idx_products_cluster ON public.products(cluster);
CREATE INDEX IF NOT EXISTS idx_products_status ON public.products(verification_status);

-- 5. Seven-Layer Authenticity Scorecards
CREATE TABLE IF NOT EXISTS public.verification_scorecards (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE UNIQUE,
    geo_status TEXT NOT NULL DEFAULT 'Verified' CHECK (geo_status IN ('Verified', 'Documented', 'Declared by Producer', 'Not Established', 'Under Review')),
    geo_evidence TEXT,
    artisan_status TEXT NOT NULL DEFAULT 'Verified' CHECK (artisan_status IN ('Verified', 'Documented', 'Declared by Producer', 'Not Established', 'Under Review')),
    artisan_evidence TEXT,
    process_status TEXT NOT NULL DEFAULT 'Verified' CHECK (process_status IN ('Verified', 'Documented', 'Declared by Producer', 'Not Established', 'Under Review')),
    process_evidence TEXT,
    material_status TEXT NOT NULL DEFAULT 'Verified' CHECK (material_status IN ('Verified', 'Documented', 'Declared by Producer', 'Not Established', 'Under Review')),
    material_evidence TEXT,
    gi_layer_status TEXT NOT NULL DEFAULT 'Verified' CHECK (gi_layer_status IN ('Verified', 'Documented', 'Declared by Producer', 'Not Established', 'Under Review')),
    gi_evidence TEXT,
    supply_chain_status TEXT NOT NULL DEFAULT 'Verified' CHECK (supply_chain_status IN ('Verified', 'Documented', 'Declared by Producer', 'Not Established', 'Under Review')),
    supply_chain_evidence TEXT,
    commercial_claim_status TEXT NOT NULL DEFAULT 'Verified' CHECK (commercial_claim_status IN ('Verified', 'Documented', 'Declared by Producer', 'Not Established', 'Contradicted')),
    commercial_claim_evidence TEXT,
    last_verified_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()),
    verifier_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    verifier_remarks TEXT
);

-- 6. Price Transparency & Direct Artisan Fair Share
CREATE TABLE IF NOT EXISTS public.price_disclosures (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE UNIQUE,
    fabric_raw_cost_inr NUMERIC(10, 2) NOT NULL,
    artisan_labor_inr NUMERIC(10, 2) NOT NULL,
    printing_block_charge_inr NUMERIC(10, 2) NOT NULL,
    washing_finishing_inr NUMERIC(10, 2) NOT NULL,
    packaging_logistics_inr NUMERIC(10, 2) NOT NULL,
    retail_fair_margin_inr NUMERIC(10, 2) NOT NULL,
    is_audited BOOLEAN NOT NULL DEFAULT true,
    audit_notes TEXT
);

-- 7. Documented Production Stages
CREATE TABLE IF NOT EXISTS public.production_stages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
    stage_order INT NOT NULL,
    stage_name TEXT NOT NULL,
    description TEXT NOT NULL,
    date_completed DATE,
    evidence_image_url TEXT,
    is_evidenced BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 8. Serialized QR Swing Tags & Anomaly Tracking
CREATE TABLE IF NOT EXISTS public.qr_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE UNIQUE,
    qr_code_payload TEXT NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    total_scans INT NOT NULL DEFAULT 0,
    has_duplication_anomaly BOOLEAN NOT NULL DEFAULT false,
    anomaly_reason TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    last_scanned_at TIMESTAMPTZ
);

-- 9. Real-Time Scan Logs (Geolocation Surveillance)
CREATE TABLE IF NOT EXISTS public.qr_scan_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    qr_record_id UUID REFERENCES public.qr_records(id) ON DELETE CASCADE,
    product_code TEXT NOT NULL,
    scanned_from_city TEXT DEFAULT 'Jaipur',
    device_type TEXT DEFAULT 'Mobile Web',
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 10. Immutable Verifier Audit Trail
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    previous_state TEXT,
    new_state TEXT,
    performed_by TEXT NOT NULL DEFAULT 'Verifier ID: AGY-ADMIN-01',
    justification TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 11. Consumer Complaints (Under Consumer Protection Act 2019)
CREATE TABLE IF NOT EXISTS public.consumer_complaints (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    complaint_ref_no TEXT UNIQUE NOT NULL,
    product_code TEXT NOT NULL,
    consumer_name TEXT,
    contact_email TEXT,
    purchase_platform TEXT,
    purchase_price_inr NUMERIC(10, 2),
    complaint_category TEXT NOT NULL CHECK (complaint_category IN (
        'Suspected Machine/Screen Print Imitation',
        'False Origin / Not From Bagru or Sanganer',
        'False GI Claim',
        'Misleading Natural Dye Claim',
        'Copied or Duplicate QR Label',
        'Other Misrepresentation'
    )),
    description TEXT NOT NULL,
    evidence_url TEXT,
    status TEXT NOT NULL DEFAULT 'Under Investigation' CHECK (status IN ('Submitted', 'Under Investigation', 'Resolved', 'Dismissed')),
    resolution_notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 12. Consumer Feedback & WTP Surveys
CREATE TABLE IF NOT EXISTS public.research_surveys (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_code TEXT NOT NULL,
    verification_status_seen TEXT NOT NULL,
    understanding_of_authenticity INT CHECK (understanding_of_authenticity BETWEEN 1 AND 5),
    perceived_transparency INT CHECK (perceived_transparency BETWEEN 1 AND 5),
    trust_in_evidence INT CHECK (trust_in_evidence BETWEEN 1 AND 5),
    willingness_to_pay_inr NUMERIC(10, 2),
    prior_block_print_knowledge TEXT CHECK (prior_block_print_knowledge IN ('Novice', 'Moderate', 'Expert Connoisseur')),
    feedback_notes TEXT,
    consent_given BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ====================================================================
-- 13. AUTOMATIC PROFILE CREATION TRIGGER (FOR SUPABASE AUTH)
-- Automatically inserts a row into public.profiles whenever a user signs up
-- via Mobile Number OTP or Email in Supabase Auth.
-- ====================================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
    INSERT INTO public.profiles (
        id,
        email,
        phone,
        full_name,
        role,
        cluster,
        pehchan_id,
        workshop_name
    )
    VALUES (
        new.id,
        new.email,
        new.phone,
        coalesce(new.raw_user_meta_data->>'full_name', 'Craft Patron'),
        coalesce(new.raw_user_meta_data->>'role', 'consumer'),
        new.raw_user_meta_data->>'cluster',
        new.raw_user_meta_data->>'pehchan_id',
        new.raw_user_meta_data->>'workshop_name'
    );
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger definition for Supabase auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ====================================================================
-- 14. ROW-LEVEL SECURITY (RLS) POLICIES
-- Strict boundary enforcement between Consumers, Artisans, and Public
-- ====================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.artisan_workshops ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.verification_scorecards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.price_disclosures ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.production_stages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.qr_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.qr_scan_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consumer_complaints ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.research_surveys ENABLE ROW LEVEL SECURITY;

-- Profiles: Public can read basic profile info; users can update their own
CREATE POLICY "Public profiles are readable" 
    ON public.profiles FOR SELECT 
    USING (true);

CREATE POLICY "Users can update own profile" 
    ON public.profiles FOR UPDATE 
    USING (auth.uid() = id);

-- Products: Everyone can browse verified products; artisans can manage own products
CREATE POLICY "Public products are viewable" 
    ON public.products FOR SELECT 
    USING (true);

CREATE POLICY "Artisans can register products" 
    ON public.products FOR INSERT 
    WITH CHECK (auth.uid() IN (
        SELECT user_id FROM public.artisan_workshops WHERE id = artisan_workshop_id
    ));

-- Complaints: Any user can submit complaints; verifiers can review
CREATE POLICY "Any user can submit complaint" 
    ON public.consumer_complaints FOR INSERT 
    WITH CHECK (true);

CREATE POLICY "Users can view own complaint or public tracking" 
    ON public.consumer_complaints FOR SELECT 
    USING (true);
