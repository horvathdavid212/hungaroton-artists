import { useTranslations } from 'next-intl';
import { ResetFiltersButton } from '@/features/artists/components/ResetFiltersButton';
import type { ArtistQuery } from '@/features/artists/types/artist';
import { FeedbackState } from '@/shared/components/FeedbackState';

type EmptyStateProps = {
  query: ArtistQuery;
};

export const EmptyState = ({ query }: EmptyStateProps) => {
  const t = useTranslations('artistResults');

  return <FeedbackState action={<ResetFiltersButton query={query} />} description={t('emptyDescription')} title={t('emptyTitle')} />;
};
