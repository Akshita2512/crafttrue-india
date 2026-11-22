-- ====================================================================
-- CRAFTTRUE INDIA - SEED DATA (PHASE 1 DEMO)
-- DEMO DATA — NOT REAL CERTIFICATION
-- Pre-populates 4 core research scenarios for Bagru & Sanganeri textiles
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

-- 1. Demo Profiles (Valid Hex UUIDs)
INSERT INTO public.profiles (id, email, full_name, role, phone) VALUES
('11111111-1111-1111-1111-111111111111', 'consumer@crafttrue.demo', 'Priya Sharma (Patron)', 'consumer', '+91 98765 43210'),
('22222222-2222-2222-2222-222222222222', 'artisan.bagru@crafttrue.demo', 'Mohan Lal Chhipa (Master Artisan)', 'artisan', '+91 94140 12345'),
('33333333-3333-3333-3333-333333333333', 'artisan.sanganer@crafttrue.demo', 'Ramswaroop Derawala (Sanganer)', 'artisan', '+91 98290 54321'),
('44444444-4444-4444-4444-444444444444', 'admin.verifier@crafttrue.demo', 'Dr. Alok Verma (Independent Verifier)', 'admin', '+91 98110 99887');

-- 2. Artisan Workshops (Bagru & Sanganer Clusters)
INSERT INTO public.artisan_workshops (id, user_id, artisan_name, workshop_name, cluster, location_address, lineage_or_caste, experience_years, gi_authorized_user_no, gi_status, bio, image_url, consent_obtained) VALUES
(
    'aaaaaaaa-1111-1111-1111-111111111111',
    '22222222-2222-2222-2222-222222222222',
    'Mohan Lal Chhipa',
    'Chhipa Dabu Parampara Workshop',
    'Bagru',
    'Chhipa Mohalla, Sanjharia Road, Bagru, Rajasthan 303007',
    '5th Generation Traditional Chhipa Printer',
    34,
    'AU/8912/GI/BAGRU',
    'Verified',
    'Mohan Lal is a 5th-generation master craftsperson dedicated to preserving natural indigo vats and traditional Dabu (clay and gum resist) techniques native to Bagru.',
    'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80',
    true
),
(
    'aaaaaaaa-2222-2222-2222-222222222222',
    '33333333-3333-3333-3333-333333333333',
    'Ramswaroop Derawala',
    'Derawala Sanganeri Fine Block Prints',
    'Sanganer',
    'Near Sanganer Fort, Sanganer, Jaipur, Rajasthan 302029',
    'Traditional Sanganer Block Printer Lineage',
    26,
    'AU/6721/GI/SANGANER',
    'Verified',
    'Specializes in delicate curvilinear bootas, bel vines, and fine floral prints that define classic Sanganeri hand-block aesthetics on crisp mulmul fabric.',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    true
);

-- 3. Products (The 4 Distinct Ph.D. Scenarios)
INSERT INTO public.products (id, product_code, name, title_hi, cluster, category, description, artisan_workshop_id, weaving_method, printing_technique, dye_type, fabric_composition, verification_status, retail_price_inr, image_url, is_demo) VALUES
-- Product A: Authentic Bagru Dabu Dupatta (Fully Verified)
(
    'bbbbbbbb-1111-1111-1111-111111111111',
    'CTI-BAG-000184',
    'Authentic Bagru Dabu Mud-Resist Indigo Cotton Dupatta',
    'प्रामाणिक बागरू डाबू मड-रेसिस्ट नील दुपट्टा',
    'Bagru',
    'Textile',
    'Authentic hand-block printed dupatta using traditional clay (Dabu) mud-resist and submerged 6 times in ancestral fermented indigo vats.',
    'aaaaaaaa-1111-1111-1111-111111111111',
    'Handloom',
    'Mud-Resist Dabu Hand-Block',
    '100% Natural Vegetable Dye',
    '100% Handloom Cotton (Fine 60s Count)',
    'VERIFIED',
    2450.00,
    'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=800&q=80',
    true
),
-- Product B: Sanganeri Floral Fabric (Partially Verified)
(
    'bbbbbbbb-2222-2222-2222-222222222222',
    'CTI-SAN-000291',
    'Sanganeri Floral Fine Mulmul Kurta Fabric (5 Meters)',
    'सांगानेरी फ्लोरल मलमल कुर्ता फैब्रिक',
    'Sanganer',
    'Fabric',
    'Hand-block printed in Sanganer with dual-block outline (Rekh) and filler (Datta). Produced on mill-spun fine mulmul using modern eco-friendly synthetic pigment dyes.',
    'aaaaaaaa-2222-2222-2222-222222222222',
    'Mill-Made',
    'Traditional Hand-Block',
    'Synthetic Pigment Dye',
    '100% Mill-Made Cotton Mulmul',
    'PARTIALLY_VERIFIED',
    1850.00,
    'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=800&q=80',
    true
),
-- Product C: Craftwashed Stash (Unverified / Craftwashed)
(
    'bbbbbbbb-3333-3333-3333-333333333333',
    'CTI-MIS-000305',
    'Jaipur "Heritage Traditional" Printed Silk-Blend Stole',
    'जयपुर "पारंपरिक" प्रिंटेड दुपट्टा (अपुष्ट)',
    'Bagru',
    'Apparel',
    'Purchased from an urban trade fair claiming "100% Bagru Hand-block Pure Natural Dye". Visual audit reveals mechanical rotary screen print with zero Dabu cracking and synthetic surface azo dyes.',
    NULL,
    'Powerloom',
    'Screen Print',
    'Mixed Dyes',
    'Poly-Cotton Blend (Powerloom)',
    'CONFIRMED_MISREPRESENTATION',
    1200.00,
    'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    true
),
-- Product D: Suspicious Duplicate QR Alert
(
    'bbbbbbbb-4444-4444-4444-444444444444',
    'CTI-DUP-000412',
    'Bagru Motif Hand-Block Table Runner',
    'बागरू मोटिफ ब्लॉक टेबल रनर (संदिग्ध लेबल)',
    'Bagru',
    'Home Furnishing',
    'Original product was registered by an authentic workshop, but physical QR label has been cloned and detected in multiple retail locations simultaneously.',
    'aaaaaaaa-1111-1111-1111-111111111111',
    'Handloom',
    'Traditional Hand-Block',
    'Alizarin & Harda Mineral',
    'Heavy Handloom Cotton',
    'UNDER_INVESTIGATION',
    1400.00,
    'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
    true
);

-- 4. Seven-Layer Authenticity Scorecards
INSERT INTO public.verification_scorecards (product_id, geo_status, geo_evidence, artisan_status, artisan_evidence, process_status, process_evidence, material_status, material_evidence, gi_layer_status, gi_evidence, supply_chain_status, supply_chain_evidence, commercial_claim_status, commercial_claim_evidence, verifier_remarks) VALUES
-- Scorecard for Product A (Verified)
(
    'bbbbbbbb-1111-1111-1111-111111111111',
    'Verified', 'GPS geo-tagged workshop audit in Sanjharia Road, Bagru.',
    'Verified', 'Aadhaar e-KYC and Artisans Credit Card verified with Chhipa lineage records.',
    'Verified', 'Physical video audit of Dabu mud printing and wooden block strike impressions.',
    'Verified', 'Independent test report confirms zero synthetic azo dyes; Indigofera tinctoria present.',
    'Verified', 'GI Authorised User No: AU/8912/GI/BAGRU recorded in official registry.',
    'Verified', 'Complete batch records from local weavers cluster to Bagru river washing.',
    'Verified', 'Product claims 100% matched documented batch evidence.',
    'Exemplary authentic specimen. Full conformity with Bagru GI specification.'
),
-- Scorecard for Product B (Partially Verified)
(
    'bbbbbbbb-2222-2222-2222-222222222222',
    'Verified', 'Printed within Sanganer municipality workshop boundaries.',
    'Verified', 'Workshop of Ramswaroop Derawala inspected and registered.',
    'Verified', 'Hand-block printing verified with traditional Rekh and Datta dual blocks.',
    'Documented', 'Fabric is 100% cotton mulmul but mill-made. Modern pigment dyes declared truthfully.',
    'Verified', 'Sanganer Hand-Block Printing GI Authorised User AU/6721/GI/SANGANER.',
    'Documented', 'Mill fabric purchase invoice documented; artisan printing batch verified.',
    'Verified', 'Seller transparently discloses mill fabric and pigment dye without false claims.',
    'Partially verified: Hand-block process & origin are 100% authentic; fabric is mill-spun and dyes are pigment (not natural vegetable dye).'
),
-- Scorecard for Product C (Confirmed Misrepresentation)
(
    'bbbbbbbb-3333-3333-3333-333333333333',
    'Not Established', 'No traceable workshop in Bagru; produced in an industrial textile mill outside Jaipur.',
    'Not Established', 'No traditional artisan involved; machine run production.',
    'Not Established', 'Claimed "Traditional Hand-Block"; microscopic inspection proves continuous flatbed screen print.',
    'Not Established', 'Claimed "Pure Handloom & Vegetable Dye"; test reveals poly-cotton blend & chemical direct dyes.',
    'Not Established', 'Unauthorized use of "Bagru Hand Block Print" trade mark without GI authorization.',
    'Not Established', 'Zero supply-chain custody records provided.',
    'Contradicted', 'Seller marketed product as ancestral handmade Bagru craft at ₹1,200. Clear craftwashing violation.',
    'Confirmed Craftwashing: Rotary screen print falsely labeled as GI-protected Bagru hand-block craft.'
),
-- Scorecard for Product D (Under Investigation)
(
    'bbbbbbbb-4444-4444-4444-444444444444',
    'Verified', 'Original item originated from authentic Chhipa workshop.',
    'Verified', 'Artisan identity authenticated.',
    'Verified', 'Hand-block printing process validated.',
    'Verified', 'Mineral and vegetable dyes validated.',
    'Verified', 'GI authorization valid.',
    'Under Review', 'Physical tag integrity under dispute due to multiple simultaneous scans.',
    'Not Established', 'Investigating whether retailer replicated label onto unverified inventory.',
    'Physical QR duplication anomaly triggered. Investigation ongoing with retailer.'
);

-- 5. "Know Your Craft Price" Transparency Breakdown
INSERT INTO public.price_disclosures (product_id, fabric_raw_cost_inr, artisan_labor_inr, printing_block_charge_inr, washing_finishing_inr, packaging_logistics_inr, retail_fair_margin_inr, is_audited, audit_notes) VALUES
('bbbbbbbb-1111-1111-1111-111111111111', 480.00, 720.00, 310.00, 240.00, 180.00, 520.00, true, 'Audited on-site: 45% of total retail price reaches artisan community.'),
('bbbbbbbb-2222-2222-2222-222222222222', 450.00, 500.00, 220.00, 160.00, 140.00, 380.00, true, 'Producer declared price with mill fabric cost verified by invoice.'),
('bbbbbbbb-3333-3333-3333-333333333333', 120.00, 40.00, 60.00, 30.00, 50.00, 900.00, false, 'Unverified seller breakdown. Estimated mass-production mill cost ₹250 sold at ₹1,200.'),
('bbbbbbbb-4444-4444-4444-444444444444', 320.00, 410.00, 180.00, 130.00, 110.00, 250.00, true, 'Under administrative review.');

-- 6. Production Stages
INSERT INTO public.production_stages (product_id, stage_order, stage_name, description, date_completed, evidence_image_url, is_evidenced) VALUES
('bbbbbbbb-1111-1111-1111-111111111111', 1, 'Harda (Myrobalan) Pre-Treatment', 'Raw cotton soaked in natural Harda paste to impart light yellow tannic base for dye bonding.', '2026-10-02', 'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=400&q=80', true),
('bbbbbbbb-1111-1111-1111-111111111111', 2, 'Rekh (Outline) Block Printing', 'Master printer strikes teak-wood outline block with iron-ferment (Syahi) black ink.', '2026-10-05', 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=400&q=80', true),
('bbbbbbbb-1111-1111-1111-111111111111', 3, 'Dabu Clay Mud Resist Application', 'Thick mud resist made of black clay, Bidhan gum, and lime applied with Datta wooden blocks.', '2026-10-08', 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=400&q=80', true),
('bbbbbbbb-1111-1111-1111-111111111111', 4, 'Ancestral Indigo Vat Submersion', 'Fabric submerged 6 successive times into underground fermented natural indigo pits.', '2026-10-12', 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=400&q=80', true),
('bbbbbbbb-1111-1111-1111-111111111111', 5, 'River Washing & Sun Baking', 'Dabu clay washed off in flowing water to reveal crisp white resist motifs against deep indigo.', '2026-10-15', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80', true);

-- 7. QR Records & Duplication Anomaly Data
INSERT INTO public.qr_records (id, product_id, qr_code_payload, is_active, total_scans, has_duplication_anomaly, anomaly_reason) VALUES
('cccccccc-1111-1111-1111-111111111111', 'bbbbbbbb-1111-1111-1111-111111111111', 'https://crafttrue.in/verify/CTI-BAG-000184', true, 14, false, NULL),
('cccccccc-2222-2222-2222-222222222222', 'bbbbbbbb-2222-2222-2222-222222222222', 'https://crafttrue.in/verify/CTI-SAN-000291', true, 8, false, NULL),
('cccccccc-3333-3333-3333-333333333333', 'bbbbbbbb-3333-3333-3333-333333333333', 'https://crafttrue.in/verify/CTI-MIS-000305', true, 2, false, NULL),
('cccccccc-4444-4444-4444-444444444444', 'bbbbbbbb-4444-4444-4444-444444444444', 'https://crafttrue.in/verify/CTI-DUP-000412', true, 38, true, 'CRITICAL ALERT: 28 scans detected across New Delhi, Mumbai, and Bengaluru within a 45-minute window. Probable cloned label.');

-- 8. Audit Logs
INSERT INTO public.audit_logs (product_id, action, previous_state, new_state, performed_by, justification) VALUES
('bbbbbbbb-1111-1111-1111-111111111111', 'STATUS_CHANGE', 'PARTIALLY_VERIFIED', 'VERIFIED', 'Dr. Alok Verma (Independent Verifier)', 'Full conformity verified with on-site Bagru GI registry and laboratory dye analysis.'),
('bbbbbbbb-2222-2222-2222-222222222222', 'SCORECARD_UPDATE', 'UNDER_REVIEW', 'PARTIALLY_VERIFIED', 'Dr. Alok Verma (Independent Verifier)', 'Hand-block technique verified; updated material layer to document mill-made cotton and pigment dye transparently.'),
('bbbbbbbb-3333-3333-3333-333333333333', 'STATUS_CHANGE', 'UNVERIFIED', 'CONFIRMED_MISREPRESENTATION', 'Dr. Alok Verma (Independent Verifier)', 'Fabric audit confirmed rotary screen print on poly-blend with false GI claim. Flagged as craftwashed.'),
('bbbbbbbb-4444-4444-4444-444444444444', 'STATUS_CHANGE', 'VERIFIED', 'UNDER_INVESTIGATION', 'Security Engine Automated Alert', 'Anomaly threshold exceeded: 28 duplicate scans detected across geographically distant regions.');

-- 9. Consumer Complaints Sample
INSERT INTO public.consumer_complaints (complaint_ref_no, product_code, complaint_category, description, status, resolution_notes) VALUES
('CMP-2026-104', 'CTI-MIS-000305', 'Suspected Machine/Screen Print Imitation', 'Bought at Delhi Haat stall #42. Seller insisted it was pure Bagru hand-block natural dye, but back of fabric is completely white and motifs have zero registration variation.', 'Resolved', 'Investigated and confirmed as machine screen print. Product record marked as Confirmed Misrepresentation.'),
('CMP-2026-108', 'CTI-DUP-000412', 'Copied or Duplicate QR Label', 'Saw this exact tag on 15 different table runners in an upscale lifestyle shop in Connaught Place.', 'Under Investigation', 'Assigned to field inspector in Delhi.');

-- 10. Ph.D. Research Survey Initial Responses
INSERT INTO public.research_surveys (product_code, verification_status_seen, understanding_of_authenticity, perceived_transparency, trust_in_evidence, willingness_to_pay_inr, prior_block_print_knowledge, feedback_notes) VALUES
('CTI-BAG-000184', 'VERIFIED', 5, 5, 5, 2600.00, 'Moderate', 'Seeing the artisan name and the 6-step indigo vat timeline gave me complete confidence to pay ₹2500+ without bargaining.'),
('CTI-BAG-000184', 'VERIFIED', 5, 5, 5, 2800.00, 'Novice', 'I had no idea handloom weaving and block printing were separate things. The scorecard made it crystal clear.'),
('CTI-SAN-000291', 'PARTIALLY_VERIFIED', 4, 5, 4, 1800.00, 'Expert Connoisseur', 'Appreciated the honesty that it uses mill cotton mulmul and pigment dyes. Transparency is better than fake 100% claims.'),
('CTI-MIS-000305', 'CONFIRMED_MISREPRESENTATION', 5, 5, 5, 300.00, 'Moderate', 'Saved me from paying ₹1200 for a screen print! This app is desperately needed at craft exhibitions.');
