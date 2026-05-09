'use client';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useSearchParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import type { MouseEvent } from 'react';
import { usePathname, useRouter } from '@/i18n/navigation';
import { type Locale, routing } from '@/i18n/routing';

export const LanguageSwitcher = () => {
  const currentLocale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations('languageSwitcher');

  const handleLocaleChange = (_event: MouseEvent<HTMLElement>, nextLocale: Locale | null) => {
    if (!nextLocale || nextLocale === currentLocale) {
      return;
    }

    const queryString = searchParams.toString();
    const href = queryString ? `${pathname}?${queryString}` : pathname;

    router.replace(href, { locale: nextLocale });
  };

  return (
    <ToggleButtonGroup
      aria-label={t('label')}
      exclusive
      onChange={handleLocaleChange}
      size="small"
      sx={{ alignSelf: { xs: 'flex-start', sm: 'center' }, flexShrink: 0 }}
      value={currentLocale}
    >
      {routing.locales.map((locale) => (
        <ToggleButton aria-label={t(locale)} key={locale} sx={{ minWidth: 44 }} value={locale}>
          {locale.toUpperCase()}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};
