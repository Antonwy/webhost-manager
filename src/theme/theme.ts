import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

import '@fontsource/poppins/300.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/700.css';
import palette from './palette';
import typography from './typography';
import breakpoints from './breakpoints';
import shadows, { customShadows } from './shadows';

// Create a theme instance.
const theme = createTheme({
  palette: palette.light,
  typography,
  breakpoints,
  shape: { borderRadius: 8 },
  shadows: shadows.light,
  customShadows: customShadows.light,
});

export default theme;
