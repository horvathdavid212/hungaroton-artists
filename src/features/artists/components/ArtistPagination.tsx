'use client';

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import type { ArtistsPagination } from '@/features/artists/types/artist';
import { updateArtistSearchParamsForPagination } from '@/features/artists/utils/updateArtistSearchParams';

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
    <Stack spacing={1.5} sx={{ alignItems: 'center', pt: 1 }}>
      <Typography color="text.secondary" variant="body2">
        {t('page')} {pagination.currentPage}
      </Typography>
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
            gap: 0.5,
            justifyContent: 'center'
          }
        }}
      />
    </Stack>
  );
};
