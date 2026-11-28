'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, QrCode, ArrowRight, Lock, Award, BookOpenCheck, ShoppingBag, MapPin } from 'lucide-react';

export default function CartPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-8">
      {/* Icon Badge */}
      <div className="w-20 h-20 bg-amber-100 text-amber-900 rounded-3xl flex items-center justify-center mx-auto shadow-sm border border-amber-300">
        <Lock className="w-10 h-10 text-amber-800" />
      </div>

      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold border border-amber-300">
          <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
          <span>GI Registry &amp; Anti-Counterfeit Policy</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
          Direct Commercial Purchasing is Disabled
        </h1>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
          CraftTrue India is operating as a <strong>Digital Craft Authenticity &amp; Traceability Registry</strong> for <strong>Bagru (GI No. 183)</strong> and <strong>Sanganeri (GI No. 147)</strong> hand-block textiles.
        </p>
      </div>

      {/* Information Box */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-amber-200 text-left space-y-4 shadow-xs text-xs sm:text-sm text-stone-700">
        <h2 className="font-serif text-base font-bold text-stone-900 flex items-center gap-2">
          <Award className="w-4 h-4 text-amber-800" />
          <span>Why is Cart / Checkout Disabled?</span>
        </h2>
        <ul className="space-y-2.5 text-stone-600 list-disc list-inside">
          <li>
            <strong>Fair Trade &amp; Zero Middlemen:</strong> All transactions are conducted directly through verified Chhipa master artisan workshops to prevent commission deductions.
          </li>
          <li>
            <strong>Physical QR Verification:</strong> Buyers are encouraged to scan the physical tamper-evident QR swing tag attached to registered textile lots.
          </li>
          <li>
            <strong>Counterfeit Protection:</strong> Online checkout will remain closed until every registered cluster workshop completes the biometric Pehchan card audit.
          </li>
        </ul>

        <div className="pt-3 border-t border-amber-100 flex items-center gap-2 text-stone-500 text-xs">
          <MapPin className="w-3.5 h-3.5 text-amber-800 shrink-0" />
          <span>Direct studio inquiries available for Bagru &amp; Sanganer master clusters.</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <Link
          href="/scan"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-amber-800 hover:bg-amber-900 text-white px-6 py-3 rounded-xl text-xs font-bold shadow-md transition"
        >
          <QrCode className="w-4 h-4 text-amber-200" />
          <span>Scan Product QR Tag</span>
          <ArrowRight className="w-4 h-4" />
        </Link>

        <Link
          href="/products"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-stone-50 border border-stone-300 text-stone-800 px-6 py-3 rounded-xl text-xs font-semibold shadow-xs transition"
        >
          <ShoppingBag className="w-4 h-4 text-stone-600" />
          <span>Browse Verified Catalog</span>
        </Link>

        <Link
          href="/authenticity-guide"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-amber-100 hover:bg-amber-200 border border-amber-300 text-amber-950 px-6 py-3 rounded-xl text-xs font-semibold transition"
        >
          <BookOpenCheck className="w-4 h-4 text-amber-800" />
          <span>Field Authenticity Guide</span>
        </Link>
      </div>
    </div>
  );
}
