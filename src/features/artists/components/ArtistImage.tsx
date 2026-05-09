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
        bgcolor: 'var(--color-surface-muted)',
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
            bgcolor: 'background.paper',
            border: 1,
            borderColor: 'secondary.main',
            borderRadius: '50%',
            boxShadow: 'var(--shadow-sm)',
            color: 'secondary.main',
            display: 'flex',
            height: { xs: 64, md: 72 },
            justifyContent: 'center',
            width: { xs: 64, md: 72 }
          }}
        >
          <Typography component="span" sx={{ fontWeight: 700 }} variant="h2">
            {getFallbackLetter(name)}
          </Typography>
        </Box>
      ) : (
        <Image
          alt={texts.imageAlt(name)}
          fill
          onError={() => setHasImageError(true)}
          sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, (max-width: 1200px) 33vw, 25vw"
          src={imageUrl}
          style={{ objectFit: 'cover' }}
        />
      )}
    </Box>
  );
};
