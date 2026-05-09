import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import '@/app/globals.css';
import { routing } from '@/i18n/routing';
import '@/styles/tokens.css';
import { ThemeRegistry } from '@/theme/ThemeRegistry';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
});

type LocaleLayoutProps = Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>;

export const generateStaticParams = () => {
  return routing.locales.map((locale) => ({ locale }));
};

export const generateMetadata = async ({ params }: Pick<LocaleLayoutProps, 'params'>): Promise<Metadata> => {
  const { locale: requestedLocale } = await params;
  const locale = hasLocale(routing.locales, requestedLocale) ? requestedLocale : routing.defaultLocale;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    title: t('title'),
    description: t('description')
  };
};

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html className={`${geistSans.variable} ${geistMono.variable}`} lang={locale}>
      <body>
        <NextIntlClientProvider>
          <ThemeRegistry>{children}</ThemeRegistry>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
