import Box from '@mui/material/Box';
import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';
import { ArtistFilters } from '@/features/artists/components/ArtistFilters';
import type { ArtistQuery } from '@/features/artists/types/artist';
import { PageShell } from '@/shared/components/PageShell';

type ArtistPageShellProps = {
  children: ReactNode;
  query: ArtistQuery;
};

export const ArtistPageShell = ({ children, query }: ArtistPageShellProps) => {
  const t = useTranslations('artistSearch');
  return (
    <PageShell subtitle={t('subtitle')} title={t('title')}>
      <ArtistFilters query={query} />
      <Box sx={{ mt: { xs: 3, md: 4 } }}>{children}</Box>
    </PageShell>
  );
};
