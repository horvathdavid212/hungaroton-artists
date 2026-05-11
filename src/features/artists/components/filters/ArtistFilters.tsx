'use client';

import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ArtistFilterSummary } from '@/features/artists/components/filters/ArtistFilterSummary';
import { ArtistFiltersContentLayout } from '@/features/artists/components/filters/ArtistFiltersContentLayout';
import { ArtistFiltersToggleButton } from '@/features/artists/components/filters/ArtistFiltersToggleButton';
import { ArtistTypeFilter } from '@/features/artists/components/filters/ArtistTypeFilter';
import { LetterFilter } from '@/features/artists/components/filters/LetterFilter';
import { ResetFiltersButton } from '@/features/artists/components/filters/ResetFiltersButton';
import { SearchInput } from '@/features/artists/components/filters/SearchInput';
import type { ArtistQuery } from '@/features/artists/types/artist';
import { theme } from '@/theme/theme';

type ArtistFiltersProps = {
  query: ArtistQuery;
};

const FILTER_CONTENT_ID = 'artist-filter-content';

export const ArtistFilters = ({ query }: ArtistFiltersProps) => {
  const stickyBoundaryRef = useRef<HTMLDivElement | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);
  const isStuckRef = useRef(false);
  const isPreservingStickyCollapseRef = useRef(false);
  const stickyStartScrollTopRef = useRef(0);
  const [isStuck, setIsStuck] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const t = useTranslations('artistSearch');
  const searchInputKey = `${query.search ?? ''}-${query.letter ?? ''}-${query.type ?? ''}-${query.page}`;
  const isFilterContentVisible = !isStuck || isExpanded;
  const shouldShowFilterSummary = isStuck && !isExpanded;
  const toggleButtonLabel = isExpanded ? t('hideFiltersButton') : t('showFiltersButton');

  // Closing the sticky panel changes its height; keep the scroll position past the sentinel during that transition.
  const preserveStickyScrollPosition = useCallback(() => {
    const stickyStartScrollTop = stickyStartScrollTopRef.current;

    if (!stickyStartScrollTop) {
      return;
    }

    const nextScrollTop = stickyStartScrollTop + 1;

    if (window.scrollY < nextScrollTop) {
      window.scrollTo({ top: nextScrollTop });
    }
  }, []);

  const handleFilterContentExit = () => {
    const stickyBoundaryElement = stickyBoundaryRef.current;

    if (!stickyBoundaryElement || !isStuckRef.current) {
      return;
    }

    stickyStartScrollTopRef.current = stickyBoundaryElement.getBoundingClientRect().top + window.scrollY;
    isPreservingStickyCollapseRef.current = true;
  };

  const handleFilterContentExited = () => {
    if (!isPreservingStickyCollapseRef.current) {
      return;
    }

    preserveStickyScrollPosition();
    isPreservingStickyCollapseRef.current = false;
  };

  // Tracks when the filter panel reaches the top of the viewport so it can switch into sticky mode.
  // The scroll/resize listener is throttled with requestAnimationFrame to avoid updating state too often.
  useEffect(() => {
    let animationFrame = 0;

    const updateStickyState = () => {
      animationFrame = 0;

      const stickyBoundaryElement = stickyBoundaryRef.current;

      if (!stickyBoundaryElement) {
        return;
      }

      const isFilterStuck = stickyBoundaryElement.getBoundingClientRect().top <= 0;

      if (!isFilterStuck && isPreservingStickyCollapseRef.current) {
        preserveStickyScrollPosition();
        return;
      }

      if (isFilterStuck !== isStuckRef.current) {
        isStuckRef.current = isFilterStuck;
        setIsStuck(isFilterStuck);

        if (!isFilterStuck) {
          setIsExpanded(true);
        }
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
  }, [preserveStickyScrollPosition]);

  return (
    <>
      <Box
        aria-hidden="true"
        ref={stickyBoundaryRef}
        sx={{
          height: 0,
          overflow: 'hidden'
        }}
      />
      <Box
        ref={stickyRef}
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: theme.zIndex.appBar
        }}
      >
        <Paper
          component="section"
          elevation={0}
          sx={{
            alignItems: 'center',
            bgcolor: theme.palette.background.paper,
            border: 1,
            borderColor: theme.palette.divider,
            borderRadius: isStuck ? 0 : theme.app.radius.lg,
            boxShadow: isStuck ? theme.app.shadow.md : theme.app.shadow.sm,
            display: 'flex',
            justifyContent: 'center',
            ml: isStuck ? 'calc(50% - 50vw)' : 0,
            mr: isStuck ? 'calc(50% - 50vw)' : 0,
            p: { xs: 1.5, md: 2 },
            position: 'relative',
            transition: 'margin 150ms ease, width 150ms ease, border-radius 150ms ease, box-shadow 150ms ease',
            width: isStuck ? '100vw' : '100%'
          }}
        >
          <Stack sx={{ flexGrow: 1, maxWidth: 'lg' }}>
            {shouldShowFilterSummary ? (
              <ArtistFilterSummary
                query={query}
                sx={{
                  maxWidth: 'lg',
                  px: { xs: 2, sm: 3 },
                  transition: 'padding 150ms ease'
                }}
              />
            ) : null}
            <Collapse id={FILTER_CONTENT_ID} in={isFilterContentVisible} onExit={handleFilterContentExit} onExited={handleFilterContentExited} timeout="auto">
              <ArtistFiltersContentLayout
                isStuck={isStuck}
                letterFilter={<LetterFilter query={query} />}
                resetButton={<ResetFiltersButton query={query} />}
                searchInput={<SearchInput key={searchInputKey} query={query} />}
                typeFilter={<ArtistTypeFilter query={query} />}
              />
            </Collapse>
            {isStuck ? (
              <ArtistFiltersToggleButton
                ariaControls={FILTER_CONTENT_ID}
                ariaExpanded={isFilterContentVisible}
                isExpanded={isExpanded}
                label={toggleButtonLabel}
                onToggle={() => setIsExpanded((currentValue) => !currentValue)}
              />
            ) : null}
          </Stack>
        </Paper>
      </Box>
    </>
  );
};
