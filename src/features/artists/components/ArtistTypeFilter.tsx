'use client';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { ARTIST_TYPE_VALUES } from '@/features/artists/constants/artistTypes';
import type { ArtistQuery } from '@/features/artists/types/artist';
import { updateArtistSearchParamsForType } from '@/features/artists/utils/updateArtistSearchParams';

type ArtistTypeFilterProps = {
  query: ArtistQuery;
};

export const ArtistTypeFilter = ({ query }: ArtistTypeFilterProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const t = useTranslations('artistSearch');

  const handleTypeChange = (event: SelectChangeEvent) => {
    router.replace(`${pathname}?${updateArtistSearchParamsForType(searchParams, event.target.value)}`);
  };

  return (
    <FormControl
      size="small"
      sx={{
        flexShrink: 0,
        minWidth: { xs: '100%', sm: 220 }
      }}
    >
      <InputLabel id="artist-type-filter-label">{t('typeFilterLabel')}</InputLabel>
      <Select
        label={t('typeFilterLabel')}
        labelId="artist-type-filter-label"
        MenuProps={{
          disableScrollLock: true
        }}
        onChange={handleTypeChange}
        value={query.type ?? ''}
      >
        <MenuItem value="">{t('allArtistTypesLabel')}</MenuItem>
        {ARTIST_TYPE_VALUES.map((artistType) => (
          <MenuItem key={artistType} value={artistType}>
            {t(`artistTypeLabels.${artistType}`)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
