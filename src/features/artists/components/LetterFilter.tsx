'use client';

import Box from '@mui/material/Box';
import type { SelectChangeEvent } from '@mui/material/Select';
import ToggleButton from '@mui/material/ToggleButton';
import Typography from '@mui/material/Typography';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import type { MouseEvent } from 'react';
import { ARTIST_ALPHABET, type ArtistAlphabetLetter } from '@/features/artists/constants/alphabet';
import type { ArtistQuery } from '@/features/artists/types/artist';
import { updateArtistSearchParamsForLetter } from '@/features/artists/utils/updateArtistSearchParams';
import { FilterSelectField } from '@/shared/components/FilterSelectField';
import { theme } from '@/theme/theme';

type LetterFilterProps = {
  query: ArtistQuery;
};

export const LetterFilter = ({ query }: LetterFilterProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const t = useTranslations('artistSearch');
  const mobileOptions = [
    {
      label: t('allLettersLabel'),
      value: ''
    },
    ...ARTIST_ALPHABET.map((letter) => ({
      label: letter,
      value: letter
    }))
  ];

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

      <FilterSelectField
        formControlSx={{ display: { xs: 'block', sm: 'none' }, width: '100%' }}
        label={t('letterFilterLabel')}
        labelId="letter-filter-mobile-label"
        onChange={handleLetterSelectChange}
        options={mobileOptions}
        value={query.letter ?? ''}
      />

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
