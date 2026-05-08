'use client';

import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { ArtistTypeFilter } from '@/features/artists/components/ArtistTypeFilter';
import { LetterFilter } from '@/features/artists/components/LetterFilter';
import { ResetFiltersButton } from '@/features/artists/components/ResetFiltersButton';
import { SearchInput } from '@/features/artists/components/SearchInput';
import type { ArtistQuery } from '@/features/artists/types/artist';

type ArtistFiltersProps = {
  query: ArtistQuery;
};

// Note: In the future it would be better to add the query to the context and avoid passing it down to each component, but for now this is simpler

export const ArtistFilters = ({ query }: ArtistFiltersProps) => {
  return (
    <Paper component="section" elevation={0} sx={{ border: 1, borderColor: 'divider', p: { xs: 2, md: 3 } }}>
      <Stack spacing={3}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ alignItems: { xs: 'stretch', md: 'center' } }}>
          <SearchInput query={query} />
          <ArtistTypeFilter query={query} />
          <ResetFiltersButton query={query} />
        </Stack>
        <LetterFilter query={query} />
      </Stack>
    </Paper>
  );
};
