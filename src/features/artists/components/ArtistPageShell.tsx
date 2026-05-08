import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { ReactNode } from 'react';
import type { ArtistQuery } from '@/features/artists/types/artist';
import { dictionary } from '@/shared/content/dictionaries';

type ArtistPageShellProps = {
  children: ReactNode;
  query: ArtistQuery;
};

export const ArtistPageShell = ({ children, query }: ArtistPageShellProps) => {
  const texts = dictionary.artistSearch;

  const activeFilters = [
    query.search ? `${texts.activeFilterLabels.search}: ${query.search}` : undefined,
    query.letter ? `${texts.activeFilterLabels.letter}: ${query.letter}` : undefined,
    query.type ? `${texts.activeFilterLabels.type}: ${query.type}` : undefined
  ].filter(Boolean);

  return (
    <Box component="main" sx={{ bgcolor: 'background.default', flex: 1, py: { xs: 4, md: 7 } }}>
      <Container maxWidth="lg">
        <Stack spacing={4}>
          <Stack component="header" spacing={1.5}>
            <Typography component="h1" variant="h1">
              {texts.title}
            </Typography>
            <Typography color="text.secondary" sx={{ maxWidth: 720 }}>
              {texts.subtitle}
            </Typography>
            <Typography color="text.secondary" variant="body2">
              {texts.pageLabel} {query.page}
              {activeFilters.length > 0 ? ` | ${activeFilters.join(' | ')}` : ''}
            </Typography>
          </Stack>
          {children}
        </Stack>
      </Container>
    </Box>
  );
};
