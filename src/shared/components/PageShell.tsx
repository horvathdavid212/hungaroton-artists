import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { ReactNode } from 'react';
import { LanguageSwitcher } from '@/shared/components/LanguageSwitcher';
import { theme } from '@/theme/theme';

type PageShellProps = {
  children: ReactNode;
  subtitle?: ReactNode;
  title: ReactNode;
};

export const PageShell = ({ children, subtitle, title }: PageShellProps) => {
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
              <Stack direction="row" spacing={1} sx={{ alignItems: 'center', justifyContent: 'space-between', minWidth: 0 }}>
                <Stack spacing={1} sx={{ flex: 1, minWidth: 0 }}>
                  <Typography
                    component="h1"
                    sx={{
                      fontSize: { xs: theme.app.fontSize.xl, sm: theme.app.fontSize.xxl },
                      overflowWrap: 'anywhere'
                    }}
                    variant="h1"
                  >
                    {title}
                  </Typography>
                  {subtitle ? (
                    <Typography color="text.secondary" sx={{ display: { xs: 'none', sm: 'block' }, maxWidth: 720, textWrap: 'pretty' }}>
                      {subtitle}
                    </Typography>
                  ) : null}
                </Stack>
                <Box sx={{ flexShrink: 0 }}>
                  <LanguageSwitcher />
                </Box>
              </Stack>
            </Stack>
          </Box>
          {children}
        </Stack>
      </Container>
    </Box>
  );
};
