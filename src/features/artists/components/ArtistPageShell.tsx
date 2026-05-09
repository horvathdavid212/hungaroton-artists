import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';
import { ArtistFilters } from '@/features/artists/components/ArtistFilters';
import { LanguageSwitcher } from '@/features/artists/components/LanguageSwitcher';
import type { ArtistQuery } from '@/features/artists/types/artist';
import { theme } from '@/theme/theme';

type ArtistPageShellProps = {
  children: ReactNode;
  query: ArtistQuery;
};

export const ArtistPageShell = ({ children, query }: ArtistPageShellProps) => {
  const t = useTranslations('artistSearch');

  return (
    <Box
      component="main"
      sx={{
        bgcolor: theme.palette.background.default,
        flex: 1,
        py: { xs: 3, md: 6 }
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={{ xs: 3, md: 4 }}>
          <Stack
            component="header"
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            sx={{
              alignItems: { xs: 'stretch', sm: 'flex-start' },
              borderLeft: 4,
              borderColor: theme.palette.primary.main,
              justifyContent: 'space-between',
              pl: { xs: 2, md: 3 }
            }}
          >
            <Stack spacing={1.5}>
              <Typography component="h1" variant="h1">
                {t('title')}
              </Typography>
              <Typography color="text.secondary" sx={{ maxWidth: 720, textWrap: 'pretty' }}>
                {t('subtitle')}
              </Typography>
            </Stack>
            <LanguageSwitcher />
          </Stack>
          <ArtistFilters query={query} />
          {children}
        </Stack>
      </Container>
    </Box>
  );
};
