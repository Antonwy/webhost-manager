import { PaletteColorOptions } from '@mui/material';

// declare module '@mui/material/styles' {
//   interface PaletteOptions {
//     customBackground?: PaletteColorOptions;
//   }
// }

declare module '@mui/material/styles/createPalette' {
  interface TypeBackground {
    neutral?: string;
  }
}
