import { Theme } from '@mui/material';

const Fab = (theme: Theme) => {
  return {
    MuiFab: {
      defaultProps: {
        color: 'primary',
      },
      styleOverrides: {
        root: {
          boxShadow: theme.customShadows?.z8,
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
            backgroundColor: theme.palette.grey[400],
          },
        },
        primary: {
          boxShadow: theme.customShadows?.primary,
          '&:hover': {
            backgroundColor: theme.palette.primary.dark,
          },
        },
        secondary: {
          boxShadow: theme.customShadows?.secondary,
          '&:hover': {
            backgroundColor: theme.palette.secondary.dark,
          },
        },
        extended: {
          '& svg': {
            marginRight: theme.spacing(1),
          },
        },
      },
    },
  };
};

export default Fab;
