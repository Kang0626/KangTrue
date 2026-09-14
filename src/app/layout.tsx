import type { Metadata, Viewport } from 'next';
import './globals.css';
import { SITE_METADATA } from '@/lib/constants';

export const metadata: Metadata = {
  title: SITE_METADATA.title,
  description: SITE_METADATA.description,
  authors: [{ name: SITE_METADATA.author }],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
  themeColor: '#0085ca',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light scroll-smooth">
      <head>
        {/* Truescape Official Adobe Typekit (Proxima Nova) */}
        <link rel="stylesheet" href="https://use.typekit.net/gwt2gjy.css" />
        {/* Google Fonts: JetBrains Mono & Outfit */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Outfit:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-slate-50 text-slate-900 min-h-screen antialiased selection:bg-[#0085ca]/20 selection:text-[#0085ca]">
        {children}
      </body>
    </html>
  );
}
