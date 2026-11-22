import React from 'react';
import { mockArtisans } from '@/lib/data/mockData';
import { ArtisanCard } from '@/components/ArtisanCard';
import { Award, ShieldCheck, HeartHandshake, Sparkles, MapPin, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function ArtisansPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-100/70 via-amber-50 to-white p-8 sm:p-12 rounded-3xl border border-amber-200/90 shadow-xs space-y-6">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-800 text-white text-xs font-semibold">
            <Award className="w-3.5 h-3.5 text-amber-300" />
            <span>Master Craftsmen of Rajasthan</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 tracking-tight">
            The Living Custodians of Bagru &amp; Sanganer
          </h1>
          <p className="text-sm sm:text-base text-stone-700 leading-relaxed">
            Every master artisan profiled on CRAFTTRUE INDIA belongs to the traditional <strong>Chhipa</strong> dyers and block-printers community. With national and state honors, documented GI Authorised User records, and decades of handcraft lineage, these masters preserve India’s ancestral natural dyeing and woodblock heritage.
          </p>
        </div>

        <div className="pt-6 border-t border-amber-200/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-semibold text-stone-800">
          <div className="flex items-center gap-2 bg-white/80 p-3 rounded-xl border border-amber-100">
            <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>Pehchan Card &amp; GI Verified Lineage</span>
          </div>
          <div className="flex items-center gap-2 bg-white/80 p-3 rounded-xl border border-amber-100">
            <HeartHandshake className="w-4 h-4 text-amber-800 shrink-0" />
            <span>Direct Fair Share Paid to Workshops</span>
          </div>
          <div className="flex items-center gap-2 bg-white/80 p-3 rounded-xl border border-amber-100">
            <Award className="w-4 h-4 text-amber-600 shrink-0" />
            <span>National &amp; State Awardee Studios</span>
          </div>
        </div>
      </div>

      {/* Artisans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {mockArtisans.map((artisan) => (
          <ArtisanCard key={artisan.id} artisan={artisan} />
        ))}
      </div>

      {/* Call to Register Other Artisans */}
      <div className="bg-stone-900 text-white rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2 text-center md:text-left max-w-xl">
          <h3 className="font-serif text-2xl font-bold text-amber-100">Are You a Traditional Chhipa Artisan?</h3>
          <p className="text-stone-300 text-xs sm:text-sm">
            Register your workshop, catalog your printed batches, and generate tamper-resistant QR swing tags that protect your handmade craft from cheap screen print imitations.
          </p>
        </div>
        <Link
          href="/artisan/register-product"
          className="bg-amber-400 hover:bg-amber-300 text-stone-950 px-6 py-3.5 rounded-xl font-bold text-xs shadow-md transition shrink-0"
        >
          Open Artisan Registration Portal →
        </Link>
      </div>

    </div>
  );
}
