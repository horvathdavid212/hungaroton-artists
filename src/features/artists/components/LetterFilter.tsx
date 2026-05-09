'use client';

import Box from '@mui/material/Box';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { ARTIST_ALPHABET } from '@/features/artists/constants/alphabet';
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

  const handleLetterChange = (_event: React.MouseEvent<HTMLElement>, nextLetter: string | null) => {
    router.replace(`${pathname}?${updateArtistSearchParamsForLetter(searchParams, nextLetter ?? '')}`);
  };

  return (
    <Box>
      <Typography component="h2" gutterBottom sx={{ fontWeight: 700 }} variant="body2">
        {t('letterFilterLabel')}
      </Typography>
      <ToggleButtonGroup
        aria-label={t('letterFilterLabel')}
        exclusive
        onChange={handleLetterChange}
        size="small"
        sx={{
          display: 'flex',
          flexWrap: 'wrap'
        }}
        value={query.letter ?? null}
      >
        {ARTIST_ALPHABET.map((letter) => (
          <ToggleButton
            aria-label={`${t('letterFilterLabel')}: ${letter}`}
            key={letter}
            sx={{
              border: 1,
              borderColor: 'divider',
              flex: { xs: '1 0 40px', sm: '0 0 40px' },
              minWidth: 40
            }}
            value={letter}
          >
            {letter}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Box>
  );
};
