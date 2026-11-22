import React from 'react';
import Link from 'next/link';
import { ShieldCheck, MapPin, Award, BookOpen, AlertCircle } from 'lucide-react';

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
              <h4 className="text-sm font-semibold text-white">Bagru & Sanganer Clusters</h4>
              <p className="text-xs text-stone-400">GI-associated Rajasthani hand-block printing</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Weaving vs. Printing</h4>
              <p className="text-xs text-stone-400">Separating fabric type from printing process</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Price Transparency</h4>
              <p className="text-xs text-stone-400">Artisan labour & cost disclosures</p>
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
                <strong>Academic Research Integrity:</strong> All product records in this demonstration are marked <em>DEMO DATA — NOT REAL CERTIFICATION</em>. Independent human verification and official registry audits are required for live certification.
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-amber-400">Verification Ecosystem</h5>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/scan" className="hover:text-amber-300 transition">Interactive QR Scanner</Link>
              </li>
              <li>
                <Link href="/verify/CTI-BAG-000184" className="hover:text-amber-300 transition">Sample Verified Product Record</Link>
              </li>
              <li>
                <Link href="/artisan/register-product" className="hover:text-amber-300 transition">Artisan Product Registration &amp; Tag Generator</Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-amber-300 transition">Verifier Audit Dashboard</Link>
              </li>
              <li>
                <Link href="/research" className="hover:text-amber-300 transition">Ph.D. Research Analytics &amp; SPSS Export</Link>
              </li>
            </ul>
          </div>

          {/* Cluster Reference */}
          <div className="md:col-span-4 space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-amber-400">Protected Clusters (GI)</h5>
            <div className="text-xs text-stone-400 space-y-2">
              <div>
                <p className="font-semibold text-stone-200">Bagru Hand Block Print (GI No. 177)</p>
                <p className="text-[11px]">Dabu mud-resist, natural indigo vats, Harda base, syahi (iron ferment) outlines.</p>
              </div>
              <div className="pt-2 border-t border-stone-800">
                <p className="font-semibold text-stone-200">Sanganer Hand Block Print (GI No. 211)</p>
                <p className="text-[11px]">Fine floral bootas, crisp mulmul fabrics, delicate Rekh and Datta block pairings.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-stone-800 text-center text-xs text-stone-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 CRAFTTRUE INDIA • Doctoral Research Demonstration Framework.</p>
          <p className="text-[11px] text-stone-400">
            Conforming with Indian GI Act, 1999 &amp; Digital Personal Data Protection (DPDP) Act, 2023.
          </p>
        </div>
      </div>
    </footer>
  );
};
