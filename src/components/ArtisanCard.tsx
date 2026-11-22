import React from 'react';
import Link from 'next/link';
import { Artisan } from '@/lib/types';
import { Award, MapPin, CheckCircle2, QrCode, ArrowRight } from 'lucide-react';

interface ArtisanCardProps {
  artisan: Artisan;
}

export const ArtisanCard: React.FC<ArtisanCardProps> = ({ artisan }) => {
  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-amber-200/80 shadow-xs hover:shadow-lg transition duration-300 flex flex-col justify-between">
      <div>
        <div className="relative h-48 bg-stone-100 overflow-hidden">
          {artisan.cover_image_url && (
            <img
              src={artisan.cover_image_url}
              alt={artisan.craft_type}
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          
          {/* Cluster Tag */}
          <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-amber-950 text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm border border-amber-200">
            <MapPin className="w-3.5 h-3.5 text-amber-800" />
            <span>{artisan.region}</span>
          </div>

          {/* Avatar badge */}
          <div className="absolute -bottom-1 left-5 flex items-end gap-3">
            <div className="relative">
              <img
                src={artisan.avatar_url}
                alt={artisan.name}
                className="w-18 h-18 rounded-full border-3 border-white object-cover shadow-md"
              />
              {artisan.is_verified && (
                <div className="absolute bottom-0 right-0 bg-emerald-600 rounded-full p-1 text-white shadow-xs" title="Government & GI Verified Master Artisan">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="p-6 pt-4 space-y-3">
          <div>
            <div className="flex items-center justify-between mt-2">
              <h3 className="font-serif font-bold text-stone-900 text-lg">{artisan.name}</h3>
              <span className="text-[11px] text-amber-900 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                {artisan.experience_years}+ Yrs Mastery
              </span>
            </div>

            <p className="text-xs font-semibold text-amber-800 mt-0.5">
              {artisan.craft_type}
            </p>
          </div>

          {artisan.award_title && (
            <div className="inline-flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-950 text-[11px] px-3 py-1.5 rounded-xl font-bold w-full">
              <Award className="w-4 h-4 text-amber-600 shrink-0" />
              <span className="truncate">{artisan.award_title}</span>
            </div>
          )}

          <p className="text-xs text-stone-600 leading-relaxed">
            {artisan.bio}
          </p>

          {artisan.story && (
            <div className="bg-stone-50 rounded-xl p-3 border border-stone-200/80 text-[11px] text-stone-700 italic">
              &quot;{artisan.story}&quot;
            </div>
          )}
        </div>
      </div>

      <div className="p-6 pt-0">
        <div className="pt-3 border-t border-amber-100 flex items-center justify-between text-xs">
          <span className="text-emerald-700 font-bold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            GI Authorized User
          </span>
          <Link
            href="/products"
            className="text-amber-900 font-bold hover:underline flex items-center gap-1"
          >
            <span>View Catalog</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
