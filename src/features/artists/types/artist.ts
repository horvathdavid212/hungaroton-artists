export type ArtistType = 'is_composer' | 'is_performer' | 'is_primary';

export type ArtistQuery = {
  page: number;
  search?: string;
  letter?: string;
  type?: ArtistType;
};

export type Artist = {
  id: string | number;
  name: string;
  albumCount: number;
  imageUrl: string | null;
};

export type ArtistsPagination = {
  currentPage: number;
  totalPages: number;
  perPage: number;
  totalItems: number;
};

export type ArtistsResponse = {
  artists: Artist[];
  pagination: ArtistsPagination;
};

export type ArtistsFetchResult =
  | {
      ok: true;
      data: ArtistsResponse;
    }
  | {
      ok: false;
      error: {
        message: string;
        status?: number;
      };
    };

export type RawArtist = {
  id: string | number;
  name: string;
  albumCount: number;
  portrait?: string | null;
};

export type RawArtistsPagination = {
  current_page: number;
  total_pages: number;
  per_page: number;
  total_items: number;
};

export type RawArtistsResponse = {
  data: RawArtist[];
  pagination: RawArtistsPagination;
};
