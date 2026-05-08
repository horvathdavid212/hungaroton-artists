'use client';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ARTIST_TYPE_VALUES } from '@/features/artists/constants/artistTypes';
import type { ArtistQuery } from '@/features/artists/types/artist';
import { updateArtistSearchParamsForType } from '@/features/artists/utils/updateArtistSearchParams';
import { dictionary } from '@/shared/content/dictionaries';

type ArtistTypeFilterProps = {
  query: ArtistQuery;
};

export const ArtistTypeFilter = ({ query }: ArtistTypeFilterProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const texts = dictionary.artistSearch;

  const handleTypeChange = (event: SelectChangeEvent) => {
    router.replace(`${pathname}?${updateArtistSearchParamsForType(searchParams, event.target.value)}`);
  };

  return (
    <FormControl size="small" sx={{ minWidth: { xs: '100%', sm: 220 } }}>
      <InputLabel id="artist-type-filter-label">{texts.typeFilterLabel}</InputLabel>
      <Select label={texts.typeFilterLabel} labelId="artist-type-filter-label" onChange={handleTypeChange} value={query.type ?? ''}>
        <MenuItem value="">{texts.allArtistTypesLabel}</MenuItem>
        {ARTIST_TYPE_VALUES.map((artistType) => (
          <MenuItem key={artistType} value={artistType}>
            {texts.artistTypeLabels[artistType]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
