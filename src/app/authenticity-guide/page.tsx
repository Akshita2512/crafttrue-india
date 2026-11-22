'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Search, 
  AlertTriangle, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  QrCode, 
  Layers, 
  Eye, 
  Wind, 
  HandMetal, 
  Compass, 
  FileText,
  HelpCircle,
  ArrowRight
} from 'lucide-react';
import { RESEARCH_FABRIC_STUDY } from '@/lib/data/craftData';

export default function AuthenticityGuidePage() {
  const [activeTab, setActiveTab] = useState<'tests' | 'study' | 'comparison'>('tests');

  // Interactive Checklist State
  const [checklist, setChecklist] = useState({
    strikeThrough: false,
    groundTone: false,
    blockMisalignment: false,
    dabuCrackle: false,
    earthyAroma: false,
  });

  const checkedCount = Object.values(checklist).filter(Boolean).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* 1. HERO HEADER */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-900 via-amber-950 to-stone-900 text-white p-8 sm:p-12 shadow-xl border border-amber-800/40">
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-400/30">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Buyer Assurance &amp; Field Verification Guide</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-amber-100">
            How to Spot Authentic Hand-Block Prints
          </h1>

          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            Craftwashing has flooded retail markets with industrial screen prints falsely labeled as authentic GI-tagged Bagru and Sanganeri textiles. This guide empowers conscious buyers with forensic, sensory, and digital verification parameters developed through forensic laboratory and artisan field research.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-3">
            <button
              onClick={() => setActiveTab('tests')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition ${
                activeTab === 'tests' 
                  ? 'bg-amber-500 text-stone-950 shadow-md' 
                  : 'bg-white/10 hover:bg-white/20 text-stone-200'
              }`}
            >
              5-Point In-Hand Field Test
            </button>
            <button
              onClick={() => setActiveTab('study')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition ${
                activeTab === 'study' 
                  ? 'bg-amber-500 text-stone-950 shadow-md' 
                  : 'bg-white/10 hover:bg-white/20 text-stone-200'
              }`}
            >
              40-Fabric Empirical Research Study
            </button>
            <button
              onClick={() => setActiveTab('comparison')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition ${
                activeTab === 'comparison' 
                  ? 'bg-amber-500 text-stone-950 shadow-md' 
                  : 'bg-white/10 hover:bg-white/20 text-stone-200'
              }`}
            >
              Hand-Block vs Screen Comparison
            </button>
          </div>
        </div>

        {/* Decorative background textile motif */}
        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none translate-x-12 translate-y-12">
          <div className="w-96 h-96 rounded-full border-16 border-amber-200" />
        </div>
      </div>

      {/* 2. TAB CONTENT: 5-POINT FIELD TESTS */}
      {activeTab === 'tests' && (
        <div className="space-y-10">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              The 5-Point Physical Field Verification Protocol
            </h2>
            <p className="text-stone-600 text-sm mt-1">
              You do not need a laboratory to test fabric authenticity. Follow these 5 tactile and visual inspection techniques used by traditional master Chhipas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Test 1 */}
            <div className="bg-white rounded-2xl p-6 border border-amber-200/80 shadow-xs space-y-4 relative overflow-hidden">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold font-serif text-lg">
                01
              </div>
              <h3 className="font-serif text-lg font-bold text-stone-900">
                The Reverse Strike-Through Test (छाप गहराई)
              </h3>
              <p className="text-stone-600 text-xs leading-relaxed">
                Flip the garment over and examine the back of the cloth. Hand-block printing presses liquid dye deep into the weave fibers with the artisan’s fist, achieving <strong>60% to 90% dye penetration</strong> on the reverse side.
              </p>
              <div className="bg-amber-50 rounded-xl p-3 text-[11px] text-amber-950 border border-amber-200">
                <strong>🚨 Screen Print Red Flag:</strong> If the back is completely white or pale, the pigment was sprayed onto the surface by an industrial machine screen.
              </div>
            </div>

            {/* Test 2 */}
            <div className="bg-white rounded-2xl p-6 border border-amber-200/80 shadow-xs space-y-4 relative overflow-hidden">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold font-serif text-lg">
                02
              </div>
              <h3 className="font-serif text-lg font-bold text-stone-900">
                Ground Tone &amp; Base Cloth (ज़मीन का रंग)
              </h3>
              <p className="text-stone-600 text-xs leading-relaxed">
                Check the background color:
                <br />• <strong>Bagru (GI No. 183):</strong> Uses a warm yellowish-cream or dyed indigo base, pre-treated with Harda (myrobalan fruit extract).
                <br />• <strong>Sanganer (GI No. 147):</strong> Uses a sparkling white base bleached and washed in flowing river waters.
              </p>
              <div className="bg-amber-50 rounded-xl p-3 text-[11px] text-amber-950 border border-amber-200">
                <strong>🚨 Screen Print Red Flag:</strong> Bright, fluorescent optical-white fabric with chemical blue tint indicates industrial mill bleaching.
              </div>
            </div>

            {/* Test 3 */}
            <div className="bg-white rounded-2xl p-6 border border-amber-200/80 shadow-xs space-y-4 relative overflow-hidden">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold font-serif text-lg">
                03
              </div>
              <h3 className="font-serif text-lg font-bold text-stone-900">
                Block Misregistration &amp; Join Marks (रेख और दता)
              </h3>
              <p className="text-stone-600 text-xs leading-relaxed">
                Hand block printing uses separate wooden blocks for outline (<em>Rekh</em>) and color fill (<em>Datta</em>). Look closely at motif edges: genuine prints feature <strong>subtle 0.5mm – 2mm misalignments</strong> and natural palm-strike pressure gradients.
              </p>
              <div className="bg-amber-50 rounded-xl p-3 text-[11px] text-amber-950 border border-amber-200">
                <strong>🚨 Screen Print Red Flag:</strong> Computer-perfect alignment across 60 meters with zero human touch variation is definitive proof of mechanization.
              </div>
            </div>

            {/* Test 4 */}
            <div className="bg-white rounded-2xl p-6 border border-amber-200/80 shadow-xs space-y-4 relative overflow-hidden">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold font-serif text-lg">
                04
              </div>
              <h3 className="font-serif text-lg font-bold text-stone-900">
                Dabu Mud-Resist Crackle Lines (डाबू मिट्टी दरारें)
              </h3>
              <p className="text-stone-600 text-xs leading-relaxed">
                In Bagru Dabu prints, black clay mud (<em>kaali mitti</em>) and sawdust resist are applied before indigo immersion. As the mud dries under the sun, it develops <strong>fine organic hairline fracture cracks</strong> that dye seeps into randomly.
              </p>
              <div className="bg-amber-50 rounded-xl p-3 text-[11px] text-amber-950 border border-amber-200">
                <strong>🚨 Screen Print Red Flag:</strong> Screen printers mimic this using repeating batik roller templates where identical crackle lines repeat every 80cm.
              </div>
            </div>

            {/* Test 5 */}
            <div className="bg-white rounded-2xl p-6 border border-amber-200/80 shadow-xs space-y-4 relative overflow-hidden">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold font-serif text-lg">
                05
              </div>
              <h3 className="font-serif text-lg font-bold text-stone-900">
                Aroma &amp; Tactile Drape (खुशबू और छुअन)
              </h3>
              <p className="text-stone-600 text-xs leading-relaxed">
                Smell and touch the garment:
                <br />• <strong>Authentic:</strong> Earthy, mild tannin aroma from fermented iron-jaggery (<em>syahi</em>) and acacia gum. Soft, breathable hand-feel.
                <br />• <strong>Fake:</strong> Harsh petroleum/acrylic chemical smell from synthetic binder adhesives.
              </p>
              <div className="bg-amber-50 rounded-xl p-3 text-[11px] text-amber-950 border border-amber-200">
                <strong>🚨 Screen Print Red Flag:</strong> A rubbery, plastic surface feel where paint creates a stiff coating on top of the weave.
              </div>
            </div>

            {/* Interactive Checklist Widget */}
            <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 rounded-2xl p-6 border-2 border-amber-300 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-serif font-bold text-stone-900 text-base">In-Hand Quick Check</span>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-800 text-white">
                  Score: {checkedCount}/5
                </span>
              </div>
              <p className="text-stone-700 text-xs">
                Inspect your garment right now. Tick the boxes that apply:
              </p>

              <div className="space-y-2 text-xs">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={checklist.strikeThrough}
                    onChange={(e) => setChecklist({ ...checklist, strikeThrough: e.target.checked })}
                    className="rounded text-amber-800 focus:ring-amber-700 mt-0.5"
                  />
                  <span className="text-stone-800">Print clearly visible on the reverse side (60%+ strike-through)</span>
                </label>

                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={checklist.groundTone}
                    onChange={(e) => setChecklist({ ...checklist, groundTone: e.target.checked })}
                    className="rounded text-amber-800 focus:ring-amber-700 mt-0.5"
                  />
                  <span className="text-stone-800">Warm Harda cream (Bagru) or soft river-washed white (Sanganer)</span>
                </label>

                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={checklist.blockMisalignment}
                    onChange={(e) => setChecklist({ ...checklist, blockMisalignment: e.target.checked })}
                    className="rounded text-amber-800 focus:ring-amber-700 mt-0.5"
                  />
                  <span className="text-stone-800">Micro-misalignments visible between outline and fill blocks</span>
                </label>

                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={checklist.dabuCrackle}
                    onChange={(e) => setChecklist({ ...checklist, dabuCrackle: e.target.checked })}
                    className="rounded text-amber-800 focus:ring-amber-700 mt-0.5"
                  />
                  <span className="text-stone-800">Organic, non-repeating mud crackles (for Dabu prints)</span>
                </label>

                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={checklist.earthyAroma}
                    onChange={(e) => setChecklist({ ...checklist, earthyAroma: e.target.checked })}
                    className="rounded text-amber-800 focus:ring-amber-700 mt-0.5"
                  />
                  <span className="text-stone-800">Earthy natural aroma; zero chemical plastic or solvent odor</span>
                </label>
              </div>

              <div className="pt-2 border-t border-amber-200">
                {checkedCount >= 4 ? (
                  <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>High Probability of Genuine Hand-Block Craft!</span>
                  </div>
                ) : checkedCount >= 2 ? (
                  <div className="flex items-center gap-2 text-amber-800 font-bold text-xs">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span>Inconclusive — Check QR tag or request artisan batch record.</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-rose-800 font-bold text-xs">
                    <XCircle className="w-4 h-4 text-rose-600" />
                    <span>High Risk of Machine Screen Craftwashing!</span>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* 3. TAB CONTENT: 40-FABRIC EMPIRICAL STUDY */}
      {activeTab === 'study' && (
        <div className="space-y-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold mb-2">
              <span>Cluster Fieldwork Baseline • 40 Fabric Samples</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              Fabric Analysis &amp; Craftwashing Discovery Matrix
            </h2>
            <p className="text-stone-600 text-sm mt-1 max-w-3xl">
              Forensic inspection of 40 textile samples collected across Jaipur, Bagru, Sanganer, and commercial fashion retail markets revealed a <strong>12.5% market contamination rate</strong> where industrial screen and digital imitations were falsely passed off as traditional hand-block craft.
            </p>
          </div>

          {/* Metrics summary */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 border-2 border-emerald-300 shadow-xs">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Authentic Bagru</span>
              <p className="font-serif text-4xl font-extrabold text-stone-900 mt-2">16 <span className="text-lg font-normal text-stone-500">/ 40</span></p>
              <p className="text-emerald-700 font-bold text-sm mt-1">40.0% of Market Sample</p>
              <p className="text-stone-500 text-xs mt-2">Dabu mud-resist, iron syahi black, alum-madder red, visible palm strike irregularities.</p>
            </div>

            <div className="bg-white rounded-2xl p-6 border-2 border-blue-300 shadow-xs">
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Authentic Sanganer</span>
              <p className="font-serif text-4xl font-extrabold text-stone-900 mt-2">19 <span className="text-lg font-normal text-stone-500">/ 40</span></p>
              <p className="text-blue-700 font-bold text-sm mt-1">47.5% of Market Sample</p>
              <p className="text-stone-500 text-xs mt-2">Fine boota and floral jaal, pure white bleached ground, delicate two-tone Rekh-Datta blocks.</p>
            </div>

            <div className="bg-white rounded-2xl p-6 border-2 border-rose-300 shadow-xs">
              <span className="text-xs font-bold text-rose-700 uppercase tracking-wider">Imitation / Craftwashed</span>
              <p className="font-serif text-4xl font-extrabold text-rose-700 mt-2">5 <span className="text-lg font-normal text-stone-500">/ 40</span></p>
              <p className="text-rose-700 font-bold text-sm mt-1">12.5% Contamination Rate</p>
              <p className="text-stone-500 text-xs mt-2">Excessive motif uniformity, zero reverse strike-through, mechanical screen repetition, synthetic pigment smell.</p>
            </div>
          </div>

          {/* Sample observations table */}
          <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
            <div className="p-4 bg-stone-50 border-b border-stone-200 flex items-center justify-between">
              <h3 className="font-serif font-bold text-stone-900 text-sm">Key Empirical Sample Observations</h3>
              <span className="text-xs text-stone-500">Derived from Laboratory Fabric Analysis Sheet</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-stone-100 text-stone-700 uppercase tracking-wider font-semibold border-b border-stone-200">
                  <tr>
                    <th className="px-4 py-3">Sample #</th>
                    <th className="px-4 py-3">Cluster Style</th>
                    <th className="px-4 py-3">Observed Technique</th>
                    <th className="px-4 py-3">Authenticity Verdict</th>
                    <th className="px-4 py-3">Forensic Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200 text-stone-700">
                  {RESEARCH_FABRIC_STUDY.sampleObservations.map((s) => (
                    <tr key={s.id} className={s.result.includes('Imitation') ? 'bg-rose-50/60' : 'hover:bg-stone-50'}>
                      <td className="px-4 py-3 font-mono font-bold text-stone-900">Sample #{s.id}</td>
                      <td className="px-4 py-3 font-semibold">{s.type}</td>
                      <td className="px-4 py-3">{s.technique}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                          s.result === 'Authentic' 
                            ? 'bg-emerald-100 text-emerald-800' 
                            : 'bg-rose-100 text-rose-800'
                        }`}>
                          {s.result}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-stone-600 max-w-md">{s.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 4. TAB CONTENT: HAND-BLOCK VS SCREEN COMPARISON */}
      {activeTab === 'comparison' && (
        <div className="space-y-8">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              Forensic Comparison: Hand-Block vs Industrial Look-Alike
            </h2>
            <p className="text-stone-600 text-sm mt-1">
              Use this head-to-head reference matrix whenever shopping online or at retail craft expos.
            </p>
          </div>

          <div className="overflow-x-auto bg-white rounded-2xl border border-stone-200 shadow-xs">
            <table className="w-full text-xs text-left">
              <thead className="bg-amber-900 text-amber-100 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="px-5 py-4 w-1/4">Evaluation Parameter</th>
                  <th className="px-5 py-4 w-3/8 bg-emerald-950/20 text-emerald-950 font-bold">
                    Genuine Hand-Block Print (Bagru / Sanganer)
                  </th>
                  <th className="px-5 py-4 w-3/8 bg-rose-950/10 text-rose-950 font-bold">
                    Industrial Screen / Machine Imitation
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 text-stone-700">
                <tr>
                  <td className="px-5 py-3.5 font-bold text-stone-900">Reverse Side Color</td>
                  <td className="px-5 py-3.5 text-emerald-900 bg-emerald-50/30">
                    60%–90% print strike-through; colors rich on back side.
                  </td>
                  <td className="px-5 py-3.5 text-rose-900 bg-rose-50/30">
                    Completely blank or stark pale white on reverse.
                  </td>
                </tr>
                <tr>
                  <td className="px-5 py-3.5 font-bold text-stone-900">Ground Base Color</td>
                  <td className="px-5 py-3.5 text-emerald-900 bg-emerald-50/30">
                    Warm yellowish Harda cream (Bagru) or natural river white (Sanganer).
                  </td>
                  <td className="px-5 py-3.5 text-rose-900 bg-rose-50/30">
                    Harsh, optical-white synthetic bleached fabric.
                  </td>
                </tr>
                <tr>
                  <td className="px-5 py-3.5 font-bold text-stone-900">Motif Alignment</td>
                  <td className="px-5 py-3.5 text-emerald-900 bg-emerald-50/30">
                    Slight human micro-irregularities (0.5mm – 2mm) at block boundaries.
                  </td>
                  <td className="px-5 py-3.5 text-rose-900 bg-rose-50/30">
                    Laser-perfect, machine-repeated alignment every 60–90cm.
                  </td>
                </tr>
                <tr>
                  <td className="px-5 py-3.5 font-bold text-stone-900">Dabu Crackle Pattern</td>
                  <td className="px-5 py-3.5 text-emerald-900 bg-emerald-50/30">
                    Random, organic hairline cracks formed by sun-baked kaali mitti mud.
                  </td>
                  <td className="px-5 py-3.5 text-rose-900 bg-rose-50/30">
                    Identical, repetitive crackle pattern printed across the entire roll.
                  </td>
                </tr>
                <tr>
                  <td className="px-5 py-3.5 font-bold text-stone-900">Smell &amp; Hand-Feel</td>
                  <td className="px-5 py-3.5 text-emerald-900 bg-emerald-50/30">
                    Earthy tannin, fermented iron and indigo aroma; soft breathable drape.
                  </td>
                  <td className="px-5 py-3.5 text-rose-900 bg-rose-50/30">
                    Chemical petroleum binder smell; plastic or rubbery surface feel.
                  </td>
                </tr>
                <tr>
                  <td className="px-5 py-3.5 font-bold text-stone-900">GI Protection</td>
                  <td className="px-5 py-3.5 text-emerald-900 bg-emerald-50/30">
                    Registered GI No. 183 (Bagru) or GI No. 147 (Sanganer) with authorized user tag.
                  </td>
                  <td className="px-5 py-3.5 text-rose-900 bg-rose-50/30">
                    Vague terms like &quot;Jaipuri Style Print&quot;, &quot;Rajasthani Art&quot;, or fake logos.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 5. CALL TO ACTION: SCAN OR REPORT */}
      <div className="bg-gradient-to-r from-amber-800 to-amber-950 rounded-2xl p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg">
        <div className="space-y-2 text-center sm:text-left">
          <h3 className="font-serif text-2xl font-bold">Have a Garment in Hand?</h3>
          <p className="text-amber-200 text-xs sm:text-sm max-w-xl">
            Scan its CRAFTTRUE physical swing tag to verify its 7-layer evidence scorecard, artisan lineage, and fair price breakdown.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/scan"
            className="bg-amber-400 hover:bg-amber-300 text-amber-950 px-6 py-3 rounded-xl font-bold text-xs shadow-md transition flex items-center gap-2"
          >
            <QrCode className="w-4 h-4" />
            <span>Open Scanner</span>
          </Link>
          <Link
            href="/products"
            className="bg-white/10 hover:bg-white/20 text-white px-5 py-3 rounded-xl font-semibold text-xs border border-white/20 transition"
          >
            Browse Verified Catalog
          </Link>
        </div>
      </div>

    </div>
  );
}
