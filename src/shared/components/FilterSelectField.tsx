import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import type { SxProps, Theme } from '@mui/material/styles';

type FilterSelectOption = {
  label: string;
  value: string;
};

type FilterSelectFieldProps = {
  formControlSx?: SxProps<Theme>;
  label: string;
  labelId: string;
  onChange: (event: SelectChangeEvent<string>) => void;
  options: readonly FilterSelectOption[];
  value: string;
};

export const FilterSelectField = ({ formControlSx, label, labelId, onChange, options, value }: FilterSelectFieldProps) => {
  return (
    <FormControl size="small" sx={formControlSx}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        fullWidth
        label={label}
        labelId={labelId}
        MenuProps={{
          disableScrollLock: true
        }}
        onChange={onChange}
        value={value}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
