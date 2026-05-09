import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { useTranslations } from 'next-intl';

const LOADING_CARD_KEYS = [
  'loading-artist-card-1',
  'loading-artist-card-2',
  'loading-artist-card-3',
  'loading-artist-card-4',
  'loading-artist-card-5',
  'loading-artist-card-6',
  'loading-artist-card-7',
  'loading-artist-card-8'
] as const;

export const LoadingState = () => {
  const t = useTranslations('common');

  return (
    <Paper
      aria-label={t('loading')}
      sx={{
        borderRadius: 'var(--radius-lg)',
        p: { xs: 2, md: 3 }
      }}
      variant="outlined"
    >
      <Stack spacing={2.5}>
        <Stack spacing={1}>
          <Skeleton height={30} variant="rounded" width="42%" />
          <Skeleton height={18} variant="rounded" width="60%" />
        </Stack>
        <Box
          sx={{
            display: 'grid',
            gap: { xs: 2, md: 2.5 },
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, minmax(0, 1fr))',
              md: 'repeat(3, minmax(0, 1fr))',
              lg: 'repeat(4, minmax(0, 1fr))'
            }
          }}
        >
          {LOADING_CARD_KEYS.map((cardKey) => (
            <Stack key={cardKey} spacing={1.5}>
              <Skeleton sx={{ aspectRatio: '4 / 3', height: 'auto' }} variant="rounded" />
              <Skeleton height={24} variant="rounded" width="78%" />
              <Skeleton height={18} variant="rounded" width="42%" />
            </Stack>
          ))}
        </Box>
      </Stack>
    </Paper>
  );
};
