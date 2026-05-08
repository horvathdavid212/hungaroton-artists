import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  // Note: Can't use CSS variables directly in the palette object,
  // so we use the same values as in tokens.css for consistency.
  palette: {
    mode: 'dark',
    background: {
      default: '#0f172a',
      paper: '#182235'
    },
    primary: {
      main: '#f59e0b',
      dark: '#b45309',
      contrastText: '#111827'
    },
    secondary: {
      main: '#22d3ee',
      dark: '#0891b2',
      contrastText: '#082f49'
    },
    error: {
      main: '#f87171'
    },
    text: {
      primary: '#f8fafc',
      secondary: '#cbd5e1'
    },
    divider: '#334155'
  },
  shape: {
    borderRadius: 10
  },
  typography: {
    fontFamily: 'var(--font-geist-sans), Arial, Helvetica, sans-serif',
    h1: {
      fontSize: 'var(--font-size-2xl)',
      fontWeight: 700,
      letterSpacing: 0
    },
    h2: {
      fontSize: 'var(--font-size-xl)',
      fontWeight: 700,
      letterSpacing: 0
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
          borderRadius: 'var(--radius-md)'
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
    }
  }
});
