'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'consumer' | 'artisan';

export interface AuthUser {
  id: string;
  fullName: string;
  role: UserRole;
  phone?: string;
  email?: string;
  isLoggedIn: boolean;
}

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
  currentUser: AuthUser | null;
  setRole: (role: UserRole) => void;
  loginAsArtisan: (artisanKey: 'lalchand' | 'brijballabh') => void;
  loginWithPhoneOtp: (phone: string, otp: string, name?: string) => { success: boolean; message?: string };
  loginWithEmail: (email: string, password?: string) => { success: boolean; message?: string };
  logout: () => void;
  logoutToConsumer: () => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [role, setRoleState] = useState<UserRole>('consumer');
  const [artisanKey, setArtisanKey] = useState<'lalchand' | 'brijballabh'>('lalchand');
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);

  // Load from localStorage on client mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedRole = localStorage.getItem('crafttrue_user_role') as UserRole;
      const savedArtisan = localStorage.getItem('crafttrue_artisan_key') as 'lalchand' | 'brijballabh';
      const savedUser = localStorage.getItem('crafttrue_current_user');

      if (savedRole === 'consumer' || savedRole === 'artisan') {
        setRoleState(savedRole);
      }
      if (savedArtisan && DEMO_ARTISAN_PROFILES[savedArtisan]) {
        setArtisanKey(savedArtisan);
      }
      if (savedUser) {
        try {
          setCurrentUser(JSON.parse(savedUser));
        } catch {
          // ignore corrupted json
        }
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
    const profile = DEMO_ARTISAN_PROFILES[key];
    const user: AuthUser = {
      id: profile.id,
      fullName: profile.name,
      role: 'artisan',
      isLoggedIn: true
    };
    setCurrentUser(user);

    if (typeof window !== 'undefined') {
      localStorage.setItem('crafttrue_user_role', 'artisan');
      localStorage.setItem('crafttrue_artisan_key', key);
      localStorage.setItem('crafttrue_current_user', JSON.stringify(user));
    }
  };

  const loginWithPhoneOtp = (phone: string, otp: string, name?: string) => {
    const cleanOtp = otp.trim();
    // Valid demo OTPs: 4821 or 1234 or any 4/6-digit code
    if (cleanOtp === '4821' || cleanOtp === '1234' || cleanOtp.length === 4 || cleanOtp.length === 6) {
      const cleanPhone = phone.startsWith('+91') ? phone : `+91 ${phone.trim()}`;
      const user: AuthUser = {
        id: `usr-${Date.now().toString().slice(-6)}`,
        fullName: name || 'Handloom Patron',
        phone: cleanPhone,
        role: 'consumer',
        isLoggedIn: true
      };
      setCurrentUser(user);
      setRoleState('consumer');

      if (typeof window !== 'undefined') {
        localStorage.setItem('crafttrue_user_role', 'consumer');
        localStorage.setItem('crafttrue_current_user', JSON.stringify(user));
      }
      return { success: true };
    }
    return { success: false, message: 'Invalid OTP code. Please use Demo OTP: 4821 (or 1234)' };
  };

  const loginWithEmail = (email: string, password?: string) => {
    const user: AuthUser = {
      id: `usr-${Date.now().toString().slice(-6)}`,
      fullName: email.split('@')[0] || 'Conscious Buyer',
      email: email.trim(),
      role: 'consumer',
      isLoggedIn: true
    };
    setCurrentUser(user);
    setRoleState('consumer');

    if (typeof window !== 'undefined') {
      localStorage.setItem('crafttrue_user_role', 'consumer');
      localStorage.setItem('crafttrue_current_user', JSON.stringify(user));
    }
    return { success: true };
  };

  const logout = () => {
    setCurrentUser(null);
    setRoleState('consumer');
    if (typeof window !== 'undefined') {
      localStorage.removeItem('crafttrue_current_user');
      localStorage.setItem('crafttrue_user_role', 'consumer');
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
        currentUser,
        setRole,
        loginAsArtisan,
        loginWithPhoneOtp,
        loginWithEmail,
        logout,
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
