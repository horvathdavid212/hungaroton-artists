import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Suspense } from 'react';
import { ArtistPageShell } from '@/features/artists/components/ArtistPageShell';
import { ArtistResults } from '@/features/artists/components/ArtistResults';
import { LoadingState } from '@/features/artists/components/LoadingState';
import { parseArtistSearchParams } from '@/features/artists/utils/parseArtistSearchParams';
import { routing } from '@/i18n/routing';

type PageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const Page = async ({ params, searchParams }: PageProps) => {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const rawSearchParams = await searchParams;
  const query = parseArtistSearchParams(rawSearchParams);
  const resultsKey = JSON.stringify(query);

  return (
    <ArtistPageShell query={query}>
      <Suspense fallback={<LoadingState />} key={resultsKey}>
        <ArtistResults query={query} />
      </Suspense>
    </ArtistPageShell>
  );
};

export default Page;
