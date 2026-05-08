'use client';

import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation';
import { dictionary } from '@/shared/content/dictionaries';

export const RetryButton = () => {
  const router = useRouter();
  const texts = dictionary.common;

  return (
    <Button onClick={() => router.refresh()} type="button" variant="contained">
      {texts.retry}
    </Button>
  );
};
