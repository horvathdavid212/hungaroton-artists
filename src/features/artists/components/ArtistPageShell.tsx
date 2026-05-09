import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { ReactNode } from 'react';
import { ArtistFilters } from '@/features/artists/components/ArtistFilters';
import type { ArtistQuery } from '@/features/artists/types/artist';
import { dictionary } from '@/shared/content/dictionaries';

type ArtistPageShellProps = {
  children: ReactNode;
  query: ArtistQuery;
};

export const ArtistPageShell = ({ children, query }: ArtistPageShellProps) => {
  const texts = dictionary.artistSearch;

  return (
    <Box
      component="main"
      sx={{
        bgcolor: 'background.default',
        flex: 1,
        py: { xs: 3, md: 6 }
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={{ xs: 3, md: 4 }}>
          <Stack component="header" spacing={1.5} sx={{ borderLeft: 4, borderColor: 'primary.main', pl: { xs: 2, md: 3 } }}>
            <Typography component="h1" variant="h1">
              {texts.title}
            </Typography>
            <Typography color="text.secondary" sx={{ maxWidth: 720, textWrap: 'pretty' }}>
              {texts.subtitle}
            </Typography>
          </Stack>
          <ArtistFilters query={query} />
          {children}
        </Stack>
      </Container>
    </Box>
  );
};
