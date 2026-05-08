'use client';

import Box from '@mui/material/Box';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ARTIST_ALPHABET } from '@/features/artists/constants/alphabet';
import type { ArtistQuery } from '@/features/artists/types/artist';
import { updateArtistSearchParamsForLetter } from '@/features/artists/utils/updateArtistSearchParams';
import { dictionary } from '@/shared/content/dictionaries';

type LetterFilterProps = {
  query: ArtistQuery;
};

export const LetterFilter = ({ query }: LetterFilterProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const texts = dictionary.artistSearch;

  const handleLetterChange = (_event: React.MouseEvent<HTMLElement>, nextLetter: string | null) => {
    router.replace(`${pathname}?${updateArtistSearchParamsForLetter(searchParams, nextLetter ?? '')}`);
  };

  return (
    <Box>
      <Typography component="h2" gutterBottom variant="body2">
        {texts.letterFilterLabel}
      </Typography>
      <ToggleButtonGroup
        aria-label={texts.letterFilterLabel}
        exclusive
        onChange={handleLetterChange}
        size="small"
        sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}
        value={query.letter ?? null}
      >
        {ARTIST_ALPHABET.map((letter) => (
          <ToggleButton
            aria-label={`${texts.letterFilterLabel}: ${letter}`}
            key={letter}
            sx={{ border: 1, borderColor: 'divider', borderRadius: 1, minWidth: 40 }}
            value={letter}
          >
            {letter}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Box>
  );
};
