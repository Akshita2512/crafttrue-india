import { CraftProduct, ConsumerComplaint, AuditLog, ResearchSurveyResponse } from '@/lib/types';

export const DEMO_PRODUCTS: CraftProduct[] = [
  // 1. PRODUCT A: Fully Verified Bagru Dabu Mud-Resist
  {
    id: 'bbbbbbbb-1111-1111-1111-111111111111',
    product_code: 'CTI-BAG-000184',
    name: 'Authentic Bagru Dabu Mud-Resist Indigo Cotton Dupatta',
    title_hi: 'प्रामाणिक बागरू डाबू मड-रेसिस्ट नील दुपट्टा',
    cluster: 'Bagru',
    category: 'Textile',
    description: 'Authentic hand-block printed dupatta using traditional clay (Dabu) mud-resist and submerged 6 times in ancestral fermented indigo vats. Printed by generational Chhipa artisans in Bagru, Rajasthan.',
    artisan_workshop: {
      id: 'aaaaaaaa-1111-1111-1111-111111111111',
      artisan_name: 'Mohan Lal Chhipa',
      workshop_name: 'Chhipa Dabu Parampara Workshop',
      cluster: 'Bagru',
      location_address: 'Chhipa Mohalla, Sanjharia Road, Bagru, Rajasthan 303007',
      lineage_or_caste: '5th Generation Traditional Chhipa Printer',
      experience_years: 34,
      gi_authorized_user_no: 'AU/8912/GI/BAGRU',
      gi_status: 'Verified',
      bio: 'Mohan Lal is a 5th-generation master craftsperson dedicated to preserving natural indigo vats and traditional Dabu (clay and gum resist) techniques native to Bagru.',
      image_url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80',
      consent_obtained: true
    },
    weaving_method: 'Handloom',
    printing_technique: 'Mud-Resist Dabu Hand-Block',
    dye_type: '100% Natural Vegetable Dye',
    fabric_composition: '100% Handloom Cotton (Fine 60s Count)',
    verification_status: 'VERIFIED',
    retail_price_inr: 2450.00,
    image_url: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=800&q=80',
    is_demo: true,
    total_scans: 14,
    has_duplication_anomaly: false,
    scorecard: {
      geo_status: 'Verified',
      geo_evidence: 'GPS geo-tagged workshop audit in Sanjharia Road, Bagru.',
      artisan_status: 'Verified',
      artisan_evidence: 'Aadhaar e-KYC and Artisans Credit Card verified with Chhipa lineage records.',
      process_status: 'Verified',
      process_evidence: 'Physical video audit of Dabu mud printing and wooden block strike impressions.',
      material_status: 'Verified',
      material_evidence: 'Independent test report confirms zero synthetic azo dyes; Indigofera tinctoria present.',
      gi_layer_status: 'Verified',
      gi_evidence: 'GI Authorised User No: AU/8912/GI/BAGRU recorded in official registry.',
      supply_chain_status: 'Verified',
      supply_chain_evidence: 'Complete batch records from local weavers cluster to Bagru river washing.',
      commercial_claim_status: 'Verified',
      commercial_claim_evidence: 'Product claims 100% matched documented batch evidence.',
      last_verified_at: '2026-10-20',
      verifier_remarks: 'Exemplary authentic specimen. Full conformity with Bagru GI specification.'
    },
    price_disclosure: {
      fabric_raw_cost_inr: 480.00,
      artisan_labor_inr: 720.00,
      printing_block_charge_inr: 310.00,
      washing_finishing_inr: 240.00,
      packaging_logistics_inr: 180.00,
      retail_fair_margin_inr: 520.00,
      is_audited: true,
      audit_notes: 'Audited on-site: 45% of total retail price reaches artisan community.'
    },
    production_stages: [
      {
        stage_order: 1,
        stage_name: 'Harda (Myrobalan) Pre-Treatment',
        description: 'Raw cotton soaked in natural Harda paste to impart light yellow tannic base for dye bonding.',
        date_completed: '2026-10-02',
        is_evidenced: true
      },
      {
        stage_order: 2,
        stage_name: 'Rekh (Outline) Block Printing',
        description: 'Master printer strikes teak-wood outline block with iron-ferment (Syahi) black ink.',
        date_completed: '2026-10-05',
        is_evidenced: true
      },
      {
        stage_order: 3,
        stage_name: 'Dabu Clay Mud Resist Application',
        description: 'Thick mud resist made of black clay, Bidhan gum, and lime applied with Datta wooden blocks.',
        date_completed: '2026-10-08',
        is_evidenced: true
      },
      {
        stage_order: 4,
        stage_name: 'Ancestral Indigo Vat Submersion',
        description: 'Fabric submerged 6 successive times into underground fermented natural indigo pits.',
        date_completed: '2026-10-12',
        is_evidenced: true
      },
      {
        stage_order: 5,
        stage_name: 'River Washing & Sun Baking',
        description: 'Dabu clay washed off in flowing water to reveal crisp white resist motifs against deep indigo.',
        date_completed: '2026-10-15',
        is_evidenced: true
      }
    ]
  },

  // 2. PRODUCT B: Partially Verified Sanganeri Floral (Mill Fabric & Pigment Dyes)
  {
    id: 'bbbbbbbb-2222-2222-2222-222222222222',
    product_code: 'CTI-SAN-000291',
    name: 'Sanganeri Floral Fine Mulmul Kurta Fabric (5 Meters)',
    title_hi: 'सांगानेरी फ्लोरल मलमल कुर्ता फैब्रिक',
    cluster: 'Sanganer',
    category: 'Fabric',
    description: 'Hand-block printed in Sanganer with dual-block outline (Rekh) and filler (Datta). Produced on mill-spun fine mulmul using modern eco-friendly synthetic pigment dyes.',
    artisan_workshop: {
      id: 'aaaaaaaa-2222-2222-2222-222222222222',
      artisan_name: 'Ramswaroop Derawala',
      workshop_name: 'Derawala Sanganeri Fine Block Prints',
      cluster: 'Sanganer',
      location_address: 'Near Sanganer Fort, Sanganer, Jaipur, Rajasthan 302029',
      lineage_or_caste: 'Traditional Sanganer Block Printer Lineage',
      experience_years: 26,
      gi_authorized_user_no: 'AU/6721/GI/SANGANER',
      gi_status: 'Verified',
      bio: 'Specializes in delicate curvilinear bootas, bel vines, and fine floral prints that define classic Sanganeri hand-block aesthetics on crisp mulmul fabric.',
      image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
      consent_obtained: true
    },
    weaving_method: 'Mill-Made',
    printing_technique: 'Traditional Hand-Block',
    dye_type: 'Synthetic Pigment Dye',
    fabric_composition: '100% Mill-Made Cotton Mulmul',
    verification_status: 'PARTIALLY_VERIFIED',
    retail_price_inr: 1850.00,
    image_url: 'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=800&q=80',
    is_demo: true,
    total_scans: 8,
    has_duplication_anomaly: false,
    scorecard: {
      geo_status: 'Verified',
      geo_evidence: 'Printed within Sanganer municipality workshop boundaries.',
      artisan_status: 'Verified',
      artisan_evidence: 'Workshop of Ramswaroop Derawala inspected and registered.',
      process_status: 'Verified',
      process_evidence: 'Hand-block printing verified with traditional Rekh and Datta dual blocks.',
      material_status: 'Documented',
      material_evidence: 'Fabric is 100% cotton mulmul but mill-made. Modern pigment dyes declared truthfully.',
      gi_layer_status: 'Verified',
      gi_evidence: 'Sanganer Hand-Block Printing GI Authorised User AU/6721/GI/SANGANER.',
      supply_chain_status: 'Documented',
      supply_chain_evidence: 'Mill fabric purchase invoice documented; artisan printing batch verified.',
      commercial_claim_status: 'Verified',
      commercial_claim_evidence: 'Seller transparently discloses mill fabric and pigment dye without false claims.',
      last_verified_at: '2026-10-18',
      verifier_remarks: 'Partially verified: Hand-block process & origin are 100% authentic; fabric is mill-spun and dyes are pigment (not natural vegetable dye).'
    },
    price_disclosure: {
      fabric_raw_cost_inr: 450.00,
      artisan_labor_inr: 500.00,
      printing_block_charge_inr: 220.00,
      washing_finishing_inr: 160.00,
      packaging_logistics_inr: 140.00,
      retail_fair_margin_inr: 380.00,
      is_audited: true,
      audit_notes: 'Producer declared price with mill fabric cost verified by invoice.'
    },
    production_stages: [
      {
        stage_order: 1,
        stage_name: 'Mill Mulmul Bleaching & Washing',
        description: 'Mill-spun 60s mulmul fabric desized and ironed flat for precision block registration.',
        date_completed: '2026-10-06',
        is_evidenced: true
      },
      {
        stage_order: 2,
        stage_name: 'Rekh (Black Line) Hand-Block Printing',
        description: 'Hand-carved Sheesham wood outline blocks pressed manually on padded print tables.',
        date_completed: '2026-10-09',
        is_evidenced: true
      },
      {
        stage_order: 3,
        stage_name: 'Datta (Color Filler) Block Printing',
        description: 'Multi-color pigment fill stamped with secondary carved block sets.',
        date_completed: '2026-10-11',
        is_evidenced: true
      }
    ]
  },

  // 3. PRODUCT C: Craftwashed / Screen Print Imitation (Confirmed Misrepresentation)
  {
    id: 'bbbbbbbb-3333-3333-3333-333333333333',
    product_code: 'CTI-MIS-000305',
    name: 'Jaipur "Heritage Traditional" Printed Stole (Screen Print)',
    title_hi: 'जयपुर "पारंपरिक" प्रिंटेड दुपट्टा (अपुष्ट)',
    cluster: 'Bagru',
    category: 'Apparel',
    description: 'Purchased from an urban trade fair stall claiming "100% Bagru Hand-block Pure Natural Dye". Visual audit reveals mechanical rotary screen print with zero Dabu cracking and synthetic surface azo dyes.',
    artisan_workshop: undefined,
    weaving_method: 'Powerloom',
    printing_technique: 'Screen Print',
    dye_type: 'Mixed Dyes',
    fabric_composition: 'Poly-Cotton Blend (Powerloom)',
    verification_status: 'CONFIRMED_MISREPRESENTATION',
    retail_price_inr: 1200.00,
    image_url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    is_demo: true,
    total_scans: 2,
    has_duplication_anomaly: false,
    scorecard: {
      geo_status: 'Not Established',
      geo_evidence: 'No traceable workshop in Bagru; produced in an industrial textile mill outside Jaipur.',
      artisan_status: 'Not Established',
      artisan_evidence: 'No traditional artisan involved; machine run production.',
      process_status: 'Contradicted',
      process_evidence: 'Claimed "Traditional Hand-Block"; microscopic inspection proves continuous flatbed screen print.',
      material_status: 'Contradicted',
      material_evidence: 'Claimed "Pure Handloom & Vegetable Dye"; test reveals poly-cotton blend & chemical direct dyes.',
      gi_layer_status: 'Not Established',
      gi_evidence: 'Unauthorized use of "Bagru Hand Block Print" trade mark without GI authorization.',
      supply_chain_status: 'Not Established',
      supply_chain_evidence: 'Zero supply-chain custody records provided.',
      commercial_claim_status: 'Contradicted',
      commercial_claim_evidence: 'Seller marketed product as ancestral handmade Bagru craft at ₹1,200. Clear craftwashing violation.',
      last_verified_at: '2026-10-15',
      verifier_remarks: 'Confirmed Craftwashing: Rotary screen print falsely labeled as GI-protected Bagru hand-block craft.'
    },
    price_disclosure: {
      fabric_raw_cost_inr: 120.00,
      artisan_labor_inr: 40.00,
      printing_block_charge_inr: 60.00,
      washing_finishing_inr: 30.00,
      packaging_logistics_inr: 50.00,
      retail_fair_margin_inr: 900.00,
      is_audited: false,
      audit_notes: 'Unverified seller breakdown. Estimated mass-production mill cost ₹250 sold at inflated ₹1,200 price.'
    },
    production_stages: []
  },

  // 4. PRODUCT D: Suspicious Cloned QR Code Alert
  {
    id: 'bbbbbbbb-4444-4444-4444-444444444444',
    product_code: 'CTI-DUP-000412',
    name: 'Bagru Motif Block Table Runner (Suspected Cloned QR)',
    title_hi: 'बागरू मोटिफ ब्लॉक टेबल रनर (संदिग्ध लेबल)',
    cluster: 'Bagru',
    category: 'Home Furnishing',
    description: 'Original product was registered by an authentic workshop, but physical QR label has been cloned and detected in multiple retail locations simultaneously.',
    artisan_workshop: {
      id: 'aaaaaaaa-1111-1111-1111-111111111111',
      artisan_name: 'Mohan Lal Chhipa',
      workshop_name: 'Chhipa Dabu Parampara Workshop',
      cluster: 'Bagru',
      location_address: 'Chhipa Mohalla, Sanjharia Road, Bagru, Rajasthan 303007',
      lineage_or_caste: '5th Generation Traditional Chhipa Printer',
      experience_years: 34,
      gi_authorized_user_no: 'AU/8912/GI/BAGRU',
      gi_status: 'Verified',
      bio: 'Mohan Lal is a 5th-generation master craftsperson dedicated to preserving natural indigo vats and traditional Dabu techniques.',
      image_url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80',
      consent_obtained: true
    },
    weaving_method: 'Handloom',
    printing_technique: 'Traditional Hand-Block',
    dye_type: 'Alizarin & Harda Mineral',
    fabric_composition: 'Heavy Handloom Cotton',
    verification_status: 'UNDER_INVESTIGATION',
    retail_price_inr: 1400.00,
    image_url: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
    is_demo: true,
    total_scans: 38,
    has_duplication_anomaly: true,
    anomaly_reason: 'CRITICAL SECURITY ALERT: 28 scans detected across New Delhi, Mumbai, and Bengaluru within a 45-minute window. Probable cloned or photocopied label.',
    scorecard: {
      geo_status: 'Verified',
      geo_evidence: 'Original item originated from authentic Chhipa workshop.',
      artisan_status: 'Verified',
      artisan_evidence: 'Artisan identity authenticated.',
      process_status: 'Verified',
      process_evidence: 'Hand-block printing process validated.',
      material_status: 'Verified',
      material_evidence: 'Mineral and vegetable dyes validated.',
      gi_layer_status: 'Verified',
      gi_evidence: 'GI authorization valid.',
      supply_chain_status: 'Under Review',
      supply_chain_evidence: 'Physical tag integrity under dispute due to multiple simultaneous scans.',
      commercial_claim_status: 'Not Established',
      commercial_claim_evidence: 'Investigating whether retailer replicated label onto unverified inventory.',
      last_verified_at: '2026-10-22',
      verifier_remarks: 'Physical QR duplication anomaly triggered. Investigation ongoing with retailer.'
    },
    price_disclosure: {
      fabric_raw_cost_inr: 320.00,
      artisan_labor_inr: 410.00,
      printing_block_charge_inr: 180.00,
      washing_finishing_inr: 130.00,
      packaging_logistics_inr: 110.00,
      retail_fair_margin_inr: 250.00,
      is_audited: true,
      audit_notes: 'Under administrative review due to label integrity issue.'
    },
    production_stages: []
  }
];

export const DEMO_COMPLAINTS: ConsumerComplaint[] = [
  {
    id: 'c1',
    complaint_ref_no: 'CMP-2026-104',
    product_code: 'CTI-MIS-000305',
    complaint_category: 'Suspected Machine/Screen Print Imitation',
    description: 'Bought at Delhi Haat stall #42. Seller insisted it was pure Bagru hand-block natural dye, but back of fabric is completely white and motifs have zero registration variation.',
    status: 'Resolved',
    resolution_notes: 'Investigated and confirmed as machine screen print. Product record marked as Confirmed Misrepresentation.',
    created_at: '2026-10-14'
  },
  {
    id: 'c2',
    complaint_ref_no: 'CMP-2026-108',
    product_code: 'CTI-DUP-000412',
    complaint_category: 'Copied or Duplicate QR Label',
    description: 'Saw this exact tag on 15 different table runners in an upscale lifestyle shop in Connaught Place.',
    status: 'Under Investigation',
    resolution_notes: 'Assigned to field inspector in Delhi.',
    created_at: '2026-10-21'
  }
];

export const DEMO_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'l1',
    product_id: 'bbbbbbbb-1111-1111-1111-111111111111',
    action: 'STATUS_CHANGE',
    previous_state: 'PARTIALLY_VERIFIED',
    new_state: 'VERIFIED',
    performed_by: 'Dr. Alok Verma (Independent Verifier)',
    justification: 'Full conformity verified with on-site Bagru GI registry and laboratory dye analysis.',
    created_at: '2026-10-20 14:30'
  },
  {
    id: 'l2',
    product_id: 'bbbbbbbb-2222-2222-2222-222222222222',
    action: 'SCORECARD_UPDATE',
    previous_state: 'UNDER_REVIEW',
    new_state: 'PARTIALLY_VERIFIED',
    performed_by: 'Dr. Alok Verma (Independent Verifier)',
    justification: 'Hand-block technique verified; updated material layer to document mill-made cotton and pigment dye transparently.',
    created_at: '2026-10-18 11:15'
  },
  {
    id: 'l3',
    product_id: 'bbbbbbbb-3333-3333-3333-333333333333',
    action: 'STATUS_CHANGE',
    previous_state: 'UNVERIFIED',
    new_state: 'CONFIRMED_MISREPRESENTATION',
    performed_by: 'Dr. Alok Verma (Independent Verifier)',
    justification: 'Fabric audit confirmed rotary screen print on poly-blend with false GI claim. Flagged as craftwashed.',
    created_at: '2026-10-15 16:45'
  },
  {
    id: 'l4',
    product_id: 'bbbbbbbb-4444-4444-4444-444444444444',
    action: 'STATUS_CHANGE',
    previous_state: 'VERIFIED',
    new_state: 'UNDER_INVESTIGATION',
    performed_by: 'Security Engine Automated Alert',
    justification: 'Anomaly threshold exceeded: 28 duplicate scans detected across geographically distant regions.',
    created_at: '2026-10-22 09:20'
  }
];

export const DEMO_SURVEYS: ResearchSurveyResponse[] = [
  {
    product_code: 'CTI-BAG-000184',
    verification_status_seen: 'VERIFIED',
    understanding_of_authenticity: 5,
    perceived_transparency: 5,
    trust_in_evidence: 5,
    willingness_to_pay_inr: 2600.00,
    prior_block_print_knowledge: 'Moderate',
    feedback_notes: 'Seeing the artisan name and the 6-step indigo vat timeline gave me complete confidence to pay ₹2500+ without bargaining.',
    consent_given: true,
    created_at: '2026-10-20'
  },
  {
    product_code: 'CTI-BAG-000184',
    verification_status_seen: 'VERIFIED',
    understanding_of_authenticity: 5,
    perceived_transparency: 5,
    trust_in_evidence: 5,
    willingness_to_pay_inr: 2800.00,
    prior_block_print_knowledge: 'Novice',
    feedback_notes: 'I had no idea handloom weaving and block printing were separate things. The scorecard made it crystal clear.',
    consent_given: true,
    created_at: '2026-10-21'
  },
  {
    product_code: 'CTI-SAN-000291',
    verification_status_seen: 'PARTIALLY_VERIFIED',
    understanding_of_authenticity: 4,
    perceived_transparency: 5,
    trust_in_evidence: 4,
    willingness_to_pay_inr: 1800.00,
    prior_block_print_knowledge: 'Expert Connoisseur',
    feedback_notes: 'Appreciated the honesty that it uses mill cotton mulmul and pigment dyes. Transparency is better than fake 100% claims.',
    consent_given: true,
    created_at: '2026-10-19'
  },
  {
    product_code: 'CTI-MIS-000305',
    verification_status_seen: 'CONFIRMED_MISREPRESENTATION',
    understanding_of_authenticity: 5,
    perceived_transparency: 5,
    trust_in_evidence: 5,
    willingness_to_pay_inr: 300.00,
    prior_block_print_knowledge: 'Moderate',
    feedback_notes: 'Saved me from paying ₹1200 for a screen print! This app is desperately needed at craft exhibitions.',
    consent_given: true,
    created_at: '2026-10-16'
  }
];

export function getProductByCode(code: string): CraftProduct | undefined {
  return DEMO_PRODUCTS.find(p => p.product_code.toUpperCase() === code.trim().toUpperCase());
}
