import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTranslations } from 'next-intl';
import { ResetFiltersButton } from '@/features/artists/components/ResetFiltersButton';
import type { ArtistQuery } from '@/features/artists/types/artist';

type EmptyStateProps = {
  query: ArtistQuery;
};

export const EmptyState = ({ query }: EmptyStateProps) => {
  const t = useTranslations('artistResults');

  return (
    <Paper
      sx={{
        borderRadius: 'var(--radius-lg)',
        p: { xs: 3, md: 4 }
      }}
      variant="outlined"
    >
      <Stack spacing={2} sx={{ maxWidth: 560 }}>
        <Stack spacing={0.75}>
          <Typography component="h2" variant="h2">
            {t('emptyTitle')}
          </Typography>
          <Typography color="text.secondary">{t('emptyDescription')}</Typography>
        </Stack>
        <ResetFiltersButton query={query} />
      </Stack>
    </Paper>
  );
};
