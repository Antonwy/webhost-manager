import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

import '@fontsource/poppins/300.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/700.css';

// Create a theme instance.
const theme = createTheme({
  typography: {
    fontFamily: ['Poppins', 'Roboto'].join(','),
  },
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    customBackground: {
      main: '#f6f7f9',
    },
  },
});

export default theme;
