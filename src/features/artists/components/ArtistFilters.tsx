'use client';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { useEffect, useRef, useState } from 'react';
import { ArtistTypeFilter } from '@/features/artists/components/ArtistTypeFilter';
import { LetterFilter } from '@/features/artists/components/LetterFilter';
import { ResetFiltersButton } from '@/features/artists/components/ResetFiltersButton';
import { SearchInput } from '@/features/artists/components/SearchInput';
import type { ArtistQuery } from '@/features/artists/types/artist';

type ArtistFiltersProps = {
  query: ArtistQuery;
};

export const ArtistFilters = ({ query }: ArtistFiltersProps) => {
  const stickyRef = useRef<HTMLDivElement | null>(null);
  const isStuckRef = useRef(false);
  const [isStuck, setIsStuck] = useState(false);
  const searchInputKey = `${query.search ?? ''}-${query.letter ?? ''}-${query.type ?? ''}-${query.page}`;

  useEffect(() => {
    let animationFrame = 0;

    const updateStickyState = () => {
      animationFrame = 0;

      const stickyElement = stickyRef.current;

      if (!stickyElement) {
        return;
      }

      const isFilterStuck = stickyElement.getBoundingClientRect().top <= 0;

      if (isFilterStuck !== isStuckRef.current) {
        isStuckRef.current = isFilterStuck;
        setIsStuck(isFilterStuck);
      }
    };

    const requestStickyStateUpdate = () => {
      if (animationFrame) {
        return;
      }

      animationFrame = window.requestAnimationFrame(updateStickyState);
    };

    requestStickyStateUpdate();
    window.addEventListener('resize', requestStickyStateUpdate);
    window.addEventListener('scroll', requestStickyStateUpdate, { passive: true });

    return () => {
      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
      }

      window.removeEventListener('resize', requestStickyStateUpdate);
      window.removeEventListener('scroll', requestStickyStateUpdate);
    };
  }, []);

  return (
    <Box
      ref={stickyRef}
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 10
      }}
    >
      <Paper
        component="section"
        elevation={0}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          border: 1,
          borderColor: 'divider',
          borderRadius: isStuck ? 0 : 'var(--radius-lg)',
          boxShadow: isStuck ? 'var(--shadow-md)' : 'var(--shadow-sm)',
          ml: isStuck ? 'calc(50% - 50vw)' : 0,
          mr: isStuck ? 'calc(50% - 50vw)' : 0,
          p: { xs: 2, md: 3 },
          transition: 'margin 180ms ease, width 180ms ease, border-radius 180ms ease, box-shadow 180ms ease',
          width: isStuck ? '100vw' : '100%'
        }}
      >
        <Stack spacing={2} sx={{flexGrow: 1, maxWidth:"lg" }}>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={2}
            sx={{
              alignItems: { xs: 'stretch', md: 'center' },
              mx: isStuck ? 'auto' : 0,
              maxWidth: isStuck ? 'lg' : 'none',
              px: isStuck ? { xs: 2, sm: 3 } : 0,
              transition: 'padding 180ms ease'
            }}
          >
            <SearchInput key={searchInputKey} query={query} />
            <ArtistTypeFilter query={query} />
            <ResetFiltersButton query={query} />
          </Stack>
          <Box sx={{ mx: isStuck ? 'auto' : 0, maxWidth: isStuck ? 'lg' : 'none', px: isStuck ? { xs: 2, sm: 3 } : 0, transition: 'padding 180ms ease' }}>
            <LetterFilter query={query} />
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
};
