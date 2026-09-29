import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Security Gateway | Kangsik Ko R&D Archive',
  description: 'Restricted access portal for proprietary 3DGS & OpenUSD spatial pipeline archive.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
