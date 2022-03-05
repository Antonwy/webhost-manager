// ----------------------------------------------------------------------

export default function Tabs(theme) {
  return {
    MuiTab: {
      styleOverrides: {
        root: {
          fontWeight: theme.typography.fontWeightMedium,
          padding: '0px 8px',
          '&.Mui-selected': {
            color: theme.palette.text.primary,
          },
          '&:not(:last-of-type)': {
            marginRight: theme.spacing(2),
          },
          '@media (min-width: 600px)': {
            minWidth: 48,
          },
        },
        labelIcon: {
          minHeight: 48,
          flexDirection: 'row',
          '& > *:first-of-type': {
            marginBottom: 0,
          },
        },
        wrapper: {
          flexDirection: 'row',
          whiteSpace: 'nowrap',
        },
        textColorInherit: {
          opacity: 1,
          color: theme.palette.text.secondary,
        },
      },
    },
    MuiTabPanel: {
      styleOverrides: {
        root: {
          padding: 0,
        },
      },
    },
    MuiTabScrollButton: {
      styleOverrides: {
        root: {
          width: 48,
          borderRadius: '50%',
        },
      },
    },
  };
}
