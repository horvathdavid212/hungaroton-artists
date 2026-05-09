'use client';

import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import type { ArtistsPagination } from '@/features/artists/types/artist';
import { updateArtistSearchParamsForPagination } from '@/features/artists/utils/updateArtistSearchParams';
import { theme } from '@/theme/theme';

type ArtistPaginationProps = {
  pagination: ArtistsPagination;
};

export const ArtistPagination = ({ pagination }: ArtistPaginationProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const t = useTranslations('pagination');

  if (pagination.totalPages <= 1) {
    return null;
  }

  const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
    router.push(`${pathname}?${updateArtistSearchParamsForPagination(searchParams, page)}`);
  };

  return (
    <Box
      sx={{
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        maxWidth: '100%',
        pb: 'max(env(safe-area-inset-bottom), 8px)',
        position: 'sticky',
        width: '100%',
        zIndex: theme.zIndex.appBar - 1
      }}
    >
      <Paper
        elevation={0}
        sx={{
          bgcolor: theme.palette.background.paper,
          border: 1,
          borderColor: theme.palette.divider,
          borderRadius: theme.app.radius.lg,
          boxShadow: theme.app.shadow.md,
          maxWidth: '100%',
          p: 1
        }}
      >
        <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ alignItems: 'center', justifyContent: 'center' }}>
          <Pagination
            color="primary"
            count={pagination.totalPages}
            getItemAriaLabel={(type, page) => {
              if (type === 'previous') {
                return t('previous');
              }

              if (type === 'next') {
                return t('next');
              }

              return `${t('page')} ${page}`;
            }}
            onChange={handlePageChange}
            page={pagination.currentPage}
            shape="rounded"
            siblingCount={0}
            sx={{
              '& .MuiPagination-ul': {
                flexWrap: 'wrap',
                gap: 0,
                justifyContent: 'center'
              }
            }}
          />
        </Stack>
      </Paper>
    </Box>
  );
};
