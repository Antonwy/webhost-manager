import { Theme } from '@mui/material';

const Alert = (theme: Theme) => {
  return {
    MuiAlert: {
      styleOverrides: {
        root: {
          boxShadow: theme.customShadows?.dialog,
        },
        message: {
          '& .MuiAlertTitle-root': {
            marginBottom: theme.spacing(0.5),
          },
        },
        action: {
          '& button:not(:first-of-type)': {
            marginLeft: theme.spacing(1),
          },
        },
        standardInfo: {
          color: theme.palette.info.contrastText,
          backgroundColor: theme.palette.info.main,
          '& .MuiAlert-icon': {
            color: theme.palette.info.contrastText,
          },
        },
        standardSuccess: {
          color: theme.palette.success.contrastText,
          backgroundColor: theme.palette.success.main,
          '& .MuiAlert-icon': {
            color: theme.palette.success.contrastText,
          },
        },
        standardWarning: {
          color: theme.palette.warning.contrastText,
          backgroundColor: theme.palette.warning.main,
          '& .MuiAlert-icon': {
            color: theme.palette.warning.contrastText,
          },
        },
        standardError: {
          color: theme.palette.error.contrastText,
          backgroundColor: theme.palette.error.main,
          '& .MuiAlert-icon': {
            color: theme.palette.error.contrastText,
          },
        },
      },
    },
  };
};

export default Alert;
