'use client';

import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import type { SelectChangeEvent } from '@mui/material/Select';
import Select from '@mui/material/Select';
import ToggleButton from '@mui/material/ToggleButton';
import Typography from '@mui/material/Typography';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import type { MouseEvent } from 'react';
import { ARTIST_ALPHABET, type ArtistAlphabetLetter } from '@/features/artists/constants/alphabet';
import type { ArtistQuery } from '@/features/artists/types/artist';
import { updateArtistSearchParamsForLetter } from '@/features/artists/utils/updateArtistSearchParams';
import { theme } from '@/theme/theme';

type LetterFilterProps = {
  query: ArtistQuery;
};

export const LetterFilter = ({ query }: LetterFilterProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const t = useTranslations('artistSearch');

  const updateLetter = (letter: string) => {
    const nextSearchParams = updateArtistSearchParamsForLetter(searchParams, letter);

    router.replace(`${pathname}?${nextSearchParams}`);
  };

  const handleLetterClick = (_event: MouseEvent<HTMLElement>, letter: ArtistAlphabetLetter) => {
    const nextLetter = query.letter === letter ? '' : letter;

    updateLetter(nextLetter);
  };

  const handleLetterSelectChange = (event: SelectChangeEvent<string>) => {
    updateLetter(event.target.value);
  };

  return (
    <Box aria-labelledby="letter-filter-title" component="section">
      <Typography
        component="h2"
        gutterBottom
        id="letter-filter-title"
        sx={{ display: { xs: 'none', sm: 'block' }, fontWeight: theme.typography.fontWeightBold }}
        variant="body2"
      >
        {t('letterFilterLabel')}
      </Typography>

      <FormControl size="small" sx={{ display: { xs: 'block', sm: 'none' }, width: '100%' }}>
        <InputLabel id="letter-filter-mobile-label">{t('letterFilterLabel')}</InputLabel>
        <Select
          fullWidth
          label={t('letterFilterLabel')}
          labelId="letter-filter-mobile-label"
          MenuProps={{
            disableScrollLock: true
          }}
          onChange={handleLetterSelectChange}
          sx={{ bgcolor: theme.palette.background.paper }}
          value={query.letter ?? ''}
        >
          <MenuItem value="">{t('allLettersLabel')}</MenuItem>
          {ARTIST_ALPHABET.map((letter) => (
            <MenuItem key={letter} value={letter}>
              {letter}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box
        aria-labelledby="letter-filter-title"
        role="group"
        sx={{
          display: { xs: 'none', sm: 'grid' },
          gap: 0.3,
          gridTemplateColumns: theme.app.gridTemplateColumns.letterFilter
        }}
      >
        {ARTIST_ALPHABET.map((letter) => {
          const isSelected = query.letter === letter;

          return (
            <ToggleButton
              aria-label={`${t('letterFilterLabel')}: ${letter}`}
              key={letter}
              onClick={(event) => handleLetterClick(event, letter)}
              selected={isSelected}
              sx={{
                border: 1,
                borderColor: theme.palette.divider,
                borderRadius: theme.app.radius.sm,
                fontWeight: isSelected ? theme.typography.fontWeightBold : theme.typography.fontWeightMedium,
                height: 40,
                minWidth: 40,
                px: 1
              }}
              value={letter}
            >
              {letter}
            </ToggleButton>
          );
        })}
      </Box>
    </Box>
  );
};
