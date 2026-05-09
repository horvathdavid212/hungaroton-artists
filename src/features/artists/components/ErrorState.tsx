import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { RetryButton } from '@/features/artists/components/RetryButton';
import { dictionary } from '@/shared/content/dictionaries';

export const ErrorState = () => {
  const texts = dictionary.artistResults;

  return (
    <Alert severity="error" sx={{ borderRadius: 'var(--radius-lg)', p: { xs: 2, md: 2.5 } }} variant="outlined">
      <Stack spacing={2} sx={{ maxWidth: 620 }}>
        <Stack spacing={0.75}>
          <Typography component="h2" variant="h2">
            {texts.errorTitle}
          </Typography>
          <Typography component="p">{texts.errorDescription}</Typography>
        </Stack>
        <RetryButton />
      </Stack>
    </Alert>
  );
};
