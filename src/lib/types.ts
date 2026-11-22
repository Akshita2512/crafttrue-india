// ====================================================================
// CRAFTTRUE INDIA - CORE TYPES (7-Layer AEF Framework)
// ====================================================================

export type VerificationStatus = 
  | 'VERIFIED'
  | 'PARTIALLY_VERIFIED'
  | 'UNVERIFIED'
  | 'UNDER_INVESTIGATION'
  | 'CONFIRMED_MISREPRESENTATION';

export type LayerStatus = 
  | 'Verified'
  | 'Documented'
  | 'Declared by Producer'
  | 'Not Established'
  | 'Under Review'
  | 'Contradicted'
  | 'Not Applicable';

export type CraftCluster = 'Bagru' | 'Sanganer';

export type WeavingMethod = 'Handloom' | 'Powerloom' | 'Mill-Made' | 'Handspun Khadi' | 'Unknown';

export type PrintingTechnique = 
  | 'Traditional Hand-Block'
  | 'Mud-Resist Dabu Hand-Block'
  | 'Screen Print'
  | 'Machine/Digital Print'
  | 'Unknown';

export type DyeType = 
  | '100% Natural Vegetable Dye'
  | 'Alizarin & Harda Mineral'
  | 'Synthetic Pigment Dye'
  | 'Mixed Dyes'
  | 'Unknown';

export interface ArtisanWorkshop {
  id: string;
  artisan_name: string;
  workshop_name: string;
  cluster: CraftCluster;
  location_address: string;
  lineage_or_caste: string;
  experience_years: number;
  gi_authorized_user_no?: string;
  gi_status: 'Verified' | 'Documented' | 'Under Review' | 'Not Applicable';
  bio: string;
  image_url: string;
  consent_obtained: boolean;
}

export interface SevenLayerScorecard {
  geo_status: LayerStatus;
  geo_evidence: string;
  
  artisan_status: LayerStatus;
  artisan_evidence: string;
  
  process_status: LayerStatus;
  process_evidence: string;
  
  material_status: LayerStatus;
  material_evidence: string;
  
  gi_layer_status: LayerStatus;
  gi_evidence: string;
  
  supply_chain_status: LayerStatus;
  supply_chain_evidence: string;
  
  commercial_claim_status: LayerStatus;
  commercial_claim_evidence: string;
  
  last_verified_at: string;
  verifier_remarks?: string;
}

export interface PriceDisclosure {
  fabric_raw_cost_inr: number;
  artisan_labor_inr: number;
  printing_block_charge_inr: number;
  washing_finishing_inr: number;
  packaging_logistics_inr: number;
  retail_fair_margin_inr: number;
  is_audited: boolean;
  audit_notes?: string;
}

export interface ProductionStage {
  stage_order: number;
  stage_name: string;
  description: string;
  date_completed?: string;
  evidence_image_url?: string;
  is_evidenced: boolean;
}

export interface CraftProduct {
  id: string;
  product_code: string; // e.g. "CTI-BAG-000184"
  name: string;
  title_hi: string;
  cluster: CraftCluster;
  category: 'Textile' | 'Apparel' | 'Home Furnishing' | 'Fabric';
  description: string;
  artisan_workshop?: ArtisanWorkshop;
  
  weaving_method: WeavingMethod;
  printing_technique: PrintingTechnique;
  dye_type: DyeType;
  fabric_composition: string;
  
  verification_status: VerificationStatus;
  retail_price_inr: number;
  image_url: string;
  is_demo: boolean;
  
  scorecard: SevenLayerScorecard;
  price_disclosure: PriceDisclosure;
  production_stages: ProductionStage[];
  
  // Duplication Anomaly Metadata
  total_scans: number;
  has_duplication_anomaly: boolean;
  anomaly_reason?: string;
}

export interface ConsumerComplaint {
  id: string;
  complaint_ref_no: string;
  product_code: string;
  complaint_category: string;
  description: string;
  evidence_url?: string;
  status: 'Submitted' | 'Under Investigation' | 'Resolved' | 'Dismissed';
  resolution_notes?: string;
  created_at: string;
}

export interface ResearchSurveyResponse {
  id?: string;
  product_code: string;
  verification_status_seen: VerificationStatus;
  understanding_of_authenticity: number; // 1 to 5
  perceived_transparency: number; // 1 to 5
  trust_in_evidence: number; // 1 to 5
  willingness_to_pay_inr: number;
  prior_block_print_knowledge: 'Novice' | 'Moderate' | 'Expert Connoisseur';
  feedback_notes?: string;
  consent_given: boolean;
  created_at?: string;
}

export interface AuditLog {
  id: string;
  product_id?: string;
  action: string;
  previous_state: string;
  new_state: string;
  performed_by: string;
  justification: string;
  created_at: string;
}

// ====================================================================
// LEGACY COMPATIBILITY TYPES (For Directory / Catalog components)
// ====================================================================

export interface Artisan {
  id: string;
  name: string;
  bio: string;
  region: string;
  state: string;
  craft_type: string;
  experience_years: number;
  avatar_url: string;
  cover_image_url?: string;
  is_verified: boolean;
  award_title?: string;
  story?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image_url?: string;
}

export interface Product {
  id: string;
  artisan_id: string;
  category_id: string;
  title: string;
  slug: string;
  description: string;
  heritage_origin: string;
  material: string;
  price_inr: number;
  compare_price_inr?: number;
  stock_quantity: number;
  is_featured: boolean;
  is_certified_authentic: boolean;
  gi_tag_certified: boolean;
  making_time_days?: number;
  images: string[];
  dimensions?: string;
  care_instructions?: string;
  artisan?: Artisan;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
