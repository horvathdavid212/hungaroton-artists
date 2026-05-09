'use client';

import Box from '@mui/material/Box';
import ToggleButton from '@mui/material/ToggleButton';
import Typography from '@mui/material/Typography';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import type { MouseEvent } from 'react';
import { ARTIST_ALPHABET, type ArtistAlphabetLetter } from '@/features/artists/constants/alphabet';
import type { ArtistQuery } from '@/features/artists/types/artist';
import { updateArtistSearchParamsForLetter } from '@/features/artists/utils/updateArtistSearchParams';

type LetterFilterProps = {
  query: ArtistQuery;
};

export const LetterFilter = ({ query }: LetterFilterProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const t = useTranslations('artistSearch');

  const handleLetterClick = (_event: MouseEvent<HTMLElement>, letter: ArtistAlphabetLetter) => {
    const nextLetter = query.letter === letter ? '' : letter;
    const nextSearchParams = updateArtistSearchParamsForLetter(searchParams, nextLetter);

    router.replace(`${pathname}?${nextSearchParams}`);
  };

  return (
    <Box aria-labelledby="letter-filter-title" component="section">
      <Typography component="h2" gutterBottom id="letter-filter-title" sx={{ fontWeight: 700 }} variant="body2">
        {t('letterFilterLabel')}
      </Typography>

      <Box
        aria-labelledby="letter-filter-title"
        role="group"
        sx={{
          display: 'grid',
          gap: 0.3,
          gridTemplateColumns: {
            xs: 'repeat(auto-fit, minmax(40px, 1fr))',
            sm: 'repeat(auto-fill, minmax(40px, 40px))'
          }
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
                borderColor: 'divider',
                borderRadius: 'var(--radius-sm)',
                fontWeight: isSelected ? 700 : 500,
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
