'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { theme } from '@/theme/theme';

type ArtistImageProps = {
  imageUrl: string | null;
  name: string;
};

const getFallbackLetter = (name: string) => {
  return name.trim().charAt(0).toUpperCase() || '?';
};

export const ArtistImage = ({ imageUrl, name }: ArtistImageProps) => {
  const [hasImageError, setHasImageError] = useState(false);
  const t = useTranslations('artistResults');
  const shouldShowFallback = !imageUrl || hasImageError;

  return (
    <Box
      sx={{
        alignItems: 'center',
        aspectRatio: '4 / 3',
        bgcolor: theme.app.color.surfaceMuted,
        borderBottom: 1,
        borderColor: theme.palette.divider,
        display: 'flex',
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      {shouldShowFallback ? (
        <Box
          aria-label={t('imageFallbackLabel', { name })}
          role="img"
          sx={{
            alignItems: 'center',
            bgcolor: theme.palette.background.paper,
            border: 1,
            borderColor: theme.palette.secondary.main,
            borderRadius: '50%',
            boxShadow: theme.app.shadow.sm,
            color: theme.palette.secondary.main,
            display: 'flex',
            height: { xs: 64, md: 72 },
            justifyContent: 'center',
            width: { xs: 64, md: 72 }
          }}
        >
          <Typography component="span" sx={{ fontWeight: theme.typography.fontWeightBold }} variant="h2">
            {getFallbackLetter(name)}
          </Typography>
        </Box>
      ) : (
        <Image
          alt={t('imageAlt', { name })}
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
