'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import QRCode from 'qrcode';
import { useUserRole, DEMO_ARTISAN_PROFILES } from '@/context/RoleContext';
import { 
  Award, 
  ShieldCheck, 
  Tag, 
  QrCode, 
  Layers, 
  PlusCircle, 
  Printer, 
  CheckCircle2, 
  Clock, 
  DollarSign, 
  MapPin, 
  Eye, 
  Download, 
  Sparkles, 
  UserCheck, 
  Radio, 
  ExternalLink,
  ArrowRight,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';

export default function ArtisanStudioPage() {
  const router = useRouter();
  const { role, artisanKey, activeArtisan, setRole, loginAsArtisan, logoutToConsumer } = useUserRole();

  const [activeTab, setActiveTab] = useState<'lots' | 'tags' | 'ledger' | 'scans'>('lots');
  const [selectedLotCode, setSelectedLotCode] = useState('BAGRU-LCD-F001');
  const [tagQrUrl, setTagQrUrl] = useState('');
  const [showTagModal, setShowTagModal] = useState(false);

  // New Demo Registration Form State
  const [regName, setRegName] = useState('');
  const [regWorkshop, setRegWorkshop] = useState('');
  const [regCluster, setRegCluster] = useState<'Bagru' | 'Sanganer'>('Bagru');
  const [regPehchan, setRegPehchan] = useState('');

  // Sample Lots for Lalchand Derawala
  const lalchandLots = [
    {
      id: 'LOT-LCD-2026-F01',
      productCode: 'BAGRU-LCD-F001',
      title: 'Bagru Classic Fadat Hand-Block Cotton Dupatta',
      yardage: '50 Pieces (125 Meters)',
      fabric: '100% Handloom Cotton (60s Kora)',
      dyes: 'Natural Harda Tannin, Iron Syahi & Begar Red',
      status: 'VERIFIED & ACTIVE',
      scans: 28,
      payoutPerUnit: 1300,
      totalPayout: 65000,
      date: '10 Nov 2026'
    },
    {
      id: 'LOT-LCD-2026-D02',
      productCode: 'BAGRU-LCD-F002',
      title: 'Bagru Dabu Mud-Resist Indigo Cotton Dupatta',
      yardage: '30 Pieces (75 Meters)',
      fabric: '100% Handloom Cotton (Fine 60s Count)',
      dyes: 'Kaali Mitti Dabu Resist, Natural Indigo Subterranean Vat',
      status: 'VERIFIED & ACTIVE',
      scans: 29,
      payoutPerUnit: 1380,
      totalPayout: 41400,
      date: '02 Nov 2026'
    },
    {
      id: 'LOT-LCD-2026-N03',
      productCode: 'BAGRU-LCD-F003',
      title: 'Ancestral Rekh & Datta Vegetable Dye Running Fabric',
      yardage: '60 Meters (Continuous Yardage)',
      fabric: 'Handloom Cotton Mulmul',
      dyes: 'Madder Root, Pomegranate Rind, Harda',
      status: 'UNDER VERIFICATION AUDIT',
      scans: 4,
      payoutPerUnit: 600,
      totalPayout: 36000,
      date: '18 Nov 2026'
    }
  ];

  // Sample Lots for Brij Ballabh Udaiwal
  const brijballabhLots = [
    {
      id: 'LOT-SGR-2026-B01',
      productCode: 'SGR-BBU-F001',
      title: 'Sanganeri Fine Floral Hand-Block Mulmul Saree',
      yardage: '40 Pieces (220 Meters)',
      fabric: '100% Pure White River-Washed Mulmul (100s Count)',
      dyes: 'Natural Manjith, Anar Chilka & Tesu Extracts',
      status: 'VERIFIED & ACTIVE',
      scans: 41,
      payoutPerUnit: 1620,
      totalPayout: 64800,
      date: '14 Nov 2026'
    },
    {
      id: 'LOT-SGR-2026-S02',
      productCode: 'SGR-BBU-F004',
      title: 'Double-Side Hand Block-Printed Bangalore Silk Saree',
      yardage: '15 Pieces (82.5 Meters)',
      fabric: 'Pure Mulberry Silk Handloom',
      dyes: 'Exquisite Plant Extracts with Synchronized Block Stamping',
      status: 'VERIFIED & ACTIVE',
      scans: 17,
      payoutPerUnit: 4800,
      totalPayout: 72000,
      date: '08 Nov 2026'
    }
  ];

  const currentLots = artisanKey === 'lalchand' ? lalchandLots : brijballabhLots;

  // Generate QR for tag preview
  useEffect(() => {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://crafttrue-india.vercel.app';
    const url = `${origin}/verify/${selectedLotCode}`;
    QRCode.toDataURL(url, { width: 220, margin: 1 })
      .then(u => setTagQrUrl(u))
      .catch(e => console.error(e));
  }, [selectedLotCode]);

  const handlePrintTag = (productCode: string) => {
    setSelectedLotCode(productCode);
    setShowTagModal(true);
  };

  const handleDemoRegister = (e: React.FormEvent) => {
    e.preventDefault();
    loginAsArtisan(regCluster === 'Bagru' ? 'lalchand' : 'brijballabh');
  };

  // =========================================================================
  // VIEW A: CONSUMER VIEW (PROMPTS DEMO ARTISAN LOGIN)
  // =========================================================================
  if (role !== 'artisan') {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-10">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold border border-amber-300">
            <UserCheck className="w-4 h-4 text-amber-800" />
            <span>Master Artisan Studio • शिल्पकार मंच</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
            Traditional Chhipa Artisan Studio
          </h1>
          <p className="text-sm text-stone-600 max-w-lg mx-auto leading-relaxed">
            The Artisan Studio is a dedicated portal for registered hand-block printers to catalog handmade yardage, generate tamper-resistant QR swing tags, and track direct fair wages.
          </p>
        </div>

        {/* 1-CLICK DEMO LOGIN CARDS */}
        <div className="bg-white rounded-3xl border-2 border-amber-300 shadow-xl p-6 sm:p-8 space-y-6">
          <div className="text-center space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
              Demo Access for Testing
            </span>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
              Select a Master Artisan Profile to Enter Studio
            </h2>
            <p className="text-xs text-stone-500">
              Experience the artisan dashboard as a National Award-winning master printer:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
            
            {/* Lalchand Derawala Card */}
            <div className="p-6 rounded-2xl border-2 border-amber-200 bg-amber-50/60 hover:bg-amber-100/70 transition space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <img
                    src="/images/textiles/bagru-village-printing.jpg"
                    alt="Lalchand Derawala"
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-amber-300 bg-amber-100"
                  />
                  <div>
                    <h3 className="font-bold text-base text-stone-900">Lalchand 'Chippa' Derawala</h3>
                    <p className="text-xs text-amber-900 font-semibold">Bagru Cluster • GI No. 183</p>
                    <span className="text-[10px] text-stone-500 font-mono">Pehchan: NRJPC241207</span>
                  </div>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  National Award Winner (1999). 5th-generation master of classic fadat, dabu resist, and natural indigo vats at Laxmi Nath Chowk, Bagru.
                </p>
              </div>

              <button
                type="button"
                onClick={() => loginAsArtisan('lalchand')}
                className="w-full py-3 bg-amber-800 hover:bg-amber-900 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Enter Studio as Master Lalchand (Bagru)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Brij Ballabh Udaiwal Card */}
            <div className="p-6 rounded-2xl border-2 border-sky-200 bg-sky-50/60 hover:bg-sky-100/70 transition space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <img
                    src="/images/textiles/hand-printing-process.jpg"
                    alt="Brij Ballabh Udaiwal"
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-sky-300 bg-sky-100"
                  />
                  <div>
                    <h3 className="font-bold text-base text-stone-900">Brij Ballabh Udaiwal</h3>
                    <p className="text-xs text-sky-900 font-semibold">Sanganeri Cluster • GI No. 147</p>
                    <span className="text-[10px] text-stone-500 font-mono">Pehchan: NRJPC241208</span>
                  </div>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  National Awardee (1991). Founder of Shilpi Sansthan Craft Studio. Specialist in fine floral boota stamping on sparkling white mulmul.
                </p>
              </div>

              <button
                type="button"
                onClick={() => loginAsArtisan('brijballabh')}
                className="w-full py-3 bg-sky-800 hover:bg-sky-900 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Enter Studio as Master Brij Ballabh (Sanganer)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* DEMO REGISTRATION FORM */}
        <div className="bg-stone-50 rounded-3xl border border-stone-200 p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-stone-900 font-serif font-bold text-lg">
            <PlusCircle className="w-5 h-5 text-amber-700" />
            <span>Or Register a New Demo Artisan Workshop</span>
          </div>
          <form onSubmit={handleDemoRegister} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-medium text-stone-700 mb-1">Artisan Full Name</label>
              <input
                type="text"
                required
                value={regName}
                onChange={e => setRegName(e.target.value)}
                placeholder="e.g. Ramprasad Chippa"
                className="w-full px-3 py-2.5 bg-white border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-700/40"
              />
            </div>
            <div>
              <label className="block font-medium text-stone-700 mb-1">Workshop Name</label>
              <input
                type="text"
                required
                value={regWorkshop}
                onChange={e => setRegWorkshop(e.target.value)}
                placeholder="e.g. Ramprasad Natural Dye Studio"
                className="w-full px-3 py-2.5 bg-white border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-700/40"
              />
            </div>
            <div>
              <label className="block font-medium text-stone-700 mb-1">Craft Cluster</label>
              <select
                value={regCluster}
                onChange={e => setRegCluster(e.target.value as any)}
                className="w-full px-3 py-2.5 bg-white border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-700/40"
              >
                <option value="Bagru">Bagru (GI No. 183 - Dabu &amp; Fadat)</option>
                <option value="Sanganer">Sanganer (GI No. 147 - Fine Florals)</option>
              </select>
            </div>
            <div>
              <label className="block font-medium text-stone-700 mb-1">Govt. Pehchan ID No. or Mobile No.</label>
              <input
                type="text"
                value={regPehchan}
                onChange={e => setRegPehchan(e.target.value)}
                placeholder="e.g. NRJPC991823"
                className="w-full px-3 py-2.5 bg-white border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-700/40"
              />
            </div>
            <div className="sm:col-span-2 pt-2">
              <button
                type="submit"
                className="px-6 py-3 bg-stone-900 hover:bg-stone-800 text-amber-300 font-bold rounded-xl text-xs transition shadow-sm"
              >
                Instant Register &amp; Open Artisan Studio
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW B: AUTHENTICATED ARTISAN STUDIO DASHBOARD
  // =========================================================================
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      
      {/* 1. ARTISAN WORKSHOP HERO BANNER */}
      <div className="bg-gradient-to-r from-amber-950 via-stone-900 to-amber-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-amber-800/60">
          <div className="flex items-start gap-4">
            <img
              src={activeArtisan.avatarUrl}
              alt={activeArtisan.name}
              className="w-20 h-20 rounded-2xl object-cover border-2 border-amber-400 bg-amber-900/60 shrink-0"
            />
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-amber-400/20 text-amber-300 border border-amber-400/40 text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full">
                  Verified Master Artisan
                </span>
                <span className="font-mono text-[10px] text-amber-200 bg-amber-900/80 px-2 py-0.5 rounded border border-amber-700/60">
                  {activeArtisan.giAuthorizedUserNo}
                </span>
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold">
                {activeArtisan.name}
              </h1>
              <p className="text-xs text-amber-200/90 font-medium">
                {activeArtisan.workshopName} • {activeArtisan.cluster} Cluster (Rajasthan)
              </p>
              <p className="text-[11px] text-stone-300 max-w-xl pt-0.5">
                {activeArtisan.address} • Pehchan ID: <strong className="text-amber-300">{activeArtisan.pehchanId}</strong> ({activeArtisan.award})
              </p>
            </div>
          </div>

          {/* Quick Actions & Role Switcher */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0">
            <Link
              href="/artisan/register-product"
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center justify-center gap-2 shadow-md transition"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Register New Batch</span>
            </Link>

            <button
              type="button"
              onClick={logoutToConsumer}
              className="px-4 py-2.5 rounded-xl bg-stone-800/80 hover:bg-stone-800 text-stone-300 border border-stone-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition"
            >
              <span>Switch to Consumer View</span>
            </button>
          </div>
        </div>

        {/* 4 Artisan Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
            <span className="text-stone-400 block text-[11px]">Active Registered Lots</span>
            <strong className="text-xl font-serif text-white">{activeArtisan.activeLotsCount} Batches</strong>
            <span className="text-[10px] text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              All GI Compliant
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
            <span className="text-stone-400 block text-[11px]">Total Pieces Tagged</span>
            <strong className="text-xl font-serif text-white">140 Garments</strong>
            <span className="text-[10px] text-amber-300">Serialized QR Labels</span>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
            <span className="text-stone-400 block text-[11px]">Direct Workshop Earnings</span>
            <strong className="text-xl font-serif text-emerald-300">
              ₹{activeArtisan.totalEarningsInr.toLocaleString('en-IN')}
            </strong>
            <span className="text-[10px] text-emerald-400">46% Fair-Wage Payout</span>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
            <span className="text-stone-400 block text-[11px]">Switch Master Artisan</span>
            <div className="flex gap-1.5 pt-1">
              <button
                type="button"
                onClick={() => loginAsArtisan('lalchand')}
                className={`px-2 py-1 rounded text-[10px] font-bold ${
                  artisanKey === 'lalchand' ? 'bg-amber-400 text-stone-950' : 'bg-white/10 text-stone-300'
                }`}
              >
                Lalchand (Bagru)
              </button>
              <button
                type="button"
                onClick={() => loginAsArtisan('brijballabh')}
                className={`px-2 py-1 rounded text-[10px] font-bold ${
                  artisanKey === 'brijballabh' ? 'bg-amber-400 text-stone-950' : 'bg-white/10 text-stone-300'
                }`}
              >
                Brij Ballabh (Sanganer)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. STUDIO NAVIGATION TABS */}
      <div className="flex border-b border-stone-200 gap-6 text-xs font-bold text-stone-600">
        <button
          type="button"
          onClick={() => setActiveTab('lots')}
          className={`pb-3 transition flex items-center gap-1.5 ${
            activeTab === 'lots' ? 'border-b-2 border-amber-800 text-amber-900' : 'hover:text-stone-900'
          }`}
        >
          <Layers className="w-4 h-4 text-amber-700" />
          <span>My Batches &amp; Production Lots ({currentLots.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('ledger')}
          className={`pb-3 transition flex items-center gap-1.5 ${
            activeTab === 'ledger' ? 'border-b-2 border-amber-800 text-amber-900' : 'hover:text-stone-900'
          }`}
        >
          <DollarSign className="w-4 h-4 text-emerald-700" />
          <span>Fair-Wage Compensation Ledger</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('scans')}
          className={`pb-3 transition flex items-center gap-1.5 ${
            activeTab === 'scans' ? 'border-b-2 border-amber-800 text-amber-900' : 'hover:text-stone-900'
          }`}
        >
          <Radio className="w-4 h-4 text-blue-700" />
          <span>Consumer Scan Surveillance</span>
        </button>
      </div>

      {/* 3. TAB CONTENT */}
      {activeTab === 'lots' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="font-serif text-xl font-bold text-stone-900">Registered Production Lots</h2>
              <p className="text-xs text-stone-500">Each lot corresponds to a documented block-printing yardage run.</p>
            </div>
            <Link
              href="/artisan/register-product"
              className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-amber-300 rounded-xl text-xs font-bold transition flex items-center gap-1.5 w-fit"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Register New Yardage Batch</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {currentLots.map(lot => (
              <div
                key={lot.id}
                className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4 hover:border-amber-300 transition"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-100">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-amber-900 bg-amber-50 px-2.5 py-1 rounded border border-amber-200">
                      {lot.id}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      {lot.status}
                    </span>
                  </div>
                  <span className="text-xs text-stone-400">Registered: {lot.date}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  <div className="md:col-span-8 space-y-1.5">
                    <h3 className="font-serif text-lg font-bold text-stone-900">{lot.title}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-600">
                      <div><strong>Yardage:</strong> {lot.yardage}</div>
                      <div><strong>Base:</strong> {lot.fabric}</div>
                      <div className="sm:col-span-2"><strong>Dyes &amp; Formula:</strong> {lot.dyes}</div>
                    </div>
                  </div>

                  <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col gap-2 justify-end">
                    <button
                      type="button"
                      onClick={() => handlePrintTag(lot.productCode)}
                      className="px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-xs"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print QR Swing Tags</span>
                    </button>

                    <Link
                      href={`/verify/${lot.productCode}`}
                      className="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-semibold transition flex items-center justify-center gap-1.5 border border-stone-200"
                    >
                      <Eye className="w-3.5 h-3.5 text-stone-600" />
                      <span>View Public Certificate</span>
                    </Link>
                  </div>
                </div>

                {/* Footer metrics for this lot */}
                <div className="pt-3 border-t border-stone-100 flex flex-wrap items-center justify-between text-xs text-stone-500">
                  <span>Consumer Scans: <strong>{lot.scans} verified pings</strong></span>
                  <span className="text-emerald-700 font-semibold">
                    Workshop Payout: ₹{lot.payoutPerUnit.toLocaleString('en-IN')} / piece (Total: ₹{lot.totalPayout.toLocaleString('en-IN')})
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: FAIR WAGE LEDGER */}
      {activeTab === 'ledger' && (
        <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              Transparent Compensation Framework
            </span>
            <h2 className="font-serif text-2xl font-bold text-stone-900">
              Workshop Direct Earnings &amp; Wage Distribution
            </h2>
            <p className="text-xs text-stone-600">
              CRAFTTRUE guarantees that over 46% of consumer retail payments are remitted directly to master printers and auxiliary women artisans.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1">
              <span className="text-xs text-emerald-800 font-bold">Total Settled Workshop Payout</span>
              <strong className="text-2xl font-serif text-emerald-950 block">
                ₹{activeArtisan.totalEarningsInr.toLocaleString('en-IN')}
              </strong>
              <span className="text-[11px] text-emerald-700">Bank Transfer Verified via Pehchan</span>
            </div>

            <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
              <span className="text-xs text-stone-600 font-bold">Average Direct Share per Dupatta</span>
              <strong className="text-2xl font-serif text-stone-900 block">₹1,300</strong>
              <span className="text-[11px] text-stone-500">46% of ₹2,850 retail</span>
            </div>

            <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
              <span className="text-xs text-stone-600 font-bold">Auxiliary Women SHG Wages</span>
              <strong className="text-2xl font-serif text-stone-900 block">₹320 / piece</strong>
              <span className="text-[11px] text-stone-500">Thread cutting, river wash &amp; folding</span>
            </div>
          </div>

          {/* Transparent Itemized Payout Table */}
          <div className="overflow-x-auto pt-2">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 uppercase text-[10px] font-bold">
                <tr>
                  <th className="p-3">Cost Component</th>
                  <th className="p-3">Amount (₹)</th>
                  <th className="p-3">Percentage</th>
                  <th className="p-3">Recipient / Purpose</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                <tr>
                  <td className="p-3 font-semibold text-stone-900">Master Printer Labor</td>
                  <td className="p-3 font-mono font-bold text-emerald-800">₹920.00</td>
                  <td className="p-3">32.3%</td>
                  <td className="p-3 text-stone-600">Direct to Master Lalchand Derawala</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-stone-900">Hand-Carved Wooden Blocks</td>
                  <td className="p-3 font-mono font-bold text-emerald-800">₹380.00</td>
                  <td className="p-3">13.3%</td>
                  <td className="p-3 text-stone-600">Local Bagru Rorda Woodcarvers</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-stone-900">Raw Cotton Kora Fabric</td>
                  <td className="p-3 font-mono text-stone-800">₹580.00</td>
                  <td className="p-3">20.4%</td>
                  <td className="p-3 text-stone-600">Local Handloom Weavers Cooperative</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-stone-900">Washing &amp; River Finishing</td>
                  <td className="p-3 font-mono text-stone-800">₹270.00</td>
                  <td className="p-3">9.5%</td>
                  <td className="p-3 text-stone-600">Chhipa Mohalla Riverwashers &amp; SHG Women</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-stone-900">Packaging &amp; Insured Logistics</td>
                  <td className="p-3 font-mono text-stone-800">₹200.00</td>
                  <td className="p-3">7.0%</td>
                  <td className="p-3 text-stone-600">Tamper-Evident Packaging &amp; Courier</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-stone-900">Retail &amp; Platform Maintenance</td>
                  <td className="p-3 font-mono text-amber-900 font-bold">₹500.00</td>
                  <td className="p-3">17.5%</td>
                  <td className="p-3 text-stone-600">Ecosystem Verification &amp; Tech Operations</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: SCAN SURVEILLANCE */}
      {activeTab === 'scans' && (
        <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-800">
              Live Anti-Counterfeit Surveillance
            </span>
            <h2 className="font-serif text-2xl font-bold text-stone-900">
              Consumer Scan Logs &amp; Geographic Distribution
            </h2>
            <p className="text-xs text-stone-600">
              Real-time audit log tracking every consumer verification ping on your registered physical garment tags.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 space-y-1">
              <span className="text-xs text-blue-800 font-bold">Total Scans Logged</span>
              <strong className="text-2xl font-serif text-blue-950 block">61 Pings</strong>
              <span className="text-[11px] text-blue-700">Across 14 Cities</span>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1">
              <span className="text-xs text-emerald-800 font-bold">Tag Authenticity Rate</span>
              <strong className="text-2xl font-serif text-emerald-950 block">100%</strong>
              <span className="text-[11px] text-emerald-700">Zero Duplication Anomalies</span>
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
              <span className="text-xs text-stone-600 font-bold">Top Scan Clusters</span>
              <strong className="text-base font-bold text-stone-900 block">Delhi, Mumbai, Bengaluru</strong>
              <span className="text-[11px] text-stone-500">Urban Conscious Consumers</span>
            </div>
          </div>
        </div>
      )}

      {/* 4. MODAL: PRINTABLE SERIALIZED QR SWING TAG PREVIEW */}
      {showTagModal && (
        <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl border-2 border-amber-300">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <div className="flex items-center gap-2">
                <Tag className="w-5 h-5 text-amber-700" />
                <h3 className="font-serif font-bold text-lg text-stone-900">Physical QR Swing Tag</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowTagModal(false)}
                className="text-stone-400 hover:text-stone-700 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {/* Visual Swing Tag Rendering */}
            <div className="p-6 rounded-2xl bg-[#FFFDF9] border-2 border-amber-800/80 shadow-md text-center space-y-4">
              <div className="space-y-1">
                <div className="w-4 h-4 rounded-full border-2 border-stone-400 mx-auto" />
                <p className="text-[10px] tracking-widest uppercase font-bold text-amber-900">
                  CRAFTTRUE INDIA • GI CERTIFIED
                </p>
                <h4 className="font-serif font-bold text-base text-stone-900">
                  {activeArtisan.cluster} Hand-Block Textile
                </h4>
                <p className="text-[11px] text-stone-500">{activeArtisan.workshopName}</p>
              </div>

              {/* QR Image */}
              <div className="bg-white p-3 rounded-xl border border-stone-200 w-fit mx-auto shadow-inner">
                {tagQrUrl && (
                  <img src={tagQrUrl} alt="QR Code" className="w-36 h-36 mx-auto" />
                )}
              </div>

              <div className="space-y-1 font-mono text-xs">
                <p className="font-bold text-amber-900">{selectedLotCode}</p>
                <p className="text-[10px] text-stone-400">Scan with any smartphone camera to verify</p>
              </div>

              <div className="pt-2 border-t border-amber-200/60 flex items-center justify-between text-[10px] text-stone-600">
                <span>Pehchan: {activeArtisan.pehchanId}</span>
                <span className="font-bold text-emerald-700">100% Handloom &amp; Veg Dye</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => window.print()}
                className="flex-1 py-3 bg-amber-800 hover:bg-amber-900 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-sm"
              >
                <Printer className="w-4 h-4" />
                <span>Print Physical Hangtags</span>
              </button>
              <button
                type="button"
                onClick={() => setShowTagModal(false)}
                className="px-5 py-3 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
