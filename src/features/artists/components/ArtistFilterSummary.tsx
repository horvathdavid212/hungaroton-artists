import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import type { SxProps, Theme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useTranslations } from 'next-intl';
import type { ArtistQuery } from '@/features/artists/types/artist';
import { theme } from '@/theme/theme';

type ArtistFilterSummaryProps = {
  query: ArtistQuery;
  sx?: SxProps<Theme>;
};

export const ArtistFilterSummary = ({ query, sx }: ArtistFilterSummaryProps) => {
  const t = useTranslations('artistSearch');
  const activeFilters = [
    query.search
      ? {
          key: 'search',
          label: `${t('activeFilterLabels.search')}: ${query.search}`
        }
      : null,
    query.letter
      ? {
          key: 'letter',
          label: `${t('activeFilterLabels.letter')}: ${query.letter}`
        }
      : null,
    query.type
      ? {
          key: 'type',
          label: `${t('activeFilterLabels.type')}: ${t(`artistTypeLabels.${query.type}`)}`
        }
      : null,
    query.page > 1
      ? {
          key: 'page',
          label: `${t('pageLabel')}: ${query.page}`
        }
      : null
  ].filter((filter): filter is { key: string; label: string } => Boolean(filter));

  return (
    <Stack spacing={1.5} sx={sx}>
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center', flexWrap: 'wrap', minWidth: 0 }} useFlexGap>
        <Typography component="h2" sx={{ fontWeight: theme.typography.fontWeightBold }} variant="body1">
          {t('filtersTitle')}
        </Typography>
        {activeFilters.length > 0 ? (
          <Stack aria-label={t('activeFiltersLabel')} direction="row" spacing={0.75} sx={{ flexWrap: 'wrap', minWidth: 0 }} useFlexGap>
            {activeFilters.map((filter) => (
              <Chip
                key={filter.key}
                label={filter.label}
                size="small"
                sx={{
                  maxWidth: { xs: '100%', sm: 260 },
                  '& .MuiChip-label': {
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }
                }}
                variant="outlined"
              />
            ))}
          </Stack>
        ) : null}
      </Stack>
    </Stack>
  );
};
