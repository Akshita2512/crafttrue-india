import React from 'react';
import Link from 'next/link';
import { ShieldCheck, MapPin, Award, BookOpen, AlertCircle, BookOpenCheck, ShoppingBag } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-900 text-stone-300 mt-20 border-t border-amber-900/40">
      {/* 4 Research Pillars Bar */}
      <div className="border-b border-stone-800 bg-stone-950/60 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">7-Layer Scorecard (AEF)</h4>
              <p className="text-xs text-stone-400">Evidence-based claim verification</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-400">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Bagru &amp; Sanganer Clusters</h4>
              <p className="text-xs text-stone-400">GI-associated Rajasthani hand-block printing</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Weaving vs. Printing</h4>
              <p className="text-xs text-stone-400">Separating fabric base from printing technique</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Price Transparency</h4>
              <p className="text-xs text-stone-400">Artisan wages &amp; cost breakdown</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Brand & Research Context */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-serif font-black text-xl text-white">CRAFTTRUE</span>
              <span className="text-xs uppercase font-bold tracking-widest text-amber-400 bg-amber-950 border border-amber-800 px-2 py-0.5 rounded">
                INDIA
              </span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              A QR-based digital craft authentication, traceability, and consumer protection platform developed to address craftwashing and counterfeit claims in traditional Bagru and Sanganeri hand-block printed textiles.
            </p>
            <div className="p-3 rounded-lg bg-stone-800/80 border border-stone-700 text-[11px] text-stone-300 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>
                <strong>Platform Integrity:</strong> Developed in accordance with the Geographical Indications of Goods (Registration &amp; Protection) Act, 1999, Consumer Protection Act, 2019, and DPDP Act, 2023. Supporting master artisans of Bagru and Sanganer.
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-amber-400">Consumer &amp; Verification</h5>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/products" className="hover:text-amber-300 transition flex items-center gap-1.5">
                  <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
                  <span>Hand-Block Catalog</span>
                </Link>
              </li>
              <li>
                <Link href="/authenticity-guide" className="hover:text-amber-300 transition flex items-center gap-1.5">
                  <BookOpenCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span>Buyer Authenticity Guide</span>
                </Link>
              </li>
              <li>
                <Link href="/scan" className="hover:text-amber-300 transition">Interactive QR Scanner</Link>
              </li>
              <li>
                <Link href="/artisans" className="hover:text-amber-300 transition">Master Artisan Directory</Link>
              </li>
              <li>
                <Link href="/artisan/register-product" className="hover:text-amber-300 transition">Artisan Registration Portal</Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-amber-300 transition">Verifier Audit Dashboard</Link>
              </li>
              <li>
                <Link href="/research" className="hover:text-amber-300 transition">Craft Intelligence &amp; Lab Reports</Link>
              </li>
            </ul>
          </div>

          {/* Cluster Reference */}
          <div className="md:col-span-4 space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-amber-400">Protected Rajasthani Clusters</h5>
            <div className="text-xs text-stone-400 space-y-3">
              <div className="p-3 rounded-xl bg-stone-800/60 border border-stone-700 space-y-1">
                <span className="font-bold text-white block">Bagru Hand Block Print (GI No. 183)</span>
                <p className="text-[11px] text-stone-400">Registered: 11 May 2011 • Dabu mud-resist, natural indigo vats, Harda cream ground. Master: Lalchand Derawala.</p>
              </div>
              <div className="p-3 rounded-xl bg-stone-800/60 border border-stone-700 space-y-1">
                <span className="font-bold text-white block">Sanganeri Hand Block Printing (GI No. 147)</span>
                <p className="text-[11px] text-stone-400">Registered: 19 March 2009 • Fine floral boota &amp; bootie on river-washed white mulmul. Master: Brij Ballabh Udaiwal.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 mt-8 border-t border-stone-800 text-center text-xs text-stone-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 CRAFTTRUE INDIA. All Rights Reserved. Protecting Authentic Indian Handlooms &amp; GI Heritage.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <Link href="/authenticity-guide" className="hover:underline">Authenticity Matrix</Link>
            <Link href="/research" className="hover:underline">Verification Methodology</Link>
            <Link href="/admin" className="hover:underline">Verifier Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
