'use client';

import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { type SubmitEvent, useState } from 'react';
import type { ArtistQuery } from '@/features/artists/types/artist';
import { updateArtistSearchParamsForSearchSubmit } from '@/features/artists/utils/updateArtistSearchParams';
import { dictionary } from '@/shared/content/dictionaries';

type SearchInputProps = {
  query: ArtistQuery;
};

export const SearchInput = ({ query }: SearchInputProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const texts = dictionary.artistSearch;
  const [searchText, setSearchText] = useState(query.search ?? '');

  const replaceSearchParams = (nextSearchParams: string) => {
    router.replace(`${pathname}?${nextSearchParams}`);
  };

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    replaceSearchParams(updateArtistSearchParamsForSearchSubmit(searchParams, searchText));
  };

  const handleClear = () => {
    setSearchText('');
    // replaceSearchParams(updateArtistSearchParamsForClearSearch(searchParams));
  };

  return (
    <Stack component="form" direction={{ xs: 'column', sm: 'row' }} onSubmit={handleSubmit} spacing={1.5} sx={{ flex: 1, minWidth: { xs: '100%', md: 360 } }}>
      <TextField
        fullWidth
        label={texts.searchLabel}
        onChange={(event) => setSearchText(event.target.value)}
        placeholder={texts.searchPlaceholder}
        size="small"
        slotProps={{
          input: {
            endAdornment:
              searchText || query.search ? (
                <InputAdornment position="end">
                  <IconButton aria-label={texts.clearButton} edge="end" onClick={handleClear} size="small" sx={{ width: '30px', height: '30px' }} type="button">
                    x
                  </IconButton>
                </InputAdornment>
              ) : null
          }
        }}
        value={searchText}
      />
      <Button type="submit" variant="contained">
        {texts.searchButton}
      </Button>
    </Stack>
  );
};
