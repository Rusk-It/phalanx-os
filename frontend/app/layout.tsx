// frontend/app/layout.tsx

import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers'; // Import the new file

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
      <body className="bg-zinc-950 antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
