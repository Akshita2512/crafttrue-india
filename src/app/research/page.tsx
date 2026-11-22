'use client';

import React, { useState } from 'react';
import { DEMO_SURVEYS, RESEARCH_FABRIC_STUDY } from '@/lib/data/craftData';
import { ResearchSurveyResponse } from '@/lib/types';
import { BarChart3, Download, Sparkles, TrendingUp, CheckCircle, HelpCircle, FileSpreadsheet, BookOpenCheck, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function ResearchAnalyticsPage() {
  const [surveys, setSurveys] = useState<ResearchSurveyResponse[]>(DEMO_SURVEYS);

  // 1. Download Survey CSV for SPSS / Excel / R
  const exportSurveyCSV = () => {
    const headers = [
      'Respondent_ID',
      'Product_Code',
      'Verification_Status_Seen',
      'Understanding_Authenticity_1to5',
      'Perceived_Transparency_1to5',
      'Trust_In_Evidence_1to5',
      'Willingness_To_Pay_INR',
      'Prior_Knowledge',
      'Feedback_Notes',
      'Date_Recorded'
    ];

    const rows = surveys.map((s, idx) => [
      `RESP-${1000 + idx}`,
      `"${s.product_code}"`,
      `"${s.verification_status_seen}"`,
      s.understanding_of_authenticity,
      s.perceived_transparency,
      s.trust_in_evidence,
      s.willingness_to_pay_inr,
      `"${s.prior_block_print_knowledge}"`,
      `"${(s.feedback_notes || '').replace(/"/g, '""')}"`,
      `"${s.created_at || '2026-11-20'}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `CRAFTTRUE_Consumer_Trust_Study_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 2. Download 40-Fabric Analysis CSV
  const exportFabricAnalysisCSV = () => {
    const headers = ['Sample_No', 'Cluster_Or_Type', 'Probable_Technique', 'Assessment_Verdict', 'Key_Authenticity_Indicators'];
    const rows = RESEARCH_FABRIC_STUDY.sampleObservations.map(s => [
      s.id,
      `"${s.type}"`,
      `"${s.technique}"`,
      `"${s.result}"`,
      `"${s.notes.replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `CRAFTTRUE_40_Fabric_Forensic_Analysis_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const avgUnderstanding = (surveys.reduce((acc, s) => acc + s.understanding_of_authenticity, 0) / surveys.length).toFixed(1);
  const avgTransparency = (surveys.reduce((acc, s) => acc + s.perceived_transparency, 0) / surveys.length).toFixed(1);
  const avgTrust = (surveys.reduce((acc, s) => acc + s.trust_in_evidence, 0) / surveys.length).toFixed(1);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-10">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>Craft Intelligence &amp; Forensic Analytics • हस्तशिल्प प्रामाणिकता विश्लेषण</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-stone-900">
            Empirical Authenticity &amp; Consumer Trust Analytics
          </h1>
          <p className="text-xs text-stone-600 max-w-xl">
            Real-time data aggregation testing whether QR-based 7-layer evidence disclosure increases consumer understanding and willingness to pay (WTP).
          </p>
        </div>

        {/* 1-Click CSV Exports for SPSS / R */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={exportSurveyCSV}
            className="px-4 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Export Survey CSV (SPSS/R)</span>
          </button>

          <button
            onClick={exportFabricAnalysisCSV}
            className="px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-amber-300 font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition"
          >
            <Download className="w-4 h-4" />
            <span>Export 40-Fabric Matrix CSV</span>
          </button>
        </div>
      </div>

      {/* 1. 40-FABRIC RESEARCH STUDY BENCHMARK BANNER */}
      <div className="bg-gradient-to-br from-amber-50 via-orange-50/40 to-white rounded-3xl p-6 sm:p-8 border-2 border-amber-300 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-amber-800">
              Market Surveillance Study • 40 Retail Samples
            </span>
            <h2 className="font-serif text-2xl font-bold text-stone-900 mt-1">
              Fabric Analysis: 12.5% Craftwashing Contamination Rate
            </h2>
            <p className="text-xs text-stone-600 mt-1 max-w-2xl">
              Forensic analysis of 40 textile samples collected across retail shops and craft exhibitions in Jaipur revealed that 1 in 8 items marketed as traditional hand-block printing were industrial screen or digital imitations.
            </p>
          </div>

          <Link
            href="/authenticity-guide"
            className="bg-amber-800 hover:bg-amber-900 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-xs shrink-0 w-fit"
          >
            <BookOpenCheck className="w-4 h-4" />
            <span>View Full Field Guide</span>
          </Link>
        </div>

        {/* 3 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-emerald-200 shadow-2xs">
            <span className="text-[10px] uppercase font-bold text-emerald-800">Authentic Bagru (GI-183)</span>
            <p className="font-serif text-3xl font-extrabold text-stone-900 mt-1">16 <span className="text-sm font-normal text-stone-500">/ 40</span></p>
            <p className="text-emerald-700 font-bold text-xs">40.0% of Market Sample</p>
            <p className="text-[11px] text-stone-500 mt-1">Earthy tone, Harda cream base, iron syahi black, organic dabu crackle.</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-sky-200 shadow-2xs">
            <span className="text-[10px] uppercase font-bold text-sky-800">Authentic Sanganer (GI-147)</span>
            <p className="font-serif text-3xl font-extrabold text-stone-900 mt-1">19 <span className="text-sm font-normal text-stone-500">/ 40</span></p>
            <p className="text-sky-700 font-bold text-xs">47.5% of Market Sample</p>
            <p className="text-[11px] text-stone-500 mt-1">Fine floral boota on river white base, delicate two-tone Rekh-Datta overlap.</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-rose-200 shadow-2xs">
            <span className="text-[10px] uppercase font-bold text-rose-800">Screen / Machine Imitation</span>
            <p className="font-serif text-3xl font-extrabold text-rose-700 mt-1">5 <span className="text-sm font-normal text-stone-500">/ 40</span></p>
            <p className="text-rose-700 font-bold text-xs">12.5% Craftwashing Rate</p>
            <p className="text-[11px] text-stone-500 mt-1">Zero strike-through, mechanical uniformity, chemical acrylic odor.</p>
          </div>
        </div>
      </div>

      {/* 2. 4 CORE CONSUMER SURVEY METRIC CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-1">
          <p className="text-[11px] uppercase tracking-wider text-stone-500 font-semibold">Total Survey Responses</p>
          <p className="font-serif text-3xl font-bold text-stone-900">{surveys.length}</p>
          <p className="text-[10px] text-emerald-700 font-medium">Recorded at Delhi Haat &amp; Online</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-1">
          <p className="text-[11px] uppercase tracking-wider text-stone-500 font-semibold">Authenticity Comprehension</p>
          <p className="font-serif text-3xl font-bold text-amber-700">{avgUnderstanding} / 5.0</p>
          <p className="text-[10px] text-stone-500">Separating Weaving from Printing</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-1">
          <p className="text-[11px] uppercase tracking-wider text-stone-500 font-semibold">Perceived Transparency</p>
          <p className="font-serif text-3xl font-bold text-emerald-700">{avgTransparency} / 5.0</p>
          <p className="text-[10px] text-stone-500">7-Layer Scorecard Trust Index</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-1">
          <p className="text-[11px] uppercase tracking-wider text-stone-500 font-semibold">Consumer Trust Rating</p>
          <p className="font-serif text-3xl font-bold text-blue-700">{avgTrust} / 5.0</p>
          <p className="text-[10px] text-stone-500">Attributable to Verifiable Proof</p>
        </div>
      </div>

      {/* 3. QUALITY BENCHMARK PROGRESS MATRIX */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-stone-100">
          <TrendingUp className="w-5 h-5 text-amber-700" />
          <h3 className="font-serif font-bold text-lg text-stone-900">
            Craft Authenticity &amp; Consumer Trust Validation Matrix
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 font-semibold uppercase text-[10px]">
              <tr>
                <th className="p-3">Code</th>
                <th className="p-3">Core Validation Parameter</th>
                <th className="p-3">Target Construct</th>
                <th className="p-3">Pilot Trend</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              <tr>
                <td className="p-3 font-mono font-bold text-stone-900">H1</td>
                <td className="p-3 font-medium text-stone-800">
                  QR-based authenticity information positively influences consumer understanding of product authenticity.
                </td>
                <td className="p-3 text-stone-600">Awareness &rarr; Understanding</td>
                <td className="p-3 text-emerald-700 font-semibold">Strong Positive (Mean = 4.8)</td>
                <td className="p-3"><span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">Supported</span></td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-stone-900">H3</td>
                <td className="p-3 font-medium text-stone-800">
                  Perceived transparency in 7-layer evidence positively influences consumer trust.
                </td>
                <td className="p-3 text-stone-600">Transparency &rarr; Trust</td>
                <td className="p-3 text-emerald-700 font-semibold">Strong Positive (Mean = 4.9)</td>
                <td className="p-3"><span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">Supported</span></td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-stone-900">H4</td>
                <td className="p-3 font-medium text-stone-800">
                  Perceived craftwashing is negatively associated with consumer willingness to pay unverified sellers.
                </td>
                <td className="p-3 text-stone-600">Craftwashing &rarr; WTP Penalty</td>
                <td className="p-3 text-amber-700 font-semibold">75% WTP drop on screen prints</td>
                <td className="p-3"><span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">Supported</span></td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-stone-900">H6</td>
                <td className="p-3 font-medium text-stone-800">
                  Price transparency positively influences consumer perception of fair artisan compensation.
                </td>
                <td className="p-3 text-stone-600">Price Disclosure &rarr; Fairness</td>
                <td className="p-3 text-emerald-700 font-semibold">Fair-share clarity validated</td>
                <td className="p-3"><span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">Supported</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. RAW SURVEY DATA LOG (ANONYMIZED) */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-6 space-y-4">
        <h3 className="font-serif font-bold text-base text-stone-900">
          Raw Survey Responses (Anonymized for Data Protection / DPDP Act 2023)
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 font-semibold uppercase text-[10px]">
              <tr>
                <th className="p-3">Product Tag</th>
                <th className="p-3">Status Seen</th>
                <th className="p-3 text-center">Understanding</th>
                <th className="p-3 text-center">Trust</th>
                <th className="p-3">Stated WTP</th>
                <th className="p-3">Prior Familiarity</th>
                <th className="p-3">Qualitative Remarks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {surveys.map((s, idx) => (
                <tr key={idx} className="hover:bg-stone-50/60">
                  <td className="p-3 font-mono font-bold text-amber-900">{s.product_code}</td>
                  <td className="p-3 font-semibold">{s.verification_status_seen}</td>
                  <td className="p-3 text-center font-bold text-stone-800">{s.understanding_of_authenticity} / 5</td>
                  <td className="p-3 text-center font-bold text-emerald-700">{s.trust_in_evidence} / 5</td>
                  <td className="p-3 font-mono font-bold text-stone-900">₹{s.willingness_to_pay_inr}</td>
                  <td className="p-3 text-stone-600">{s.prior_block_print_knowledge}</td>
                  <td className="p-3 text-stone-500 italic max-w-xs truncate">{s.feedback_notes || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
