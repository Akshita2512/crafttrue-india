import React from 'react';
import Link from 'next/link';
import { Artisan } from '@/lib/types';
import { Award, MapPin, CheckCircle2 } from 'lucide-react';

interface ArtisanCardProps {
  artisan: Artisan;
}

export const ArtisanCard: React.FC<ArtisanCardProps> = ({ artisan }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden border border-amber-100 shadow-xs hover:shadow-md transition duration-300 flex flex-col">
      <div className="relative h-44 bg-slate-100 overflow-hidden">
        {artisan.cover_image_url && (
          <img
            src={artisan.cover_image_url}
            alt={artisan.craft_type}
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        
        {/* State/Region tag */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-heritage-indigo text-[11px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
          <MapPin className="w-3 h-3 text-heritage-terracotta" />
          <span>{artisan.region}</span>
        </div>

        {/* Avatar badge */}
        <div className="absolute -bottom-1 left-4 flex items-end gap-3">
          <div className="relative">
            <img
              src={artisan.avatar_url}
              alt={artisan.name}
              className="w-16 h-16 rounded-full border-2 border-white object-cover shadow-md"
            />
            {artisan.is_verified && (
              <div className="absolute bottom-0 right-0 bg-emerald-600 rounded-full p-0.5 text-white" title="Verified Artisan">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-5 pt-3 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex items-center justify-between mt-1 mb-1">
            <h3 className="font-serif font-bold text-gray-900 text-base">{artisan.name}</h3>
            <span className="text-[11px] text-gray-500 font-medium">{artisan.experience_years}+ yrs mastery</span>
          </div>

          <p className="text-xs font-semibold text-heritage-terracotta mb-2">
            {artisan.craft_type}
          </p>

          {artisan.award_title && (
            <div className="mb-3 inline-flex items-center gap-1.5 bg-amber-50 border border-amber-200/60 text-heritage-indigo text-[11px] px-2.5 py-1 rounded">
              <Award className="w-3.5 h-3.5 text-heritage-gold" />
              <span className="font-medium">{artisan.award_title}</span>
            </div>
          )}

          <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed mb-4">
            {artisan.bio}
          </p>
        </div>

        <div className="pt-3 border-t border-amber-50 flex items-center justify-between text-xs">
          <span className="text-gray-500">Traditional Handcraft</span>
          <Link
            href="/products"
            className="text-heritage-terracotta font-semibold hover:underline flex items-center gap-1"
          >
            <span>Explore Creations &rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
