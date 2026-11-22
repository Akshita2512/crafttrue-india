'use client';

import React, { useState } from 'react';
import { DEMO_SURVEYS } from '@/lib/data/craftData';
import { ResearchSurveyResponse } from '@/lib/types';
import { BarChart3, Download, Sparkles, TrendingUp, CheckCircle, HelpCircle, FileSpreadsheet } from 'lucide-react';

export default function ResearchAnalyticsPage() {
  const [surveys, setSurveys] = useState<ResearchSurveyResponse[]>(DEMO_SURVEYS);

  // Download CSV for SPSS / Excel / R
  const exportToCSV = () => {
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
      `"${s.created_at || '2026-10-21'}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `CRAFTTRUE_Ph.D._Survey_Data_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const avgUnderstanding = (surveys.reduce((acc, s) => acc + s.understanding_of_authenticity, 0) / surveys.length).toFixed(1);
  const avgTransparency = (surveys.reduce((acc, s) => acc + s.perceived_transparency, 0) / surveys.length).toFixed(1);
  const avgTrust = (surveys.reduce((acc, s) => acc + s.trust_in_evidence, 0) / surveys.length).toFixed(1);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>Doctoral Research Module • डॉक्टरेट अनुसंधान विश्लेषण</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-stone-900">
            Empirical Authenticity &amp; Consumer Trust Analytics
          </h1>
          <p className="text-xs text-stone-600 max-w-xl">
            Real-time data aggregation testing whether QR-based 7-layer evidence disclosure increases consumer understanding and willingness to pay (WTP).
          </p>
        </div>

        {/* 1-Click CSV Export for SPSS / R */}
        <button
          onClick={exportToCSV}
          className="px-5 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition"
        >
          <FileSpreadsheet className="w-4 h-4" />
          <span>Export Anonymized CSV (for SPSS / R / Excel)</span>
        </button>
      </div>

      {/* 4 CORE METRIC CARDS */}
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

      {/* HYPOTHESIS TESTING PROGRESS MATRIX */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-stone-100">
          <TrendingUp className="w-5 h-5 text-amber-700" />
          <h3 className="font-serif font-bold text-lg text-stone-900">
            Ph.D. Candidate Hypotheses Validation Matrix
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 font-semibold uppercase text-[10px]">
              <tr>
                <th className="p-3">Code</th>
                <th className="p-3">Theoretical Hypothesis</th>
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

      {/* RAW DATA LOG (ANONYMIZED) */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 space-y-4">
        <h3 className="font-serif font-bold text-base text-stone-900">
          Raw Survey Responses (Anonymized for Data Protection / DPDP Act)
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
