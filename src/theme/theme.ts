import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  // Note: Can't use CSS variables directly in the palette object,
  // so we use the same values as in tokens.css for consistency.
  palette: {
    mode: 'dark',
    background: {
      default: '#101512',
      paper: '#18221d'
    },
    primary: {
      main: '#e8b84a',
      dark: '#b88a1f',
      contrastText: '#11140f'
    },
    secondary: {
      main: '#66d0c5',
      dark: '#2a9f94',
      contrastText: '#071916'
    },
    error: {
      main: '#f07b7b'
    },
    text: {
      primary: '#f4f7f1',
      secondary: '#c8d2c6'
    },
    divider: '#36443c'
  },
  shape: {
    borderRadius: 10
  },
  typography: {
    fontFamily: 'var(--font-geist-sans), Arial, Helvetica, sans-serif',
    h1: {
      fontSize: 'var(--font-size-2xl)',
      fontWeight: 700,
      letterSpacing: 0,
      lineHeight: 1.15
    },
    h2: {
      fontSize: 'var(--font-size-xl)',
      fontWeight: 700,
      letterSpacing: 0,
      lineHeight: 1.2
    },
    body1: {
      fontSize: 'var(--font-size-md)'
    },
    body2: {
      fontSize: 'var(--font-size-sm)'
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
          borderRadius: 'var(--radius-md)',
          minHeight: 40
        }
      }
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          borderRadius: 'var(--radius-sm)',
          color: 'var(--color-text-muted)',
          minHeight: 40,
          '&.Mui-selected': {
            backgroundColor: 'var(--color-primary)',
            color: 'var(--color-primary-contrast)'
          },
          '&.Mui-selected:hover': {
            backgroundColor: 'var(--color-primary-dark)'
          }
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 'var(--radius-md)',
          boxShadow: 'var(--shadow-sm)',
          border: '1px solid var(--color-border)',
          backgroundImage: 'none'
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
          backgroundColor: 'var(--color-surface-muted)',
          borderRadius: 'var(--radius-md)'
        }
      }
    },
    MuiCssBaseline: {
      styleOverrides: {
        ':focus-visible': {
          outline: '2px solid var(--color-focus)',
          outlineOffset: 2
        }
      }
    }
  }
});
