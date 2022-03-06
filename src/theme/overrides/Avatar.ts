import { Theme } from '@mui/material';

const Avatar = (theme: Theme) => {
  return {
    MuiAvatar: {
      styleOverrides: {
        root: {
          borderRadius: Number(theme.shape.borderRadius) * 1.5,
        },
        colorDefault: {
          color: theme.palette.text.secondary,
          backgroundColor: theme.palette.grey[300],
        },
      },
    },
  };
};

export default Avatar;
