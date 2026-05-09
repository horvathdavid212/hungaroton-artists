import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { getTranslations } from 'next-intl/server';
import { fetchArtists } from '@/features/artists/api/fetchArtists';
import { ArtistGrid } from '@/features/artists/components/ArtistGrid';
import { ArtistPagination } from '@/features/artists/components/ArtistPagination';
import { EmptyState } from '@/features/artists/components/EmptyState';
import { ErrorState } from '@/features/artists/components/ErrorState';
import type { ArtistQuery } from '@/features/artists/types/artist';

type ArtistResultsProps = {
  query: ArtistQuery;
};

export const ArtistResults = async ({ query }: ArtistResultsProps) => {
  const t = await getTranslations('artistResults');
  const result = await fetchArtists(query);

  if (!result.ok) {
    return <ErrorState result={result} />;
  }

  if (result.data.artists.length === 0) {
    return <EmptyState query={query} />;
  }

  return (
    <Stack component="section" spacing={{ xs: 2.5, md: 3 }}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={1}
        sx={{
          alignItems: { xs: 'flex-start', sm: 'flex-end' },
          justifyContent: 'space-between'
        }}
      >
        <Typography component="h2" variant="h2">
          {t('totalArtists', { count: result.data.pagination.totalItems })}
        </Typography>
      </Stack>
      <ArtistGrid artists={result.data.artists} />
      <ArtistPagination pagination={result.data.pagination} />
    </Stack>
  );
};
