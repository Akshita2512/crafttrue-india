'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUserRole } from '@/context/RoleContext';
import { ShoppingBag, BookOpenCheck, QrCode, Award, ShieldCheck, UserCheck } from 'lucide-react';

export function MobileBottomNav() {
  const pathname = usePathname();
  const { role } = useUserRole();

  const navItems = [
    {
      href: '/products',
      label: 'Catalog',
      icon: ShoppingBag,
    },
    {
      href: '/authenticity-guide',
      label: 'Guide',
      icon: BookOpenCheck,
    },
    {
      href: '/scan',
      label: 'Scan QR',
      icon: QrCode,
      isCenter: true,
    },
    role === 'artisan'
      ? {
          href: '/artisan',
          label: 'My Studio',
          icon: UserCheck,
        }
      : {
          href: '/artisans',
          label: 'Artisans',
          icon: Award,
        },
    {
      href: '/admin',
      label: 'Verifier',
      icon: ShieldCheck,
    },
  ];

  return (
    <nav 
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#FFFDF9]/95 backdrop-blur-lg border-t border-amber-900/15 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] pb-[env(safe-area-inset-bottom,0px)]"
    >
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));

          if (item.isCenter) {
            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative -top-5 flex flex-col items-center group"
                aria-label="Scan Product QR Tag"
              >
                <div className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform active:scale-95 border-2 ${
                  isActive
                    ? 'bg-amber-800 text-amber-200 border-amber-400 ring-4 ring-amber-200/60'
                    : 'bg-gradient-to-tr from-amber-900 to-amber-700 text-amber-100 border-amber-300 ring-2 ring-amber-100 shadow-amber-900/30'
                }`}>
                  <Icon className="w-7 h-7" />
                </div>
                <span className={`text-[10px] font-bold tracking-tight mt-1 ${
                  isActive ? 'text-amber-900' : 'text-stone-700'
                }`}>
                  {item.label}
                </span>
              </Link>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors ${
                isActive
                  ? 'text-amber-900 font-bold'
                  : 'text-stone-500 hover:text-amber-800'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.4] text-amber-900' : 'stroke-[1.75]'}`} />
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-amber-800" />
                )}
              </div>
              <span className={`text-[10px] tracking-tight mt-1 ${isActive ? 'font-bold text-amber-950' : 'font-medium'}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
