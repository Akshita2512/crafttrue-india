'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { QrCode, Search, Camera, CheckCircle2, AlertTriangle, XCircle, ArrowRight, ShieldAlert, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function ScanPage() {
  const router = useRouter();
  const [productCodeInput, setProductCodeInput] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (productCodeInput.trim()) {
      router.push(`/verify/${encodeURIComponent(productCodeInput.trim().toUpperCase())}`);
    }
  };

  const handlePresetSelect = (code: string) => {
    router.push(`/verify/${code}`);
  };

  const triggerSimulatedScan = () => {
    setIsScanning(true);
    setCameraActive(true);
    // Simulate optical camera scan delay
    setTimeout(() => {
      setIsScanning(false);
      setCameraActive(false);
      router.push('/verify/CTI-BAG-000184');
    }, 2200);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">
      {/* Page Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold">
          <QrCode className="w-3.5 h-3.5" />
          <span>Consumer Authenticity Scanner • उपभोक्ता सत्यापन</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
          Scan or Enter Product Tag ID
        </h1>
        <p className="text-sm text-stone-600 max-w-lg mx-auto">
          Scan the physical QR label attached to your Bagru or Sanganeri textile to verify its geographical origin, block-printing technique, artisan identity, and GI evidence.
        </p>
      </div>

      {/* Main Scanner Card */}
      <div className="bg-white rounded-2xl border-2 border-stone-200 shadow-lg p-6 sm:p-8 space-y-6">
        {/* Scanner Viewport Simulation */}
        <div className="relative rounded-xl overflow-hidden bg-stone-950 aspect-16/10 sm:aspect-21/9 flex flex-col items-center justify-center p-6 text-white border-2 border-dashed border-amber-600/50">
          {cameraActive ? (
            <div className="text-center space-y-4 animate-pulse">
              <div className="w-16 h-16 rounded-full border-4 border-amber-400 border-t-transparent animate-spin mx-auto" />
              <p className="font-mono text-sm text-amber-300 font-medium">Scanning optical QR label...</p>
              <p className="text-xs text-stone-400">Targeting Bagru Chhipa Authenticity Tag</p>
            </div>
          ) : (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center mx-auto text-amber-400">
                <Camera className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <p className="font-semibold text-base">Point Camera at Physical Tag</p>
                <p className="text-xs text-stone-400">Supports standard mobile camera &amp; high-res QR tags</p>
              </div>
              <button
                type="button"
                onClick={triggerSimulatedScan}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-medium text-xs shadow-md transition"
              >
                <Camera className="w-4 h-4" />
                <span>Simulate Camera Scan (Sample Bagru Tag)</span>
              </button>
            </div>
          )}

          {/* Optical Targeting Crosshairs */}
          <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-amber-400" />
          <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-amber-400" />
          <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-amber-400" />
          <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-amber-400" />
        </div>

        {/* Divider */}
        <div className="relative flex items-center justify-center">
          <div className="border-t border-stone-200 w-full" />
          <span className="bg-white px-3 text-xs uppercase tracking-wider text-stone-500 font-semibold absolute">
            or enter tag id manually
          </span>
        </div>

        {/* Manual Code Input Form */}
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={productCodeInput}
              onChange={(e) => setProductCodeInput(e.target.value)}
              placeholder="e.g. CTI-BAG-000184"
              className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-stone-300 rounded-xl text-sm font-mono uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-amber-600 focus:bg-white"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-stone-900 hover:bg-stone-800 text-white rounded-xl font-medium text-sm transition flex items-center justify-center gap-2 shadow-sm"
          >
            <span>Verify Tag</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* 4 DEMO TEST SCENARIOS (Designed for Supervisor / Examiner Presentations) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <h3 className="font-serif font-bold text-lg text-stone-900">
              Interactive Ph.D. Evaluation Presets
            </h3>
          </div>
          <span className="text-xs text-stone-500 font-medium">Click any scenario to test the 7-Layer Scorecard</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Preset A: Fully Verified Bagru */}
          <button
            onClick={() => handlePresetSelect('CTI-BAG-000184')}
            className="text-left p-4 rounded-xl border border-emerald-200 bg-emerald-50/60 hover:bg-emerald-100/70 transition space-y-2 group"
          >
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-600 text-white flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                VERIFIED (सत्यापित)
              </span>
              <span className="font-mono text-xs text-stone-500 font-bold group-hover:text-emerald-800">
                CTI-BAG-000184 →
              </span>
            </div>
            <h4 className="font-bold text-sm text-stone-900">Authentic Bagru Dabu Indigo Dupatta</h4>
            <p className="text-xs text-stone-600">
              Demonstrates complete 7-layer verification: Traditional Chhipa workshop, Dabu mud resist, natural indigo, and valid GI authorized user.
            </p>
          </button>

          {/* Preset B: Partially Verified Sanganer */}
          <button
            onClick={() => handlePresetSelect('CTI-SAN-000291')}
            className="text-left p-4 rounded-xl border border-amber-200 bg-amber-50/60 hover:bg-amber-100/70 transition space-y-2 group"
          >
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-600 text-white flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                PARTIALLY VERIFIED (आंशिक)
              </span>
              <span className="font-mono text-xs text-stone-500 font-bold group-hover:text-amber-800">
                CTI-SAN-000291 →
              </span>
            </div>
            <h4 className="font-bold text-sm text-stone-900">Sanganeri Floral Fine Mulmul Kurta Fabric</h4>
            <p className="text-xs text-stone-600">
              Demonstrates nuanced evaluation: Origin &amp; hand-block printing verified, but transparently discloses mill-made fabric &amp; pigment dyes.
            </p>
          </button>

          {/* Preset C: Confirmed Craftwashing / Misrepresentation */}
          <button
            onClick={() => handlePresetSelect('CTI-MIS-000305')}
            className="text-left p-4 rounded-xl border border-rose-200 bg-rose-50/60 hover:bg-rose-100/70 transition space-y-2 group"
          >
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-rose-600 text-white flex items-center gap-1">
                <XCircle className="w-3 h-3" />
                CRAFTWASHING / FALSE CLAIM
              </span>
              <span className="font-mono text-xs text-stone-500 font-bold group-hover:text-rose-800">
                CTI-MIS-000305 →
              </span>
            </div>
            <h4 className="font-bold text-sm text-stone-900">Jaipur Exhibition Stole (Screen Print)</h4>
            <p className="text-xs text-stone-600">
              Demonstrates consumer protection: Sold as "ancestral handmade Bagru", but audit reveals mechanical rotary screen print on poly-blend with synthetic dyes.
            </p>
          </button>

          {/* Preset D: Copied QR Anomaly Alert */}
          <button
            onClick={() => handlePresetSelect('CTI-DUP-000412')}
            className="text-left p-4 rounded-xl border border-orange-200 bg-orange-50/60 hover:bg-orange-100/70 transition space-y-2 group"
          >
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-orange-600 text-white flex items-center gap-1">
                <ShieldAlert className="w-3 h-3" />
                DUPLICATE QR ALERT
              </span>
              <span className="font-mono text-xs text-stone-500 font-bold group-hover:text-orange-800">
                CTI-DUP-000412 →
              </span>
            </div>
            <h4 className="font-bold text-sm text-stone-900">Bagru Runner (Photocopied Tag Anomaly)</h4>
            <p className="text-xs text-stone-600">
              Demonstrates anti-duplication security: Triggers security flag when 28 scans occur across distant cities simultaneously.
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}
