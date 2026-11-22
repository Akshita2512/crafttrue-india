'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  QrCode, 
  ShieldCheck, 
  UserCheck, 
  BarChart3, 
  Menu, 
  X, 
  Sparkles, 
  ShoppingBag, 
  Award, 
  BookOpenCheck,
  Search,
  ExternalLink
} from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeRole, setActiveRole] = useState<'consumer' | 'artisan' | 'verifier'>('consumer');

  const primaryNavLinks = [
    { href: '/products', label: 'Craft Catalog', icon: ShoppingBag, badge: 'GI Textiles' },
    { href: '/scan', label: 'Scan & Verify', icon: QrCode, badge: 'Live Scanner' },
    { href: '/authenticity-guide', label: 'Authenticity Guide', icon: BookOpenCheck, badge: 'Field Tests', highlight: true },
    { href: '/artisans', label: 'Master Artisans', icon: Award, badge: 'Chhipa Masters' },
    { href: '/artisan/register-product', label: 'Artisan Portal', icon: UserCheck, badge: 'Tag Generator' },
    { href: '/admin', label: 'Verifier Desk', icon: ShieldCheck, badge: 'AEF Audit' },
    { href: '/research', label: 'Ph.D. Analytics', icon: BarChart3, badge: 'SPSS Export' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#FFFDF9]/95 backdrop-blur-md border-b border-amber-900/10 shadow-xs">
      {/* Top Banner: Academic Research & Cluster GI Integrity Notice */}
      <div className="bg-gradient-to-r from-amber-950 via-amber-900 to-stone-900 text-amber-50 text-[11px] py-1.5 px-4 font-medium tracking-wide flex flex-wrap items-center justify-between">
        <div className="flex items-center gap-2 max-w-7xl mx-auto w-full justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>
              <strong>Ph.D. Research Prototype:</strong> Digital Verification &amp; Traceability for Bagru (GI No. 183) &amp; Sanganeri (GI No. 147) Hand-Block Textiles
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-3">
            <span className="bg-amber-800 text-amber-200 px-2.5 py-0.5 rounded text-[10px] font-semibold border border-amber-700/50">
              DEMO DATA — NOT REAL CERTIFICATION
            </span>
            <span className="text-[10px] text-amber-300/80">
              Indian GI Act 1999 • DPDP Act 2023
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-800 via-amber-900 to-stone-950 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform border border-amber-500/30">
              <span className="font-serif text-amber-300 font-extrabold text-lg tracking-wider">CT</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif font-black text-lg sm:text-xl text-stone-900 tracking-tight">CRAFTTRUE</span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-amber-800 px-1.5 py-0.5 bg-amber-100 rounded border border-amber-200">
                  INDIA
                </span>
              </div>
              <p className="text-[10px] text-stone-500 font-medium tracking-wide -mt-0.5">
                Rajasthan Handloom &amp; GI Block-Print Registry
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {primaryNavLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-amber-100 text-amber-950 font-bold shadow-xs border border-amber-200'
                      : link.highlight
                      ? 'text-amber-800 bg-amber-50/80 hover:bg-amber-100 font-bold border border-amber-200/60'
                      : 'text-stone-700 hover:text-amber-900 hover:bg-amber-50'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-800' : 'text-stone-500'}`} />
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-medium ${
                      link.highlight 
                        ? 'bg-amber-800 text-white' 
                        : 'bg-stone-200 text-stone-700'
                    }`}>
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Persona Switcher (For Ph.D. Evaluation) */}
          <div className="hidden lg:flex items-center gap-1.5 bg-stone-100 p-1 rounded-xl border border-stone-200 text-xs shrink-0">
            <span className="text-[10px] text-stone-500 font-bold px-1.5 uppercase">Role:</span>
            <button
              onClick={() => setActiveRole('consumer')}
              className={`px-2 py-1 rounded-lg text-[11px] font-medium transition ${
                activeRole === 'consumer'
                  ? 'bg-white text-stone-900 shadow-xs font-bold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Consumer
            </button>
            <button
              onClick={() => setActiveRole('artisan')}
              className={`px-2 py-1 rounded-lg text-[11px] font-medium transition ${
                activeRole === 'artisan'
                  ? 'bg-amber-800 text-white shadow-xs font-bold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Artisan
            </button>
            <button
              onClick={() => setActiveRole('verifier')}
              className={`px-2 py-1 rounded-lg text-[11px] font-medium transition ${
                activeRole === 'verifier'
                  ? 'bg-stone-900 text-amber-300 shadow-xs font-bold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Verifier
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex xl:hidden items-center gap-2">
            <Link
              href="/scan"
              className="bg-amber-800 text-white p-2 rounded-xl text-xs font-bold flex items-center gap-1.5"
            >
              <QrCode className="w-4 h-4" />
              <span className="hidden sm:inline">Scan QR</span>
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-stone-700 hover:bg-stone-100"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-stone-200 px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <div className="grid grid-cols-1 gap-1">
            {primaryNavLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold ${
                    isActive 
                      ? 'bg-amber-100 text-amber-950 font-bold' 
                      : 'text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-amber-800" />
                    <span>{link.label}</span>
                  </div>
                  {link.badge && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 font-medium">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-stone-200 flex items-center justify-between text-xs text-stone-600 px-2">
            <span>Demo Mode Role:</span>
            <div className="flex gap-1">
              <span className="px-2 py-1 bg-amber-100 text-amber-950 font-bold rounded">Consumer</span>
              <span className="px-2 py-1 bg-stone-100 text-stone-600 rounded">Artisan</span>
              <span className="px-2 py-1 bg-stone-100 text-stone-600 rounded">Verifier</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
