import Box from '@mui/material/Box';
import type { ReactNode } from 'react';

type ArtistFiltersContentLayoutProps = {
  isStuck: boolean;
  letterFilter: ReactNode;
  searchInput: ReactNode;
  typeFilter: ReactNode;
  resetButton: ReactNode;
};

export const ArtistFiltersContentLayout = ({ isStuck, letterFilter, searchInput, typeFilter, resetButton }: ArtistFiltersContentLayoutProps) => {
  return (
    <Box
      sx={{
        alignItems: 'start',
        display: 'grid',
        gap: { xs: 1.5, md: 2 },
        gridTemplateAreas: {
          xs: `
            "search"
            "type"
            "letters"
            "reset"
          `,
          sm: `
            "search search"
            "type reset"
            "letters letters"
          `,
          md: `
            "search type reset"
            "letters letters letters"
          `
        },
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'minmax(0, 1fr) auto',
          md: 'minmax(360px, 1fr) 240px auto'
        },
        maxWidth: isStuck ? 'lg' : 'none',
        mx: isStuck ? 'auto' : 0,
        px: isStuck ? { xs: 1, sm: 3 } : 0,
        transition: 'padding 150ms ease'
      }}
    >
      <Box sx={{ gridArea: 'search', minWidth: 0 }}>{searchInput}</Box>

      <Box sx={{ gridArea: 'type', minWidth: 0 }}>{typeFilter}</Box>

      <Box
        sx={{
          gridArea: 'reset',
          justifySelf: { xs: 'stretch', sm: 'end' },
          // `&` means the current element, `> *` means its direct children.
          // Make the passed reset button full-width on mobile.
          '& > *': {
            width: { xs: '100%', sm: 'auto' }
          }
        }}
      >
        {resetButton}
      </Box>

      <Box sx={{ gridArea: 'letters', minWidth: 0 }}>{letterFilter}</Box>
    </Box>
  );
};
