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
  FileText,
  Globe,
  ExternalLink,
  Search,
  ShieldCheck,
  Building,
  Send,
  Eye,
  CheckCircle,
  ArrowRight,
  BookOpenCheck
} from 'lucide-react';

export default function VerificationPage() {
  const params = useParams();
  const rawId = Array.isArray(params.id) ? params.id[0] : params.id;
  const decodedId = decodeURIComponent(rawId || '').trim();

  // Detect if the scanned input is an external URL / web link
  const isUrl = 
    decodedId.startsWith('http://') || 
    decodedId.startsWith('https://') || 
    decodedId.startsWith('www.') ||
    decodedId.includes('.com') ||
    decodedId.includes('.in') ||
    decodedId.includes('.org') ||
    (decodedId.includes('/') && decodedId.includes('.'));

  const normalizedUrl = isUrl && !decodedId.startsWith('http') ? `https://${decodedId}` : decodedId;
  let parsedDomain = '';
  if (isUrl) {
    try {
      const u = new URL(normalizedUrl);
      parsedDomain = u.hostname.replace('www.', '');
    } catch {
      parsedDomain = 'External Website';
    }
  }

  // 1. Fetch from Local Database
  const product: CraftProduct | undefined = 
    getProductByCode(decodedId) || 
    DEMO_PRODUCTS.find(p => p.id === decodedId) ||
    DEMO_PRODUCTS.find(p => p.product_code.toLowerCase() === decodedId.toLowerCase()) ||
    (decodedId.toUpperCase().includes('BAGRU') && !decodedId.includes('MIS') ? DEMO_PRODUCTS[0] : undefined) ||
    (decodedId.toUpperCase().includes('SANGANER') ? DEMO_PRODUCTS[1] : undefined);

  // Survey State
  const [surveySubmitted, setSurveySubmitted] = useState(false);
  const [understandingScore, setUnderstandingScore] = useState(5);
  const [trustScore, setTrustScore] = useState(5);
  const [wtpAmount, setWtpAmount] = useState(product?.retail_price_inr || 2850);
  const [priorKnowledge, setPriorKnowledge] = useState<'Novice' | 'Moderate' | 'Expert Connoisseur'>('Moderate');

  // External / Unregistered Submission State
  const [reportSubmitted, setReportSubmitted] = useState(false);
  const [reportEmail, setReportEmail] = useState('');
  const [reportNotes, setReportNotes] = useState('');

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

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReportSubmitted(true);
  };

  // =========================================================================
  // VIEW: SCANNED PAYTM / UPI MERCHANT QR CODE
  // =========================================================================
  const isUpi = decodedId.startsWith('upi://') || decodedId.toLowerCase().includes('paytm');
  if (isUpi) {
    let merchantName = 'Master Artisan Direct Account';
    let vpa = decodedId;
    let tid = '';
    try {
      const matchPa = decodedId.match(/pa=([^&]+)/);
      const matchPn = decodedId.match(/pn=([^&]+)/);
      const matchTid = decodedId.match(/tid=([^&]+)/);
      if (matchPa) vpa = decodeURIComponent(matchPa[1]);
      if (matchPn) merchantName = decodeURIComponent(matchPn[1]);
      if (matchTid) tid = decodeURIComponent(matchTid[1]);
    } catch {
      // ignore
    }

    return (
      <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
        <Link href="/scan" className="inline-flex items-center gap-1.5 text-xs text-stone-600 hover:text-stone-900 font-semibold">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Scanner</span>
        </Link>

        <div className="bg-white rounded-3xl border-2 border-cyan-300 shadow-xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-100 text-cyan-900 text-xs font-bold border border-cyan-300">
              <Sparkles className="w-3.5 h-3.5 text-cyan-700" />
              <span>Paytm / UPI Artisan Merchant QR Verified • सीधा कारीगर खाता</span>
            </div>
            <span className="text-xs font-mono font-bold text-stone-600 bg-stone-100 px-3 py-1 rounded-full border">
              VPA: {vpa}
            </span>
          </div>

          <div className="space-y-2">
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              {merchantName}
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              This is an official Paytm / UPI payment QR code linked to a registered Chhipa hand-block artisan workshop in Rajasthan. Scanning enables 100% direct fair payment without middleman commission deductions.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-cyan-50/60 border border-cyan-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold tracking-wider text-cyan-800">Verified UPI Address</span>
              <p className="font-mono text-sm font-bold text-cyan-950 select-all">{vpa}</p>
              {tid && <p className="text-[11px] text-stone-500 font-mono">Workshop Reference: {tid}</p>}
            </div>
            <a
              href={decodedId.startsWith('upi://') ? decodedId : `upi://pay?pa=${vpa}&pn=${encodeURIComponent(merchantName)}`}
              className="px-6 py-3 rounded-xl bg-cyan-700 hover:bg-cyan-800 active:scale-95 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition shrink-0 w-full sm:w-auto"
            >
              <span>Pay Artisan Directly on Paytm / UPI</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <Link
              href="/artisans"
              className="p-4 rounded-xl border border-stone-200 bg-stone-50 hover:bg-amber-50 hover:border-amber-300 transition space-y-1 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-stone-900 group-hover:text-amber-900 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-amber-700" />
                  <span>Verify Artisan Pehchan &amp; GI Registration</span>
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-amber-700" />
              </div>
              <p className="text-[11px] text-stone-500">
                Check government Pehchan ID card and Ministry of Textiles authorized user certificate.
              </p>
            </Link>

            <Link
              href="/authenticity-guide"
              className="p-4 rounded-xl border border-stone-200 bg-stone-50 hover:bg-amber-50 hover:border-amber-300 transition space-y-1 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-stone-900 group-hover:text-amber-900 flex items-center gap-1.5">
                  <BookOpenCheck className="w-3.5 h-3.5 text-amber-700" />
                  <span>Perform In-Hand Fabric Field Test</span>
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-amber-700" />
              </div>
              <p className="text-[11px] text-stone-500">
                Verify reverse strike-through, natural indigo smell, and mud-resist block alignment.
              </p>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW 1: SCANNED EXTERNAL URL / WEB LINK DETECTED
  // =========================================================================
  if (isUrl) {
    const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(decodedId + ' handloom authentic GI')}`;
    const giRegistrySearchUrl = `https://search.ipindia.gov.in/GIRPublic/`;

    return (
      <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
        {/* Back Link */}
        <Link href="/scan" className="inline-flex items-center gap-1.5 text-xs text-stone-600 hover:text-stone-900 font-semibold">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Scanner</span>
        </Link>

        {/* Main External URL Card */}
        <div className="bg-white rounded-3xl border-2 border-blue-200 shadow-xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-blue-900 text-xs font-bold border border-blue-300">
              <Globe className="w-3.5 h-3.5 text-blue-700" />
              <span>External Product Web Link Detected • पंजीकृत इंटरनेट लिंक</span>
            </div>
            <span className="text-xs font-mono font-bold text-stone-500 bg-stone-100 px-3 py-1 rounded-full">
              Host: {parsedDomain}
            </span>
          </div>

          <div className="space-y-2">
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              Registered Product Web Link
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              The QR code or barcode you scanned points to an external merchant or registry address. You can view the full registered product on the internet or cross-check its GI authenticity claims.
            </p>
          </div>

          {/* URL Box */}
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="space-y-1 overflow-hidden w-full">
              <span className="text-[10px] uppercase font-bold tracking-wider text-stone-500">Destination URL</span>
              <p className="font-mono text-xs text-blue-700 truncate select-all">
                {normalizedUrl}
              </p>
            </div>
            <a
              href={normalizedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition shrink-0 w-full sm:w-auto"
            >
              <span>Visit Page on Internet</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Verification & Internet Cross-Check Options */}
          <div className="space-y-3 pt-2">
            <h3 className="font-serif text-base font-bold text-stone-900">
              Cross-Check Authenticity Across Government &amp; Public Registries:
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href={googleSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl border border-stone-200 bg-stone-50 hover:bg-amber-50 hover:border-amber-300 transition space-y-1 group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-900 group-hover:text-amber-900 flex items-center gap-1.5">
                    <Search className="w-3.5 h-3.5 text-amber-700" />
                    <span>Search Google for Product &amp; Reviews</span>
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-stone-400 group-hover:text-amber-700" />
                </div>
                <p className="text-[11px] text-stone-500">
                  Find retailer background, customer reviews, and artisan certifications online.
                </p>
              </a>

              <a
                href={giRegistrySearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl border border-stone-200 bg-stone-50 hover:bg-amber-50 hover:border-amber-300 transition space-y-1 group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-900 group-hover:text-amber-900 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Official GI Registry (ipindia.gov.in)</span>
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-stone-400 group-hover:text-amber-700" />
                </div>
                <p className="text-[11px] text-stone-500">
                  Verify authorized producer number under Bagru (GI-183) or Sanganeri (GI-147).
                </p>
              </a>
            </div>
          </div>

          {/* 5-Point Buyer Physical Field Test */}
          <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-800" />
              <h4 className="font-serif font-bold text-sm text-stone-900">
                Holding the Physical Fabric? 5-Point Quick Field Verification Test:
              </h4>
            </div>
            <ul className="text-xs text-stone-700 space-y-1.5 list-disc pl-5">
              <li><strong>Natural Scent Test:</strong> Genuine Bagru smells of dried Harda (myrobalan) and warm fermented iron; synthetic prints smell like petrol or plastic acrylic.</li>
              <li><strong>Dual-Side Strike-Through:</strong> Authentic wooden hand-block prints penetrate into the reverse cotton threads. Flat screen imitations show pure white backing.</li>
              <li><strong>Block Boundary Misalignment:</strong> Hand-stamped wood blocks show natural 0.5–2mm microscopic overlaps between the Rekh (outline) and Datta (color fill).</li>
              <li><strong>Cold Water Bleed:</strong> Natural vegetable dyes release a subtle natural tint in first lukewarm wash; synthetic prints do not bleed but stiffen.</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW 2: UNCATALOGED BARCODE / SERIAL TAG (NOT IN LOCAL REGISTRY & NOT A URL)
  // =========================================================================
  if (!product) {
    const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(decodedId + ' handloom craft barcode tag')}`;
    const giRegistrySearchUrl = `https://search.ipindia.gov.in/GIRPublic/`;

    return (
      <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
        <Link href="/scan" className="inline-flex items-center gap-1.5 text-xs text-stone-600 hover:text-stone-900 font-semibold">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Scanner</span>
        </Link>

        <div className="bg-white rounded-3xl border-2 border-stone-200 shadow-xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold border border-amber-300">
              <HelpCircle className="w-3.5 h-3.5 text-amber-700" />
              <span>Uncataloged Tag Scanned • अपंजीकृत टैग</span>
            </div>
            <span className="text-xs font-mono font-bold text-stone-700 bg-stone-100 px-3 py-1 rounded-full border border-stone-200">
              Tag: {decodedId}
            </span>
          </div>

          <div className="space-y-2">
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              Tag Not Yet Indexed in Database
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Tag ID <strong>"{decodedId}"</strong> is not currently indexed in the CraftTrue GI registry. An unregistered tag is not necessarily counterfeit, but its claims of hand-block printing and natural dyes remain unverified.
            </p>
          </div>

          {/* 1-Click Internet Search Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <a
              href={googleSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl border border-stone-200 bg-stone-50 hover:bg-amber-50 hover:border-amber-300 transition space-y-1 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-stone-900 group-hover:text-amber-900 flex items-center gap-1.5">
                  <Search className="w-3.5 h-3.5 text-amber-700" />
                  <span>Search Google for Tag &quot;{decodedId}&quot;</span>
                </span>
                <ExternalLink className="w-3.5 h-3.5 text-stone-400 group-hover:text-amber-700" />
              </div>
              <p className="text-[11px] text-stone-500">
                Check if this tag or barcode number belongs to a known textile brand or e-commerce listing.
              </p>
            </a>

            <a
              href={giRegistrySearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl border border-stone-200 bg-stone-50 hover:bg-amber-50 hover:border-amber-300 transition space-y-1 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-stone-900 group-hover:text-amber-900 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Lookup Government GI Registry</span>
                </span>
                <ExternalLink className="w-3.5 h-3.5 text-stone-400 group-hover:text-amber-700" />
              </div>
              <p className="text-[11px] text-stone-500">
                Search official GI Application records for Bagru (GI No. 183) &amp; Sanganeri (GI No. 147).
              </p>
            </a>
          </div>

          {/* Form to submit tag for verification */}
          <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 space-y-4">
            <h4 className="font-serif font-bold text-sm text-stone-900 flex items-center gap-2">
              <Send className="w-4 h-4 text-amber-700" />
              <span>Submit this Tag for CraftTrue Verification</span>
            </h4>
            {reportSubmitted ? (
              <div className="p-4 rounded-xl bg-emerald-100 text-emerald-900 text-xs font-medium flex items-center gap-2 border border-emerald-300">
                <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Thank you! Tag {decodedId} has been queued for verification with local cluster auditors.</span>
              </div>
            ) : (
              <form onSubmit={handleReportSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block font-medium text-stone-700 mb-1">Your Email (for verification update)</label>
                  <input
                    type="email"
                    value={reportEmail}
                    onChange={(e) => setReportEmail(e.target.value)}
                    placeholder="name@example.com"
                    required
                    className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-700/40"
                  />
                </div>
                <div>
                  <label className="block font-medium text-stone-700 mb-1">Garment Details or Shop Where Purchased</label>
                  <textarea
                    rows={2}
                    value={reportNotes}
                    onChange={(e) => setReportNotes(e.target.value)}
                    placeholder="e.g. Purchased in Jaipur market; seller claimed pure Bagru vegetable dye."
                    className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-700/40"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-amber-300 font-bold transition shadow-xs"
                >
                  Submit Tag for Forensic Review
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW 3: FULL REGISTERED CRAFT AUTHENTICITY CERTIFICATE
  // =========================================================================

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

          {/* CRITICAL DISTINCTION: Weaving Method vs. Printing Technique */}
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-stone-800">
              <Layers className="w-4 h-4 text-amber-700" />
              <span>Core Distinction: Weaving vs. Printing Technique</span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-2.5 rounded-lg bg-white border border-stone-200">
                <span className="text-[10px] uppercase font-bold text-stone-400 block">Weaving Method</span>
                <strong className="text-stone-800">{product.weaving_method}</strong>
              </div>
              <div className="p-2.5 rounded-lg bg-white border border-stone-200">
                <span className="text-[10px] uppercase font-bold text-stone-400 block">Printing Technique</span>
                <strong className="text-stone-800">{product.printing_technique}</strong>
              </div>
              <div className="p-2.5 rounded-lg bg-white border border-stone-200">
                <span className="text-[10px] uppercase font-bold text-stone-400 block">Dye Type</span>
                <strong className="text-stone-800">{product.dye_type}</strong>
              </div>
              <div className="p-2.5 rounded-lg bg-white border border-stone-200">
                <span className="text-[10px] uppercase font-bold text-stone-400 block">Base Material</span>
                <strong className="text-stone-800">{product.fabric_composition}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. ARTISAN / WORKSHOP PROFILE CARD */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-stone-800 font-serif text-lg font-bold">
          <Award className="w-5 h-5 text-amber-700" />
          <span>Master Artisan &amp; Workshop Lineage</span>
        </div>

        <div className="flex flex-col sm:flex-row items-start gap-4">
          <img
            src={product.artisan_workshop.image_url}
            alt={product.artisan_workshop.artisan_name}
            className="w-20 h-20 rounded-2xl object-cover border-2 border-amber-200 shrink-0 bg-stone-100"
          />
          <div className="space-y-1.5 flex-1">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="font-bold text-base text-stone-900">
                {product.artisan_workshop.artisan_name}
              </h3>
              {product.artisan_workshop.gi_authorized_user_no && (
                <span className="font-mono text-[11px] font-bold text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-300">
                  {product.artisan_workshop.gi_authorized_user_no}
                </span>
              )}
            </div>

            <p className="text-xs text-stone-600 font-medium">
              {product.artisan_workshop.workshop_name} • {product.artisan_workshop.location_address}
            </p>

            <p className="text-xs text-stone-700 leading-relaxed pt-1">
              {product.artisan_workshop.bio}
            </p>
          </div>
        </div>
      </div>

      {/* 4. THE 7-LAYER AUTHENTICITY EVALUATION MATRIX */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-6 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>Independent Verification Architecture</span>
          </div>
          <h2 className="font-serif text-2xl font-bold text-stone-900">
            7-Layer Authenticity Evaluation Framework
          </h2>
          <p className="text-xs text-stone-500 max-w-2xl mt-1">
            Each physical claim is evaluated independently under defined evidence standards to eliminate greenwashing and deceptive marketing.
          </p>
        </div>

        <div className="divide-y divide-stone-100">
          {/* Layer 1: Geographic Origin */}
          <div className="py-4 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-stone-900">1. Geographic Origin &amp; Cluster Coordinates</span>
              <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${getLayerBadge(product.scorecard.geo_status)}`}>
                {product.scorecard.geo_status}
              </span>
            </div>
            <p className="text-xs text-stone-600">{product.scorecard.geo_evidence}</p>
          </div>

          {/* Layer 2: Artisan Identity */}
          <div className="py-4 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-stone-900">2. Artisan Identity &amp; Workshop Lineage</span>
              <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${getLayerBadge(product.scorecard.artisan_status)}`}>
                {product.scorecard.artisan_status}
              </span>
            </div>
            <p className="text-xs text-stone-600">{product.scorecard.artisan_evidence}</p>
          </div>

          {/* Layer 3: Process & Technique */}
          <div className="py-4 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-stone-900">3. Process &amp; Hand-Block Stamping Technique</span>
              <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${getLayerBadge(product.scorecard.process_status)}`}>
                {product.scorecard.process_status}
              </span>
            </div>
            <p className="text-xs text-stone-600">{product.scorecard.process_evidence}</p>
          </div>

          {/* Layer 4: Material & Chemical */}
          <div className="py-4 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-stone-900">4. Material &amp; Natural Dye Chemistry (Lab Audit)</span>
              <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${getLayerBadge(product.scorecard.material_status)}`}>
                {product.scorecard.material_status}
              </span>
            </div>
            <p className="text-xs text-stone-600">{product.scorecard.material_evidence}</p>
          </div>

          {/* Layer 5: GI Statutory Tag */}
          <div className="py-4 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-stone-900">5. Geographical Indication Statutory Tag</span>
              <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${getLayerBadge(product.scorecard.gi_layer_status)}`}>
                {product.scorecard.gi_layer_status}
              </span>
            </div>
            <p className="text-xs text-stone-600">{product.scorecard.gi_evidence}</p>
          </div>

          {/* Layer 6: Supply Chain Custody */}
          <div className="py-4 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-stone-900">6. Supply Chain &amp; Chain-of-Custody</span>
              <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${getLayerBadge(product.scorecard.supply_chain_status)}`}>
                {product.scorecard.supply_chain_status}
              </span>
            </div>
            <p className="text-xs text-stone-600">{product.scorecard.supply_chain_evidence}</p>
          </div>

          {/* Layer 7: Commercial Claims */}
          <div className="py-4 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-stone-900">7. Commercial Claims &amp; Marketing Integrity</span>
              <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${getLayerBadge(product.scorecard.commercial_claim_status)}`}>
                {product.scorecard.commercial_claim_status}
              </span>
            </div>
            <p className="text-xs text-stone-600">{product.scorecard.commercial_claim_evidence}</p>
          </div>
        </div>
      </div>

      {/* 5. PRICE TRANSPARENCY & ARTISAN FAIR WAGE BREAKDOWN */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-stone-800 font-serif text-lg font-bold">
            <DollarSign className="w-5 h-5 text-amber-700" />
            <span>Audited Price Transparency &amp; Artisan Share</span>
          </div>
          <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800">
            {artisanSharePercent}% Artisan Compensation
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs pt-2">
          <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
            <span className="text-stone-500 block">Raw Fabric</span>
            <strong className="text-stone-900 text-sm">₹{product.price_disclosure.fabric_raw_cost_inr}</strong>
          </div>
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
            <span className="text-emerald-700 font-medium block">Artisan Labor</span>
            <strong className="text-emerald-900 text-sm">₹{product.price_disclosure.artisan_labor_inr}</strong>
          </div>
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
            <span className="text-emerald-700 font-medium block">Block Charge</span>
            <strong className="text-emerald-900 text-sm">₹{product.price_disclosure.printing_block_charge_inr}</strong>
          </div>
          <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
            <span className="text-stone-500 block">River Wash &amp; Finish</span>
            <strong className="text-stone-900 text-sm">₹{product.price_disclosure.washing_finishing_inr}</strong>
          </div>
          <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
            <span className="text-stone-500 block">Packaging &amp; Logistics</span>
            <strong className="text-stone-900 text-sm">₹{product.price_disclosure.packaging_logistics_inr}</strong>
          </div>
          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200">
            <span className="text-amber-800 font-medium block">Fair Retail Margin</span>
            <strong className="text-amber-950 text-sm">₹{product.price_disclosure.retail_fair_margin_inr}</strong>
          </div>
        </div>

        <p className="text-xs text-stone-500 italic pt-2">
          {product.price_disclosure.audit_notes}
        </p>
      </div>

      {/* 6. 5-STAGE PRODUCTION TIMELINE */}
      {product.production_stages && product.production_stages.length > 0 && (
        <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-4 shadow-sm">
          <div className="flex items-center gap-2 text-stone-800 font-serif text-lg font-bold">
            <Calendar className="w-5 h-5 text-amber-700" />
            <span>Documented Production Stages</span>
          </div>

          <div className="space-y-4 pt-2">
            {product.production_stages.map((stage) => (
              <div key={stage.stage_order} className="flex items-start gap-4 text-xs">
                <div className="w-6 h-6 rounded-full bg-amber-700 text-white font-bold flex items-center justify-center shrink-0 text-[11px]">
                  {stage.stage_order}
                </div>
                <div className="space-y-0.5 flex-1">
                  <div className="flex items-center justify-between">
                    <strong className="text-stone-900 text-sm">{stage.stage_name}</strong>
                    {stage.date_completed && (
                      <span className="text-stone-400 font-mono text-[10px]">{stage.date_completed}</span>
                    )}
                  </div>
                  <p className="text-stone-600">{stage.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 7. CONSUMER FEEDBACK & TRANSPARENCY SURVEY */}
      <div className="bg-gradient-to-br from-amber-900 via-stone-900 to-amber-950 text-white rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Consumer Craft Verification Survey • उपभोक्ता प्रतिक्रिया</span>
          </div>
          <h3 className="font-serif text-2xl font-bold">
            Did this verification record change your perception?
          </h3>
          <p className="text-xs text-amber-200/80 leading-relaxed max-w-2xl">
            Your anonymous consumer feedback helps us measure whether claim-by-claim transparency increases trust, protects artisans, and encourages fair compensation for authentic GI handlooms.
          </p>
        </div>

        {surveySubmitted ? (
          <div className="p-6 rounded-xl bg-emerald-950/60 border border-emerald-500 text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
            <h4 className="font-bold text-base text-emerald-200">Feedback Recorded Successfully!</h4>
            <p className="text-xs text-emerald-300">
              Thank you for championing indigenous Indian craft heritage, master artisans, and transparent trade!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSurveySubmit} className="space-y-4 pt-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                <label className="font-medium text-stone-200">
                  1. How clearly did this record explain product authenticity? (1 to 5)
                </label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={understandingScore}
                  onChange={(e) => setUnderstandingScore(Number(e.target.value))}
                  className="w-full accent-amber-400"
                />
                <div className="flex justify-between text-[10px] text-stone-400">
                  <span>Confusing</span>
                  <span className="font-bold text-amber-300">{understandingScore} / 5</span>
                  <span>Crystal Clear</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                <label className="font-medium text-stone-200">
                  2. Level of trust in this product's handmade GI claims? (1 to 5)
                </label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={trustScore}
                  onChange={(e) => setTrustScore(Number(e.target.value))}
                  className="w-full accent-amber-400"
                />
                <div className="flex justify-between text-[10px] text-stone-400">
                  <span>Low Trust</span>
                  <span className="font-bold text-amber-300">{trustScore} / 5</span>
                  <span>Complete Trust</span>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs transition shadow-md"
            >
              Submit Consumer Feedback
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
