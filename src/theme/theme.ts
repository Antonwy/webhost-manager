import { createTheme } from '@mui/material/styles';
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
