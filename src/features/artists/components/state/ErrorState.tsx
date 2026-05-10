import { useTranslations } from 'next-intl';
import { RetryButton } from '@/features/artists/components/state/RetryButton';
import type { ArtistsFetchResult } from '@/features/artists/types/artist';
import { FeedbackState } from '@/shared/components/FeedbackState';

type ErrorStateProps = {
  result: ArtistsFetchResult;
};

export const ErrorState = ({ result }: ErrorStateProps) => {
  const t = useTranslations('artistResults');

  return (
    <FeedbackState
      action={<RetryButton />}
      description={t('errorDescription')}
      devMessage={!result.ok && result.error.devMessage}
      severity="error"
      title={t('errorTitle')}
    />
  );
};
