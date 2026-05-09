import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTranslations } from 'next-intl';
import { RetryButton } from '@/features/artists/components/RetryButton';
import { theme } from '@/theme/theme';

export const ErrorState = () => {
  const t = useTranslations('artistResults');

  return (
    <Alert severity="error" sx={{ borderRadius: theme.app.radius.lg, p: { xs: 2, md: 2.5 } }} variant="outlined">
      <Stack spacing={2} sx={{ maxWidth: 620 }}>
        <Stack spacing={0.75}>
          <Typography component="h2" variant="h2">
            {t('errorTitle')}
          </Typography>
          <Typography component="p">{t('errorDescription')}</Typography>
        </Stack>
        <RetryButton />
      </Stack>
    </Alert>
  );
};
