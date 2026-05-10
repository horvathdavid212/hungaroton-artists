import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { theme } from '@/theme/theme';

type ArtistFiltersToggleButtonProps = {
  ariaControls: string;
  ariaExpanded: boolean;
  isExpanded: boolean;
  label: string;
  onToggle: () => void;
};

export const ArtistFiltersToggleButton = ({ ariaControls, ariaExpanded, isExpanded, label, onToggle }: ArtistFiltersToggleButtonProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        position: 'absolute',
        transform: 'translateY(50%)',
        justifyContent: 'center',
        bottom: 0,
        left: 0,
        right: 0,
        pointerEvents: 'none'
      }}
    >
      <Tooltip title={label}>
        <IconButton
          aria-controls={ariaControls}
          aria-expanded={ariaExpanded}
          aria-label={label}
          onClick={onToggle}
          sx={{
            color: theme.palette.primary.main,
            pointerEvents: 'auto',
            height: 40,
            width: 40
          }}
          type="button"
        >
          {isExpanded ? <KeyboardArrowUpIcon fontSize="medium" /> : <KeyboardArrowDownIcon fontSize="medium" />}
        </IconButton>
      </Tooltip>
    </Box>
  );
};
