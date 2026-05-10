import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTranslations } from 'next-intl';
import { ArtistImage } from '@/features/artists/components/ArtistImage';
import type { Artist } from '@/features/artists/types/artist';
import { theme } from '@/theme/theme';

type ArtistCardProps = {
  artist: Artist;
};

export const ArtistCard = ({ artist }: ArtistCardProps) => {
  const t = useTranslations('artistResults');

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
          borderColor: theme.palette.primary.main,
          transform: 'translateY(-2px)'
        }
      }}
    >
      <ArtistImage imageUrl={artist.imageUrl} name={artist.name} />
      <CardContent sx={{ flex: 1, p: 2 }}>
        <Stack spacing={1}>
          <Typography
            component="h3"
            sx={{
              fontSize: { xs: theme.app.fontSize.sm, sm: theme.app.fontSize.lg },
              fontWeight: theme.typography.fontWeightBold,
              overflowWrap: 'anywhere'
            }}
          >
            {artist.name}
          </Typography>
          <Typography color="text.secondary" variant="body2">
            {t('albumCount', { count: artist.albumCount })}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};
