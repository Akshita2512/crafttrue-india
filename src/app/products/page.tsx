'use client';

import React, { useState } from 'react';
import { mockProducts, mockCategories } from '@/lib/data/mockData';
import { ProductCard } from '@/components/ProductCard';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('featured');

  const filtered = mockProducts
    .filter((product) => {
      const matchesCategory = selectedCategory === 'all' || product.category_id === selectedCategory;
      const matchesSearch =
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.heritage_origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.material.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price_inr - b.price_inr;
      if (sortBy === 'price-high') return b.price_inr - a.price_inr;
      return 0;
    });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-heritage-indigo mb-2">
          Authentic Indian Handicrafts Catalog
        </h1>
        <p className="text-sm text-gray-600 max-w-2xl">
          Browse certified handmade artifacts, textiles, brassware, and art. Sourced straight from master artisans with Geographical Indication (GI) verification.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-amber-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search Pashmina, Blue Pottery, Madhubani..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-amber-50/50 border border-amber-200/60 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-heritage-terracotta"
          />
        </div>

        {/* Category Selector */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              selectedCategory === 'all'
                ? 'bg-heritage-terracotta text-white'
                : 'bg-amber-50/70 text-gray-700 hover:bg-amber-100/70'
            }`}
          >
            All Crafts
          </button>
          {mockCategories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                selectedCategory === c.id
                  ? 'bg-heritage-terracotta text-white'
                  : 'bg-amber-50/70 text-gray-700 hover:bg-amber-100/70'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2 text-xs text-gray-600 w-full md:w-auto justify-end">
          <SlidersHorizontal className="w-4 h-4 text-gray-500" />
          <span>Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-amber-50/50 border border-amber-200/60 rounded-md px-2 py-1.5 text-xs text-gray-700 focus:outline-none"
          >
            <option value="featured">Featured First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>Showing <strong className="text-gray-800">{filtered.length}</strong> certified creations</span>
        <span className="text-emerald-700 font-medium">All items insured &amp; packaged in eco-friendly cotton</span>
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl p-12 text-center border border-amber-100">
          <p className="text-gray-500 text-sm">No crafts found matching your search.</p>
          <button
            onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
            className="mt-3 text-xs text-heritage-terracotta font-semibold hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
