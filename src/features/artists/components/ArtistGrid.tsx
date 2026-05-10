import Box from '@mui/material/Box';
import { ArtistCard } from '@/features/artists/components/ArtistCard';
import type { Artist } from '@/features/artists/types/artist';
import { theme } from '@/theme/theme';

type ArtistGridProps = {
  artists: Artist[];
};

export const ArtistGrid = ({ artists }: ArtistGridProps) => {
  return (
    <Box
      sx={{
        display: 'grid',
        gap: 2,
        gridTemplateColumns: theme.app.gridTemplateColumns.artistCards
      }}
    >
      {artists.map((artist) => (
        <ArtistCard artist={artist} key={artist.id} />
      ))}
    </Box>
  );
};
