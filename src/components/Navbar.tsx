'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { QrCode, ShieldCheck, UserCheck, BarChart3, Menu, X, Sparkles, AlertTriangle } from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeRole, setActiveRole] = useState<'consumer' | 'artisan' | 'admin'>('consumer');

  const navLinks = [
    { href: '/scan', label: 'Scan & Verify', icon: QrCode, badge: 'Live Scanner' },
    { href: '/artisan/register-product', label: 'Artisan Portal', icon: UserCheck, badge: 'Tag Generator' },
    { href: '/admin', label: 'Verifier Dashboard', icon: ShieldCheck, badge: 'AEF Review' },
    { href: '/research', label: 'Ph.D. Analytics', icon: BarChart3, badge: 'SPSS Export' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#FFFDF9]/95 backdrop-blur-md border-b border-amber-900/10 shadow-xs">
      {/* Top Banner: Academic Research Integrity Notice */}
      <div className="bg-amber-900 text-amber-50 text-[11px] py-1 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-amber-300" />
        <span>
          <strong>Ph.D. Research Prototype:</strong> Digital Verification & Traceability Framework for Bagru & Sanganeri Hand-Block Textiles
        </span>
        <span className="hidden md:inline-block bg-amber-800 text-amber-200 px-2 py-0.5 rounded text-[10px] ml-2">
          DEMO DATA — NOT REAL CERTIFICATION
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-700 via-orange-600 to-amber-900 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <span className="font-serif text-white font-bold text-lg tracking-wider">CT</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif font-black text-lg sm:text-xl text-stone-900 tracking-tight">CRAFTTRUE</span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-amber-800 px-1.5 py-0.5 bg-amber-100 rounded">INDIA</span>
              </div>
              <p className="text-[10px] text-stone-500 font-medium tracking-wide -mt-0.5">
                Know the Craft • Know the Maker
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-amber-100 text-amber-950 font-bold shadow-xs'
                      : 'text-stone-700 hover:text-amber-900 hover:bg-amber-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-700' : 'text-stone-500'}`} />
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="text-[9px] px-1.5 py-0.2 bg-stone-200 text-stone-700 rounded-full font-medium">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Quick Demo Persona Switcher */}
          <div className="hidden sm:flex items-center gap-2 bg-stone-100 p-1 rounded-xl border border-stone-200 text-xs">
            <span className="text-[10px] text-stone-500 font-semibold px-2">Role:</span>
            <button
              onClick={() => setActiveRole('consumer')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition ${
                activeRole === 'consumer'
                  ? 'bg-white text-stone-900 shadow-xs font-bold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Consumer
            </button>
            <button
              onClick={() => setActiveRole('artisan')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition ${
                activeRole === 'artisan'
                  ? 'bg-amber-800 text-white shadow-xs font-bold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Artisan
            </button>
            <button
              onClick={() => setActiveRole('admin')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition ${
                activeRole === 'admin'
                  ? 'bg-stone-900 text-white shadow-xs font-bold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Verifier
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-stone-700 hover:bg-stone-100"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-amber-900/10 bg-[#FFFDF9] px-4 pt-2 pb-4 space-y-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium ${
                  isActive ? 'bg-amber-100 text-amber-950 font-bold' : 'text-stone-700 hover:bg-amber-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4 text-amber-700" />
                  <span>{link.label}</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 bg-stone-100 text-stone-600 rounded">
                  {link.badge}
                </span>
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
