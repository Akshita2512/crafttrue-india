'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useUserRole } from '@/context/RoleContext';
import { 
  Smartphone, 
  Mail, 
  KeyRound, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Award, 
  UserCheck, 
  QrCode, 
  Lock,
  RefreshCw,
  AlertCircle
} from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '/';

  const { currentUser, loginWithPhoneOtp, loginWithEmail, loginAsArtisan } = useUserRole();

  // Tab State: 'phone' | 'email' | 'artisan'
  const [activeTab, setActiveTab] = useState<'phone' | 'email' | 'artisan'>('phone');

  // Phone OTP State
  const [phoneNumber, setPhoneNumber] = useState('9876543210');
  const [fullName, setFullName] = useState('Ananya Sharma');
  const [otpSent, setOtpSent] = useState(false);
  const [demoOtpBanner, setDemoOtpBanner] = useState<string | null>(null);
  const [otpInput, setOtpInput] = useState('');
  const [countdown, setCountdown] = useState(30);
  const [phoneError, setPhoneError] = useState('');
  const [phoneSuccess, setPhoneSuccess] = useState(false);

  // Email State
  const [emailInput, setEmailInput] = useState('buyer@crafttrue.in');
  const [passwordInput, setPasswordInput] = useState('CraftTrue@2026');
  const [emailSuccess, setEmailSuccess] = useState(false);

  // Timer for OTP countdown
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (otpSent && countdown > 0) {
      timer = setTimeout(() => setCountdown(c => c - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [otpSent, countdown]);

  // If already logged in, show status or auto-redirect
  useEffect(() => {
    if (currentUser?.isLoggedIn) {
      const t = setTimeout(() => {
        router.push(redirectUrl);
      }, 1500);
      return () => clearTimeout(t);
    }
  }, [currentUser, redirectUrl, router]);

  // Handle Send OTP
  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setPhoneError('');
    const clean = phoneNumber.replace(/\D/g, '');
    if (clean.length < 10) {
      setPhoneError('Please enter a valid 10-digit mobile number.');
      return;
    }

    setOtpSent(true);
    setCountdown(30);
    // Display Interactive Demo OTP Banner
    setDemoOtpBanner('4821');

    // Haptic vibration
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(50);
    }
  };

  // Handle Verify OTP
  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setPhoneError('');

    const res = loginWithPhoneOtp(phoneNumber, otpInput, fullName);
    if (res.success) {
      setPhoneSuccess(true);
      if (typeof window !== 'undefined' && 'vibrate' in navigator) {
        navigator.vibrate([60, 40, 80]);
      }
      setTimeout(() => {
        router.push(redirectUrl);
      }, 1000);
    } else {
      setPhoneError(res.message || 'Invalid OTP');
    }
  };

  // 1-Click Auto Fill Demo OTP
  const handleAutoFillOtp = () => {
    setOtpInput('4821');
  };

  // Handle Email Login
  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const res = loginWithEmail(emailInput, passwordInput);
    if (res.success) {
      setEmailSuccess(true);
      setTimeout(() => {
        router.push(redirectUrl);
      }, 1000);
    }
  };

  // Handle Artisan 1-Click Login
  const handleArtisanLogin = (key: 'lalchand' | 'brijballabh') => {
    loginAsArtisan(key);
    router.push('/artisan');
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-12 space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold border border-amber-300">
          <Lock className="w-3.5 h-3.5 text-amber-700" />
          <span>Secure Sign In • प्रमाणीकरण प्रवेश</span>
        </div>
        <h1 className="font-serif text-3xl font-bold text-stone-900">
          Sign In to CRAFTTRUE INDIA
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
          Access your verified purchases, fair-trade cart, and master artisan credentials.
        </p>
      </div>

      {/* Main Login Card */}
      <div className="bg-white rounded-3xl border-2 border-amber-200/90 shadow-xl overflow-hidden">
        
        {/* Navigation Tabs */}
        <div className="grid grid-cols-3 bg-stone-100 p-1.5 border-b border-stone-200 text-xs font-bold">
          <button
            type="button"
            onClick={() => setActiveTab('phone')}
            className={`py-2.5 rounded-xl transition flex items-center justify-center gap-1.5 ${
              activeTab === 'phone'
                ? 'bg-white text-stone-900 shadow-sm'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            <Smartphone className="w-4 h-4 text-amber-700" />
            <span>Mobile OTP</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('email')}
            className={`py-2.5 rounded-xl transition flex items-center justify-center gap-1.5 ${
              activeTab === 'email'
                ? 'bg-white text-stone-900 shadow-sm'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            <Mail className="w-4 h-4 text-stone-600" />
            <span>Email ID</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('artisan')}
            className={`py-2.5 rounded-xl transition flex items-center justify-center gap-1.5 ${
              activeTab === 'artisan'
                ? 'bg-amber-800 text-white shadow-sm'
                : 'text-amber-900 hover:text-amber-950'
            }`}
          >
            <Award className="w-4 h-4 text-amber-300" />
            <span>Artisan Studio</span>
          </button>
        </div>

        {/* TAB 1: MOBILE NUMBER OTP (CONSUMER) */}
        {activeTab === 'phone' && (
          <div className="p-6 sm:p-8 space-y-6">
            
            {/* INTERACTIVE DEMO OTP BANNER */}
            {demoOtpBanner && !phoneSuccess && (
              <div className="p-4 rounded-2xl bg-amber-500/15 border-2 border-amber-500 text-amber-950 space-y-2 animate-bounce-short shadow-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-700 animate-spin" />
                    <strong className="text-xs uppercase tracking-wider font-extrabold text-amber-900">
                      ⚡ Demo OTP Generated
                    </strong>
                  </div>
                  <button
                    type="button"
                    onClick={handleAutoFillOtp}
                    className="px-2.5 py-1 bg-amber-800 hover:bg-amber-900 text-white font-bold text-[11px] rounded-lg transition shadow-xs"
                  >
                    Auto-Fill 4821
                  </button>
                </div>
                <div className="flex items-baseline justify-between text-xs">
                  <span>Your verification code is: <strong className="font-mono text-base text-amber-950 font-black">4821</strong> (or use <span className="font-mono">1234</span>)</span>
                  <span className="text-[10px] text-amber-800 font-semibold">Zero Carrier Delay</span>
                </div>
              </div>
            )}

            {/* Success State */}
            {phoneSuccess ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-700 border-2 border-emerald-300">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-xl font-bold text-stone-900">Signed In Successfully!</h3>
                <p className="text-xs text-stone-600">
                  Welcome, <strong>{fullName}</strong>. Your consumer account has been authenticated. Redirecting...
                </p>
              </div>
            ) : !otpSent ? (
              /* Step 1: Enter Phone */
              <form onSubmit={handleSendOtp} className="space-y-4">
                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
                    Full Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    placeholder="e.g. Ananya Sharma"
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-700/40 focus:bg-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
                    10-Digit Mobile Number
                  </label>
                  <div className="flex rounded-xl border border-stone-300 overflow-hidden focus-within:ring-2 focus-within:ring-amber-700/40 focus-within:border-amber-700">
                    <span className="bg-stone-100 px-3.5 py-3 text-sm font-semibold text-stone-700 border-r border-stone-300 flex items-center">
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      value={phoneNumber}
                      onChange={e => setPhoneNumber(e.target.value)}
                      placeholder="98765 43210"
                      className="w-full px-3.5 py-3 bg-stone-50 text-sm font-mono tracking-wider focus:outline-none focus:bg-white"
                    />
                  </div>
                  <p className="text-[11px] text-stone-500 pt-0.5">
                    ✨ <strong>Auto-Create Profile:</strong> If your number is new, your Consumer profile is created instantly with zero paperwork.
                  </p>
                </div>

                {phoneError && (
                  <p className="text-xs text-rose-600 flex items-center gap-1 font-medium">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{phoneError}</span>
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full py-3.5 bg-amber-700 hover:bg-amber-800 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-md"
                >
                  <span>Send Verification Code (OTP)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            ) : (
              /* Step 2: Enter OTP */
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
                      Enter 4-Digit OTP
                    </label>
                    <button
                      type="button"
                      onClick={() => setOtpSent(false)}
                      className="text-xs text-amber-800 font-semibold hover:underline"
                    >
                      Change Number ({phoneNumber})
                    </button>
                  </div>

                  <input
                    type="text"
                    required
                    maxLength={6}
                    autoFocus
                    value={otpInput}
                    onChange={e => setOtpInput(e.target.value)}
                    placeholder="Enter 4821 or 1234"
                    className="w-full px-4 py-3 bg-stone-50 border-2 border-amber-300 rounded-xl text-center text-lg font-mono font-bold tracking-widest focus:outline-none focus:ring-2 focus:ring-amber-700/40 focus:bg-white"
                  />

                  <div className="flex items-center justify-between text-xs text-stone-500 pt-1">
                    <span>Code sent to +91 {phoneNumber}</span>
                    {countdown > 0 ? (
                      <span>Resend in <strong>{countdown}s</strong></span>
                    ) : (
                      <button
                        type="button"
                        onClick={handleSendOtp}
                        className="text-amber-800 font-bold hover:underline"
                      >
                        Resend OTP
                      </button>
                    )}
                  </div>
                </div>

                {phoneError && (
                  <p className="text-xs text-rose-600 flex items-center gap-1 font-medium">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{phoneError}</span>
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full py-3.5 bg-stone-900 hover:bg-stone-800 text-amber-300 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-md"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Verify OTP &amp; Sign In</span>
                </button>
              </form>
            )}

          </div>
        )}

        {/* TAB 2: EMAIL LOGIN (CONSUMER) */}
        {activeTab === 'email' && (
          <div className="p-6 sm:p-8 space-y-6">
            {emailSuccess ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-700 border-2 border-emerald-300">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-xl font-bold text-stone-900">Signed In with Email!</h3>
                <p className="text-xs text-stone-600">Redirecting to platform...</p>
              </div>
            ) : (
              <form onSubmit={handleEmailLogin} className="space-y-4">
                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={e => setEmailInput(e.target.value)}
                    placeholder="buyer@crafttrue.in"
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-700/40 focus:bg-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    value={passwordInput}
                    onChange={e => setPasswordInput(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-700/40 focus:bg-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-md"
                >
                  <Mail className="w-4 h-4" />
                  <span>Sign In with Email</span>
                </button>
              </form>
            )}
          </div>
        )}

        {/* TAB 3: MASTER ARTISAN PORTAL LOGIN */}
        {activeTab === 'artisan' && (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="text-center space-y-1">
              <span className="text-[10px] uppercase font-bold text-amber-800 tracking-wider">
                Exclusively for Registered Chhipa Printers
              </span>
              <h3 className="font-serif text-xl font-bold text-stone-900">
                Master Artisan Studio Access
              </h3>
              <p className="text-xs text-stone-600">
                Select a National Award-winning master profile to demonstrate artisan lot registration:
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <button
                type="button"
                onClick={() => handleArtisanLogin('lalchand')}
                className="w-full p-4 rounded-2xl border-2 border-amber-300 bg-amber-50 hover:bg-amber-100 transition flex items-center justify-between text-left group"
              >
                <div className="flex items-center gap-3">
                  <img
                    src="/images/textiles/bagru-village-printing.jpg"
                    alt="Master Lalchand"
                    className="w-12 h-12 rounded-xl object-cover border border-amber-300"
                  />
                  <div>
                    <strong className="block text-sm text-stone-900 font-serif">Lalchand 'Chippa' Derawala</strong>
                    <span className="text-[11px] text-amber-900 font-semibold">Bagru Cluster • GI No. 183</span>
                    <span className="block text-[10px] text-stone-500 font-mono">Pehchan: NRJPC241207</span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-amber-800 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                type="button"
                onClick={() => handleArtisanLogin('brijballabh')}
                className="w-full p-4 rounded-2xl border-2 border-sky-300 bg-sky-50 hover:bg-sky-100 transition flex items-center justify-between text-left group"
              >
                <div className="flex items-center gap-3">
                  <img
                    src="/images/textiles/hand-printing-process.jpg"
                    alt="Master Brij Ballabh"
                    className="w-12 h-12 rounded-xl object-cover border border-sky-300"
                  />
                  <div>
                    <strong className="block text-sm text-stone-900 font-serif">Brij Ballabh Udaiwal</strong>
                    <span className="text-[11px] text-sky-900 font-semibold">Sanganeri Cluster • GI No. 147</span>
                    <span className="block text-[10px] text-stone-500 font-mono">Pehchan: NRJPC241208</span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-sky-800 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Guest Notice */}
      <div className="text-center space-y-2 text-xs text-stone-500">
        <p>
          Visiting to verify a physical QR tag?{' '}
          <Link href="/scan" className="font-bold text-amber-900 hover:underline">
            No login required — Click to Scan &amp; Verify Instantly →
          </Link>
        </p>
      </div>

    </div>
  );
}
