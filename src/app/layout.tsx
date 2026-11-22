import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'CRAFTTRUE INDIA | Authentic Indian Handicrafts & Handlooms',
  description: 'Empowering India’s rural master artisans. Direct-from-source GI-tagged handicrafts, Kashmiri Pashmina, Jaipur Blue Pottery, Madhubani Art, and handlooms.',
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
