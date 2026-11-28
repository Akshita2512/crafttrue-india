'use client';

import React, { useState } from 'react';
import { mockProducts, mockCategories } from '@/lib/data/mockData';
import { ProductCard } from '@/components/ProductCard';
import { Search, Filter, SlidersHorizontal, ShieldCheck, Award, Sparkles, BookOpenCheck } from 'lucide-react';
import Link from 'next/link';

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [clusterFilter, setClusterFilter] = useState<'all' | 'bagru' | 'sanganer'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('featured');

  const filtered = mockProducts
    .filter((product) => {
      const matchesCategory = selectedCategory === 'all' || product.category_id === selectedCategory;
      const matchesCluster = 
        clusterFilter === 'all' || 
        (clusterFilter === 'bagru' && product.heritage_origin.toLowerCase().includes('bagru')) ||
        (clusterFilter === 'sanganer' && product.heritage_origin.toLowerCase().includes('sanganer'));
      const matchesSearch =
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.heritage_origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.material.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.artisan_name?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesCluster && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price_inr - b.price_inr;
      if (sortBy === 'price-high') return b.price_inr - a.price_inr;
      return 0;
    });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-100/70 via-orange-50/50 to-white p-8 rounded-3xl border border-amber-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-800 text-amber-100 text-xs font-semibold">
            <Award className="w-3.5 h-3.5 text-amber-300" />
            <span>Master Artisan Direct Collection</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
            Verified Hand-Block Textiles of Rajasthan
          </h1>
          <p className="text-sm text-stone-600 leading-relaxed">
            Every textile listed below is handcrafted by registered generational Chhipa workshops in <strong>Bagru (GI No. 183)</strong> and <strong>Sanganer (GI No. 147)</strong>. Each piece includes a cryptographic QR swing tag linking to its 7-Layer Evidence Scorecard.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0">
          <Link
            href="/authenticity-guide"
            className="px-4 py-2.5 bg-white hover:bg-amber-50 text-amber-900 border border-amber-300 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition"
          >
            <BookOpenCheck className="w-4 h-4 text-amber-800" />
            <span>In-Hand Field Guide</span>
          </Link>
          <Link
            href="/scan"
            className="px-4 py-2.5 bg-amber-800 hover:bg-amber-900 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition"
          >
            <ShieldCheck className="w-4 h-4 text-amber-300" />
            <span>Verify QR Tag</span>
          </Link>
        </div>
      </div>

      {/* Cluster GI Selector */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold text-stone-500 uppercase tracking-wide mr-1">Cluster GI:</span>
        <button
          onClick={() => setClusterFilter('all')}
          className={`px-3 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
            clusterFilter === 'all'
              ? 'bg-stone-900 text-amber-300 shadow-xs'
              : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-50'
          }`}
        >
          <span>All Clusters</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-stone-700/60 text-stone-200">
            {mockProducts.length}
          </span>
        </button>
        <button
          onClick={() => setClusterFilter('bagru')}
          className={`px-3 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
            clusterFilter === 'bagru'
              ? 'bg-amber-900 text-amber-100 shadow-xs'
              : 'bg-white border border-stone-200 text-stone-700 hover:bg-amber-50'
          }`}
        >
          <span>Bagru (GI-183)</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-amber-800 text-amber-200">
            {mockProducts.filter(p => p.heritage_origin.toLowerCase().includes('bagru')).length}
          </span>
        </button>
        <button
          onClick={() => setClusterFilter('sanganer')}
          className={`px-3 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
            clusterFilter === 'sanganer'
              ? 'bg-sky-900 text-sky-100 shadow-xs'
              : 'bg-white border border-stone-200 text-stone-700 hover:bg-sky-50'
          }`}
        >
          <span>Sanganer (GI-147)</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-sky-800 text-sky-200">
            {mockProducts.filter(p => p.heritage_origin.toLowerCase().includes('sanganer')).length}
          </span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-amber-200/80 shadow-xs flex flex-col lg:flex-row items-center justify-between gap-4">
        
        {/* Search */}
        <div className="relative w-full lg:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search Fadat, Dabu, Mud-Resist, Sanganeri..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-700/30"
          />
        </div>

        {/* Category Selector */}
        <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              selectedCategory === 'all'
                ? 'bg-amber-800 text-white shadow-xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            All Textiles
          </button>
          {mockCategories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                selectedCategory === c.id
                  ? 'bg-amber-800 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2 text-xs text-stone-600 w-full lg:w-auto justify-end">
          <SlidersHorizontal className="w-4 h-4 text-stone-500" />
          <span>Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-stone-50 border border-stone-200 rounded-lg px-2.5 py-1.5 text-xs text-stone-700 focus:outline-none"
          >
            <option value="featured">Featured First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-stone-500 px-1">
        <span>Showing <strong className="text-stone-800">{filtered.length}</strong> certified hand-block pieces</span>
        <span className="text-emerald-700 font-semibold flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5" />
          100% Direct Fair Wages Paid to Chhipa Printers
        </span>
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-12 text-center border border-amber-200">
          <p className="text-stone-500 text-sm">No textiles found matching your search.</p>
          <button
            onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
            className="mt-3 text-xs text-amber-800 font-bold hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
