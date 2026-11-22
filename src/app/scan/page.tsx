'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  QrCode, 
  Search, 
  Camera, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  ArrowRight, 
  ShieldAlert, 
  Sparkles, 
  BookOpenCheck,
  Upload,
  Globe,
  ExternalLink,
  ShieldCheck,
  Layers,
  RefreshCw,
  VideoOff
} from 'lucide-react';
import Link from 'next/link';

export default function ScanPage() {
  const router = useRouter();
  const [productCodeInput, setProductCodeInput] = useState('');
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [detectedResult, setDetectedResult] = useState<string | null>(null);
  const [hasBarcodeDetector, setHasBarcodeDetector] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Check if browser has native BarcodeDetector API (Android Chrome, PWA)
  useEffect(() => {
    if (typeof window !== 'undefined' && 'BarcodeDetector' in window) {
      setHasBarcodeDetector(true);
    }
    return () => {
      stopCamera();
    };
  }, []);

  const stopCamera = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }
    setIsCameraActive(false);
  };

  const startCamera = async () => {
    setCameraError(null);
    setDetectedResult(null);
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setCameraError('Camera access is not supported by your browser. Please use manual search or file upload.');
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: 'environment' }, width: { ideal: 1280 }, height: { ideal: 720 } }
      });

      mediaStreamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setIsCameraActive(true);

      // Start continuous barcode detection
      if (typeof window !== 'undefined' && 'BarcodeDetector' in window) {
        startContinuousDetection();
      }
    } catch (err: any) {
      console.warn('Camera stream error:', err);
      setCameraError('Camera access was denied or is unavailable. You can upload an image or type the tag/barcode below.');
      setIsCameraActive(false);
    }
  };

  const startContinuousDetection = () => {
    const BarcodeDetectorClass = (window as any).BarcodeDetector;
    if (!BarcodeDetectorClass) return;

    const barcodeDetector = new BarcodeDetectorClass({
      formats: ['qr_code', 'ean_13', 'ean_8', 'code_128', 'code_39', 'upc_a', 'upc_e']
    });

    const detectFrame = async () => {
      if (videoRef.current && videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA) {
        try {
          const barcodes = await barcodeDetector.detect(videoRef.current);
          if (barcodes && barcodes.length > 0) {
            const rawVal = barcodes[0].rawValue;
            if (rawVal) {
              handleCodeFound(rawVal);
              return; // Stop scanning once found
            }
          }
        } catch (e) {
          // Frame read error, continue polling
        }
      }
      animationFrameRef.current = requestAnimationFrame(detectFrame);
    };

    animationFrameRef.current = requestAnimationFrame(detectFrame);
  };

  const handleCodeFound = (code: string) => {
    stopCamera();
    setDetectedResult(code);
    setIsProcessing(true);

    // Haptic feedback
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate([60, 40, 80]);
    }

    setTimeout(() => {
      navigateToVerification(code);
    }, 600);
  };

  const navigateToVerification = (code: string) => {
    const trimmed = code.trim();
    if (!trimmed) return;

    // If it is a full crafttrue URL, extract path
    if (trimmed.includes('/verify/')) {
      const parts = trimmed.split('/verify/');
      if (parts[1]) {
        router.push(`/verify/${encodeURIComponent(parts[1])}`);
        return;
      }
    }

    // Pass the raw code or URL to /verify/[id]
    router.push(`/verify/${encodeURIComponent(trimmed)}`);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (productCodeInput.trim()) {
      navigateToVerification(productCodeInput.trim());
    }
  };

  // Image upload handler
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    setCameraError(null);

    try {
      const imageBitmap = await createImageBitmap(file);

      if (typeof window !== 'undefined' && 'BarcodeDetector' in window) {
        const BarcodeDetectorClass = (window as any).BarcodeDetector;
        const detector = new BarcodeDetectorClass({
          formats: ['qr_code', 'ean_13', 'ean_8', 'code_128', 'code_39', 'upc_a']
        });
        const barcodes = await detector.detect(imageBitmap);

        if (barcodes && barcodes.length > 0 && barcodes[0].rawValue) {
          handleCodeFound(barcodes[0].rawValue);
          return;
        }
      }

      // If browser doesn't have BarcodeDetector or no QR found in photo
      setCameraError('Image uploaded, but no clear QR or barcode was detected. Please ensure the tag is well-lit and in focus, or type the code below.');
      setIsProcessing(false);
    } catch (err) {
      setCameraError('Unable to process the image file. Please try typing the tag code manually.');
      setIsProcessing(false);
    }
  };

  const triggerSimulatedScan = (sampleCode: string = 'BAGRU-LCD-F001') => {
    setIsProcessing(true);
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(40);
    }
    setTimeout(() => {
      if (typeof window !== 'undefined' && 'vibrate' in navigator) {
        navigator.vibrate([60, 40, 80]);
      }
      navigateToVerification(sampleCode);
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">
      {/* Hidden File Input for Tag Photo Upload */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="image/*"
        capture="environment"
        className="hidden"
      />

      {/* Page Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold border border-amber-300">
          <QrCode className="w-3.5 h-3.5 text-amber-700" />
          <span>Craft &amp; GI Authenticity Scanner • प्रामाणिकता स्कैनर</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
          Scan Tag, Barcode, or Product URL
        </h1>
        <p className="text-sm text-stone-600 max-w-xl mx-auto leading-relaxed">
          Scan the physical QR swing tag, e-commerce barcode, or registered product URL for any <strong>Bagru (GI No. 183)</strong> or <strong>Sanganeri (GI No. 147)</strong> textile to verify origin, artisan lineage, and forensic authenticity.
        </p>
      </div>

      {/* Main Scanner Card */}
      <div className="bg-white rounded-3xl border-2 border-amber-200/80 shadow-xl p-6 sm:p-8 space-y-6">
        
        {/* Scanner Viewport */}
        <div className="relative rounded-2xl overflow-hidden bg-stone-950 aspect-16/10 sm:aspect-21/9 flex flex-col items-center justify-center p-6 text-white border-2 border-dashed border-amber-500/60">
          
          {/* Active Live Video Stream */}
          {isCameraActive && (
            <div className="absolute inset-0 w-full h-full">
              <video
                ref={videoRef}
                playsInline
                muted
                className="w-full h-full object-cover"
              />
              {/* Animated Laser Scanning Line */}
              <div className="absolute inset-x-8 top-1/2 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent shadow-[0_0_12px_#f59e0b] animate-pulse" />
              
              {/* Live Overlay Badge */}
              <div className="absolute top-4 left-4 bg-stone-950/80 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-amber-300 flex items-center gap-2 border border-amber-500/40">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                <span>Live Camera Active • Point at Tag</span>
              </div>

              {/* Stop Camera Button */}
              <button
                type="button"
                onClick={stopCamera}
                className="absolute top-4 right-4 bg-stone-900/80 hover:bg-stone-900 text-stone-200 px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 border border-stone-700"
              >
                <VideoOff className="w-3.5 h-3.5" />
                <span>Stop</span>
              </button>
            </div>
          )}

          {/* Processing / Result Indicator */}
          {isProcessing ? (
            <div className="relative z-10 text-center space-y-4">
              <div className="w-16 h-16 rounded-full border-4 border-amber-400 border-t-transparent animate-spin mx-auto shadow-lg" />
              <p className="font-mono text-sm text-amber-300 font-bold">
                {detectedResult ? `Tag Detected: ${detectedResult}` : 'Analyzing Tag & Querying Registry...'}
              </p>
              <p className="text-xs text-stone-300">Retrieving 7-layer craft evidence &amp; internet records</p>
            </div>
          ) : !isCameraActive && (
            <div className="relative z-10 text-center space-y-4 max-w-md">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center mx-auto text-amber-400">
                <Camera className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <p className="font-bold text-base text-white">Point Camera or Upload Physical Tag</p>
                <p className="text-xs text-stone-300 leading-relaxed">
                  Point at any QR code, garment swing tag, or e-commerce packaging label.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={startCamera}
                  className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md transition flex items-center gap-2"
                >
                  <Camera className="w-4 h-4" />
                  <span>Start Live Camera</span>
                </button>

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-5 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-200 border border-amber-500/30 font-bold text-xs shadow-sm transition flex items-center gap-2"
                >
                  <Upload className="w-4 h-4" />
                  <span>Upload Tag Photo</span>
                </button>
              </div>
            </div>
          )}

          {/* Optical Targeting Crosshairs */}
          <div className="absolute top-4 left-4 w-7 h-7 border-t-2 border-l-2 border-amber-400 pointer-events-none" />
          <div className="absolute top-4 right-4 w-7 h-7 border-t-2 border-r-2 border-amber-400 pointer-events-none" />
          <div className="absolute bottom-4 left-4 w-7 h-7 border-b-2 border-l-2 border-amber-400 pointer-events-none" />
          <div className="absolute bottom-4 right-4 w-7 h-7 border-b-2 border-r-2 border-amber-400 pointer-events-none" />
        </div>

        {/* Error Notification (if any) */}
        {cameraError && (
          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <p className="leading-relaxed">{cameraError}</p>
          </div>
        )}

        {/* Divider */}
        <div className="relative flex items-center justify-center">
          <div className="border-t border-stone-200 w-full" />
          <span className="bg-white px-3 text-xs uppercase tracking-wider text-stone-500 font-bold absolute">
            or search tag, barcode, or web link
          </span>
        </div>

        {/* Manual Code / URL Input Form */}
        <form onSubmit={handleSearchSubmit} className="space-y-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={productCodeInput}
                onChange={(e) => setProductCodeInput(e.target.value)}
                placeholder="Paste product tag ID, barcode, or internet link (e.g. BAGRU-LCD-F001 or https://...)"
                className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-stone-300 rounded-xl text-sm font-sans focus:outline-none focus:ring-2 focus:ring-amber-700/40 focus:bg-white"
              />
            </div>
            <button
              type="submit"
              className="px-7 py-3 bg-stone-900 hover:bg-stone-800 text-amber-300 rounded-xl font-bold text-xs transition flex items-center justify-center gap-2 shadow-sm shrink-0"
            >
              <span>Verify &amp; Fetch Info</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </button>
          </div>
          <p className="text-[11px] text-stone-500 italic">
            Supports official CraftTrue tags, external merchant URLs, barcodes (EAN-13, UPC), and GI Application Numbers (GI-183, GI-147).
          </p>
        </form>
      </div>

      {/* INSTANT DEMO TAGS & SAMPLE TESTING */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-700" />
            <h3 className="font-serif font-bold text-lg text-stone-900">
              Sample Registered Tags for Instant Testing
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
            type="button"
            onClick={() => navigateToVerification('BAGRU-LCD-F001')}
            className="text-left p-5 rounded-2xl border border-emerald-300 bg-emerald-50/60 hover:bg-emerald-100/70 transition space-y-2 group shadow-xs"
          >
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-700 text-white flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                VERIFIED AUTHENTIC SPECIMEN
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
            type="button"
            onClick={() => navigateToVerification('SGR-BBU-F001')}
            className="text-left p-5 rounded-2xl border border-sky-300 bg-sky-50/60 hover:bg-sky-100/70 transition space-y-2 group shadow-xs"
          >
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-sky-700 text-white flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                VERIFIED AUTHENTIC SPECIMEN
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
            type="button"
            onClick={() => navigateToVerification('CTI-MIS-000305')}
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
            type="button"
            onClick={() => navigateToVerification('CTI-DUP-000412')}
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
              Anti-duplication security: Triggers audit quarantine when identical QR tag ID is scanned across multiple locations within 15 minutes.
            </p>
          </button>

          {/* Preset E: External Internet Web Link Example */}
          <button
            type="button"
            onClick={() => navigateToVerification('https://goswadeshi.in/products/handblock-bagru-dabu-cotton-dupatta')}
            className="text-left p-5 rounded-2xl border border-blue-300 bg-blue-50/60 hover:bg-blue-100/70 transition space-y-2 group shadow-xs md:col-span-2"
          >
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-700 text-white flex items-center gap-1">
                <Globe className="w-3 h-3" />
                EXTERNAL INTERNET URL SCAN TEST
              </span>
              <span className="font-mono text-xs text-stone-500 font-bold group-hover:text-blue-900 flex items-center gap-1">
                <span>Test Web Lookup</span>
                <ExternalLink className="w-3 h-3" />
              </span>
            </div>
            <h4 className="font-bold text-sm text-stone-900">Test External E-Commerce / Merchant Web Link</h4>
            <p className="text-xs text-stone-600">
              Test how the system fetches and verifies registered product links from external sites (GoSwadeshi, Amazon Karigar, Fabindia, ONDC, GI Registry).
            </p>
          </button>

        </div>
      </div>
    </div>
  );
}
