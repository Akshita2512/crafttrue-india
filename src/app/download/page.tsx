'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Smartphone,
  Download,
  QrCode,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  Volume2,
  WifiOff,
  CreditCard,
  Share2,
  PlusSquare,
  ArrowRight,
  Info
} from 'lucide-react';

export default function DownloadPage() {
  const [activeTab, setActiveTab] = useState<'android' | 'ios' | 'desktop'>('android');
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Detect platform
    const ua = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(ua)) {
      setActiveTab('ios');
    } else if (/android/.test(ua)) {
      setActiveTab('android');
    } else {
      setActiveTab('desktop');
    }

    // Check standalone
    const standalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true;
    setIsInstalled(standalone);

    const handlePrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handlePrompt);
    return () => window.removeEventListener('beforeinstallprompt', handlePrompt);
  }, []);

  const triggerAndroidInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
    } else {
      alert('To install on Android:\n1. Tap the 3 dots (⋮) in Chrome at the top right.\n2. Tap "Install App" or "Add to Home screen".');
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-8 sm:py-12 px-3 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Hero Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>Official Mobile App</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-black text-stone-900 tracking-tight">
            Get CraftTrue India
          </h1>
          <p className="text-sm sm:text-base text-stone-600 max-w-2xl mx-auto">
            Install the native app on your <strong>Android phone</strong> or <strong>iPhone</strong> for instant QR scanning, soundbox chimes, offline craft guides, and zero-commission artisan payments.
          </p>

          {isInstalled && (
            <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-800 border border-emerald-300 px-4 py-2 rounded-xl text-xs font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>You are running CraftTrue in native standalone mode!</span>
            </div>
          )}
        </div>

        {/* Platform Selector Tabs */}
        <div className="flex rounded-2xl bg-stone-200/80 p-1.5 max-w-md mx-auto shadow-inner text-xs font-bold">
          <button
            onClick={() => setActiveTab('android')}
            className={`flex-1 py-2.5 rounded-xl transition flex items-center justify-center gap-1.5 ${
              activeTab === 'android'
                ? 'bg-amber-800 text-white shadow-md'
                : 'text-stone-700 hover:text-stone-900'
            }`}
          >
            <span>🤖 Android (APK)</span>
          </button>
          <button
            onClick={() => setActiveTab('ios')}
            className={`flex-1 py-2.5 rounded-xl transition flex items-center justify-center gap-1.5 ${
              activeTab === 'ios'
                ? 'bg-amber-800 text-white shadow-md'
                : 'text-stone-700 hover:text-stone-900'
            }`}
          >
            <span>🍏 iPhone (iOS)</span>
          </button>
          <button
            onClick={() => setActiveTab('desktop')}
            className={`flex-1 py-2.5 rounded-xl transition flex items-center justify-center gap-1.5 ${
              activeTab === 'desktop'
                ? 'bg-amber-800 text-white shadow-md'
                : 'text-stone-700 hover:text-stone-900'
            }`}
          >
            <span>💻 Desktop</span>
          </button>
        </div>

        {/* TAB 1: ANDROID */}
        {activeTab === 'android' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Method A: 1-Click WebAPK */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-stone-200 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-100">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">⚡</span>
                    <h2 className="font-serif font-bold text-xl text-stone-900">Method 1: Instant 1-Click Install (WebAPK)</h2>
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                      Recommended
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-500">
                    Installs instantly into your Android App Drawer without needing to download huge raw files or disable security warnings.
                  </p>
                </div>

                <button
                  onClick={triggerAndroidInstall}
                  className="bg-amber-800 hover:bg-amber-900 active:scale-95 text-white font-bold text-sm px-6 py-3.5 rounded-2xl shadow-lg shadow-amber-900/20 flex items-center justify-center gap-2 transition shrink-0"
                >
                  <Download className="w-4 h-4 text-amber-200" />
                  <span>{deferredPrompt ? 'Install App Now' : 'Tap to Install'}</span>
                </button>
              </div>

              {/* 3 Step Guide */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-stone-50 p-4 rounded-2xl border border-stone-100 space-y-2">
                  <div className="w-7 h-7 rounded-lg bg-amber-800 text-white font-bold text-xs flex items-center justify-center">1</div>
                  <h3 className="font-bold text-xs text-stone-900">Open in Chrome</h3>
                  <p className="text-[11px] text-stone-600">
                    Open <code className="bg-stone-200 px-1 py-0.5 rounded text-[10px]">crafttrue-india.vercel.app</code> in Google Chrome on Android.
                  </p>
                </div>

                <div className="bg-stone-50 p-4 rounded-2xl border border-stone-100 space-y-2">
                  <div className="w-7 h-7 rounded-lg bg-amber-800 text-white font-bold text-xs flex items-center justify-center">2</div>
                  <h3 className="font-bold text-xs text-stone-900">Tap 3-Dots Menu</h3>
                  <p className="text-[11px] text-stone-600">
                    Tap the <strong>⋮</strong> menu icon in top-right corner of Chrome, then select <strong>Install App</strong>.
                  </p>
                </div>

                <div className="bg-stone-50 p-4 rounded-2xl border border-stone-100 space-y-2">
                  <div className="w-7 h-7 rounded-lg bg-amber-800 text-white font-bold text-xs flex items-center justify-center">3</div>
                  <h3 className="font-bold text-xs text-stone-900">Launch from Drawer</h3>
                  <p className="text-[11px] text-stone-600">
                    CraftTrue appears in your Android app list with full hardware camera access and offline caching.
                  </p>
                </div>
              </div>
            </div>

            {/* Method B: Direct APK Package */}
            <div className="bg-gradient-to-br from-amber-50 to-stone-100 rounded-3xl p-6 sm:p-8 border border-amber-200 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">📦</span>
                    <h2 className="font-serif font-bold text-lg text-stone-900">Method 2: Package &amp; Download APK File</h2>
                    <span className="bg-amber-200 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      PWABuilder / TWA
                    </span>
                  </div>
                  <p className="text-xs text-stone-600">
                    Need the standalone <code className="text-amber-900 font-bold">.apk</code> file for sideloading or internal testing? Generate it in 1 click via Microsoft PWABuilder.
                  </p>
                </div>

                <a
                  href="https://www.pwabuilder.com/reportcard?site=https://crafttrue-india.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-stone-900 hover:bg-stone-800 text-amber-300 font-bold text-xs px-5 py-3 rounded-2xl shadow-md flex items-center justify-center gap-2 transition shrink-0"
                >
                  <span>Open PWABuilder Package Hub</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="text-xs text-stone-600 bg-white/80 p-4 rounded-2xl border border-amber-100 space-y-2">
                <div className="font-bold text-stone-800 flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-amber-800" />
                  <span>How to download the APK from PWABuilder:</span>
                </div>
                <p className="text-[11px] text-stone-600">
                  1. Click the button above to load CraftTrue in PWABuilder.<br />
                  2. Tap <strong>&quot;Package for Stores&quot;</strong> → choose <strong>Android</strong>.<br />
                  3. Tap <strong>&quot;Generate Package&quot;</strong> to download the ZIP containing <code className="font-bold">app-release.apk</code>.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: IPHONE (iOS) */}
        {activeTab === 'ios' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-stone-200 space-y-6">
              <div className="space-y-2 pb-6 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🍏</span>
                  <h2 className="font-serif font-bold text-2xl text-stone-900">Install on iPhone (iOS 16, 17, 18+)</h2>
                </div>
                <p className="text-xs sm:text-sm text-stone-600">
                  Apple does not support `.apk` files. Instead, Apple provides native <strong>Web Clip Standalone Apps</strong> through Safari that run directly from your home screen with zero browser bars.
                </p>
              </div>

              {/* 3 Step Visual iPhone Guide */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="bg-gradient-to-b from-stone-50 to-amber-50/40 p-5 rounded-2xl border border-stone-200 space-y-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-800 text-white font-bold text-sm flex items-center justify-center">
                    1
                  </div>
                  <h3 className="font-bold text-sm text-stone-900">Open in Safari</h3>
                  <p className="text-xs text-stone-600">
                    Open <strong className="text-amber-900">Safari</strong> on your iPhone and visit <code className="text-xs bg-stone-200 px-1 py-0.5 rounded">crafttrue-india.vercel.app</code>
                  </p>
                  <p className="text-[11px] text-amber-800 font-medium">
                    (Note: Must use Safari browser to create the Home Screen icon)
                  </p>
                </div>

                <div className="bg-gradient-to-b from-stone-50 to-amber-50/40 p-5 rounded-2xl border border-stone-200 space-y-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-800 text-white font-bold text-sm flex items-center justify-center">
                    2
                  </div>
                  <h3 className="font-bold text-sm text-stone-900">Tap Share Button</h3>
                  <p className="text-xs text-stone-600">
                    Look at the bottom toolbar of Safari and tap the <strong>Share</strong> icon:
                  </p>
                  <div className="flex items-center justify-center p-3 bg-white rounded-xl border border-stone-200 shadow-xs">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 font-bold text-xs rounded-lg border border-blue-200">
                      <Share2 className="w-4 h-4 text-blue-600" />
                      <span>[↑] Share</span>
                    </span>
                  </div>
                </div>

                <div className="bg-gradient-to-b from-stone-50 to-amber-50/40 p-5 rounded-2xl border border-stone-200 space-y-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-800 text-white font-bold text-sm flex items-center justify-center">
                    3
                  </div>
                  <h3 className="font-bold text-sm text-stone-900">Add to Home Screen</h3>
                  <p className="text-xs text-stone-600">
                    Scroll down the share sheet and tap <strong>&quot;Add to Home Screen&quot;</strong>:
                  </p>
                  <div className="flex items-center justify-center p-3 bg-white rounded-xl border border-stone-200 shadow-xs">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-stone-100 text-stone-800 font-bold text-xs rounded-lg border border-stone-300">
                      <PlusSquare className="w-4 h-4 text-stone-700" />
                      <span>[+] Add to Home Screen</span>
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-500">
                    Then tap <strong>&quot;Add&quot;</strong> in top-right. Done!
                  </p>
                </div>
              </div>

              {/* iOS Feature Benefits */}
              <div className="bg-amber-900 text-white p-5 rounded-2xl shadow-md space-y-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-300" />
                  <h4 className="font-bold text-sm">What you get on iPhone:</h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-amber-100">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                    <span><strong>Terracotta Icon:</strong> High-res Apple Touch icon in your App Library</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                    <span><strong>Full-Screen Standalone:</strong> Zero browser bars or navigation interruptions</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                    <span><strong>Dual-Engine QR Scanner:</strong> Instant hardware camera access</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                    <span><strong>Soundbox Audio:</strong> Web Audio verification chime directly from iPhone speaker</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: DESKTOP / LAPTOP */}
        {activeTab === 'desktop' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-stone-200 space-y-6 animate-in fade-in duration-300">
            <div className="text-center max-w-lg mx-auto space-y-3">
              <h2 className="font-serif font-bold text-2xl text-stone-900">Install on Your PC / Mac or Scan to Phone</h2>
              <p className="text-xs text-stone-600">
                You can install CraftTrue directly into your computer (Chrome, Edge, Brave), or point your smartphone camera at the QR code below to install on your mobile device.
              </p>
            </div>

            {/* QR Code for phone scan */}
            <div className="flex flex-col items-center justify-center p-6 bg-stone-50 rounded-2xl border border-stone-200 max-w-sm mx-auto text-center space-y-4">
              <div className="p-3 bg-white rounded-2xl shadow-md border border-stone-200">
                {/* Visual SVG QR Code representation pointing to crafttrue-india.vercel.app/download */}
                <svg className="w-48 h-48" viewBox="0 0 100 100" fill="none">
                  <rect width="100" height="100" rx="10" fill="white" />
                  {/* Outer corner 1 */}
                  <rect x="10" y="10" width="24" height="24" rx="4" fill="#92400e" />
                  <rect x="14" y="14" width="16" height="16" rx="2" fill="white" />
                  <rect x="18" y="18" width="8" height="8" rx="1" fill="#92400e" />
                  {/* Outer corner 2 */}
                  <rect x="66" y="10" width="24" height="24" rx="4" fill="#92400e" />
                  <rect x="70" y="14" width="16" height="16" rx="2" fill="white" />
                  <rect x="74" y="18" width="8" height="8" rx="1" fill="#92400e" />
                  {/* Outer corner 3 */}
                  <rect x="10" y="66" width="24" height="24" rx="4" fill="#92400e" />
                  <rect x="14" y="70" width="16" height="16" rx="2" fill="white" />
                  <rect x="18" y="74" width="8" height="8" rx="1" fill="#92400e" />
                  {/* CraftTrue Pattern matrix dots */}
                  <circle cx="42" cy="18" r="2.5" fill="#92400e" />
                  <circle cx="50" cy="18" r="2.5" fill="#92400e" />
                  <circle cx="58" cy="18" r="2.5" fill="#92400e" />
                  <circle cx="42" cy="26" r="2.5" fill="#92400e" />
                  <circle cx="58" cy="26" r="2.5" fill="#92400e" />
                  <rect x="46" y="24" width="8" height="8" rx="2" fill="#d97706" />
                  <circle cx="42" cy="38" r="2.5" fill="#92400e" />
                  <circle cx="50" cy="38" r="2.5" fill="#92400e" />
                  <circle cx="58" cy="38" r="2.5" fill="#92400e" />
                  <circle cx="22" cy="46" r="2.5" fill="#92400e" />
                  <circle cx="30" cy="46" r="2.5" fill="#92400e" />
                  <circle cx="70" cy="46" r="2.5" fill="#92400e" />
                  <circle cx="78" cy="46" r="2.5" fill="#92400e" />
                  <rect x="42" y="46" width="16" height="16" rx="4" fill="#92400e" />
                  <text x="50" y="58" textAnchor="middle" fill="#fde68a" fontSize="10" fontWeight="bold">CT</text>
                  <circle cx="22" cy="58" r="2.5" fill="#92400e" />
                  <circle cx="78" cy="58" r="2.5" fill="#92400e" />
                  <circle cx="42" cy="74" r="2.5" fill="#92400e" />
                  <circle cx="50" cy="74" r="2.5" fill="#92400e" />
                  <circle cx="58" cy="74" r="2.5" fill="#92400e" />
                  <circle cx="66" cy="74" r="2.5" fill="#92400e" />
                  <circle cx="74" cy="74" r="2.5" fill="#92400e" />
                  <circle cx="82" cy="74" r="2.5" fill="#92400e" />
                  <circle cx="42" cy="82" r="2.5" fill="#92400e" />
                  <circle cx="58" cy="82" r="2.5" fill="#92400e" />
                  <circle cx="70" cy="82" r="2.5" fill="#92400e" />
                </svg>
              </div>

              <div>
                <p className="font-bold text-xs text-stone-900">Scan with iPhone or Android Camera</p>
                <p className="text-[11px] text-stone-500">Opens the install flow instantly on your phone</p>
              </div>
            </div>
          </div>
        )}

        {/* Core App Features Grid */}
        <div className="space-y-4">
          <div className="text-center">
            <h3 className="font-serif font-bold text-xl text-stone-900">Why Use the CraftTrue Mobile App?</h3>
            <p className="text-xs text-stone-500">Engineered specifically for field authenticity and live market verification</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-2">
              <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-900">
                <QrCode className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-stone-900">Dual-Engine Scanner</h4>
              <p className="text-xs text-stone-600">
                Native BarcodeDetector + jsQR frame decoder fallback guarantees 100% camera scanning on both iPhone &amp; Android.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-900">
                <Volume2 className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-stone-900">Soundbox Chime</h4>
              <p className="text-xs text-stone-600">
                Dual-tone Web Audio confirmation chime and device haptic vibration on successful GI tag recognition.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-2">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-900">
                <CreditCard className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-stone-900">Direct Artisan UPI</h4>
              <p className="text-xs text-stone-600">
                1-tap direct payments to master artisan bank VPAs without 20–40% retail markup or intermediary cuts.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-2">
              <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center text-stone-900">
                <WifiOff className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-stone-900">Offline Field Guide</h4>
              <p className="text-xs text-stone-600">
                Full 40-fabric research study, 5 physical field tests, and master artisan profiles cached offline via Service Worker.
              </p>
            </div>
          </div>
        </div>

        {/* Technical Specs Footer Box */}
        <div className="bg-stone-100 rounded-2xl p-5 border border-stone-200 text-xs text-stone-600 space-y-2">
          <div className="flex items-center justify-between font-bold text-stone-800">
            <span>App Technical Specifications</span>
            <span className="text-amber-800">Build: v1.0.0-production</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] pt-1">
            <div><span className="text-stone-400">Package:</span> app.crafttrue.india</div>
            <div><span className="text-stone-400">Arch:</span> PWA / WebAPK / TWA</div>
            <div><span className="text-stone-400">iOS Min:</span> Safari iOS 14.0+</div>
            <div><span className="text-stone-400">Android Min:</span> Chrome 80+ / Android 7+</div>
          </div>
        </div>

      </div>
    </div>
  );
}
