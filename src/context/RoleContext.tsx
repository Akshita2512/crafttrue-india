'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'consumer' | 'artisan';

export interface ArtisanProfile {
  id: string;
  name: string;
  titleHi: string;
  workshopName: string;
  cluster: 'Bagru' | 'Sanganer';
  giAuthorizedUserNo: string;
  pehchanId: string;
  experienceYears: number;
  award: string;
  avatarUrl: string;
  address: string;
  activeLotsCount: number;
  totalEarningsInr: number;
}

export const DEMO_ARTISAN_PROFILES: Record<string, ArtisanProfile> = {
  lalchand: {
    id: 'artisan-lalchand',
    name: "Lalchand 'Chippa' Derawala",
    titleHi: "लालचंद 'छीपा' डेरावाला",
    workshopName: 'Lalchand Chippa Heritage Workshop',
    cluster: 'Bagru',
    giAuthorizedUserNo: 'GI-183-AU-BAGRU-019',
    pehchanId: 'NRJPC241207',
    experienceYears: 36,
    award: 'National Award Winner (1999)',
    avatarUrl: '/images/textiles/bagru-village-printing.jpg',
    address: 'Laxmi Nath Chowk, Bagru, Jaipur, Rajasthan 303007',
    activeLotsCount: 3,
    totalEarningsInr: 142500
  },
  brijballabh: {
    id: 'artisan-brijballabh',
    name: 'Brij Ballabh Udaiwal',
    titleHi: 'बृज बल्लभ उदेईवाल',
    workshopName: 'Shilpi Sansthan Craft Studio',
    cluster: 'Sanganer',
    giAuthorizedUserNo: 'GI-147-AU-SGR-042',
    pehchanId: 'NRJPC241208',
    experienceYears: 34,
    award: 'National Awardee (1991)',
    avatarUrl: '/images/textiles/hand-printing-process.jpg',
    address: '6/46 Near Siliberi, Sanganer, Jaipur, Rajasthan 302029',
    activeLotsCount: 2,
    totalEarningsInr: 168200
  }
};

interface RoleContextType {
  role: UserRole;
  artisanKey: 'lalchand' | 'brijballabh';
  activeArtisan: ArtisanProfile;
  setRole: (role: UserRole) => void;
  loginAsArtisan: (artisanKey: 'lalchand' | 'brijballabh') => void;
  logoutToConsumer: () => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [role, setRoleState] = useState<UserRole>('consumer');
  const [artisanKey, setArtisanKey] = useState<'lalchand' | 'brijballabh'>('lalchand');

  // Load from localStorage on client mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedRole = localStorage.getItem('crafttrue_user_role') as UserRole;
      const savedArtisan = localStorage.getItem('crafttrue_artisan_key') as 'lalchand' | 'brijballabh';
      if (savedRole === 'consumer' || savedRole === 'artisan') {
        setRoleState(savedRole);
      }
      if (savedArtisan && DEMO_ARTISAN_PROFILES[savedArtisan]) {
        setArtisanKey(savedArtisan);
      }
    }
  }, []);

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    if (typeof window !== 'undefined') {
      localStorage.setItem('crafttrue_user_role', newRole);
    }
  };

  const loginAsArtisan = (key: 'lalchand' | 'brijballabh') => {
    setArtisanKey(key);
    setRoleState('artisan');
    if (typeof window !== 'undefined') {
      localStorage.setItem('crafttrue_user_role', 'artisan');
      localStorage.setItem('crafttrue_artisan_key', key);
    }
  };

  const logoutToConsumer = () => {
    setRoleState('consumer');
    if (typeof window !== 'undefined') {
      localStorage.setItem('crafttrue_user_role', 'consumer');
    }
  };

  const activeArtisan = DEMO_ARTISAN_PROFILES[artisanKey] || DEMO_ARTISAN_PROFILES.lalchand;

  return (
    <RoleContext.Provider
      value={{
        role,
        artisanKey,
        activeArtisan,
        setRole,
        loginAsArtisan,
        logoutToConsumer
      }}
    >
      {children}
    </RoleContext.Provider>
  );
}

export function useUserRole() {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useUserRole must be used within a RoleProvider');
  }
  return context;
}
