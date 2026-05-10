'use client';

import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useTransition } from 'react';

export const RetryButton = () => {
  const router = useRouter();
  const t = useTranslations('common');
  const [isPending, startTransition] = useTransition();

  const handleRetry = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <Button
      disabled={isPending}
      onClick={handleRetry}
      startIcon={isPending ? <CircularProgress color="inherit" size={16} /> : undefined}
      type="button"
      variant="contained"
    >
      {t('retry')}
    </Button>
  );
};
