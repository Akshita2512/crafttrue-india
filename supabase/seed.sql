-- ====================================================================
-- CRAFTTRUE INDIA - SEED DATA
-- Pre-populates Master Artisans and Tested Products for Bagru & Sanganer
-- ====================================================================

-- Clear existing data
TRUNCATE TABLE public.research_surveys CASCADE;
TRUNCATE TABLE public.consumer_complaints CASCADE;
TRUNCATE TABLE public.audit_logs CASCADE;
TRUNCATE TABLE public.qr_scan_logs CASCADE;
TRUNCATE TABLE public.qr_records CASCADE;
TRUNCATE TABLE public.production_stages CASCADE;
TRUNCATE TABLE public.price_disclosures CASCADE;
TRUNCATE TABLE public.verification_scorecards CASCADE;
TRUNCATE TABLE public.products CASCADE;
TRUNCATE TABLE public.artisan_workshops CASCADE;
TRUNCATE TABLE public.profiles CASCADE;

-- 1. Demo User Profiles (Consumers, Artisans, Verifiers)
INSERT INTO public.profiles (id, email, phone, full_name, role, cluster, pehchan_id, workshop_name, is_verified_artisan) VALUES
(
    '11111111-1111-1111-1111-111111111111', 
    'buyer@crafttrue.in', 
    '+91 98765 43210', 
    'Ananya Sharma (Conscious Patron)', 
    'consumer', 
    NULL, 
    NULL, 
    NULL, 
    false
),
(
    '22222222-2222-2222-2222-222222222222', 
    'lalchand@bagruprint.in', 
    '+91 94140 12345', 
    'Lalchand ''Chippa'' Derawala', 
    'artisan', 
    'Bagru', 
    'NRJPC241207', 
    'Lalchand Chippa Heritage Workshop', 
    true
),
(
    '33333333-3333-3333-3333-333333333333', 
    'brijballabh@sanganerprint.in', 
    '+91 98290 54321', 
    'Brij Ballabh Udaiwal', 
    'artisan', 
    'Sanganer', 
    'NRJPC241208', 
    'Shilpi Sansthan Craft Studio', 
    true
),
(
    '44444444-4444-4444-4444-444444444444', 
    'verifier@crafttrue.in', 
    '+91 98110 99887', 
    'Dr. Alok Verma (Lead Independent Verifier)', 
    'admin', 
    NULL, 
    NULL, 
    NULL, 
    false
);

-- 2. Master Artisan Workshops
INSERT INTO public.artisan_workshops (id, user_id, artisan_name, workshop_name, cluster, location_address, lineage_or_caste, experience_years, gi_authorized_user_no, gi_status, bio, image_url, consent_obtained, total_earnings_inr) VALUES
(
    'aaaaaaaa-1111-1111-1111-111111111111',
    '22222222-2222-2222-2222-222222222222',
    'Lalchand ''Chippa'' Derawala',
    'Lalchand Chippa Heritage Workshop',
    'Bagru',
    'Laxmi Nath Chowk, Bagru, Jaipur, Rajasthan 303007',
    'Traditional Chhipa Community (Over a Century of Family Heritage)',
    36,
    'GI-183-AU-BAGRU-019',
    'Verified',
    'National Award Winner (1999) and National Merit Awardee (2011). Master of traditional fadat, dabu mud-resist, and natural indigo fermentation vats.',
    '/images/textiles/bagru-village-printing.jpg',
    true,
    142500.00
),
(
    'aaaaaaaa-2222-2222-2222-222222222222',
    '33333333-3333-3333-3333-333333333333',
    'Brij Ballabh Udaiwal',
    'Shilpi Sansthan Craft Studio',
    'Sanganer',
    '6/46 Near Siliberi, Sanganer, Jaipur, Rajasthan 302029',
    'Traditional Chhipa Textile Dyers (Sanganer)',
    34,
    'GI-147-AU-SGR-042',
    'Verified',
    'National Awardee (1991). Founder of Shilpi Sansthan NGO, supporting over 85 printing units. Pioneer of fine floral boota stamping on sparkling white river-washed cottons.',
    '/images/textiles/hand-printing-process.jpg',
    true,
    168200.00
);

-- 3. Master Products Catalog
INSERT INTO public.products (id, product_code, name, title_hi, cluster, category, description, artisan_workshop_id, weaving_method, printing_technique, dye_type, fabric_composition, verification_status, retail_price_inr, image_url, is_demo) VALUES
-- Product A: Verified Bagru Dupatta
(
    'bbbbbbbb-1111-1111-1111-111111111111',
    'BAGRU-LCD-F001',
    'Bagru Classic Fadat Hand-Block Cotton Dupatta',
    'बागरू क्लासिक फदत हस्त-ब्लॉक सूती दुपट्टा',
    'Bagru',
    'Textile',
    'Authentic Bagru classic fadat hand-block printed textile on cream harda-mordanted cotton. Printed with hand-carved Rorda wood blocks using syahi (fermented iron) black and madder red.',
    'aaaaaaaa-1111-1111-1111-111111111111',
    'Handloom',
    'Mud-Resist Dabu Hand-Block',
    '100% Natural Vegetable Dye',
    '100% Handloom Cotton (Fine 60s Count)',
    'VERIFIED',
    2850.00,
    '/images/textiles/bagru-fadat.jpg',
    false
),
-- Product B: Verified Sanganeri Mulmul Saree
(
    'bbbbbbbb-2222-2222-2222-222222222222',
    'SGR-BBU-F001',
    'Sanganeri Fine Floral Hand-Block Mulmul Saree',
    'सांगानेरी बारीक फूल बूटियाँ हस्त-ब्लॉक मलमल साड़ी',
    'Sanganer',
    'Textile',
    'Masterwork Sanganeri fine floral block-printed saree on pure white river-washed cotton mulmul with delicate boota and bootie motifs using natural plant extracts.',
    'aaaaaaaa-2222-2222-2222-222222222222',
    'Handloom',
    'Traditional Hand-Block',
    '100% Natural Vegetable Dye',
    '100% Cotton Mulmul (Fine 100s Count)',
    'VERIFIED',
    3450.00,
    '/images/textiles/sanganeri-floral.jpg',
    false
);
