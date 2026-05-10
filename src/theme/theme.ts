import { createTheme } from '@mui/material/styles';

const paletteTokens = {
  background: '#101512',
  surface: '#18221d',
  surfaceMuted: '#223028',
  text: '#f4f7f1',
  textMuted: '#c8d2c6',
  border: '#36443c',
  primary: '#e8b84a',
  primaryDark: '#b88a1f',
  primaryContrast: '#11140f',
  secondary: '#66d0c5',
  secondaryDark: '#2a9f94',
  secondaryContrast: '#071916',
  error: '#f07b7b',
  focus: '#f2cf7b'
} as const;

const appTokens = {
  color: {
    surfaceMuted: paletteTokens.surfaceMuted,
    focus: paletteTokens.focus
  },
  fontSize: {
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.5rem',
    xxl: '2rem'
  },
  gridTemplateColumns: {
    artistCards: {
      xs: '1fr',
      sm: 'repeat(2, minmax(0, 1fr))',
      md: 'repeat(3, minmax(0, 1fr))',
      lg: 'repeat(4, minmax(0, 1fr))'
    },
    filterControls: {
      xs: 'repeat(2, minmax(0, 1fr))',
      sm: 'minmax(0, 1fr) auto',
      md: 'minmax(360px, 1fr) 240px auto'
    },
    letterFilter: {
      xs: 'repeat(auto-fit, minmax(40px, 1fr))',
      sm: 'repeat(auto-fill, minmax(40px, 40px))'
    }
  },
  radius: {
    sm: '4px',
    md: '10px',
    lg: '14px'
  },
  shadow: {
    sm: '0 1px 2px rgb(0 0 0 / 22%)',
    md: '0 18px 48px rgb(0 0 0 / 30%)'
  }
} as const;

declare module '@mui/material/styles' {
  interface Theme {
    app: typeof appTokens;
  }

  interface ThemeOptions {
    app?: typeof appTokens;
  }
}

export const theme = createTheme({
  app: appTokens,
  palette: {
    mode: 'dark',
    background: {
      default: paletteTokens.background,
      paper: paletteTokens.surface
    },
    primary: {
      main: paletteTokens.primary,
      dark: paletteTokens.primaryDark,
      contrastText: paletteTokens.primaryContrast
    },
    secondary: {
      main: paletteTokens.secondary,
      dark: paletteTokens.secondaryDark,
      contrastText: paletteTokens.secondaryContrast
    },
    error: {
      main: paletteTokens.error
    },
    text: {
      primary: paletteTokens.text,
      secondary: paletteTokens.textMuted
    },
    divider: paletteTokens.border
  },
  shape: {
    borderRadius: 10
  },
  typography: {
    fontFamily: 'var(--font-geist-sans, Arial, Helvetica, sans-serif)',
    h1: {
      fontSize: appTokens.fontSize.xxl,
      fontWeight: 700,
      letterSpacing: 0,
      lineHeight: 1.15
    },
    h2: {
      fontSize: appTokens.fontSize.xl,
      fontWeight: 700,
      letterSpacing: 0,
      lineHeight: 1.2
    },
    body1: {
      fontSize: appTokens.fontSize.md
    },
    body2: {
      fontSize: appTokens.fontSize.sm
    },
    button: {
      fontWeight: 600,
      letterSpacing: 0,
      textTransform: 'none'
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: appTokens.radius.md,
          minHeight: 40
        }
      }
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          borderRadius: appTokens.radius.sm,
          color: paletteTokens.textMuted,
          minHeight: 40,
          '&.Mui-selected': {
            backgroundColor: paletteTokens.primary,
            color: paletteTokens.primaryContrast
          },
          '&.Mui-selected:hover': {
            backgroundColor: paletteTokens.primaryDark
          }
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          border: `1px solid ${paletteTokens.border}`,
          borderRadius: appTokens.radius.md,
          boxShadow: appTokens.shadow.sm
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none'
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: appTokens.color.surfaceMuted,
          borderRadius: appTokens.radius.md
        }
      }
    },
    MuiCssBaseline: {
      styleOverrides: {
        ':focus-visible': {
          outline: `2px solid ${appTokens.color.focus}`,
          outlineOffset: 2
        },
        body: {
          backgroundColor: paletteTokens.background,
          color: paletteTokens.text,
          fontFamily: 'var(--font-geist-sans, Arial, Helvetica, sans-serif)',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale'
        }
      }
    }
  }
});
