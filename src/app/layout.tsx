import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { dictionary } from '@/shared/content/dictionaries';
import { ThemeRegistry } from '@/theme/ThemeRegistry';
import '@/styles/tokens.css';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: dictionary.metadata.title,
  description: dictionary.metadata.description
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={`${geistSans.variable} ${geistMono.variable}`} lang="en">
      <body>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
