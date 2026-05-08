import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { fetchArtists } from '@/features/artists/api/fetchArtists';
import { ArtistGrid } from '@/features/artists/components/ArtistGrid';
import { ArtistPagination } from '@/features/artists/components/ArtistPagination';
import { EmptyState } from '@/features/artists/components/EmptyState';
import { ErrorState } from '@/features/artists/components/ErrorState';
import type { ArtistQuery } from '@/features/artists/types/artist';
import { dictionary } from '@/shared/content/dictionaries';

type ArtistResultsProps = {
  query: ArtistQuery;
};

export const ArtistResults = async ({ query }: ArtistResultsProps) => {
  const texts = dictionary.artistResults;
  const result = await fetchArtists(query);

  if (!result.ok) {
    return <ErrorState />;
  }

  if (result.data.artists.length === 0) {
    return <EmptyState query={query} />;
  }

  return (
    <Stack component="section" spacing={3}>
      <Stack spacing={0.75}>
        <Typography component="h2" variant="h2">
          {texts.totalArtists(result.data.pagination.totalItems)}
        </Typography>
        <Typography color="text.secondary">{texts.paginationSummary(result.data.pagination.currentPage, result.data.pagination.totalPages)}</Typography>
      </Stack>
      <ArtistGrid artists={result.data.artists} />
      <ArtistPagination pagination={result.data.pagination} />
    </Stack>
  );
};
