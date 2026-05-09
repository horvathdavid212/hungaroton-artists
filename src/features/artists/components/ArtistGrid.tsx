import Box from '@mui/material/Box';
import { ArtistCard } from '@/features/artists/components/ArtistCard';
import type { Artist } from '@/features/artists/types/artist';

type ArtistGridProps = {
  artists: Artist[];
};

export const ArtistGrid = ({ artists }: ArtistGridProps) => {
  return (
    <Box
      sx={{
        display: 'grid',
        gap: { xs: 2, md: 2.5 },
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, minmax(0, 1fr))',
          md: 'repeat(3, minmax(0, 1fr))',
          lg: 'repeat(4, minmax(0, 1fr))'
        }
      }}
    >
      {artists.map((artist) => (
        <ArtistCard artist={artist} key={artist.id} />
      ))}
    </Box>
  );
};
