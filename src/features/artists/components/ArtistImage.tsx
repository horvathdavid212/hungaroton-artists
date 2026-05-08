'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { useState } from 'react';
import { dictionary } from '@/shared/content/dictionaries';

type ArtistImageProps = {
  imageUrl: string | null;
  name: string;
};

const getFallbackLetter = (name: string) => {
  return name.trim().charAt(0).toUpperCase() || '?';
};

export const ArtistImage = ({ imageUrl, name }: ArtistImageProps) => {
  const [hasImageError, setHasImageError] = useState(false);
  const texts = dictionary.artistResults;
  const shouldShowFallback = !imageUrl || hasImageError;

  return (
    <Box
      sx={{
        alignItems: 'center',
        aspectRatio: '4 / 3',
        bgcolor: 'background.default',
        borderBottom: 1,
        borderColor: 'divider',
        display: 'flex',
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      {shouldShowFallback ? (
        <Box
          aria-label={texts.imageFallbackLabel(name)}
          role="img"
          sx={{
            alignItems: 'center',
            bgcolor: 'secondary.dark',
            borderRadius: '50%',
            color: 'secondary.contrastText',
            display: 'flex',
            height: 72,
            justifyContent: 'center',
            width: 72
          }}
        >
          <Typography component="span" variant="h2">
            {getFallbackLetter(name)}
          </Typography>
        </Box>
      ) : (
        <Image
          alt={texts.imageAlt(name)}
          fill
          onError={() => setHasImageError(true)}
          sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
          src={imageUrl}
          style={{ objectFit: 'cover' }}
        />
      )}
    </Box>
  );
};
