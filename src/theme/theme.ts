import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  // Note: Cant use CSS variables directly in the palette object, so we use the same values as in the tokens.css for consistency
  palette: {
    mode: 'light',
    background: {
      default: '#f7f4ef',
      paper: '#fffdf8'
    },
    primary: {
      main: '#7b2334',
      dark: '#571826',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#1f6f78'
    },
    error: {
      main: '#b42318'
    },
    text: {
      primary: '#1f2933',
      secondary: '#5f6b7a'
    },
    divider: '#d8d0c3'
  },
  shape: {
    borderRadius: 8
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
          boxShadow: 'var(--shadow-sm)'
        }
      }
    }
  }
});
