'use client';

import React from 'react';
import Link from 'next/link';
import { Product } from '@/lib/types';
import { ShieldCheck, Clock, MapPin, Sparkles, QrCode, ArrowRight } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const imageUrl = product.images?.[0] || (product as any).image_url || '/images/textiles/bagru-fadat.jpg';
  const artisanName = product.artisan?.name || (product as any).artisan_name;

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-amber-200/80 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
      {/* Product Image */}
      <div className="relative aspect-4/3 overflow-hidden bg-amber-50">
        <img
          src={imageUrl}
          alt={product.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />

        {/* GI Tag Badge */}
        <div className="absolute top-2.5 left-2.5 bg-amber-950/85 backdrop-blur-xs text-amber-200 text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-sm border border-amber-700/50">
          <ShieldCheck className="w-3 h-3 text-amber-400" />
          <span>GI Protected</span>
        </div>

        {/* Making Time Badge */}
        {product.making_time_days && (
          <div className="absolute bottom-2.5 left-2.5 bg-black/60 backdrop-blur-xs text-amber-200 text-[10px] font-medium px-2 py-0.5 rounded flex items-center gap-1">
            <Clock className="w-3 h-3 text-amber-300" />
            <span>{product.making_time_days} days handcraft</span>
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="p-4 flex flex-col flex-1 justify-between space-y-3">
        <div>
          {/* Origin & Craft */}
          <div className="flex items-center justify-between text-[11px] text-stone-500 mb-1">
            <span className="flex items-center gap-1 font-semibold text-amber-800">
              <MapPin className="w-3 h-3" />
              {product.heritage_origin}
            </span>
            {artisanName && (
              <span className="text-stone-600 truncate max-w-[130px] font-medium" title={artisanName}>
                by {artisanName}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="font-serif text-sm font-bold text-stone-900 group-hover:text-amber-800 transition line-clamp-2 leading-snug">
            {product.title}
          </h3>

          {/* Material */}
          <p className="text-xs text-stone-500 line-clamp-1 mt-1">
            {product.material}
          </p>
        </div>

        {/* Price & Actions */}
        <div className="pt-2 border-t border-amber-100 flex flex-col gap-2">
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-bold text-stone-900">
                ₹{product.price_inr.toLocaleString('en-IN')}
              </span>
              {product.compare_price_inr && (
                <span className="text-xs text-stone-400 line-through">
                  ₹{product.compare_price_inr.toLocaleString('en-IN')}
                </span>
              )}
            </div>
            <span className="text-[10px] text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded">
              Verified Artisan Batch
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <Link
              href={`/verify/${product.id}`}
              className="py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1 transition"
            >
              <QrCode className="w-3.5 h-3.5 text-amber-700" />
              <span>Verify QR</span>
            </Link>

            <Link
              href="/cart"
              className="py-1.5 bg-amber-800 hover:bg-amber-900 text-white rounded-lg text-[11px] font-bold flex items-center justify-center gap-1 transition shadow-xs"
            >
              <span>Add to Cart</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
