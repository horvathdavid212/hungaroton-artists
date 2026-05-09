import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { ReactNode } from 'react';
import { theme } from '@/theme/theme';

type FeedbackStateProps = {
  action?: ReactNode;
  description: ReactNode;
  devMessage?: ReactNode;
  severity?: 'error' | 'info' | 'success' | 'warning';
  title: ReactNode;
};

const content = ({ action, description, devMessage, severity, title }: FeedbackStateProps) => (
  <Stack spacing={2} sx={{ maxWidth: 600 }}>
    <Stack spacing={1}>
      <Typography component="h2" variant="h2">
        {title}
      </Typography>
      <Box
        sx={{
          color: severity ? 'inherit' : theme.palette.text.secondary,
          typography: 'body1'
        }}
      >
        <Box>{description}</Box>
        {devMessage && <Box>Dev message: {devMessage}</Box>}
      </Box>
    </Stack>
    {action}
  </Stack>
);

export const FeedbackState = (props: FeedbackStateProps) => {
  const panelSx = {
    borderRadius: theme.app.radius.lg,
    p: 4
  };

  if (props.severity) {
    return (
      <Alert severity={props.severity} sx={panelSx} variant="outlined">
        {content(props)}
      </Alert>
    );
  }

  return (
    <Paper sx={panelSx} variant="outlined">
      {content(props)}
    </Paper>
  );
};
