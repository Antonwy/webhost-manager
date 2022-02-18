import { PaletteColorOptions } from '@mui/material';
import {
  SimplePaletteColorOptions,
  PaletteColorOptions,
} from '@mui/material/styles/createPalette';

// declare module '@mui/material/styles' {
//   interface PaletteOptions {
//     customBackground?: PaletteColorOptions;
//   }
// }

declare module '@mui/material/styles/createPalette' {
  interface TypeBackground {
    neutral?: string;
  }

  interface SimplePaletteColorOptions {
    lighter?: string;
    darker?: string;
  }

  interface PaletteOptions {
    primary?: SimplePaletteColorOptions;
    secondary?: SimplePaletteColorOptions;
    error?: SimplePaletteColorOptions;
    warning?: SimplePaletteColorOptions;
    info?: SimplePaletteColorOptions;
    success?: SimplePaletteColorOptions;
  }
}

declare module '@mui/material/styles/createTheme' {
  interface ThemeOptions {
    customShadows?: CustomShadow;
  }
}
