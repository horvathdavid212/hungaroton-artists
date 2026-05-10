'use client';

import type { SelectChangeEvent } from '@mui/material/Select';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { ARTIST_TYPE_VALUES } from '@/features/artists/constants/artistTypes';
import type { ArtistQuery } from '@/features/artists/types/artist';
import { updateArtistSearchParamsForType } from '@/features/artists/utils/updateArtistSearchParams';
import { FilterSelectField } from '@/shared/components/FilterSelectField';

type ArtistTypeFilterProps = {
  query: ArtistQuery;
};

export const ArtistTypeFilter = ({ query }: ArtistTypeFilterProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const t = useTranslations('artistSearch');
  const options = [
    {
      label: t('allArtistTypesLabel'),
      value: ''
    },
    ...ARTIST_TYPE_VALUES.map((artistType) => ({
      label: t(`artistTypeLabels.${artistType}`),
      value: artistType
    }))
  ];

  const handleTypeChange = (event: SelectChangeEvent) => {
    router.replace(`${pathname}?${updateArtistSearchParamsForType(searchParams, event.target.value)}`);
  };

  return (
    <FilterSelectField
      formControlSx={{
        flexShrink: 0,
        minWidth: { xs: 0, sm: 250 },
        width: '100%'
      }}
      label={t('typeFilterLabel')}
      labelId="artist-type-filter-label"
      onChange={handleTypeChange}
      options={options}
      value={query.type ?? ''}
    />
  );
};
