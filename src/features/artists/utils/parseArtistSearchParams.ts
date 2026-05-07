import { ARTIST_ALPHABET } from '@/features/artists/constants/alphabet';
import { ARTIST_TYPE_VALUES } from '@/features/artists/constants/artistTypes';
import type { ArtistQuery, ArtistType } from '@/features/artists/types/artist';

export type ArtistSearchParamsInput =
  | Record<string, string | string[] | undefined>
  | {
      get: (name: string) => string | null;
    };

const DEFAULT_PAGE = 1;
const SUPPORTED_LETTERS = new Set<string>(ARTIST_ALPHABET);

// Detects URLSearchParams-like inputs used by Next client hooks.
const isSearchParamsReader = (searchParams: ArtistSearchParamsInput): searchParams is { get: (name: string) => string | null } => {
  const candidate = searchParams as { get?: unknown };

  return typeof candidate.get === 'function';
};

// Reads a single query value from either object records or URLSearchParams-like inputs.
const readSearchParam = (searchParams: ArtistSearchParamsInput, key: string) => {
  if (isSearchParamsReader(searchParams)) {
    return searchParams.get(key) ?? undefined;
  }

  const value = searchParams[key];

  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
};

// Converts invalid, missing, or non-positive page values to the first page.
const parsePage = (value: string | undefined) => {
  if (!value) {
    return DEFAULT_PAGE;
  }

  const page = Number(value);

  if (!Number.isInteger(page) || page < DEFAULT_PAGE) {
    return DEFAULT_PAGE;
  }

  return page;
};

// Trims search text and drops empty values.
export const normalizeSearch = (search: string | undefined) => {
  const normalizedSearch = search?.trim();

  return normalizedSearch ? normalizedSearch : undefined;
};

// Normalizes letters before checking them against the supported alphabet.
export const normalizeArtistLetter = (letter: string | undefined) => {
  const normalizedLetter = letter?.trim().toUpperCase();

  if (!normalizedLetter || !SUPPORTED_LETTERS.has(normalizedLetter)) {
    return undefined;
  }

  return normalizedLetter;
};

// Narrows arbitrary strings to the API-supported artist type values.
export const isArtistType = (value: string): value is ArtistType => (ARTIST_TYPE_VALUES as readonly string[]).includes(value);

// Drops missing or unsupported artist type filters.
const parseType = (value: string | undefined) => {
  if (!value || !isArtistType(value)) {
    return undefined;
  }

  return value;
};

// Produces the normalized query object used by the page, API layer, and URL helpers.
export const parseArtistSearchParams = (searchParams: ArtistSearchParamsInput): ArtistQuery => {
  const query: ArtistQuery = {
    page: parsePage(readSearchParam(searchParams, 'page'))
  };

  const search = normalizeSearch(readSearchParam(searchParams, 'search'));
  const letter = normalizeArtistLetter(readSearchParam(searchParams, 'letter'));
  const type = parseType(readSearchParam(searchParams, 'type'));

  if (search) {
    query.search = search;
  } else if (letter) {
    query.letter = letter;
  }

  if (type) {
    query.type = type;
  }

  return query;
};
