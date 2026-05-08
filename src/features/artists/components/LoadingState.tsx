import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export const LoadingState = () => {
  return (
    <Paper sx={{ p: { xs: 3, md: 4 } }} variant="outlined">
      <Stack spacing={2}>
        <Skeleton height={32} variant="rounded" width="40%" />
        <Skeleton height={24} variant="rounded" width="70%" />
        <Skeleton height={24} variant="rounded" width="65%" />
        <Skeleton height={24} variant="rounded" width="60%" />
      </Stack>
    </Paper>
  );
};
