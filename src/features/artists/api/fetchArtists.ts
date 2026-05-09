import {
  apiMessageSchema,
  type RawArtist,
  type RawArtistsPagination,
  type RawArtistsResponse,
  rawArtistsResponseSchema
} from '@/features/artists/api/artistApiSchemas';
import { buildArtistApiUrl } from '@/features/artists/api/buildArtistApiUrl';
import type { Artist, ArtistQuery, ArtistsFetchResult, ArtistsPagination, ArtistsResponse } from '@/features/artists/types/artist';
import { sleep } from '@/features/artists/utils/sleep';

const MAX_RETRIES = 2;
const RETRY_DELAY_MS = 250;
const USER_FACING_ERROR_MESSAGE = 'Unable to load artists. Please try again.';
const INVALID_RESPONSE_MESSAGE = 'The artists response was not in the expected format.';

const getDevelopmentMessage = (value: unknown) => {
  const apiMessageResult = apiMessageSchema.safeParse(value);

  if (process.env.NODE_ENV === 'production' || !apiMessageResult.success) {
    return undefined;
  }

  return apiMessageResult.data.message;
};

const parseJsonSafely = async (response: Response): Promise<unknown> => {
  const body = await response.text();

  if (!body) {
    return undefined;
  }

  try {
    return JSON.parse(body) as unknown;
  } catch {
    return undefined;
  }
};

const normalizeImageUrl = (imageUrl: string | null | undefined) => {
  const normalizedImageUrl = imageUrl?.trim();

  return normalizedImageUrl ? normalizedImageUrl : null;
};

const normalizeArtist = (artist: RawArtist): Artist => ({
  id: artist.id,
  name: artist.name,
  albumCount: artist.albumCount ?? 0,
  imageUrl: normalizeImageUrl(artist.portrait)
});

const normalizePagination = (pagination: RawArtistsPagination): ArtistsPagination => ({
  currentPage: pagination.current_page,
  totalPages: pagination.total_pages,
  perPage: pagination.per_page,
  totalItems: pagination.total_items
});

const normalizeArtistsResponse = (rawResponse: RawArtistsResponse): ArtistsResponse => ({
  artists: rawResponse.data.map(normalizeArtist),
  pagination: normalizePagination(rawResponse.pagination)
});

const createErrorResult = (status?: number, json?: unknown): ArtistsFetchResult => {
  const devMessage = getDevelopmentMessage(json);

  return {
    ok: false,
    error: {
      ...(devMessage ? { devMessage } : {}),
      message: USER_FACING_ERROR_MESSAGE,
      status
    }
  };
};

const createInvalidResponseResult = (json?: unknown): ArtistsFetchResult => {
  const devMessage = getDevelopmentMessage(json);

  return {
    ok: false,
    error: {
      ...(devMessage ? { devMessage } : {}),
      message: INVALID_RESPONSE_MESSAGE
    }
  };
};

export const fetchArtists = async (query: ArtistQuery): Promise<ArtistsFetchResult> => {
  const url = buildArtistApiUrl(query);

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt += 1) {
    console.log(`[fetchArtists] attempt ${attempt + 1}/${MAX_RETRIES + 1}`, url);
    try {
      const response = await fetch(url, {
        cache: 'no-store'
      });
      const json = await parseJsonSafely(response);
      const shouldRetry = response.status >= 500;

      if (!response.ok) {
        if (shouldRetry && attempt < MAX_RETRIES) {
          await sleep(RETRY_DELAY_MS);
          continue;
        }

        return createErrorResult(response.status, json);
      }

      const rawResponseResult = rawArtistsResponseSchema.safeParse(json);

      if (!rawResponseResult.success) {
        return createInvalidResponseResult(json);
      }

      return {
        ok: true,
        data: normalizeArtistsResponse(rawResponseResult.data)
      };
    } catch {
      if (attempt < MAX_RETRIES) {
        await sleep(RETRY_DELAY_MS);
        continue;
      }

      return createErrorResult();
    }
  }

  return createErrorResult();
};
