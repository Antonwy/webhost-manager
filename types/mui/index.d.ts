import { PaletteColorOptions } from '@mui/material';

declare module '@mui/material/styles' {
  interface PaletteOptions {
    customBackground?: PaletteColorOptions;
  }
}
