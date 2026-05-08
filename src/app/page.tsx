import { Suspense } from 'react';
import { ArtistPageShell } from '@/features/artists/components/ArtistPageShell';
import { ArtistResults } from '@/features/artists/components/ArtistResults';
import { LoadingState } from '@/features/artists/components/LoadingState';
import { parseArtistSearchParams } from '@/features/artists/utils/parseArtistSearchParams';

export const dynamic = 'force-dynamic';

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const Page = async ({ searchParams }: PageProps) => {
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
