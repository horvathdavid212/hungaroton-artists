import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  defaultLocale: 'en',
  localeDetection: false,
  localePrefix: 'always',
  locales: ['en', 'hu']
});

export type Locale = (typeof routing.locales)[number];
