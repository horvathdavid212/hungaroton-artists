import type { ArtistQuery } from '@/features/artists/types/artist';

const ARTISTS_PER_PAGE = 50;

const getArtistsApiUrl = () => {
  const apiUrl = process.env.ARTISTS_API_URL;

  if (!apiUrl) {
    throw new Error('Missing ARTISTS_API_URL environment variable.');
  }

  return apiUrl;
};

export const buildArtistApiUrl = (query: ArtistQuery) => {
  const url = new URL(getArtistsApiUrl());

  url.searchParams.set('include_image', 'true');
  url.searchParams.set('per_page', String(ARTISTS_PER_PAGE));
  url.searchParams.set('page', String(query.page));

  if (query.search) {
    url.searchParams.set('search', query.search);
  } else if (query.letter) {
    url.searchParams.set('letter', query.letter);
  }

  if (query.type) {
    url.searchParams.set('type', query.type);
  }

  return url.toString();
};
