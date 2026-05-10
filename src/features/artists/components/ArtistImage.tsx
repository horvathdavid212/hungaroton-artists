'use client';

import ImageNotSupportedOutlinedIcon from '@mui/icons-material/ImageNotSupportedOutlined';
import Box from '@mui/material/Box';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { theme } from '@/theme/theme';

type ArtistImageProps = {
  imageUrl: string | null;
  name: string;
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
            bgcolor: theme.palette.background.paper,
            border: 1,
            borderColor: theme.palette.primary.main,
            borderRadius: '50%',
            boxShadow: theme.app.shadow.sm,
            color: theme.palette.primary.main,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 50,
            width: 50
          }}
        >
          <ImageNotSupportedOutlinedIcon sx={{ fontSize: 32 }} />
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
