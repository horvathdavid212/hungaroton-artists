import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { fetchArtists } from '@/features/artists/api/fetchArtists';
import type { ArtistQuery } from '@/features/artists/types/artist';

type ArtistResultsProps = {
  query: ArtistQuery;
};

export const ArtistResults = async ({ query }: ArtistResultsProps) => {
  const result = await fetchArtists(query);

  if (!result.ok) {
    return (
      <Alert severity="error" variant="outlined">
        <Typography component="p">{result.error.message}</Typography>
        {result.error.devMessage ? (
          <Typography component="p" sx={{ mt: 1 }} variant="body2">
            {result.error.devMessage}
          </Typography>
        ) : null}
      </Alert>
    );
  }

  if (result.data.artists.length === 0) {
    return (
      <Paper sx={{ p: { xs: 3, md: 4 } }} variant="outlined">
        <Typography component="p">No artists found for the current filters.</Typography>
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: { xs: 3, md: 4 } }} variant="outlined">
      <Stack spacing={2}>
        <Typography component="h2" variant="h2">
          {result.data.pagination.totalItems} artists
        </Typography>
        <Typography color="text.secondary">
          Showing page {result.data.pagination.currentPage} of {result.data.pagination.totalPages}.
        </Typography>
        <Box component="ul" sx={{ m: 0, pl: 3 }}>
          {result.data.artists.slice(0, 8).map((artist) => (
            <Typography component="li" key={artist.id}>
              {artist.name} | {artist.albumCount} {artist.albumCount === 1 ? 'album' : 'albums'}
            </Typography>
          ))}
        </Box>
      </Stack>
    </Paper>
  );
};
