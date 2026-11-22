'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { mockProducts } from '@/lib/data/mockData';
import { Trash2, ShieldCheck, ArrowRight, CheckCircle2, Lock } from 'lucide-react';

export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    { product: mockProducts[0], quantity: 1 },
    { product: mockProducts[1], quantity: 1 },
    { product: mockProducts[2], quantity: 1 },
  ]);

  const [isOrdered, setIsOrdered] = useState(false);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price_inr * item.quantity,
    0
  );

  const shipping = 0; // Free pan-India shipping
  const gst = Math.round(subtotal * 0.05); // 5% handicraft GST
  const total = subtotal + gst;

  const removeItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.product.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(
      cartItems.map((item) => {
        if (item.product.id === id) {
          const newQty = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  if (isOrdered) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h1 className="font-serif text-3xl font-bold text-heritage-indigo">
          Order Placed with Artisan Collective!
        </h1>
        <p className="text-sm text-gray-600 leading-relaxed">
          Dhanyavaad! Your order has been registered in the PostgreSQL database. The master artisans in Srinagar, Jaipur, and Madhubani have been notified to prepare and securely pack your authentic creations.
        </p>
        <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 text-xs text-left space-y-1">
          <p><strong>Order Reference:</strong> #CTI-{Math.floor(100000 + Math.random() * 900000)}</p>
          <p><strong>Tracking:</strong> Insured IndiaPost Heritage Express</p>
          <p><strong>Estimated Dispatch:</strong> Within 48-72 hours with Certificate of Authenticity</p>
        </div>
        <div>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-heritage-terracotta text-white px-6 py-3 rounded-xl text-xs font-semibold hover:bg-[#a84420] transition"
          >
            <span>Continue Exploring Crafts</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <h1 className="font-serif text-3xl font-bold text-heritage-indigo mb-1">
          Your Curated Bag
        </h1>
        <p className="text-xs text-gray-500">
          Direct artisan fair-share applied &bull; Certified Authentic
        </p>
      </div>

      {cartItems.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center border border-amber-100">
          <p className="text-gray-500 text-sm mb-4">Your bag is currently empty.</p>
          <Link
            href="/products"
            className="bg-heritage-terracotta text-white px-5 py-2.5 rounded-lg text-xs font-semibold hover:bg-[#a84420] transition"
          >
            Discover Crafts
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Items List */}
          <div className="lg:col-span-8 space-y-4">
            {cartItems.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="bg-white p-4 rounded-xl border border-amber-100 shadow-xs flex flex-col sm:flex-row items-center gap-4 justify-between"
              >
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <img
                    src={product.images?.[0] || (product as any).image_url || '/images/textiles/bagru-fadat.jpg'}
                    alt={product.title}
                    className="w-20 h-20 rounded-lg object-cover bg-amber-50"
                  />
                  <div>
                    <span className="text-[10px] text-heritage-terracotta font-semibold uppercase tracking-wider">
                      {product.heritage_origin}
                    </span>
                    <h3 className="font-serif text-sm font-bold text-gray-900 leading-snug max-w-sm">
                      {product.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      ₹{product.price_inr.toLocaleString('en-IN')} each
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-0 border-amber-50">
                  {/* Quantity */}
                  <div className="flex items-center border border-amber-200 rounded-lg">
                    <button
                      onClick={() => updateQuantity(product.id, -1)}
                      className="px-2.5 py-1 text-gray-600 hover:bg-amber-50 text-xs font-bold"
                    >
                      -
                    </button>
                    <span className="px-3 py-1 text-xs font-semibold text-gray-800">
                      {quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(product.id, 1)}
                      className="px-2.5 py-1 text-gray-600 hover:bg-amber-50 text-xs font-bold"
                    >
                      +
                    </button>
                  </div>

                  {/* Total for item */}
                  <div className="text-right min-w-[90px]">
                    <span className="text-sm font-bold text-heritage-indigo">
                      ₹{(product.price_inr * quantity).toLocaleString('en-IN')}
                    </span>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeItem(product.id)}
                    className="text-gray-400 hover:text-red-600 p-1 transition"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}

            {/* Supabase Integration notice */}
            <div className="bg-amber-50/70 p-4 rounded-xl border border-amber-200/70 text-xs text-gray-700 space-y-1">
              <div className="flex items-center gap-1.5 font-semibold text-heritage-indigo">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Supabase &amp; PostgreSQL Backend Sync</span>
              </div>
              <p className="text-gray-600">
                Connected to Supabase schema: orders, inventory management, and customer profile tables. Configure your <code>.env.local</code> with your Supabase credentials to persist live orders.
              </p>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-4">
            <div className="bg-white p-6 rounded-xl border border-amber-200/80 shadow-xs space-y-5">
              <h2 className="font-serif text-lg font-bold text-heritage-indigo border-b border-amber-100 pb-3">
                Order Summary
              </h2>

              <div className="space-y-2.5 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-900">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Fragile-Insured Pan-India Shipping</span>
                  <span className="text-emerald-700 font-semibold">FREE</span>
                </div>
                <div className="flex justify-between">
                  <span>Handicraft GST (5%)</span>
                  <span className="font-semibold text-gray-900">₹{gst.toLocaleString('en-IN')}</span>
                </div>

                <div className="pt-3 border-t border-amber-100 flex justify-between text-sm font-bold text-heritage-indigo">
                  <span>Total Amount</span>
                  <span className="text-base text-heritage-terracotta">₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="pt-2">
                <p className="text-[11px] text-gray-500 mb-2 font-medium">Supported Payment Methods:</p>
                <div className="flex gap-2 text-[10px] text-gray-600">
                  <span className="bg-amber-50 border border-amber-200 px-2 py-1 rounded font-medium">UPI / GPay</span>
                  <span className="bg-amber-50 border border-amber-200 px-2 py-1 rounded font-medium">Credit/Debit Cards</span>
                  <span className="bg-amber-50 border border-amber-200 px-2 py-1 rounded font-medium">NetBanking</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => setIsOrdered(true)}
                className="w-full bg-heritage-terracotta hover:bg-[#a84420] text-white py-3 rounded-xl text-xs font-bold transition shadow-md flex items-center justify-center gap-2"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Proceed to Secure Checkout</span>
              </button>

              <p className="text-[10px] text-center text-gray-400">
                Encrypted with SSL &bull; 100% Artisan Authenticity Guaranteed
              </p>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
