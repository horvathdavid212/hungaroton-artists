'use client';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import { ArtistTypeFilter } from '@/features/artists/components/ArtistTypeFilter';
import { LetterFilter } from '@/features/artists/components/LetterFilter';
import { ResetFiltersButton } from '@/features/artists/components/ResetFiltersButton';
import { SearchInput } from '@/features/artists/components/SearchInput';
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
  const [isStuck, setIsStuck] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const t = useTranslations('artistSearch');
  const searchInputKey = `${query.search ?? ''}-${query.letter ?? ''}-${query.type ?? ''}-${query.page}`;
  const isFilterContentVisible = !isStuck || isExpanded;
  const shouldShowFilterSummary = isStuck && !isExpanded;
  const toggleButtonLabel = isExpanded ? t('hideFiltersButton') : t('showFiltersButton');
  const activeFilters = [
    query.search
      ? {
          key: 'search',
          label: `${t('activeFilterLabels.search')}: ${query.search}`
        }
      : null,
    query.letter
      ? {
          key: 'letter',
          label: `${t('activeFilterLabels.letter')}: ${query.letter}`
        }
      : null,
    query.type
      ? {
          key: 'type',
          label: `${t('activeFilterLabels.type')}: ${t(`artistTypeLabels.${query.type}`)}`
        }
      : null,
    query.page > 1
      ? {
          key: 'page',
          label: `${t('pageLabel')}: ${query.page}`
        }
      : null
  ].filter((filter): filter is { key: string; label: string } => Boolean(filter));

  useEffect(() => {
    let animationFrame = 0;

    const updateStickyState = () => {
      animationFrame = 0;

      const stickyBoundaryElement = stickyBoundaryRef.current;

      if (!stickyBoundaryElement) {
        return;
      }

      const isFilterStuck = stickyBoundaryElement.getBoundingClientRect().top <= 0;

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
  }, []);

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
            transition: theme.app.transition.stickyPanel,
            width: isStuck ? '100vw' : '100%'
          }}
        >
          <Stack spacing={shouldShowFilterSummary ? 2 : 0} sx={{ flexGrow: 1, maxWidth: 'lg' }}>
            {shouldShowFilterSummary ? (
              <Stack
                spacing={1.5}
                sx={{
                  mx: isStuck ? 'auto' : 0,
                  maxWidth: 'lg',
                  px: { xs: 2, sm: 3 },
                  transition: 'padding 180ms ease'
                }}
              >
                <Stack direction="row" spacing={1} sx={{ alignItems: 'center', flexWrap: 'wrap', minWidth: 0 }} useFlexGap>
                  <Typography component="h2" sx={{ fontWeight: theme.typography.fontWeightBold }} variant="body1">
                    {t('filtersTitle')}
                  </Typography>
                  {activeFilters.length > 0 ? (
                    <Stack aria-label={t('activeFiltersLabel')} direction="row" spacing={0.75} sx={{ flexWrap: 'wrap', minWidth: 0 }} useFlexGap>
                      {activeFilters.map((filter) => (
                        <Chip
                          key={filter.key}
                          label={filter.label}
                          size="small"
                          sx={{
                            maxWidth: { xs: '100%', sm: 260 },
                            '& .MuiChip-label': {
                              overflow: 'hidden',
                              textOverflow: 'ellipsis'
                            }
                          }}
                          variant="outlined"
                        />
                      ))}
                    </Stack>
                  ) : null}
                </Stack>
              </Stack>
            ) : null}
            <Collapse id={FILTER_CONTENT_ID} in={isFilterContentVisible} timeout="auto">
              <Stack spacing={{ xs: 1, md: 3 }}>
                <Box
                  sx={{
                    display: 'grid',
                    gap: { xs: 1.5, md: 2 },
                    gridTemplateColumns: theme.app.gridTemplateColumns.filterControls,
                    alignItems: 'start',
                    mx: isStuck ? 'auto' : 0,
                    maxWidth: isStuck ? 'lg' : 'none',
                    px: isStuck ? { xs: 1, sm: 3 } : 0,
                    transition: 'padding 180ms ease'
                  }}
                >
                  <Box sx={{ gridColumn: { xs: '1 / -1', sm: '1 / -1', md: 'auto' }, minWidth: 0 }}>
                    <SearchInput key={searchInputKey} query={query} />
                  </Box>
                  <Box sx={{ gridColumn: { xs: '1 / -1', sm: 'auto' }, minWidth: 0 }}>
                    <ArtistTypeFilter query={query} />
                  </Box>
                  <Box sx={{ display: { xs: 'block', sm: 'none' }, gridColumn: { xs: '1 / -1', sm: 'auto' }, minWidth: 0 }}>
                    <LetterFilter query={query} />
                  </Box>
                  <Box
                    sx={{
                      gridColumn: { xs: '1 / -1', sm: 'auto' },
                      justifySelf: { xs: 'stretch', sm: 'end' },
                      '& > *': {
                        width: { xs: '100%', sm: 'auto' }
                      }
                    }}
                  >
                    <ResetFiltersButton query={query} />
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: { xs: 'none', sm: 'block' },
                    mx: isStuck ? 'auto' : 0,
                    maxWidth: isStuck ? 'lg' : 'none',
                    px: isStuck ? { xs: 2, sm: 3 } : 0,
                    transition: 'padding 180ms ease'
                  }}
                >
                  <LetterFilter query={query} />
                </Box>
              </Stack>
            </Collapse>
            {isStuck ? (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  left: 0,
                  right: 0,
                  bottom: 0,
                  pointerEvents: 'none',
                  position: 'absolute',
                  transform: 'translateY(50%)'
                }}
              >
                <Tooltip title={toggleButtonLabel}>
                  <IconButton
                    aria-controls={FILTER_CONTENT_ID}
                    aria-expanded={isFilterContentVisible}
                    aria-label={toggleButtonLabel}
                    onClick={() => setIsExpanded((currentValue) => !currentValue)}
                    sx={{
                      color: theme.palette.primary.main,
                      height: 40,
                      width: 40,
                      pointerEvents: 'auto'
                    }}
                    type="button"
                  >
                    {isExpanded ? <KeyboardArrowUpIcon fontSize="medium" /> : <KeyboardArrowDownIcon fontSize="medium" />}
                  </IconButton>
                </Tooltip>
              </Box>
            ) : null}
          </Stack>
        </Paper>
      </Box>
    </>
  );
};
