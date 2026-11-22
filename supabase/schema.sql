-- ====================================================================
-- CRAFTTRUE INDIA - DATABASE SCHEMA (PHASE 1 DEMO)
-- A QR-Based Digital Craft Authenticity, Traceability & Protection Platform
-- Specialization: Bagru & Sanganeri Hand-Block Printed Textiles, Rajasthan
-- ====================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. User Profiles & Roles
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'consumer' CHECK (role IN ('consumer', 'artisan', 'retailer', 'admin')),
    phone TEXT,
    avatar_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3. Artisan & Workshop Profiles
CREATE TABLE IF NOT EXISTS public.artisan_workshops (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    artisan_name TEXT NOT NULL,
    workshop_name TEXT NOT NULL,
    cluster TEXT NOT NULL CHECK (cluster IN ('Bagru', 'Sanganer')),
    location_address TEXT NOT NULL,
    lineage_or_caste TEXT DEFAULT 'Chhipa Master Printer',
    experience_years INT NOT NULL DEFAULT 15,
    gi_authorized_user_no TEXT,
    gi_status TEXT NOT NULL DEFAULT 'Documented' CHECK (gi_status IN ('Verified', 'Documented', 'Under Review', 'Not Applicable')),
    bio TEXT NOT NULL,
    image_url TEXT,
    consent_obtained BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 4. Products Master Record
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_code TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    title_hi TEXT,
    cluster TEXT NOT NULL CHECK (cluster IN ('Bagru', 'Sanganer')),
    category TEXT NOT NULL DEFAULT 'Textile' CHECK (category IN ('Textile', 'Apparel', 'Home Furnishing', 'Fabric')),
    description TEXT NOT NULL,
    artisan_workshop_id UUID REFERENCES public.artisan_workshops(id) ON DELETE CASCADE,
    weaving_method TEXT NOT NULL CHECK (weaving_method IN ('Handloom', 'Powerloom', 'Mill-Made', 'Handspun Khadi', 'Unknown')),
    printing_technique TEXT NOT NULL CHECK (printing_technique IN ('Traditional Hand-Block', 'Mud-Resist Dabu Hand-Block', 'Screen Print', 'Machine/Digital Print', 'Unknown')),
    dye_type TEXT NOT NULL CHECK (dye_type IN ('100% Natural Vegetable Dye', 'Alizarin & Harda Mineral', 'Synthetic Pigment Dye', 'Mixed Dyes', 'Unknown')),
    fabric_composition TEXT NOT NULL DEFAULT '100% Pure Mul Cotton',
    verification_status TEXT NOT NULL DEFAULT 'PARTIALLY_VERIFIED' CHECK (
        verification_status IN ('VERIFIED', 'PARTIALLY_VERIFIED', 'UNVERIFIED', 'UNDER_INVESTIGATION', 'CONFIRMED_MISREPRESENTATION')
    ),
    retail_price_inr NUMERIC(10, 2) NOT NULL,
    image_url TEXT NOT NULL,
    is_demo BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 5. Seven-Layer Authenticity Scorecard (AEF)
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

-- 6. "Know Your Craft Price" Transparency Breakdown
CREATE TABLE IF NOT EXISTS public.price_disclosures (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE UNIQUE,
    fabric_raw_cost_inr NUMERIC(10, 2) NOT NULL,
    artisan_labor_inr NUMERIC(10, 2) NOT NULL,
    printing_block_charge_inr NUMERIC(10, 2) NOT NULL,
    washing_finishing_inr NUMERIC(10, 2) NOT NULL,
    packaging_logistics_inr NUMERIC(10, 2) NOT NULL,
    retail_fair_margin_inr NUMERIC(10, 2) NOT NULL,
    is_audited BOOLEAN NOT NULL DEFAULT false,
    audit_notes TEXT
);

-- 7. Evidenced Production Journey
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

-- 8. QR Codes & Duplication Anomaly Detection
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

-- 9. QR Scan Logs (For Anomaly Analytics)
CREATE TABLE IF NOT EXISTS public.qr_scan_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    qr_record_id UUID REFERENCES public.qr_records(id) ON DELETE CASCADE,
    product_code TEXT NOT NULL,
    scanned_from_city TEXT DEFAULT 'Jaipur',
    device_type TEXT DEFAULT 'Mobile Web',
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 10. Immutable Audit Trail
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

-- 11. Consumer Complaints
CREATE TABLE IF NOT EXISTS public.consumer_complaints (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    complaint_ref_no TEXT UNIQUE NOT NULL,
    product_code TEXT NOT NULL,
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

-- 12. Ph.D. Consumer Perception & WTP Research Surveys
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

-- 13. Enable Row Level Security (RLS)
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
