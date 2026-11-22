'use client';

import React from 'react';
import Link from 'next/link';
import { Product } from '@/lib/types';
import { ShieldCheck, Clock, MapPin, Sparkles } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="group bg-white rounded-xl overflow-hidden border border-amber-100/80 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
      {/* Product Image */}
      <div className="relative aspect-4/3 overflow-hidden bg-amber-50">
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />

        {/* GI Tag Badge */}
        {product.gi_tag_certified && (
          <div className="absolute top-2.5 left-2.5 bg-emerald-800/90 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
            <ShieldCheck className="w-3 h-3 text-emerald-300" />
            <span>GI Certified</span>
          </div>
        )}

        {/* Making Time Badge */}
        {product.making_time_days && (
          <div className="absolute bottom-2.5 left-2.5 bg-black/60 backdrop-blur-xs text-amber-200 text-[10px] font-medium px-2 py-0.5 rounded flex items-center gap-1">
            <Clock className="w-3 h-3 text-amber-300" />
            <span>{product.making_time_days} days to handcraft</span>
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          {/* Origin & Craft */}
          <div className="flex items-center justify-between text-[11px] text-gray-500 mb-1.5">
            <span className="flex items-center gap-1 font-medium text-heritage-terracotta">
              <MapPin className="w-3 h-3" />
              {product.heritage_origin}
            </span>
            {product.artisan && (
              <span className="text-gray-600 truncate max-w-[130px]" title={product.artisan.name}>
                by {product.artisan.name}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="font-serif text-sm font-bold text-gray-900 group-hover:text-heritage-terracotta transition line-clamp-2 mb-1.5 leading-snug">
            {product.title}
          </h3>

          {/* Material description */}
          <p className="text-xs text-gray-500 line-clamp-1 mb-3">
            {product.material}
          </p>
        </div>

        {/* Pricing & Cart Action */}
        <div className="pt-2 border-t border-amber-50 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-bold text-heritage-indigo">
                ₹{product.price_inr.toLocaleString('en-IN')}
              </span>
              {product.compare_price_inr && (
                <span className="text-xs text-gray-400 line-through">
                  ₹{product.compare_price_inr.toLocaleString('en-IN')}
                </span>
              )}
            </div>
            <p className="text-[10px] text-emerald-700 font-medium">Free insured shipping</p>
          </div>

          <Link
            href="/cart"
            className="bg-heritage-terracotta hover:bg-[#b04a25] text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition shadow-xs flex items-center gap-1"
          >
            <span>Add</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
