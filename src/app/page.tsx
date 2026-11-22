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
  BarChart3,
  ShoppingBag,
  BookOpenCheck,
  Eye,
  HeartHandshake
} from 'lucide-react';
import { DEMO_PRODUCTS } from '@/lib/data/craftData';

export default function HomePage() {
  return (
    <div className="space-y-16 pb-16">
      
      {/* 1. HERO SECTION - AUTHENTIC HANDLOOM & HANDICRAFT AESTHETIC */}
      <section className="relative overflow-hidden bg-gradient-to-b from-amber-50/80 via-white to-[#FAF7F2] pt-10 pb-20 border-b border-amber-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-950 text-xs font-bold border border-amber-300">
                <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                <span>National Craft Authenticity Initiative • Combating Craftwashing in Rajasthan GI Clusters</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-stone-900 tracking-tight leading-[1.15]">
                Before You Buy the Craft,{' '}
                <span className="text-amber-800 underline decoration-amber-400 decoration-wavy underline-offset-8">
                  Verify the Craft.
                </span>
              </h1>

              <p className="text-stone-700 text-base sm:text-lg leading-relaxed max-w-2xl">
                India’s first QR-based authenticity and traceability platform for <strong>Bagru Hand Block Print (GI No. 183)</strong> and <strong>Sanganeri Hand Block Printing (GI No. 147)</strong>. Discover the generational Chhipa maker, natural dye recipes, and documented physical evidence behind every genuine textile.
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
                  href="/authenticity-guide"
                  className="bg-amber-100 hover:bg-amber-200 border border-amber-300 text-amber-950 px-6 py-3.5 rounded-xl font-bold text-sm shadow-xs transition flex items-center gap-2"
                >
                  <BookOpenCheck className="w-4 h-4 text-amber-800" />
                  <span>Buyer Authenticity Guide</span>
                </Link>

                <Link
                  href="/products"
                  className="bg-white hover:bg-stone-50 border border-stone-300 text-stone-800 px-5 py-3.5 rounded-xl font-semibold text-xs shadow-xs transition flex items-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4 text-stone-600" />
                  <span>Browse GI Catalog</span>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-stone-200 max-w-lg text-xs">
                <div>
                  <p className="font-serif text-2xl font-bold text-stone-900">7-Layer</p>
                  <p className="text-stone-500 font-medium">Evidence Framework</p>
                </div>
                <div>
                  <p className="font-serif text-2xl font-bold text-amber-800">40 Fabrics</p>
                  <p className="text-stone-500 font-medium">Empirical Research</p>
                </div>
                <div>
                  <p className="font-serif text-2xl font-bold text-stone-900">2 Clusters</p>
                  <p className="text-stone-500 font-medium">Bagru &amp; Sanganer GI</p>
                </div>
              </div>
            </div>

            {/* Right Visual Card - Authentic Hand Block Printing Imagery */}
            <div className="lg:col-span-5 relative">
              <div className="bg-white rounded-3xl p-6 border border-amber-200/80 shadow-xl space-y-4">
                <div className="relative rounded-2xl overflow-hidden aspect-4/3 bg-stone-100 border border-amber-100">
                  <img
                    src="/images/textiles/bagru-fadat.jpg"
                    alt="Authentic Bagru Fadat Hand Block Printing on Harda-Mordanted Cotton"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-amber-950/85 backdrop-blur-xs text-amber-200 text-[11px] font-bold px-3 py-1 rounded-md border border-amber-700/50 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-amber-400" />
                    <span>Bagru Cluster • GI No. 183</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      VERIFIED MASTERWORK
                    </span>
                    <span className="font-mono text-xs text-amber-900 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      BAGRU-LCD-F001
                    </span>
                  </div>
                  <h3 className="font-serif font-bold text-base text-stone-900">
                    Bagru Classic Fadat Hand-Block Cotton Dupatta
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    By <strong>Lalchand &apos;Chippa&apos; Derawala</strong> (National Awardee 1999). Hand-printed with seasoned Rorda wooden blocks using natural iron-jaggery syahi and alum-madder red on warm cream Harda base.
                  </p>
                </div>

                <div className="pt-2 flex items-center gap-2">
                  <Link
                    href="/verify/BAGRU-LCD-F001"
                    className="flex-1 py-2.5 bg-amber-900 hover:bg-amber-950 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition shadow-sm"
                  >
                    <span>Inspect 7-Layer Scorecard</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    href="/authenticity-guide"
                    className="px-3 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-semibold flex items-center gap-1 transition"
                    title="How to verify this sample in hand"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Field Guide</span>
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. THE 2 GI CLUSTERS: BAGRU VS SANGANER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
            Cluster Heritage Spotlight
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
            Two Distinct Rajasthani GI Traditions
          </h2>
          <p className="text-stone-600 text-sm">
            Bagru and Sanganer are geographically adjacent clusters in Jaipur district, yet each holds distinct Geographical Indication specifications, chemical recipes, and design vocabularies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Cluster 1: Bagru */}
          <div className="bg-gradient-to-br from-[#FDF8F0] to-white rounded-3xl p-8 border-2 border-amber-200/90 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-amber-900 uppercase tracking-wider">GI Application No. 183</span>
                <h3 className="font-serif text-2xl font-bold text-stone-900 mt-1">Bagru Hand Block Print</h3>
                <p className="text-xs text-stone-500">Registered: 11 May 2011 • Jaipur District</p>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center font-serif text-xl font-bold text-amber-900 border border-amber-300">
                बागरू
              </div>
            </div>

            <p className="text-stone-600 text-xs leading-relaxed">
              Renowned for <strong>Dabu mud-resist</strong> (kaali mitti and sawdust paste) submerged in subterranean natural indigo vats, and classic <strong>fadat</strong> printing. Fabrics have a characteristic yellowish-cream ground mordanted with Harda (myrobalan) tannin.
            </p>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-white p-3 rounded-xl border border-stone-200">
                <span className="font-bold text-stone-900 block">Ground Tone</span>
                <span className="text-stone-600">Warm cream / dyed indigo</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-stone-200">
                <span className="font-bold text-stone-900 block">Primary Motifs</span>
                <span className="text-stone-600">Kangura, Leher, Stylized Butas</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-stone-200">
                <span className="font-bold text-stone-900 block">Dye Recipes</span>
                <span className="text-stone-600">Natural Indigo, Syahi, Madder</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-stone-200">
                <span className="font-bold text-stone-900 block">Master Heritage</span>
                <span className="text-stone-600">Lalchand Derawala (1993)</span>
              </div>
            </div>

            <Link
              href="/products?cluster=bagru"
              className="inline-flex items-center gap-2 text-xs font-bold text-amber-900 hover:text-amber-950 underline underline-offset-4"
            >
              <span>Explore Verified Bagru Collection</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Cluster 2: Sanganer */}
          <div className="bg-gradient-to-br from-[#F5F8FA] to-white rounded-3xl p-8 border-2 border-sky-200/90 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-sky-900 uppercase tracking-wider">GI Application No. 147</span>
                <h3 className="font-serif text-2xl font-bold text-stone-900 mt-1">Sanganeri Hand Block Printing</h3>
                <p className="text-xs text-stone-500">Registered: 19 March 2009 • Jaipur District</p>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-sky-100 flex items-center justify-center font-serif text-xl font-bold text-sky-900 border border-sky-300">
                सांगानेर
              </div>
            </div>

            <p className="text-stone-600 text-xs leading-relaxed">
              Celebrated for exquisite <strong>fine floral boota and bootie</strong> motifs printed on sparkling white river-washed cotton mulmul and Bangalore silk. Natural vegetable extracts include Tesu (flame of the forest), Anar chilka (pomegranate), and Manjith.
            </p>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-white p-3 rounded-xl border border-stone-200">
                <span className="font-bold text-stone-900 block">Ground Tone</span>
                <span className="text-stone-600">Pure sparkling river white</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-stone-200">
                <span className="font-bold text-stone-900 block">Primary Motifs</span>
                <span className="text-stone-600">Delicate Boota, Kamal, Floral Jaals</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-stone-200">
                <span className="font-bold text-stone-900 block">Dye Recipes</span>
                <span className="text-stone-600">Tesu, Anar chilka, Manjith</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-stone-200">
                <span className="font-bold text-stone-900 block">Master Heritage</span>
                <span className="text-stone-600">Brij Ballabh Udaiwal (Shilpi)</span>
              </div>
            </div>

            <Link
              href="/products?cluster=sanganer"
              className="inline-flex items-center gap-2 text-xs font-bold text-sky-900 hover:text-sky-950 underline underline-offset-4"
            >
              <span>Explore Verified Sanganeri Collection</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
      </section>

      {/* 3. BUYER ASSURANCE: 5 PHYSICAL CHECKS PROMO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-amber-900 via-amber-950 to-stone-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-amber-800/40 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs uppercase font-bold tracking-widest text-amber-300 bg-amber-400/20 px-3 py-1 rounded-full border border-amber-300/30">
                Consumer Field Manual
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-amber-100">
                Can You Tell a Real Block Print from a Screen Print?
              </h2>
              <p className="text-stone-300 text-sm leading-relaxed max-w-2xl">
                Our 40-fabric empirical study discovered that <strong>12.5% of retail items</strong> marketed as &quot;traditional handloom block prints&quot; are actually cheap rotary screen prints with zero artisan wages. Learn the 5 physical tests: reverse strike-through, ground color, block overlaps, and natural scent.
              </p>
              
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  href="/authenticity-guide"
                  className="bg-amber-400 hover:bg-amber-300 text-stone-950 px-6 py-3 rounded-xl font-bold text-xs shadow-md transition flex items-center gap-2"
                >
                  <BookOpenCheck className="w-4 h-4" />
                  <span>Open Full Authenticity Guide</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/research"
                  className="text-amber-200 hover:text-white text-xs font-semibold underline underline-offset-4"
                >
                  View 40-Sample Research Matrix →
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4 bg-white/10 rounded-2xl p-5 border border-white/20 backdrop-blur-xs space-y-3 text-xs">
              <span className="font-bold text-amber-300 uppercase tracking-wider block">The 3-Second Rule</span>
              <div className="space-y-2 text-stone-200">
                <p>✓ <strong>Flip the fabric:</strong> Real block print bleeds 60-90% to the back.</p>
                <p>✓ <strong>Smell the cloth:</strong> Earthy iron-jaggery aroma, not plastic.</p>
                <p>✓ <strong>Scan the QR tag:</strong> Verify batch provenance on CRAFTTRUE.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. VERIFICATION IN ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
              Tested Craft Verifications
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              Craft Authenticity Verification in Action
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              Verify authentic handlooms vs. craftwashed imitations directly against the 7-Layer Authenticity Framework.
            </p>
          </div>
          <Link href="/scan" className="text-xs font-bold text-amber-800 hover:text-amber-900 flex items-center gap-1">
            <span>Open Interactive Camera Scanner</span>
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

      {/* 5. THE 7-LAYER AUTHENTICITY FRAMEWORK (AEF) */}
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
                Validation of generational Chhipa artisans, registered workshops, and Pehchan artisan card registry.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-stone-800/80 border border-stone-700 space-y-2">
              <span className="font-mono text-amber-400 text-xs font-bold">03 / TECHNIQUE</span>
              <h4 className="font-bold text-sm text-white">Printing Process Authenticity</h4>
              <p className="text-stone-400 leading-relaxed">
                Differentiating hand-carved teak/rorda wood block stamping from mechanized rotary screens.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-stone-800/80 border border-stone-700 space-y-2">
              <span className="font-mono text-amber-400 text-xs font-bold">04 / MATERIALS</span>
              <h4 className="font-bold text-sm text-white">Material &amp; Dye Chemistry</h4>
              <p className="text-stone-400 leading-relaxed">
                Disclosing handloom cotton weave vs mill polyester, and vegetable/Dabu extracts vs synthetic azo pigments.
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
                Documenting production custody stages from fabric scouring and Dabu mud resist to open sun baking.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-stone-800/80 border border-stone-700 space-y-2">
              <span className="font-mono text-amber-400 text-xs font-bold">07 / TRUTHFULNESS</span>
              <h4 className="font-bold text-sm text-white">Commercial Claim Authenticity</h4>
              <p className="text-stone-400 leading-relaxed">
                Auditing whether advertised retail descriptions and prices faithfully reflect verified batch evidence.
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
