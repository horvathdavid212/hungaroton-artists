import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ArtistImage } from '@/features/artists/components/ArtistImage';
import type { Artist } from '@/features/artists/types/artist';
import { dictionary } from '@/shared/content/dictionaries';

type ArtistCardProps = {
  artist: Artist;
};

export const ArtistCard = ({ artist }: ArtistCardProps) => {
  const texts = dictionary.artistResults;

  return (
    <Card
      component="article"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflow: 'hidden',
        transition: 'border-color 160ms ease, transform 160ms ease',
        '&:hover': {
          borderColor: 'primary.main',
          transform: 'translateY(-2px)'
        }
      }}
    >
      <ArtistImage imageUrl={artist.imageUrl} name={artist.name} />
      <CardContent sx={{ flex: 1, p: { xs: 2, md: 2.25 } }}>
        <Stack spacing={1}>
          <Typography
            component="h3"
            sx={{
              fontSize: 'var(--font-size-lg)',
              fontWeight: 700,
              lineHeight: 1.25,
              overflowWrap: 'anywhere'
            }}
          >
            {artist.name}
          </Typography>
          <Typography color="text.secondary" variant="body2">
            {texts.albumCount(artist.albumCount)}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};
