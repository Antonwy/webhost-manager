import { ArrowDownward, KeyboardArrowDown } from '@mui/icons-material';
import { Theme } from '@mui/material';

const Select = (theme: Theme) => {
  return {
    MuiSelect: {
      defaultProps: {
        IconComponent: KeyboardArrowDown,
      },
      styleOverrides: {
        icon: {
          width: 20,
          height: 20,
          top: 'calc(50% - 10px)',
          transition: 'transform 0.2s',
        },
      },
    },
  };
};

export default Select;
