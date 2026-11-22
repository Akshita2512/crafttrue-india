import { CraftProduct, ConsumerComplaint, AuditLog, ResearchSurveyResponse } from '@/lib/types';

export const DEMO_PRODUCTS: CraftProduct[] = [
  // 1. PRODUCT A: Fully Verified Bagru Dabu Mud-Resist by Master Lalchand Derawala
  {
    id: 'bbbbbbbb-1111-1111-1111-111111111111',
    product_code: 'BAGRU-LCD-F001',
    name: 'Bagru Classic Fadat Hand-Block Cotton Dupatta',
    title_hi: 'बागरू क्लासिक फदत हस्त-ब्लॉक सूती दुपट्टा',
    cluster: 'Bagru',
    category: 'Textile',
    description: 'Authentic Bagru classic fadat hand-block printed textile on cream harda-mordanted cotton. Printed with hand-carved Rorda wood blocks using syahi (fermented iron-jaggery) black and madder red (fitkari & lal mitti), dried under the open Rajasthan sun.',
    artisan_workshop: {
      id: 'aaaaaaaa-1111-1111-1111-111111111111',
      artisan_name: "Lalchand 'Chippa' Derawala",
      workshop_name: 'Lalchand Chippa Heritage Workshop',
      cluster: 'Bagru',
      location_address: 'Laxmi Nath Chowk, Bagru, Jaipur, Rajasthan 303007',
      lineage_or_caste: 'Traditional Chhipa Community (Over a Century of Family Heritage)',
      experience_years: 36,
      gi_authorized_user_no: 'GI-183-AU-BAGRU-019',
      gi_status: 'Verified',
      bio: 'National Award Winner (1999) and National Merit Awardee (2011). Master of traditional fadat and dabu printing, master instructor who has conducted hand-block printing demonstrations globally (Germany, Italy, South Korea).',
      image_url: '/images/textiles/bagru-village-printing.jpg',
      consent_obtained: true
    },
    weaving_method: 'Handloom',
    printing_technique: 'Mud-Resist Dabu Hand-Block',
    dye_type: '100% Natural Vegetable Dye',
    fabric_composition: '100% Handloom Cotton (Fine 60s Count Kora Base)',
    verification_status: 'VERIFIED',
    retail_price_inr: 2850.00,
    image_url: '/images/textiles/bagru-fadat.jpg',
    is_demo: true,
    total_scans: 28,
    has_duplication_anomaly: false,
    scorecard: {
      geo_status: 'Verified',
      geo_evidence: 'GPS geo-tagged workshop audit at Laxmi Nath Chowk, Bagru cluster, Jaipur district.',
      artisan_status: 'Verified',
      artisan_evidence: 'National Award (1999) certificate, Paramparik Karigar affiliation, and Chhipa community registry validated.',
      process_status: 'Verified',
      process_evidence: 'Physical audit of multi-block stamping: Rekh (outline) and Datta (fill) with natural harda mordanting.',
      material_status: 'Verified',
      material_evidence: 'Laboratory TLC test confirms zero synthetic azo dyes; Indigofera tinctoria, Alum, and Harda detected.',
      gi_layer_status: 'Verified',
      gi_evidence: 'Registered under Bagru Hand Block Print, GI Application No. 183 (Registered May 11, 2011).',
      supply_chain_status: 'Verified',
      supply_chain_evidence: 'Batch register Lot #LCD-2026-F01 traced from base cotton procurement to river washing in Chhipa mohalla.',
      commercial_claim_status: 'Verified',
      commercial_claim_evidence: '100% natural vegetable dye and hand-block claims conform fully to documented production evidence.',
      last_verified_at: '2026-11-10',
      verifier_remarks: 'Exemplary authentic Bagru specimen. Outstanding registration precision while retaining authentic handcrafted micro-irregularities.'
    },
    price_disclosure: {
      fabric_raw_cost_inr: 580.00,
      artisan_labor_inr: 920.00,
      printing_block_charge_inr: 380.00,
      washing_finishing_inr: 270.00,
      packaging_logistics_inr: 200.00,
      retail_fair_margin_inr: 500.00,
      is_audited: true,
      audit_notes: 'On-site audit confirmed: Over 46% of retail value directly compensates master printers and workshop artisans.'
    },
    production_stages: [
      {
        stage_order: 1,
        stage_name: 'Block Carving (Rorda Wood)',
        description: 'Pattern blocks hand-carved from seasoned Rorda/Sheesham wood by traditional block-makers in Bagru.',
        date_completed: '2026-10-18',
        is_evidenced: true
      },
      {
        stage_order: 2,
        stage_name: 'Harda (Myrobalan) Tannin Prep',
        description: 'Cotton cloth washed and soaked in natural Harda solution, giving a warm cream ground that anchors natural dyes.',
        date_completed: '2026-10-22',
        is_evidenced: true
      },
      {
        stage_order: 3,
        stage_name: 'Syahi & Begar Paste Formulation',
        description: 'Black syahi prepared by fermenting rusted horseshoe iron with jaggery water; red begar formulated with alum and madder.',
        date_completed: '2026-10-25',
        is_evidenced: true
      },
      {
        stage_order: 4,
        stage_name: 'Rekh (Outline) & Datta (Fill) Stamping',
        description: 'Master printer strikes the block with the base of the palm onto long padded printing tables.',
        date_completed: '2026-10-28',
        is_evidenced: true
      },
      {
        stage_order: 5,
        stage_name: 'Open Ground Sun Baking & Chhapaai Wash',
        description: 'Printed yardage laid out on the sandy soil of Bagru to fix colors under solar heat, followed by thorough river washing.',
        date_completed: '2026-11-02',
        is_evidenced: true
      }
    ]
  },

  // 2. PRODUCT B: Fully Verified Sanganeri Fine Floral by Master Brij Ballabh Udaiwal
  {
    id: 'bbbbbbbb-2222-2222-2222-222222222222',
    product_code: 'SGR-BBU-F001',
    name: 'Sanganeri Fine Floral Hand-Block Mulmul Saree',
    title_hi: 'सांगानेरी बारीक फूल बूटियाँ हस्त-ब्लॉक मलमल साड़ी',
    cluster: 'Sanganer',
    category: 'Textile',
    description: 'Masterwork Sanganeri fine floral block-printed saree on pure white river-washed cotton mulmul. Decorated with delicate floral boota and bootie motifs using traditional plant-derived vegetable extracts (Manjith, Anar chilka, Harad, Tesu).',
    artisan_workshop: {
      id: 'aaaaaaaa-2222-2222-2222-222222222222',
      artisan_name: 'Brij Ballabh Udaiwal',
      workshop_name: 'Shilpi Sansthan Craft Studio',
      cluster: 'Sanganer',
      location_address: '6/46 Near Siliberi, Sanganer, Jaipur, Rajasthan 302029',
      lineage_or_caste: 'Traditional Chhipa Textile Printing Family (Sanganer)',
      experience_years: 34,
      gi_authorized_user_no: 'GI-147-AU-SGR-042',
      gi_status: 'Verified',
      bio: 'National Awardee (1991) and State Awardee (1986). Founder of Shilpi Sansthan NGO, supporting over 85 printing units and 12 women Self-Help Groups. Renowned natural indigo fermentation pioneer and Director of CCWA.',
      image_url: '/images/textiles/hand-printing-process.jpg',
      consent_obtained: true
    },
    weaving_method: 'Handloom',
    printing_technique: 'Traditional Hand-Block',
    dye_type: '100% Natural Vegetable Dye',
    fabric_composition: '100% Fine Cotton Mulmul (100s Count Handloom)',
    verification_status: 'VERIFIED',
    retail_price_inr: 3450.00,
    image_url: '/images/textiles/sanganeri-floral.jpg',
    is_demo: true,
    total_scans: 41,
    has_duplication_anomaly: false,
    scorecard: {
      geo_status: 'Verified',
      geo_evidence: 'On-site geo-audit at Siliberi, Sanganer cluster, Jaipur, Rajasthan.',
      artisan_status: 'Verified',
      artisan_evidence: 'Government of India Handicrafts Pehchan ID NRJPC241207 and National Award 1991 archive record validated.',
      process_status: 'Verified',
      process_evidence: 'Multi-color block registration verified with characteristic two-tone Rekh and Datta stamps.',
      material_status: 'Verified',
      material_evidence: 'Spectroscopic dye analysis verified: Natural Manjith (Madder), Pomegranate rind (Anar chilka), and Tesu flowers.',
      gi_layer_status: 'Verified',
      gi_evidence: 'Sanganeri Hand Block Printing, GI Application No. 147 (Registered March 19, 2009).',
      supply_chain_status: 'Verified',
      supply_chain_evidence: 'Complete chain of custody with local women SHGs handling folding, finishing, and waste-water recycling.',
      commercial_claim_status: 'Verified',
      commercial_claim_evidence: 'All claims of natural dyes, hand-block printing, and Sanganeri origin confirmed.',
      last_verified_at: '2026-11-14',
      verifier_remarks: 'Superb Sanganeri craft execution with exquisite boota rendering on pristine white ground. Clean river-wash finish.'
    },
    price_disclosure: {
      fabric_raw_cost_inr: 750.00,
      artisan_labor_inr: 1180.00,
      printing_block_charge_inr: 440.00,
      washing_finishing_inr: 320.00,
      packaging_logistics_inr: 210.00,
      retail_fair_margin_inr: 550.00,
      is_audited: true,
      audit_notes: 'Audited transparent breakdown: 48% paid directly to master printers and auxiliary SHG women artisans.'
    },
    production_stages: [
      {
        stage_order: 1,
        stage_name: 'Wooden Block Engraving',
        description: 'Hand-carved wooden blocks sculpted with micro-chisel detailing for small floral petals and curling leaves.',
        date_completed: '2026-10-20',
        is_evidenced: true
      },
      {
        stage_order: 2,
        stage_name: 'Cloth Bleaching & River Washing',
        description: 'Cotton mulmul pre-washed and purified to achieve the signature sparkling white Sanganeri base ground.',
        date_completed: '2026-10-24',
        is_evidenced: true
      },
      {
        stage_order: 3,
        stage_name: 'Natural Dye Extraction',
        description: 'Decoctions boiled from Tesu petals, Anar chilka, and Manjith roots, mixed with gum binder.',
        date_completed: '2026-10-27',
        is_evidenced: true
      },
      {
        stage_order: 4,
        stage_name: 'Multi-Block Hand Stamping',
        description: 'Trained block printer aligns separate wooden blocks by eye for outlines, petals, and central pistils.',
        date_completed: '2026-10-31',
        is_evidenced: true
      },
      {
        stage_order: 5,
        stage_name: 'Finishing & Eco-Friendly Water Recycling',
        description: 'Wash-water collected and recycled per Shilpi Sansthan environmental protocol; steam pressed and tagged.',
        date_completed: '2026-11-04',
        is_evidenced: true
      }
    ]
  },

  // 3. PRODUCT C: Confirmed Craftwashing Misrepresentation (Sample #7 & #8 from Research)
  {
    id: 'bbbbbbbb-3333-3333-3333-333333333333',
    product_code: 'CTI-MIS-000305',
    name: 'Industrial Screen-Printed Imitation Sold as "Bagru Hand-Block"',
    title_hi: 'मशीनी स्क्रीन प्रिंट (बागरू हस्त-ब्लॉक के नाम पर नकली)',
    cluster: 'Bagru',
    category: 'Textile',
    description: 'WARNING — CRAFTWASHING DETECTED: This garment is commercially labeled and sold online as "Authentic Bagru Dabu Hand Block Print". Forensic textile analysis confirmed it is an industrial flatbed screen print using synthetic acrylic pigments.',
    artisan_workshop: {
      id: 'aaaaaaaa-3333-3333-3333-333333333333',
      artisan_name: 'Unverified Commercial Trader (Purported Chhipa)',
      workshop_name: 'Commercial Screen Facility (Out-of-Cluster)',
      cluster: 'Bagru',
      location_address: 'Industrial Area Phase 2, Sanganer Outskirts, Jaipur',
      lineage_or_caste: 'Commercial Wholesale Merchant (Zero Traditional Lineage)',
      experience_years: 4,
      gi_authorized_user_no: undefined,
      gi_status: 'Not Applicable',
      bio: 'Facility operator claimed Bagru heritage. On-site physical audit revealed motorized flatbed screen printing tables with zero wooden blocks or natural indigo vats present.',
      image_url: '/images/textiles/rajasthani-printing-blocks.jpg',
      consent_obtained: false
    },
    weaving_method: 'Mill-Made',
    printing_technique: 'Screen Print',
    dye_type: 'Synthetic Pigment Dye',
    fabric_composition: 'Poly-Cotton Blend (70% Polyester, 30% Cotton)',
    verification_status: 'CONFIRMED_MISREPRESENTATION',
    retail_price_inr: 1699.00,
    image_url: '/images/textiles/jaipur-textile-printing.jpg',
    is_demo: true,
    total_scans: 89,
    has_duplication_anomaly: false,
    scorecard: {
      geo_status: 'Contradicted',
      geo_evidence: 'Factory located outside registered GI territory; produced in an industrial textile mill zone.',
      artisan_status: 'Not Established',
      artisan_evidence: 'Trader cannot identify artisan name or workshop address. No Pehchan card.',
      process_status: 'Not Established',
      process_evidence: 'Microscopic analysis reveals rotary screen repeat boundaries and completely flat paint layer with zero strike-through.',
      material_status: 'Not Established',
      material_evidence: 'Spectrometry detected synthetic acrylic pigment binder and azo chemical dyes. Zero natural dye present.',
      gi_layer_status: 'Not Established',
      gi_evidence: 'No record in Geographical Indications Registry. Unauthorized commercial appropriation of "Bagru" name.',
      supply_chain_status: 'Not Established',
      supply_chain_evidence: 'Zero chain of custody documentation. Invoices show bulk powerloom mill cloth from Surat.',
      commercial_claim_status: 'Contradicted',
      commercial_claim_evidence: 'Commercial claim of "100% Hand-Block Natural Dabu" is demonstrably fraudulent under CPA 2019.',
      last_verified_at: '2026-11-18',
      verifier_remarks: 'CRITICAL AUDIT NOTICE: Egregious craftwashing specimen. Screen print marketed with fake handmade claims to charge a 300% markup.'
    },
    price_disclosure: {
      fabric_raw_cost_inr: 140.00,
      artisan_labor_inr: 35.00,
      printing_block_charge_inr: 0.00,
      washing_finishing_inr: 45.00,
      packaging_logistics_inr: 120.00,
      retail_fair_margin_inr: 1359.00,
      is_audited: true,
      audit_notes: 'Artisan exploitation analysis: Less than 2.1% of retail price paid to contract factory workers. 80% absorbed as middleman markup.'
    },
    production_stages: [
      {
        stage_order: 1,
        stage_name: 'Bulk Mill Weaving (Surat)',
        description: 'High-speed synthetic yarn weaving in automated mill.',
        date_completed: '2026-09-10',
        is_evidenced: false
      },
      {
        stage_order: 2,
        stage_name: 'Flatbed Screen Stencil Printing',
        description: 'Simulated block design printed with petroleum-derived acrylic pigments across 60-meter mechanical tables.',
        date_completed: '2026-09-18',
        is_evidenced: false
      },
      {
        stage_order: 3,
        stage_name: 'Chemical Oven Curing',
        description: 'Fabric baked in industrial curing oven to bond plastic polymers to surface threads.',
        date_completed: '2026-09-21',
        is_evidenced: false
      }
    ]
  },

  // 4. PRODUCT D: Cloned QR Tag Anomaly (Security & Physical Duplication Detection)
  {
    id: 'bbbbbbbb-4444-4444-4444-444444444444',
    product_code: 'CTI-DUP-000412',
    name: 'Bagru Dabu Indigo Dupatta [SECURITY ALERT: CLONED QR TAG]',
    title_hi: 'बागरू डाबू दुपट्टा [सुरक्षा चेतावनी: क्लोन किया गया QR टैग]',
    cluster: 'Bagru',
    category: 'Textile',
    description: 'SECURITY DUPLICATION TRIGGERED: The QR code attached to this physical garment has recorded simultaneous scan pings across multiple geographic locations (Bengaluru, Delhi, Jaipur) within 15 minutes. Physical tag duplication under forensic investigation.',
    artisan_workshop: {
      id: 'aaaaaaaa-1111-1111-1111-111111111111',
      artisan_name: "Lalchand 'Chippa' Derawala",
      workshop_name: 'Lalchand Chippa Heritage Workshop',
      cluster: 'Bagru',
      location_address: 'Laxmi Nath Chowk, Bagru, Jaipur, Rajasthan 303007',
      lineage_or_caste: 'Traditional Chhipa Community',
      experience_years: 36,
      gi_authorized_user_no: 'GI-183-AU-BAGRU-019',
      gi_status: 'Verified',
      bio: 'Authentic artisan whose genuine physical swing tag serial number appears to have been photo-copied and affixed to unauthorized garments by an intermediary distributor.',
      image_url: '/images/textiles/bagru-village-printing.jpg',
      consent_obtained: true
    },
    weaving_method: 'Handloom',
    printing_technique: 'Mud-Resist Dabu Hand-Block',
    dye_type: '100% Natural Vegetable Dye',
    fabric_composition: '100% Cotton Handloom',
    verification_status: 'UNDER_INVESTIGATION',
    retail_price_inr: 2600.00,
    image_url: '/images/textiles/bagru-dabu-indigo.jpg',
    is_demo: true,
    total_scans: 112,
    has_duplication_anomaly: true,
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
      supply_chain_evidence: 'Physical tag integrity under dispute due to multiple simultaneous retail scan points.',
      commercial_claim_status: 'Not Established',
      commercial_claim_evidence: 'Investigating whether retailer replicated label onto unverified inventory.',
      last_verified_at: '2026-11-20',
      verifier_remarks: 'Physical QR duplication anomaly triggered. Investigation ongoing with distributor.'
    },
    price_disclosure: {
      fabric_raw_cost_inr: 520.00,
      artisan_labor_inr: 810.00,
      printing_block_charge_inr: 340.00,
      washing_finishing_inr: 250.00,
      packaging_logistics_inr: 190.00,
      retail_fair_margin_inr: 490.00,
      is_audited: false,
      audit_notes: 'Pricing data holds for master batch; unit authenticity flagged due to QR tag cloning.'
    },
    production_stages: [
      {
        stage_order: 1,
        stage_name: 'Master Batch Printing',
        description: 'Authentic batch of 50 dupattas printed in Bagru.',
        date_completed: '2026-10-01',
        is_evidenced: true
      },
      {
        stage_order: 2,
        stage_name: 'Physical Tag Attachment',
        description: 'Tamper-evident swing tag serialized at workshop.',
        date_completed: '2026-10-10',
        is_evidenced: true
      },
      {
        stage_order: 3,
        stage_name: 'Disputed Retail Duplication',
        description: 'Third-party retailer flagged for unauthorized QR reproduction.',
        date_completed: '2026-11-19',
        is_evidenced: false
      }
    ]
  }
];

// 40-Fabric Empirical Cluster Dataset Summary
export const RESEARCH_FABRIC_STUDY = {
  totalSamples: 40,
  authenticBagruCount: 16,
  authenticBagruPercent: 40.0,
  authenticSanganerCount: 19,
  authenticSanganerPercent: 47.5,
  craftwashedCount: 5,
  craftwashedPercent: 12.5,
  keyParameters: [
    {
      name: 'Reverse Strike-Through (Chhaap)',
      description: 'Hand-block prints penetrate 60-90% to reverse; screen prints leave a pale/blank back.',
      importance: 'Critical (Field Test #1)'
    },
    {
      name: 'Ground Tone (Kora / Harda)',
      description: 'Bagru uses warm cream Harda tannin base; Sanganer uses pristine bleached white; machine prints use fluorescent white.',
      importance: 'Cluster Origin Identifier'
    },
    {
      name: 'Block Registration (Rekh vs Datta)',
      description: 'Hand-stamping exhibits 0.5-2mm micro-misalignments and palm-strike pressure gradients; screens repeat perfectly.',
      importance: 'Handmade Signature'
    },
    {
      name: 'Dabu Mud Resist Crackle',
      description: 'Organic, non-repetitive micro-cracks from kaali mitti mud drying; imitation screen shows identical repeating crackles.',
      importance: 'Technique Authenticator'
    },
    {
      name: 'Natural Scent & Tactile Hand',
      description: 'Earthy iron/tannin aroma and soft breathable drape vs sharp chemical acrylic odor and stiff surface film.',
      importance: 'Sensory Verification'
    }
  ],
  sampleObservations: [
    { id: 1, type: 'Bagru', technique: 'Dabu Resist', result: 'Authentic', notes: 'Stylized floral butas in ochre; irregular block placement; natural dye bleed.' },
    { id: 2, type: 'Bagru', technique: 'Discharge / Double Dabu', result: 'Authentic', notes: 'Blue and white floral rows; mineral blue shade typical of Bagru; slight misalignments.' },
    { id: 3, type: 'Sanganer-Inspired', technique: 'Wax Imitation', result: 'Imitation (Machine)', notes: 'Overly uniform crackle lines indicating mechanized screen printing; craftwashed.' },
    { id: 4, type: 'Bagru', technique: 'Dabu Resist', result: 'Authentic', notes: 'Teardrop paisley on deep madder red; red oxide background; visible block join lines.' },
    { id: 5, type: 'Sanganer', technique: 'Pigment Hand Block', result: 'Authentic', notes: 'Geometric floral rosettes; bright crisp impressions; handmade Sanganeri execution.' },
    { id: 6, type: 'Bagru', technique: 'Dabu Black Base', result: 'Authentic', notes: 'Bold stripes with white motifs; imperfect block joins; natural iron syahi black.' },
    { id: 7, type: 'Bagru-Dabu (Machine)', technique: 'Screen Print', result: 'Imitation (Machine)', notes: 'Precise mechanical repetition; glossy surface pigment layer; zero strike-through.' },
    { id: 8, type: 'Generic Print', technique: 'Digital Imitation', result: 'Imitation (Machine)', notes: 'Yellow stripes with white pattern; synthetic tone; digital alignment.' },
    { id: 10, type: 'Bagru', technique: 'Dabu Indigo Resist', result: 'Authentic', notes: 'Blue and maroon zig-zag; uneven dye tone; visible mud cracks; raw texture.' },
    { id: 11, type: 'Sanganer', technique: 'Rekh & Datta Block', result: 'Authentic', notes: 'Tiny floral butis in indigo and ochre; fine detailing; two-tone block alignment.' },
    { id: 14, type: 'Bagru-Inspired', technique: 'Synthetic Screen', result: 'Imitation (Machine)', notes: 'Abstract indigo zigzag on white; excessive uniformity; no mud crack texture.' },
    { id: 17, type: 'Sanganer-Inspired', technique: 'Screen Print', result: 'Imitation (Machine)', notes: 'Blue lotus in grid pattern on white; over-precise symmetry; machine made.' },
    { id: 22, type: 'Bagru', technique: 'Two-Block Hand Print', result: 'Authentic', notes: 'Leaf motifs in black and madder red; misregistration between black and red layers; strong handmade evidence.' },
    { id: 24, type: 'Sanganer', technique: 'Multi-Block Hand Print', result: 'Authentic', notes: 'Large floral vine with pink flowers; hand-rendered style with slight offset.' }
  ]
};

export const DEMO_COMPLAINTS: ConsumerComplaint[] = [
  {
    id: 'comp-101',
    product_id: 'bbbbbbbb-3333-3333-3333-333333333333',
    consumer_name: 'Ananya Sharma',
    contact_email: 'ananya.s@example.com',
    purchase_platform: 'Leading Fashion E-Commerce App',
    purchase_price_inr: 1699.00,
    complaint_category: 'CRAFTWASHING',
    complaint_details: 'The item was advertised as 100% Bagru Dabu hand-block printed cotton. On delivery, the reverse side is completely white with zero dye penetration, and the fabric has a strong plastic paint odor. It is an obvious flatbed screen print sold at handloom prices.',
    evidence_image_url: '/images/textiles/jaipur-textile-printing.jpg',
    status: 'INVESTIGATING',
    created_at: '2026-11-19T14:30:00Z',
    admin_action_notes: 'Assigned to forensic textile verifier. Formal inquiry sent to merchant platform under CPA 2019 Section 89.'
  },
  {
    id: 'comp-102',
    product_id: 'bbbbbbbb-4444-4444-4444-444444444444',
    consumer_name: 'Rohan Mehra',
    contact_email: 'rohan.m@example.com',
    purchase_platform: 'Boutique Store, Indiranagar, Bengaluru',
    purchase_price_inr: 2600.00,
    complaint_category: 'SUSPECTED_DUPLICATE_QR',
    complaint_details: 'Scanned the tag in store and noticed the scan counter jumped from 4 to 112 within minutes. Verifier page showed pings from 3 cities simultaneously.',
    evidence_image_url: '/images/textiles/bagru-village-printing.jpg',
    status: 'ESCALATED_LEGAL',
    created_at: '2026-11-20T11:15:00Z',
    admin_action_notes: 'Duplicate QR code quarantined. Investigation into retail consignment distributor initiated.'
  }
];

export const DEMO_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'audit-901',
    product_id: 'bbbbbbbb-1111-1111-1111-111111111111',
    layer_name: 'Material & Dye Authentication',
    previous_status: 'Documented',
    new_status: 'Verified',
    changed_by_name: 'Dr. V. K. Mathur (Textile Auditor)',
    justification_notes: 'TLC chromatography report confirmed authentic harda, alum, and fermented indigo dye components. Zero azo dyes detected.',
    created_at: '2026-11-10T09:40:00Z'
  },
  {
    id: 'audit-902',
    product_id: 'bbbbbbbb-3333-3333-3333-333333333333',
    layer_name: 'Commercial Claim Integrity',
    previous_status: 'Under Review',
    new_status: 'Contradicted',
    changed_by_name: 'Central Verifier Cell',
    justification_notes: 'Physical fabric test proved flatbed rotary screen printing. Product permanently flagged for commercial craftwashing.',
    created_at: '2026-11-18T16:20:00Z'
  }
];

export function getProductByCode(code: string): CraftProduct | undefined {
  const normalized = code.trim().toLowerCase();
  return DEMO_PRODUCTS.find(
    p => p.product_code.toLowerCase() === normalized || p.id.toLowerCase() === normalized
  );
}

export function getProductById(id: string): CraftProduct | undefined {
  return DEMO_PRODUCTS.find(p => p.id === id || p.product_code === id);
}

export const DEMO_SURVEYS: ResearchSurveyResponse[] = [
  {
    product_code: 'BAGRU-LCD-F001',
    verification_status_seen: 'VERIFIED',
    understanding_of_authenticity: 5,
    perceived_transparency: 5,
    trust_in_evidence: 5,
    willingness_to_pay_inr: 2850,
    prior_block_print_knowledge: 'Moderate',
    feedback_notes: 'Seeing the Harda mordant details and Lalchand Derawala lineage gave total confidence.',
    consent_given: true,
    created_at: '2026-11-12'
  },
  {
    product_code: 'SGR-BBU-F001',
    verification_status_seen: 'VERIFIED',
    understanding_of_authenticity: 5,
    perceived_transparency: 5,
    trust_in_evidence: 5,
    willingness_to_pay_inr: 3450,
    prior_block_print_knowledge: 'Expert Connoisseur',
    feedback_notes: 'Brij Ballabh Pehchan ID NRJPC241207 link confirmed government artisan verification.',
    consent_given: true,
    created_at: '2026-11-15'
  },
  {
    product_code: 'CTI-MIS-000305',
    verification_status_seen: 'CONFIRMED_MISREPRESENTATION',
    understanding_of_authenticity: 5,
    perceived_transparency: 5,
    trust_in_evidence: 4,
    willingness_to_pay_inr: 450,
    prior_block_print_knowledge: 'Novice',
    feedback_notes: 'Saved me from paying 1699 for a cheap screen print! The reverse strike-through check was eye opening.',
    consent_given: true,
    created_at: '2026-11-18'
  },
  {
    product_code: 'CTI-DUP-000412',
    verification_status_seen: 'UNDER_INVESTIGATION',
    understanding_of_authenticity: 4,
    perceived_transparency: 5,
    trust_in_evidence: 4,
    willingness_to_pay_inr: 0,
    prior_block_print_knowledge: 'Moderate',
    feedback_notes: 'Refused purchase because the duplicate scan alert popped up in store.',
    consent_given: true,
    created_at: '2026-11-20'
  }
];
