import { Theme } from '@mui/material';

const Button = (theme: Theme) => {
  return {
    MuiButton: {
      styleOverrides: {
        root: {
          transition: theme.transitions.create(
            ['background-color', 'box-shadow', 'transform'],
            {
              duration: theme.transitions.duration.standard,
              easing: theme.transitions.easing.easeOut,
            }
          ),
          '&:hover': {
            transform: 'scale(1.03)',
            boxShadow: 'none',
          },
        },
        sizeMedium: {
          height: 38,
        },
        sizeLarge: {
          height: 48,
        },
        // contained
        containedInherit: {
          color: theme.palette.grey[800],
          boxShadow: theme.customShadows?.z8,
          '&:hover': {
            backgroundColor: theme.palette.grey[400],
          },
        },
        containedPrimary: {
          boxShadow: theme.customShadows?.primary,
        },
        containedSecondary: {
          boxShadow: theme.customShadows?.secondary,
        },
        containedInfo: {
          boxShadow: theme.customShadows?.info,
        },
        containedSuccess: {
          boxShadow: theme.customShadows?.success,
        },
        containedWarning: {
          boxShadow: theme.customShadows?.warning,
        },
        containedError: {
          boxShadow: theme.customShadows?.error,
        },
        outlinedInherit: {
          border: `1px solid ${theme.palette.grey[500]}`,
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
          },
        },
        textInherit: {
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
          },
        },
      },
    },
  };
};

export default Button;
