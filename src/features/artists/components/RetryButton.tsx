'use client';

import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

export const RetryButton = () => {
  const router = useRouter();
  const t = useTranslations('common');

  return (
    <Button onClick={() => router.refresh()} type="button" variant="contained">
      {t('retry')}
    </Button>
  );
};
