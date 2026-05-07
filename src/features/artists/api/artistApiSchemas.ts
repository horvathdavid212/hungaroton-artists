import { z } from 'zod';

export const rawArtistSchema = z.object({
  id: z.union([z.string(), z.number()]),
  name: z.string(),
  albumCount: z.number().nullish(),
  portrait: z.string().nullish()
});

export const rawArtistsPaginationSchema = z.object({
  current_page: z.number(),
  total_pages: z.number(),
  per_page: z.number(),
  total_items: z.number()
});

export const rawArtistsResponseSchema = z.object({
  data: z.array(rawArtistSchema),
  pagination: rawArtistsPaginationSchema
});

export const apiMessageSchema = z.object({
  message: z.string()
});

export type RawArtist = z.infer<typeof rawArtistSchema>;
export type RawArtistsPagination = z.infer<typeof rawArtistsPaginationSchema>;
export type RawArtistsResponse = z.infer<typeof rawArtistsResponseSchema>;
