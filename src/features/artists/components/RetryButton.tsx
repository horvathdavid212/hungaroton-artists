'use client';

import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useState, useTransition } from 'react';

export const RetryButton = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const t = useTranslations('common');
  const [pendingRetryToken, setPendingRetryToken] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const currentRetryToken = searchParams.get('_retry');
  const isBusy = isPending || (pendingRetryToken !== null && currentRetryToken !== pendingRetryToken);

  const handleRetry = () => {
    if (isBusy) {
      return;
    }

    const retryToken = String(Date.now());
    const nextSearchParams = new URLSearchParams(searchParams.toString());
    nextSearchParams.set('_retry', retryToken);
    setPendingRetryToken(retryToken);

    startTransition(() => {
      router.replace(`${pathname}?${nextSearchParams.toString()}`, {
        scroll: false
      });
    });
  };

  return (
    <Button disabled={isBusy} onClick={handleRetry} sx={{ gap: 1 }} type="button" variant="contained">
      {t('retry')}
      {isBusy ? <CircularProgress aria-label={t('loading')} color="inherit" size={16} /> : null}
    </Button>
  );
};
