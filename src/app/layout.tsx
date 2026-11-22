import type { Metadata } from 'next';
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { MobileBottomNav } from '@/components/MobileBottomNav';
import ServiceWorkerRegistration from '@/components/ServiceWorkerRegistration';
import { RoleProvider } from '@/context/RoleContext';

// Configure Luxury Artisanal Fonts
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'CRAFTTRUE INDIA | Authentic Indian Handicrafts & Handlooms',
  description: 'India\'s Digital Craft Authenticity & Traceability Platform for GI-Certified Rajasthani Hand-Block Printed Textiles. Supporting Master Artisans & Transparent Fair Trade.',
  manifest: '/manifest.json',
  themeColor: '#92400e',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'CraftTrue India',
  },
  icons: {
    icon: '/icons/icon-192.png',
    apple: '/icons/icon-192.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${jakarta.variable} scroll-smooth`}>
      <body className="min-h-screen flex flex-col antialiased bg-[#FAF8F5] text-stone-900 font-sans pb-16 md:pb-0">
        <RoleProvider>
          <ServiceWorkerRegistration />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <MobileBottomNav />
        </RoleProvider>
      </body>
    </html>
  );
}
