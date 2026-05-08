import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { ReactNode } from 'react';
import type { ArtistQuery } from '@/features/artists/types/artist';

type ArtistPageShellProps = {
  children: ReactNode;
  query: ArtistQuery;
};

export const ArtistPageShell = ({ children, query }: ArtistPageShellProps) => {
  const activeFilters = [
    query.search ? `Search: ${query.search}` : undefined,
    query.letter ? `Letter: ${query.letter}` : undefined,
    query.type ? `Type: ${query.type}` : undefined
  ].filter(Boolean);

  return (
    <Box component="main" sx={{ bgcolor: 'background.default', flex: 1, py: { xs: 4, md: 7 } }}>
      <Container maxWidth="lg">
        <Stack spacing={4}>
          <Stack component="header" spacing={1.5}>
            <Typography component="h1" variant="h1">
              Hungaroton artists
            </Typography>
            <Typography color="text.secondary" sx={{ maxWidth: 720 }}>
              Browse artists from the Hungaroton catalogue with server-rendered results.
            </Typography>
            <Typography color="text.secondary" variant="body2">
              Page {query.page}
              {activeFilters.length > 0 ? ` | ${activeFilters.join(' | ')}` : ''}
            </Typography>
          </Stack>
          {children}
        </Stack>
      </Container>
    </Box>
  );
};
