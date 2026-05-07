import type { ArtistQuery } from '@/features/artists/types/artist';
import {
  type ArtistSearchParamsInput,
  isArtistType,
  normalizeArtistLetter,
  normalizeSearch,
  parseArtistSearchParams
} from '@/features/artists/utils/parseArtistSearchParams';

const FIRST_PAGE = 1;

// Keeps pagination updates inside the API-supported page range.
const normalizePage = (page: number) => {
  if (!Number.isInteger(page) || page < FIRST_PAGE) {
    return FIRST_PAGE;
  }

  return page;
};

// Treats empty or unsupported type values as a cleared type filter.
const normalizeType = (type: string | null | undefined) => {
  if (!type || !isArtistType(type)) {
    return undefined;
  }

  return type;
};

// Serializes a normalized query while omitting empty filters.
export const stringifyArtistSearchParams = (query: ArtistQuery) => {
  const searchParams = new URLSearchParams();

  searchParams.set('page', String(normalizePage(query.page)));

  if (query.search) {
    searchParams.set('search', query.search);
  } else if (query.letter) {
    searchParams.set('letter', query.letter);
  }

  if (query.type) {
    searchParams.set('type', query.type);
  }

  return searchParams.toString();
};

// Builds the URL query for explicit search submissions and clears letter filtering.
export const updateArtistSearchParamsForSearchSubmit = (searchParams: ArtistSearchParamsInput, search: string) => {
  const currentQuery = parseArtistSearchParams(searchParams);
  const nextSearch = normalizeSearch(search);

  return stringifyArtistSearchParams({
    page: FIRST_PAGE,
    search: nextSearch,
    type: currentQuery.type
  });
};

// Removes the search filter while preserving other valid filters.
export const updateArtistSearchParamsForClearSearch = (searchParams: ArtistSearchParamsInput) => {
  const currentQuery = parseArtistSearchParams(searchParams);

  return stringifyArtistSearchParams({
    page: FIRST_PAGE,
    type: currentQuery.type
  });
};

// Applies a letter filter and clears search because search has priority.
export const updateArtistSearchParamsForLetter = (searchParams: ArtistSearchParamsInput, letter: string) => {
  const currentQuery = parseArtistSearchParams(searchParams);
  const nextLetter = normalizeArtistLetter(letter);

  return stringifyArtistSearchParams({
    page: FIRST_PAGE,
    letter: nextLetter,
    type: currentQuery.type
  });
};

// Applies or clears the artist type filter while preserving search or letter filters.
export const updateArtistSearchParamsForType = (searchParams: ArtistSearchParamsInput, type: string | null | undefined) => {
  const currentQuery = parseArtistSearchParams(searchParams);

  return stringifyArtistSearchParams({
    ...currentQuery,
    page: FIRST_PAGE,
    type: normalizeType(type)
  });
};

// Clears all filters and returns to the first page.
export const updateArtistSearchParamsForReset = () => {
  return stringifyArtistSearchParams({
    page: FIRST_PAGE
  });
};

// Changes only the page while preserving the current valid filters.
export const updateArtistSearchParamsForPagination = (searchParams: ArtistSearchParamsInput, page: number) => {
  const currentQuery = parseArtistSearchParams(searchParams);

  return stringifyArtistSearchParams({
    ...currentQuery,
    page: normalizePage(page)
  });
};
