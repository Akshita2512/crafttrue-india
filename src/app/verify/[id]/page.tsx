'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getProductByCode, DEMO_PRODUCTS } from '@/lib/data/craftData';
import { CraftProduct, LayerStatus } from '@/lib/types';
import { 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  ShieldAlert, 
  HelpCircle, 
  MapPin, 
  UserCheck, 
  Award, 
  Layers, 
  DollarSign, 
  Calendar, 
  Check, 
  AlertOctagon,
  Sparkles,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Share2,
  FileText
} from 'lucide-react';

export default function VerificationPage() {
  const params = useParams();
  const rawId = Array.isArray(params.id) ? params.id[0] : params.id;
  const decodedId = decodeURIComponent(rawId || '');

  // 1. Fetch from Demo Products (Case-insensitive matching by code or id)
  const product: CraftProduct | undefined = 
    getProductByCode(decodedId) || 
    DEMO_PRODUCTS.find(p => p.id === decodedId) ||
    DEMO_PRODUCTS[0]; // Fallback to Product A if invalid

  // Survey State
  const [surveySubmitted, setSurveySubmitted] = useState(false);
  const [understandingScore, setUnderstandingScore] = useState(5);
  const [trustScore, setTrustScore] = useState(5);
  const [wtpAmount, setWtpAmount] = useState(product?.retail_price_inr || 2400);
  const [priorKnowledge, setPriorKnowledge] = useState<'Novice' | 'Moderate' | 'Expert Connoisseur'>('Moderate');

  // Complaint Modal State
  const [complaintOpen, setComplaintOpen] = useState(false);
  const [complaintCategory, setComplaintCategory] = useState('Suspected Machine/Screen Print Imitation');
  const [complaintText, setComplaintText] = useState('');
  const [complaintRef, setComplaintRef] = useState<string | null>(null);

  const handleSurveySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSurveySubmitted(true);
  };

  const handleComplaintSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedRef = `CMP-${Math.floor(1000 + Math.random() * 9000)}`;
    setComplaintRef(generatedRef);
  };

  if (!product) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-4">
        <HelpCircle className="w-16 h-16 text-stone-400 mx-auto" />
        <h2 className="text-2xl font-bold text-stone-900">Tag ID Not Found in Registry</h2>
        <p className="text-stone-600 text-sm">
          No registered verification record matches "{decodedId}". Remember: an unregistered product is not automatically counterfeit, but its claims remain unverified.
        </p>
        <Link href="/scan" className="inline-block px-5 py-2.5 bg-amber-700 text-white rounded-xl text-xs font-semibold">
          Return to Scanner
        </Link>
      </div>
    );
  }

  // Helper for Badge Color & Label
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'VERIFIED':
        return {
          bg: 'bg-emerald-50 border-emerald-300 text-emerald-900',
          badgeBg: 'bg-emerald-600 text-white',
          icon: CheckCircle2,
          label: 'VERIFIED AUTHENTIC CRAFT (प्रमाणित हस्तशिल्प)',
          desc: 'All 7 authenticity layers have passed defined independent verification checks and match official GI specifications.'
        };
      case 'PARTIALLY_VERIFIED':
        return {
          bg: 'bg-amber-50 border-amber-300 text-amber-950',
          badgeBg: 'bg-amber-600 text-white',
          icon: CheckCircle2,
          label: 'PARTIALLY VERIFIED (आंशिक रूप से सत्यापित)',
          desc: 'Specific claims are independently verified (e.g. hand-block printing & origin), while others (e.g. mill fabric or pigment dyes) are accurately declared by producer.'
        };
      case 'CONFIRMED_MISREPRESENTATION':
        return {
          bg: 'bg-rose-50 border-rose-300 text-rose-950',
          badgeBg: 'bg-rose-600 text-white',
          icon: XCircle,
          label: 'CONFIRMED MISREPRESENTATION / CRAFTWASHING',
          desc: 'Physical fabric audit has documented false or contradicted claims. Rotary screen print falsely labeled as GI hand-block craft.'
        };
      case 'UNDER_INVESTIGATION':
        return {
          bg: 'bg-orange-50 border-orange-300 text-orange-950',
          badgeBg: 'bg-orange-600 text-white',
          icon: ShieldAlert,
          label: 'UNDER INVESTIGATION / ANOMALY DETECTED',
          desc: 'A security flag, duplication alert, or consumer complaint is currently being investigated by the independent verification board.'
        };
      default:
        return {
          bg: 'bg-stone-50 border-stone-300 text-stone-900',
          badgeBg: 'bg-stone-600 text-white',
          icon: HelpCircle,
          label: 'UNVERIFIED RECORD',
          desc: 'Insufficient evidence has been submitted to substantiate the seller’s claims.'
        };
    }
  };

  const getLayerBadge = (status: LayerStatus) => {
    switch (status) {
      case 'Verified':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Documented':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Declared by Producer':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Contradicted':
        return 'bg-rose-100 text-rose-800 border-rose-300 font-bold';
      default:
        return 'bg-stone-100 text-stone-600 border-stone-200';
    }
  };

  const currentStatusInfo = getStatusBadge(product.verification_status);
  const StatusIcon = currentStatusInfo.icon;

  const totalCost = 
    product.price_disclosure.fabric_raw_cost_inr +
    product.price_disclosure.artisan_labor_inr +
    product.price_disclosure.printing_block_charge_inr +
    product.price_disclosure.washing_finishing_inr +
    product.price_disclosure.packaging_logistics_inr +
    product.price_disclosure.retail_fair_margin_inr;

  const artisanSharePercent = Math.round(
    ((product.price_disclosure.artisan_labor_inr + product.price_disclosure.printing_block_charge_inr) / totalCost) * 100
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* Back button & Tag ID breadcrumb */}
      <div className="flex items-center justify-between">
        <Link href="/scan" className="inline-flex items-center gap-1.5 text-xs text-stone-600 hover:text-stone-900 font-semibold">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Scanner</span>
        </Link>
        <span className="font-mono text-xs text-stone-500 bg-stone-100 px-3 py-1 rounded-full border border-stone-200">
          Tag ID: <strong>{product.product_code}</strong>
        </span>
      </div>

      {/* CRITICAL DUPLICATION ANOMALY BANNER (IF DETECTED) */}
      {product.has_duplication_anomaly && (
        <div className="p-4 sm:p-5 rounded-2xl bg-orange-600 text-white shadow-lg space-y-2 border-2 border-orange-400 animate-pulse">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-amber-200 shrink-0" />
            <h3 className="font-bold text-sm tracking-wide uppercase">
              Security Anomaly Alert • संदिग्ध लेबल चेतावनी
            </h3>
          </div>
          <p className="text-xs text-orange-100 leading-relaxed">
            {product.anomaly_reason}
          </p>
        </div>
      )}

      {/* 1. TOP AUTHENTICITY STATUS BANNER */}
      <div className={`p-6 sm:p-8 rounded-2xl border-2 ${currentStatusInfo.bg} shadow-md space-y-4`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold tracking-wide shadow-xs w-fit bg-white/80 border border-stone-300">
            <StatusIcon className="w-4 h-4 text-stone-800" />
            <span>{currentStatusInfo.label}</span>
          </div>
          <span className="text-xs text-stone-500 font-medium">
            Last Evaluated: <strong>{product.scorecard.last_verified_at}</strong>
          </span>
        </div>

        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mb-1">
            {product.name}
          </h1>
          <p className="text-sm font-medium text-amber-900/80">
            {product.title_hi}
          </p>
        </div>

        <p className="text-xs sm:text-sm leading-relaxed max-w-3xl opacity-90">
          {currentStatusInfo.desc}
        </p>

        {product.scorecard.verifier_remarks && (
          <div className="pt-3 border-t border-stone-300/60 text-xs text-stone-700 italic">
            <strong>Verifier Audit Note:</strong> "{product.scorecard.verifier_remarks}"
          </div>
        )}
      </div>

      {/* 2. PRODUCT SUMMARY CARD & WEAVING VS PRINTING SEPARATION */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-12 gap-0">
        <div className="md:col-span-5 relative bg-stone-100 min-h-[280px]">
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 left-3 bg-stone-900/80 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-1 rounded-md">
            {product.cluster} Cluster (Rajasthan)
          </div>
        </div>

        <div className="md:col-span-7 p-6 sm:p-8 space-y-5">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
              {product.category}
            </span>
            <span className="text-xl font-bold text-stone-900 font-serif">
              ₹{product.retail_price_inr.toLocaleString('en-IN')}
            </span>
          </div>

          <p className="text-xs text-stone-600 leading-relaxed">
            {product.description}
          </p>

          {/* CRITICAL RESEARCH DISTINCTION: Weaving Method vs. Printing Technique */}
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-stone-800">
              <Layers className="w-4 h-4 text-amber-700" />
              <span>Core Distinction: Weaving vs. Printing Technique</span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-2.5 rounded-lg bg-white border border-stone-200">
                <p className="text-[10px] text-stone-500 uppercase font-semibold">Weaving Method (बुनाई)</p>
                <p className="font-bold text-stone-900">{product.weaving_method}</p>
                <p className="text-[10px] text-stone-500 mt-0.5">{product.fabric_composition}</p>
              </div>
              <div className="p-2.5 rounded-lg bg-white border border-stone-200">
                <p className="text-[10px] text-stone-500 uppercase font-semibold">Printing Technique (छपाई)</p>
                <p className="font-bold text-stone-900">{product.printing_technique}</p>
                <p className="text-[10px] text-stone-500 mt-0.5">{product.dye_type}</p>
              </div>
            </div>
          </div>

          {/* Workshop / Artisan Snapshot */}
          {product.artisan_workshop ? (
            <div className="flex items-center gap-3 pt-2">
              <img
                src={product.artisan_workshop.image_url}
                alt={product.artisan_workshop.artisan_name}
                className="w-11 h-11 rounded-full object-cover border-2 border-amber-600/40"
              />
              <div className="text-xs">
                <p className="font-bold text-stone-900">{product.artisan_workshop.artisan_name}</p>
                <p className="text-stone-500">{product.artisan_workshop.lineage_or_caste} • {product.artisan_workshop.workshop_name}</p>
              </div>
            </div>
          ) : (
            <div className="text-xs text-stone-500 italic p-2 bg-stone-100 rounded">
              Artisan Profile: Not disclosed or unverified seller.
            </div>
          )}
        </div>
      </div>

      {/* 3. THE 7-LAYER AUTHENTICITY SCORECARD (AEF) */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-stone-100">
          <div>
            <h2 className="font-serif text-xl font-bold text-stone-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-700" />
              <span>7-Layer Authenticity Scorecard (AEF)</span>
            </h2>
            <p className="text-xs text-stone-500">
              Evaluated against Bagru &amp; Sanganeri Geographical Indication standards
            </p>
          </div>
          <span className="text-[11px] font-semibold text-stone-600 bg-stone-100 px-3 py-1 rounded-full">
            Claim-by-Claim Transparency
          </span>
        </div>

        {/* The 7 Layers Grid */}
        <div className="space-y-3">
          {[
            {
              layer: '1. Geographical Authenticity (भूगोलीय मूल)',
              status: product.scorecard.geo_status,
              evidence: product.scorecard.geo_evidence,
              desc: 'Was this product printed within the protected geographical boundaries of Bagru or Sanganer?'
            },
            {
              layer: '2. Artisan / Workshop Identity (कारीगर पहचान)',
              status: product.scorecard.artisan_status,
              evidence: product.scorecard.artisan_evidence,
              desc: 'Is the traditional Chhipa block-printer or workshop identity verified with official records?'
            },
            {
              layer: '3. Printing Process Authenticity (छपाई तकनीक)',
              status: product.scorecard.process_status,
              evidence: product.scorecard.process_evidence,
              desc: 'Is it verified hand-block printing (carved teak wood blocks), or a mechanized screen/roller imitation?'
            },
            {
              layer: '4. Material & Dye Authenticity (सामग्री एवं रंग)',
              status: product.scorecard.material_status,
              evidence: product.scorecard.material_evidence,
              desc: 'Fibre composition (Handloom vs Mill) and dye chemistry (Natural vegetable/Dabu vs Synthetic pigment).'
            },
            {
              layer: '5. GI & Certification Status (जी.आई. पंजीकरण)',
              status: product.scorecard.gi_layer_status,
              evidence: product.scorecard.gi_evidence,
              desc: 'Is the producer an official Authorised User registered under the Geographical Indications Act?'
            },
            {
              layer: '6. Supply-Chain Traceability (आपूर्ति श्रृंखला)',
              status: product.scorecard.supply_chain_status,
              evidence: product.scorecard.supply_chain_evidence,
              desc: 'Traceable custody records from yarn/fabric sourcing to Dabu mud application, dyeing, and river washing.'
            },
            {
              layer: '7. Commercial Claim Authenticity (दावे की सत्यता)',
              status: product.scorecard.commercial_claim_status,
              evidence: product.scorecard.commercial_claim_evidence,
              desc: 'Do the seller’s advertised marketing claims match the independently documented evidence?'
            }
          ].map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-stone-200/80 bg-stone-50/50 hover:bg-stone-50 transition space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="font-bold text-xs sm:text-sm text-stone-900">{item.layer}</span>
                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${getLayerBadge(item.status)}`}>
                  {item.status}
                </span>
              </div>
              <p className="text-[11px] text-stone-500 leading-normal">{item.desc}</p>
              <div className="pt-2 border-t border-stone-200/60 text-xs text-stone-700 font-medium">
                <span className="text-stone-500 font-normal">Evidence: </span>{item.evidence}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. VISUAL CRAFTWASHING DIAGNOSTIC: 5-Point In-Hand Field Checks */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50/60 border border-amber-200 rounded-3xl p-6 sm:p-8 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-800" />
            <h3 className="font-serif font-bold text-base sm:text-lg text-amber-950">
              In-Hand Field Diagnostic: 5 Physical Checks for This Fabric
            </h3>
          </div>
          <Link
            href="/authenticity-guide"
            className="text-xs font-bold text-amber-900 bg-white hover:bg-amber-100 border border-amber-300 px-3.5 py-1.5 rounded-xl transition shadow-xs flex items-center gap-1.5 w-fit"
          >
            <span>Open Complete 40-Fabric Guide →</span>
          </Link>
        </div>
        
        <p className="text-xs text-stone-600 leading-relaxed">
          Traditional hand-block printing leaves distinctive physical signatures that machine and screen prints cannot replicate. Perform these checks on your physical garment right now:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-1">
          <div className="p-4 rounded-xl bg-white border border-amber-200 space-y-1.5 shadow-xs">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>1. Reverse Strike</span>
            </div>
            <p className="text-[11px] text-stone-600 leading-relaxed">
              Flip the cloth: Hand-pressed dye strikes 60%–90% through to reverse. Machine screen prints have a stark white back.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-amber-200 space-y-1.5 shadow-xs">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>2. Ground Color</span>
            </div>
            <p className="text-[11px] text-stone-600 leading-relaxed">
              Bagru has warm cream Harda base; Sanganer has soft river white. Beware harsh optical-brightened neon white.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-amber-200 space-y-1.5 shadow-xs">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>3. Block Joins</span>
            </div>
            <p className="text-[11px] text-stone-600 leading-relaxed">
              Examine where Rekh (outline) and Datta (fill) meet. Minor 0.5–2mm misalignments prove genuine human stamping.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-amber-200 space-y-1.5 shadow-xs">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>4. Dabu Mud Crack</span>
            </div>
            <p className="text-[11px] text-stone-600 leading-relaxed">
              In Bagru Dabu, dried kaali mitti mud cracks organically in cold indigo vats. Screen prints repeat identical crackle blocks.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-amber-200 space-y-1.5 shadow-xs">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>5. Natural Scent</span>
            </div>
            <p className="text-[11px] text-stone-600 leading-relaxed">
              Earthy tannin and fermented iron-jaggery syahi scent; soft drape. Never smells of harsh acrylic paint solvent.
            </p>
          </div>
        </div>
      </div>

      {/* 5. "KNOW YOUR CRAFT PRICE" TRANSPARENCY BREAKDOWN */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-stone-100">
          <div>
            <h3 className="font-serif text-xl font-bold text-stone-900 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-emerald-700" />
              <span>Know Your Craft Price • पारदर्शी मूल्य विवरण</span>
            </h3>
            <p className="text-xs text-stone-500">
              Seller-declared cost components explaining fair artisan compensation
            </p>
          </div>
          <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            {artisanSharePercent}% Directly Reaches Artisan Community
          </span>
        </div>

        {/* Cost Stack Bar */}
        <div className="space-y-2">
          <div className="h-4 rounded-full overflow-hidden flex bg-stone-100">
            <div style={{ width: `${(product.price_disclosure.artisan_labor_inr / totalCost) * 100}%` }} className="bg-amber-600" title="Artisan Labor" />
            <div style={{ width: `${(product.price_disclosure.printing_block_charge_inr / totalCost) * 100}%` }} className="bg-orange-500" title="Block Printing" />
            <div style={{ width: `${(product.price_disclosure.fabric_raw_cost_inr / totalCost) * 100}%` }} className="bg-stone-500" title="Fabric / Raw Material" />
            <div style={{ width: `${(product.price_disclosure.washing_finishing_inr / totalCost) * 100}%` }} className="bg-blue-400" title="Washing & Finishing" />
            <div style={{ width: `${(product.price_disclosure.retail_fair_margin_inr / totalCost) * 100}%` }} className="bg-emerald-600" title="Retail Margin" />
          </div>
        </div>

        {/* Cost Breakdown Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
            <p className="text-[10px] text-stone-500 font-semibold">Fabric &amp; Yarn</p>
            <p className="font-bold text-stone-900 text-sm">₹{product.price_disclosure.fabric_raw_cost_inr}</p>
          </div>
          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200">
            <p className="text-[10px] text-amber-800 font-bold">Artisan Labor</p>
            <p className="font-bold text-amber-900 text-sm">₹{product.price_disclosure.artisan_labor_inr}</p>
          </div>
          <div className="p-3 rounded-xl bg-orange-50 border border-orange-200">
            <p className="text-[10px] text-orange-800 font-bold">Block Stamping</p>
            <p className="font-bold text-orange-900 text-sm">₹{product.price_disclosure.printing_block_charge_inr}</p>
          </div>
          <div className="p-3 rounded-xl bg-blue-50 border border-blue-200">
            <p className="text-[10px] text-blue-800 font-semibold">River Washing</p>
            <p className="font-bold text-blue-900 text-sm">₹{product.price_disclosure.washing_finishing_inr}</p>
          </div>
          <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
            <p className="text-[10px] text-stone-500 font-semibold">Packaging/Logistics</p>
            <p className="font-bold text-stone-900 text-sm">₹{product.price_disclosure.packaging_logistics_inr}</p>
          </div>
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
            <p className="text-[10px] text-emerald-800 font-semibold">Retail Margin</p>
            <p className="font-bold text-emerald-900 text-sm">₹{product.price_disclosure.retail_fair_margin_inr}</p>
          </div>
        </div>

        <p className="text-[11px] text-stone-500 italic">
          *Note: Cost components are voluntarily declared by the registered producer. Audited independently under CraftTrue India guidelines.
        </p>
      </div>

      {/* 6. EVIDENCED PRODUCTION TIMELINE */}
      {product.production_stages.length > 0 && (
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 sm:p-8 space-y-6">
          <h3 className="font-serif text-xl font-bold text-stone-900 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-amber-700" />
            <span>Evidenced Production Journey (उत्पादन चरण)</span>
          </h3>

          <div className="relative pl-6 space-y-6 border-l-2 border-amber-300 ml-2">
            {product.production_stages.map((stage) => (
              <div key={stage.stage_order} className="relative space-y-1">
                <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-amber-600 border-2 border-white ring-2 ring-amber-200" />
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs">
                  <span className="font-bold text-stone-900 text-sm">
                    Stage {stage.stage_order}: {stage.stage_name}
                  </span>
                  {stage.date_completed && (
                    <span className="text-stone-500 text-[11px]">{stage.date_completed}</span>
                  )}
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">{stage.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 7. PH.D. CONSUMER PERCEPTION SURVEY MODAL / CARD */}
      <div className="bg-gradient-to-br from-amber-900 via-stone-900 to-amber-950 text-white rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ph.D. Doctoral Research Survey • उपभोक्ता अनुसंधान</span>
          </div>
          <h3 className="font-serif text-2xl font-bold">
            Did this verification record change your perception?
          </h3>
          <p className="text-xs text-amber-200/80 leading-relaxed max-w-2xl">
            As part of an academic doctoral study at Delhi Haat and craft markets, your feedback evaluates whether claim-by-claim digital transparency increases consumer trust and willingness to pay (WTP).
          </p>
        </div>

        {surveySubmitted ? (
          <div className="p-6 rounded-xl bg-emerald-950/60 border border-emerald-500 text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
            <h4 className="font-bold text-base text-emerald-200">Response Recorded Successfully!</h4>
            <p className="text-xs text-emerald-300">
              Your anonymized evaluation has been logged for statistical hypothesis testing (H1, H3, H6). Thank you for supporting indigenous craft research!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSurveySubmit} className="space-y-4 pt-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {/* Question 1 */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                <label className="font-medium text-stone-200">
                  1. How clearly did this record explain product authenticity? (1 to 5)
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((val) => (
                    <button
                      type="button"
                      key={val}
                      onClick={() => setUnderstandingScore(val)}
                      className={`flex-1 py-1.5 rounded-lg font-bold transition ${
                        understandingScore === val
                          ? 'bg-amber-500 text-stone-950'
                          : 'bg-white/10 text-stone-300 hover:bg-white/20'
                      }`}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 2 */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                <label className="font-medium text-stone-200">
                  2. Did evidence disclosure increase your trust in this craft? (1 to 5)
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((val) => (
                    <button
                      type="button"
                      key={val}
                      onClick={() => setTrustScore(val)}
                      className={`flex-1 py-1.5 rounded-lg font-bold transition ${
                        trustScore === val
                          ? 'bg-amber-500 text-stone-950'
                          : 'bg-white/10 text-stone-300 hover:bg-white/20'
                      }`}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 3: WTP */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                <label className="font-medium text-stone-200">
                  3. What is your Willingness to Pay (WTP in ₹) for this verified item?
                </label>
                <input
                  type="number"
                  value={wtpAmount}
                  onChange={(e) => setWtpAmount(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-stone-900 border border-white/20 rounded-lg text-white font-mono"
                />
              </div>

              {/* Question 4: Prior Knowledge */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                <label className="font-medium text-stone-200">
                  4. Your prior familiarity with Bagru / Sanganeri printing:
                </label>
                <select
                  value={priorKnowledge}
                  onChange={(e) => setPriorKnowledge(e.target.value as any)}
                  className="w-full px-3 py-2 bg-stone-900 border border-white/20 rounded-lg text-white text-xs"
                >
                  <option value="Novice">Novice (First time learning about it)</option>
                  <option value="Moderate">Moderate (Know basic block printing)</option>
                  <option value="Expert Connoisseur">Expert Connoisseur (Regular patron)</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider transition shadow-md"
            >
              Submit Anonymized Academic Survey Response
            </button>
          </form>
        )}
      </div>

      {/* 8. CONSUMER COMPLAINT & REPORTING MODAL */}
      <div className="text-center pt-4">
        <button
          onClick={() => setComplaintOpen(!complaintOpen)}
          className="text-xs text-rose-700 hover:text-rose-900 font-semibold underline underline-offset-4"
        >
          {complaintOpen ? 'Hide Complaint Form' : 'Suspect a counterfeit or false claim? Report this product'}
        </button>

        {complaintOpen && (
          <div className="mt-4 p-6 rounded-2xl bg-rose-50 border border-rose-200 text-left space-y-4 max-w-xl mx-auto shadow-sm">
            <h4 className="font-bold text-sm text-rose-900 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-700" />
              <span>Consumer Craftwashing Grievance Redressal</span>
            </h4>
            <p className="text-xs text-stone-600">
              Your complaint will be forwarded to the independent audit board for investigation.
            </p>

            {complaintRef ? (
              <div className="p-4 rounded-xl bg-white border border-rose-200 text-xs text-stone-800 space-y-1">
                <p className="font-bold text-emerald-700">Complaint Logged Successfully!</p>
                <p>Tracking Reference Number: <strong className="font-mono text-rose-800">{complaintRef}</strong></p>
                <p className="text-[11px] text-stone-500">You will be notified once field review concludes.</p>
              </div>
            ) : (
              <form onSubmit={handleComplaintSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block text-stone-700 font-medium mb-1">Complaint Category:</label>
                  <select
                    value={complaintCategory}
                    onChange={(e) => setComplaintCategory(e.target.value)}
                    className="w-full p-2 bg-white border border-stone-300 rounded-lg"
                  >
                    <option value="Suspected Machine/Screen Print Imitation">Suspected Machine/Screen Print Imitation</option>
                    <option value="False Origin / Not From Bagru or Sanganer">False Origin / Not From Bagru or Sanganer</option>
                    <option value="False GI Claim">False GI Claim</option>
                    <option value="Misleading Natural Dye Claim">Misleading Natural Dye Claim</option>
                    <option value="Copied or Duplicate QR Label">Copied or Duplicate QR Label</option>
                  </select>
                </div>
                <div>
                  <label className="block text-stone-700 font-medium mb-1">Details &amp; Observations:</label>
                  <textarea
                    rows={3}
                    value={complaintText}
                    onChange={(e) => setComplaintText(e.target.value)}
                    placeholder="Describe why you suspect misrepresentation (e.g., white backing on fabric, lack of block variations)..."
                    className="w-full p-2.5 bg-white border border-stone-300 rounded-lg"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-lg bg-rose-700 hover:bg-rose-800 text-white font-medium text-xs shadow-xs"
                >
                  Submit Complaint &amp; Generate Tracking ID
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
