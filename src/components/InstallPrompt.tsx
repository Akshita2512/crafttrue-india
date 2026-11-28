'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Smartphone, Download, X, QrCode, ChevronRight, Check } from 'lucide-react';

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isIos, setIsIos] = useState(false);
  const [isStandalone, setIsStandalone] = useState(true); // default true to avoid flash
  const [showPrompt, setShowPrompt] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    // Check if running in standalone PWA mode
    const standaloneMode = 
      window.matchMedia('(display-mode: standalone)').matches || 
      (window.navigator as any).standalone === true;
    
    setIsStandalone(standaloneMode);
    if (standaloneMode) return;

    // Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent) && !(window as any).MSStream;
    setIsIos(isIosDevice);

    // Check if user previously dismissed prompt in this session
    const dismissed = sessionStorage.getItem('crafttrue_install_dismissed');
    if (dismissed) return;

    // Listen for Android / Chrome beforeinstallprompt
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // On iOS Safari, show prompt after 2.5s delay if not dismissed
    let timer: NodeJS.Timeout;
    if (isIosDevice) {
      timer = setTimeout(() => {
        setShowPrompt(true);
      }, 2500);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      if (timer) clearTimeout(timer);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setInstalled(true);
        setShowPrompt(false);
      }
      setDeferredPrompt(null);
    } else {
      // If prompt not available (e.g. iOS or manual), open the modal
      setShowModal(true);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    sessionStorage.setItem('crafttrue_install_dismissed', 'true');
  };

  if (isStandalone) return null;

  return (
    <>
      {/* Floating Bottom Install Banner (Mobile & Tablet) */}
      {showPrompt && !installed && (
        <div className="fixed bottom-20 md:bottom-6 left-3 right-3 md:left-auto md:right-6 md:max-w-md z-40 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 text-white p-3.5 sm:p-4 rounded-2xl shadow-2xl border border-amber-600/30 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-600 to-amber-900 flex items-center justify-center shrink-0 border border-amber-400/30 shadow-md">
                <Smartphone className="w-5 h-5 text-amber-200" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-xs sm:text-sm text-white truncate">Install CraftTrue App</span>
                  <span className="text-[9px] uppercase px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold">
                    {isIos ? 'iPhone' : 'Android'}
                  </span>
                </div>
                <p className="text-[11px] text-stone-300 truncate mt-0.5">
                  {isIos ? 'Fast QR scan & offline GI guide' : '1-tap install for full camera & offline'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              {deferredPrompt ? (
                <button
                  onClick={handleInstallClick}
                  className="bg-amber-600 hover:bg-amber-500 active:scale-95 text-white px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 shadow-md shadow-amber-900/40"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Install</span>
                </button>
              ) : (
                <button
                  onClick={() => setShowModal(true)}
                  className="bg-amber-700 hover:bg-amber-600 active:scale-95 text-white px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 shadow-md"
                >
                  <span>How-To</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              )}

              <button
                onClick={handleDismiss}
                className="p-1 text-stone-400 hover:text-white rounded-lg transition"
                aria-label="Dismiss banner"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Install Guide Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4 animate-in fade-in duration-200">
          <div className="bg-[#FFFDF9] w-full max-w-lg rounded-t-3xl sm:rounded-3xl shadow-2xl border border-amber-900/15 overflow-hidden animate-in slide-in-from-bottom duration-300">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-amber-950 via-amber-900 to-stone-900 text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-800 flex items-center justify-center border border-amber-500/40">
                  <Smartphone className="w-5 h-5 text-amber-200" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-base text-white">Get CraftTrue Mobile App</h3>
                  <p className="text-xs text-amber-200/80">Pure standalone experience for Android &amp; iOS</p>
                </div>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
              {/* iPhone iOS Steps */}
              {isIos ? (
                <div className="space-y-3 bg-amber-50/70 p-4 rounded-2xl border border-amber-200">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🍏</span>
                    <h4 className="font-bold text-sm text-stone-900">How to Install on iPhone (Safari)</h4>
                  </div>
                  <ol className="text-xs text-stone-700 space-y-2.5 list-decimal pl-4">
                    <li>
                      Open this page in <strong>Safari</strong> (if currently in another browser).
                    </li>
                    <li className="flex items-center gap-2">
                      <span>Tap the <strong>Share</strong> button at bottom center</span>
                      <span className="inline-flex items-center justify-center px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 font-bold text-[11px] border border-blue-200">
                        [↑] Share
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span>Scroll down and tap <strong>Add to Home Screen</strong></span>
                      <span className="inline-flex items-center justify-center px-1.5 py-0.5 rounded bg-stone-200 text-stone-800 font-bold text-[11px]">
                        [+] Add
                      </span>
                    </li>
                    <li>
                      Tap <strong>Add</strong> in the top-right corner. The CraftTrue icon appears on your home screen!
                    </li>
                  </ol>
                  <div className="text-[11px] text-amber-800 bg-amber-100/60 p-2.5 rounded-xl">
                    ✨ <strong>Native iOS Benefits:</strong> Launches in full-screen without Safari browser bars, instant camera QR scanning, and offline craft records.
                  </div>
                </div>
              ) : (
                /* Android Steps */
                <div className="space-y-3 bg-stone-50 p-4 rounded-2xl border border-stone-200">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🤖</span>
                    <h4 className="font-bold text-sm text-stone-900">How to Install on Android</h4>
                  </div>
                  <ol className="text-xs text-stone-700 space-y-2 list-decimal pl-4">
                    <li>
                      Open this page in <strong>Google Chrome</strong>.
                    </li>
                    <li>
                      Tap the 3 dots menu <span className="font-mono font-bold">⋮</span> at the top-right corner.
                    </li>
                    <li>
                      Tap <strong>&quot;Install app&quot;</strong> or <strong>&quot;Add to Home screen&quot;</strong>.
                    </li>
                    <li>
                      Tap <strong>Install</strong>. Android will automatically mint the WebAPK into your phone&apos;s app drawer!
                    </li>
                  </ol>
                  {deferredPrompt && (
                    <button
                      onClick={handleInstallClick}
                      className="w-full mt-2 bg-amber-800 hover:bg-amber-900 text-white font-bold text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-sm transition"
                    >
                      <Download className="w-4 h-4" />
                      <span>Trigger 1-Click Install Now</span>
                    </button>
                  )}
                </div>
              )}

              {/* View Full Download Hub Link */}
              <div className="pt-2 text-center">
                <Link
                  href="/download"
                  onClick={() => setShowModal(false)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-900 hover:text-amber-700 underline underline-offset-4"
                >
                  <span>Visit Full App Hub &amp; APK Generator</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-stone-100 px-5 py-3 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500">
              <span>CraftTrue v1.0.0 • Verified GI</span>
              <button
                onClick={() => setShowModal(false)}
                className="text-stone-700 font-semibold hover:text-stone-900"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
