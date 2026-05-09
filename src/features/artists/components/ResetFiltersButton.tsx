'use client';

import Button from '@mui/material/Button';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import type { ArtistQuery } from '@/features/artists/types/artist';
import { updateArtistSearchParamsForReset } from '@/features/artists/utils/updateArtistSearchParams';

type ResetFiltersButtonProps = {
  query: ArtistQuery;
};

export const ResetFiltersButton = ({ query }: ResetFiltersButtonProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('artistSearch');
  const hasActiveState = Boolean(query.search || query.letter || query.type || query.page > 1);

  const handleReset = () => {
    router.replace(`${pathname}?${updateArtistSearchParamsForReset()}`);
  };

  return (
    <Button disabled={!hasActiveState} onClick={handleReset} sx={{ flexShrink: 0 }} type="button" variant="text">
      {t('resetFiltersButton')}
    </Button>
  );
};
