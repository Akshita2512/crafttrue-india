'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import jsQR from 'jsqr';
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
  VideoOff, 
  Zap, 
  ZapOff, 
  Volume2, 
  VolumeX, 
  Image as ImageIcon 
} from 'lucide-react';
import Link from 'next/link';

export default function ScanPage() {
  const router = useRouter();
  const [productCodeInput, setProductCodeInput] = useState('');
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [detectedResult, setDetectedResult] = useState<string | null>(null);
  const [detectedType, setDetectedType] = useState<'gi_tag' | 'artisan_upi' | 'external_url' | 'barcode'>('gi_tag');

  // Camera controls
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [isTorchOn, setIsTorchOn] = useState(false);
  const [torchSupported, setTorchSupported] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Optical Verification Audio Feedback Chime (Web Audio API Synthesizer)
  const playVerificationChime = useCallback(() => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      // Tone 1: 880Hz (A5)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(880, ctx.currentTime);
      gain1.gain.setValueAtTime(0.2, ctx.currentTime);
      gain1.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(ctx.currentTime);
      osc1.stop(ctx.currentTime + 0.12);

      // Tone 2: 1760Hz (A6) - High crisp confirmation bell
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(1760, ctx.currentTime + 0.09);
      gain2.gain.setValueAtTime(0.25, ctx.currentTime + 0.09);
      gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.38);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(ctx.currentTime + 0.09);
      osc2.stop(ctx.currentTime + 0.38);
    } catch {
      // AudioContext fallback
    }
  }, [soundEnabled]);

  // Clean up camera on unmount
  useEffect(() => {
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
      mediaStreamRef.current.getTracks().forEach(track => {
        track.stop();
      });
      mediaStreamRef.current = null;
    }
    setIsCameraActive(false);
    setIsTorchOn(false);
  };

  const startCamera = async (mode: 'environment' | 'user' = facingMode) => {
    setCameraError(null);
    setDetectedResult(null);
    stopCamera();

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setCameraError('Camera access is not supported by your browser. Please use manual search or photo upload.');
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: mode },
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });

      mediaStreamRef.current = stream;

      // Check Torch capability
      const videoTrack = stream.getVideoTracks()[0];
      if (videoTrack) {
        const capabilities = (videoTrack.getCapabilities && videoTrack.getCapabilities()) || {};
        setTorchSupported(Boolean((capabilities as any).torch));
      }

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.setAttribute('playsinline', 'true');
        videoRef.current.setAttribute('webkit-playsinline', 'true');
        try {
          await videoRef.current.play();
        } catch (playErr) {
          console.warn('Video play caught:', playErr);
        }
      }
      setIsCameraActive(true);

      // Start Dual-Engine Detection (BarcodeDetector + jsQR fallback for iPhone iOS)
      startContinuousDetection();
    } catch (err: any) {
      console.warn('Camera stream error:', err);
      setCameraError('Camera access was denied or is unavailable. Please grant permission, or upload a tag image / search below.');
      setIsCameraActive(false);
    }
  };

  // Toggle Torch Flashlight feature
  const toggleTorch = async () => {
    if (!mediaStreamRef.current) return;
    const track = mediaStreamRef.current.getVideoTracks()[0];
    if (!track) return;
    try {
      const nextState = !isTorchOn;
      await (track as any).applyConstraints({
        advanced: [{ torch: nextState }]
      });
      setIsTorchOn(nextState);
    } catch (err) {
      console.warn('Torch constraint error:', err);
    }
  };

  // Switch between back/front cameras
  const toggleCameraFacing = () => {
    const nextMode = facingMode === 'environment' ? 'user' : 'environment';
    setFacingMode(nextMode);
    startCamera(nextMode);
  };

  // Dual-Engine continuous QR frame processing
  const startContinuousDetection = () => {
    // 1. Try Native BarcodeDetector (Chrome, Edge, Android)
    const hasNativeDetector = typeof window !== 'undefined' && 'BarcodeDetector' in window;
    let nativeDetector: any = null;
    if (hasNativeDetector) {
      try {
        const BarcodeDetectorClass = (window as any).BarcodeDetector;
        nativeDetector = new BarcodeDetectorClass({
          formats: ['qr_code', 'ean_13', 'ean_8', 'code_128', 'code_39', 'upc_a', 'upc_e']
        });
      } catch {
        nativeDetector = null;
      }
    }

    // 2. Offscreen Canvas for jsQR (Universal Fallback for iPhone/iOS Safari)
    if (!canvasRef.current) {
      canvasRef.current = document.createElement('canvas');
    }
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });

    let lastScanTime = 0;

    const detectFrame = async (timestamp: number) => {
      const video = videoRef.current;

      if (video && video.readyState === video.HAVE_ENOUGH_DATA) {
        // Run detection every 80-100ms to balance performance & battery
        if (timestamp - lastScanTime > 90) {
          lastScanTime = timestamp;

          // Attempt Engine 1: Native BarcodeDetector
          if (nativeDetector) {
            try {
              const barcodes = await nativeDetector.detect(video);
              if (barcodes && barcodes.length > 0 && barcodes[0].rawValue) {
                handleCodeFound(barcodes[0].rawValue);
                return;
              }
            } catch {
              // fallback to jsQR
            }
          }

          // Attempt Engine 2: jsQR Fallback (Works on 100% of iPhones & WebKit browsers)
          if (ctx && video.videoWidth > 0 && video.videoHeight > 0) {
            try {
              const scanWidth = Math.min(640, video.videoWidth);
              const scanHeight = Math.min(480, (video.videoHeight * scanWidth) / video.videoWidth);

              canvas.width = scanWidth;
              canvas.height = scanHeight;
              ctx.drawImage(video, 0, 0, scanWidth, scanHeight);

              const imgData = ctx.getImageData(0, 0, scanWidth, scanHeight);
              const qr = jsQR(imgData.data, imgData.width, imgData.height, {
                inversionAttempts: 'dontInvert',
              });

              if (qr && qr.data) {
                handleCodeFound(qr.data);
                return;
              }
            } catch {
              // frame drop, continue
            }
          }
        }
      }

      animationFrameRef.current = requestAnimationFrame(detectFrame);
    };

    animationFrameRef.current = requestAnimationFrame(detectFrame);
  };

  // Handle successful QR detection
  const handleCodeFound = (code: string) => {
    stopCamera();
    setDetectedResult(code);
    setIsProcessing(true);

    // Play crisp audio confirmation chime
    playVerificationChime();

    // Haptic double vibration
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate([60, 40, 80]);
    }

    // Classify scan type
    const trimmed = code.trim();
    if (trimmed.startsWith('upi://') || trimmed.includes('@upi') || trimmed.includes('paytm.me')) {
      setDetectedType('artisan_upi');
    } else if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
      setDetectedType('external_url');
    } else if (trimmed.includes('BAGRU') || trimmed.includes('SGR') || trimmed.includes('CTI')) {
      setDetectedType('gi_tag');
    } else {
      setDetectedType('barcode');
    }

    // Auto-navigate after short confirmation visual
    setTimeout(() => {
      navigateToVerification(code);
    }, 750);
  };

  const navigateToVerification = (code: string) => {
    const trimmed = code.trim();
    if (!trimmed) return;

    // Handle full CraftTrue verification URLs
    if (trimmed.includes('/verify/')) {
      const parts = trimmed.split('/verify/');
      if (parts[1]) {
        router.push(`/verify/${encodeURIComponent(parts[1])}`);
        return;
      }
    }

    // Pass code / URL to /verify/[id]
    router.push(`/verify/${encodeURIComponent(trimmed)}`);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (productCodeInput.trim()) {
      navigateToVerification(productCodeInput.trim());
    }
  };

  // Image Upload handler (with jsQR fallback for iPhone & all devices)
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    setCameraError(null);

    try {
      const img = new Image();
      const objectUrl = URL.createObjectURL(file);

      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0);
            const imgData = ctx.getImageData(0, 0, img.width, img.height);
            const qr = jsQR(imgData.data, imgData.width, imgData.height);
            URL.revokeObjectURL(objectUrl);

            if (qr && qr.data) {
              handleCodeFound(qr.data);
              return;
            }
          }
          URL.revokeObjectURL(objectUrl);
          setCameraError('No readable QR code found in photo. Please ensure tag is well-lit and in focus, or type code below.');
          setIsProcessing(false);
        } catch {
          URL.revokeObjectURL(objectUrl);
          setCameraError('Could not process photo. Please type tag code manually below.');
          setIsProcessing(false);
        }
      };

      img.onerror = () => {
        URL.revokeObjectURL(objectUrl);
        setCameraError('Could not load image file. Please try another photo or enter code manually.');
        setIsProcessing(false);
      };

      img.src = objectUrl;
    } catch {
      setCameraError('Error reading uploaded image. Please enter tag code manually.');
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Hidden File Input for Tag Photo Upload */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="image/*"
        className="hidden"
      />

      {/* Page Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold border border-amber-300">
          <QrCode className="w-3.5 h-3.5 text-amber-700" />
          <span>Optical Precision QR Scanner • प्रामाणिकता स्कैनर</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
          Scan Handloom QR Tag, Barcode, or Artisan UPI
        </h1>
        <p className="text-sm text-stone-600 max-w-xl mx-auto leading-relaxed">
          High-speed optical verification for <strong>Bagru (GI No. 183)</strong>, <strong>Sanganeri (GI No. 147)</strong>, e-commerce barcodes, and direct artisan UPI tags.
        </p>
      </div>

      {/* Main Optical Scanner Card */}
      <div className="bg-white rounded-3xl border-2 border-amber-200/80 shadow-xl p-4 sm:p-6 space-y-6">
        
        {/* OPTICAL VIEWFINDER VIEWPORT */}
        <div className="relative rounded-2xl overflow-hidden bg-stone-950 aspect-4/3 sm:aspect-16/10 flex flex-col items-center justify-center text-white border border-stone-800 shadow-inner">
          
          {/* Active Live Video Stream */}
          {isCameraActive && (
            <div className="absolute inset-0 w-full h-full flex items-center justify-center">
              <video
                ref={videoRef}
                playsInline
                autoPlay
                muted
                className="w-full h-full object-cover"
              />

              {/* ILLUMINATED TARGETING RETICLE */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                {/* Dark Vignette Overlay outside frame */}
                <div className="relative w-64 h-64 sm:w-72 sm:h-72">
                  
                  {/* Top-Left Corner Bracket */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-amber-400 rounded-tl-xl shadow-[0_0_8px_#f59e0b]" />
                  {/* Top-Right Corner Bracket */}
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-amber-400 rounded-tr-xl shadow-[0_0_8px_#f59e0b]" />
                  {/* Bottom-Left Corner Bracket */}
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-amber-400 rounded-bl-xl shadow-[0_0_8px_#f59e0b]" />
                  {/* Bottom-Right Corner Bracket */}
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-amber-400 rounded-br-xl shadow-[0_0_8px_#f59e0b]" />

                  {/* High-Precision Sweeping Laser Beam */}
                  <div className="absolute inset-x-2 top-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent shadow-[0_0_15px_#f59e0b] animate-[bounce_2s_infinite]" />

                  {/* Center Target Indicator */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-30">
                    <QrCode className="w-24 h-24 text-amber-300/40" />
                  </div>
                </div>

                <p className="mt-4 px-3 py-1 rounded-full bg-stone-900/80 backdrop-blur-md text-amber-200 text-[11px] font-semibold border border-amber-500/30">
                  Align QR Code within the frame
                </p>
              </div>

              {/* Top Bar inside Viewfinder */}
              <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-auto">
                <div className="bg-stone-900/85 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-amber-300 flex items-center gap-1.5 border border-amber-500/40">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>Dual-Engine Live Scan (iPhone &amp; Android)</span>
                </div>

                <button
                  type="button"
                  onClick={stopCamera}
                  className="bg-stone-900/90 hover:bg-stone-800 text-stone-200 px-2.5 py-1 rounded-xl text-xs font-semibold flex items-center gap-1 border border-stone-700 shadow-sm"
                >
                  <VideoOff className="w-3.5 h-3.5" />
                  <span>Stop</span>
                </button>
              </div>

              {/* IN-CAMERA TOOLBAR CONTROLS */}
              <div className="absolute bottom-3 inset-x-4 flex items-center justify-center gap-3 pointer-events-auto">
                {/* Torch Toggle */}
                {torchSupported && (
                  <button
                    type="button"
                    onClick={toggleTorch}
                    className={`p-2.5 rounded-full backdrop-blur-md border text-xs font-semibold transition flex items-center gap-1.5 shadow-md ${
                      isTorchOn
                        ? 'bg-amber-400 text-stone-950 border-amber-300 shadow-amber-500/40'
                        : 'bg-stone-900/80 hover:bg-stone-800 text-stone-200 border-stone-700'
                    }`}
                    title="Toggle Flashlight"
                  >
                    {isTorchOn ? <Zap className="w-4 h-4 fill-current" /> : <ZapOff className="w-4 h-4" />}
                    <span className="text-[10px] hidden sm:inline">{isTorchOn ? 'Torch On' : 'Torch'}</span>
                  </button>
                )}

                {/* Switch Camera (Front/Back) */}
                <button
                  type="button"
                  onClick={toggleCameraFacing}
                  className="p-2.5 rounded-full bg-stone-900/80 hover:bg-stone-800 text-stone-200 border border-stone-700 backdrop-blur-md transition flex items-center gap-1.5 shadow-md"
                  title="Flip Camera"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span className="text-[10px] hidden sm:inline">Flip</span>
                </button>

                {/* Sound Toggle */}
                <button
                  type="button"
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className={`p-2.5 rounded-full backdrop-blur-md border text-xs transition flex items-center gap-1.5 shadow-md ${
                    soundEnabled
                      ? 'bg-stone-900/80 text-amber-300 border-amber-500/40'
                      : 'bg-stone-900/80 text-stone-400 border-stone-700'
                  }`}
                  title="Audio Confirmation Chime"
                >
                  {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                  <span className="text-[10px] hidden sm:inline">Sound</span>
                </button>

                {/* Upload from Gallery button */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="p-2.5 rounded-full bg-stone-900/80 hover:bg-stone-800 text-amber-200 border border-amber-500/30 backdrop-blur-md transition flex items-center gap-1.5 shadow-md"
                  title="Scan from Gallery Photo"
                >
                  <ImageIcon className="w-4 h-4" />
                  <span className="text-[10px] hidden sm:inline">Photos</span>
                </button>
              </div>
            </div>
          )}

          {/* Processing / Result Indicator */}
          {isProcessing ? (
            <div className="relative z-10 text-center space-y-4 p-6">
              <div className="w-16 h-16 rounded-full border-4 border-amber-400 border-t-transparent animate-spin mx-auto shadow-lg" />
              <div className="space-y-1">
                <span className="inline-block px-3 py-0.5 rounded-full bg-amber-400 text-stone-950 text-xs font-bold shadow-xs">
                  {detectedType === 'artisan_upi' ? 'Direct Artisan UPI Code Detected' : 'Verified QR Captured'}
                </span>
                <p className="font-mono text-sm text-amber-200 font-bold truncate max-w-xs mx-auto">
                  {detectedResult}
                </p>
                <p className="text-xs text-stone-300">Retrieving GI Registry &amp; Blockchain Lineage...</p>
              </div>
            </div>
          ) : !isCameraActive && (
            <div className="relative z-10 text-center space-y-4 max-w-md p-6">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center mx-auto text-amber-400 shadow-md">
                <Camera className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <p className="font-bold text-base text-white">Tap to Open Precision Scanner</p>
                <p className="text-xs text-stone-300 leading-relaxed">
                  Fast camera recognition with instant chime feedback for GI tags, barcodes, and direct artisan UPI codes.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => startCamera()}
                  className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 active:scale-95 text-white font-bold text-xs shadow-md transition flex items-center gap-2"
                >
                  <Camera className="w-4 h-4" />
                  <span>Start Camera Scanner</span>
                </button>

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-5 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 active:scale-95 text-amber-200 border border-amber-500/30 font-bold text-xs shadow-sm transition flex items-center gap-2"
                >
                  <Upload className="w-4 h-4" />
                  <span>Upload Tag Photo</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Error Notification */}
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
            or search tag, barcode, or direct upi link
          </span>
        </div>

        {/* Manual Code / URL / Artisan UPI Input Form */}
        <form onSubmit={handleSearchSubmit} className="space-y-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={productCodeInput}
                onChange={(e) => setProductCodeInput(e.target.value)}
                placeholder="Paste GI Tag ID, Artisan UPI link, or Barcode (e.g. BAGRU-LCD-F001 or upi://pay...)"
                className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-stone-300 rounded-xl text-sm font-sans focus:outline-none focus:ring-2 focus:ring-amber-700/40 focus:bg-white"
              />
            </div>
            <button
              type="submit"
              className="px-7 py-3 bg-stone-900 hover:bg-stone-800 active:scale-95 text-amber-300 rounded-xl font-bold text-xs transition flex items-center justify-center gap-2 shadow-sm shrink-0"
            >
              <span>Verify &amp; Fetch Info</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </button>
          </div>
          <p className="text-[11px] text-stone-500 italic">
            Supports official CraftTrue tags, Artisan UPI strings, external merchant URLs, and GI Registry numbers (GI-183, GI-147).
          </p>
        </form>
      </div>

      {/* SAMPLE REGISTERED TAGS & DEMO TESTING */}
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
            onClick={() => {
              playVerificationChime();
              navigateToVerification('BAGRU-LCD-F001');
            }}
            className="text-left p-5 rounded-2xl border border-emerald-300 bg-emerald-50/60 hover:bg-emerald-100/70 active:scale-[0.99] transition space-y-2 group shadow-xs"
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
              Master Lalchand &apos;Chippa&apos; Derawala (National Award 1999). Natural harda cream ground, natural syahi &amp; madder red.
            </p>
          </button>

          {/* Preset B: Fully Verified Sanganer */}
          <button
            type="button"
            onClick={() => {
              playVerificationChime();
              navigateToVerification('SGR-BBU-F001');
            }}
            className="text-left p-5 rounded-2xl border border-sky-300 bg-sky-50/60 hover:bg-sky-100/70 active:scale-[0.99] transition space-y-2 group shadow-xs"
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
              Master Brij Ballabh Udaiwal (National Award 1991, Pehchan ID NRJPC241208). Fine boota &amp; bootie on river-washed mulmul.
            </p>
          </button>

          {/* Preset C: Confirmed Craftwashing Misrepresentation */}
          <button
            type="button"
            onClick={() => {
              playVerificationChime();
              navigateToVerification('CTI-MIS-000305');
            }}
            className="text-left p-5 rounded-2xl border border-rose-300 bg-rose-50/60 hover:bg-rose-100/70 active:scale-[0.99] transition space-y-2 group shadow-xs"
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
              Commercial fraud detection: Rotary screen print using acrylic pigments, zero reverse strike-through, 300% markup on poly-cotton.
            </p>
          </button>

          {/* Preset D: Direct Artisan UPI QR Code Test */}
          <button
            type="button"
            onClick={() => {
              playVerificationChime();
              navigateToVerification('upi://pay?pa=lalchand.derawala@upi&pn=Master%20Lalchand%20Chippa&mc=5999&tid=BAGRU183');
            }}
            className="text-left p-5 rounded-2xl border border-cyan-300 bg-cyan-50/60 hover:bg-cyan-100/70 active:scale-[0.99] transition space-y-2 group shadow-xs"
          >
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-700 text-white flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                DIRECT ARTISAN UPI QR
              </span>
              <span className="font-mono text-xs text-stone-500 font-bold group-hover:text-cyan-900">
                Test Artisan UPI →
              </span>
            </div>
            <h4 className="font-bold text-sm text-stone-900">Master Artisan Direct UPI Soundbox QR</h4>
            <p className="text-xs text-stone-600">
              Simulate scanning a verified direct-pay UPI soundbox QR tag from an artisan workshop in Laxmi Nath Chowk, Bagru.
            </p>
          </button>

        </div>
      </div>
    </div>
  );
}
