'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { QrCode, Search, Camera, CheckCircle2, AlertTriangle, XCircle, ArrowRight, ShieldAlert, Sparkles, BookOpenCheck } from 'lucide-react';
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
    // Mobile tactile feedback
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(40);
    }
    // Simulate optical camera scan delay
    setTimeout(() => {
      setIsScanning(false);
      setCameraActive(false);
      if (typeof window !== 'undefined' && 'vibrate' in navigator) {
        navigator.vibrate([60, 40, 80]);
      }
      router.push('/verify/BAGRU-LCD-F001');
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">
      {/* Page Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold border border-amber-300">
          <QrCode className="w-3.5 h-3.5" />
          <span>Consumer Authenticity Scanner • उपभोक्ता सत्यापन केंद्र</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
          Scan or Enter Product Tag ID
        </h1>
        <p className="text-sm text-stone-600 max-w-lg mx-auto">
          Scan the physical QR label attached to your <strong>Bagru (GI No. 183)</strong> or <strong>Sanganeri (GI No. 147)</strong> textile to verify its geographical origin, wooden block printing technique, master artisan lineage, and GI evidence.
        </p>
      </div>

      {/* Main Scanner Card */}
      <div className="bg-white rounded-3xl border-2 border-stone-200 shadow-xl p-6 sm:p-8 space-y-6">
        {/* Scanner Viewport Simulation */}
        <div className="relative rounded-2xl overflow-hidden bg-stone-950 aspect-16/10 sm:aspect-21/9 flex flex-col items-center justify-center p-6 text-white border-2 border-dashed border-amber-600/50">
          {cameraActive ? (
            <div className="text-center space-y-4 animate-pulse">
              <div className="w-16 h-16 rounded-full border-4 border-amber-400 border-t-transparent animate-spin mx-auto" />
              <p className="font-mono text-sm text-amber-300 font-medium">Scanning optical QR label...</p>
              <p className="text-xs text-stone-400">Targeting Master Lalchand Derawala Bagru Authenticity Tag</p>
            </div>
          ) : (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center mx-auto text-amber-400">
                <Camera className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <p className="font-semibold text-base">Point Camera at Physical QR Tag</p>
                <p className="text-xs text-stone-400">Works with smartphone camera or high-res swing tag</p>
              </div>
              <button
                type="button"
                onClick={triggerSimulatedScan}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md transition"
              >
                <Camera className="w-4 h-4" />
                <span>Simulate Camera Scan (Bagru Master Tag)</span>
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
              placeholder="e.g. BAGRU-LCD-F001 or SGR-BBU-F001"
              className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-stone-300 rounded-xl text-sm font-mono uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-amber-700/40 focus:bg-white"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-stone-900 hover:bg-stone-800 text-white rounded-xl font-bold text-xs transition flex items-center justify-center gap-2 shadow-sm"
          >
            <span>Verify Tag</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* 4 DEMO TEST SCENARIOS */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-700" />
            <h3 className="font-serif font-bold text-lg text-stone-900">
              Interactive Ph.D. Evaluation Presets
            </h3>
          </div>
          <Link
            href="/authenticity-guide"
            className="text-xs font-bold text-amber-800 hover:text-amber-900 flex items-center gap-1"
          >
            <BookOpenCheck className="w-3.5 h-3.5" />
            <span>Open 5-Point Buyer Field Guide</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Preset A: Fully Verified Bagru */}
          <button
            onClick={() => handlePresetSelect('BAGRU-LCD-F001')}
            className="text-left p-5 rounded-2xl border border-emerald-300 bg-emerald-50/60 hover:bg-emerald-100/70 transition space-y-2 group shadow-xs"
          >
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-700 text-white flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                VERIFIED SPECIMEN
              </span>
              <span className="font-mono text-xs text-stone-500 font-bold group-hover:text-emerald-900">
                BAGRU-LCD-F001 →
              </span>
            </div>
            <h4 className="font-bold text-sm text-stone-900">Bagru Classic Fadat Hand-Block Dupatta</h4>
            <p className="text-xs text-stone-600">
              Lalchand &apos;Chippa&apos; Derawala (National Award 1999). Seasoned Rorda wooden blocks, Harda cream ground, natural syahi &amp; madder red.
            </p>
          </button>

          {/* Preset B: Fully Verified Sanganer */}
          <button
            onClick={() => handlePresetSelect('SGR-BBU-F001')}
            className="text-left p-5 rounded-2xl border border-sky-300 bg-sky-50/60 hover:bg-sky-100/70 transition space-y-2 group shadow-xs"
          >
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-sky-700 text-white flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                VERIFIED SPECIMEN
              </span>
              <span className="font-mono text-xs text-stone-500 font-bold group-hover:text-sky-900">
                SGR-BBU-F001 →
              </span>
            </div>
            <h4 className="font-bold text-sm text-stone-900">Sanganeri Fine Floral Hand-Block Mulmul Saree</h4>
            <p className="text-xs text-stone-600">
              Brij Ballabh Udaiwal (National Award 1991, Pehchan ID NRJPC241207). Fine boota &amp; bootie on pristine white river-washed cotton mulmul.
            </p>
          </button>

          {/* Preset C: Confirmed Craftwashing Misrepresentation */}
          <button
            onClick={() => handlePresetSelect('CTI-MIS-000305')}
            className="text-left p-5 rounded-2xl border border-rose-300 bg-rose-50/60 hover:bg-rose-100/70 transition space-y-2 group shadow-xs"
          >
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-700 text-white flex items-center gap-1">
                <XCircle className="w-3 h-3" />
                CRAFTWASHING DETECTED
              </span>
              <span className="font-mono text-xs text-stone-500 font-bold group-hover:text-rose-900">
                CTI-MIS-000305 →
              </span>
            </div>
            <h4 className="font-bold text-sm text-stone-900">Industrial Screen Print Sold as &quot;Bagru Dabu&quot;</h4>
            <p className="text-xs text-stone-600">
              Commercial fraud detection: Flatbed rotary screen print using acrylic pigments, zero reverse strike-through, 300% markup on poly-cotton.
            </p>
          </button>

          {/* Preset D: Cloned QR Anomaly Alert */}
          <button
            onClick={() => handlePresetSelect('CTI-DUP-000412')}
            className="text-left p-5 rounded-2xl border border-orange-300 bg-orange-50/60 hover:bg-orange-100/70 transition space-y-2 group shadow-xs"
          >
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-orange-700 text-white flex items-center gap-1">
                <ShieldAlert className="w-3 h-3" />
                SECURITY DUPLICATION ALERT
              </span>
              <span className="font-mono text-xs text-stone-500 font-bold group-hover:text-orange-900">
                CTI-DUP-000412 →
              </span>
            </div>
            <h4 className="font-bold text-sm text-stone-900">Cloned QR Swing Tag Anomaly</h4>
            <p className="text-xs text-stone-600">
              Anti-duplication security: Triggers audit quarantine when identical QR tag ID is scanned across Bengaluru, Delhi, and Jaipur within 15 minutes.
            </p>
          </button>

        </div>
      </div>
    </div>
  );
}
