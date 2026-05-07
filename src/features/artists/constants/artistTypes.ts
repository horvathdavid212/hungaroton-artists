import type { ArtistType } from '@/features/artists/types/artist';

export type ArtistTypeOption = {
  value: ArtistType;
  label: string;
};

export const ARTIST_TYPES: readonly ArtistTypeOption[] = [
  {
    value: 'is_composer',
    label: 'Composers'
  },
  {
    value: 'is_performer',
    label: 'Performers'
  },
  {
    value: 'is_primary',
    label: 'Primary artists'
  }
];

export const ARTIST_TYPE_VALUES = ARTIST_TYPES.map((artistType) => artistType.value);
