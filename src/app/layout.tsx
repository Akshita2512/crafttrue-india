import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

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
    icon: '/icons/icon.svg',
    apple: '/icons/icon.svg',
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
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
