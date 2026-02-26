// frontend/app/layout.tsx
// Root layout for Phalanx frontend

import type { Metadata } from 'next';
import './globals.css';  // Assume you'll add this next

export const metadata: Metadata = {
  title: 'Phalanx OS — Rusk-It',
  description: 'Grok 4.2 Multi-Agent AI Special Forces Wallet',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-zinc-950 antialiased">{children}</body>
    </html>
  );
}
