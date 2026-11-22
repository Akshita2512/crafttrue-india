import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import ServiceWorkerRegistration from '@/components/ServiceWorkerRegistration';

export const metadata: Metadata = {
  title: 'CRAFTTRUE INDIA | Authentic Indian Handicrafts & Handlooms',
  description: 'QR-Based Digital Craft Authenticity & Traceability System for GI-Certified Rajasthani Hand-Block Printed Textiles. PhD Research Demo.',
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
    <html lang="en">
      <body className="min-h-screen flex flex-col antialiased bg-[#FAF8F5]">
        <ServiceWorkerRegistration />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
