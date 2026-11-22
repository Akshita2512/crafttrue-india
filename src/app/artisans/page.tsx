import React from 'react';
import { mockArtisans } from '@/lib/data/mockData';
import { ArtisanCard } from '@/components/ArtisanCard';
import { Award, ShieldCheck, HeartHandshake } from 'lucide-react';

export default function ArtisansPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-100/60 via-amber-50 to-white p-8 rounded-2xl border border-amber-200/80">
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-heritage-terracotta text-white text-xs font-semibold">
            <Award className="w-3.5 h-3.5 text-heritage-gold" />
            <span>Master Artisan Directory</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-heritage-indigo">
            The Hands &amp; Hearts Behind India’s Crafts
          </h1>
          <p className="text-sm text-gray-700 leading-relaxed">
            Every master artisan profiled here has been vetted for traditional technique, sustainable materials, and authentic regional lineage. Direct fair-share compensation ensures that these ancestral traditions thrive for future generations.
          </p>
        </div>

        <div className="mt-6 pt-6 border-t border-amber-200/60 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>Background &amp; GI Verified</span>
          </div>
          <div className="flex items-center gap-2">
            <HeartHandshake className="w-4 h-4 text-heritage-terracotta" />
            <span>Direct Fair Trade Payments</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-heritage-gold" />
            <span>Preserving Endangered Arts</span>
          </div>
        </div>
      </div>

      {/* Artisans Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockArtisans.map((artisan) => (
          <ArtisanCard key={artisan.id} artisan={artisan} />
        ))}
      </div>
    </div>
  );
}
