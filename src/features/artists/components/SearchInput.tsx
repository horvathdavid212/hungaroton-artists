'use client';

import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { type ComponentProps, useState } from 'react';
import type { ArtistQuery } from '@/features/artists/types/artist';
import { updateArtistSearchParamsForClearSearch, updateArtistSearchParamsForSearchSubmit } from '@/features/artists/utils/updateArtistSearchParams';

type SearchInputProps = {
  query: ArtistQuery;
};

export const SearchInput = ({ query }: SearchInputProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const t = useTranslations('artistSearch');
  const [searchText, setSearchText] = useState(query.search ?? '');

  const replaceSearchParams = (nextSearchParams: string) => {
    router.replace(`${pathname}?${nextSearchParams}`);
  };

  const handleSubmit: NonNullable<ComponentProps<'form'>['onSubmit']> = (event) => {
    event.preventDefault();
    replaceSearchParams(updateArtistSearchParamsForSearchSubmit(searchParams, searchText));
  };

  const handleClear = () => {
    setSearchText('');
    replaceSearchParams(updateArtistSearchParamsForClearSearch(searchParams));
  };

  return (
    <Stack
      component="form"
      direction="row"
      onSubmit={handleSubmit}
      spacing={1}
      sx={{
        flex: 1,
        minWidth: { xs: '100%', md: 360 },
        '& .MuiTextField-root': {
          flex: 1,
          minWidth: 0
        }
      }}
    >
      <TextField
        fullWidth
        label={t('searchLabel')}
        onChange={(event) => setSearchText(event.target.value)}
        placeholder={t('searchPlaceholder')}
        size="small"
        slotProps={{
          input: {
            endAdornment:
              searchText || query.search ? (
                <InputAdornment position="end">
                  <IconButton
                    aria-label={t('clearButton')}
                    edge="end"
                    onClick={handleClear}
                    size="small"
                    sx={{
                      height: 30,
                      width: 30
                    }}
                    type="button"
                  >
                    x
                  </IconButton>
                </InputAdornment>
              ) : null
          }
        }}
        value={searchText}
      />
      <Button sx={{ flexShrink: 0, px: { xs: 2, sm: 2.5 } }} type="submit" variant="contained">
        {t('searchButton')}
      </Button>
    </Stack>
  );
};
