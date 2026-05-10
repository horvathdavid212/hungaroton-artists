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
        py: { xs: 1, md: 2 }
      }}
    >
      <Container maxWidth="lg">
        <Stack>
          <Box sx={{ mb: { xs: 3, md: 4 } }}>
            <Stack
              component="header"
              sx={{
                borderLeft: 4,
                borderColor: theme.palette.primary.main,
                pl: { xs: 1, sm: 2, md: 3 }
              }}
            >
              <Stack spacing={1}>
                <Stack direction="row" spacing={1} sx={{ alignItems: 'center', justifyContent: 'space-between', minWidth: 0 }}>
                  <Typography
                    component="h1"
                    sx={{
                      flex: 1,
                      fontSize: { xs: theme.app.fontSize.xl, sm: theme.app.fontSize.xxl },
                      minWidth: 0,
                      overflowWrap: 'anywhere'
                    }}
                    variant="h1"
                  >
                    {t('title')}
                  </Typography>
                  <LanguageSwitcher />
                </Stack>
                <Typography color="text.secondary" sx={{ display: { xs: 'none', sm: 'block' }, maxWidth: 720, textWrap: 'pretty' }}>
                  {t('subtitle')}
                </Typography>
              </Stack>
            </Stack>
          </Box>
          <ArtistFilters query={query} />
          <Box sx={{ mt: { xs: 3, md: 4 } }}>{children}</Box>
        </Stack>
      </Container>
    </Box>
  );
};
