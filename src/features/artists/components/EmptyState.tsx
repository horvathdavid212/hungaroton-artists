import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ResetFiltersButton } from '@/features/artists/components/ResetFiltersButton';
import type { ArtistQuery } from '@/features/artists/types/artist';
import { dictionary } from '@/shared/content/dictionaries';

type EmptyStateProps = {
  query: ArtistQuery;
};

export const EmptyState = ({ query }: EmptyStateProps) => {
  const texts = dictionary.artistResults;

  return (
    <Paper sx={{ p: { xs: 3, md: 4 } }} variant="outlined">
      <Stack spacing={2}>
        <Stack spacing={0.75}>
          <Typography component="h2" variant="h2">
            {texts.emptyTitle}
          </Typography>
          <Typography color="text.secondary">{texts.emptyDescription}</Typography>
        </Stack>
        <ResetFiltersButton query={query} />
      </Stack>
    </Paper>
  );
};
