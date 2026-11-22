'use client';

import React from 'react';
import Link from 'next/link';
import { 
  QrCode, 
  ShieldCheck, 
  Award, 
  Layers, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  MapPin, 
  FileText,
  UserCheck,
  TrendingUp,
  BarChart3
} from 'lucide-react';
import { DEMO_PRODUCTS } from '@/lib/data/craftData';

export default function HomePage() {
  return (
    <div className="space-y-16 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-amber-50/70 via-white to-[#FAF7F2] pt-12 pb-20 border-b border-amber-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-950 text-xs font-bold border border-amber-200">
                <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                <span>Ph.D. Research Initiative • Combating Craftwashing in Rajasthan</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-stone-900 tracking-tight leading-[1.15]">
                Before You Buy the Craft,{' '}
                <span className="text-amber-800 underline decoration-amber-400 decoration-wavy underline-offset-8">
                  Verify the Craft.
                </span>
              </h1>

              <p className="text-stone-600 text-base sm:text-lg leading-relaxed max-w-2xl">
                Discover the maker, cluster origin, printing technique, and documented evidence behind every registered <strong>Bagru</strong> and <strong>Sanganeri</strong> textile.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href="/scan"
                  className="bg-amber-800 hover:bg-amber-900 text-white px-7 py-3.5 rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition flex items-center gap-2.5 group"
                >
                  <QrCode className="w-4 h-4 text-amber-200" />
                  <span>Scan Product QR Tag</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/artisan/register-product"
                  className="bg-white hover:bg-amber-50 border border-stone-300 text-stone-800 px-6 py-3.5 rounded-xl font-semibold text-sm shadow-xs transition flex items-center gap-2"
                >
                  <UserCheck className="w-4 h-4 text-amber-700" />
                  <span>Artisan Portal &amp; Tag Generator</span>
                </Link>

                <Link
                  href="/research"
                  className="bg-stone-100 hover:bg-stone-200 text-stone-700 px-5 py-3.5 rounded-xl font-semibold text-xs transition flex items-center gap-2"
                >
                  <BarChart3 className="w-4 h-4 text-stone-600" />
                  <span>Ph.D. Analytics</span>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-stone-200 max-w-lg text-xs">
                <div>
                  <p className="font-serif text-2xl font-bold text-stone-900">7-Layer</p>
                  <p className="text-stone-500 font-medium">Evidence Framework</p>
                </div>
                <div>
                  <p className="font-serif text-2xl font-bold text-amber-800">5 States</p>
                  <p className="text-stone-500 font-medium">Nuanced Statuses</p>
                </div>
                <div>
                  <p className="font-serif text-2xl font-bold text-stone-900">2 Clusters</p>
                  <p className="text-stone-500 font-medium">Bagru &amp; Sanganer GI</p>
                </div>
              </div>
            </div>

            {/* Right Visual Card */}
            <div className="lg:col-span-5 relative">
              <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xl space-y-4">
                <div className="relative rounded-2xl overflow-hidden aspect-4/3 bg-stone-100">
                  <img
                    src="https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=800&q=80"
                    alt="Authentic Bagru Dabu Mud-Resist Block Printing"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-stone-900/80 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-1 rounded-md">
                    Bagru Cluster • GI Registered
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      VERIFIED SPECIMEN
                    </span>
                    <span className="font-mono text-xs text-stone-500 font-bold">
                      CTI-BAG-000184
                    </span>
                  </div>
                  <h3 className="font-serif font-bold text-base text-stone-900">
                    Bagru Dabu Mud-Resist Indigo Cotton Dupatta
                  </h3>
                  <p className="text-xs text-stone-500 leading-relaxed">
                    By Mohan Lal Chhipa (5th-Gen Master Printer). 6-step indigo vat immersion, Dabu mud resist, and verifiable batch custody records.
                  </p>
                </div>

                <Link
                  href="/verify/CTI-BAG-000184"
                  className="w-full py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition"
                >
                  <span>Inspect 7-Layer Scorecard</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE CORE PROBLEM: WHAT IS CRAFTWASHING? */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-amber-50/60 border border-amber-200/80 rounded-3xl p-8 sm:p-12 space-y-6">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
              The Ph.D. Problem Statement
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              Why a Simple "Authentic" Label is No Longer Enough
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              In handicraft exhibitions and online marketplaces, consumers frequently encounter rotary screen and digital prints marketed with romanticized artisan buzzwords like <em>"100% Traditional Bagru Handloom"</em> or <em>"Handmade Sanganeri"</em>. 
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="bg-white p-5 rounded-2xl border border-stone-200 space-y-2">
              <h4 className="font-bold text-sm text-stone-900">Conflating Weaving with Printing</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Bagru and Sanganer are <strong>printing techniques</strong>, not weaving styles. A genuine block print can be stamped on handloom, mill cotton, or silk. Misleading labels often claim "handloom" to disguise machine prints.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-stone-200 space-y-2">
              <h4 className="font-bold text-sm text-stone-900">Screen Prints Masquerading as Hand-Block</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Chemical rotary screens mimic block motifs in seconds, costing 1/5th the artisan labor. They lack the manual registration variation and reverse-side dye penetration of true teak-wood hand block stamping.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-stone-200 space-y-2">
              <h4 className="font-bold text-sm text-stone-900">QR Code Counterfeiting</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Anyone can print a generic QR code. Without cryptographic product-level identifiers, evidence linking, and duplicate anomaly detection, a QR code simply repeats whatever the seller claims.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THE 4 DEMONSTRATION SCENARIOS (Direct Tester Links) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
              Interactive Prototype Evaluation
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              The 4 Ph.D. Test Cases in Action
            </h2>
          </div>
          <Link href="/scan" className="text-xs font-bold text-amber-800 hover:text-amber-900 flex items-center gap-1">
            <span>Open Camera Scanner</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {DEMO_PRODUCTS.map((prod) => (
            <div key={prod.id} className="bg-white rounded-2xl border border-stone-200 shadow-xs hover:shadow-md transition overflow-hidden flex flex-col justify-between">
              <div>
                <div className="relative aspect-4/3 bg-stone-100">
                  <img src={prod.image_url} alt={prod.name} className="w-full h-full object-cover" />
                  <div className="absolute top-2 left-2 bg-stone-900/80 text-white text-[10px] font-semibold px-2 py-0.5 rounded">
                    {prod.cluster}
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    prod.verification_status === 'VERIFIED'
                      ? 'bg-emerald-100 text-emerald-800'
                      : prod.verification_status === 'PARTIALLY_VERIFIED'
                      ? 'bg-amber-100 text-amber-800'
                      : prod.verification_status === 'CONFIRMED_MISREPRESENTATION'
                      ? 'bg-rose-100 text-rose-800'
                      : 'bg-orange-100 text-orange-800'
                  }`}>
                    {prod.verification_status}
                  </span>
                  <h4 className="font-bold text-xs sm:text-sm text-stone-900 line-clamp-2">
                    {prod.name}
                  </h4>
                  <p className="text-[11px] text-stone-500 line-clamp-2">
                    {prod.description}
                  </p>
                </div>
              </div>

              <div className="p-4 pt-0">
                <Link
                  href={`/verify/${prod.product_code}`}
                  className="w-full py-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-900 font-semibold text-xs flex items-center justify-center gap-1.5 transition"
                >
                  <span>Verify Record ({prod.product_code})</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. THE 7-LAYER AUTHENTICITY FRAMEWORK EXPLAINER */}
      <section className="bg-stone-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs uppercase font-bold tracking-widest text-amber-400">
              Methodological Core
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold">
              The 7-Layer Authenticity Evaluation Framework (AEF)
            </h2>
            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
              Rather than an arbitrary single score or black-box algorithm, CRAFTTRUE evaluates seven transparent, independent dimensions of craft integrity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-5 rounded-2xl bg-stone-800/80 border border-stone-700 space-y-2">
              <span className="font-mono text-amber-400 text-xs font-bold">01 / GEOGRAPHY</span>
              <h4 className="font-bold text-sm text-white">Geographical Authenticity</h4>
              <p className="text-stone-400 leading-relaxed">
                Verification that production occurred within the designated GI geographical boundaries of Bagru or Sanganer.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-stone-800/80 border border-stone-700 space-y-2">
              <span className="font-mono text-amber-400 text-xs font-bold">02 / MAKER</span>
              <h4 className="font-bold text-sm text-white">Artisan &amp; Workshop Identity</h4>
              <p className="text-stone-400 leading-relaxed">
                Validation of the generational Chhipa artisan, registered workshop, or verified cooperative identity.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-stone-800/80 border border-stone-700 space-y-2">
              <span className="font-mono text-amber-400 text-xs font-bold">03 / TECHNIQUE</span>
              <h4 className="font-bold text-sm text-white">Printing Process Authenticity</h4>
              <p className="text-stone-400 leading-relaxed">
                Differentiating authentic hand-block stamping (carved teak blocks) from mechanized screen or digital printing.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-stone-800/80 border border-stone-700 space-y-2">
              <span className="font-mono text-amber-400 text-xs font-bold">04 / MATERIALS</span>
              <h4 className="font-bold text-sm text-white">Material &amp; Dye Chemistry</h4>
              <p className="text-stone-400 leading-relaxed">
                Disclosing whether fabric is handloom or mill cotton, and whether dyes are natural vegetable/Dabu or synthetic pigments.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-stone-800/80 border border-stone-700 space-y-2">
              <span className="font-mono text-amber-400 text-xs font-bold">05 / GI REGISTRY</span>
              <h4 className="font-bold text-sm text-white">GI &amp; Certification Status</h4>
              <p className="text-stone-400 leading-relaxed">
                Cross-checking Authorised User registration numbers against the official Geographical Indications Registry.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-stone-800/80 border border-stone-700 space-y-2">
              <span className="font-mono text-amber-400 text-xs font-bold">06 / CUSTODY</span>
              <h4 className="font-bold text-sm text-white">Supply-Chain Traceability</h4>
              <p className="text-stone-400 leading-relaxed">
                Documenting production custody stages from fabric scouring and Dabu mud resist to natural river washing.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-stone-800/80 border border-stone-700 space-y-2">
              <span className="font-mono text-amber-400 text-xs font-bold">07 / TRUTHFULNESS</span>
              <h4 className="font-bold text-sm text-white">Commercial Claim Authenticity</h4>
              <p className="text-stone-400 leading-relaxed">
                Auditing whether the seller's advertised marketplace claims and prices faithfully reflect the verified evidence.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-amber-900/40 border border-amber-700/60 space-y-2 flex flex-col justify-between">
              <div>
                <span className="font-mono text-amber-300 text-xs font-bold">5 OUTCOMES</span>
                <h4 className="font-bold text-sm text-white">Nuanced Verification</h4>
                <p className="text-amber-200/80 leading-relaxed">
                  Verified, Partially Verified, Unverified, Under Investigation, or Confirmed Misrepresentation.
                </p>
              </div>
              <Link href="/scan" className="text-amber-300 font-bold flex items-center gap-1 hover:underline">
                <span>Test in scanner</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
