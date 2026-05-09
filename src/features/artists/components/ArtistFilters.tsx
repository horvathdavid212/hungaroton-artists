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

type ArtistFiltersProps = {
  query: ArtistQuery;
};

const FILTER_CONTENT_ID = 'artist-filter-content';

export const ArtistFilters = ({ query }: ArtistFiltersProps) => {
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

      const stickyElement = stickyRef.current;

      if (!stickyElement) {
        return;
      }

      const isFilterStuck = stickyElement.getBoundingClientRect().top <= 0;

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
        sx={(theme) => ({
          alignItems: 'center',
          bgcolor: theme.palette.background.paper,
          border: 1,
          borderColor: theme.palette.divider,
          borderRadius: isStuck ? 0 : 'var(--radius-lg)',
          boxShadow: isStuck ? 'var(--shadow-md)' : 'var(--shadow-sm)',
          display: 'flex',
          justifyContent: 'center',
          ml: isStuck ? 'calc(50% - 50vw)' : 0,
          mr: isStuck ? 'calc(50% - 50vw)' : 0,
          p: 3,
          position: 'relative',
          transition: 'margin 180ms ease, width 180ms ease, border-radius 180ms ease, box-shadow 180ms ease',
          width: isStuck ? '100vw' : '100%'
        })}
      >
        <Stack spacing={shouldShowFilterSummary ? 2 : 0} sx={{ flexGrow: 1, maxWidth: 'lg' }}>
          {shouldShowFilterSummary ? (
            <Stack
              spacing={1.5}
              sx={{
                mx: 'auto',
                maxWidth: 'lg',
                px: { xs: 2, sm: 3 },
                transition: 'padding 180ms ease'
              }}
            >
              <Stack direction="row" spacing={1} sx={{ alignItems: 'center', flexWrap: 'wrap', minWidth: 0 }} useFlexGap>
                <Typography component="h2" sx={{ fontWeight: 700 }} variant="body1">
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
            <Stack spacing={3}>
              <Box
                sx={{
                  display: 'grid',
                  gap: 2,
                  gridTemplateColumns: {
                    xs: '1fr',
                    sm: 'minmax(0, 1fr) auto',
                    md: 'minmax(360px, 1fr) 240px auto'
                  },
                  alignItems: 'center',
                  mx: isStuck ? 'auto' : 0,
                  maxWidth: isStuck ? 'lg' : 'none',
                  px: isStuck ? { xs: 2, sm: 3 } : 0,
                  transition: 'padding 180ms ease'
                }}
              >
                <Box sx={{ gridColumn: { xs: '1', sm: '1 / -1', md: 'auto' }, minWidth: 0 }}>
                  <SearchInput key={searchInputKey} query={query} />
                </Box>
                <ArtistTypeFilter query={query} />
                <Box sx={{ justifySelf: { xs: 'stretch', sm: 'end' } }}>
                  <ResetFiltersButton query={query} />
                </Box>
              </Box>
              <Box sx={{ mx: isStuck ? 'auto' : 0, maxWidth: isStuck ? 'lg' : 'none', px: isStuck ? { xs: 2, sm: 3 } : 0, transition: 'padding 180ms ease' }}>
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
                  size="small"
                  sx={{
                    bgcolor: 'background.paper',
                    border: 1,
                    borderColor: 'divider',
                    color: 'primary.main',
                    height: 40,
                    width: 40,
                    pointerEvents: 'auto',
                    '&:hover': {
                      bgcolor: 'background.paper',
                      borderColor: 'primary.main',
                      color: 'primary.main'
                    }
                  }}
                  type="button"
                >
                  {isExpanded ? <KeyboardArrowUpIcon fontSize="small" /> : <KeyboardArrowDownIcon fontSize="small" />}
                </IconButton>
              </Tooltip>
            </Box>
          ) : null}
        </Stack>
      </Paper>
    </Box>
  );
};
