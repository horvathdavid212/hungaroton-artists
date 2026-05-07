'use client';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter';
import type { ReactNode } from 'react';
import { theme } from '@/theme/theme';

type ThemeRegistryProps = {
  children: ReactNode;
};

export function ThemeRegistry({ children }: ThemeRegistryProps) {
  return (
    // For MUI + Next.js App Router integration
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        {/* MUI default reset.css */}
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
