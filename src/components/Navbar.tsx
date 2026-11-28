'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUserRole } from '@/context/RoleContext';
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
  ExternalLink,
  LogIn,
  LogOut,
  User
} from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { role, activeArtisan, currentUser, setRole, loginAsArtisan, logoutToConsumer, logout } = useUserRole();

  const primaryNavLinks = [
    { href: '/products', label: 'Craft Catalog', icon: ShoppingBag, badge: 'GI Textiles' },
    { href: '/scan', label: 'Scan & Verify', icon: QrCode, badge: 'Live Scanner' },
    { href: '/authenticity-guide', label: 'Authenticity Guide', icon: BookOpenCheck, badge: 'Field Tests', highlight: true },
    { href: '/artisans', label: 'Master Artisans', icon: Award, badge: 'Chhipa Masters' },
    {
      href: '/artisan',
      label: role === 'artisan' ? 'Artisan Studio' : 'Artisan Portal',
      icon: UserCheck,
      badge: role === 'artisan' ? activeArtisan.cluster : 'Demo Access'
    },
    { href: '/admin', label: 'Verifier Desk', icon: ShieldCheck, badge: 'AEF Audit' },
    { href: '/research', label: 'Craft Intelligence', icon: BarChart3, badge: 'Lab Data' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#FFFDF9]/95 backdrop-blur-md border-b border-amber-900/10 shadow-xs max-w-full overflow-hidden">
      {/* Top Banner: Cluster GI Integrity Notice */}
      <div className="bg-gradient-to-r from-amber-950 via-amber-900 to-stone-900 text-amber-50 text-[10px] sm:text-[11px] py-1 px-3 sm:px-4 font-medium tracking-wide">
        <div className="flex items-center justify-between max-w-7xl mx-auto w-full gap-2">
          <div className="flex items-center gap-1.5 min-w-0">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" />
            <span className="truncate">
              <strong>GI Registry:</strong> Bagru (GI-183) &amp; Sanganer (GI-147) Handloom Verification
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <span className="bg-amber-800/80 text-amber-200 px-2 py-0.5 rounded text-[10px] font-semibold border border-amber-700/50">
              GI-183 • GI-147
            </span>
            <span className="text-[10px] text-amber-300/80">
              Indian GI Act 1999
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-2 sm:gap-4">

          {/* Brand Logo - Fully responsive so it never pushes the menu button off-screen */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group shrink min-w-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-amber-800 via-amber-900 to-stone-950 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform border border-amber-500/30 shrink-0">
              <span className="font-serif text-amber-300 font-extrabold text-base sm:text-lg tracking-wider">CT</span>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1 sm:gap-1.5">
                <span className="font-serif font-black text-base sm:text-lg text-stone-900 tracking-tight">CRAFTTRUE</span>
                <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-widest text-amber-800 px-1 py-0.2 sm:px-1.5 sm:py-0.5 bg-amber-100 rounded border border-amber-200 shrink-0">
                  INDIA
                </span>
              </div>
              <p className="text-[9px] text-stone-500 font-medium tracking-tight -mt-0.5 truncate hidden sm:block">
                Rajasthan Handloom &amp; GI Registry
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
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${isActive
                      ? 'bg-amber-100 text-amber-950 font-bold shadow-xs border border-amber-200'
                      : link.highlight
                        ? 'text-amber-800 bg-amber-50/80 hover:bg-amber-100 font-bold border border-amber-200/60'
                        : 'text-stone-700 hover:text-amber-900 hover:bg-amber-50'
                    }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-800' : 'text-stone-500'}`} />
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-medium ${link.highlight
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

          {/* Role Switcher & Auth */}
          <div className="hidden lg:flex items-center gap-2 shrink-0">
            {/* Quick Demo Role Switcher */}
            <div className="flex items-center gap-1.5 bg-stone-100 p-1 rounded-xl border border-stone-200 text-xs">
              <span className="text-[10px] text-stone-500 font-bold px-1.5 uppercase">Role:</span>
              <button
                onClick={() => logoutToConsumer()}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition ${role === 'consumer'
                    ? 'bg-white text-stone-900 shadow-xs font-bold'
                    : 'text-stone-600 hover:text-stone-900'
                  }`}
              >
                Consumer
              </button>
              <button
                onClick={() => loginAsArtisan('lalchand')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition ${role === 'artisan'
                    ? 'bg-amber-800 text-white shadow-xs font-bold'
                    : 'text-stone-600 hover:text-stone-900'
                  }`}
              >
                Artisan {role === 'artisan' && `(${activeArtisan.cluster})`}
              </button>
            </div>

            {/* Auth State Button */}
            {currentUser?.isLoggedIn ? (
              <div className="flex items-center gap-2 pl-1 border-l border-stone-200">
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-amber-50 border border-amber-200 text-xs">
                  <div className="w-5 h-5 rounded-full bg-amber-800 text-amber-100 flex items-center justify-center text-[10px] font-bold">
                    {currentUser.fullName.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-semibold text-stone-900 max-w-[110px] truncate text-[11px]">
                    {currentUser.fullName}
                  </span>
                  <span className="text-[9px] uppercase px-1.5 py-0.2 rounded bg-amber-200 text-amber-900 font-bold">
                    {currentUser.role}
                  </span>
                </div>
                <button
                  onClick={() => logout()}
                  title="Sign Out"
                  className="p-1.5 rounded-lg text-stone-400 hover:text-red-700 hover:bg-red-50 transition"
                  aria-label="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-amber-300 text-xs font-bold transition shadow-xs border border-stone-800"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Sign In / Demo OTP</span>
              </Link>
            )}
          </div>

          {/* Mobile menu button & Quick Scan (Always visible on mobile viewports) */}
          <div className="flex xl:hidden items-center gap-1.5 sm:gap-2 shrink-0">
            <Link
              href="/scan"
              className="bg-amber-800 hover:bg-amber-900 active:scale-95 text-white px-2.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition"
              title="Scan Tag"
            >
              <QrCode className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Scan QR</span>
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-stone-800 hover:bg-amber-50 active:scale-95 transition border border-stone-200/80 bg-stone-50"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-amber-900" /> : <Menu className="w-5 h-5 text-stone-800" />}
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
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold ${isActive
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

          {/* Mobile Auth Status */}
          <div className="pt-3 border-t border-stone-200 text-xs px-2 space-y-3">
            {currentUser?.isLoggedIn ? (
              <div className="flex items-center justify-between w-full bg-amber-50 p-2.5 rounded-xl border border-amber-200">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-amber-800 text-amber-100 flex items-center justify-center font-bold text-xs">
                    {currentUser.fullName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="font-bold text-stone-900">{currentUser.fullName}</div>
                    <div className="text-[10px] text-amber-800 uppercase font-semibold tracking-wide">
                      {currentUser.role} Account
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-white border border-stone-200 hover:bg-stone-50 text-stone-700 font-semibold text-[11px] flex items-center gap-1 shadow-xs"
                >
                  <LogOut className="w-3.5 h-3.5 text-stone-500" />
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between w-full bg-stone-50 p-2.5 rounded-xl border border-stone-200">
                <div>
                  <div className="font-semibold text-stone-800">Consumer / Artisan</div>
                  <div className="text-[10px] text-stone-500">Sign in with Mobile OTP</div>
                </div>
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-1.5 bg-amber-800 hover:bg-amber-900 text-white rounded-lg font-bold text-xs flex items-center gap-1.5 shadow-xs"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  Sign In (OTP Demo)
                </Link>
              </div>
            )}

            <div className="flex items-center justify-between text-stone-500 pt-1">
              <span>Quick Role Switch:</span>
              <div className="flex gap-1.5">
                <button
                  onClick={() => {
                    logoutToConsumer();
                    setMobileMenuOpen(false);
                  }}
                  className={`px-2 py-1 rounded text-[11px] font-semibold ${role === 'consumer' ? 'bg-amber-200 text-amber-950' : 'bg-stone-100 text-stone-600'
                    }`}
                >
                  Consumer
                </button>
                <button
                  onClick={() => {
                    loginAsArtisan('lalchand');
                    setMobileMenuOpen(false);
                  }}
                  className={`px-2 py-1 rounded text-[11px] font-semibold ${role === 'artisan' ? 'bg-amber-800 text-white' : 'bg-stone-100 text-stone-600'
                    }`}
                >
                  Artisan Studio
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
